import { useContext, useEffect, useState } from 'react';
import { AnimationContext } from './experience/AnimationContext';
import { useProgress } from '@react-three/drei';
import dino from "/src/assets/logos/dinoBlack2.webp";
import { useLocation } from 'react-router-dom';

const Loader = () => {
  const {
    progress, setProgress,
    fadeOut, setFadeOut,
    isLoading, setIsLoading,
  } = useContext(AnimationContext);
  
  const { progress: gltfProgress, loaded, total } = useProgress();
  const [fakeProgress, setFakeProgress] = useState(0);
  const [display, setDisplay] = useState(false);
  const { pathname } = useLocation();
  
  // Skip 3D loading for non-home pages
  const isHomePage = pathname === "/";
  const effectiveGltfProgress = isHomePage ? gltfProgress : 100;
  const effectiveLoaded = isHomePage ? loaded : 100;
  const effectiveTotal = isHomePage ? total : 100;

  // Artificial progress phase
  useEffect(() => {
    if (fakeProgress < 80) {
      const id = setInterval(() => {
        setFakeProgress(prev => {
          const next = Math.min(prev + Math.random() * 15 + 5, 80);
          if (next > 10) setDisplay(true);
          return next;
        });
      }, 400);
      return () => clearInterval(id);
    }
  }, [fakeProgress,fadeOut]);

  // Progress calculation
  useEffect(() => {
    if (fakeProgress < 20 && effectiveGltfProgress >= 90) {
      setProgress(effectiveGltfProgress);
      setFakeProgress(effectiveGltfProgress);
    } else if (fakeProgress < 80) {
      setProgress(fakeProgress);
    } else {
      const real = 80 + (effectiveGltfProgress / 100) * 20;
      setProgress(Math.min(real, 100));
    }
  }, [fakeProgress, effectiveGltfProgress, setProgress,fadeOut]);

  // Loading completion
  useEffect(() => {
    if (
      effectiveGltfProgress === 100 &&
      effectiveLoaded === effectiveTotal &&
      fakeProgress > 70
    ) {
      setTimeout(() => {
        setIsLoading(true);
        setFadeOut(true);
      }, 800);
    }
  }, [effectiveGltfProgress, effectiveLoaded, effectiveTotal, fakeProgress,fadeOut]);

  if (fadeOut) return null;

  const getLoadingText = () => {
    if (progress < 20) return 'Unpacking...';
    if (progress < 45) return 'Assembling...';
    if (progress < 70) return 'Folding edges...';
    if (progress < 90) return 'Final touches...';
    if (progress < 100) return 'Sealing...';
    return 'Ready!';
  };

  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center z-[5000] transition-opacity duration-800 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      {/* Cardboard texture overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(16, 185, 129, 0.1) 2px,
              rgba(16, 185, 129, 0.1) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(20, 184, 166, 0.08) 2px,
              rgba(20, 184, 166, 0.08) 4px
            )
          `
        }}
      />

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-emerald-300/30 opacity-60 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite alternate`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Container */}
        <div className="relative mb-8">
          <div className={`w-32 h-28 md:w-40 md:h-36 relative transition-all duration-1000 ${progress > 0 ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
            {/* Main container with glassmorphism */}
            <div 
              className="w-full h-full relative overflow-hidden rounded-2xl"
              style={{
                backdropFilter: 'blur(20px) saturate(1.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}
            >
              {/* Logo */}
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <img
                  src={dino}
                  alt="Dinomite Logo"
                  className="w-full h-full object-contain opacity-90 transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                {/* Fallback */}
                <div className="hidden w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-lg"></div>
                </div>
              </div>

              {/* Animated border glow */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-50 transition-opacity duration-1000"
                style={{
                  background: `linear-gradient(45deg, transparent 30%, rgba(16, 185, 129, 0.3) 50%, transparent 70%)`,
                  animation: progress > 50 ? 'shimmer 2s ease-in-out infinite' : 'none'
                }}
              />
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className={`w-80 md:w-96 transition-all duration-1000 delay-300 ${(progress > 10 && display) ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          {/* Progress Bar Container */}
          <div className="relative mb-6">
            {/* Progress track with glassmorphism */}
            <div 
              className="w-full h-3 relative overflow-hidden rounded-full"
              style={{
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
              }}
            >
              {/* Progress fill */}
              <div
                className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 transition-all duration-500 ease-out relative rounded-full"
                style={{ width: `${progress}%` }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"></div>
                
                {/* Progress indicator dot */}
                {progress > 5 && (
                  <div className="absolute right-0 top-1/2 w-4 h-4 bg-white rounded-full transform translate-x-1/2 -translate-y-1/2 shadow-lg border-2 border-emerald-400">
                    <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Progress Text */}
          <div className="flex justify-between items-center text-sm mb-4">
            <span className="text-emerald-700 font-medium tracking-wide">
              {getLoadingText()}
            </span>
            <span 
              className="font-bold tabular-nums text-white px-3 py-1 rounded-full text-xs"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
              }}
            >
              {Math.round(progress)}%
            </span>
          </div>

          {/* Completion message */}
          {progress > 95 && (
            <div className="text-center animate-fade-in">
              <div 
                className="inline-flex items-center px-6 py-3 rounded-2xl relative"
                style={{
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(20, 184, 166, 0.2) 100%)',
                  backdropFilter: 'blur(20px) saturate(1.2)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse"></div>
                <span className="text-emerald-800 font-medium tracking-wide nunito">
                  Ready to explore!
                </span>
                
                {/* Success checkmark */}
                <div 
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center transform rotate-12"
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
                    border: '2px solid white',
                    boxShadow: '0 2px 8px rgba(16, 185, 129, 0.4)'
                  }}
                >
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      
    </div>
  );
};

export default Loader;