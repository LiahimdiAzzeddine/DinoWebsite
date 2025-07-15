import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  useLayoutEffect(() => {
 if (pathname === "/" && !isMobile) {
      // Scroll à 100px pour la page d'accueil
      //window.scrollTo(0, 100);
    } else {
      // Scroll tout en haut pour les autres pages
      window.scrollTo(0, 0);
    }
    
  }, [pathname]);

  return null;
}