import { useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useGLTF, PerspectiveCamera, useAnimations, Html } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimationContext } from "./AnimationContext";
import * as THREE from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";
import { WEB1_CONFIGS } from "./MODEL_CONFIGS";
import { ConfettiParticle } from "../web1/ConfettiParticle";



export default function Web1({ sectionID, isActive, lenis, ...props }) {
  const gl = useThree((state) => state.gl);
  const group = useRef();
  const glowMeshRef = useRef();
  const directionalLightRef = useRef();
  const dinoRef = useRef();
  const bubbleRef = useRef();



  const currentTween = useRef(null);
  const sceneContainerGroup = useRef();
  const champignonRef = useRef();
  const [confettis, setConfettis] = useState([]);

  const { nodes, materials, animations } = useGLTF(
    `/models/web1-opt.glb`,
    undefined,
    undefined,
    (loader) => {
      const ktx2loader = new KTX2Loader();
      ktx2loader.setTranscoderPath(
        "https://cdn.jsdelivr.net/gh/pmndrs/drei-assets/basis/"
      );
      ktx2loader.detectSupport(gl);
      loader.setKTX2Loader(ktx2loader);
    }
  );
  const { actions, mixer } = useAnimations(animations, group);
  const { setCurrentModel } = useContext(AnimationContext);
  const timelineMain = useRef();
  const { viewport } = useThree()

  // track scrolling status
  let nextScrollTrigger = null;

  let disableOtherSections = () => {
    if (!nextScrollTrigger) {
      let currentScrollTrigger = ScrollTrigger.getById(sectionID);
      if (currentScrollTrigger && currentScrollTrigger.next()) {
        nextScrollTrigger = currentScrollTrigger.next();
        nextScrollTrigger.disable();
      }
    } else {
      nextScrollTrigger.disable();
    }
  }

  let enableOtherSections = () => {
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.id !== sectionID) {
        trigger.enable();
      }
    })
  }

  const viewportRef = useRef(viewport);
  useEffect(() => {
    viewportRef.current = viewport;
  }, [viewport]);

  useLayoutEffect(() => {
    WEB1_CONFIGS.ANIMATIONS_TO_PLAY.forEach(name => actions[name]?.reset().play());
    const camAct = actions["CameraIn"];
    const groupObj = group.current?.getObjectByName("Camera001");
    const sceneGroup = sceneContainerGroup.current;
    if (!camAct || !groupObj || !sceneGroup) return;

    camAct.reset().play().paused = true;
    const clipDur = camAct.getClip().duration;

    const defaultPosition = { ...sceneGroup.position };
    const minY = 0;
    const maxY = 6;

    const killTween = () => {
      if (currentTween.current) {
        currentTween.current.kill();
        currentTween.current = null;
      }
    };
    const mm = gsap.matchMedia();

    // MOBILE
    mm.add("(max-width: 767px)", () => {
      sceneGroup.position.y += 0.3;
      sceneGroup.position.z -= 0.5;
      sceneGroup.position.x += 0.15;

      const sceneDefaultPos = sceneGroup.position.y;
      const startZ = sceneGroup.position.z;
      const endZ = startZ - 0.5;
      const startX = sceneGroup.position.x;
      const endX = startX + 0.3;

      const trigger = ScrollTrigger.create({
        id: sectionID,
        trigger: "#section2",
        start: "top bottom",
        end: "top center-=270",
        scrub: true,
        markers: false,
        onUpdate: ({ progress }) => {
          killTween();

          const newY = THREE.MathUtils.lerp(minY, maxY, progress);
          const newZ = THREE.MathUtils.lerp(startZ, endZ, progress);
          const newX = THREE.MathUtils.lerp(startX, endX, progress);
          const rotY = THREE.MathUtils.lerp(0, 1, progress);
          const rotX = THREE.MathUtils.lerp(0, 1, progress);

          currentTween.current = gsap.to(sceneGroup, {
            duration: 0.3,
            ease: "sine.out",
            overwrite: true,
            onUpdate: () => {
              sceneGroup.position.set(newX, newY, newZ);
              sceneGroup.rotation.set(rotX, rotY, sceneGroup.rotation.z);
            },
          });
        },
        onToggle: ({ isActive }) => {
          if (isActive) {
            setCurrentModel(sectionID);
            disableOtherSections();
            gsap.to(sceneGroup.position, {
              y: sceneDefaultPos,
              duration: 0.3,
              ease: "circ.out",
            });
          }
        },
        onLeave: ({ getVelocity }) => {

          if (Math.abs(getVelocity()) <= 2000) {
            gsap.to(sceneGroup.position, {
              y: sceneDefaultPos + 50,
              duration: 0.3,
              ease: "sine.inOut",
              onComplete: () => nextScrollTrigger?.enable(),
            });
          } else {
            enableOtherSections();
          }
        },
      });
      return () => trigger.kill();
    });

    // DESKTOP
    mm.add("(min-width: 768px)", () => {
      sceneGroup.position.set(defaultPosition.x, defaultPosition.y, defaultPosition.z);
      const trigger = ScrollTrigger.create({
        id: sectionID,
        trigger: "#section2",
        start: "top bottom",
        end: "center+=100 top",
        scrub: true,
        markers: false,
        onUpdate: ({ progress }) => {
          killTween();
          currentTween.current = gsap.to(camAct, {
            time: progress * clipDur,
            duration: 0.1,
            ease: "sine.out",
            overwrite: true,
          });
        },
        onToggle: ({ isActive }) => {
          if (isActive) {
            setCurrentModel(sectionID);
            disableOtherSections();
            gsap.to(sceneGroup.position, {
              y: defaultPosition.y,
              duration: 0.9,
              ease: "expo.inOut",
            });
          }
        },
        onLeave: ({ getVelocity }) => {
          if (Math.abs(getVelocity()) <= 2000) {
            gsap.to(sceneGroup.position, {
              y: defaultPosition.y + 50,
              duration: 0.9,
              ease: "expo.inOut",
              onComplete: () => nextScrollTrigger?.enable(),
            });
          } else {
            gsap.to(sceneGroup.position, {
              y: defaultPosition.y + 50,
              duration: 0.9,
              ease: "expo.inOut",
            });
            enableOtherSections();
          }
        },
      });

      return () => trigger.kill();
    });

    return () => {
      mm.revert(); // clean all triggers
      timelineMain.current?.kill();
      mixer.stopAllAction();
    };
  }, []);


  // Créez un matériau de test
  const testMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0xa1a323,
    roughness: 0.5,
    metalness: 0.1
  }), []);



  const createConfetti = () => {
    const newConfettis = [];
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7'];

    // create the particules
    for (let i = 0; i < 25; i++) {
      const angle = (Math.PI * 2 * i) / 20;
      const speed = 2 + Math.random() * 3;

      newConfettis.push({
        id: Date.now() + i,
        position: new THREE.Vector3(-0.569, 2.089 + 0.1, 0.83),
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: new THREE.Vector3(
          Math.cos(angle) * speed,
          Math.random() * 3 + 3, // Speed ​​up
          Math.sin(angle) * speed
        ),
      });
    }

    setConfettis(newConfettis);

    // Nettoyer les confettis après 3 secondes
    setTimeout(() => {
      setConfettis([]);
    }, 3000);
  };

  const handleClick = () => {
    if (!champignonRef.current) return;

    // Annuler animation précédente si en cours
    gsap.killTweensOf(champignonRef.current.scale);

    // Animation type bouton cliqué
    gsap.fromTo(
      champignonRef.current.scale,
      { x: 0.342, y: 0.342, z: 0.342 }, // taille normale
      {
        x: 0.3,
        y: 0.3,
        z: 0.3,
        duration: 0.1,
        ease: 'power1.in',
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          // Créer les confettis à la fin de l'animation
          createConfetti();
        }
      }
    );
  };

  const handleDinoClick = () => {
    if (bubbleRef.current && dinoRef.current) {
      // 🔊 Jouer le son du dino
      const audio = new Audio('/sounds/dinosaur-roar-with-screams-and-growls-193210.mp3');
      audio.play();

      // 🗨️ Apparition bulle
      gsap.fromTo(
        bubbleRef.current,
        { autoAlpha: 0, y: -10, scale: 0.5 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
      );

      // ❌ Disparition bulle après 2 secondes
      gsap.to(bubbleRef.current, {
        autoAlpha: 0,
        duration: 0.5,
        delay: 2,
        ease: 'power1.inOut',
      });

      // 🦕 Rebond du dino
      gsap.fromTo(
        dinoRef.current.scale,
        { x: 0.29, y: 0.29, z: 0.29 },
        {
          x: 0.34,
          y: 0.34,
          z: 0.34,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: 'power1.out',
        }
      );

      // ↪️ Rotation légère
      gsap.fromTo(
        dinoRef.current.rotation,
        { y: dinoRef.current.rotation.y },
        {
          y: dinoRef.current.rotation.y + 0.3,
          duration: 0.2,
          yoyo: true,
          repeat: 1,
          ease: 'power1.inOut',
        }
      );
    }
  };


  // Animation de clignotement pour attirer l'attention
  const colors = useMemo(() => [
    0xff6b6b, 0x4ecdc4, 0x45b7d1,
    0xf9ca24, 0xf0932b, 0xeb4d4b, 0x6c5ce7
  ], []);

  useFrame((state) => {
    const mesh = glowMeshRef.current;
    const light = directionalLightRef.current;
    if (!mesh || !mesh.material) return;

    const { elapsedTime } = state.clock;
    const intensity = Math.sin(elapsedTime * 4) * 0.5 + 0.5;

    // Optimisation : changer la couleur seulement si l'index change
    const colorIndex = Math.floor(elapsedTime * 2) % colors.length;
    const currentColor = colors[colorIndex];

    // Update material
    const mat = mesh.material;
    mat.emissive.setHex(currentColor);
    mat.emissiveIntensity = intensity * 0.5;
    mat.color.setHex(currentColor);
    mat.opacity = 0.9 + intensity * 0.1;

    // Update light
    if (light) {
      light.color.setHex(currentColor);
      light.intensity = 2 + intensity * 3;
      const angle = elapsedTime * 0.5;
      light.position.set(Math.cos(angle) * 2, light.position.y, Math.sin(angle) * 2);
    }
  });
  const rocketTexture = useLoader(THREE.TextureLoader, '/textures/rocket.png');
  rocketTexture.wrapS = THREE.RepeatWrapping;
  rocketTexture.wrapT = THREE.RepeatWrapping;





  return (
    <group ref={group} {...props} dispose={null} visible={isActive}  >
      <group name="Scene" >
        <PerspectiveCamera
          name="Camera001"
          makeDefault={isActive}
          far={1000}
          near={0.1}
          fov={18.848}
          position={[3.446, 20.931, 15.945]}
          rotation={[-0.417, 0.041, -0.022]}
        />
        <group ref={sceneContainerGroup} name="scene_container"
          scale={viewport.width < 5 ? 0.5 : 1}
          position-x={viewport.width < 5 ? 2.5 : 0}
        >

          <mesh
            name="GroundCubeQuad003"
            castShadow
            receiveShadow
            geometry={nodes.GroundCubeQuad003.geometry}
            material={materials.Ground_FileSize_Mat}
            position={[0.033, -0.966, -0.183]}
            scale={[1.223, 0.997, 1.039]}
          />
          <group name="Empty002" position={[-0.228, 2.14, 0.512]}  >


            <group name="Retopo_Cube001" rotation={[0, 1.005, 0]} scale={0.29} ref={dinoRef} onClick={handleDinoClick}
            >
              <mesh position={[0, 1.8, 0]}>
                <Html>
                  <div
                    ref={bubbleRef}
                    className="speech-bubble"
                    style={{ opacity: 0, pointerEvents: 'none', minWidth: "214px" }} // start hidden
                  >
                    Hey there! I'm a dino!
                  </div>
                </Html>
              </mesh>
              <mesh
                name="Retopo_Cube001_primitive0"
                castShadow
                receiveShadow
                geometry={nodes.Retopo_Cube001_primitive0.geometry}
                material={materials['spike.001']}
              />
              <mesh
                name="Retopo_Cube001_primitive1"
                castShadow
                receiveShadow
                geometry={nodes.Retopo_Cube001_primitive1.geometry}
                material={materials['Material.005']}
              />
              <mesh
                name="Retopo_Cube001_primitive2"
                castShadow
                receiveShadow
                geometry={nodes.Retopo_Cube001_primitive2.geometry}
                material={materials.Blackk}
              />
            </group>
          </group>
          <group name="Empty004" position={[-0.569, 2.089, 0.83]} scale={0.342} ref={champignonRef} onClick={handleClick}>
            <group name="Cube004" scale={[3.169, 3.251, 3.169]}>
              <mesh
                name="Cube004_primitive0"
                castShadow
                receiveShadow
                geometry={nodes.Cube004_primitive0.geometry}
                material={materials['Material.014']}
              />
              <mesh
                name="Cube004_primitive1"
                castShadow
                receiveShadow
                geometry={nodes.Cube004_primitive1.geometry}
                material={materials['Material.017']}
              />
              <mesh
                name="Cube004_primitive2"
                ref={glowMeshRef}
                castShadow
                receiveShadow
                geometry={nodes.Cube004_primitive2.geometry}
                material={materials['Material.010'].clone()} // Clone pour éviter de modifier l'original
              />
            </group>
          </group>
          {/* Confettis simples (cubes colorés) */}

          {/* Rendu des confettis */}
          {confettis.map((confetti) => (
            <ConfettiParticle
              key={confetti.id}
              position={confetti.position}
              color={confetti.color}
              velocity={confetti.velocity}
            />
          ))}
          <mesh
            name="Cube005"
            castShadow
            receiveShadow
            geometry={nodes.Cube005.geometry}
            material={materials['Material.002']}
            position={[0.016, 1.473, 0.089]}
          />
          <mesh
            name="Circle012"
            castShadow
            receiveShadow
            geometry={nodes.Circle012.geometry}
            material={materials['__GLTFLoader._default']}
            position={[-1.198, 1.669, 1.767]}
            scale={[1.104, 1, 1.104]}
          />
          <group
            name="Empty010"
            position={[1.123, 1.058, -1.336]}
            rotation={[-0.052, 0.055, -0.004]}
            scale={0.256}>
            <mesh
              name="Sphere010"
              castShadow
              receiveShadow
              geometry={nodes.Sphere010.geometry}
              material={materials['Material.003']}
              position={[0.003, 0.291, 0]}
              rotation={[-0.595, 0, 0]}
              scale={[0.503, 0.494, 0.494]}
            />
            <mesh
              name="Sphere011"
              castShadow
              receiveShadow
              geometry={nodes.Sphere011.geometry}
              material={materials['Material.003']}
              position={[0.003, 0.291, 0]}
              rotation={[0.524, 0, Math.PI]}
              scale={[0.503, 0.494, 0.494]}
            />
          </group>
          <mesh
            name="Cylinder002"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder002.geometry}
            material={materials['Material.022']}
            position={[-0.221, 2.628, -0.663]}
            rotation={[Math.PI, -0.93, Math.PI]}
            scale={0.05}
          />
          <group
            name="Armature001"
            position={[-0.724, 2.797, 0.172]}
            rotation={[0, -0.251, 0]}
            scale={0.219}>
            <primitive object={nodes.Bone} />
            <primitive object={nodes.Bone007} />
            <primitive object={nodes.Bone008} />
          </group>
          <group
            name="Cube003"
            position={[1.37, 1.732, -0.435]}
            rotation={[0, -0.475, -Math.PI]}
            scale={[-0.65, -0.719, -0.65]}>
            <group name="Cube032">
              <mesh
                name="Cube032_primitive0"
                castShadow
                receiveShadow
                geometry={nodes.Cube032_primitive0.geometry}
                material={materials['ArcadeBase.002']}
              />
              <mesh
                name="Cube032_primitive3"
                castShadow
                receiveShadow
                geometry={nodes.Cube032_primitive3.geometry}
                material={materials['Material.003']}
              />
              <mesh
                name="Cube032_primitive5"
                castShadow
                receiveShadow
                geometry={nodes.Cube032_primitive5.geometry}
                material={materials['Material.025']}
              />
            </group>
          </group>
          <mesh
            name="Plane"
            castShadow
            receiveShadow
            geometry={nodes.Plane.geometry}
            material={materials.Desk}
            position={[-0.7, 3.171, -0.899]}
            rotation={[0, 0.616, 0]}
          />
          <mesh
            name="LAPTOP001"
            castShadow
            receiveShadow
            geometry={nodes.LAPTOP001.geometry}
            material={materials['BASE_LAPTOP_MAT.002']}
            position={[1.472, 1.557, 0.398]}
            rotation={[-Math.PI, 1.334, -Math.PI]}
            scale={[-0.164, -0.014, -0.105]}
          />
          <mesh
            name="Cube027_primitive0"
            castShadow
            receiveShadow
            geometry={nodes.Cube027_primitive0.geometry}
            material={materials['ArcadeMetal.001']}
            position={[-1.161, 2.888, 0.952]}
            rotation={[3.14, 0.051, 2.935]}
            scale={0.803}
          />
          <mesh
            name="Cube027_primitive1"
            castShadow
            receiveShadow
            geometry={nodes.Cube027_primitive1.geometry}
            material={materials['Material.011']}
            position={[-1.161, 2.888, 0.952]}
            rotation={[3.14, 0.051, 2.935]}
            scale={0.803}
          />
          <group>
            <mesh
              name="Cube027_primitive2"
              castShadow
              receiveShadow
              geometry={nodes.Cube027_primitive2.geometry}
              material={testMaterial}
              position={[-1.161, 2.888, 0.952]}
              rotation={[3.14, 0.051, 2.935]}
              scale={0.803}
            />
            <mesh
              name="Cube027_primitive3"
              castShadow
              receiveShadow
              geometry={nodes.Cube027_primitive3.geometry}
              material={materials['Material.013']}
              position={[-1.161, 2.888, 0.952]}
              rotation={[3.14, 0.051, 2.935]}
              scale={0.803}
            />



          </group>

          <mesh
            name="Cylinder005_primitive0"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder005_primitive0.geometry}
            material={materials['Material.010']}
            position={[-1.135, 2.457, 1.088]}
            rotation={[1.824, -1.397, -1.137]}
            scale={[0.016, 0.364, 0.016]}
          />
          <mesh
            name="Cylinder005_primitive1"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder005_primitive1.geometry}
            material={materials.Blackk}
            position={[-1.135, 2.457, 1.088]}
            rotation={[1.824, -1.397, -1.137]}
            scale={[0.016, 0.364, 0.016]}
          />
          <mesh
            name="Cube001_primitive0"
            castShadow
            receiveShadow
            geometry={nodes.Cube001_primitive0.geometry}
            material={materials['Material.004']}
            position={[-0.793, 1.533, -0.855]}
          />
          <mesh
            name="Cube001_primitive1"
            castShadow
            receiveShadow
            geometry={nodes.Cube001_primitive1.geometry}
            material={materials['Material.001']}
            position={[-0.793, 1.533, -0.855]}
          />
          <mesh
            name="Sphere"
            castShadow
            receiveShadow
            geometry={nodes.Sphere.geometry}
            material={materials['Material.003']}
            position={[1.107, 1.056, -0.662]}
            scale={[0.099, 0.097, 0.097]}
          />
          <group
            name="Retopo_Sphere001"
            position={[-0.724, 2.797, 0.172]}
            rotation={[0, -0.251, 0]}
            scale={0.219}>
            <group name="Empty005" position={[0.606, -0.576, 0.21]} scale={1.043} />
            <group name="Empty006" position={[-0.672, -0.557, 0.358]} scale={0.834} />
          </group>
          <mesh
            name="Cube003_primitive0"
            castShadow
            receiveShadow
            geometry={nodes.Cube003_primitive0.geometry}
            material={materials['ArcadeBase.002']}
            position={[1.37, 1.732, -0.435]}
            rotation={[-Math.PI, 0.475, -Math.PI]}
            scale={[-0.65, 0.719, 0.65]}
          />
          <group
            name="Armature004"
            position={[1.133, 1.655, -0.041]}
            rotation={[-1.396, 0.026, -0.483]}
            scale={[-0.219, 0.219, 0.219]}>
            <primitive object={nodes.Bone_1} />
            <primitive object={nodes.Bone007_1} />
            <primitive object={nodes.Bone008_1} />
          </group>
          <group
            name="Retopo_Sphere004"
            position={[1.133, 1.655, -0.041]}
            rotation={[-1.396, 0.026, -0.483]}
            scale={[-0.219, 0.22, 0.22]}>
            <group
              name="Empty001"
              position={[-0.535, 1.454, 1.297]}
              rotation={[0, 0.223, 0]}
              scale={1.043}
            />
            <group
              name="Empty003"
              position={[-0.084, 1.321, 1.145]}
              rotation={[0, 0.223, 0]}
              scale={0.834}
            />
          </group>
          <skinnedMesh
            name="Retopo_Sphere004_primitive0"
            geometry={nodes.Retopo_Sphere004_primitive0.geometry}
            material={testMaterial}
            skeleton={nodes.Retopo_Sphere004_primitive0.skeleton}
            position={[1.37, 1.732, -0.435]}
            rotation={[-Math.PI, 0.475, -Math.PI]}
            scale={[-0.65, 0.719, 0.65]}
          />
          <skinnedMesh
            name="Retopo_Sphere004_primitive1"
            geometry={nodes.Retopo_Sphere004_primitive1.geometry}
            material={materials.pants}
            skeleton={nodes.Retopo_Sphere004_primitive1.skeleton}
            position={[1.37, 1.732, -0.435]}
            rotation={[-Math.PI, 0.475, -Math.PI]}
            scale={[-0.65, 0.719, 0.65]}
          />
          <skinnedMesh
            name="Retopo_Sphere004_primitive2"
            geometry={nodes.Retopo_Sphere004_primitive2.geometry}
            material={materials.skin}
            skeleton={nodes.Retopo_Sphere004_primitive2.skeleton}
            position={[1.37, 1.732, -0.435]}
            rotation={[-Math.PI, 0.475, -Math.PI]}
            scale={[-0.65, 0.719, 0.65]}
          />
          <group
            name="Armature003"
            position={[-0.904, 3.258, -1.322]}
            rotation={[0, 0.63, 0]}
            scale={0.202}>
            <primitive object={nodes.Bone_2} />
            <primitive object={nodes.Bone007_2} />
            <primitive object={nodes.Bone008_2} />
          </group>
          <group
            name="Retopo_Sphere009"
            position={[-0.904, 3.258, -1.322]}
            rotation={[0, 0.63, 0]}
            scale={0.202}>
            <group
              name="Empty021"
              position={[0.951, -0.059, 1.676]}
              rotation={[0, -0.594, 0]}
              scale={1.043}
            />
            <group name="Empty022" position={[-0.609, 0.103, 1.839]} scale={0.834} />
          </group>
          <mesh
            name="Cylinder001_primitive0"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder001_primitive0.geometry}
            material={materials['Material.005']}
            position={[-0.853, 3.391, -0.638]}
            rotation={[0, 0.955, 0]}
            scale={[0.071, 0.09, 0.071]}
          />
          <mesh
            name="Cylinder001_primitive1"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder001_primitive1.geometry}
            material={materials['skin.004']}
            position={[-0.853, 3.391, -0.638]}
            rotation={[0, 0.955, 0]}
            scale={[0.071, 0.09, 0.071]}
          />
          <mesh
            name="SCREEN_LAPTOP003_primitive0"
            castShadow
            receiveShadow
            geometry={nodes.SCREEN_LAPTOP003_primitive0.geometry}
            material={materials['KEYBOARD.002']}
            position={[-0.634, 3.346, -0.868]}
            rotation={[1.968, -0.288, -0.595]}
            scale={[-0.164, 0.014, 0.105]}
          />
          <mesh
            name="SCREEN_LAPTOP003_primitive1"
            castShadow
            receiveShadow
            geometry={nodes.SCREEN_LAPTOP003_primitive1.geometry}
            material={materials['CODE_SCREEN_MAT.002']}
            position={[-0.634, 3.346, -0.868]}
            rotation={[1.968, -0.288, -0.595]}
            scale={[-0.164, 0.014, 0.105]}
          />
          <skinnedMesh
            name="Retopo_Sphere009_primitive0"
            geometry={nodes.Retopo_Sphere009_primitive0.geometry}
            material={testMaterial}
            skeleton={nodes.Retopo_Sphere009_primitive0.skeleton}
            position={[-0.7, 3.171, -0.899]}
            rotation={[0, 0.616, 0]}
          />
          <skinnedMesh
            name="Retopo_Sphere009_primitive1"
            geometry={nodes.Retopo_Sphere009_primitive1.geometry}
            material={materials.pants}
            skeleton={nodes.Retopo_Sphere009_primitive1.skeleton}
            position={[-0.7, 3.171, -0.899]}
            rotation={[0, 0.616, 0]}
          />
          <skinnedMesh
            name="Retopo_Sphere009_primitive2"
            geometry={nodes.Retopo_Sphere009_primitive2.geometry}
            material={materials['skin.004']}
            skeleton={nodes.Retopo_Sphere009_primitive2.skeleton}
            position={[-0.7, 3.171, -0.899]}
            rotation={[0, 0.616, 0]}
          />
          <skinnedMesh
            name="Retopo_Sphere001_primitive0"
            geometry={nodes.Retopo_Sphere001_primitive0.geometry}
            material={testMaterial}
            skeleton={nodes.Retopo_Sphere001_primitive0.skeleton}
          />
          <skinnedMesh
            name="Retopo_Sphere001_primitive1"
            geometry={nodes.Retopo_Sphere001_primitive1.geometry}
            material={materials.pants}
            skeleton={nodes.Retopo_Sphere001_primitive1.skeleton}
          />
          <skinnedMesh
            name="Retopo_Sphere001_primitive2"
            geometry={nodes.Retopo_Sphere001_primitive2.geometry}
            material={materials.skin}
            skeleton={nodes.Retopo_Sphere001_primitive2.skeleton}
          />
        </group>

      </group>
    </group>
  );
}

useGLTF.preload("./models/web1-opt.glb");