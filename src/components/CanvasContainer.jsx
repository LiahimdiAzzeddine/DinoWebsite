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
import ConfettiSystem from "./experience/ConfettiSystem";
import { Web1 } from "./experience/Web1";
import { Web2 } from "./experience/Web2";

gsap.registerPlugin(ScrollTrigger);

// ModelContainer.jsx
export function ModelContainer() {
  const { currentModel } = useContext(AnimationContext);
  const config = MODEL_CONFIGS[currentModel];
  const { size } = useThree();

  return (
    <>
      <Web1
        scale={size.width >= 1024 ? 0.2 : 0.1}
        isActive={currentModel === "Model1"}
      />
      <Web2
        scale={size.width >= 1024 ? 0.2 : 0.1}
        isActive={currentModel === "Model2"}
      />
    </>
  );
}

// Handles model switching and scene positioning based on scroll
const SceneManager = () => {
  const {
    setCurrentModel,
    isTransitioning,
    setIsTransitioning,
    setTransitionState,
  } = useContext(AnimationContext);

  useEffect(() => {
    Object.entries(MODEL_CONFIGS).forEach(([key, { triggerSection }]) => {
      ScrollTrigger.create({
        trigger: triggerSection,
        start: "clamp(top bottom)",
        end: "clamp(top top)",
        scrub: 1.5,
        markers: true,

        onEnter: () => {
          setTransitionState("down");
          if (!isTransitioning) {
            setCurrentModel(key);
          } else {
            console.log("Blocked change to", key, "due to transition");
          }
        },
        onEnterBack: () => {
          setTransitionState("up");
          setCurrentModel(key);
        },

      });
    });
  }, [setCurrentModel, isTransitioning]);

  return <ModelContainer />;
};

// Updated CanvasContainer component with gradient background
export const CanvasContainer = () => {
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
