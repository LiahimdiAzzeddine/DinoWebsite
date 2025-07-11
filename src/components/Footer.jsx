import React from "react";
import dino from "/src/assets/logos/dinoBlack2.png";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  let navigate = useNavigate();
  return (
    <nav className="flex justify-center relative w-full">
      <div className="flex justify-around w-full py-12 relative z-[100] bg-gradient-to-br bg-white/70 backdrop-blur-[30px] shadow-[0_2px_15px_rgba(2,2,43,0.2)]   border-t border-gray-100">
        <div style={{ display: "block", maxWidth: "1400px", width: "100%" }}>
          <div className="flex sm:flex-row flex-col justify-between gap-8 px-8">
            {/* Logo Section */}
            <div className="flex flex-col space-y-4 min-w-[280px]">
              <div className="flex items-center">
                <a
                  aria-current="page"
                  onClick={() => {
                    navigate("/");
                    setTimeout(() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }, 100);
                  }}
                  className="group transition-transform hover:scale-105 duration-300"
                >
                  <img
                    alt="Dinomite logo"
                    src={dino}
                    width="107" height="140"
                    loading="eager"
                    decoding="async"
                    className="w-[107px] h-[140px] max-h-[3em] mt-[2px] mb-[2px] align-middle"
                  />
                </a>
              </div>
              <div className="max-w-[260px]">
                <p className="text-gray-600 text-sm leading-relaxed">
                  Powerful development tools to accelerate your workflow and bring your ideas to life.
                </p>
              </div>
            </div>

            {/* Resources */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-gray-900 font-semibold text-base">Pages</h4>
              <div className="flex flex-col space-y-3">
                <a
                  href="/faqs"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium"
                >
                  FAQ
                </a>
                <a
                  onClick={() => {
                    navigate("/"); // Navigue d'abord à la page d'accueil
                    setTimeout(() => {
                      const el = document.getElementById("section6");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }, 200); // Petit délai pour laisser la page charger
                  }}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium"
                >
                  contact us
                </a>
                <a
                  href="/blogs"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium"
                >
                  Blogs
                </a>
                <a
                  href="/career"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium"
                >
                  career
                </a>
                <a
                  href="https://calendar.app.google/EfrYWkBJmL9PdhzP6"
                  target="_blank"
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium"
                >
                  Book a Call
                </a>
              </div>
            </div>

            {/* Community */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-gray-900 font-semibold text-base">Community</h4>
              <div className="flex flex-col space-y-3">
                {[
                  { name: "X", href: "https://x.com/dinomitestudios" },
                  { name: "Instagram", href: "https://www.instagram.com/dinomitestudio/" },
                  { name: "LinkedIn", href: "https://www.linkedin.com/company/dinomite-studio" },
                ].map(({ name, href }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium group flex items-center"
                  >
                    <span className={["Discord", "Twitter/X", "YouTube", "Instagram", "LinkedIn", "Bluesky", "Reddit", "TikTok"].includes(name) ? "notranslate" : ""}>
                      {name}
                    </span>
                    <svg className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                ))}

              </div>
            </div>

            {/* Company */}
            <div className="flex flex-col space-y-4">
              <h4 className="text-gray-900 font-semibold text-base">Company</h4>
              <div className="flex flex-col space-y-3">
                {["contact@dinomite.org"].map((item) => (
                  <a
                    key={item}
                    href={`mailto:${item}`} // ✅ lien mailto
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium group flex items-center"
                  >
                    {item}
                    {item.includes("@") && (
                      <svg
                        className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    )}
                  </a>
                ))}

                <a
                  key={"About"}
                  onClick={() => {
                    navigate("/"); // Navigue d'abord à la page d'accueil
                    setTimeout(() => {
                      const el = document.getElementById("section2");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }, 100); // Petit délai pour laisser la page charger
                  }}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium group flex items-center"
                >
                  About

                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex flex-col space-y-4 min-w-[300px]">
              <h4 className="text-gray-900 font-semibold text-base">Location</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <svg className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="text-gray-900 font-medium text-sm">Tanger, Morocco</div>
                    <div className="text-gray-500 text-xs mt-1">Technopark tanger office 215</div>
                  </div>
                </div>
              </div>

              {/* Enhanced Map */}
              <div className="relative group">
                <div className="w-full h-40 rounded-xl overflow-hidden shadow-lg border border-gray-200 transition-transform duration-300 ">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d202.31114890989693!2d-5.803138385030007!3d35.775907362066675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0c7f580f56224f%3A0x10633cdbe9d95d5b!2sTechnopark!5e0!3m2!1sfr!2sma!4v1750703145961!5m2!1sfr!2sma"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Dinomite Tools Location"
                    className="brightness-95 group-hover:brightness-100 transition-all duration-300"
                  ></iframe>
                </div>
                <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center pt-8 mt-8 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-center">
              <span className="text-gray-500 text-sm">
                © 2025 <span className="notranslate font-medium text-gray-700">Dinomite</span>
              </span>
              {/* <div className="flex items-center space-x-1 text-gray-400">
                <span className="text-xs">Made with</span>
                <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                <span className="text-xs">in Tanger</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}