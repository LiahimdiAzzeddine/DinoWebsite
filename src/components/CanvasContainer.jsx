import React, {
  Suspense,
  useContext,
  useEffect,
} from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  AnimationProvider,
  AnimationContext,
} from "./experience/AnimationContext";

import MODEL_CONFIGS from "./experience/MODEL_CONFIGS";
import AnimatedGradientBackground from "./experience/SceneColor";
import {Environment, Html} from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger);

// ModelContainer.jsx
export function ModelContainer() {
  const { currentModel } = useContext(AnimationContext);
  const config = MODEL_CONFIGS[currentModel];
  const ModelComponent = config.Component;
  const { size } = useThree();

  return (
    <>
      <ModelComponent scale={size.width >= 1024 ? 0.2 : 0.1} />
    </>
  );
}

// Handles model switching and scene positioning based on scroll
const SceneManager = () => {
  const { setCurrentModel, setScrollDirection, } = useContext(AnimationContext);

  useEffect(() => {
    Object.entries(MODEL_CONFIGS).forEach(([key, { triggerSection }]) => {
      ScrollTrigger.create({
        trigger: triggerSection,
        start: "top bottom",
        end: "top top",
        scrub: true,
        markers:true,
        onEnter: () => {
          setCurrentModel(key);
        },
        onEnterBack: () => {
          setCurrentModel(key);
        },
       
      });
      
    });
  }, [setCurrentModel]);

  return <ModelContainer />;
};


// Updated CanvasContainer component with gradient background
export const CanvasContainer = () => (
  <AnimationProvider>
    <Canvas>
      <AnimatedGradientBackground />
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
