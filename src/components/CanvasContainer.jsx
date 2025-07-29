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

const detectionStates = {
  web1: false,
  web2: false,
  web3: false
};





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
      <Web3
        sectionID={"web3"}
        isActive={currentModel === "web3"}
      />
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
  const { setCurrentModel } = useContext(AnimationContext);
  let scrollPauseTimeout = null;
  let detect_web1;
  let detect_web2;
  let detect_web3;

  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
  };

  const waitUntilScrollStops = (callback, delay = 1000) => {
    clearTimeout(scrollPauseTimeout);
    scrollPauseTimeout = setTimeout(() => {
      callback();
    }, delay);
  };

  const verifyAndCorrectActiveTrigger = () => {
    const activeModel = Object.entries(detectionStates).find(([_, isActive]) => isActive)?.[0];

    if (!activeModel) return;

    setCurrentModel(activeModel);

    const allTriggers = {
      web1: ["web1", "web1_scroll"],
      web2: ["web2"],
      web3: ["web3", "web3_secondary", "web3_armatureMove"]
    };

    Object.entries(allTriggers).forEach(([model, triggers]) => {
      triggers.forEach(id => {
        const t = ScrollTrigger.getById(id);
        if (!t) return;
        const shouldEnable = model === activeModel;
        if (shouldEnable && !t.enabled) {
          t.enable(), console.log("🚀 ~ verifyAndCorrectActiveTrigger ~ activeModel:", activeModel)
        }
        else if (!shouldEnable && t.enabled) /*t.disable()*/;
      });
    });
  };

  useEffect(() => {
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      ignoreMobileResize: true
    });

    // if (isMobile()) {
    //   ScrollTrigger.defaults({
    //     refreshPriority: -1,
    //   });
    //   ScrollTrigger.normalizeScroll({
    //     type: "touch,wheel,pointer"
    //   });
    //   ScrollTrigger.config({
    //     limitCallbacks: 3,
    //   });
    // }

    const onScroll = () => {
      waitUntilScrollStops(() => {
        console.log("🚀 ~ CanvasContainer ~ onScroll:");
        verifyAndCorrectActiveTrigger();
      }, 300);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(scrollPauseTimeout);
    };
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      detect_web1 = ScrollTrigger.create({
        id: "detect_web1",
        trigger: "#section1",
        start: "top bottom",
        endTrigger: "#section3",
        end: "center+=95 bottom",
        onUpdate: self => (detectionStates.web1 = self.isActive)
      });

      detect_web2 = ScrollTrigger.create({
        id: "detect_web2",
        trigger: "#section3",
        start: "center+=100 bottom",
        end: "center+=200 top",
        onUpdate: self => (detectionStates.web2 = self.isActive)
      });

      detect_web3 = ScrollTrigger.create({
        id: "detect_web3",
        trigger: "#section3",
        start: "center+=220 top",
        endTrigger: "#section6",
        end: "bottom bottom",
        onUpdate: self => (detectionStates.web3 = self.isActive)
      });
    });
    mm.add("(max-width: 767px)", () => {
      detect_web1 = ScrollTrigger.create({
        id: "detect_web1",
        trigger: "#section1",
        start: "top bottom",
        endTrigger: "#section3",
        end: "top bottom+=260",
        onUpdate: (self) => (detectionStates.web1 = self.isActive),
      });

      detect_web2 = ScrollTrigger.create({
        id: "detect_web2",
        trigger: "#section3",
        start: "top bottom+=260",
        end: "top top",
        onUpdate: (self) => (detectionStates.web2 = self.isActive),
      });

      detect_web3 = ScrollTrigger.create({
        id: "detect_web3",
        trigger: "#section3",
        start: "top top",
        endTrigger: "#section6",
        end: "bottom bottom",
        onUpdate: (self) => (detectionStates.web3 = self.isActive),
      });
    });
    return () => {
      detect_web1.kill();
      detect_web2.kill();
      detect_web3.kill();
    };
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
      smoothWheel: true,
      wheelMultiplier: 0.75,
      infinite: false,
      easing: t => 1 - Math.pow(1 - t, 1.8),
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
    <div className="absolute top-0 left-0 w-full h-full z-10">
      <Canvas dpr={dpr} shadows={false} gl={{ antialias: false, powerPreference: "low-power" }}>
        <PerformanceMonitor
          bounds={() => [30, 60]}
          flipflops={2}
          onChange={({ factor }) => {
            const newDpr = Math.round((0.7 + 1 * factor) * 100) / 100;
            setDpr(newDpr);
          }}
        />
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