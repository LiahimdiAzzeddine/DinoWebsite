import LinkButton from "./LinkButton";
import NeddleButton from "./NeddleButton";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Block = ({
  title,
  subtitle,
  paragraphs = [],
  links = [],
  buttons = [],
  right = false,
  id,
  className = "",
  children, // 💡 supporte les enfants personnalisés (ex: FAQ)
}) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <motion.div
      id={id}
      ref={ref}
      className={`block2 relative sm:w-[90vw] sm:max-w-[1200px] mx-auto ${className}`}
      initial={{  y: 40 }}
      animate={inView ? { y: 0 } : {  y: 40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="wrapper">
        {(title || subtitle) && (
           <header>
          <h1>{title}</h1>
          <p className="category">{subtitle}</p>
        </header>
        )}

        <div className="content space-y-4">
          {/* Text paragraphs */}
          {paragraphs.length > 0 &&
            paragraphs.map((text, idx) => (
              <p key={idx} className={idx === 1 ? "small-margin" : ""}>
                {text}
              </p>
            ))}

          {/* Children (e.g. custom accordions) */}
          {children}

          {/* Optional link + button section */}
          {(links.length > 0 || buttons.length > 0) && (
            <div className="flex flex-col gap-3 mt-4">
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
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Block;
