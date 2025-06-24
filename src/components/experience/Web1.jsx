import { useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useGLTF, PerspectiveCamera, useAnimations } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimationContext } from "./AnimationContext";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";


// Constants
const ANIMATIONS_TO_PLAY = [
  "Armature.001Action",
  "Armature.003Action.003", 
  "Armature.004Action.002",
  "Cube.032Action",
  "Empty.001Action.001",
  "Empty.003Action.001",
  "Empty.005Action",
  "Empty.006Action",
  "Empty.009Action.002",
  "Empty.010Action.002",
  "Empty.010Action.004",
  "Sphere.010Action",
  "Sphere.011Action",
];

const MOBILE_BREAKPOINT = 5;
const SCROLL_CONFIG = {
  minY: 0,
  maxY: 2,
  scrollSpeed: 0.1,
  tweenDuration: 0.1,
  velocityThreshold: 2000,
  offsetOnLeave: 50
};

const CAMERA_CONFIG = {
  far: 1000,
  near: 0.1,
  fov: 18.848,
  position: [3.446, 20.931, 15.945],
  rotation: [-0.417, 0.041, -0.022]
};

export function Web1({ sectionID, isActive, lenis, ...props }) {
  // Three.js hooks
  const gl = useThree((state) => state.gl);
  const { viewport } = useThree();
  
  // Context and refs
  const { setCurrentModel } = useContext(AnimationContext);
  const timelineMain = useRef();
  const currentTween = useRef(null);
  const group = useRef();
  const sceneContainerGroup = useRef();
  const viewportRef = useRef(viewport);
  const nextScrollTrigger = useRef(null);

  // GLTF loading with KTX2 optimization
 
  const { nodes, materials, animations } = useGLTF(
    `./models/web1-opt.glb`,
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

  // Optimized materials
  const optimizedMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0xd5c23b,
    roughness: 0.5,
    metalness: 0.1
  }), []);

  // Scroll trigger management functions
  const disableOtherSections = useCallback(() => {
    if (!nextScrollTrigger.current) {
      const currentScrollTrigger = ScrollTrigger.getById(sectionID);
      if (currentScrollTrigger?.next()) {
        nextScrollTrigger.current = currentScrollTrigger.next();
        nextScrollTrigger.current.disable();
      }
    } else {
      nextScrollTrigger.current.disable();
    }
  }, [sectionID]);

  const enableOtherSections = useCallback(() => {
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.id !== sectionID) {
        trigger.enable();
      }
    });
  }, [sectionID]);

  // Animation control functions
  const killCurrentTween = useCallback(() => {
    if (currentTween.current) {
      currentTween.current.kill();
      currentTween.current = null;
    }
  }, []);

  const handleMobileScroll = useCallback((direction, lastY) => {
    const delta = direction * SCROLL_CONFIG.scrollSpeed;
    const newY = THREE.MathUtils.clamp(
      lastY + delta, 
      SCROLL_CONFIG.minY, 
      SCROLL_CONFIG.maxY
    );

    killCurrentTween();

    currentTween.current = gsap.to(sceneContainerGroup.current.position, {
      y: newY,
      duration: SCROLL_CONFIG.tweenDuration,
      ease: "sine.out",
      overwrite: true,
      onUpdate: () => {
        // Track current Y position for next iteration
      }
    });

    return sceneContainerGroup.current.position.y;
  }, [killCurrentTween]);

  const handleDesktopScroll = useCallback((progress, clipDuration) => {
    killCurrentTween();

    currentTween.current = gsap.to(actions["CameraIn"], {
      time: progress * clipDuration,
      duration: SCROLL_CONFIG.tweenDuration,
      ease: "sine.out",
      overwrite: true
    });
  }, [actions, killCurrentTween]);

  // Responsive scaling
  const sceneScale = useMemo(() => 
    viewport.width < MOBILE_BREAKPOINT ? 0.5 : 1, 
    [viewport.width]
  );

  const scenePositionX = useMemo(() => 
    viewport.width < MOBILE_BREAKPOINT ? 2.5 : 0, 
    [viewport.width]
  );

  // Update viewport ref when viewport changes
  useLayoutEffect(() => {
    viewportRef.current = viewport;
  }, [viewport]);

  // Main animation setup
  useLayoutEffect(() => {
    // Initialize animations
    ANIMATIONS_TO_PLAY.forEach((name) => {
      actions[name]?.reset().play();
    });

    const camAct = actions["CameraIn"];
    const camera = group.current?.getObjectByName("Camera001");
    
    if (!camAct || !camera || !sceneContainerGroup.current) return;
    const InitialmodelPosition=sceneContainerGroup.current.position;
    if(viewportRef.current.width < MOBILE_BREAKPOINT){
      sceneContainerGroup.current.position.y=sceneContainerGroup.current.position.y+0.2
       sceneContainerGroup.current.position.z=sceneContainerGroup.current.position.z-0.4
       sceneContainerGroup.current.position.x=sceneContainerGroup.current.position.x+0.15
    }else{
      sceneContainerGroup.current.position=InitialmodelPosition;
    }

    // Setup camera animation
    camAct.reset().play();
    camAct.paused = true;
    const clipDur = camAct.getClip().duration;
    const sceneDefaultPos = sceneContainerGroup.current.position.y;

    // Mobile scroll state
    let lastY = sceneContainerGroup.current.position.y;

    // Create scroll trigger
    const scrollTriggerInstance = ScrollTrigger.create({
      id: sectionID,
      trigger: "#section2",
      start: "top bottom",
      end: "center+=100 top",
      scrub: true,
      markers: false,
      
      onUpdate: (self) => {
        const isMobile = viewportRef.current.width < MOBILE_BREAKPOINT;
        
        if (isMobile) {
          lastY = handleMobileScroll(self.direction, lastY);
        } else {
          handleDesktopScroll(self.progress, clipDur);
        }
      },
      
      onToggle: (self) => {
        if (self.isActive) {
          setCurrentModel(sectionID);
          disableOtherSections();
          
          gsap.to(sceneContainerGroup.current.position, {
            y: sceneDefaultPos,
            duration: 1,
            ease: "circ.out",
          });
        }
      },
      
      onLeave: (self) => {
        const velocity = Math.abs(self.getVelocity());
        
        if (velocity <= SCROLL_CONFIG.velocityThreshold) {
          gsap.to(sceneContainerGroup.current.position, {
            y: sceneDefaultPos + SCROLL_CONFIG.offsetOnLeave,
            duration: 1,
            ease: "sine.inOut",
            onComplete: () => {
              if (nextScrollTrigger.current) {
                nextScrollTrigger.current.enable();
              }
            },
          });
        } else {
          enableOtherSections();
        }
      }
    });

    // Cleanup function
    return () => {
      timelineMain.current?.kill();
      mixer.stopAllAction();
      scrollTriggerInstance.kill();
      killCurrentTween();
    };
  }, [
    actions, 
    sectionID, 
    setCurrentModel, 
    disableOtherSections, 
    enableOtherSections,
    handleMobileScroll,
    handleDesktopScroll,
    mixer,
    killCurrentTween
  ]);

  // Render mesh groups for better organization
  const renderEnvironmentMeshes = () => (
    <>
      <mesh
        name="GroundCubeQuad003"
        castShadow
        receiveShadow
        geometry={nodes.GroundCubeQuad003.geometry}
        material={materials.Ground_FileSize_Mat}
        position={[0.033, -0.966, -0.183]}
        scale={[1.223, 0.997, 1.039]}
      />
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
      <mesh
        name="Plane"
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={materials.Desk}
        position={[-0.7, 3.171, -0.899]}
        rotation={[0, 0.616, 0]}
      />
    </>
  );

  const renderCharacterMeshes = () => (
    <>
      {/* Character 1 - Armature001 */}
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
        name="Retopo_Sphere001"
        position={[-0.724, 2.797, 0.172]}
        rotation={[0, -0.251, 0]}
        scale={0.219}>
        <group name="Empty005" position={[0.606, -0.576, 0.21]} scale={1.043} />
        <group name="Empty006" position={[-0.672, -0.557, 0.358]} scale={0.834} />
      </group>

      <skinnedMesh
        name="Retopo_Sphere001_primitive0"
        geometry={nodes.Retopo_Sphere001_primitive0.geometry}
        material={optimizedMaterial}
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

      {/* Character 2 - Armature004 */}
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
        material={optimizedMaterial}
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

      {/* Character 3 - Armature003 */}
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

      <skinnedMesh
        name="Retopo_Sphere009_primitive0"
        geometry={nodes.Retopo_Sphere009_primitive0.geometry}
        material={optimizedMaterial}
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
    </>
  );

  const renderObjectMeshes = () => (
    <>
      {/* Decorative objects */}
      <group name="Empty002" position={[-0.228, 2.14, 0.512]}>
        <group name="Retopo_Cube" rotation={[0, 1.005, 0]} scale={0.29}>
          <mesh
            name="Retopo_Cube_primitive0"
            castShadow
            receiveShadow
            geometry={nodes.Retopo_Cube_primitive0.geometry}
            material={materials['spike.001']}
          />
          <mesh
            name="Retopo_Cube_primitive1"
            castShadow
            receiveShadow
            geometry={nodes.Retopo_Cube_primitive1.geometry}
            material={materials['Material.022']}
          />
          <mesh
            name="Retopo_Cube_primitive2"
            castShadow
            receiveShadow
            geometry={nodes.Retopo_Cube_primitive2.geometry}
            material={materials.Blackk}
          />
        </group>
        <group name="Retopo_Cube001" rotation={[0, 1.005, 0]} scale={0.29}>
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

      <group name="Empty004" position={[-0.569, 2.089, 0.83]} scale={0.342}>
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
            castShadow
            receiveShadow
            geometry={nodes.Cube004_primitive2.geometry}
            material={materials['Material.010']}
          />
        </group>
      </group>

      {/* Animated spheres */}
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
        name="Sphere"
        castShadow
        receiveShadow
        geometry={nodes.Sphere.geometry}
        material={materials['Material.003']}
        position={[1.107, 1.056, -0.662]}
        scale={[0.099, 0.097, 0.097]}
      />
    </>
  );

  const renderTechMeshes = () => (
    <>
      {/* Laptops and screens */}
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

      {/* Arcade machine parts */}
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
        name="Cube003_primitive0"
        castShadow
        receiveShadow
        geometry={nodes.Cube003_primitive0.geometry}
        material={materials['ArcadeBase.002']}
        position={[1.37, 1.732, -0.435]}
        rotation={[-Math.PI, 0.475, -Math.PI]}
        scale={[-0.65, 0.719, 0.65]}
      />

      {/* Machine components */}
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
      <mesh
        name="Cube027_primitive2"
        castShadow
        receiveShadow
        geometry={nodes.Cube027_primitive2.geometry}
        material={optimizedMaterial}
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

      {/* Small components */}
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
    </>
  );

  return (
    <group ref={group} {...props} dispose={null} visible={isActive}>
      <group name="Scene">
        <PerspectiveCamera
          name="Camera001"
          makeDefault={isActive}
          far={CAMERA_CONFIG.far}
          near={CAMERA_CONFIG.near}
          fov={CAMERA_CONFIG.fov}
          position={CAMERA_CONFIG.position}
          rotation={CAMERA_CONFIG.rotation}
        />
        
        <group 
          ref={sceneContainerGroup} 
          name="scene_container"
          scale={sceneScale}
          position-x={scenePositionX}
        >
          {renderEnvironmentMeshes()}
          {renderCharacterMeshes()}
          {renderObjectMeshes()}
          {renderTechMeshes()}
        </group>
      </group>
    </group>
  );
}

// Preload the model for better performance
useGLTF.preload("/models/web1-opt.glb");