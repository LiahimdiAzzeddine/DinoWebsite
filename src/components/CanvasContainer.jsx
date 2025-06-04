import React, { Suspense, useContext, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { gsap } from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {
  AnimationProvider,
  AnimationContext,
} from "./experience/AnimationContext";
import { useGSAP } from "@gsap/react";

import MODEL_CONFIGS from "./experience/MODEL_CONFIGS";
import AnimatedGradientBackground from "./experience/SceneColor";
import { Environment, Html } from "@react-three/drei";
import Lenis from '@studio-freight/lenis';
import { Web1 } from "./experience/Web1";
import { Web2 } from "./experience/Web2";
import { Web3 } from "./experience/Web3";
gsap.registerPlugin(ScrollTrigger);

// ModelContainer.jsx
export function ModelContainer({lenis}) {
  const { currentModel } = useContext(AnimationContext);
  const config = MODEL_CONFIGS[currentModel];
  const { size } = useThree();

  return (
    <>
      <Web1
        scale={size.width >= 1024 ? 0.2 : 0.1}
        sectionID={"web1"}
        isActive={currentModel === "web1"}
        lenis={lenis}
      />
      <Web2
        scale={size.width >= 1024 ? 0.2 : 0.1}
        sectionID={"web2"}
        isActive={currentModel === "web2"}
      />
        <Web3
        scale={size.width >= 1024 ? 0.2 : 0.1}
        sectionID={"web3"}
        isActive={currentModel === "web3"}
      />
    </>
  );
}

// Handles model switching and scene positioning based on scroll
const SceneManager = ({lenis}) => {
  const { setCurrentModel, isTransitioning, setIsTransitioning } = 
    useContext(AnimationContext);


  return <ModelContainer lenis={lenis} />;
};

// Updated CanvasContainer component with gradient background
export const CanvasContainer = () => {
    const { isTransitioning } = useContext(AnimationContext);
      const lenisRef = useRef(null);

/**/ 
useEffect(() => {
     const lenis = new Lenis({
      duration: 1.5, // Increased for smoother, slower scrolling
      smoothWheel: true,
      wheelMultiplier: 0.7, // Reduce wheel speed
      touchMultiplier: 0.7, // Reduce touch speed
      infinite: false,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureOrientation: "vertical",
    });      
    lenisRef.current = lenis;

      function raf(time) {
        lenis.raf(time);
        ScrollTrigger.update(); 
        requestAnimationFrame(raf);
      }
  
      requestAnimationFrame(raf);
  
      return () => {
        lenis.destroy();
      };
    }, []);
   
  return (
    <Canvas>
      {
        /**
         * 
         * 
         */
      }
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
        <SceneManager lenis={lenisRef.current}  />
      </Suspense>
    </Canvas>
  );
};