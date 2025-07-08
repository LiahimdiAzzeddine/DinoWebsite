// pages/Career.jsx
import { useContext, useEffect, useRef, useState } from "react";
import { Plus, Minus, ChevronDown, MapPin, Clock, Users, Gamepad2, Code, Palette, Smile, Lightbulb, TrendingUp } from "lucide-react";
import Block from "../components/ui/Block";
import { Canvas } from '@react-three/fiber';
import GradientSkybox from "../components/experience/SceneColor";
import { AnimationContext } from "../components/experience/AnimationContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const jobOpenings = [
  {
    id: 1,
    title: "3D Artist",
    department: "Art & Design",
    location: "Remote / Onsite",
    type: "Full-time or Contract",
    experience: "All levels",
    description: "As a 3D Artist at Dinomite Studio, you'll help build the visual world of our hybrid casual games with eye-catching, stylized assets that run smoothly on mobile devices. From modeling to world-building, your work will directly shape how players experience our games.",
    requirements: [
      "Strong understanding of stylized visuals and hybrid casual game aesthetics",
      "Skilled in 3D software like Blender, Cinema 4D, or equivalent",
      "Comfortable working iteratively and redoing work when necessary",
      "Ability to work as part of a team and communicate ideas visually",
      "Bonus: Experience with Unity, simple animations, or VFX integration"
    ],
    responsibilities: [
      "Model and texture low-to-mid poly stylized assets (props, environments, characters)",
      "Assemble game scenes using modular assets within Unity",
      "Focus on composition, lighting, and player feedback in level design",
      "(Optional) Animate simple character and prop movements (e.g., idle, run cycles)",
      "(Optional) Integrate basic VFX such as particle systems or visual feedback effects",
      "Collaborate with designers and developers to support gameplay through visuals",
      "Contribute to brainstorms on visual themes and artistic direction"
    ]
  },
  {
    id: 2,
    title: "Game Designer (Hybrid Casual Games)",
    department: "Game Design",
    location: "Remote / Onsite",
    type: "Part-time / Internship",
    experience: "Entry-level or experienced",
    description: "Join Dinomite Studio as a Game Designer and be at the heart of developing and shaping new hybrid casual game experiences. You'll work closely with our team to create fun, engaging, and innovative gameplay loops, systems, and prototypes.",
    requirements: [
      "Strong passion for games and understanding of what makes them fun",
      "Creative mindset and initiative to propose and test new ideas",
      "Interest in reverse-engineering game systems and player psychology",
      "Comfortable working in a fast-paced, iterative development environment",
      "A strong sense of ownership and a desire to contribute to a growing studio"
    ],
    responsibilities: [
      "Design core gameplay loops, controls, and progression systems",
      "Create and test simple game prototypes",
      "Collaborate with developers and 3D artists to align on vision and execution",
      "Balance levels for optimal player engagement and retention",
      "Stay updated on mobile game trends and successful game mechanics",
      "Organize internal playtests, collect feedback, and refine ideas",
      "Write clear and actionable game design documents"
    ]
  }
];

const benefits = [
"Flexible part-time roles and internships based on your experience and availability",
"Hands-on experience with real projects, your ideas matter here",
"Creative freedom to test game mechanics, try new visuals, and learn by doing",
"Remote-friendly setup with the option to work on-site in Tangier",
"Learning-focused environment  we encourage self-growth through courses, tutorials, and experimentation",
"Team game jams and creative days to brainstorm wild ideas and test new concepts",
"Direct collaboration with game designers, developers, and artists  no endless hierarchies.",
];

