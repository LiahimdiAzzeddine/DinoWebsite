import NavBar from "./nav/NavBar";
import { Typewriter } from "react-simple-typewriter";

import { motion } from "framer-motion";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

const NeddleButton = ({ href = "#", children = "No text" }) => {
  return (
    <a
      href={href}
       className="
        inline-flex items-center gap-2 
        px-4 py-2 
        font-bold text-white text-base 
        rounded-full 
        border border-white/30 
        bg-white/20 
        shadow-[0_0_2px_rgba(0,0,0,0.5)] 
        transition 
        duration-150 
        ease-out 
        no-underline 
        hover:bg-white/30
        hover:shadow-[0_5px_20px_rgba(0,0,0,0.2)]
        hover:-translate-y-[1px]
        m-2
        pointer-events-auto
      "
      style={{
        fontFamily: '"Nunito Sans", sans-serif',
      }}
    >
      {children}
    </a>
  );
};


const LinkButton = ({
  href,
  title,
  alt,
  imgSrc,
  text,
  inverted = false,
}) => {
  return (
    <a
      href={href}
      title={title}
      aria-label={title}
      className={`
        inline-block font-bold text-base pointer-events-auto no-underline transition-all ease-out duration-100 
        rounded-full border shadow-[0_0_2px_rgba(0,0,0,0.5)] hover:shadow-[0_5px_20px_rgba(0,0,0,0.2)] hover:-translate-y-[1px]
        ${inverted 
          ? "bg-white text-black px-3 py-1 border-white border text-sm" 
          : "bg-white/20 text-white px-4 py-2 border-white/30"}
      `}
      style={{
        fontFamily: '"Nunito Sans", sans-serif',
        margin: "0.5em 0.5em 0.5em 0",
      }}
    >
      <div className="flex items-center gap-2">
        {imgSrc && (
          <img
            src={imgSrc}
            alt={alt}
            className={inverted ? "h-[2em]" : "h-[2em]"}
          />
        )}
        {text && <span>{text}</span>}
      </div>
    </a>
  );
};

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

