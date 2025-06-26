import dino from "/src/assets/logos/dinoBlack2.png";
import React, { useState } from "react";
import NavMobile from "./NavMobile";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === "/faqs";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="w-auto h-[54px] rounded-2xl fixed top-5 z-[1100] bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 shadow-[0px_2px_15px_rgba(2,2,43,0.2)] ease-in-out">
        <div id="header-hover-zone" />
        <div className="relative mx-auto flex h-full max-w-[1200px] flex-row items-center px-[1em] text-teal-900">
          <div className="flex items-center text-[1.35em]">
            <a
              aria-current="page"
              onClick={() => {
                navigate("/");
              }}
              className="rounded-[1em] no-underline text-inherit font-[Nunito_Sans,sans-serif]"
            >
              <img
                alt="needle logo"
                src={dino}
                  loading="eager"
  decoding="async"
                 width="32.5" height="auto"
                className="h-[32.5px] mb-[2px] mt-[2px] max-h-[1.5em] align-middle"
              />
            </a>
          </div>
          <div className="spacer" />
          <div className="main-menu pl-[16px]">
            <div className="md:flex">
              <ul className="hidden md:flex m-0 p-0 list-none items-center">
                <li className="select-none p-2 md:p-[10px] md:inline-block group relative">
                  <button
                    aria-label="contact us"
                    className="border-none cursor-pointer pointer-events-auto bg-none rounded-[1em] p-0 whitespace-nowrap text-teal-900 hover:text-teal-500 outline-offset-[4px] relative shadow-none font-bold"
                    onClick={() => {
                      navigate("/"); // Navigue d'abord à la page d'accueil
                      setTimeout(() => {
                        const el = document.getElementById("section2");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }, 100); // Petit délai pour laisser la page charger
                    }}
                  >
                    contact us
                  </button>
                </li>
                <li className="select-none p-2 md:p-[10px] md:inline-block group relative">
                  <button
                    onClick={() => {
                      navigate("/"); // Navigue d'abord à la page d'accueil
                      setTimeout(() => {
                        const el = document.getElementById("section6");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }, 100); // Petit délai pour laisser la page charger
                    }}
                    aria-label="about us"
                    className="border-none cursor-pointer pointer-events-auto bg-none rounded-[1em] p-0 whitespace-nowrap text-teal-900 hover:text-teal-500 outline-offset-[4px] relative shadow-none font-bold"
                  >
                    about us
                  </button>
                </li>
                <li className="select-none p-2 md:p-[10px] md:inline-block group relative">
                  <Link
                    to={"/blogs"}
                    aria-label="Blogs"
                    className={`border-none cursor-pointer pointer-events-auto bg-none rounded-[1em] p-0 whitespace-nowrap outline-offset-[4px] relative shadow-none font-bold ${
                      location.pathname === "/blogs"
                        ? "text-teal-500"
                        : "text-teal-900 hover:text-teal-500"
                    }`}
                  >
                    Blogs
                  </Link>

                  {/* <div className="hidden md:group-hover:block transition-opacity duration-100 ease-in-out md:absolute md:z-[10] md:overflow-hidden md:p-5 md:transition-opacity md:duration-100 md:ease-in-out md:mt-[2px] md:min-w-[25em] md:ml-[-58px] md:text-black md:opacity-0 md:pointer-events-none md:h-auto md:group-hover:opacity-100 md:group-hover:pointer-events-auto">
              <div className="flex gap-[1em] p-[1.5em] rounded-[1.625em] shadow-[0_2px_15px_rgba(2,2,43,0.2)] bg-gradient-to-r from-emerald-100 via-teal-100 to-cyan-100">
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
                              adipisicing elit.
                            </p>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}
                </li>
                <li className="select-none p-2 md:p-[10px] md:inline-block group relative">
                  <Link
                    to="/faqs"
                    aria-label="Blogs"
                    className={`border-none cursor-pointer pointer-events-auto bg-none rounded-[1em] p-0 whitespace-nowrap outline-offset-[4px] relative shadow-none font-bold ${
                      isActive
                        ? "text-teal-500"
                        : "text-teal-900 hover:text-teal-500"
                    }`}
                  >
                    FAQs
                  </Link>
                </li>
                <li className="select-none p-2 md:p-[10px] md:inline-block group relative">
                  <Link
                    to="/career"
                    aria-label="career"
                    className="hover:bg-emerald-100 no-underline  font-bold  nunito border border-teal-200 rounded-xl px-4 py-[0.4rem] whitespace-nowrap shadow-[rgba(0,0,0,0.03)_0px_7px_0.5rem,_rgba(0,0,0,0.05)_0px_0px_1.3rem_inset] mr-4 bg-white text-teal-800 cursor-pointer list-none text-left"
                  >
                    career
                  </Link>
                  <a
                    aria-label="Log in"
                    href="https://calendar.app.google/3katng9rENsYB1mg8"
                    target="_blank"
                    className="no-underline font-bold  nunito bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 border-[1px] border-[rgba(255,255,255,0.1)] rounded-xl p-[0.4rem_1rem] whitespace-nowrap shadow-[rgba(0,0,0,0.03)_0px_7px_0.5rem,_rgba(0,0,0,0.05)_0px_0px_1.3rem_inset] text-white mr-[-12px]"
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

              {isMenuOpen && <NavMobile />}
            </div>

            <button
              onClick={toggleMenu}
              id="mobile-menu"
              title="Show menu"
              className="bg-[rgb(255,255,255)] mobile-menu show-on-mobile -mr-[20px] mt-[1.5px] bg-transparent border-0 appearance-none border-none rounded-[0.3em] py-[0.4em] sm:px-[0.4em] px-[0.6em] text-[rgba(0,0,0,0.9)] cursor-pointer pointer-events-auto font-[Nunito_Sans,sans-serif] md:hidden"
            >
              {isMenuOpen ? (
                <svg
                  className="ham hamRotate ham1 bg-transparent"
                  width="80"
                  viewBox="0 0 100 100"
                  style={{
                    height: "40px",
                    width: "40px",
                    transition: "transform 0.4s",
                    cursor: "pointer",
                    WebkitTapHighlightColor: "transparent",
                    userSelect: "none",
                    transform: "rotate(45deg)",
                  }}
                >
                  <path
                    className="line top"
                    d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40"
                    style={{
                      transition:
                        "stroke-dasharray 0.4s, stroke-dashoffset 0.4s",
                      fill: "none",
                      stroke: "rgb(0, 0, 0)",
                      strokeWidth: 5.5,
                      strokeLinecap: "round",
                      strokeDasharray: "40, 139",
                      strokeDashoffset: "-98px",
                    }}
                  />
                  <path
                    className="line middle"
                    d="m 30,50 h 40"
                    style={{
                      transition:
                        "stroke-dasharray 0.4s, stroke-dashoffset 0.4s",
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
                      transition:
                        "stroke-dasharray 0.4s, stroke-dashoffset 0.4s",
                      fill: "none",
                      stroke: "rgb(0, 0, 0)",
                      strokeWidth: 5.5,
                      strokeLinecap: "round",
                      strokeDasharray: "40, 180",
                      strokeDashoffset: "-138px",
                    }}
                  />
                </svg>
              ) : (
                <svg
                  className="ham ham1"
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
                    d="m 30,33 h 40"
                    style={{
                      transition:
                        "stroke-dasharray 0.4s, stroke-dashoffset 0.4s",
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
                      transition:
                        "stroke-dasharray 0.4s, stroke-dashoffset 0.4s",
                      fill: "none",
                      stroke: "rgb(0, 0, 0)",
                      strokeWidth: 5.5,
                      strokeLinecap: "round",
                    }}
                  />
                  <path
                    className="line bottom"
                    d="m 30,67 h 40"
                    style={{
                      transition:
                        "stroke-dasharray 0.4s, stroke-dashoffset 0.4s",
                      fill: "none",
                      stroke: "rgb(0, 0, 0)",
                      strokeWidth: 5.5,
                      strokeLinecap: "round",
                    }}
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
