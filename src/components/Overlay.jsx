import NavBar from "./nav/NavBar";
import { Typewriter } from "react-simple-typewriter";

import { motion } from "framer-motion";
import { useState } from "react";
import VerticalProgressBar from "./nav/VerticalProgressBar";

const Section = (props) => {
  return (
    <motion.section
      id={props.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
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
    </motion.section>
  );
};

export const Overlay = () => {
  {
    /** */
  }
  const [activeSection, setActiveSection] = useState("section1");

  // Définir les sections
  const sections = [
    { id: "section1", label: "Intro" },
    { id: "section2", label: "Next Hit" },
    { id: "section3", label: "Designer" },
    { id: "section4", label: "Services" },
  ];
  return (
    <>
      <div className="w-full relative m-auto flex justify-center">
        <NavBar />
      </div>
{/** 
      <VerticalProgressBar
        sections={sections}
        setActiveSection={setActiveSection}
      />*/}

      <Section right id="section1">
        <div></div>
        <span className="notranslate text-white tracking-[1px] uppercase text-center md:text-left">
          Dinomite Studio
        </span>

        <h1 className="font-bold text-white text-[2em] md:text-[3em] leading-[1.1em] mt-[0.4em] mb-[0.4em]">
          <Typewriter
            words={[
              "High quality",
              "Fast",
              "Cost effective",
              "Dinomite studio is the way to go",
              "Let’s Build the Next Hit Together!",
            ]}
            loop={0} // 0 = infini
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h1>

        <p className="font-normal text-white text-[1.1em] leading-[1.35em] mt-[1.5em] mb-[1em]">
          We're a creative game development team obsessed with quality, speed
          and innovation we work with Game publishers to turn ideas into
          high-performing mobile games in a world breaking Record Time
        </p>
        <a
          className="inline-block font-bold text-white text-base no-underline cursor-pointer 
             rounded-full border border-white/30 bg-white/20 shadow-[0_0_2px_rgba(0,0,0,0.5)] 
             px-4 py-2 m-2 pointer-events-auto transition-all duration-200 ease-out hover:shadow-[0_5px_20px_#0003] hover:-translate-y-0.5"
        >
          <div className="flex items-center gap-2">
            Let’s launch your next hit, together
          </div>
        </a>
      </Section>
      
      <Section right id="section2" class="second-section">
        <span className="notranslate text-white tracking-[1px] uppercase text-center md:text-left">
          Next Hit
        </span>
        <h2 className="font-bold text-white text-[1em] md:text-[2em] leading-[1.1em] mt-[0.4em] mb-[0.4em] element_1">
          Where Speed Meets Quality
          <span className="inline-block opacity-100 text-white transition-all duration-[200ms]">
            Let's Build the Next Hit Together!
          </span>
        </h2>

        <p className="font-normal text-white text-[1.1em] leading-[1.35em] mt-[1.5em] mb-[1em] react-element-1 section-1">
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
            <div className="flex gap-[0.5em] items-center section-2">
              <img
                alt="Logo of Ios"
                src="https://needle.tools/_nuxt/logo-three.CiaNm32y.png"
                className="h-[1.4em]"
              />
            </div>
          </a>
        </div>
      </Section>

      <Section right id="section3" class="section3">
        <h2 className="font-bold text-white text-[1em] md:text-[2em] leading-[1.1em] mt-[0.4em] mb-[0.4em] section_2">
          Meet (First name), a Game designer
        </h2>
        <p className="font-normal text-white text-[1.1em] leading-[1.35em] mt-[1.5em] mb-[1em] react-element-1">
          Dinomite Studio is the strategic development partner of choice For
          ambitious game publishers looking to expand their hybrid casual
          portfolio. Our approach combines accelerated prototyping with
          cost-effective, quality-first production that minimizes risks and
          ensures a fast, market-ready game that exceeds industry standards.
        </p>
      </Section>
      <Section right>

        <p className="font-normal text-white text-[1.1em] leading-[1.35em] mt-[1.5em] mb-[1em] react-element-1">
          Dinomite Studio is the strategic development partner of choice For
          ambitious game publishers looking to expand their hybrid casual
          portfolio. Our approach combines accelerated prototyping with
          cost-effective, quality-first production that minimizes risks and
          ensures a fast, market-ready game that exceeds industry standards.
        </p>
      </Section>
      <Section right id="section4" class="second-section2">
        <h2 className="font-bold text-white text-[1em] md:text-[2em] leading-[1.1em] mt-[0.4em] mb-[0.4em] ">
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
      <Section right>
        <h2 className="font-bold text-white text-[1em] md:text-[2em] leading-[1.1em] mt-[0.4em] mb-[0.4em] ">
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
      <Section right id="section5">
        <h2 className="font-bold text-white text-[1em] md:text-[2em] leading-[1.1em] mt-[0.4em] mb-[0.4em]">
          what can Dinomite studio help you with section5
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
        </p>{" "}
        <p className="font-normal text-white text-[1.1em] leading-[1.35em] mt-[1.5em] mb-[1em] react-element-1">
          we specialize in fast, high-quality game development tailored for
          publishers and studios. Whether you need rapid prototyping to test new
          game concepts, full game development from ideation to launch, or
          co-development to enhance your existing projects, our expert team
          ensures efficient, risk-minimized production that meets industry
          standards. Partner with us to bring your games to life—faster,
          smarter, and better.{" "}
        </p>{" "}
        <p className="font-normal text-white text-[1.1em] leading-[1.35em] mt-[1.5em] mb-[1em] react-element-1">
          we specialize in fast, high-quality game development tailored for
          publishers and studios. Whether you need rapid prototyping to test new
          game concepts, full game development from ideation to launch, or
          co-development to enhance your existing projects, our expert team
          ensures efficient, risk-minimized production that meets industry
          standards. Partner with us to bring your games to life—faster,
          smarter, and better.{" "}
        </p>{" "}
        <p className="font-normal text-white text-[1.1em] leading-[1.35em] mt-[1.5em] mb-[1em] react-element-1">
          we specialize in fast, high-quality game development tailored for
          publishers and studios. Whether you need rapid prototyping to test new
          game concepts, full game development from ideation to launch, or
          co-development to enhance your existing projects, our expert team
          ensures efficient, risk-minimized production that meets industry
          standards. Partner with us to bring your games to life—faster,
          smarter, and better.{" "}
        </p>{" "}
        <p className="font-normal text-white text-[1.1em] leading-[1.35em] mt-[1.5em] mb-[1em] react-element-1">
          we specialize in fast, high-quality game development tailored for
          publishers and studios. Whether you need rapid prototyping to test new
          game concepts, full game development from ideation to launch, or
          co-development to enhance your existing projects, our expert team
          ensures efficient, risk-minimized production that meets industry
          standards. Partner with us to bring your games to life—faster,
          smarter, and better.{" "}
        </p>{" "}
        <p className="font-normal text-white text-[1.1em] leading-[1.35em] mt-[1.5em] mb-[1em] react-element-1">
          we specialize in fast, high-quality game development tailored for
          publishers and studios. Whether you need rapid prototyping to test new
          game concepts, full game development from ideation to launch, or
          co-development to enhance your existing projects, our expert team
          ensures efficient, risk-minimized production that meets industry
          standards. Partner with us to bring your games to life—faster,
          smarter, and better.{" "}
        </p>{" "}
        <p className="font-normal text-white text-[1.1em] leading-[1.35em] mt-[1.5em] mb-[1em] react-element-1">
          we specialize in fast, high-quality game development tailored for
          publishers and studios. Whether you need rapid prototyping to test new
          game concepts, full game development from ideation to launch, or
          co-development to enhance your existing projects, our expert team
          ensures efficient, risk-minimized production that meets industry
          standards. Partner with us to bring your games to life—faster,
          smarter, and better.{" "}
        </p>{" "}
        <p className="font-normal text-white text-[1.1em] leading-[1.35em] mt-[1.5em] mb-[1em] react-element-1">
          we specialize in fast, high-quality game development tailored for
          publishers and studios. Whether you need rapid prototyping to test new
          game concepts, full game development from ideation to launch, or
          co-development to enhance your existing projects, our expert team
          ensures efficient, risk-minimized production that meets industry
          standards. Partner with us to bring your games to life—faster,
          smarter, and better.{" "}
        </p>{" "}
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
      <Section right>
        <h2 className="font-bold text-white text-[1em] md:text-[2em] leading-[1.1em] mt-[0.4em] mb-[0.4em]  ">
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
    </>
  );
};
