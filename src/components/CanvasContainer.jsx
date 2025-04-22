import React, {
  Suspense,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  AnimationProvider,
  AnimationContext,
} from "./experience/AnimationContext";

import MODEL_CONFIGS from "./experience/MODEL_CONFIGS";
import Rig from "./experience/Rig";
import AnimatedGradientBackground from "./experience/SceneColor";
import { CameraControls, Environment, Html, OrbitControls, PerspectiveCamera, Sky } from "@react-three/drei";
import * as THREE from "three";
import CameraPositionHelper from "./CameraPositionHelper";

gsap.registerPlugin(ScrollTrigger);

// ModelContainer.jsx
export function ModelContainer() {
  const { currentModel } = useContext(AnimationContext);
  const config = MODEL_CONFIGS[currentModel];
  const ModelComponent = config.Component;
  const { size } = useThree();

  return (
    <Rig key={currentModel}>
      <fog attach="fog" args={['#ff5020', 5, 18]} />
      <ModelComponent scale={size.width >= 1024 ? 0.2 : 0.1} />
    </Rig>
  );
}


// ---- Perspective Camera Manager ---- //
const CameraManager = () => {
  const { currentModel } = useContext(AnimationContext);
  const cameraRef = useRef(null);

  // Configuration de caméra pour chaque modèle
  const cameraConfigs = {
    Model1: {
      pos: new THREE.Vector3(-3.8362, 2.182, 0.9422),
      rot: new THREE.Euler(-1.5527, -1.191, -1.5513),
    },
    Model2: {
      pos: new THREE.Vector3(0.6602, 2.117, 2.7745),
      rot: new THREE.Euler(-0.4386, -0.2047, -0.095),
    },
    Model3: {
      pos: new THREE.Vector3(3, 0, 4),
      rot: new THREE.Euler(0, 0.5, 0),
    },
    default: {
      pos: new THREE.Vector3(0, 2, 6),
      rot: new THREE.Euler(-0.3, 0, 0),
    },
  };

  useEffect(() => {
    const config = cameraConfigs[currentModel] || cameraConfigs.default;

    if (cameraRef.current) {
      gsap.to(cameraRef.current.position, {
        x: config.pos.x,
        y: config.pos.y,
        z: config.pos.z,
        duration: 1.5,
        ease: "power2.inOut",
      });
      gsap.to(cameraRef.current.rotation, {
        x: config.rot.x,
        y: config.rot.y,
        z: config.rot.z,
        duration: 1.5,
        ease: "power2.inOut",
      });
    }
  }, [currentModel]);

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 0, 5]}
      fov={50}
    />
  );
};

// Handles model switching and scene positioning based on scroll
const SceneManager = () => {
  const { setCurrentModel, currentModel } = useContext(AnimationContext);

  useLayoutEffect(() => {
    Object.entries(MODEL_CONFIGS).forEach(([key, { triggerSection }]) => {
      ScrollTrigger.create({
        trigger: triggerSection,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onEnter: () => setCurrentModel(key),
        onEnterBack: () => setCurrentModel(key),
      });
    });
  }, [setCurrentModel]);

  return (
    <>
    <CameraManager/>
      <ModelContainer />
    </>
  );
};


const CameraAnimation = () => {
  const { camera } = useThree();
  const camRef = useRef(camera);

  useLayoutEffect(() => {
    camera.position.set(0.4333,1.169, 1.4868);
    camera.lookAt(0.6659, 0.4029, -0.7906); // met le bon target ici
  }, []);
  

  useLayoutEffect(() => {
    const timeline2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".second-section2",
         start: 'top bottom',
          end: 'bottom top',
        scrub: true,
        markers: true, // mets à true pour débug
      },
    });
    timeline2.to(camera.position, {
      x: 0.699,
      y: 0.2853,
      z: 0.0609,
      duration: 1,
      onUpdate: () => camera.lookAt(0.1452, -0.304, -1.4713),
    });
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".second-section",
         start: 'top bottom',
          end: 'bottom top',
          ease: "power2.inOut",
        scrub: true,
      },
    });
    timeline.to(camera.position, {
      x: 0.4333,
      y: 1.169,
      z:  1.4868,
      duration: 0,
      ease: "power2.inOut",

      onUpdate: () => camera.lookAt(0.6659, 0.4029, -0.7906),
    });
    timeline.to(camera.position, {
      x: -0.8382,
      y: 1.1769,
      z: 0.8896,
      duration: 1,
      ease: "power2.inOut",
      onUpdate: () => camera.lookAt(0.6224, 0.3342, -0.4441),
    });

    timeline.to(camera.position, {
      x: 0.3661,
      y: 1.1856,
      z: 0.596,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => camera.lookAt(0.7731, 0.341, -2.6481),
    });
    timeline.to(camera.position, {
      x: -0.2303,
      y: 1.0714,
      z: 0.7302,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => camera.lookAt(-0.016, 0.7217, -1.9896),
    });
    

    return () => {
      timeline.scrollTrigger?.kill();
    };
  }, []);

  return null;
};




// Updated CanvasContainer component with gradient background
export const CanvasContainer = () => (
  <AnimationProvider>
    <Canvas>
      <AnimatedGradientBackground />
      
      {
        /**
         * 
         * <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
         */
      }
      <ambientLight intensity={0.03} />
      <spotLight angle={0.14} color="#ffd0d0" penumbra={1} position={[25, 50, -20]} shadow-mapSize={[2048, 2048]} shadow-bias={-0.0001} castShadow />
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
      <Suspense
        fallback={
          <Html center>
            <div className="loading">Model loading...</div>
          </Html>
        }
      >
        <SceneManager />
      </Suspense> 
    </Canvas>
  </AnimationProvider>
);

{
  /**    gl={{ antialias: true, powerPreference: "high-performance" }}
   */
}
{
  /**
   *  
   *
   */
}
{
  /**
  export function ModelContainer() {
  const { currentModel } = useContext(AnimationContext);
  const config = MODEL_CONFIGS[currentModel];

  const gltf = useGLTF(config.url); 

  return (
    <Rig key={currentModel}>
      <primitive object={gltf.scene} scale={0.1} />
    </Rig>
  );
} */
}
