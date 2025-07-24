import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GradientBackground = () => {
  const gradientRef = useRef();

  const colorsMap = {
    section1: ["#47beab21", "#47beab"],
    section2: ["#47beab21", "#47beab"],
    section3: ["#a19e77", "#feffe5"],
    section4: ["#cfe5ff", "#3D74B6"],
    section5: ["#3D74B6", "#77BEF0"],
    section6: ["#64a5d3", "#d8ffff"],
  };
  

  useLayoutEffect(() => {
    const gradient = gradientRef.current;

    // Désactiver toutes les transitions CSS pendant les animations GSAP
    const disableCSSTransitions = () => {
      gradient.style.transition = 'none';
    };

    const enableCSSTransitions = () => {
      gradient.style.transition = '--start 5s cubic-bezier(0.25, 0.46, 0.45, 0.94), --end 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    };

    Object.entries(colorsMap).forEach(([sectionId, [startColor, endColor]]) => {
      ScrollTrigger.create({
        trigger: `#${sectionId}`,
        start: "center+=100 bottom",
        end: "center+=200 top",
        onEnter: () => {
          disableCSSTransitions();
          gsap.to(gradient, {
            "--start": startColor,
            "--end": endColor,
            duration: 2,
            ease: "power2.inOut",
            onComplete: enableCSSTransitions
          });
        },
        onEnterBack: () => {
          disableCSSTransitions();
          gsap.to(gradient, {
            "--start": startColor,
            "--end": endColor,
            duration: 2,
            ease: "power2.inOut",
            onComplete: enableCSSTransitions
          });
        }
      });
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <div
      ref={gradientRef}
      className="gradient-background-fixed"
      style={{
        "--start": "#47beab21",
        "--end": "#47beab",
      }}
    />
  );
};


export default GradientBackground;
