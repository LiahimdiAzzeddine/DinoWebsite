import { useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useGLTF, PerspectiveCamera, useAnimations } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimationContext } from "./AnimationContext";
import * as THREE from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
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
  const pacmanRef = useRef();
  const manRef=useRef();
  const ball1Ref = useRef();
  const ball2Ref = useRef();
  const ball3Ref = useRef();
  const ball4Ref = useRef();
  const handRef = useRef();
  const workerRef = useRef();
   const girlRef = useRef();
  const currentTween = useRef(null);
  const sceneContainerGroup = useRef();
  const champignonRef = useRef();
  const [confettis, setConfettis] = useState([]);
  const lightRef = useRef();

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




  useLayoutEffect(() => {
    const target = document.documentElement;
    const observer = Observer.create({
      target,
      type: "wheel,touch,pointer,scroll",
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
      const playActionOnce = (actionName, sectionID, scrollSpeed = 1, onFinishCallback = () => { }) => {
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

          onFinishCallback();

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
        onToggle: ({ isActive, getVelocity, direction }) => {
          console.log("🚀 ~ mm.add ~ isActive:", isActive, scrollDirection, direction, velocityD, getVelocity())
          if (isActive) {
            setCurrentModel(sectionID);
            disableOtherSections();
          }
          // Cacher Pacman avant transition
          if (pacmanRef.current && ball1Ref.current && ball2Ref.current && ball3Ref.current && ball4Ref.current && handRef.current) {
            pacmanRef.current.visible = false;
            ball1Ref.current.visible = false;
            ball2Ref.current.visible = false;
            ball3Ref.current.visible = false;
            ball4Ref.current.visible = false;
              handRef.current.visible = false;
          }

          const onFinishCallback = () => {
            // Réactiver Pacman une fois l'action terminée
            if (pacmanRef.current && ball1Ref.current && ball2Ref.current && ball3Ref.current && ball4Ref.current && handRef.current ) {
              setTimeout(() => {
                pacmanRef.current.visible = true;
                ball1Ref.current.visible = true;
                ball2Ref.current.visible = true;
                ball3Ref.current.visible = true;
                ball4Ref.current.visible = true;
                handRef.current.visible = true;
              }, 500);

            }
          };

          const actionName = scrollDirection === 1 ? "Down" : scrollDirection;

          playActionOnce(actionName, sectionID, velocityD, onFinishCallback);

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




  const createConfetti = () => {
    const newConfettis = [];
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7'];

    // Utiliser la position du champignon
    const champignonPosition = [-0.175, 0.096, 0.228];

    for (let i = 0; i < 25; i++) {
      const angle = (Math.PI * 2 * i) / 25; // Corriger le diviseur
      const speed = 2 + Math.random() * 2;

      newConfettis.push({
        id: Date.now() + i,
        position: new THREE.Vector3(
          champignonPosition[0],
          champignonPosition[1] + 0.001, // Légèrement au-dessus
          champignonPosition[2]
        ),
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: new THREE.Vector3(
          Math.cos(angle) * speed,
          Math.random() * 3 + 3,
          Math.sin(angle) * speed
        ),
      });
    }

    setConfettis(newConfettis);
  };

  const handleClick = () => {
    if (!champignonRef.current) return;

    // Annuler animation précédente si en cours
    gsap.killTweensOf(champignonRef.current.scale);

    // Animation type bouton cliqué
    gsap.fromTo(
      champignonRef.current.scale,
      { x: 0.071, y: 0.071, z: 0.071 }, // taille normale
      {
        x: 0.06,
        y: 0.06,
        z: 0.06,
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

  const playOneShotAnimations = (actionNames = [], totalDuration = 1000, callback = () => { }) => {
    if (!Array.isArray(actionNames) || actionNames.length === 0) return;

    const startTime = performance.now();
    const finishedActions = new Set();

    actionNames.forEach((name) => {
      const action = actions[name];
      if (!action) return;

      const clipDuration = action.getClip()?.duration || 1;
      action.reset();
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.timeScale = 1; // jouer à vitesse normale

      // Jouer l'animation
      action.play();

      // Quand l'animation est terminée, figer la dernière frame
      const onFinished = (e) => {
        if (e.action === action) {
          action.time = clipDuration; // dernière frame
          action.paused = true;
          finishedActions.add(name);
          mixer.removeEventListener('finished', onFinished);

          // Si toutes les animations sont finies, vérifier le temps total
          if (finishedActions.size === actionNames.length) {
            const elapsed = performance.now() - startTime;
            const remaining = totalDuration - elapsed;

            if (remaining > 0) {
              setTimeout(() => {
                // Stopper toutes les actions
                actionNames.forEach((n) => {
                  const a = actions[n];
                  if (a) a.stop();
                });
                callback();
              }, remaining);
            } else {
              // Déjà dépassé la durée totale
              actionNames.forEach((n) => {
                const a = actions[n];
                if (a) a.stop();
              });
              callback();
            }
          }
        }
      };

      mixer.addEventListener('finished', onFinished);
    });
  };


  const handleDinoClick = () => {
    if (!dinoRef.current) return;
    playOneShotAnimations(["DinoNotif", "DinoText"], 2000);

    const dino = dinoRef.current;

    // 🔊 Roar synchronisé
    const audio = new Audio('/sounds/dinosaur-roar-with-screams-and-growls-193210.mp3');
    audio.play();

    // 🧠 Initial values
    const initialScale = { ...dino.scale };
    const initialRotY = dino.rotation.y;
    const initialPosZ = dino.position.z;

    const tl = gsap.timeline();

    // 🧩 1. Préparation : Squat rapide (avant rugir)
    tl.to(dino.scale, {
      x: 0.27,
      y: 0.25,
      z: 0.27,
      duration: 0.12,
      ease: 'power3.inOut',
    });

    // 🦕 2. Rugissement : étirement + tête vers l’arrière + recul
    tl.to(dino.scale, {
      x: 0.35,
      y: 0.30,
      z: 0.35,
      duration: 0.2,
      ease: 'power2.out',
    }, "<") // commence en même temps que le squat

      .to(dino.rotation, {
        y: initialRotY + 0.5,
        duration: 0.2,
        ease: 'power1.out',
      }, "<")

      .to(dino.position, {
        z: initialPosZ - 0.015,
        duration: 0.15,
        ease: 'power2.inOut',
      }, "<");

    // 🌬️ 3. Recul du rugissement : retour élastique
    tl.to(dino.scale, {
      x: initialScale.x + 0.01,
      y: initialScale.y + 0.01,
      z: initialScale.z + 0.01,
      duration: 0.25,
      ease: "elastic.out(1, 0.4)",
    });

    tl.to(dino.rotation, {
      y: initialRotY,
      duration: 0.3,
      ease: "elastic.out(1, 0.5)",
    }, "<");

    tl.to(dino.position, {
      z: initialPosZ,
      duration: 0.3,
      ease: "power2.out",
    }, "<");

    // 🌋 4. Mini vibration "sol" (effet impact réaliste)
    tl.to(dino.position, {
      y: "+=0.02",
      repeat: 3,
      yoyo: true,
      duration: 0.05,
      ease: "power1.inOut",
    });

    // 🫁 5. Respiration subtile après rugissement
    tl.to(dino.scale, {
      x: initialScale.x + 0.01,
      y: initialScale.y - 0.005,
      z: initialScale.z + 0.01,
      duration: 0.6,
      yoyo: true,
      repeat: 1,
      ease: "sine.inOut",
    });
  };
const handleWorkerClick = () => {
    if (!workerRef.current) return;
    playOneShotAnimations(["WorkerNotif", "WorkerText"], 5000);
}
const handleGirlClick = () => {
    if (!girlRef.current) return;
    playOneShotAnimations(["FamelNotif", "FamelText"], 4000);
}
const handleManClick = () => {
    if (!girlRef.current) return;
    playOneShotAnimations(["ThinkingNotif", "ThinkingTex"], 4000);
}


  // Animation de clignotement pour attirer l'attention
  const colors = useMemo(() => [
    0xff6b6b, 0x4ecdc4, 0x45b7d1,
    0xf9ca24, 0xf0932b, 0xeb4d4b, 0x6c5ce7
  ], []);

  useFrame((state,clock) => {
    const mesh = glowMeshRef.current;
    const light = directionalLightRef.current;
     if (!lightRef.current){
       // Intensité entre 1.5 et 2.5 avec flicker fixe (sinus)
    const baseIntensity = 2.0;
    const flickerAmplitude = 0.5; // amplitude fixe
    const flickerFrequency = 10; // fréquence fixe (plus grand = plus rapide)

    lightRef.current.intensity =
      baseIntensity + Math.sin(clock.elapsedTime * flickerFrequency) * flickerAmplitude;

    // Position fixe (pas de mouvement)
    lightRef.current.position.set(-1.231, 3.098, 0.988);
     }

    
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
          <group
            name="Sketchfab_model"
            position={[-2.761, 3.549, 0]}
            rotation={[-Math.PI, 0, Math.PI / 2]}
            scale={0.245}>
            <group name="root">
              <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
                <group
                  name="Text1025_1025"
                  position={[0.635, 0, -0.342]}
                  rotation={[Math.PI / 2, 0, 0]}
                />
              </group>
            </group>
          </group>
          <group name="BézierCurve001" position={[-1.151, 1.699, 1.75]} scale={[1.104, 1, 1.104]} />
          <group ref={ball4Ref} visible={true} name="Empty" position={[1.106, 1.058, -0.662]} scale={0.256}>
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
          <group ref={ball1Ref} visible={true} name="Empty007" position={[1.114, 1.058, -0.982]} scale={0.256}>
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
          <group ref={ball2Ref} visible={true} name="Empty008" position={[1.098, 1.058, -0.333]} scale={0.256}>
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
          <group ref={ball3Ref} visible={true} name="Empty009" position={[1.089, 1.058, 0.046]} scale={0.256}>
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
            ref={pacmanRef}
            visible={true}
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
          <group name="All" position={[0.273, 1.626, -0.266]} scale={4.808}>
            <group
              name="Armature001"
              ref={manRef}
              onClick={handleManClick}
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
                ref={workerRef}
                onClick={handleWorkerClick}
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
            <mesh
              name="Cube027"
              castShadow
              receiveShadow
              geometry={nodes.Cube027.geometry}
              material={materials['ArcadeMetal.001']}
              position={[-0.298, 0.262, 0.253]}
              rotation={[3.14, 0.051, 2.935]}
              scale={0.167}>
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
            </mesh>
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
            <group name="Empty002" position={[-0.103, 0.108, 0.162]} scale={0.208}>
              <group name="Retopo_Cube001" rotation={[0, 1.005, 0]} scale={0.29} ref={dinoRef} onClick={handleDinoClick}>
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
            <group name="Empty004" position={[-0.175, 0.096, 0.228]} scale={0.071} ref={champignonRef} onClick={handleClick}>
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
                <mesh
                  ref={glowMeshRef}
                  name="Cube009_2"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube009_2.geometry}
                  material={materials['Material.018'].clone()} // Clone pour éviter de modifier l'original
                />
              </group>
            </group>
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
                ref={girlRef}
                onClick={handleGirlClick}
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
            <mesh
              name="Sketch01"
              castShadow
              receiveShadow
              geometry={nodes.Sketch01.geometry}
              material={materials['Material.011']}
              position={[-0.294, 0.263, 0.254]}
              rotation={[3.14, 0.051, 2.935]}
              scale={0.167}
            />
          </group>
          <group name="Notif1" position={[-0.433, 2.926, 0.194]} scale={1.336}>
            <mesh
              name="Plane001"
              castShadow
              receiveShadow
              geometry={nodes.Plane001.geometry}
              material={materials['Material.008']}
              rotation={[Math.PI / 2, 0, -0.265]}
              scale={0.001}
            />
          </group>
          <group name="Notif1001" position={[1.054, 2, -0.106]} rotation={[Math.PI, -0.439, Math.PI]}>
            <mesh
              name="Plane002"
              castShadow
              receiveShadow
              geometry={nodes.Plane002.geometry}
              material={materials['Material.008']}
              rotation={[Math.PI / 2, 0, -0.265]}
              scale={0.001}
            />
            <mesh
              name="Text002"
              castShadow
              receiveShadow
              geometry={nodes.Text002.geometry}
              material={materials['Material.012']}
              position={[0.34, -0.003, -0.106]}
              scale={0}
            />
          </group>
          <group
            name="Notif1002"
            position={[-0.366, 2.376, 0.594]}
            rotation={[Math.PI, -0.093, Math.PI]}
            scale={0.492}>
            <mesh
              name="Plane003"
              castShadow
              receiveShadow
              geometry={nodes.Plane003.geometry}
              material={materials['Material.008']}
              rotation={[Math.PI / 2, 0, -0.265]}
              scale={0.001}
            />
            <mesh
              name="Text001"
              castShadow
              receiveShadow
              geometry={nodes.Text001.geometry}
              material={materials['Material.012']}
              position={[0.271, 0.014, -0.096]}
              scale={0}
            />
            <mesh
              name="Text003"
              castShadow
              receiveShadow
              geometry={nodes.Text003.geometry}
              material={materials['Material.012']}
              position={[-0.494, 1.059, 0.905]}
              scale={0}
            />
          </group>
          <group
            name="FamleNotif"
            position={[-0.697, 3.575, -1.443]}
            rotation={[0, 0.667, 0]}
            scale={1.495}>
            <mesh
              name="FamleText"
              castShadow
              receiveShadow
              geometry={nodes.FamleText.geometry}
              material={materials['Material.012']}
              position={[0.298, 0.008, -0.07]}
              scale={0}
            />
            <mesh
              name="Plane004"
              castShadow
              receiveShadow
              geometry={nodes.Plane004.geometry}
              material={materials['Material.008']}
              rotation={[Math.PI / 2, 0, -0.265]}
              scale={0.001}
            />
          </group>
          <group
            name="Hand"
            ref={handRef}
            position={[-1.231, 3.098, 0.988]}
            rotation={[1.592, 1.279, 0]}
            scale={1.292}>
            <mesh
              name="Curve001"
              castShadow
              receiveShadow
              geometry={nodes.Curve001.geometry}
              material={materials['Material.004']}
              position={[0.136, -0.029, -0.076]}
              rotation={[-1.577, 0.02, -2.85]}
              scale={0.851}
            />
          </group>
           {/* Lumière pointuelle flicker */}
      <pointLight
        ref={lightRef}
        position={[-1.231, 3.098, 0.988]}
        intensity={2}
        distance={5} // portée de la lumière
        color={"#ffffaa"}
        castShadow={false}
      />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('./models/cleanmodef.glb')