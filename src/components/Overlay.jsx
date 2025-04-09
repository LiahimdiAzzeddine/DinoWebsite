
import { useState } from "react";
import NavBar from "./nav/NavBar";
const Section = (props) => {
  return (
    <section
      className={`min-h-screen z-50 relative flex flex-col justify-center p-4 md:p-6 lg:p-10 ${
        props.right ? "items-end" : "items-start"
      } ${props.class}`}
      style={{ opacity: props.opacity }}
    >
      <div className="w-full md:w-3/4 lg:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-sm relative">
          {/* Glass effect background */}
          <div className="absolute top-[-15px] md:top-[-20px] lg:top-[-30px] left-[-15px] md:left-[-20px] lg:left-[-30px] h-[calc(100%+30px)] md:h-[calc(100%+40px)] lg:h-[calc(100%+60px)] w-[calc(100%+30px)] md:w-[calc(100%+40px)] lg:w-[calc(100%+60px)] rounded-[20px] md:rounded-[30px] lg:rounded-[40px] shadow-[0_0_10px_#5e5e5e38] md:shadow-[0_0_15px_#5e5e5e38] lg:shadow-[0_0_20px_#5e5e5e38] outline outline-[1px] outline-[#ffffff2b] backdrop-blur-[20px] md:backdrop-blur-[30px] lg:backdrop-blur-[40px] backdrop-saturate-[1.4] bg-[#66666624]" />

          {/* Contenu sans bg-white */}
          <div className="relative z-10 px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-12 rounded-lg md:rounded-xl lg:rounded-2xl">
            {props.children}
          </div>
        </div>
      </div>
    </section>
  );
};

export const Overlay = ({ setActiveSection }) => {
  
  const [opacityFirstSection, setOpacityFirstSection] = useState(1);
  const [opacitySecondSection, setOpacitySecondSection] = useState(1);
  const [opacityLastSection, setOpacityLastSection] = useState(1);


  return (
      <div className="w-screen">
        <div className="w-full relative m-auto flex justify-center">
          <NavBar/>
        </div>
        
        <Section opacity={opacityFirstSection}>
          <h1 className="font-semibold font-serif text-2xl">
            Lorem ipsum dolor, sit amet consectetur 
          </h1>
          <p className="text-gray-500">adipisicing elit. Ipsam tempora dolores vel accusamus </p>
          <p className="mt-3">aut officia :</p>
          <ul className="leading-9">
            <li>🧑 saepe veritatis? Ratione, cupiditate </li>
            <li>🧑‍🏫saepe veritatis? Ratione,</li>
            <li>📦 cupiditate repudiandae quidem </li>
          </ul>
          <p className="animate-bounce mt-6">↓</p>
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
        <Section opacity={opacityLastSection} >
          <h1 className="font-semibold font-serif text-2xl section_2">
            🤙 minus, quos delectus
          </h1>
          <p className="text-gray-500">
          minus, quos delectus
          </p>
          <p className="mt-6 p-3 bg-slate-200 rounded-lg">
            📞 <a href="tel:(+42) 4242-4242-424242">(+42) 4242-4242-424242</a>
          </p> <p className="text-gray-500">
          minus, quos delectus
          </p>
          <p className="mt-6 p-3 bg-slate-200 rounded-lg">
            📞 <a href="tel:(+42) 4242-4242-424242">(+42) 4242-4242-424242</a>
          </p> <p className="text-gray-500">
          minus, quos delectus
          </p>
          <p className="mt-6 p-3 bg-slate-200 rounded-lg">
            📞 <a href="tel:(+42) 4242-4242-424242">(+42) 4242-4242-424242</a>
          </p>
        </Section>
        <Section right >
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
