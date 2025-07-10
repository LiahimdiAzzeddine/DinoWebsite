// AnimationContext.js
import { createContext, useState, useRef } from "react";

export const AnimationContext = createContext();

export const AnimationProvider = ({ children }) => {
  const [currentModel, setCurrentModel] = useState("web1");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  
  // Variables pour la direction du scroll
  const [scrollDirection, setScrollDirection] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [currentScrollY, setCurrentScrollY] = useState(0);
  
  // Variables pour conserver la dernière direction valide
  const [lastValidDirection, setLastValidDirection] = useState(0);
  const [lastValidVelocity, setLastValidVelocity] = useState(0);
  
  const lastScrollY = useRef(0);
  const lenisInstance = useRef(null);
  const directionHistory = useRef([]); // Historique des directions
  const velocityHistory = useRef([]); // Historique des vélocités

  // Fonction pour mettre à jour la direction du scroll
  const updateScrollDirection = (scrollY, velocity) => {
    setCurrentScrollY(scrollY);
    setScrollVelocity(velocity);
    
    // Déterminer la direction basée sur la différence de position
    let newDirection = 0;
    if (scrollY > lastScrollY.current) {
      newDirection = 1; // Scroll vers le bas
    } else if (scrollY < lastScrollY.current) {
      newDirection = -1; // Scroll vers le haut
    }
    
    setScrollDirection(newDirection);
    
    // Conserver la dernière direction valide (non-zero)
    if (newDirection !== 0) {
      setLastValidDirection(newDirection);
      // Ajouter à l'historique
      directionHistory.current.push(newDirection);
      // Garder seulement les 10 dernières directions
      if (directionHistory.current.length > 10) {
        directionHistory.current.shift();
      }
    }
    
    // Conserver la dernière vélocité valide (non-zero)
    if (Math.abs(velocity) > 0.1) {
      setLastValidVelocity(velocity);
      // Ajouter à l'historique
      velocityHistory.current.push(velocity);
      // Garder seulement les 10 dernières vélocités
      if (velocityHistory.current.length > 10) {
        velocityHistory.current.shift();
      }
    }
    
    lastScrollY.current = scrollY;
  };

  // Fonction pour obtenir la direction la plus probable
  const getReliableDirection = () => {
    // Si on a une direction actuelle valide, l'utiliser
    if (scrollDirection !== 0) {
      return scrollDirection;
    }
    
    // Sinon, utiliser la dernière direction valide
    if (lastValidDirection !== 0) {
      return lastValidDirection;
    }
    
    // En dernier recours, analyser l'historique
    if (directionHistory.current.length > 0) {
      const recent = directionHistory.current.slice(-3); // 3 dernières directions
      const downCount = recent.filter(d => d === 1).length;
      const upCount = recent.filter(d => d === -1).length;
      return downCount > upCount ? 1 : -1;
    }
    
    return 0;
  };

  // Fonction pour obtenir la vélocité la plus probable
  const getReliableVelocity = () => {
    if (Math.abs(scrollVelocity) > 0.1) {
      return scrollVelocity;
    }
    
    if (Math.abs(lastValidVelocity) > 0.1) {
      return lastValidVelocity;
    }
    
    // Moyenne des dernières vélocités
    if (velocityHistory.current.length > 0) {
      const recent = velocityHistory.current.slice(-3);
      return recent.reduce((a, b) => a + b, 0) / recent.length;
    }
    
    return 0;
  };

  // Fonctions d'accès
  const getScrollDirection = () => scrollDirection;
  const getScrollVelocity = () => scrollVelocity;
  const getCurrentScrollY = () => currentScrollY;

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
        progress, 
        setProgress,
        fadeOut, 
        setFadeOut,
        // Valeurs de scroll
        scrollDirection,
        scrollVelocity,
        currentScrollY,
        lastValidDirection,
        lastValidVelocity,
        // Fonctions
        updateScrollDirection,
        getScrollDirection,
        getScrollVelocity,
        getCurrentScrollY,
        getReliableDirection,
        getReliableVelocity,
        lenisInstance,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};