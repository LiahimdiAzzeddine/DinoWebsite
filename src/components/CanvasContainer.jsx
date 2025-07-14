import { lazy, Suspense, useContext, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimationContext } from "./experience/AnimationContext";

import { Environment, Html, PerformanceMonitor } from "@react-three/drei";
import Lenis from '@studio-freight/lenis';
const Web1 = lazy(() => import("./experience/Web1"));
const Web2 = lazy(() => import("./experience/Web2"));
const Web3 = lazy(() => import("./experience/Web3"));
const GradientSkybox = lazy(() => import("./experience/SceneColor"));

gsap.registerPlugin(ScrollTrigger);

// ModelContainer.jsx
export function ModelContainer({ lenis }) {
  const { currentModel } = useContext(AnimationContext);
  return (
    <>

       <Web1
        sectionID={"web1"}
        isActive={currentModel === "web1"}
      />

     
       <Web2
        sectionID={"web2"}
        isActive={currentModel === "web2"}
      />
      {/* <Web3
        sectionID={"web3"}
        isActive={currentModel === "web3"}
      /> */}
    </>
  );
}

// Handles model switching and scene positioning based on scroll
const SceneManager = () => {

  return <ModelContainer />;
};

// Updated CanvasContainer component with gradient background
export const CanvasContainer = () => {

  const lenisRef = useRef(null);
  const [dpr, setDpr] = useState(0.7);
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);


  // useEffect(() => {
  //   const lenis = new Lenis({
  //     duration: 1.5, // Increased for smoother, slower scrolling
  //     smoothWheel: true,
  //     wheelMultiplier: 0.7, // Reduce wheel speed
  //     touchMultiplier: 0.7, // Reduce touch speed
  //     infinite: false,
  //     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  //     direction: "vertical",
  //     gestureOrientation: "vertical",
  //   });
  //   lenisRef.current = lenis;


  //   function raf(time) {
  //     lenis.raf(time);
  //     ScrollTrigger.update();
  //     requestAnimationFrame(raf);
  //   }

  //   requestAnimationFrame(raf);

  //   return () => {
  //     lenis.destroy();
  //   };
  // }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full z-10">

    <Canvas dpr={dpr} shadows={false} gl={{ antialias: false, powerPreference: "low-power" }}>
      <PerformanceMonitor
        bounds={() => [30, 60]}
        flipflops={2}
        onChange={({ factor }) => {
          const dpr = Math.round((0.7 + 1 * factor) * 100) / 100;
          setDpr(dpr);
        }}
      />
      {!isMobile? (
        <GradientSkybox />
      ):(
          <>
      <ambientLight color={0xffffff} intensity={0.6} />

      <directionalLight
        color={0xffffff}
        intensity={1}
        position={[1, 1, 1]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={500}
      />
    </>
      )}

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
            <div className="loading">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
            </div>
          </Html>
        }
      >
        <SceneManager />
      </Suspense>
    </Canvas>
    </div>
  );
};