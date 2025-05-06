import React, { createContext, useState, useCallback } from "react";

// Création du contexte
export const AnimationContext = createContext();

// Provider qui va entourer l'application
export const AnimationProvider = ({ children }) => {
  const [currentModel, setCurrentModel] = useState("Model1");
  
  // Mémoiser les setters pour éviter des re-rendus inutiles
  const handleModelChange = useCallback((modelName) => {
    setCurrentModel(modelName);
  }, []);

  return (
    <AnimationContext.Provider
      value={{
        currentModel,
        setCurrentModel: handleModelChange
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};