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
import { Environment, Html, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import CameraPositionHelper from "./CameraPositionHelper";

gsap.registerPlugin(ScrollTrigger);

export function ModelContainer() {
  const { currentModel } = useContext(AnimationContext);
  const config = MODEL_CONFIGS[currentModel];
  const ModelComponent = config.Component;

  return (
    <Rig key={currentModel}>
      <ModelComponent scale={0.2} />
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
      <CameraManager key={currentModel} />
      <ModelContainer />
    </>
  );
};


// Updated CanvasContainer component with gradient background
export const CanvasContainer = () => (
  <AnimationProvider>
    <Canvas>
      <AnimatedGradientBackground />
      
      <ambientLight intensity={Math.PI} />
      {
        /**
         * 
         * <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
         */
      }
      
      <Environment preset="city" />
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
   *<CameraPositionHelper/>
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
