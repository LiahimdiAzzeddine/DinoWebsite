import  { createContext, useState, useCallback } from "react";

export const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
  const [currentModel, setCurrentModel] = useState("Model1");
  const [isTransitioning, setIsTransitioning] = useState(false);
const [transitionDirection, setTransitionDirection] = useState(null); 



  return (
    <AnimationContext.Provider
      value={{
        currentModel,
        setCurrentModel,
        isTransitioning,
        setIsTransitioning,
        setTransitionDirection,
        transitionDirection
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};