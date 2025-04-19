import React, { Suspense, useContext, useLayoutEffect, useState } from "react";
import { useRef } from "react";
import { useThree } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import {
  AnimationProvider,
  AnimationContext,
} from "./experience/AnimationContext";
import EnvironmentScene from "./experience/Environment";
import SceneColor from "./experience/SceneColor";
import MODEL_CONFIGS from "./experience/MODEL_CONFIGS";
import { Html, OrbitControls} from "@react-three/drei";
import Rig from "./experience/Rig";
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
{/**
  export function ModelContainer() {
  const { currentModel } = useContext(AnimationContext);
  const config = MODEL_CONFIGS[currentModel];

  const gltf = useGLTF(config.url); 

  return (
    <Rig key={currentModel}>
      <primitive object={gltf.scene} scale={0.1} />
    </Rig>
  );
} */}

export default ModelContainer;
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

  return <ModelContainer modelKey={currentModel} />;
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


export const CanvasContainer = () => (
  <AnimationProvider>
    <Canvas
      shadows 
    >
    <SceneColor />
    <EnvironmentScene />
      <Suspense fallback={<Html center><div className="loading">Model loading...</div></Html>}>
      <SceneManager />
      </Suspense><CameraAnimation />
    </Canvas>
  </AnimationProvider>
);

{/**    gl={{ antialias: true, powerPreference: "high-performance" }}
 */} {
        /**
         *   
         * <CameraPositionHelper/>
         */
      }