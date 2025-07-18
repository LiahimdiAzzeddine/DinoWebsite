import {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useCallback,
} from "react";
import { useGraph, useThree } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { AnimationContext } from "./AnimationContext";
import { useLocation } from "react-router-dom";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Observer } from "gsap/Observer";
//import SmokeParticles from "../SmokeParticles";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer);

// Constants
const ANIMATION_GROUPS = {
  FIRST: [
    "1.Tour",
    "1.hook",
    "1.slider",
    "3.ManAnimation",
    "Empty.005Action.001",
    "Empty.006Action",
    'DownMan',
  ],
  SCROLL: [
    "2.Ladder2ndScroll",
    "4.Head2ndScroll",
    "5.Metal2ndScroll",
    "6.WaterTower2ndScroll",
    "7.Door2ndScroll",
    "9.Rocket2ndScroll",
  ],
  SECOND_SCROLL: ["ActionEnter", "8.Rocket3rdScroll"],
};

const PARTICLE_CONFIG = {
  count: 150,
  position: [0, -3.5, 0],
  velocityRange: 0.02,
  lifeRange: [100, 200],
  scaleRange: [0.2, 0.7],
  deltaMultiplier: 30,
  colors: {
    birth: 0xbdbbbb,
    death: 0xffffff,
  },
};

const CAMERA_CONFIG = {
  far: 1000,
  near: 0.1,
  fov: 19.157,
  position: [4.089, 2.103, -0.346],
  rotation: [-Math.PI / 2, 1.519, Math.PI / 2],
  scale: 0.217,
};
const SCROLL_TRIGGERS = {
  MAIN: {
    trigger: "#section4",
    start: "center+=100 bottom",
    end: "#section5 bottom",
  },
  SECONDARY: {
    trigger: "#section5",
    start: "top+=45% bottom",
    end: "bottom+=30% top",
    scrub: 2.5,
  },
  ARMATURE: {
    trigger: "#section6",
    start: "top-=40% center",
    end: "top top",
  },
};

const SCALE_CONFIG = {
  original: { x: 0.029, y: 0.029, z: 0.029 },
  hidden: { x: 0, y: 0, z: 0 },
  duration: 0.5,
  ease: "power2.out",
};


