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
import { Observer } from "gsap/Observer";

gsap.registerPlugin(Observer);

export default function Web1({ sectionID, isActive, lenis, ...props }) {
  const gl = useThree((state) => state.gl);
  const group = useRef();
  const glowMeshRef = useRef();
  const directionalLightRef = useRef();
  const dinoRef = useRef();
  const bubbleRef = useRef();
  const currentTween = useRef(null);
  const sceneContainerGroup = useRef();
  const allref = useRef();
  const champignonRef = useRef();
  const [confettis, setConfettis] = useState([]);

  const { nodes, materials, animations } = useGLTF('./models/cleanmodef.glb')
  const { actions, mixer } = useAnimations(animations, group)
  const { setCurrentModel } = useContext(AnimationContext);

  const timelineMain = useRef();
  const { viewport } = useThree()
  let scrollDirection = 1;
  let velocityD = 0;

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


  useEffect(() => {
    const target = document.documentElement;
    const observer = Observer.create({
      target,
      type: "wheel,touch,pointer",
      onChange: (obs) => {
        scrollDirection = obs.deltaY > 0 ? "UP" : "Down";
        velocityD = obs.velocityY;

      },
      preventDefault: true,
    });

    return () => observer.kill();
  }, []);

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
    let isTransitioning = false;

    mm.add("(min-width: 768px)", () => {
      //sceneGroup.position.set(defaultPosition.x, defaultPosition.y, defaultPosition.z);
      const playActionOnce = (actionName, sectionID, scrollSpeed = 1) => {
        if (actionName === "Down") {
          setCurrentModel(sectionID);
          disableOtherSections();
        }
        if (isTransitioning) return;

        const action = actions[actionName];
        if (!action) return;

        const oppositeName = actionName === "UP" ? "Down" : "UP";

        const oppositeAction = actions[oppositeName];
        if (oppositeAction) oppositeAction.stop();

        isTransitioning = true;

        action.reset().setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;
        action.time = 0;

        const minSpeed = 2;
        const maxSpeed = 5;
        const scale = Math.min(Math.max(Math.abs(scrollSpeed / 1000), minSpeed), maxSpeed);
        action.timeScale = scale;



        const onFinish = () => {
          isTransitioning = false;
          mixer.removeEventListener('finished', onFinish);

          if (actionName === "UP") {
            nextScrollTrigger?.enable();
          }
        };

        mixer.addEventListener('finished', (e) => {
          if (e.action === action) onFinish();
        });

        action.play();
      };



      const trigger1 = ScrollTrigger.create({
        id: sectionID,
        trigger: "#section2",
        start: "top bottom",
        end: "center-=200 top",
        scrub: true,
        markers: true,
        onUpdate: ({ progress }) => {
          killTween();
          currentTween.current = gsap.to(camAct, {
            time: progress * clipDur,
            duration: 0.1,
            ease: "sine.out",
            overwrite: true,
          });
        },

      });


      const trigger = ScrollTrigger.create({
        id: sectionID,
        trigger: "#section1",
        start: "top bottom",            // quand la base de section1 atteint le bas du viewport
        endTrigger: "#section2",           // noued de fin placé sur section2
        end: "center+=100 top",            // quand le centre de section2 atteint 100px sous le haut du viewport
        scrub: true,
        markers: false,
        onToggle: ({ isActive }) => {
          if (scrollDirection == 1) {
            playActionOnce("Down", sectionID, velocityD);
          } else {
            playActionOnce(scrollDirection, sectionID, velocityD);
          }

        },

      });

      return () => { trigger.kill(); trigger1.kill() };
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
    <group ref={group} {...props} dispose={null} visible={isActive} >
      <group name="Scene">

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
          <group name="BézierCurve001" position={[-1.151, 1.699, 1.75]} scale={[1.104, 1, 1.104]} />
          <group name="Empty" position={[1.106, 1.058, -0.662]} scale={0.256}>
            <mesh
              name="Sphere"
              castShadow
              receiveShadow
              geometry={nodes.Sphere.geometry}
              material={materials['Material.003']}
              position={[0.003, -0.01, 0]}
              scale={[0.385, 0.379, 0.379]}
            />
          </group>
          <group name="BézierCurve002" position={[-1.017, 10.239, 1.56]} />
          <group name="Empty007" position={[1.114, 1.058, -0.982]} scale={0.256}>
            <mesh
              name="Sphere004"
              castShadow
              receiveShadow
              geometry={nodes.Sphere004.geometry}
              material={materials['Material.003']}
              position={[0.003, -0.01, 0]}
              scale={[0.385, 0.379, 0.379]}
            />
          </group>
          <group name="Empty008" position={[1.098, 1.058, -0.333]} scale={0.256}>
            <mesh
              name="Sphere008"
              castShadow
              receiveShadow
              geometry={nodes.Sphere008.geometry}
              material={materials['Material.003']}
              position={[0.003, -0.01, 0]}
              scale={[0.385, 0.379, 0.379]}
            />
          </group>
          <group name="Empty009" position={[1.089, 1.058, 0.046]} scale={0.256}>
            <mesh
              name="Sphere009"
              castShadow
              receiveShadow
              geometry={nodes.Sphere009.geometry}
              material={materials['Material.003']}
              position={[0.003, -0.01, 0]}
              scale={[0.385, 0.379, 0.379]}
            />
          </group>
          <group
            name="Empty010"
            position={[1.123, 1.058, -1.336]}
            rotation={[-0.052, 0.055, -0.004]}
            scale={0.256}>
            <group
              name="Sphere010"
              position={[0.003, 0.291, 0]}
              rotation={[-0.595, 0, 0]}
              scale={[0.503, 0.494, 0.494]}>
              <mesh
                name="Sphere008_1"
                castShadow
                receiveShadow
                geometry={nodes.Sphere008_1.geometry}
                material={materials['Material.003']}
              />
              <mesh
                name="Sphere008_2"
                castShadow
                receiveShadow
                geometry={nodes.Sphere008_2.geometry}
                material={materials.Material}
              />
            </group>
            <group
              name="Sphere011"
              position={[0.003, 0.291, 0]}
              rotation={[0.524, 0, Math.PI]}
              scale={[0.503, 0.494, 0.494]}>
              <mesh
                name="Sphere016"
                castShadow
                receiveShadow
                geometry={nodes.Sphere016.geometry}
                material={materials['Material.003']}
              />
              <mesh
                name="Sphere016_1"
                castShadow
                receiveShadow
                geometry={nodes.Sphere016_1.geometry}
                material={materials.Material}
              />
            </group>
          </group>
          <group name="All" position={[0.273, 1.626, -0.266]} scale={4.808} ref={allref}>
            <group
              name="Armature001"
              position={[-0.207, 0.244, 0.091]}
              rotation={[0, -0.251, 0]}
              scale={0.046}>
              <group name="Retopo_Sphere001">
                <skinnedMesh
                  name="mesh001"
                  geometry={nodes.mesh001.geometry}
                  material={materials['Material.016']}
                  skeleton={nodes.mesh001.skeleton}
                />
                <skinnedMesh
                  name="mesh001_1"
                  geometry={nodes.mesh001_1.geometry}
                  material={materials.pants}
                  skeleton={nodes.mesh001_1.skeleton}
                />
                <skinnedMesh
                  name="mesh001_2"
                  geometry={nodes.mesh001_2.geometry}
                  material={materials.skin}
                  skeleton={nodes.mesh001_2.skeleton}
                />
                <group name="Empty005" position={[0.606, -0.576, 0.21]} scale={1.043} />
                <group name="Empty006" position={[-0.672, -0.557, 0.358]} scale={0.834} />
              </group>
              <primitive object={nodes.Bone} />
              <primitive object={nodes.Bone007} />
              <primitive object={nodes.Bone008} />
            </group>
            <mesh
              name="Circle005"
              castShadow
              receiveShadow
              geometry={nodes.Circle005.geometry}
              material={nodes.Circle005.material}
              position={[-0.274, 0.029, -0.162]}
              scale={0.208}
            />
            <mesh
              name="Circle012"
              castShadow
              receiveShadow
              geometry={nodes.Circle012.geometry}
              material={nodes.Circle012.material}
              position={[-0.306, 0.009, 0.423]}
              scale={[0.23, 0.208, 0.23]}
            />
            <group name="Cube001" position={[-0.222, -0.019, -0.122]} scale={0.208}>
              <mesh
                name="Cube018"
                castShadow
                receiveShadow
                geometry={nodes.Cube018.geometry}
                material={materials['Material.004']}
              />
              <mesh
                name="Cube018_1"
                castShadow
                receiveShadow
                geometry={nodes.Cube018_1.geometry}
                material={materials['Material.001']}
              />
            </group>
            <group
              name="Cube003"
              position={[0.228, 0.022, -0.035]}
              rotation={[0, -0.475, -Math.PI]}
              scale={[-0.135, -0.149, -0.135]}>
              <mesh
                name="Cube011"
                castShadow
                receiveShadow
                geometry={nodes.Cube011.geometry}
                material={materials['ArcadeBase.002']}
              />
              <mesh
                name="Cube011_1"
                castShadow
                receiveShadow
                geometry={nodes.Cube011_1.geometry}
                material={materials['Material.023']}
              />
              <group
                name="Armature004"
                position={[-0.046, -0.107, -0.705]}
                rotation={[-1.718, 0.101, -3.135]}
                scale={[0.337, 0.336, 0.306]}>
                <group name="Retopo_Sphere004">
                  <skinnedMesh
                    name="mesh008"
                    geometry={nodes.mesh008.geometry}
                    material={materials['Material.020']}
                    skeleton={nodes.mesh008.skeleton}
                  />
                  <skinnedMesh
                    name="mesh008_1"
                    geometry={nodes.mesh008_1.geometry}
                    material={materials['pants.002']}
                    skeleton={nodes.mesh008_1.skeleton}
                  />
                  <skinnedMesh
                    name="mesh008_2"
                    geometry={nodes.mesh008_2.geometry}
                    material={materials['skin.002']}
                    skeleton={nodes.mesh008_2.skeleton}
                  />
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
                <primitive object={nodes.Bone_1} />
                <primitive object={nodes.Bone007_1} />
                <primitive object={nodes.Bone008_1} />
              </group>
              <group name="Cube032">
                <mesh
                  name="Cube037"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube037.geometry}
                  material={materials['ArcadeBase.002']}
                />
                <mesh
                  name="Cube037_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube037_1.geometry}
                  material={materials['ArcadeMetal.003']}
                />
                <mesh
                  name="Cube037_2"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube037_2.geometry}
                  material={materials['Material.021']}
                />
                <mesh
                  name="Cube037_3"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube037_3.geometry}
                  material={materials['Material.023']}
                />
                <mesh
                  name="Cube037_4"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube037_4.geometry}
                  material={materials['Material.024']}
                />
                <mesh
                  name="Cube037_5"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube037_5.geometry}
                  material={materials['Material.025']}
                />
              </group>
            </group>
            <mesh
              name="Cube005"
              castShadow
              receiveShadow
              geometry={nodes.Cube005.geometry}
              material={materials['Material.002']}
              position={[-0.054, -0.032, 0.074]}
              scale={0.208}
            />
            <group
              name="Cube027"
              position={[-0.298, 0.262, 0.253]}
              rotation={[3.14, 0.051, 2.935]}
              scale={0.167}>
              <mesh
                name="Cube015"
                castShadow
                receiveShadow
                geometry={nodes.Cube015.geometry}
                material={materials['ArcadeMetal.001']}
              />
              <mesh
                name="Cube015_1"
                castShadow
                receiveShadow
                geometry={nodes.Cube015_1.geometry}
                material={materials['Material.011']}
              />
              <mesh
                name="Cube015_2"
                castShadow
                receiveShadow
                geometry={nodes.Cube015_2.geometry}
                material={materials['Material.016']}
              />
              <mesh
                name="Cube015_3"
                castShadow
                receiveShadow
                geometry={nodes.Cube015_3.geometry}
                material={materials['Material.013']}
              />
              <group
                name="Cylinder005"
                position={[0.07, -0.534, -0.167]}
                rotation={[-1.735, 1.532, -1.233]}
                scale={[0.021, 0.453, 0.021]}>
                <mesh
                  name="Cylinder013"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder013.geometry}
                  material={materials['Material.010']}
                />
                <mesh
                  name="Cylinder013_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder013_1.geometry}
                  material={materials.Blackk}
                />
              </group>
              <group
                name="Cylinder006"
                position={[0.043, -0.098, -0.004]}
                rotation={[-1.735, 1.532, 0.154]}
                scale={[0.027, 0.292, 0.027]}>
                <mesh
                  name="Cylinder012"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder012.geometry}
                  material={nodes.Cylinder012.material}
                />
                <mesh
                  name="Cylinder012_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder012_1.geometry}
                  material={materials.Blackk}
                />
              </group>
              <group
                name="Cylinder007"
                position={[0.229, -0.492, -0.005]}
                rotation={[-0.01, 0.006, 0.48]}
                scale={[0.021, 0.454, 0.02]}>
                <mesh
                  name="Cylinder014"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder014.geometry}
                  material={materials['Material.009']}
                />
                <mesh
                  name="Cylinder014_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder014_1.geometry}
                  material={materials.Blackk}
                />
              </group>
            </group>
            <mesh
              name="Cylinder002"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder002.geometry}
              material={materials['Material.022']}
              position={[-0.103, 0.208, -0.083]}
              rotation={[Math.PI, -0.93, Math.PI]}
              scale={0.01}
            />
            <group name="Empty002" position={[-0.104, 0.107, 0.162]} scale={0.208}>
              <group name="Retopo_Cube001" rotation={[0, 1.005, 0]} scale={0.29}>
                <mesh
                  name="mesh003"
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh003.geometry}
                  material={materials['spike.001']}
                />
                <mesh
                  name="mesh003_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh003_1.geometry}
                  material={materials['Material.005']}
                />
                <mesh
                  name="mesh003_2"
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh003_2.geometry}
                  material={materials.Blackk}
                />
              </group>
            </group>
            <group name="Empty004" position={[-0.175, 0.096, 0.228]} scale={0.071}>
              <group name="Cube004" scale={[3.169, 3.251, 3.169]}>
                <mesh
                  name="Cube009"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube009.geometry}
                  material={materials['Material.014']}
                />
                <mesh
                  name="Cube009_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube009_1.geometry}
                  material={materials['Material.017']}
                />
                <mesh
                  name="Cube009_2"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube009_2.geometry}
                  material={materials['Material.018']}
                />
              </group>
            </group>
            <mesh
              name="GroundCubeQuad003"
              castShadow
              receiveShadow
              geometry={nodes.GroundCubeQuad003.geometry}
              material={materials.Ground_FileSize_Mat}
              position={[-0.05, -0.539, 0.017]}
              scale={[0.254, 0.207, 0.216]}
            />
            <mesh
              name="LAPTOP001"
              castShadow
              receiveShadow
              geometry={nodes.LAPTOP001.geometry}
              material={materials['BASE_LAPTOP_MAT.002']}
              position={[0.249, -0.014, 0.138]}
              rotation={[-Math.PI, 1.334, -Math.PI]}
              scale={[-0.034, -0.003, -0.022]}
            />
            <mesh
              name="Plane"
              castShadow
              receiveShadow
              geometry={nodes.Plane.geometry}
              material={materials.Desk}
              position={[-0.202, 0.321, -0.132]}
              rotation={[0, 0.616, 0]}
              scale={0.208}>
              <group
                name="Armature003"
                position={[0.077, 0.087, -0.463]}
                rotation={[0, 0.014, 0]}
                scale={0.202}>
                <group name="Retopo_Sphere009">
                  <skinnedMesh
                    name="mesh013"
                    geometry={nodes.mesh013.geometry}
                    material={materials['Material.032']}
                    skeleton={nodes.mesh013.skeleton}
                  />
                  <skinnedMesh
                    name="mesh013_1"
                    geometry={nodes.mesh013_1.geometry}
                    material={materials['pants.004']}
                    skeleton={nodes.mesh013_1.skeleton}
                  />
                  <skinnedMesh
                    name="mesh013_2"
                    geometry={nodes.mesh013_2.geometry}
                    material={materials['skin.004']}
                    skeleton={nodes.mesh013_2.skeleton}
                  />
                  <group
                    name="Empty021"
                    position={[0.951, -0.059, 1.676]}
                    rotation={[0, -0.594, 0]}
                    scale={1.043}
                  />
                  <group name="Empty022" position={[-0.609, 0.103, 1.839]} scale={0.834} />
                </group>
                <primitive object={nodes.Bone_2} />
                <primitive object={nodes.Bone007_2} />
                <primitive object={nodes.Bone008_2} />
              </group>
              <group
                name="Cylinder001"
                position={[-0.276, 0.22, 0.125]}
                rotation={[0, 0.339, 0]}
                scale={[0.071, 0.09, 0.071]}>
                <mesh
                  name="Cylinder015"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder015.geometry}
                  material={materials['Material.031']}
                />
                <mesh
                  name="Cylinder015_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder015_1.geometry}
                  material={materials['skin.004']}
                />
              </group>
              <mesh
                name="LAPTOP003"
                castShadow
                receiveShadow
                geometry={nodes.LAPTOP003.geometry}
                material={materials['BASE_LAPTOP_MAT.002']}
                position={[0.03, 0.063, -0.101]}
                rotation={[0, 0.037, 0]}
                scale={[-0.164, -0.014, -0.105]}
              />
              <group
                name="SCREEN_LAPTOP003"
                position={[0.035, 0.175, 0.064]}
                rotation={[-1.085, 0.017, 0.033]}
                scale={[-0.164, -0.014, -0.105]}>
                <mesh
                  name="Cube045"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube045.geometry}
                  material={materials['KEYBOARD.002']}
                />
                <mesh
                  name="Cube045_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube045_1.geometry}
                  material={materials['CODE_SCREEN_MAT.002']}
                />
              </group>
            </mesh>
            <group
              name="SCREEN_LAPTOP001"
              position={[0.283, 0.009, 0.13]}
              rotation={[-1.694, 0.471, 1.837]}
              scale={[-0.034, -0.003, -0.022]}>
              <mesh
                name="Cube002"
                castShadow
                receiveShadow
                geometry={nodes.Cube002.geometry}
                material={materials['KEYBOARD.002']}
              />
              <mesh
                name="Cube002_1"
                castShadow
                receiveShadow
                geometry={nodes.Cube002_1.geometry}
                material={materials['CODE_SCREEN_MAT.002']}
              />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('./models/cleanmodef.glb')