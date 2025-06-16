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
          <div className="absolute top-[-15px] md:top-[-20px] lg:top-[-30px] left-[-15px] md:left-[-20px] lg:left-[-30px] h-[calc(100%+30px)] md:h-[calc(100%+40px)] lg:h-[calc(100%+60px)] w-[calc(100%+30px)] md:w-[calc(100%+40px)] lg:w-[calc(100%+60px)] rounded-[20px] md:rounded-[30px] lg:rounded-[40px] shadow-[0_0_10px_#5e5e5e38] md:shadow-[0_0_15px_#5e5e5e38] lg:shadow-[0_0_20px_#5e5e5e38] outline outline-[1px] outline-[#ffffff2b] backdrop-blur-[20px] md:backdrop-blur-[30px] lg:backdrop-blur-[40px] backdrop-saturate-[2] bg-[#6666660e]" />

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
        {/** 
        <span className="notranslate text-white tracking-[1px] uppercase text-center md:text-left">
          Dinomite Studio
        </span>*/}

        <h1 className="font-bold text-white text-[2em] md:text-[3em] leading-[1.1em] mt-[0.4em] mb-[0.4em]">
          <Typewriter
            words={[
              "Dinomite studio",
              "Where Ideas Become Hits",
            ]}
            loop={0} // 0 = infini
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h1>

        <p className="font-normal text-white text-[1.1em] leading-[1.35em] mt-[1.5em] mb-[1em] ">
         We're a creative game development studio obsessed with quality, speed and innovation
we work with Game publishers to turn ideas into high-performing hybrid-casual mobile games in a world breaking Record Time
        </p>
        <a
          className="inline-block font-bold text-white text-base no-underline cursor-pointer 
             rounded-full border border-white/30 bg-white/20 shadow-[0_0_2px_rgba(0,0,0,0.5)] 
             px-3 py-1 m-2 pointer-events-auto transition-all duration-200 ease-out hover:shadow-[0_5px_20px_#0003] hover:-translate-y-0.8"
        >
          <div className="flex items-center gap-2 text-sm">
           Let’s launch The next hit, together
          </div>
        </a>
      </Section>
      
   <Section id="section2" class="second-section">
  <h2 className="font-bold text-white text-[1em] md:text-[2em] leading-[1.1em] mt-[0.4em] mb-[0.4em] element_1">
    40 Million downloads and counting
  </h2>

  <p className="font-normal text-white text-[1.1em] leading-[1.35em] mt-[1.5em] mb-[1em] react-element-1 section-1">
    Join us in celebrating a worldwide milestone: over 40 million downloads across our mobile games. Our flagship hit, Money Bank 3D, has captivated players and set the bar high for mobile gaming creativity and fun.
  </p>

  <div className="text-white flex flex-wrap">

    <a
      href="#"
      className="inline-flex items-center gap-[0.5em] text-white bg-[#ffffff2a] bg-opacity-80 border border-white border-opacity-30 rounded-[30px] py-[0.3em] px-[0.8em] text-[1em] font-bold shadow-[rgba(0,0,0,0.5)_0px_0px_2px] transition-all duration-200 ease-out my-[0.5em] mr-[0.5em] no-underline hover:bg-opacity-80 hover:-translate-y-[1px]"
      aria-label="Download on the App Store"
    >
      <img
        src="assets/logos/app-store_831276.png"
        alt="App Store Logo"
        className="h-[1.5em]"
      />
      <span>App Store</span>
    </a>

    <a
      href="#"
      className="inline-flex items-center gap-[0.5em] text-white bg-[#ffffff2a] bg-opacity-80 border border-white border-opacity-30 rounded-[30px] py-[0.3em] px-[0.8em] text-[1em] font-bold shadow-[rgba(0,0,0,0.5)_0px_0px_2px] transition-all duration-200 ease-out my-[0.5em] mr-[0.5em] no-underline hover:bg-opacity-80 hover:-translate-y-[1px]"
      aria-label="Download on Google Play"
    >
      <img
        src="assets/logos/game_14857377.png"
        alt="Google Play Logo"
        className="h-[1.5em]"
      />
      <span>Google Play</span>
    </a>
  </div>
</Section>


      <Section  id="section3" class="section3">
        <h1 className="font-bold text-white text-[2em] md:text-[3em] leading-[1.1em] mt-[0.4em] mb-[0.4em]">
          <Typewriter
            words={[
              "why Dinomite Studio ?",
              "Fast prototyping",
              "quality first approach",
              "cost affective"
            ]}
            loop={0} // 0 = infini
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h1>
        <p className="font-normal text-white text-[1.1em] leading-[1.35em] mt-[1.5em] mb-[1em] react-element-1">
         Our fast prototyping and quality-first approach empower our partners to roll out polished, market ready hybrid casual games in weeks—not months—while slashing development costs. Our lean, data driven pipeline and stake aligned risk sharing model mean we only win when you do, giving you the confidence to scale your portfolio without compromise.
        </p>
         <a
          className="inline-block font-bold text-white text-base no-underline cursor-pointer 
             rounded-full border border-white/30 bg-white/20 shadow-[0_0_2px_rgba(0,0,0,0.5)] 
             px-3 py-1 m-2 pointer-events-auto transition-all duration-200 ease-out hover:shadow-[0_5px_20px_#0003] hover:-translate-y-0.8"
        >
          <div className="flex items-center gap-2 text-sm">
           Let’s launch The next hit, together
          </div>
        </a>
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
      <Section right id="section5">
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
    <Section id="section5" className="py-12 px-4 bg-gray-900 text-white">
  <div className="max-w-2xl mx-auto">
     <h1 className="font-bold text-white text-[2em] md:text-[3em] leading-[1.1em] mt-[0.4em] mb-[0.4em]">Contact Us</h1>

    <form className="space-y-6">
      <div>
        <label htmlFor="name" className="font-normal text-white text-[1.1em] leading-[1.35em] mt-[1.5em] mb-[1em] react-element-1">
          Your Name
        </label>
        <input
          type="text"
          id="name"
          className="w-full px-4 py-2 rounded-lg bg-[#ffffff18] border border-[#ffffff5e] focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="font-normal text-white text-[1.1em] leading-[1.35em] mt-[1.5em] mb-[1em] react-element-1">
          Your Email
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-4 py-2 rounded-lg bg-[#ffffff18] border border-[#ffffff5e] focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label htmlFor="message" className="font-normal text-white text-[1.1em] leading-[1.35em] mt-[1.5em] mb-[1em] react-element-1">
          Your Message
        </label>
        <textarea
          id="message"
          rows="5"
          className="w-full px-4 py-2 rounded-lg bg-[#ffffff18] border border-[#ffffff5e] focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Write your message here..."
        ></textarea>
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="inline-block transition duration-200 bg-[linear-gradient(69deg,_rgb(63,_189,_168),_rgb(63,_177,_39))] hover:bg-[linear-gradient(30deg,_rgb(63,_189,_118),_rgb(63,_167,_39))] text-white rounded-2xl px-4 py-2 shadow-[rgba(0,0,0,0.05)_0px_0px_1.3rem_inset]"

        >
          Contact Us
        </button>
        
      </div>
    </form>
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
