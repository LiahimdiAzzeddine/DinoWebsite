import { createContext, useState } from "react";


// Animation Context to manage animation state and current model
export const AnimationContext = createContext();

/**
 * Animation Provider component to manage animation state
 * Tracks current model and animation status
 */
export function AnimationProvider({ children }) {
  const [currentModel, setCurrentModel] = useState("TrongCom");
  
  const value = {
    currentModel,
    setCurrentModel,
  };
  
  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}