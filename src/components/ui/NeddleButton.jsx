const NeddleButton = ({ href = "#", children = "No text" }) => {
  return (
    <a
      href={href}
       className="
        inline-flex items-center gap-2 
        px-4 py-2 
        font-bold text-white text-base 
        rounded-[5px]
        sm:rounded-full 
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

export default NeddleButton;