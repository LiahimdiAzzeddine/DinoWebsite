import { useState } from "react";
import NavBar from "./nav/NavBar";
import { motion } from "framer-motion";
const Section = (props) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`min-h-screen z-50 relative flex flex-col justify-center p-4 md:p-6 lg:p-10 ${
        props.right ? "items-end" : "items-start"
      } ${props.class}`}
      style={{ opacity: props.opacity }}
    >
      <div className="w-full md:w-3/4 lg:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-sm relative">
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

export const Overlay = ({ setActiveSection }) => {
  const [opacityFirstSection, setOpacityFirstSection] = useState(1);
  const [opacitySecondSection, setOpacitySecondSection] = useState(1);
  const [opacityLastSection, setOpacityLastSection] = useState(1);

  return (
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

      <Section right opacity={opacitySecondSection} class="second-section">
        <h1 className="font-semibold font-serif text-2xl ">
          adipisci fugiat, unde ullam nulla eveniet minus, quos delectus.
        </h1>
        <p className="text-gray-500">nulla eveniet minus, quos delectus.</p>
        <p className="mt-3">
          <b>adipisci 🚀</b>
        </p>
        <ul className="leading-9 element_1">
          <li>adipisci</li>
          <li>minus, quos delectus</li>
          <li>minus, quos</li>
          <li>minus, delectus</li>
        </ul>
        <p className="mt-3">
          <b>sdfdsf 🔬</b>
        </p>
        <ul className="leading-9">
          <li>dqsd</li>
          <li>qsd</li>
          <li>sdqs</li>
          <li>qsdqsdsds</li>
        </ul>
        <p className="mt-3">
          <b>sdfdsf 🔬</b>
        </p>
        <ul className="leading-9">
          <li>dqsd</li>
          <li>qsd</li>
          <li>sdqs</li>
          <li>qsdqsdsds</li>
        </ul>
        <p className="animate-bounce mt-6 react-element-1">↓</p>
        <p className="mt-3">
          <b>sdfdsf 🔬</b>
        </p>
        <ul className="leading-9">
          <li>dqsd</li>
          <li>qsd</li>
          <li>sdqs</li>
          <li>qsdqsdsds</li>
        </ul>
      </Section>
      <Section opacity={opacityLastSection}>
        <h1 className="font-semibold font-serif text-2xl section_2">
          🤙 minus, quos delectus
        </h1>
        <p className="text-gray-500">minus, quos delectus</p>
        <p className="mt-6 p-3 bg-slate-200 rounded-lg">
          📞 <a href="tel:(+42) 4242-4242-424242">(+42) 4242-4242-424242</a>
        </p>{" "}
        <p className="text-gray-500">minus, quos delectus</p>
        <p className="mt-6 p-3 bg-slate-200 rounded-lg">
          📞 <a href="tel:(+42) 4242-4242-424242">(+42) 4242-4242-424242</a>
        </p>{" "}
        <p className="text-gray-500">minus, quos delectus</p>
        <p className="mt-6 p-3 bg-slate-200 rounded-lg">
          📞 <a href="tel:(+42) 4242-4242-424242">(+42) 4242-4242-424242</a>
        </p>
      </Section>
      <Section right>
        <h1 className="font-semibold font-serif text-2xl second-section2">
          adipisci fugiat, unde ullam nulla eveniet minus, quos delectus.
        </h1>
        <p className="text-gray-500">nulla eveniet minus, quos delectus.</p>
        <p className="mt-3">
          <b>adipisci </b>
        </p>
        <ul className="leading-9">
          <li>adipisci</li>
          <li>minus, quos delectus</li>
          <li>minus, quos</li>
          <li>minus, delectus</li>
        </ul>

        <ul className="leading-9">
          <li>dqsd</li>
          <li>qsd</li>
          <li>sdqs</li>
          <li>qsdqsdsds</li>
        </ul>
        <p className="animate-bounce mt-6">↓</p>
      </Section>
    </div>
  );
};
