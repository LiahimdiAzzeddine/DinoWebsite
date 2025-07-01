import { useContext, useEffect } from "react";
import { CanvasContainer } from "../components/CanvasContainer";
import { Overlay } from "../components/Overlay";
import { AnimationContext } from "../components/experience/AnimationContext";
import Confetti from "react-confetti";

// pages/Home.jsx
export default function Home() {
  const {
    progress, setProgress,
    fadeOut, setFadeOut,
    setIsLoading,
    currentModel
  } = useContext(AnimationContext);

  useEffect(() => {
    setProgress(0);
     setFadeOut(false);
    setIsLoading(false);
  }, []);
  
  return <>
   {/* Canvas en arrière-plan */}
      <div className="fixed top-0 left-0 w-full h-screen z-10">
        <CanvasContainer />
      </div>

      {/* Particles au-dessus du canvas */}
          <div className="fixed top-0 left-0 w-full h-full z-20 pointer-events-none">
            {currentModel=="web2"&&<Confetti/>}
      
      </div>

      {/* Overlay au-dessus de tout */}
      <Overlay />
  </>
}
