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
  {
    id: 3,
    title: "Game Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    experience: "2-4 years",
    description: "Shape the future of gaming by designing engaging mechanics, balanced progression systems, and memorable player experiences that keep audiences coming back.",
    requirements: [
      "Strong understanding of game design principles and player psychology",
      "Experience with Unity editor tools and scripting",
      "Proficiency in data analysis and A/B testing methodologies",
      "Excellent communication and documentation skills"
    ],
    responsibilities: [
      "Design and balance game mechanics, progression, and monetization",
      "Create detailed game design documents and prototypes",
      "Analyze player data to optimize game experience and retention",
      "Work closely with development team to implement and iterate on features"
    ]
  },
  {
    id: 4,
    title: "Technical Artist",
    department: "Art & Technology",
    location: "Montreal",
    type: "Full-time",
    experience: "4-7 years",
    description: "Bridge the gap between art and technology by creating tools, shaders, and pipelines that empower our creative team to achieve their artistic vision.",
    requirements: [
      "Strong background in both art and programming",
      "Experience with Unity's shader graph and HLSL",
      "Knowledge of DCC tool scripting (Python, MEL, MaxScript)",
      "Understanding of real-time rendering and optimization techniques"
    ],
    responsibilities: [
      "Develop custom shaders and visual effects for games",
      "Create and maintain art production pipelines and tools",
      "Optimize rendering performance and memory usage",
      "Support artists with technical guidance and problem-solving"
    ]
  },
  {
    id: 5,
    title: "Mobile Game Producer",
    department: "Production",
    location: "Remote / Tokyo",
    type: "Full-time",
    experience: "5-8 years",
    description: "Drive the development of successful mobile games from concept to launch, managing cross-functional teams and ensuring projects deliver on time and within budget.",
    requirements: [
      "Proven track record in mobile game production and live operations",
      "Experience with agile development methodologies and project management tools",
      "Strong understanding of mobile game monetization and user acquisition",
      "Excellent leadership and stakeholder management skills"
    ],
    responsibilities: [
      "Lead cross-functional teams through the full game development lifecycle",
      "Manage project scope, timeline, and budget to ensure successful delivery",
      "Coordinate with marketing, QA, and live operations teams",
      "Analyze market trends and competitive landscape to inform product strategy"
    ]
  }
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
          
          <div className="content space-y-4">
            <p>
              We're a passionate team of game developers, artists, and designers creating groundbreaking 
              experiences with Unity. Join us in building the next generation of games that inspire, 
              challenge, and entertain players around the world.
            </p>
            
            <div className="space-y-8 pt-6">
              {/* Tab Navigation */}
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setSelectedTab('positions')}
                  className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                    selectedTab === 'positions'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Open Positions
                </button>
                <button
                  onClick={() => setSelectedTab('benefits')}
                  className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                    selectedTab === 'benefits'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Benefits & Culture
                </button>
              </div>

              {/* Open Positions Tab */}
              {selectedTab === 'positions' && (
                <div className="space-y-4">
                  {jobOpenings.map((job, i) => (
                    <div
                      key={job.id}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
                    >
                      <div
                        className="p-6 cursor-pointer"
                        onClick={() => toggle(i)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {job.title}
                              </h3>
                              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                                {job.department}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {job.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {job.type}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {job.experience}
                              </div>
                            </div>
                            <p className="text-gray-700 text-sm">
                              {job.description}
                            </p>
                          </div>
                          <div className="ml-4 flex-shrink-0">
                            {openIndex === i ? (
                              <Minus className="h-5 w-5 text-gray-500" />
                            ) : (
                              <Plus className="h-5 w-5 text-gray-500" />
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {openIndex === i && (
                        <div className="border-t border-gray-200 bg-gray-50 p-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-3">Requirements</h4>
                              <ul className="space-y-2">
                                {job.requirements.map((req, idx) => (
                                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                    <span className="text-purple-500 mt-1">•</span>
                                    {req}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-3">Responsibilities</h4>
                              <ul className="space-y-2">
                                {job.responsibilities.map((resp, idx) => (
                                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                                    <span className="text-green-500 mt-1">•</span>
                                    {resp}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="mt-6 pt-4 border-t border-gray-200">
                            <button
                              onClick={() => handleApply(job.id)}
                              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium"
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
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Why Join Our Gaming Studio?
                    </h3>
                    <p className="text-gray-700 mb-6">
                      We're more than just a game development company - we're a creative community 
                      where innovation thrives, ideas are celebrated, and every team member plays 
                      a crucial role in crafting unforgettable gaming experiences.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Our Core Values
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <Gamepad2 className="h-6 w-6 text-purple-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Player First</h4>
                        <p className="text-sm text-gray-600">
                          Every decision we make is guided by creating the best possible experience for our players.
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <Code className="h-6 w-6 text-green-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Technical Excellence</h4>
                        <p className="text-sm text-gray-600">
                          We push the boundaries of what's possible with cutting-edge technology and innovative solutions.
                        </p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <Palette className="h-6 w-6 text-blue-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Creative Vision</h4>
                        <p className="text-sm text-gray-600">
                          We believe in the power of creativity to transform ideas into extraordinary gaming experiences.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Our Game Development Philosophy
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Unity-Powered Innovation</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          We leverage Unity's powerful engine to create cross-platform experiences 
                          that reach players on mobile, PC, and console platforms.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Data-Driven Design</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Our games are built on solid analytics foundations, ensuring we create 
                          experiences that truly resonate with our audience.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Agile Development</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          We embrace iterative development cycles that allow for rapid prototyping 
                          and continuous improvement of our games.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Live Operations</h4>
                        <p className="text-sm text-gray-600 mb-4">
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