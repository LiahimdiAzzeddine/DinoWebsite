import { Typewriter } from "react-simple-typewriter";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import LinkButton from "./ui/LinkButton";
import NeddleButton from "./ui/NeddleButton";
import { useNavigate } from "react-router-dom";
import emailjs from '@emailjs/browser';


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

  // Hook pour détecter la taille d'écran
  const [isDesktop, setIsDesktop] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);


  return (
    <motion.div
      id={id}
      ref={ref}
      className={`
        block relative w-[440px] mx-auto
        ${right
          ? 'lg:ml-auto lg:mr-0 lg:right-0'
          : 'lg:mr-auto lg:ml-0 lg:left-0'
        }
        ${className}
      `}
      style={{
        marginLeft: isDesktop ? (right ? "auto" : "calc(100% - 440px - 12vw)") : "auto",
        marginRight: isDesktop ? (right ? "calc(100% - 440px - 12vw)" : "auto") : "auto",
      }}

    >
      <div className="wrapper">
        <header>
          <h1 className="sm:min-h-[2em] min-h-[2.2em]  flex items-center">
            {title}
          </h1>
          <p className="category">{subtitle}</p>
        </header>
        <div className="content">
          {paragraphs.map((text, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.4, duration: 0.6 }}
            >
              {text}
            </motion.p>
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
              <NeddleButton key={idx} method={() => {
                navigate("/"); // Navigue d'abord à la page d'accueil
                setTimeout(() => {
                  const el = document.getElementById(button.href);
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }, 200); // Petit délai pour laisser la page charger
              }}>
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
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

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
      className={`
      block relative w-[440px] mx-auto
      ${right
          ? 'lg:ml-auto lg:mr-0 lg:right-0'
          : 'lg:mr-auto lg:ml-0 lg:left-0'
        }
    `}
      style={{
        marginLeft: isDesktop ? (right ? "auto" : "calc(100% - 440px - 12vw)") : "auto",
        marginRight: isDesktop ? (right ? "calc(100% - 440px - 12vw)" : "auto") : "auto",
      }}
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
  const formRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'your_service_id', // remplace par ton propre ID
        'your_template_id', // remplace par ton propre ID
        formRef.current,
        'your_public_key' // remplace par ta clé publique
      )
      .then(
        (result) => {
          console.log('Email envoyé !', result.text);
          alert('Message sent successfully!');
        },
        (error) => {
          console.error('Erreur :', error.text);
          alert('Failed to send message.');
        }
      );
  };

  return (
    <>
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
            href: "section6",
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
          "Join us in celebrating a worldwide milestone :\n over 40 million downloads across our mobile games.",
          "Our flagship hit, Money Bank 3D, has captivated players and set the bar high for mobile gaming creativity and fun.",
        ]}
        links={[
          {
            href: "https://apps.apple.com/us/app/money-bank-3d/id1523673634",
            title: "App Store",
            imgSrc: "../assets/logos/appStore.webp",
            alt: "Logo ofApp Store",
          },
          {
            href: "https://play.google.com/store/apps/details?id=com.tp.moneybank&hl=en&pli=1",
            title: "Play Store",
            imgSrc: "../assets/logos/play-store.webp",
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
            href: "section6",
            title: "Let discuss your project",
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
          right={true}
          title={<>full game development and co-development</>}
          paragraphs={[
            "From concept to launch or alongside your team we build high performing hybrid casual games with a focus on quality, speed, and scalability",
          ]}
          links={[]}
          buttons={[

          ]}
        />
      </div>

       <CardForm
      id="section6"
      right={true}
      title="Contact Us"
      subtitle="Contact Dinomite"
      form={
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
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
              name="user_name"
              className="w-full px-4 py-2 rounded-lg bg-[#ffffff18] border border-[#ffffff5e] placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter your name"
              required
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
              name="user_email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-[#ffffff18] border border-[#ffffff5e] placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          <div>
            <label
              htmlFor="business_name"
              className="font-normal text-white text-[1.1em] leading-[1.35em] mt-[1.5em] mb-[1em] react-element-1"
            >
              Business Name <span className="text-white text-sm">(optional)</span>
            </label>
            <input
              type="text"
              id="business_name"
              name="business_name"
              placeholder="Enter your business name"
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
              name="message"
              rows="5"
              className="w-full px-4 py-2 rounded-lg bg-[#ffffff18] border border-[#ffffff5e] placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="inline-block transition duration-200 bg-[linear-gradient(69deg,_rgb(63,_189,_168),_rgb(63,_177,_39))] hover:bg-[linear-gradient(30deg,_rgb(63,_189,_118),_rgb(63,_167,_39))] text-white sm:rounded-2xl rounded-[10px] px-4 py-2 shadow-[rgba(0,0,0,0.05)_0px_0px_1.3rem_inset]"
            >
              Submit
            </button>
          </div>
        </form>
      }
    />

    </>
  );
};
