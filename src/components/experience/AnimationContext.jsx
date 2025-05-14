import  { createContext, useState, useCallback } from "react";

export const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
  const [currentModel, setCurrentModel] = useState("Model1");
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [transitionState, setTransitionState] = useState("idle");




  return (
    <AnimationContext.Provider
      value={{
        currentModel,
        setCurrentModel,
        isTransitioning,
        setIsTransitioning,
        setTransitionState,
        transitionState
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};