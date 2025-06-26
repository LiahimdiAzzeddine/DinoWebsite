import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { useFrame, useGraph, useThree } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { AnimationContext } from "./AnimationContext";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Constants
const ANIMATION_GROUPS = {
  FIRST: [
    "1.Tour",
    "1.hook",
    "1.slider",
    "3.ManAnimation",
    "Empty.005Action.001",
    "Empty.006Action",
  ],
  SCROLL: [
    "2.Ladder2ndScroll",
    "4.Head2ndScroll",
    "5.Metal2ndScroll",
    "6.WaterTower2ndScroll",
    "7.Door2ndScroll",
    "9.Rocket2ndScroll",
  ],
  SECOND_SCROLL: ["Action", "8.Rocket3rdScroll"],
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
    start: "top bottom",
    end: "bottom+=75% top",
    scrub: 2.5,
  },
  ARMATURE: {
    trigger: "#section6",
    start: "top bottom",
    end: "top top",
  },
};

const SCALE_CONFIG = {
  original: { x: 0.029, y: 0.029, z: 0.029 },
  hidden: { x: 0, y: 0, z: 0 },
  duration: 0.5,
  ease: "power2.out",
};

// Optimized SmokeParticles component
function SmokeParticles({ count, position, geometry, material }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          position[0] + (Math.random() - 0.5) * 0.1,
          position[1],
          position[2] + (Math.random() - 0.5) * 0.1,
        ],
        velocity: [
          (Math.random() - 0.5) * PARTICLE_CONFIG.velocityRange,
          -(Math.random() * 0.05 + 0.02),
          (Math.random() - 0.5) * PARTICLE_CONFIG.velocityRange,
        ],
        life: Math.random() * PARTICLE_CONFIG.lifeRange[0],
        maxLife: PARTICLE_CONFIG.lifeRange[0] + Math.random() * PARTICLE_CONFIG.lifeRange[1],
        scale: Math.random() * PARTICLE_CONFIG.scaleRange[1] + PARTICLE_CONFIG.scaleRange[0],
      });
    }
    return temp;
  }, [count, position]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    particles.forEach((particle, i) => {
      // Update position
      particle.position[0] += particle.velocity[0];
      particle.position[1] += particle.velocity[1];
      particle.position[2] += particle.velocity[2];

      // Update life
      particle.life += delta * PARTICLE_CONFIG.deltaMultiplier;
      
      if (particle.life > particle.maxLife) {
        // Reset particle
        particle.position[0] = position[0] + (Math.random() - 0.5) * 0.1;
        particle.position[1] = position[1];
        particle.position[2] = position[2] + (Math.random() - 0.5) * 0.1;
        particle.life = 0;
        particle.velocity[0] = (Math.random() - 0.5) * PARTICLE_CONFIG.velocityRange;
        particle.velocity[1] = -(Math.random() * 0.05 + 0.02);
        particle.velocity[2] = (Math.random() - 0.5) * PARTICLE_CONFIG.velocityRange;
      }

      // Update visual properties
      const lifeRatio = particle.life / particle.maxLife;
      dummy.position.set(...particle.position);
      dummy.scale.setScalar(particle.scale * (1 + lifeRatio * 2));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      const color = new THREE.Color().lerpColors(
        new THREE.Color(PARTICLE_CONFIG.colors.birth),
        new THREE.Color(PARTICLE_CONFIG.colors.death),
        lifeRatio
      );
      
      meshRef.current.setColorAt(i, color);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
    />
  );
}
export default function Web3({ sectionID, isActive, ...props }) {
  // Context and state
  const { setCurrentModel } = useContext(AnimationContext);
  const { viewport } = useThree();
  const [play, setPlay] = useState(false);

  // Refs
  const group = useRef();
  const ManRef = useRef();
  const rocketRef = useRef();
  const emitterRef = useRef();
  const armatureRef = useRef();
  const armatureAnimationRef = useRef(null);
  const playedSecondScroll = useRef(false);
  const initialY = useRef(0);
  const prevScrollTrigger = useRef(null);

  // GLTF loading and setup
  const { scene, animations } = useGLTF("./models/Web3Final.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions, mixer } = useAnimations(animations, group);

  // Responsive positioning
  const scenePositioning = useMemo(() => ({
    positionZ: viewport.width < 1 ? -0.3 : 0.0,
    wavingManPositionX: viewport.width < 1 ? -1 : 0,
    wavingManPositionZ: viewport.width < 1 ? 0.48 : 0,
  }), [viewport.width]);

  // Animation control functions
  const resetAllActions = useCallback(() => {
    Object.values(actions).forEach((action) => {
      action.reset().paused = true;
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
    const enterAnimation = actions["ActionEnter"];
    if (!enterAnimation) return;

    enterAnimation.reset();
    enterAnimation.setLoop(THREE.LoopOnce, 1);
    enterAnimation.time = reversed ? enterAnimation.getClip().duration : 0;
    enterAnimation.timeScale = reversed ? -1 : 1;
    enterAnimation.clampWhenFinished = true;
    enterAnimation.play();
    
    scaleManToOriginalSize();
    
    if (!reversed) {
      ANIMATION_GROUPS.FIRST.forEach((name) => actions[name]?.reset().play());
      actions["Armature.001Action"]?.reset().play();
    }
  }, [actions, scaleManToOriginalSize]);

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
  }, [sectionID]);

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
  }, [sectionID]);

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
        anim.timeScale = 1;
        anim.setLoop(THREE.LoopOnce, 1);
        anim.clampWhenFinished = true;
        anim.play();
      }
    });

    scaleManToHidden();

    const mainScroll = actions[ANIMATION_GROUPS.SCROLL[6]];
    if (mainScroll) {
      mainScroll.getMixer().addEventListener("finished", () => {
        playedSecondScroll.current = true;
      });
    }
  }, [actions, scaleManToHidden]);

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
  }, [actions, scaleManToOriginalSize]);

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
  }, [actions]);

  // Initialize armature position
  useEffect(() => {
    if (armatureRef.current?.position) {
      initialY.current = armatureRef.current.position.y;
    }
  }, []);

  // Main scroll trigger setup
  useLayoutEffect(() => {
    resetAllActions();

    // Main scroll trigger
    const mainTrigger = ScrollTrigger.create({
      id: sectionID,
      trigger: SCROLL_TRIGGERS.MAIN.trigger,
      start: SCROLL_TRIGGERS.MAIN.start,
      end: SCROLL_TRIGGERS.MAIN.end,
      preventClicks: true,
      scrub: true,
      markers: false,
      onEnter: () => {
        setCurrentModel(sectionID);
        disableOtherSections();
        resetAllActions();
        playIntroAnimations();
      },
      onEnterBack: () => {
        setCurrentModel(sectionID);
        disableOtherSections();
        resetAllActions();
        playIntroAnimations(true);
      },
      onLeaveBack: (self) => {
        playIntroAnimations(true);
        const enterAnimation = actions["ActionEnter"];
        if (Math.abs(self.getVelocity()) <= 2000 && enterAnimation) {
          setTimeout(() => {
            if (prevScrollTrigger.current) {
              prevScrollTrigger.current.enable();
            }
          }, enterAnimation.getClip().duration * 1000);
        } else {
          enableOtherSections();
        }
      },
    });

    // Secondary scroll trigger
    const secondaryTrigger = ScrollTrigger.create({
      id: sectionID + "_secondary",
      trigger: SCROLL_TRIGGERS.SECONDARY.trigger,
      start: SCROLL_TRIGGERS.SECONDARY.start,
      end: SCROLL_TRIGGERS.SECONDARY.end,
      scrub: SCROLL_TRIGGERS.SECONDARY.scrub,
      markers: false,
      onEnter: () => {
        setPlay(true);
        setCurrentModel(sectionID);
        disableOtherSections();
        handleScrollAnimations();
      },
      onLeaveBack: (self) => {
        setPlay(false);
        handleScrollAnimationsReverse();
        if (Math.abs(self.getVelocity()) > 2000) {
          enableOtherSections();
        }
      },
      onUpdate: (self) => {
        handleProgressUpdate(self.progress);
      },
      onLeave: () => {
        setPlay(false);
      }
    });

    // Armature movement trigger
    // const armatureTrigger = ScrollTrigger.create({
    //   id: sectionID + "_armatureMove",
    //   trigger: SCROLL_TRIGGERS.ARMATURE.trigger,
    //   start: SCROLL_TRIGGERS.ARMATURE.start,
    //   end: SCROLL_TRIGGERS.ARMATURE.end,
    //   scrub: true,
    //   markers: false,
    //   onEnter: () => {
    //     setCurrentModel(sectionID);
    //     disableOtherSections();
    //   },
    //   onLeave: () => {
    //     stopArmatureAnimation();
    //     if (armatureRef.current) {
    //       armatureAnimationRef.current = gsap.to(armatureRef.current.position, {
    //         y: initialY.current + 0.1,
    //         duration: 2,
    //         ease: "power2.out",
    //         onComplete: () => {
    //           armatureAnimationRef.current = null;
    //         },
    //       });
    //     }
    //   },
    //   onEnterBack: () => {
    //     stopArmatureAnimation();
    //     if (armatureRef.current) {
    //       armatureAnimationRef.current = gsap.to(armatureRef.current.position, {
    //         y: initialY.current,
    //         duration: 0.1,
    //         ease: "power2.out",
    //         onComplete: () => {
    //           armatureAnimationRef.current = null;
    //         },
    //       });
    //     }
    //   },
    // });

    // Cleanup function
    return () => {
      mixer.stopAllAction();
      stopArmatureAnimation();
      mainTrigger.kill();
      secondaryTrigger.kill();
      armatureTrigger.kill();
    };
  }, [
    sectionID,
    actions,
    mixer,
    resetAllActions,
    playIntroAnimations,
    disableOtherSections,
    enableOtherSections,
    handleScrollAnimations,
    handleScrollAnimationsReverse,
    handleProgressUpdate,
    stopArmatureAnimation,
    setCurrentModel,
    setPlay,
  ]);

  // Render functions for better organization
  const renderEnvironment = () => (
    <>
      <mesh
        name="GroundCubeQuad003"
        castShadow
        receiveShadow
        geometry={nodes.GroundCubeQuad003.geometry}
        material={materials.Ground_FileSize_Mat}
        position={[0.003, -0.549, -0.002]}
        scale={[1.022, 1, 1.022]}
      />
      <mesh
        name="Cylinder090"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder090.geometry}
        material={materials.Ground1}
        position={[0.003, 0.188, -0.002]}
      />
      <mesh
        name="Cube024"
        castShadow
        receiveShadow
        geometry={nodes.Cube024.geometry}
        material={materials.Ground2}
        position={[0.003, -0.027, -0.002]}
      />
    </>
  );

  const renderSmallObjects = () => (
    <>
      <mesh
        name="Cylinder011"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder011.geometry}
        material={materials["Material.022"]}
        position={[-0.208, 0.174, 0.184]}
        rotation={[Math.PI, -0.93, Math.PI]}
        scale={0.01}
      />
      <mesh
        name="Cylinder010"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder010.geometry}
        material={materials["Material.022"]}
        position={[0.027, 0.166, -0.217]}
        rotation={[-0.236, -1.235, -0.241]}
        scale={0.01}
      />
      <mesh
        name="Cylinder012"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder012.geometry}
        material={materials["Material.022"]}
        position={[0.243, 0.164, -0.112]}
        rotation={[-3.046, -0.631, -3.103]}
        scale={0.008}
      />
      <mesh
        name="Sphere001"
        castShadow
        receiveShadow
        geometry={nodes.Sphere001.geometry}
        material={materials["Material.001"]}
        position={[-0.203, 0.408, -0.21]}
        scale={0}
      />
      <mesh
        name="Cube"
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials["Material.001"]}
        position={[0.006, 0.859, 0.222]}
        scale={0}
      />
    </>
  );

  const renderIndustrialStructure = () => (
    <mesh
      name="Cube066"
      castShadow
      receiveShadow
      geometry={nodes.Cube066.geometry}
      material={materials.Material}
      position={[-0.365, 0.269, 0.296]}
      rotation={[0, -0.432, 0]}
      scale={[0.01, 0.036, 0.01]}
    >
      <mesh
        name="Cube060"
        castShadow
        receiveShadow
        geometry={nodes.Cube060.geometry}
        material={materials.Material}
        position={[4.865, 18.97, -5.005]}
        rotation={[0, -1.546, 0]}
        scale={[23.068, 8.486, 35.574]}
      >
        <group
          name="Cube059"
          position={[-1.286, -0.311, 0]}
          rotation={[0, 1.571, 0]}
          scale={[0.214, 0.068, 0.204]}
        >
          <mesh
            name="Cube053"
            castShadow
            receiveShadow
            geometry={nodes.Cube053.geometry}
            material={materials["Material.015"]}
          />
          <mesh
            name="Cube053_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube053_1.geometry}
            material={materials["Material.015"]}
          />
        </group>
        <mesh
          name="Cube061"
          castShadow
          receiveShadow
          geometry={nodes.Cube061.geometry}
          material={materials["Material.009"]}
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
          scale={[0.015, 0.231, 0.023]}
        >
          <mesh
            name="Cylinder129_1"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder129_1.geometry}
            material={materials["Material.009"]}
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
            scale={[1.979, 1.979, 0.146]}
          >
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
              material={materials["Material.007"]}
            />
            <mesh
              name="Torus001_3"
              castShadow
              receiveShadow
              geometry={nodes.Torus001_3.geometry}
              material={materials["Material.008"]}
            />
            <mesh
              name="Torus001_4"
              castShadow
              receiveShadow
              geometry={nodes.Torus001_4.geometry}
              material={materials["Material.009"]}
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
  );

  const renderTowerStructure = () => (
    <group
      name="Cylinder095"
      position={[0.004, 0.391, 0.002]}
      rotation={[-0.004, 0.02, -0.002]}
      scale={0.052}
    >
      <mesh
        name="Cylinder101_1"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder101_1.geometry}
        material={materials["Material.007"]}
      />
      <mesh
        name="Cylinder101_2"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder101_2.geometry}
        material={materials["Material.008"]}
      />
      <mesh
        name="Cylinder101_3"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder101_3.geometry}
        material={materials["Material.017"]}
      />
      <mesh
        name="Cylinder101_4"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder101_4.geometry}
        material={materials["Material.015"]}
      />
      <group name="Cylinder001" position={[0.006, 3.553, 0.007]} scale={0}>
        <mesh
          name="Cylinder001_1"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001_1.geometry}
          material={materials["Material.007"]}
        />
        <mesh
          name="Cylinder001_2"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001_2.geometry}
          material={materials["Material.008"]}
        />
      </group>
      <group
        name="Cylinder096"
        position={[-0.008, -1.548, -1.192]}
        rotation={[0, 1.571, 0]}
        scale={0.489}
      >
        <mesh
          name="Cylinder102_1"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder102_1.geometry}
          material={materials["Material.007"]}
        />
        <mesh
          name="Cylinder102_2"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder102_2.geometry}
          material={materials["Material.008"]}
        />
        <mesh
          name="Cylinder102_3"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder102_3.geometry}
          material={materials["Material.009"]}
        />
      </group>
      <group
        name="Cylinder097"
        position={[1.256, -1.548, 0.055]}
        scale={0.489}
      >
        <mesh
          name="Cylinder103_1"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder103_1.geometry}
          material={materials["Material.007"]}
        />
        <mesh
          name="Cylinder103_2"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder103_2.geometry}
          material={materials["Material.008"]}
        />
        <mesh
          name="Cylinder103_3"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder103_3.geometry}
          material={materials["Material.009"]}
        />
      </group>
      <group
        name="Cylinder098"
        position={[1.103, 0.633, 0.065]}
        rotation={[0, 0, -1.445]}
        scale={[0.491, 0.093, 0.491]}
      >
        <mesh
          name="Cylinder104_1"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder104_1.geometry}
          material={materials["Material.009"]}
        />
        <mesh
          name="Cylinder104_2"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder104_2.geometry}
          material={materials["Material.013"]}
        />
      </group>
      <mesh
        name="Cylinder099"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder099.geometry}
        material={materials["Material.009"]}
        position={[0, -3.265, -0.769]}
        rotation={[0.137, 0, 0]}
        scale={0.146}
      />
      <mesh
        name="Cylinder100"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder100.geometry}
        material={materials["Material.009"]}
        position={[-0.779, -3.265, 0]}
        rotation={[Math.PI / 2, 1.434, -Math.PI / 2]}
        scale={0.146}
      />
      <mesh
        name="Cylinder102"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder102.geometry}
        material={materials["Material.017"]}
        position={[0.424, 2.008, -0.803]}
        rotation={[2.137, 0.803, 0.456]}
      />
      <mesh
        name="Cylinder103"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder103.geometry}
        material={materials["Material.009"]}
        position={[0.015, 1.658, -0.346]}
        scale={[0.125, 1.435, 0.125]}
      />
      <mesh
        name="Cylinder104"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder104.geometry}
        material={materials["Material.009"]}
        position={[-0.214, 1.29, -0.777]}
        rotation={[0.147, 0.055, -0.018]}
        scale={[0.096, 0.761, 0.096]}
      />
      <mesh
        name="Cylinder106"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder106.geometry}
        material={materials["Material.009"]}
        position={[-0.111, 0.999, 0.235]}
        scale={[0.125, 1.435, 0.125]}
      />
    </group>
  );

  const renderRocket = () => (
    <group
      ref={rocketRef}
      name="Cylinder019"
      position={[0.005, 0.3, 0.387]}
      scale={0}
    >
      <mesh
        name="Cylinder007"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007.geometry}
        material={materials["Material.003"]}
      />
      <mesh
        name="Cylinder007_1"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007_1.geometry}
        material={materials["Material.005"]}
      />
      <mesh
        name="Cylinder007_2"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007_2.geometry}
        material={materials["Material.006"]}
      />
      <mesh
        name="Cylinder007_3"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007_3.geometry}
        material={materials["Material.010"]}
      />
      <mesh
        name="Cylinder007_4"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007_4.geometry}
        material={materials["Material.011"]}
      />
      <mesh
        name="Cylinder007_5"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007_5.geometry}
        material={materials["Material.012"]}
      />
      <group ref={emitterRef} position={[0, -3.5, 0]} />
      <SmokeParticles
        count={PARTICLE_CONFIG.count}
        position={PARTICLE_CONFIG.position}
        geometry={nodes.Retopo_Icosphere016.geometry}
        material={nodes.Retopo_Icosphere016.material}
      />
    </group>
  );

  const renderCharacters = () => (
    <>
      {/* Waving Man */}
      <group
        name="WavingMan"
        position-x={scenePositioning.wavingManPositionX}
        position-z={scenePositioning.wavingManPositionZ}
      >
        <group
          name="Armature002"
          position={[2.919, -1.205, -0.53]}
          rotation={[0, 1.107, 0]}
          scale={0.064}
          ref={armatureRef}
        >
          <group name="Retopo_Sphere002">
            <skinnedMesh
              name="mesh003"
              geometry={nodes.mesh003.geometry}
              material={materials["Material.004"]}
              skeleton={nodes.mesh003.skeleton}
            />
            <skinnedMesh
              name="mesh003_1"
              geometry={nodes.mesh003_1.geometry}
              material={materials["pants.001"]}
              skeleton={nodes.mesh003_1.skeleton}
            />
            <skinnedMesh
              name="mesh003_2"
              geometry={nodes.mesh003_2.geometry}
              material={materials["skin.001"]}
              skeleton={nodes.mesh003_2.skeleton}
            />
            <group
              name="Empty001"
              position={[0.606, -0.576, 0.21]}
              scale={1.043}
            />
            <group
              name="Empty002"
              position={[-0.555, -0.686, 0.037]}
              scale={0.834}
            />
          </group>
          <primitive object={nodes.Bone} />
          <primitive object={nodes.Bone007} />
          <primitive object={nodes.Bone008} />
        </group>
      </group>

      {/* Main Character */}
      <group
        name="Armature001"
        position={[0.052, 0.421, -0.086]}
        rotation={[0, -0.516, 0]}
        scale={0.029}
        ref={ManRef}
      >
        <group name="Retopo_Sphere001">
          <skinnedMesh
            name="mesh001"
            geometry={nodes.mesh001.geometry}
            material={materials["Material.016"]}
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
          <group
            name="Empty005"
            position={[0.392, 1.453, 1.578]}
            scale={1.043}
          />
          <group
            name="Empty006"
            position={[-0.616, 0.807, 1.625]}
            scale={0.834}
          />
        </group>
        <primitive object={nodes.Bone_1} />
        <primitive object={nodes.Bone007_1} />
        <primitive object={nodes.Bone008_1} />
      </group>
    </>
  );

  const renderMiscellaneous = () => (
    <>
      <group
        name="BézierCurve"
        position={[0.003, -0.116, -0.002]}
        rotation={[Math.PI / 2, -Math.PI / 2, 0]}
      />
      <mesh
        name="Cylinder101"
        castShadow
        receiveShadow
        geometry={nodes.Cylinder101.geometry}
        material={materials["Material.002"]}
        position={[0.072, 0.323, -0.067]}
        rotation={[0.259, -0.477, 0.113]}
        scale={[0.006, 0.111, 0.004]}
      >
        <mesh
          name="Cube031"
          castShadow
          receiveShadow
          geometry={nodes.Cube031.geometry}
          material={materials["Material.002"]}
          position={[-5.591, -0.78, -0.016]}
          rotation={[-Math.PI, 0, -1.571]}
          scale={[0.012, 5.527, 0.828]}
        />
      </mesh>
    </>
  );

  return (
    <group ref={group} {...props} dispose={null} visible={isActive}>
      <group name="Empty" position={CAMERA_CONFIG.position}>
        <PerspectiveCamera
          name="Camera"
          makeDefault={isActive}
          far={CAMERA_CONFIG.far}
          near={CAMERA_CONFIG.near}
          fov={CAMERA_CONFIG.fov}
          rotation={CAMERA_CONFIG.rotation}
          scale={CAMERA_CONFIG.scale}
        />
      </group>
      
      <group
        name="Scene"
        position-z={scenePositioning.positionZ}
      >
        {renderEnvironment()}
        {renderSmallObjects()}
        {renderIndustrialStructure()}
        {renderTowerStructure()}
        {renderRocket()}
        {renderCharacters()}
        {renderMiscellaneous()}
      </group>
    </group>
  );
}

useGLTF.preload("./models/Web3Final.glb");