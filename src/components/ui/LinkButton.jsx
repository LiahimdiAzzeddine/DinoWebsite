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
         rounded-[1rem] sm:rounded-full  border shadow-[0_0_2px_rgba(0,0,0,0.5)] hover:shadow-[0_5px_20px_rgba(0,0,0,0.2)] hover:-translate-y-[1px]
        ${inverted 
          ? "bg-white text-black px-3 py-1 border-white border text-sm" 
          : "bg-white/20 text-white px-4 py-2 border-white/30"}
      `}
      style={{
        fontFamily: '"Nunito Sans", sans-serif',
        margin: "0.5em 0.5em 0.5em 0",
      }}
    >
      <div className="flex items-center gap-2 text-center">
        {imgSrc && (
          <img
            src={imgSrc}
            loading="eager"
                  decoding="async"
            alt={alt}
            className={inverted ? "h-[2em]" : "h-[2em]"}
          />
        )}
        {text && <span>{text}</span>}
      </div>
    </a>
  );
};
export default LinkButton;