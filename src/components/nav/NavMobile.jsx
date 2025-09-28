import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function NavMobile() {
  let navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === "/faqs";
  return (
    <div className="absolute top-[60px] left-1/2 transform -translate-x-1/2 px-2 z-[999] md:hidden">
      <div
        className="rounded-[1.625em] p-6 shadow-[0_2px_15px_rgba(2,2,43,0.2)] bg-[linear-gradient(90deg,#fff,hsla(0,0%,100%,.95))]"
        style={{ width: "calc(100dvw - 40px)" }}
      >
        <ul className="list-none space-y-4">
          <li>
            <button
              aria-label="contact us"
              className="border-none cursor-pointer pointer-events-auto bg-none rounded-[1em] p-0 whitespace-nowrap text-teal-900 hover:text-teal-500 outline-offset-[4px] relative shadow-none font-bold"
              onClick={() => {
                      navigate("/"); // Navigue d'abord à la page d'accueil
                      setTimeout(() => {
                        const el = document.getElementById("section6");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }, 200); // Petit délai pour laisser la page charger
                    }}
            >
              contact us
            </button>
          </li>
          <li>
            <button
             onClick={() => {
                      navigate("/"); // Navigue d'abord à la page d'accueil
                      setTimeout(() => {
                        const el = document.getElementById("section2");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }, 100); // Petit délai pour laisser la page charger
                    }}
              aria-label="about us"
              className="border-none cursor-pointer pointer-events-auto bg-none rounded-[1em] p-0 whitespace-nowrap text-teal-900 hover:text-teal-500 outline-offset-[4px] relative shadow-none font-bold"
            >
              about us
            </button>
          </li>
          {/* <li>
          <button className="text-black hover:font-bold font-medium">
            our Games
          </button>
          <div className="mt-2">
            <div className="rounded-xl p-4 bg-white shadow-md text-left">
              <p className="font-bold">hello</p>
              <p className="text-sm text-[rgb(127,126,144)]">
                Lorem ipsum, dolor sit amet consectetur...
              </p>
            </div>
          </div>
        </li> */}
          <li>
            <Link
              to="/faqs"
              aria-label="Blogs"
              className={`border-none cursor-pointer pointer-events-auto bg-none rounded-[1em] p-0 whitespace-nowrap outline-offset-[4px] relative shadow-none font-bold ${
                isActive ? "text-teal-500" : "text-teal-900 hover:text-teal-500"
              }`}
            >
              FAQs
            </Link>
           
          </li>
            <li>
   
            <Link
                                to={"/blogs"}
                                aria-label="Blogs"
                                className={`border-none cursor-pointer pointer-events-auto bg-none rounded-[1em] p-0 whitespace-nowrap outline-offset-[4px] relative shadow-none font-bold ${location.pathname === "/blogs"
                                    ? "text-teal-500"
                                    : "text-teal-900 hover:text-teal-500"
                                  }`}
                              >
                                Blogs
                              </Link>
          </li>
          <li className="flex flex-col gap-2">
            <Link
              to="/career"
              className="hover:bg-emerald-100 text-center no-underline  font-bold w-full nunito border border-teal-200 rounded-xl px-4 py-[0.4rem] whitespace-nowrap shadow-[rgba(0,0,0,0.03)_0px_7px_0.5rem,_rgba(0,0,0,0.05)_0px_0px_1.3rem_inset] bg-white text-teal-800 cursor-pointer list-none "
            >
             Career
            </Link>
            <a
              href="https://calendar.app.google/EfrYWkBJmL9PdhzP6"
              target="_blank"
              className="no-underline text-center font-bold  nunito bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 border-[1px] border-[rgba(255,255,255,0.1)] rounded-xl p-[0.4rem_1rem] whitespace-nowrap shadow-[rgba(0,0,0,0.03)_0px_7px_0.5rem,_rgba(0,0,0,0.05)_0px_0px_1.3rem_inset] text-white"
            >
              Book a Call
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
