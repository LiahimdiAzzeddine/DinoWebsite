import { createContext, useState } from "react";


// Animation Context to manage animation state and current model
export const AnimationContext = createContext();

/**
 * Animation Provider component to manage animation state
 * Tracks current model and animation status
 */
export function AnimationProvider({ children }) {
  const [currentModel, setCurrentModel] = useState("Model1");
  const [scrollDirection, setScrollDirection] = useState(null);
  const [animationTrigger, setAnimationTrigger] = useState(null);

  const value = {
    currentModel,
    setCurrentModel,
    scrollDirection,
    setScrollDirection,
    animationTrigger,
    setAnimationTrigger
  };
  
  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}