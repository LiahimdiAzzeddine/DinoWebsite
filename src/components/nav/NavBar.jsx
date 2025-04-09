import dino from "../../assets/logos/dinoBlack.png";
import React, { useState } from "react";
import NavMobile from "./NavMobile";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className=" w-auto h-[54px] rounded-2xl fixed top-5 z-[1000]  bg-[linear-gradient(90deg,#fff,hsla(0,0%,100%,.95))] shadow-[0px_2px_15px_rgba(2,2,43,0.2)] ease-in-out">
        <div id="header-hover-zone" />
        <div className="relative mx-auto flex h-full max-w-[1200px] flex-row items-center px-[1.3em] text-[#020220]">
          <div className="flex items-center text-[1.35em]">
            <a
              aria-current="page"
              href="#"
              className="rounded-[1em] no-underline text-inherit font-[Nunito_Sans,sans-serif]"
            >
              <img
                alt="needle logo"
                src={dino}
                className="h-[32.5px] mb-[2px] mt-[2px] max-h-[1.5em] align-middle"
              />
            </a>
          </div>
          <div className="spacer" />
          <div className="main-menu pl-[16px]">
            <div className="md:flex">
              {/* Desktop menu */}
              <ul className="hidden md:flex m-0 p-0 list-none items-center">
                <li className="select-none p-2 md:p-[10px] md:inline-block group relative">
                  <button
                    aria-label="contact us"
                    className="border-none cursor-pointer pointer-events-auto bg-none rounded-[1em] p-0 whitespace-nowrap text-black hover:text-[#48beaa] outline-offset-[4px] relative shadow-none"
                  >
                    contact us
                  </button>
                </li>
                <li className="select-none p-2 md:p-[10px] md:inline-block group relative">
                  <button
                    aria-label="about us"
                    className="border-none cursor-pointer pointer-events-auto bg-none rounded-[1em] p-0 whitespace-nowrap text-black hover:text-[#48beaa] outline-offset-[4px] relative shadow-none"
                  >
                    about us
                  </button>
                </li>
                {/* our Games menu item */}
                <li className="select-none p-2 md:p-[10px] md:inline-block group relative">
                  <button
                    aria-label="Products"
                    className="border-none cursor-pointer pointer-events-auto bg-none rounded-[1em] p-0 whitespace-nowrap text-black hover:text-[#48beaa] outline-offset-[4px] relative shadow-none"
                  >
                    our Games
                  </button>
                  <div className="hidden md:group-hover:block transition-opacity duration-100 ease-in-out md:absolute md:z-[10] md:overflow-hidden md:p-5 md:transition-opacity md:duration-100 md:ease-in-out md:mt-[2px] md:min-w-[25em] md:ml-[-58px] md:text-black md:opacity-0 md:pointer-events-none md:h-auto md:group-hover:opacity-100 md:group-hover:pointer-events-auto">
                    <div className="flex gap-[1em] p-[1.5em] rounded-[1.625em] shadow-[0_2px_15px_rgba(2,2,43,0.2)] bg-[linear-gradient(90deg,#fff,hsla(0,0%,100%,.95))]">
                      <div className="m-0 inline-block leading-[1.5em] list-none pl-0 select-none">
                        <ul className="list-none ml-0 pl-0">
                          <li className="text-[1em] font-normal leading-[1.2em] mb-[4px]">
                            <a
                              href="#"
                              className="no-underline text-inherit font-[Nunito_Sans,sans-serif] rounded-[12px] gap-[4px] p-[10px] transition-all duration-[100ms] linear flex flex-col tracking-[0px] relative transform scale-100"
                            >
                              <div className="gap-[8px] items-center flex flex-row">
                                <div>
                                  <p className="m-0">
                                    <strong>
                                      <span className="notranslate">hello</span>
                                    </strong>
                                  </p>
                                  <p className="m-0 text-[rgb(127,126,144)] text-[0.9em] font-normal ml-0 mt-0 max-w-[360px]">
                                    Lorem ipsum, dolor sit amet consectetur
                                    adipisicing elit. Praesentium, eligendi
                                    eaque. Vel
                                    <span className="notranslate"> fgdfdg</span>
                                    ,
                                  </p>
                                </div>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="select-none p-2 md:p-[10px] md:inline-block group relative">
                  <a
                    aria-label="contact us"
                    href="#"
                    className="border-none cursor-pointer pointer-events-auto bg-none rounded-[1em] p-0 whitespace-nowrap text-black hover:text-[#48beaa] outline-offset-[4px] relative shadow-none"
                  >
                    contact us
                  </a>
                </li>
                <li className="select-none p-2 md:p-[10px] md:inline-block group relative">
                  <a
                    aria-label="about us"
                    href="#"
                    className="hover:bg-[#eee] no-underline font-[Nunito_Sans,sans-serif] border border-[rgba(224,224,224,1)] rounded-full  px-4 py-[0.4rem] whitespace-nowrap shadow-[rgba(0,0,0,0.03)_0px_7px_0.5rem,_rgba(0,0,0,0.05)_0px_0px_1.3rem_inset] mr-4 bg-white text-[rgb(20,20,20)] cursor-pointer list-none text-left"
                  >
                    about us
                  </a>
                  <a
                    aria-label="Log in"
                    href="#"
                    target="_blank"
                    className="no-underline font-[Nunito_Sans,sans-serif] bg-gradient-to-r from-[#3fbdA8] to-[#3fb127] hover:from-[#3eb1277e] hover:to-[#3fbda885] border-[1px] border-[rgba(255,255,255,0.1)] rounded-2xl p-[0.4rem_1rem] whitespace-nowrap shadow-[rgba(0,0,0,0.03)_0px_7px_0.5rem,_rgba(0,0,0,0.05)_0px_0px_1.3rem_inset] text-white mr-[-20px]"
                  >
                    Book a Call
                  </a>
                </li>
                <div
                  id="header-footer"
                  className="m-[50px] justify-around hidden"
                >
                  <img height={128} width={128} src={dino} />
                </div>
              </ul>

              {/* Mobile menu dans un card */}
              {isMenuOpen && <NavMobile />}
            </div>
            <button
              onClick={toggleMenu}
              id="mobile-menu"
              title="Show menu"
              className="bg-[rgb(255,255,255)] border-none rounded-[0.3em] p-[0.4em] text-[rgba(0,0,0,0.9)] cursor-pointer pointer-events-auto font-[Nunito_Sans,sans-serif] md:hidden"
            >
              <svg
                className="ham hamRotate ham1"
                width="80"
                viewBox="0 0 100 100"
                style={{
                  height: "36px",
                  width: "36px",
                  transition: "transform 0.4s",
                  cursor: "pointer",
                  WebkitTapHighlightColor: "transparent",
                  userSelect: "none",
                }}
              >
                <path
                  className="line top"
                  d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40"
                  style={{
                    transition: "stroke-dasharray 0.4s, stroke-dashoffset 0.4s",
                    fill: "none",
                    stroke: "rgb(0, 0, 0)",
                    strokeWidth: 5.5,
                    strokeLinecap: "round",
                    strokeDasharray: "40, 139",
                  }}
                />
                <path
                  className="line middle"
                  d="m 30,50 h 40"
                  style={{
                    transition: "stroke-dasharray 0.4s, stroke-dashoffset 0.4s",
                    fill: "none",
                    stroke: "rgb(0, 0, 0)",
                    strokeWidth: 5.5,
                    strokeLinecap: "round",
                  }}
                />
                <path
                  className="line bottom"
                  d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40"
                  style={{
                    transition: "stroke-dasharray 0.4s, stroke-dashoffset 0.4s",
                    fill: "none",
                    stroke: "rgb(0, 0, 0)",
                    strokeWidth: 5.5,
                    strokeLinecap: "round",
                    strokeDasharray: "40, 180",
                  }}
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
