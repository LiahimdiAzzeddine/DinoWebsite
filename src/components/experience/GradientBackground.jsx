import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GradientBackground = () => {
  const gradientRef = useRef();

  const colorsMap = {
    section1: ["#3f7ab1", "#5e32a8"],
    section2: ["#3f7ab1", "#5e32a8"],
    section3: ["#7f2926", "#7f2926"],
    section4: ["#118ab2", "#06d6a0"],
    section5: ["#29a2ca", "#2cb08e"],
    section6: ["#61b3cf", "#3cb371"],
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
              duration: 1,
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
        "--start": "#3f7ab1",
        "--end": "#5e32a8",
      }}
    />
  );
};

export default GradientBackground;
