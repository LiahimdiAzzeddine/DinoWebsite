import { useState } from "react";
import NavBar from "./nav/NavBar";
import { Scroll, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Section = (props) => {
  return (
    <section
      className={`min-h-screen relative flex flex-col justify-center p-4 md:p-6 lg:p-10 ${
        props.right ? "items-end" : "items-start"
      } ${props.class}`}
      style={{ opacity: props.opacity }}
    >
      <div className="w-full md:w-3/4 lg:w-1/2 flex items-center justify-center  ">
        <div className="w-full max-w-sm relative z-10">
          {/* Glass effect background */}
          <div className="absolute top-[-15px] md:top-[-20px] lg:top-[-30px] left-[-15px] md:left-[-20px] lg:left-[-30px] h-[calc(100%+30px)] md:h-[calc(100%+40px)] lg:h-[calc(100%+60px)] w-[calc(100%+30px)] md:w-[calc(100%+40px)] lg:w-[calc(100%+60px)] rounded-[20px] md:rounded-[30px] lg:rounded-[40px] shadow-[0_0_10px_#5e5e5e38] md:shadow-[0_0_15px_#5e5e5e38] lg:shadow-[0_0_20px_#5e5e5e38] outline outline-[1px] outline-[#ffffff2b] backdrop-blur-[20px] md:backdrop-blur-[30px] lg:backdrop-blur-[40px] backdrop-saturate-[1.4] bg-[#66666624]" />

          <div className="relative z-10 rounded-lg md:rounded-xl lg:rounded-2xl">
            {props.children}
          </div>
        </div>
      </div>
    </section>
  );
};

export const Overlay = ({ setActiveSection }) => {
  const scroll = useScroll();
  const [opacityFirstSection, setOpacityFirstSection] = useState(1);
  const [opacitySecondSection, setOpacitySecondSection] = useState(1);
  const [opacityLastSection, setOpacityLastSection] = useState(1);

  useFrame(() => {
    setOpacityFirstSection(1 - scroll.range(0, 1 / 3));
    setOpacitySecondSection(scroll.curve(1 / 3, 1 / 3));
    setOpacitySecondSection(scroll.curve(1 / 3, 1 / 3));
    setOpacityLastSection(scroll.range(2 / 3, 1 / 3));
  });

  return (
    <Scroll html>
    <div className="w-screen">
      <div className="w-full relative m-auto flex justify-center">
        <NavBar />
      </div>

      <Section right opacity={opacityFirstSection}>
        <span className="notranslate text-white tracking-[1px] uppercase text-center md:text-left">
          Game Name
        </span>

        <h1 className="font-bold text-white text-[2em] md:text-[3em] leading-[1.1em] mt-[0.4em] mb-[0.4em]">
          40 MILLION
          <span className="inline-block opacity-100 text-white transition-all duration-[200ms]">
            DOWNLOADS AND COUNTING
          </span>
        </h1>

        <p className="font-normal text-white text-[1.1em] leading-[1.35em] mt-[1.5em] mb-[1em]">
          At Dinomite Studio, we don't just develop games; we create
          market-ready hits that motivate players and drive growth. With 40M+
          downloads, our expertise in hybrid visual game development helps our
          partners scale their games faster, with accelerated prototyping,
          production, and Quality First that ensures your next game has the
          highest chance of success.
        </p>
      </Section>

      <Section opacity={opacitySecondSection} class="second-section">
        <span className="notranslate text-white tracking-[1px] uppercase text-center md:text-left">
          Next Hit
        </span>
        <h2 className="font-bold text-white text-[1em] md:text-[2em] leading-[1.1em] mt-[0.4em] mb-[0.4em] element_1">
          Where Speed Meets Quality
          <span className="inline-block opacity-100 text-white transition-all duration-[200ms]">
            Let’s Build the Next Hit Together!
          </span>
        </h2>

        <p className="font-normal text-white text-[1.1em] leading-[1.35em] mt-[1.5em] mb-[1em] react-element-1">
          Dinomite Studio is the strategic development partner of choice For
          ambitious game publishers looking to expand their hybrid casual
          portfolio. Our approach combines accelerated prototyping with
          cost-effective, quality-first production that minimizes risks and
          ensures a fast, market-ready game that exceeds industry standards.
        </p>

        <div className="text-white">
          <a
            className="inverted item inline-block text-black bg-white bg-opacity-80 border border-white border-opacity-30 rounded-[30px] py-[0.3em] px-[0.8em] text-[1em] font-bold shadow-[rgba(0,0,0,0.5)_0px_0px_2px] transition-all duration-[100ms] ease-out my-[0.5em] mr-[0.5em] no-underline"
            aria-label=""
          >
            <div className="flex gap-[0.5em] items-center">
              <img
                src="https://needle.tools/_nuxt/logo-three.CiaNm32y.png"
                alt="Logo of Android"
                className="h-[1.4em]"
              />
            </div>
          </a>
          <a
            className="inverted item inline-block text-black bg-white bg-opacity-80 border border-white border-opacity-30 rounded-[30px] py-[0.3em] px-[0.8em] text-[1em] font-bold shadow-[rgba(0,0,0,0.5)_0px_0px_2px] transition-all duration-[100ms] ease-out my-[0.5em] mr-[0.5em] no-underline"
            aria-label=""
          >
            <div className="flex gap-[0.5em] items-center">
              <img
                alt="Logo of Ios"
                src="https://needle.tools/_nuxt/logo-three.CiaNm32y.png"
                className="h-[1.4em]"
              />
            </div>
          </a>
        </div>
      </Section>
      <Section right opacity={opacityLastSection}>
      <h2 className="font-bold text-white text-[1em] md:text-[2em] leading-[1.1em] mt-[0.4em] mb-[0.4em] second-section2">
          what can Dinomite studio help you with
        </h2>
        <p className="font-normal text-white text-[1.1em] leading-[1.35em] mt-[1.5em] mb-[1em] react-element-1">
          we specialize in fast, high-quality game development tailored for
          publishers and studios. Whether you need rapid prototyping to test new
          game concepts, full game development from ideation to launch, or
          co-development to enhance your existing projects, our expert team
          ensures efficient, risk-minimized production that meets industry
          standards. Partner with us to bring your games to life—faster,
          smarter, and better.{" "}
        </p>
        <p className="font-normal text-white text-[1.1em] leading-[1.35em] mt-[1.5em] mb-[1em] react-element-1">
          we specialize in fast, high-quality game development tailored for
          publishers and studios. Whether you need rapid prototyping to test new
          game concepts, full game development from ideation to launch, or
          co-development to enhance your existing projects, our expert team
          ensures efficient, risk-minimized production that meets industry
          standards. Partner with us to bring your games to life—faster,
          smarter, and better.{" "}
        </p>
        <div className="text-white">
          <a
            className="inverted item inline-block text-black bg-white bg-opacity-80 border border-white border-opacity-30 rounded-[30px] py-[0.3em] px-[0.8em] text-[1em] font-bold shadow-[rgba(0,0,0,0.5)_0px_0px_2px] transition-all duration-[100ms] ease-out my-[0.5em] mr-[0.5em] no-underline"
            aria-label=""
          >
            <div className="flex gap-[0.5em] items-center">
              <img
                src="https://needle.tools/_nuxt/logo-three.CiaNm32y.png"
                alt="Logo of Android"
                className="h-[1.4em]"
              />
            </div>
          </a>
          <a
            className="inverted item inline-block text-black bg-white bg-opacity-80 border border-white border-opacity-30 rounded-[30px] py-[0.3em] px-[0.8em] text-[1em] font-bold shadow-[rgba(0,0,0,0.5)_0px_0px_2px] transition-all duration-[100ms] ease-out my-[0.5em] mr-[0.5em] no-underline"
            aria-label=""
          >
            <div className="flex gap-[0.5em] items-center">
              <img
                alt="Logo of Ios"
                src="https://needle.tools/_nuxt/logo-three.CiaNm32y.png"
                className="h-[1.4em]"
              />
            </div>
          </a>
        </div>
      </Section>

      </div>
      </Scroll>
   
  );
};
