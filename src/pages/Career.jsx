// pages/Career.jsx
import { useContext, useEffect, useRef, useState } from "react";
import { Plus, Minus, ChevronDown, MapPin, Clock, Users, Gamepad2, Code, Palette } from "lucide-react";
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
    title: "Senior Unity Developer",
    department: "Game Development",
    location: "Remote / San Francisco",
    type: "Full-time",
    experience: "4-6 years",
    description: "Lead the development of innovative mobile and PC games using Unity engine, creating immersive gameplay experiences that captivate millions of players worldwide.",
    requirements: [
      "Expert proficiency in Unity 3D and C# programming",
      "Strong understanding of game physics, AI, and optimization",
      "Experience with mobile game development and platform-specific features",
      "Knowledge of multiplayer networking and backend integration"
    ],
    responsibilities: [
      "Design and implement core gameplay systems and mechanics",
      "Optimize game performance across multiple platforms",
      "Collaborate with artists and designers to bring creative visions to life",
      "Mentor junior developers and establish coding standards"
    ]
  },
  {
    id: 2,
    title: "3D Game Artist",
    department: "Art & Design",
    location: "Hybrid / Los Angeles",
    type: "Full-time",
    experience: "3-5 years",
    description: "Create stunning 3D environments, characters, and props that define the visual identity of our games and push the boundaries of artistic excellence.",
    requirements: [
      "Proficiency in Maya, Blender, or 3ds Max",
      "Strong understanding of PBR texturing and Substance Suite",
      "Experience with Unity's rendering pipeline and optimization",
      "Excellent artistic skills in modeling, texturing, and lighting"
    ],
    responsibilities: [
      "Create high-quality 3D assets for games and marketing materials",
      "Develop and maintain art style guides and technical documentation",
      "Collaborate with technical artists to ensure optimal asset pipeline",
      "Participate in art reviews and provide creative feedback"
    ]
  },
];

const benefits = [
  "Competitive salary with performance bonuses and equity options",
  "Comprehensive health, dental, and vision insurance",
  "Flexible remote work with modern gaming setups provided",
  "Annual learning budget for conferences, courses, and certifications",
  "Regular team game jams and creative innovation days",
  "Latest gaming hardware and development tools",
  "Unlimited PTO with mandatory minimum vacation policy",
  "On-site gaming lounge and recreational facilities"
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
    // Handle job application logic here
    console.log(`Applying for job ID: ${jobId}`);
    // You could redirect to an application form or open a modal
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
                      Why Join Our Gaming Studio?
                    </h3>
                    <p className="text-white/90 mb-8 text-lg leading-relaxed">
                      We're more than just a game development company - we're a creative community 
                      where innovation thrives, ideas are celebrated, and every team member plays 
                      a crucial role in crafting unforgettable gaming experiences.
                    </p>
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
                          <Gamepad2 className="h-8 w-8 text-emerald-400" />
                        </div>
                        <h4 className="font-bold text-white mb-3 text-lg">Player First</h4>
                        <p className="text-white/80 leading-relaxed">
                          Every decision we make is guided by creating the best possible experience for our players.
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
                          <Code className="h-8 w-8 text-teal-400" />
                        </div>
                        <h4 className="font-bold text-white mb-3 text-lg">Technical Excellence</h4>
                        <p className="text-white/80 leading-relaxed">
                          We push the boundaries of what's possible with cutting-edge technology and innovative solutions.
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
                          <Palette className="h-8 w-8 text-cyan-400" />
                        </div>
                        <h4 className="font-bold text-white mb-3 text-lg">Creative Vision</h4>
                        <p className="text-white/80 leading-relaxed">
                          We believe in the power of creativity to transform ideas into extraordinary gaming experiences.
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
                      Our Game Development Philosophy
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-bold text-white mb-3 text-lg">Unity-Powered Innovation</h4>
                        <p className="text-white/80 leading-relaxed mb-6">
                          We leverage Unity's powerful engine to create cross-platform experiences 
                          that reach players on mobile, PC, and console platforms.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-3 text-lg">Data-Driven Design</h4>
                        <p className="text-white/80 leading-relaxed mb-6">
                          Our games are built on solid analytics foundations, ensuring we create 
                          experiences that truly resonate with our audience.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-3 text-lg">Agile Development</h4>
                        <p className="text-white/80 leading-relaxed mb-6">
                          We embrace iterative development cycles that allow for rapid prototyping 
                          and continuous improvement of our games.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-3 text-lg">Live Operations</h4>
                        <p className="text-white/80 leading-relaxed mb-6">
                          Our commitment extends beyond launch, with ongoing content updates 
                          and community engagement that keeps games fresh and exciting.
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