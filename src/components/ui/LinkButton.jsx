
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

  return (
    <div className="inline-block text-center">
      <a
        href={opacity === 0 ? undefined : href}
        title={title}
        aria-label={title}
        target="_blank"
        rel="noopener noreferrer"
        className={`
          inline-block font-bold  no-underline 
          lg:w-[4.1rem] lg:h-[4.1rem] lg:text-sm w-12 h-12 text-xs
          ${rounded ? 'rounded-2xl' : 'rounded-lg'}
          border shadow-lg
          ${inverted
            ? "bg-white text-black border-white border text-sm"
            : "bg-gradient-to-br bg-white/20 text-white border-white/30"}
            ${opacity == 0
            ? ""
            : "hover:scale-105 transition-all ease-out duration-200 pointer-events-auto hover:shadow-xl hover:-translate-y-1 active:scale-95 active:translate-y-0 "}
            
        `}
        style={{
          fontFamily: '"Nunito Sans", sans-serif',
          margin: "0.5em 0.5em 0.2em 0",
        }}
      >
        <div className={`flex items-center justify-center w-full h-full  ${opacity == 0
          ? "opacity-25"
          : ""}`} >
          {imgSrc && (
            <img
              src={imgSrc}
              loading="eager"
              decoding="async"
              alt={alt}
              className="w-full h-full object-cover rounded-2xl"
            />
          )}
          {text && !imgSrc && (
            <span className="text-xs font-semibold leading-tight text-center">
              {text}
            </span>
          )}
        </div>
        {subtitle && (
          <div className="text-xs mt-1 text-center text-white max-w-20 mx-auto opacity-100 leading-none ">
            {subtitle}
          </div>
        )}

      </a>


    </div>
  );
};
export default LinkButton;
