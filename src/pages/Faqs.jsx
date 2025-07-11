// pages/Faqs.jsx
import { useContext, useEffect, useRef, useState } from "react";
import { Plus, Minus, ChevronDown } from "lucide-react";
import Block from "../components/ui/Block";
import { Canvas } from '@react-three/fiber';
import GradientSkybox from "../components/experience/SceneColor";
import { AnimationContext } from "../components/experience/AnimationContext";
import { useNavigate } from "react-router-dom";



const faqs = [
  {
    question: "Do you only make hybrid casual mobile games?",
    answer:
      "Hybrid casual is our core specialty—where we deliver the most value in terms of creativity, speed, and performance. We focus on creating engaging experiences that blend the best of casual and mid-core gaming elements.",
  },
  {
    question: "How fast can you deliver a playable prototype?",
    answer:
      "We typically deliver polished, playable prototypes within 2 to 4 weeks, depending on complexity. Our agile pipeline is designed for speed without compromising visual or gameplay quality.",
  },
  {
    question: "What's the process for getting started?",
    answer:
      "It's simple. Just reach out with your idea or brief. We'll schedule a quick call to align on scope, goals, and timelines—then we move straight into ideation and production. No red tape, just results.",
  },
  {
    question: "Can you integrate seamlessly with our internal dev team and tools?",
    answer:
      "Absolutely. We're experienced in co‑development and can plug into your workflow smoothly—whether it's through version control, project management tools, or real‑time communication. Think of us as an extension of your team.",
  },
];

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState(null);
    let navigate = useNavigate();

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };
   const {
      progress, setProgress,
      fadeOut, setFadeOut,
      setIsLoading,
    } = useContext(AnimationContext);
  
    useEffect(() => {
      setProgress(0);
       setFadeOut(false);
      setIsLoading(false);
    }, []);

  return (
    <>
      <div className="h-screen w-full fixed top-0 z-10 pointer-events-none">
        <Canvas
          scale={0.5}
          camera={{ position: [0, 0, 1] }}
          style={{ background: 'transparent' }}
        >
          <GradientSkybox />

        </Canvas>
      </div>
      <Block
        title="FAQ"
        subtitle="Frequently Asked Questions"
        paragraphs={[]}
        links={[]}
        buttons={[]}
      >
        <div className="space-y-6 pt-4">
          {faqs.map((item, i) => (
            <div
              key={i}
              className={`
                group relative overflow-hidden rounded-[40px]
                bg-gradient-to-r from-white/5 via-cyan-700/5 to-blue-700/5
                border border-teal-900/5
                backdrop-blur-xl
                transition-all duration-500 ease-out
                hover:border-teal-800/10 hover:shadow-xl hover:shadow-teal-700/5
                ${openIndex === i ? 'border-teal-700/20 shadow-lg shadow-teal-700/5' : ''}
              `}
            >
              {/* Effet de brillance au survol */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              <button
                onClick={() => toggle(i)}
                className="w-full flex justify-between items-center py-3 px-3 text-left group/button bg-[#00000012]"
              >
                <span className="font-semibold text-lg text-white group-hover/button:text-teal-300 transition-colors duration-300 pr-4">
                  {item.question}
                </span>

                {/* Icône avec animation */}
                <div className="flex-shrink-0 relative ">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    bg-gradient-to-r from-emerald-600 to-cyan-200
                    transition-all duration-300 ease-out
                    group-hover/button:scale-110 group-hover/button:shadow-lg group-hover/button:shadow-teal-500/30
                    ${openIndex === i ? 'rotate-180 scale-110' : ''}
                  `}>
                    {openIndex === i ? (
                      <Minus className="w-4 h-4 text-white" />
                    ) : (
                      <Plus className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>
              </button>

              {/* Contenu avec animation fluide */}
              <div
                className={`
                  overflow-hidden transition-all duration-500 ease-out 
                  ${openIndex === i
                    ? 'max-h-96 opacity-100'
                    : 'max-h-0 opacity-0'
                  }
                `}
              >
                <div className="px-6 pb-6">
                  <div className="border-t border-teal-500/20 pt-4">
                    <p className={`
                      text-white leading-relaxed text-base
                      transition-all duration-500 delay-100
                      ${openIndex === i
                        ? 'transform translate-y-0 opacity-100'
                        : 'transform translate-y-2 opacity-0'
                      }
                    `}>
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section d'appel à l'action */}
        <div className="pt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-800/5 to-cyan-700/5 backdrop-blur-xl rounded-2xl border border-teal-900/5 p-8 bg-[#00000012]">
            <h3 className="text-2xl font-bold text-white mb-4">
              Do you have any other questions?
            </h3>
            <p className="text-white mb-6">
              Feel free to contact us to discuss your project.
            </p>
            <button
            onClick={()=>{navigate("/");setTimeout(() => {
                        const el = document.getElementById("section6");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }, 200)}}
              className="no-underline group  px-4 py-2 font-[Nunito_Sans,sans-serif] bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 border-[1px] border-[rgba(255,255,255,0.1)] rounded-xl p-[0.4rem_1rem] whitespace-nowrap shadow-[rgba(0,0,0,0.03)_0px_7px_0.5rem,_rgba(0,0,0,0.05)_0px_0px_1.3rem_inset] text-white mr-[-12px]"
            >
              <span className="flex items-center gap-2">
                Contact us
                <ChevronDown className="w-4 h-4 -rotate-90 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>
      </Block>
    </>
  );
}