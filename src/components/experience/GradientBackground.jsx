import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GradientBackground = () => {
  const gradientRef = useRef();

  const colorsMap = {
    section1: ["#48A6A7", "#006A71"],
    section2: ["#48A6A7", "#006A71"],
    section3: ["#03A6A1", "#77BEF0"],
    section4: ["#3D74B6", "#EAC8A6"],
    section5: ["#3D74B6", "#77BEF0"],
    section6: ["#c5d4e3", "#48A6A7"],
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
        start: "top 75%",
        end: "bottom 25%",
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
        "--start": "#48A6A7",
        "--end": "#006A71",
      }}
    />
  );
};


export default GradientBackground;
