import React, { createContext, useState, useCallback, useEffect } from "react";
import { gsap } from "gsap";

// Création du contexte
export const AnimationContext = createContext();

// Provider qui va entourer l'application
export const AnimationProvider = ({ children }) => {
  const [currentModel, setCurrentModel] = useState("Model1");
  const [timeline] = useState(() => gsap.timeline({ paused: true }));

  useEffect(() => {
    timeline.play();
  }, [timeline]);

  
  // Mémoiser les setters pour éviter des re-rendus inutiles
  const handleModelChange = useCallback((modelName) => {
    setCurrentModel(modelName);
  }, []);

  return (
    <AnimationContext.Provider
      value={{
        currentModel,
        setCurrentModel: handleModelChange,
        timeline 
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};