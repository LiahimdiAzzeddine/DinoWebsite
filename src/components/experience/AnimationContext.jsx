// AnimationContext.js
import { createContext, useState } from "react";

export const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
  const [currentModel, setCurrentModel] = useState("web1");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  return (
    <AnimationContext.Provider
      value={{
        currentModel,
        setCurrentModel,
        isTransitioning,
        setIsTransitioning,
        setTransitionDirection,
        transitionDirection,
        isLoading,
        setIsLoading,
        progress, setProgress,
        fadeOut, setFadeOut
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};
