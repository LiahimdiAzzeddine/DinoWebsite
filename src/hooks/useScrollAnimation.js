import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export function useScrollAnimation({ 
  actions, 
  animationName, 
  currentPage, 
  pageRange, 
  excludedAnimations = [] 
}) {
  const tl = useRef();
  const scroll = useScroll();

  // Configuration de l'animation contrôlée par le scroll
  useEffect(() => {
    const targetAction = actions[animationName];
    if (targetAction) {
      targetAction.reset().play().paused = true;

      const duration = targetAction.getClip().duration;
      tl.current = gsap.timeline({
        paused: true,
        onUpdate: () => {
          const time = tl.current.progress() * duration;
          targetAction.time = time;
        }
      });

      tl.current.to({}, { duration: duration });
    }

    // Jouer les autres animations automatiquement
    if (actions) {
      Object.entries(actions).forEach(([name, action]) => {
        console.log("🚀 ~ Object.entries ~ name:", name)
        if (!excludedAnimations.includes(name)) {
          action.play();
        }
      });
    }
  }, [actions]);

  // Mise a jour de l'animation en fonction du scroll
  useFrame(() => {
    if (!tl.current || !scroll) return;

    const [startPage, endPage] = pageRange;
    const isInRange = currentPage >= startPage && currentPage < endPage;
    
    if (isInRange) {
      const totalPages = scroll.pages;
      const pagesForAnimation = endPage - startPage;
      const startOffset = startPage / totalPages;
      
      // Normalisation du progres pour l'intervalle de pages specifie
      const adjustedOffset = (scroll.offset - startOffset) * (totalPages / pagesForAnimation);
      const normalizedProgress = Math.max(0, Math.min(adjustedOffset, 1));
      
      tl.current.progress(normalizedProgress);
    }
  });

  return { timeline: tl.current };
}