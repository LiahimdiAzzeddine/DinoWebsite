import React from "react";

const NeedleButton = ({ href = "#", children = "No text" }) => {
  return (
    <a
      href={href}
      className="
        inline-flex items-center gap-2 
        px-4 py-2 
        font-bold text-teal-800 text-base 
        rounded-xl 
        border-2 border-teal-300 
        bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-200
        shadow-[0_3px_10px_rgba(45,55,72,0.3)] 
        transition-all 
        duration-200 
        ease-out 
        no-underline 
        hover:from-emerald-50 hover:via-teal-50 hover:to-cyan-100
        hover:border-teal-400
        hover:shadow-[0_5px_15px_rgba(45,55,72,0.4)]
        hover:-translate-y-[2px]
        hover:scale-105
        m-2
        pointer-events-auto
        relative
        overflow-hidden
        font-medium
        tracking-wide
        transform
      "
      style={{
        fontFamily: '"Nunito Sans", sans-serif',
      }}
    >
      {/* Texture de carton ondulé */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(34, 139, 34, 0.1) 2px,
              rgba(34, 139, 34, 0.1) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(34, 139, 34, 0.05) 2px,
              rgba(34, 139, 34, 0.05) 4px
            )
          `
        }}
      />
      
      {/* Lignes de pliage du carton */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-0.5 h-full bg-teal-400 opacity-40"></div>
        <div className="absolute top-0 right-1/3 w-0.5 h-full bg-teal-400 opacity-40"></div>
        <div className="absolute left-0 top-1/2 w-full h-0.5 bg-teal-400 opacity-40 transform -translate-y-0.5"></div>
      </div>
      
      {/* Contenu du bouton */}
      <span className="relative z-10">
        {children}
      </span>
      
      {/* Ombre portée du carton */}
      <div className="absolute -bottom-1 -right-1 w-full h-full bg-teal-400 opacity-40 -z-10 rounded-xl"></div>
      
      {/* Effet de tampon au hover */}
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-teal-600 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-60"></div>
    </a>
  );
};

export default NeedleButton;