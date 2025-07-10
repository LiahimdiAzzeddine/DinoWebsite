// hooks/useScrollDirection.js
import { useContext } from 'react';
import { AnimationContext } from '../components/experience/AnimationContext';

export const useScrollDirection = () => {
  const { 
    scrollDirection, 
    scrollVelocity, 
    currentScrollY, 
    getScrollDirection,
    getScrollVelocity,
    getCurrentScrollY,
    lenisInstance
  } = useContext(AnimationContext);

  const getScrollInfo = () => ({
    direction: scrollDirection,
    velocity: scrollVelocity,
    scrollY: currentScrollY,
    directionText: scrollDirection === 1 ? 'Down' : scrollDirection === -1 ? 'Up' : 'None',
    isScrollingDown: scrollDirection === 1,
    isScrollingUp: scrollDirection === -1,
    isScrollingFast: Math.abs(scrollVelocity) > 1000,
    isScrollingSlow: Math.abs(scrollVelocity) < 500,
  });

  const scrollTo = (target, options = {}) => {
    if (lenisInstance.current) {
      lenisInstance.current.scrollTo(target, options);
    }
  };

  const scrollToTop = () => scrollTo(0);
  const scrollToBottom = () => scrollTo(document.body.scrollHeight);

  return {
    // Valeurs actuelles
    direction: scrollDirection,
    velocity: scrollVelocity,
    scrollY: currentScrollY,
    
    // Fonctions utilitaires
    getScrollInfo,
    getScrollDirection,
    getScrollVelocity,
    getCurrentScrollY,
    
    // Contrôles Lenis
    scrollTo,
    scrollToTop,
    scrollToBottom,
    lenis: lenisInstance.current,
    
    // Helpers
    isScrollingDown: scrollDirection === 1,
    isScrollingUp: scrollDirection === -1,
    isScrollingFast: Math.abs(scrollVelocity) > 1000,
  };
};

// Utilisation dans n'importe quel composant :
// const { direction, velocity, isScrollingDown } = useScrollDirection();