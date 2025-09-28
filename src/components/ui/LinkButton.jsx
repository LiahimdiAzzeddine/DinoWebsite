const LinkButton = ({
  href,
  title,
  alt,
  imgSrc,
  text,
  subtitle,
  inverted = false,
  size = 'default',
  rounded = true,
  opacity = 1,
}) => {
  const sizeClasses = {
    small: 'w-12 h-12 text-xs',
    default: 'w-16 h-16 text-sm',
    large: 'w-20 h-20 text-base'
  };

  const borderRadius = rounded ? 'rounded-[1.3rem]' : 'rounded-[1.3rem]';

  return (
    <div className="inline-block text-center">
      <a
        href={opacity === 0 ? undefined : href}
        title={title}
        aria-label={title}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          inline-block font-bold no-underline overflow-hidden
          lg:w-[5rem] lg:h-[5rem] lg:text-sm w-28 h-28 text-xs
          ${borderRadius}
          shadow-lg
          ${inverted
            ? "bg-white text-black border border-white text-sm"
            : imgSrc 
              ? "bg-gradient-to-br bg-white/20 text-white" 
              : "bg-gradient-to-br bg-white/20 text-white border border-white/30"}
            ${opacity == 0
            ? ""
            : "hover:scale-105 transition-all ease-out duration-200 pointer-events-auto hover:shadow-xl hover:-translate-y-1 active:scale-95 active:translate-y-0 "}
        `}
        style={{
          fontFamily: '"RocGrotesk", sans-serif',
          margin: "0.5em 0.5em 0.2em 0",
        }}
      >
        <div className={`flex items-center justify-center w-full h-full ${opacity == 0 ? "opacity-25" : ""}`}>
          {imgSrc && (
            <img
              src={imgSrc}
              loading="eager"
              decoding="async"
              alt={alt}
              className={`w-full h-full object-cover ${borderRadius}`}
            />
          )}
          {text && !imgSrc && (
            <span className="text-xs font-semibold leading-tight text-center">
              {text}
            </span>
          )}
        </div>
      </a>
      
      {subtitle && (
        <div className="md:text-[0.79rem] text-sm text-center text-white mx-auto opacity-100 leading-none">
          {subtitle}
        </div>
      )}
    </div>
  );
};

export default LinkButton;