export default function Career() {
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedTab, setSelectedTab] = useState('positions');
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
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

 const handleApply = (jobId) => {
  console.log(`Applying for job ID: ${jobId}`);
  window.open(
    "https://docs.google.com/forms/d/e/1FAIpQLSePkM4vnmAj4Tc97VKGfixyHp4CcVvFvVSdTGLofvU_pweiFQ/viewform",
    "_blank"
  );
};

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
      
      <motion.div
        ref={ref}
        className="block2 relative sm:w-[90vw] sm:max-w-[1200px] mx-auto"
        initial={{ y: 40 }}
        animate={inView ? { y: 0 } : { y: 40 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="wrapper">
          <header>
            <h1>Join Our Game Development Team</h1>
            <p className="category">Shape the Future of Interactive Entertainment</p>
          </header>
          
          <div className="content space-y-6">
            <p>
              We're a passionate team of game developers, artists, and designers creating groundbreaking 
              experiences with Unity. Join us in building the next generation of games that inspire, 
              challenge, and entertain players around the world.
            </p>
            
            <div className="space-y-8 pt-6">
              {/* Tab Navigation with glassmorphism styling */}
              <div className="flex justify-center space-x-2 p-2 rounded-2xl" style={{
                backdropFilter: 'blur(20px) saturate(1.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}>
                <button
                  onClick={() => setSelectedTab('positions')}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedTab === 'positions'
                      ? 'text-white shadow-lg'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                  style={selectedTab === 'positions' ? {
                    background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: 'rgba(0,0,0,0.03) 0px 7px 0.5rem, rgba(0,0,0,0.05) 0px 0px 1.3rem inset'
                  } : {}}
                >
                  Open Positions
                </button>
                <button
                  onClick={() => setSelectedTab('benefits')}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedTab === 'benefits'
                      ? 'text-white shadow-lg'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                  style={selectedTab === 'benefits' ? {
                    background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: 'rgba(0,0,0,0.03) 0px 7px 0.5rem, rgba(0,0,0,0.05) 0px 0px 1.3rem inset'
                  } : {}}
                >
                  Benefits & Culture
                </button>
              </div>

              {/* Open Positions Tab */}
              {selectedTab === 'positions' && (
                <div className="space-y-6">
                  {jobOpenings.map((job, i) => (
                    <div
                      key={job.id}
                      className="rounded-2xl overflow-hidden transition-all duration-300"
                      style={{
                        backdropFilter: 'blur(30px) saturate(1.3)',
                        backgroundColor: 'rgba(255, 255, 255, 0.12)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                      }}
                    >
                      <div
                        className="p-8 cursor-pointer"
                        onClick={() => toggle(i)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-3">
                              <h3 className="text-xl font-bold text-white">
                                {job.title}
                              </h3>
                              <span 
                                className="px-3 py-1 text-xs font-semibold rounded-full"
                                style={{
                                  background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
                                  color: 'white',
                                  border: '1px solid rgba(255, 255, 255, 0.2)'
                                }}
                              >
                                {job.department}
                              </span>
                            </div>
                            <div className="flex items-center gap-6 text-sm text-white/80 mb-4">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                {job.location}
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {job.type}
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                {job.experience}
                              </div>
                            </div>
                            <p className="text-white/90 text-base leading-relaxed">
                              {job.description}
                            </p>
                          </div>
                          <div className="ml-6 flex-shrink-0">
                            <div className="p-2 rounded-full transition-colors duration-200 hover:bg-white/10">
                              {openIndex === i ? (
                                <Minus className="h-6 w-6 text-white" />
                              ) : (
                                <Plus className="h-6 w-6 text-white" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {openIndex === i && (
                        <div 
                          className="border-t p-8"
                          style={{
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)'
                          }}
                        >
                          <div className="grid md:grid-cols-2 gap-8">
                            <div>
                              <h4 className="font-bold text-white mb-4 text-lg">Requirements</h4>
                              <ul className="space-y-3">
                                {job.requirements.map((req, idx) => (
                                  <li key={idx} className="text-white/90 flex items-start gap-3">
                                    <span className="text-emerald-400 mt-1 text-lg">•</span>
                                    <span className="leading-relaxed">{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-bold text-white mb-4 text-lg">Responsibilities</h4>
                              <ul className="space-y-3">
                                {job.responsibilities.map((resp, idx) => (
                                  <li key={idx} className="text-white/90 flex items-start gap-3">
                                    <span className="text-teal-400 mt-1 text-lg">•</span>
                                    <span className="leading-relaxed">{resp}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.2)' }}>
                            <button
                              onClick={() => handleApply(job.id)}
                              className="px-8 py-3 rounded-xl font-bold text-white transition-all duration-300 hover:from-emerald-400 hover:to-teal-400"
                              style={{
                                background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: 'rgba(0,0,0,0.03) 0px 7px 0.5rem, rgba(0,0,0,0.05) 0px 0px 1.3rem inset'
                              }}
                            >
                              Apply Now
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Benefits & Culture Tab */}
              {selectedTab === 'benefits' && (
                <div className="space-y-8">
                  <div 
                    className="rounded-2xl p-8"
                    style={{
                      background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(20, 184, 166, 0.2) 100%)',
                      backdropFilter: 'blur(30px) saturate(1.3)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-6">
                      Why Join Dinomite Studio?
                    </h3>
                    <p className="text-white/90 mb-8 text-lg leading-relaxed">
                      At Dinomite Studio, we're more than just a game development team, we're a passionate creative community where bold ideas are encouraged, experimentation is part of the process, and every team member contributes meaningfully to crafting fun and impactful games.
                    </p>
                      <p className="text-white/90 mb-8 text-lg leading-relaxed">
Whether you're working on-site at our studio in Tangier or joining us remotely, you'll be part of a culture that values collaboration, curiosity, and rapid creation. We specialize in hybrid casual games and pride ourselves on fast prototyping, smart teamwork, and staying ahead of market trends.
                    </p>
                    <h3 className="text-2xl font-bold text-white mb-6">
                      What You’ll Get
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-4">
                          <div className="w-3 h-3 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-white/90 leading-relaxed">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div 
                    className="rounded-2xl p-8"
                    style={{
                      backdropFilter: 'blur(30px) saturate(1.3)',
                      backgroundColor: 'rgba(255, 255, 255, 0.12)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-8">
                      Our Core Values
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8">
                      <div className="text-center">
                        <div 
                          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                          style={{
                            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(20, 184, 166, 0.2) 100%)',
                            border: '1px solid rgba(16, 185, 129, 0.3)'
                          }}
                        >
                          <Smile className="h-8 w-8 text-emerald-400" />

                        </div>
                        <h4 className="font-bold text-white mb-3 text-lg">Player First</h4>
                        <p className="text-white/80 leading-relaxed">
                          We build for fun every game we design focuses on creating smooth, engaging, and satisfying experiences for players.
                        </p>
                      </div>
                      <div className="text-center">
                        <div 
                          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                          style={{
                            background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)',
                            border: '1px solid rgba(20, 184, 166, 0.3)'
                          }}
                        >
                          <Lightbulb className="h-8 w-8 text-teal-400" />

                        </div>
                        <h4 className="font-bold text-white mb-3 text-lg">Creative Simplicity</h4>
                        <p className="text-white/80 leading-relaxed">
                         We believe the best way to improve is to build. Rapid testing and iteration help us discover what works and what doesn’t  quickly.
                        </p>
                      </div>
                      <div className="text-center">
                        <div 
                          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                          style={{
                            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(14, 165, 233, 0.2) 100%)',
                            border: '1px solid rgba(6, 182, 212, 0.3)'
                          }}
                        >
                        <TrendingUp className="h-8 w-8 text-cyan-400" />

                        </div>
                        <h4 className="font-bold text-white mb-3 text-lg">Shared Growth</h4>
                        <p className="text-white/80 leading-relaxed">
                         We grow as a team. Whether you’re just starting out or have years of experience, your growth helps us all move forward.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className="rounded-2xl p-8"
                    style={{
                      background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)',
                      backdropFilter: 'blur(30px) saturate(1.3)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                    }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-8">
                    How We Work
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-bold text-white mb-3 text-lg">Unity-Centered Workflow</h4>
                        <p className="text-white/80 leading-relaxed mb-6">
                          We build all our games in Unity  focusing on performance, mobile optimization, and modular design that’s easy to test and scale.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-3 text-lg">Agile & Fast</h4>
                        <p className="text-white/80 leading-relaxed mb-6">
                          We don’t sit on ideas. We test quickly, throw away what doesn’t work, and improve what does all in a collaborative, feedback-driven process.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-3 text-lg">Remote & On-Site</h4>
                        <p className="text-white/80 leading-relaxed mb-6">
                         Whether you’re in the office or working remotely, we prioritize clear communication and shared goals to keep everyone aligned and moving forward.
                        </p>
                      </div>
                   
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}