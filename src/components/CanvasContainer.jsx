import { Suspense, useContext, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimationContext } from "./experience/AnimationContext";

import MODEL_CONFIGS from "./experience/MODEL_CONFIGS";
import { Environment, Html, PerformanceMonitor } from "@react-three/drei";
import Lenis from '@studio-freight/lenis';
import { Web1 } from "./experience/Web1";
import { Web2 } from "./experience/Web2";
import { Web3 } from "./experience/Web3";
import GradientSkybox from "./experience/SceneColor";
import round from 'lodash/round';

gsap.registerPlugin(ScrollTrigger);

// ModelContainer.jsx
export function ModelContainer({ lenis }) {
  const { currentModel } = useContext(AnimationContext);
  const config = MODEL_CONFIGS[currentModel];
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);


  return (
    <>

      <Web1
        sectionID={"web1"}
        isActive={currentModel === "web1"}
        lenis={lenis}
      />
      <Web2
        sectionID={"web2"}
        isActive={currentModel === "web2"}
      />
      <Web3
        sectionID={"web3"}
        isActive={currentModel === "web3"}
      />
    </>
  );
}

// Handles model switching and scene positioning based on scroll
const SceneManager = ({ lenis }) => {
  const { setCurrentModel, isTransitioning, setIsTransitioning } =
    useContext(AnimationContext);


  return <ModelContainer lenis={lenis} />;
};

// Updated CanvasContainer component with gradient background
export const CanvasContainer = () => {
  const { isTransitioning } = useContext(AnimationContext);
  const lenisRef = useRef(null);
  const [dpr, setDpr] = useState(0.3);
  const [effectsOn, setEffectsOn] = useState(true);


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
    <Canvas  dpr={0} shadows={false}  gl={{ antialias: false, powerPreference: "low-power" }}>
      <PerformanceMonitor
        bounds={() => [30, 60]}
        flipflops={2}
        onChange={({ factor }) => {
    const dpr = Math.round((0.3 + 1 * factor) * 100) / 100;
    setDpr(dpr);
  }}
      />
      <GradientSkybox />
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
        <SceneManager lenis={lenisRef.current} />
      </Suspense>

    </Canvas>
  );
};