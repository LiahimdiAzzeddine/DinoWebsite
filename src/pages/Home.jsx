import { useContext, useEffect } from "react";
import { CanvasContainer } from "../components/CanvasContainer";
import { Overlay } from "../components/Overlay";
import { AnimationContext } from "../components/experience/AnimationContext";

// pages/Home.jsx
export default function Home() {
  const {
    progress, setProgress,
    fadeOut, setFadeOut,
    setIsLoading,
  } = useContext(AnimationContext);

  useEffect(() => {
    setProgress(0);
     setFadeOut(false);
    setIsLoading(false);
  }, []);
  
  return <>
  <div className="h-screen w-full fixed top-0 z-10">
    {/* <CanvasContainer /> */}
  </div>;
    <Overlay />
  </>
}