export default function Web3({ sectionID, isActive, ...props }) {
  // Context and state
  const { setCurrentModel } = useContext(AnimationContext);
  const { viewport } = useThree();

  // Refs
  const group = useRef();
  const ManRef = useRef();
  const rocketRef = useRef();
  const currentTween = useRef(null);
  const sceneContainerGroup = useRef();
  const armatureRef = useRef();
  const armatureAnimationRef = useRef(null);
  const initialY = useRef(0);
  const prevScrollTrigger = useRef(null);
  const location = useLocation();
  let scrollDirection = 'Up';
  let velocityD = 0;
  let isTransitioning = false;
  let lastScrollTime = 0;


  // GLTF loading and setup
  const { scene, animations } = useGLTF("./models/LastRocket.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions, mixer } = useAnimations(animations, group);
  // Responsive positioning
  const scenePositioning = useMemo(() => ({
    positionZ: viewport.width < 1 ? -0.3 :10,
    wavingManPositionX: viewport.width < 1 ? -1 : 0,
    wavingManPositionZ: viewport.width < 1 ? 0.48 : 0,
  }), [viewport.width]);

  useLayoutEffect(() => {
    const target = document.documentElement;
    const observer = Observer.create({
      target,
      type: "wheel,touch,pointer,scroll",
      onChange: (obs) => {
        scrollDirection = obs.deltaY >= 0 ? "Up" : "Down";
        velocityD = obs.velocityY;
      },
      //preventDefault: true,
    });
    return () => observer.kill();
  }, []);

  useEffect(() => {

  }, [])

  // Animation control functions
  const resetAllActions = useCallback(() => {
    Object.values(actions).forEach((action) => {

      action.reset().paused = true;
    });
  }, [actions]);
  const resetAllActionsExceptUpDown = useCallback(() => {
    Object.entries(actions).forEach(([name, action]) => {
      if (name !== "Up" && name !== "Down") {
        action.reset().paused = true;
      }
    });
  }, [actions]);

  const scaleManToOriginalSize = useCallback(() => {
    if (!ManRef.current) return;
    gsap.to(ManRef.current.scale, {
      ...SCALE_CONFIG.original,
      duration: SCALE_CONFIG.duration,
      ease: SCALE_CONFIG.ease,
    });
  }, []);

  const scaleManToHidden = useCallback(() => {
    if (!ManRef.current) return;
    gsap.to(ManRef.current.scale, {
      ...SCALE_CONFIG.hidden,
      duration: SCALE_CONFIG.duration,
      ease: SCALE_CONFIG.ease,
    });
  }, []);



  const playIntroAnimations = useCallback((reversed = false) => {
    scaleManToOriginalSize();

    if (!reversed) {
      ANIMATION_GROUPS.FIRST.forEach((name) => actions[name]?.reset().play());
      actions["Armature.001Action"]?.reset().play();
    }
  }, []);

   const detectFastScroll = useCallback((velocity, observerVelocity) => {
    const currentTime = Date.now();
    const timeDiff = currentTime - lastScrollTime;
    lastScrollTime = currentTime;
    
    // Considérer comme rapide si vélocité ScrollTrigger > 2000 OU vélocité Observer > 10000
    const isFastByVelocity = Math.abs(velocity) > 2000 || Math.abs(observerVelocity) > 10000 || velocity==0 || observerVelocity==0;
    const isFastByTime = timeDiff < 16;
    
    console.log('DetectFastScroll:', { 
      velocity, 
      observerVelocity, 
      timeDiff, 
      isFastByVelocity, 
      isFastByTime 
    });
    
    return isFastByVelocity || isFastByTime;
  }, []);

  // Scroll trigger management
  const disableOtherSections = useCallback(() => {

    if (!prevScrollTrigger.current) {
      const currentScrollTrigger = ScrollTrigger.getById(sectionID);
      if (currentScrollTrigger?.previous()) {
        prevScrollTrigger.current = currentScrollTrigger.previous();
        prevScrollTrigger.current.disable();
      }
    } else {
      prevScrollTrigger.current.disable();
    }
  }, []);

  const enableOtherSections = useCallback(() => {
    ScrollTrigger.getAll().forEach((trigger) => {
      if (
        trigger.id !== sectionID &&
        trigger.id !== sectionID + "_secondary" &&
        trigger.id !== sectionID + "_armatureMove"
      ) {
        trigger.enable();
      }
    });
  }, []);

  const stopArmatureAnimation = useCallback(() => {
    if (armatureAnimationRef.current) {
      armatureAnimationRef.current.kill();
      armatureAnimationRef.current = null;
    }
  }, []);

  // Animation handlers
  const handleScrollAnimations = useCallback(() => {
    const action = actions["1.2ndScroll"];
    if (action) {

      action.reset();
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.time = action.getClip().duration - 0.1;
      action.timeScale = 1;
      action.enabled = true;
      action.setEffectiveWeight(1);
      action.paused = false;
      action.play();
    }

    ANIMATION_GROUPS.SCROLL.forEach((name) => {
      const anim = actions[name];
      if (anim) {
        anim.reset();
        anim.setLoop(THREE.LoopOnce, 1);
        anim.clampWhenFinished = true;

        // Définir la vitesse selon l'animation
        if (name === "9.Rocket2ndScroll") {
          anim.timeScale = 20; // 1.5x plus rapide
        } else {
          anim.timeScale = 1; // Vitesse normale
        }

        anim.play();
      }
    });

    scaleManToHidden();

    const mainScroll = actions[ANIMATION_GROUPS.SCROLL[6]];
    if (mainScroll) {
      const onActionFinished = (event) => {
        if (event.action === mainScroll) {
          mainScroll.getMixer().removeEventListener("finished", onActionFinished);
        }
      };
      mainScroll.getMixer().addEventListener("finished", onActionFinished);
    }
  }, []);

  const handleScrollAnimationsReverse = useCallback(() => {
    scaleManToOriginalSize();

    ANIMATION_GROUPS.SCROLL.forEach((name) => {
      const anim = actions[name];
      if (anim) {
        anim.reset();
        anim.setLoop(THREE.LoopOnce, 1);
        anim.clampWhenFinished = true;
        anim.time = 0.3;
        anim.timeScale = -1;
        anim.play();
      }
    });

    const action = actions["1.2ndScroll"];
    if (action) {
      action.reset();
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.time = action.getClip().duration;
      action.timeScale = -1;
      action.enabled = true;
      action.setEffectiveWeight(1);
      action.paused = false;
      action.play();
    }
  }, []);

  const handleProgressUpdate = useCallback((progress) => {
    ANIMATION_GROUPS.SECOND_SCROLL.forEach((name) => {
      const action = actions[name];
      if (action) {
        const duration = action.getClip().duration;
        action.paused = true;
        action.time = duration * progress;
        action.getMixer().update(0);
        action.play();
      }
    });
  }, []);

  // Initialize armature position
  useEffect(() => {
    if (armatureRef.current?.position) {
      initialY.current = armatureRef.current.position.y;
    }
  }, []);

  const playActionOnce = (actionName, sectionID, scrollSpeed = 1, onFinishCallback = () => { }) => {
    if (isTransitioning) return;

    const action = actions[actionName];
    if (!action) return;

    const oppositeName = actionName === "Up" ? "Down" : "Up";
    const oppositeAction = actions[oppositeName];
    if (oppositeAction) oppositeAction.stop();

    isTransitioning = true;

    action.reset().setLoop(THREE.LoopOnce, 1);
    action.clampWhenFinished = true;
    action.time = 0;

    const minSpeed = 2;
    const maxSpeed = 5;
    const scale = Math.min(Math.max(Math.abs(scrollSpeed / 1000), minSpeed), maxSpeed);
    //action.timeScale = scale;

    action.timeScale = 0.5;
      gsap.to(action, {
        timeScale: scale,
        duration:0.1,
        ease: "slow(0.7,0.7,false)",
            overwrite: true,
      });

    // ⚠️ Supprime tous les anciens listeners sur "finished"
    if (mixer && mixer._listeners && mixer._listeners.finished) {
      mixer._listeners.finished = [];
    }
    // Déclarer le handler séparément
    const onMixerFinished = (e) => {
      if (e.action === action) {
        mixer.removeEventListener('finished', onMixerFinished); // supprime ce listener
        isTransitioning = false;
        onFinishCallback();
      }
    };

    mixer.addEventListener('finished', onMixerFinished); // bon ajout

    action.play();
  };

  // Main scroll trigger setup
  useLayoutEffect(() => {
    resetAllActions();
    const mm = gsap.matchMedia();
    const minY = 0;
    const maxY = 1;
    let mainTrigger = null;
    let secondaryTrigger = null;
    let armatureTrigger = null;

    mm.add("(min-width: 768px)", () => {
        setTimeout(() => {
      ScrollTrigger.getById('web3')?.refresh();
    }, 100);
      mainTrigger = ScrollTrigger.create({
        id: sectionID,
        trigger: "#section3",
        start: "center+=220 top",
        endTrigger: "#section5",
        end: "center bottom",
        //preventClicks: true,
        markers: false,
        onToggle: ({ isActive }) => {
          console.log("🚀 ~ mm.add ~ isActive:", isActive, scrollDirection)

          if (isActive) {
            setCurrentModel(sectionID);
            disableOtherSections();
          }

          const actionName = scrollDirection;
          if (isActive) {
            if (actionName == "Up") {
              resetAllActionsExceptUpDown();
              playIntroAnimations();

            } else {
            }

          } else {
            if (actionName == "Down") {

            }

          }
          const onFinishCallback = () => {

            if (actionName == "Down") {
              if (prevScrollTrigger.current) {
                prevScrollTrigger.current.enable();

              }
             

            }
          };

          if (!(scrollDirection == "Down" && isActive) && !(scrollDirection == "Up" && !isActive)) {
            playActionOnce(actionName, sectionID, velocityD, onFinishCallback);
          }




        },
        onLeave:()=>{
          console.log("🚀 ~ mm.add ~ onLeave:")
          if(velocityD==0 && scrollDirection=="Up"){
           playActionOnce("Up", sectionID, 200000, ()=>{console.log("worked"),playIntroAnimations();}); 
           
          }
        }

      });
      return () => mainTrigger.kill();
    });
    // Secondary scroll trigger
    mm.add("(min-width: 767px)", () => {
        setTimeout(() => {
      ScrollTrigger.getById('web3_secondary')?.refresh();
    }, 100);
      secondaryTrigger = ScrollTrigger.create({
        id: sectionID + "_secondary",
        trigger: "#section5",
        start: "center bottom",
        end: "bottom+=30% top",
        markers: false,
        // onToggle: ({ isActive }) => {
        //   console.log("🚀 ~ mm.add ~ secondaryTrigger:", isActive, scrollDirection)

        //   if (isActive) {
        //     setCurrentModel(sectionID);
        //     disableOtherSections();
        //   }
        //   const actionName = scrollDirection;
        //   if (isActive) {
        //     if (actionName == "Up") {
        //       setCurrentModel(sectionID);
        //       disableOtherSections();
        //       if (Math.abs(velocityD) > 1000) {
        //         setTimeout(() => {
        //           handleScrollAnimations();
        //         }, 500);
        //       } else {
        //                  handleScrollAnimationsReverse();
        //   if (Math.abs(velocityD) > 2000) {
        //     enableOtherSections();
        //   }
        //       }
        //     } else {
        //       handleScrollAnimationsReverse();
        //       if (Math.abs(velocityD) > 1000) {
        //         enableOtherSections();
        //       }
        //     }
        //   }
        // },
        onEnter: (self) => {
          const currentVelocity = self.getVelocity();
          const isFastScroll = detectFastScroll(currentVelocity, velocityD);
        
          const shouldActivate = isFastScroll || Math.abs(currentVelocity) > 2000 || velocityD > 10000;

          setCurrentModel(sectionID);
          disableOtherSections();
          if (shouldActivate) {
            setTimeout(() => {
              handleScrollAnimations();
            }, 100);
          } else {
            handleScrollAnimations();
          }

        },
        onLeaveBack: (self) => {
          const currentVelocity = self.getVelocity();
          const isFastScroll = detectFastScroll(currentVelocity, velocityD);
        
          const shouldActivate = isFastScroll || Math.abs(currentVelocity) > 2000 || velocityD > 10000;
          handleScrollAnimationsReverse();
          if (shouldActivate) {
            enableOtherSections();
          }
        },
        onUpdate: (self) => {
          handleProgressUpdate(self.progress);
        },
        onLeave: () => {
          ScrollTrigger.getById('web3_armatureMove')?.enable()
        }
      });
      return () => secondaryTrigger.kill();
    });
     mm.add("(min-width: 768px)", () => {

      const startY = armatureRef.current.position.y;
      const adjustedStartY = startY + 0.01;
      const endY = adjustedStartY+0.05;

   // Vérifier si c'est un refresh en utilisant sessionStorage

    setTimeout(() => {
      ScrollTrigger.getById('web3_armatureMove')?.refresh();
    }, 100);
  

      //Armature movement trigger
      armatureTrigger = ScrollTrigger.create({
        id: sectionID + "_armatureMove",
        trigger: SCROLL_TRIGGERS.ARMATURE.trigger,
        start: SCROLL_TRIGGERS.ARMATURE.start,
        end: SCROLL_TRIGGERS.ARMATURE.end,
        scrub: true,
        markers: false,

        onEnter: () => {
          console.log("🚀 ~ mm.add ~ onEnter:")
          setCurrentModel(sectionID);
          disableOtherSections();
          armatureRef.current.position.y = adjustedStartY;
          if (armatureRef.current) {
            gsap.to(armatureRef.current.scale, {
              x: 0.03,
              y: 0.03,
              z: 0.03,
              duration: 1,
              ease: "back.out",
            });
          }
        },

        onUpdate: (self) => {
          console.log("🚀 ~ mm.add ~ onEnter:",armatureRef.current)
          if (armatureRef.current) {
            // Interpolation selon le scroll progress
            armatureRef.current.position.y = gsap.utils.interpolate(adjustedStartY, endY, self.progress);

          }
        },
        onLeaveBack: () => {
          if (armatureRef.current) {
            armatureRef.current.position.y = startY;
            gsap.to(armatureRef.current.scale, {
              x: 0,
              y: 0,
              z: 0,
              duration: 0.1,
              ease: "power2.inOut",
            });
          }
        },
      });
      return () => armatureTrigger.kill();
    });

    //Mobile
    mm.add("(max-width: 767px)", () => {
      const startY = armatureRef.current.position.y;
      const adjustedStartY = startY - 0.58;
      const endY = adjustedStartY + 5;
      mainTrigger = ScrollTrigger.create({
        id: sectionID,
        trigger: SCROLL_TRIGGERS.MAIN.trigger,
        start: "top bottom",
        end: "top top",
        preventClicks: true,
        scrub: true,
        markers: false,
       onToggle: ({ isActive }) => {
          console.log("🚀 ~ mm.add ~ isActive:", isActive, scrollDirection)

          if (isActive) {
            setCurrentModel(sectionID);
            disableOtherSections();
          }

          const actionName = scrollDirection;
          if (isActive) {
            if (actionName == "Up") {
              resetAllActionsExceptUpDown();
              playIntroAnimations();

            } else {
            }

          } else {
            if (actionName == "Down") {

            }

          }
          const onFinishCallback = () => {

            if (actionName == "Down") {
              if (prevScrollTrigger.current) {
                prevScrollTrigger.current.enable();

              }
             

            }
          };

          if (!(scrollDirection == "Down" && isActive) && !(scrollDirection == "Up" && !isActive)) {
            playActionOnce(actionName, sectionID, velocityD, onFinishCallback);
          }




        },
        onLeave:()=>{
          console.log("🚀 ~ mm.add ~ onLeave:")
          if(velocityD==0 && scrollDirection=="Up"){
           playActionOnce("Up", sectionID, 200000, ()=>{console.log("worked"),playIntroAnimations();}); 
           
          }
        },
        onUpdate: ({ progress }) => {
          if (sceneContainerGroup.current) {
            sceneContainerGroup.current.position.y = THREE.MathUtils.lerp(minY, maxY, progress);
          }
        },

      });
      const minsY = 0.3;
      const maxsY = 0.4;
      secondaryTrigger = ScrollTrigger.create({
        id: sectionID + "_secondary",
        trigger: SCROLL_TRIGGERS.SECONDARY.trigger,
        start: () => mainTrigger.end, // Synchronise le start ici
        end: "bottom+=20% top",
        scrub: SCROLL_TRIGGERS.SECONDARY.scrub,
        markers: false,
        onEnter: (self) => {
          setCurrentModel(sectionID);
          disableOtherSections();
          if (Math.abs(self.getVelocity()) > 1000) {
            setTimeout(() => {
              handleScrollAnimations();
            }, 50);
          } else {
            handleScrollAnimations();

          }
          if (sceneContainerGroup.current) {
            //sceneContainerGroup.current.position.y = adjustedStartY;
            gsap.to(sceneContainerGroup.current.position, {
              y: 0.6,
              duration: 0,
              ease: "power3.inOut",
            });
          }

        },
        onLeaveBack: (self) => {
          handleScrollAnimationsReverse();
          if (Math.abs(self.getVelocity()) > 2000) {
            enableOtherSections();
          }
        },
        onUpdate: (self) => {
          if (sceneContainerGroup.current) {
            sceneContainerGroup.current.position.y = THREE.MathUtils.lerp(minsY, maxsY, self.progress);
          }
          handleProgressUpdate(self.progress);

        },
        onLeave: () => {
        }
      });

      //Armature movement trigger
      armatureTrigger = ScrollTrigger.create({
        id: sectionID + "_armatureMove",
        trigger: "#section6",
        start: "top bottom",
        end: () => document.body.scrollHeight + "px",
        scrub: true,
        markers: false,

        onEnter: () => {
          setCurrentModel(sectionID);
          disableOtherSections();

          if (armatureRef.current) {
            //armatureRef.current.position.y = adjustedStartY;
            gsap.to(armatureRef.current.scale, {
              x: 0.1,
              y: 0.1,
              z: 0.1,
              duration: 1,
              ease: "back.out",
            });
          }
        },

        onUpdate: (self) => {
          if (armatureRef.current) {
            // Interpolation selon le scroll progress
            armatureRef.current.position.y = gsap.utils.interpolate(adjustedStartY, endY, self.progress);

          }
        },
        onLeaveBack: () => {
          if (armatureRef.current) {
            //armatureRef.current.position.y = startY;
            gsap.to(armatureRef.current.scale, {
              x: 0,
              y: 0,
              z: 0,
              duration: 0.1,
              ease: "power2.inOut",
            });
          }
        },
      });

      return () => { secondaryTrigger.kill(), mainTrigger.kill(), armatureTrigger.kill() };
    });

    // Cleanup function
    return () => {
      mixer.stopAllAction();
      stopArmatureAnimation();
      if (mainTrigger) {
        mainTrigger.kill();
      }
      if (secondaryTrigger) {
        secondaryTrigger.kill();
      }
      if (armatureTrigger) {
        armatureTrigger.kill()
      }

    };
  }, [location.pathname]);




  return (
    <group ref={group} {...props} dispose={null} visible={isActive}>
      <group
        name="Scene"
        ref={sceneContainerGroup}
        position-z={scenePositioning.positionZ}
      >

        <group
          name="BézierCurve"
          position={[0.003, -0.116, -0.002]}
          rotation={[Math.PI / 2, -Math.PI / 2, 0]}
        />
        <group name="Empty" position={[4.089, 2.103, -0.346]}>
          <PerspectiveCamera
            name="Camera"
            makeDefault={isActive}
            far={1000}
            near={0.1}
            fov={19.157}
            position={[0.531, -1.404, 0]}
            rotation={[-Math.PI / 2, 1.519, Math.PI / 2]}
            scale={0.217}
          />
        </group>

        <group name="All" position={[0.003, -2.534, -0.002]} scale={1.78}>
          <group
            name="Armature001"
            ref={ManRef}
            position={[0.027, 0.252, -0.047]}
            rotation={[0, -0.516, 0]}
            scale={0.016}>
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
              <group name="Empty005" position={[0.392, 1.453, 1.578]} scale={1.043} />
              <group name="Empty006" position={[-0.616, 0.807, 1.625]} scale={0.834} />
            </group>
            <primitive object={nodes.Bone} />
            <primitive object={nodes.Bone007} />
            <primitive object={nodes.Bone008} />
          </group>
          <group
            name="Armature002"
            ref={armatureRef}
            position={[2.076, -0.648, -0.278]}
            rotation={[0, 1.107, 0]}
            scale={0.03}>
            <group name="Retopo_Sphere002">
              <skinnedMesh
                name="mesh003"
                geometry={nodes.mesh003.geometry}
                material={materials['Material.004']}
                skeleton={nodes.mesh003.skeleton}
              />
              <skinnedMesh
                name="mesh003_1"
                geometry={nodes.mesh003_1.geometry}
                material={materials['pants.001']}
                skeleton={nodes.mesh003_1.skeleton}
              />
              <skinnedMesh
                name="mesh003_2"
                geometry={nodes.mesh003_2.geometry}
                material={materials['skin.001']}
                skeleton={nodes.mesh003_2.skeleton}
              />
              <group name="Empty001" position={[0.606, -0.576, 0.21]} scale={1.043} />
              <group name="Empty002" position={[-0.555, -0.686, 0.037]} scale={0.834} />
            </group>
            <primitive object={nodes.Bone_1} />
            <primitive object={nodes.Bone007_1} />
            <primitive object={nodes.Bone008_1} />
          </group>
          <mesh
            name="Cube"
            castShadow
            receiveShadow
            geometry={nodes.Cube.geometry}
            material={materials['Material.001']}
            position={[0.001, 0.498, 0.126]}
            scale={0}
          />
          <mesh
            name="Cube024"
            castShadow
            receiveShadow
            geometry={nodes.Cube024.geometry}
            material={materials.Ground2}
            scale={0.562}
          />
          <mesh
            name="Cube066"
            castShadow
            receiveShadow
            geometry={nodes.Cube066.geometry}
            material={materials.Material}
            position={[-0.207, 0.166, 0.168]}
            rotation={[0, -0.432, 0]}
            scale={[0.005, 0.02, 0.005]}>
            <mesh
              name="Cube060"
              castShadow
              receiveShadow
              geometry={nodes.Cube060.geometry}
              material={materials.Material}
              position={[4.865, 18.97, -5.005]}
              rotation={[0, -1.546, 0]}
              scale={[23.068, 8.486, 35.574]}>
              <group
                name="Cube059"
                position={[-1.286, -0.311, 0]}
                rotation={[0, 1.571, 0]}
                scale={[0.214, 0.068, 0.204]}>
                <mesh
                  name="Cube053"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube053.geometry}
                  material={materials['Material.015']}
                />
                <mesh
                  name="Cube053_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube053_1.geometry}
                  material={materials['Material.015']}
                />
              </group>
              <mesh
                name="Cube061"
                castShadow
                receiveShadow
                geometry={nodes.Cube061.geometry}
                material={materials['Material.009']}
                position={[1.151, -0.346, 0]}
                rotation={[0, 1.571, 0]}
                scale={[0.1, 0.235, 0.329]}
              />
              <mesh
                name="Cylinder127"
                castShadow
                receiveShadow
                geometry={nodes.Cylinder127.geometry}
                material={materials.Material}
                position={[-0.719, -0.037, 0]}
                rotation={[0, 1.571, 0]}
                scale={[3.227, 3.227, 4.977]}
              />
              <group
                name="Cylinder129"
                position={[-1.265, -0.435, -0.003]}
                rotation={[0, 1.571, 0]}
                scale={[0.015, 0.231, 0.023]}>
                <mesh
                  name="Cylinder129_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder129_1.geometry}
                  material={materials['Material.009']}
                />
                <mesh
                  name="Cylinder129_2"
                  castShadow
                  receiveShadow
                  geometry={nodes.Cylinder129_2.geometry}
                  material={materials.Material}
                />
                <group
                  name="Torus001"
                  position={[-0.201, -1.717, 0.626]}
                  rotation={[Math.PI / 2, 0, -0.83]}
                  scale={[1.979, 1.979, 0.146]}>
                  <mesh
                    name="Torus001_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.Torus001_1.geometry}
                    material={materials.Material}
                  />
                  <mesh
                    name="Torus001_2"
                    castShadow
                    receiveShadow
                    geometry={nodes.Torus001_2.geometry}
                    material={materials['Material.007']}
                  />
                  <mesh
                    name="Torus001_3"
                    castShadow
                    receiveShadow
                    geometry={nodes.Torus001_3.geometry}
                    material={materials['Material.008']}
                  />
                  <mesh
                    name="Torus001_4"
                    castShadow
                    receiveShadow
                    geometry={nodes.Torus001_4.geometry}
                    material={materials['Material.009']}
                  />
                </group>
              </group>
            </mesh>
            <mesh
              name="Cylinder121"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder121.geometry}
              material={materials.Material}
              position={[4.906, 15.504, -4.974]}
              scale={[6.219, 0.307, 6.219]}
            />
          </mesh>
          <mesh
            name="Cylinder010"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder010.geometry}
            material={materials['Material.022']}
            position={[0.013, 0.109, -0.121]}
            rotation={[-0.236, -1.235, -0.241]}
            scale={0.005}
          />
          <mesh
            name="Cylinder011"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder011.geometry}
            material={materials['Material.022']}
            position={[-0.119, 0.113, 0.105]}
            rotation={[Math.PI, -0.93, Math.PI]}
            scale={0.006}
          />
          <mesh
            name="Cylinder012"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder012.geometry}
            material={materials['Material.022']}
            position={[0.134, 0.107, -0.062]}
            rotation={[-3.046, -0.631, -3.103]}
            scale={0.005}
          />
          <mesh
            name="Cylinder090"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder090.geometry}
            material={materials.Ground1}
            position={[0, 0.121, 0]}
            scale={0.562}
          />
          <group
            name="Cylinder095"
            position={[0, 0.235, 0.002]}
            rotation={[-0.004, 0.02, -0.002]}
            scale={0.029}>
            <mesh
              name="Cylinder101_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder101_1.geometry}
              material={materials['Material.007']}
            />
            <mesh
              name="Cylinder101_2"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder101_2.geometry}
              material={materials['Material.008']}
            />
            <mesh
              name="Cylinder101_3"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder101_3.geometry}
              material={materials['Material.017']}
            />
            <mesh
              name="Cylinder101_4"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder101_4.geometry}
              material={materials['Material.015']}
            />
            <group name="Cylinder001" position={[0.006, 3.553, 0.007]} scale={0}>
              <mesh
                name="Cylinder001_1"
                castShadow
                receiveShadow
                geometry={nodes.Cylinder001_1.geometry}
                material={materials['Material.007']}
              />
              <mesh
                name="Cylinder001_2"
                castShadow
                receiveShadow
                geometry={nodes.Cylinder001_2.geometry}
                material={materials['Material.008']}
              />
            </group>
            <group
              name="Cylinder096"
              position={[-0.008, -1.548, -1.192]}
              rotation={[0, 1.571, 0]}
              scale={0.489}>
              <mesh
                name="Cylinder102_1"
                castShadow
                receiveShadow
                geometry={nodes.Cylinder102_1.geometry}
                material={materials['Material.007']}
              />
              <mesh
                name="Cylinder102_2"
                castShadow
                receiveShadow
                geometry={nodes.Cylinder102_2.geometry}
                material={materials['Material.008']}
              />
              <mesh
                name="Cylinder102_3"
                castShadow
                receiveShadow
                geometry={nodes.Cylinder102_3.geometry}
                material={materials['Material.009']}
              />
            </group>
            <group name="Cylinder097" position={[1.256, -1.548, 0.055]} scale={0.489}>
              <mesh
                name="Cylinder103_1"
                castShadow
                receiveShadow
                geometry={nodes.Cylinder103_1.geometry}
                material={materials['Material.007']}
              />
              <mesh
                name="Cylinder103_2"
                castShadow
                receiveShadow
                geometry={nodes.Cylinder103_2.geometry}
                material={materials['Material.008']}
              />
              <mesh
                name="Cylinder103_3"
                castShadow
                receiveShadow
                geometry={nodes.Cylinder103_3.geometry}
                material={materials['Material.009']}
              />
            </group>
            <group
              name="Cylinder098"
              position={[1.103, 0.633, 0.065]}
              rotation={[0, 0, -1.445]}
              scale={[0.491, 0.093, 0.491]}>
              <mesh
                name="Cylinder104_1"
                castShadow
                receiveShadow
                geometry={nodes.Cylinder104_1.geometry}
                material={materials['Material.009']}
              />
              <mesh
                name="Cylinder104_2"
                castShadow
                receiveShadow
                geometry={nodes.Cylinder104_2.geometry}
                material={materials['Material.013']}
              />
            </group>
            <mesh
              name="Cylinder099"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder099.geometry}
              material={materials['Material.009']}
              position={[0, -3.265, -0.769]}
              rotation={[0.137, 0, 0]}
              scale={0.146}
            />
            <mesh
              name="Cylinder100"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder100.geometry}
              material={materials['Material.009']}
              position={[-0.779, -3.265, 0]}
              rotation={[Math.PI / 2, 1.434, -Math.PI / 2]}
              scale={0.146}
            />
            <mesh
              name="Cylinder102"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder102.geometry}
              material={materials['Material.017']}
              position={[0.424, 2.008, -0.803]}
              rotation={[2.137, 0.803, 0.456]}
            />
            <mesh
              name="Cylinder103"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder103.geometry}
              material={materials['Material.009']}
              position={[0.015, 1.658, -0.346]}
              scale={[0.125, 1.435, 0.125]}
            />
            <mesh
              name="Cylinder104"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder104.geometry}
              material={materials['Material.009']}
              position={[-0.214, 1.29, -0.777]}
              rotation={[0.147, 0.055, -0.018]}
              scale={[0.096, 0.761, 0.096]}
            />
            <mesh
              name="Cylinder106"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder106.geometry}
              material={materials['Material.009']}
              position={[-0.111, 0.999, 0.235]}
              scale={[0.125, 1.435, 0.125]}
            />
          </group>
          <mesh
            name="Cylinder101"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder101.geometry}
            material={materials['Material.002']}
            position={[0.038, 0.197, -0.036]}
            rotation={[0.259, -0.477, 0.113]}
            scale={[0.003, 0.063, 0.002]}>
            <mesh
              name="Cube031"
              castShadow
              receiveShadow
              geometry={nodes.Cube031.geometry}
              material={materials['Material.002']}
              position={[-5.591, -0.78, -0.016]}
              rotation={[-Math.PI, 0, -1.571]}
              scale={[0.012, 5.527, 0.828]}
            />
          </mesh>
          <mesh
            name="GroundCubeQuad003"
            castShadow
            receiveShadow
            geometry={nodes.GroundCubeQuad003.geometry}
            material={materials.Ground_FileSize_Mat}
            position={[0, -0.293, 0]}
            scale={[0.575, 0.562, 0.575]}
          />
          <group name="Plant" position={[1.962, -0.531, -0.22]} scale={0.562}>
            <group name="Cylinder019" position={[-3.488, 1.291, 0.785]} scale={0}>
              <mesh
                name="Cylinder007"
                ref={rocketRef}
                castShadow
                receiveShadow
                geometry={nodes.Cylinder007.geometry}
                material={materials['Material.003']}
              />
              <mesh
                name="Cylinder007_1"
                castShadow
                receiveShadow
                geometry={nodes.Cylinder007_1.geometry}
                material={materials['Material.005']}
              />
              <mesh
                name="Cylinder007_2"
                castShadow
                receiveShadow
                geometry={nodes.Cylinder007_2.geometry}
                material={materials['Material.006']}
              />
              <mesh
                name="Cylinder007_3"
                castShadow
                receiveShadow
                geometry={nodes.Cylinder007_3.geometry}
                material={materials['Material.010']}
              />
              <mesh
                name="Cylinder007_4"
                castShadow
                receiveShadow
                geometry={nodes.Cylinder007_4.geometry}
                material={materials['Material.011']}
              />
              <mesh
                name="Cylinder007_5"
                castShadow
                receiveShadow
                geometry={nodes.Cylinder007_5.geometry}
                material={materials['Material.012']}
              />
            </group>
          </group>
          <mesh
            name="Retopo_Icosphere016"
            castShadow
            receiveShadow
            geometry={nodes.Retopo_Icosphere016.geometry}
            material={nodes.Retopo_Icosphere016.material}
            position={[-0.475, 0.731, -3.109]}
            scale={0.044}
          />
          <mesh
            name="Sphere001"
            castShadow
            receiveShadow
            geometry={nodes.Sphere001.geometry}
            material={materials['Material.001']}
            position={[-0.116, 0.244, -0.117]}
            scale={0}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("./models/LastRocket.glb");