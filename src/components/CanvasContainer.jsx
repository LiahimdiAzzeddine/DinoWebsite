import React, { Suspense, useContext, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  AnimationProvider,
  AnimationContext,
} from "./experience/AnimationContext";

import MODEL_CONFIGS from "./experience/MODEL_CONFIGS";
import AnimatedGradientBackground from "./experience/SceneColor";
import { Environment, Html } from "@react-three/drei";
import Lenis from '@studio-freight/lenis';
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
  const { setCurrentModel, isTransitioning, setTransitionDirection,currentModel,setIsTransitioning } =
    useContext(AnimationContext);

  useEffect(() => {
    Object.entries(MODEL_CONFIGS).forEach(([key, { triggerSection }]) => {
      ScrollTrigger.create({
        trigger: triggerSection,
        start: "clamp(top bottom)",
        end: "clamp(top top)",
        scrub: true,
        markers: true,

        onEnter: () => {
            if (!isTransitioning ) {

            gsap.delayedCall(0.3, () => setCurrentModel(key),setIsTransitioning(false));
            setTransitionDirection("down");
          } else {
            console.log("Blocked change to", key, "due to transition");
          }
        },
        onEnterBack: () => {
          if (!isTransitioning) {
            gsap.delayedCall(0.3, () => setCurrentModel(key),setIsTransitioning(false));
            setTransitionDirection("up");
          } else {
            console.log("Blocked back change to", key, "due to transition");
          }
        },
      });
    });
  }, [setCurrentModel, isTransitioning]);

  return <ModelContainer />;
};

// Updated CanvasContainer component with gradient background
export const CanvasContainer = () => {
/**/
    useEffect(() => {
      const lenis = new Lenis({
        duration:1.5,
        smooth: true,
        smoothWheel: true,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: "vertical",
      });
  
      function raf(time) {
        lenis.raf(time);
        ScrollTrigger.update(); // 👈 Synchronisation clé ici
        requestAnimationFrame(raf);
      }
  
      requestAnimationFrame(raf);
  
      return () => {
        lenis.destroy();
      };
    }, []);
  return (
    <Canvas>
      <AnimatedGradientBackground />
      <ambientLight intensity={0.03} />
      <spotLight
        angle={0.14}
        color="#ffd0d0"
        penumbra={1}
        position={[25, 50, -20]}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
        castShadow
      />
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
  );
};
