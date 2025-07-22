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
  section5: ["#d5e1ea", "#c5d4e3"],
  section6: ["#c5d4e3", "#dceef2"],
};




  useLayoutEffect(() => {
    const gradient = gradientRef.current;

    Object.entries(colorsMap).forEach(([sectionId, [startColor, endColor]]) => {
      ScrollTrigger.create({
        trigger: `#${sectionId}`,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) {
            gsap.to(gradient, {
              "--start": startColor,
              "--end": endColor,
              duration: 2,
              ease: "power2.inOut",
            });
          }
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <div
      ref={gradientRef}
      className="fixed inset-0 -z-10 gradient-background"
      style={{
        "--start": "#48A6A7",
        "--end": "#006A71",
      }}
    />
  );
};

export default GradientBackground;
