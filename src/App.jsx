import { Canvas } from "@react-three/fiber";
import "./App.css";
import { Experience } from "./components/Experience";
import { Scene } from "./components/Scene";
import { useEffect, useRef, useState } from "react";
import { CanvasContainer } from "./components/CanvasContainer";
import { Overlay } from "./components/Overlay";
import { AnimationProvider } from "./components/experience/AnimationContext";
import Loader from "./components/Loader";
import Lenis from '@studio-freight/lenis';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  /*
  useEffect(() => {
    const lenis = new Lenis({
      duration:1,             // durée du smoothing
      smooth: true,
      smoothWheel: true,
      syncTouchLerp: 0.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easing plus doux
      direction: 'vertical',
      lerp: 0.02                 // interpolation (fractions)
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);*/

  return (
     <AnimationProvider>
    <main className="overflow-x-hidden">
      {isLoading && <Loader onLoadingComplete={() => setIsLoading(false)} />}

			<div className="h-screen w-full fixed top-0 z-10 ">
				<CanvasContainer />
			</div>
    <Overlay />
  </main></AnimationProvider>
  );
}
/*
function App() {
  return (
  <Canvas camera={{
        fov: 45,
        far:1000.134,
        near:0.3,
        position:[2.303, 2.091, 7.028],
        rotation:[-0.172, 0.112, 0.019],
      }}>
        <AnimationProvider>
      <Experience/>
      </AnimationProvider>
    </Canvas>
  );
}

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      setScrollProgress(scrollPercent);

      if (!hasScrolled && scrollPercent > 0) {
        setHasScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Create a scrollable area
    document.body.style.height = "500vh";

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasScrolled]);

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 w-full h-full ">
        <CanvasContainer />
      </div>
      <div className="relative z-10">
        <Overlay />
      </div>
    </div>
  );
}*/
export default App;