const Card = ({
  title,
  subtitle,
  paragraphs,
  links,
  buttons,
  right = false,
  id,
  className = "",
}) => {
  const { ref, inView } = useInView({
    triggerOnce: false, // pour l'animer une seule fois true
    threshold: 0.2, // déclenchement à 20% visible
  });

  // Styles dynamiques pour la position (droite ou gauche)
  const cardStyle = {
    marginLeft: right ? "auto" : "calc(100% - 440px - 12vw)",
    marginRight: right ? "calc(100% - 440px - 12vw)" : "auto",
    left: right ? "auto" : 0,
    right: right ? 0 : "auto",
  };

  return (
    <motion.div
      id={id}
      ref={ref}
      className={`block ${className}`}
      style={cardStyle}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="wrapper">
        <header>
          <h1
            style={{
              minHeight: "2em", // Ajustez selon votre design
              display: "flex",
              alignItems: "center",
            }}
          >
            {title}
          </h1>
          <p className="category">{subtitle}</p>
        </header>
        <div className="content">
          {paragraphs.map((text, idx) => (
            <p key={idx} className={idx === 1 ? "small-margin" : ""}>
              {text}
            </p>
          ))}
          <div data-v-7479a2c4="">
            {links.map((link, idx) => (
              <LinkButton
                key={idx}
                href={link.href}
                title={link.title}
                alt={link.alt}
                imgSrc={link.imgSrc}
                text={link.text}
                inverted={link.inverted}
              />
            ))}

            {buttons.map((button, idx) => (
              <NeddleButton key={idx} href={button.href}>
                {button.title}
              </NeddleButton>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CardForm = ({ title, subtitle, form, right = false, id }) => {
  const { ref, inView } = useInView({
    triggerOnce: false, // pour l'animer une seule fois true
    threshold: 0.2, // déclenchement à 20% visible
  });

  // Styles dynamiques pour la position (droite ou gauche)
  const cardStyle = {
    marginLeft: right ? "auto" : "calc(100% - 440px - 12vw)",
    marginRight: right ? "calc(100% - 440px - 12vw)" : "auto",
    left: right ? "auto" : 0,
    right: right ? 0 : "auto",
  };

  return (
    <motion.div
      id={id}
      ref={ref}
      className={`block`}
      style={cardStyle}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="wrapper">
        <header>
          <h1>{title}</h1>
          <p className="category">{subtitle}</p>
        </header>
        <div className="content">{form}</div>
      </div>
    </motion.div>
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
      <Card
        id="section1"
        title={
          <>
            <Typewriter
              words={["Dinomite studio", "Where Ideas Become Hits"]}
              loop={0} // 0 = infini
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </>
        }
        subtitle="Dinomite studios"
        paragraphs={[
          "We're a creative game development studio obsessed with quality, speed and innovation we work with Game publishers to turn ideas into high-performing hybrid-casual mobile games in a world breaking Record Time",
        ]}
        links={[]}
        buttons={[
          {
            href: "#",
            title: "Let’s launch The next hit, together",
          },
        ]}
      />
      <Card
        right={true}
        id="section2"
        className="second-section"
        title={<>About Dinomite Studio</>}
        paragraphs={[
          "Founded in 2019, Dinomite Studio is a creative game development team based in Tangier, Morocco.",
          "Our studio brings together talented game developers, 3D artists, and game designers who share a passion for crafting engaging mobile game experiences.",
          "We work closely with global partners to bring ideas to life through collaboration, innovation, and a shared love for games",
        ]}
        links={[
        ]}
        buttons={[]}
      />
      <Card
        right={true}
        id="section3"
        className="second-section"
        title={<>40 Million downloads and counting</>}
        paragraphs={[
          "Join us in celebrating a worldwide milestone: over 40 million downloads across our mobile games.",
          "Our flagship hit, Money Bank 3D, has captivated players and set the bar high for mobile gaming creativity and fun.",
        ]}
        links={[
          {
            href: "#",
            title: "App Store",
            imgSrc: "assets/logos/appStore.png",
            alt: "Logo ofApp Store",
          },
          {
            href: "#",
            title: "Play Store",
            imgSrc: "assets/logos/play-store.png",
            alt: "Logo of Play Store",
          },
        ]}
        buttons={[]}
      />
      <Card
        id="section4"
        className="section3"
        title={<>Why Choose Dinomite Studio</>}
        paragraphs={[
          "Say goodbye to slow and costly game dev cycles, we specialize in fast, high-quality game prototyping. ",
          "Our quality-first approach helps our partners launch polished, market-ready hybrid casual games in just week.",
          "Cutting both time and development costs without compromising on creativity or performance.",
        ]}
        links={[]}
        buttons={[
          {
            href: "#",
            title: "Let’s launch The next hit, together",
          },
        ]}
      />
      <div id="section5">
      <Card
       
        className="section3"
        title={<>Rapid Game Prototyping</>}
        subtitle="What we can do"
        paragraphs={[
          "Get high-quality, market-ready prototypes in record time. We turn your concepts into fully playable builds in just weeks—ready for testing or pitching.",
        ]}
        links={[]}
        buttons={[]}
      />
      <Card
        
        className="section3"
        subtitle="What we can do"
        title={<>full game development and co-development</>}
        paragraphs={[
          "From concept to launch—or alongside your team—we build high-performing hybrid casual games with a focus on quality, speed, and scalability",
        ]}
        links={[]}
        buttons={[
          {
            href: "#",
            title: "Let’s launch The next hit, together",
          },
        ]}
      />
 </div>

      <CardForm
        id="section6"
        right={true}
        title={"Contact Us"}
        subtitle="Contact Dinomite"
        form={
          <>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="font-normal text-white text-[1.1em] leading-[1.35em] mt-[1.5em] mb-[1em] react-element-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 rounded-lg bg-[#ffffff18] border border-[#ffffff5e] placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="font-normal text-white text-[1.1em] leading-[1.35em] mt-[1.5em] mb-[1em] react-element-1"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg bg-[#ffffff18] border border-[#ffffff5e] placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="font-normal text-white text-[1.1em] leading-[1.35em] mt-[1.5em] mb-[1em] react-element-1"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full px-4 py-2 rounded-lg bg-[#ffffff18] border border-[#ffffff5e] placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="inline-block transition duration-200 bg-[linear-gradient(69deg,_rgb(63,_189,_168),_rgb(63,_177,_39))] hover:bg-[linear-gradient(30deg,_rgb(63,_189,_118),_rgb(63,_167,_39))] text-white rounded-2xl px-4 py-2 shadow-[rgba(0,0,0,0.05)_0px_0px_1.3rem_inset]"
                >
                  submit
                </button>
              </div>
            </form>
          </>
        }
      />

      {/* <Card
        title={<>what can Dinomite studio help you with</>}
        subtitle="second-section2"
        paragraphs={[
          "we specialize in fast, high-quality game development tailored for publishers and studios. Whether you need rapid prototyping to test new game concepts, full game development from ideation to launch, or co-development to enhance your existing projects, our expert team ensures efficient, risk-minimized production that meets industry standards. Partner with us to bring your games to life—faster,smarter, and better.",
          "we specialize in fast, high-quality game development tailored for publishers and studios. Whether you need rapid prototyping to test new game concepts, full game development from ideation to launch, or co-development to enhance your existing projects, our expert team ensures efficient, risk-minimized production that meets industry standards. Partner with us to bring your games to life—faster,smarter, and better.",
        ]}
        links={[]}
        buttons={[]}
      /> */}
    </>
  );
};
