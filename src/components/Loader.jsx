import { useContext, useEffect, useState } from 'react';
import { AnimationContext } from './experience/AnimationContext';
import { useProgress } from '@react-three/drei';

const Loader = () => {

  const {
    progress, setProgress,
    fadeOut, setFadeOut,
    isLoading, setIsLoading,
  } = useContext(AnimationContext);

  const { progress: gltfProgress, loaded, total } = useProgress();

  useEffect(() => {
    // Mettez à jour le pourcentage basé sur le chargement du modèle réel
    if (gltfProgress < 100) {
      setProgress(gltfProgress);
    }
  }, [gltfProgress]);

  useEffect(() => {
    // Quand tout est chargé, on marque comme prêt
    if (gltfProgress === 100 && loaded === total) {
      setTimeout(() => {
        setIsLoading(true);
        setFadeOut(true);
      }, 1000);
    }
  }, [gltfProgress, loaded, total]);
if(fadeOut){
  return
}
  return (
    <div className={`fixed inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center z-[5000] transition-opacity duration-800 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      {/* Cardboard texture overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(34, 139, 34, 0.1) 2px,
              rgba(34, 139, 34, 0.1) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(34, 139, 34, 0.05) 2px,
              rgba(34, 139, 34, 0.05) 4px
            )
          `
        }}
      />

      {/* Floating cardboard pieces */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-[#00000027] opacity-40 transform rotate-45"
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
        {/* Logo Container - Cardboard Box Style */}
        <div className="mb-8 relative">
          <div className={`w-28 h-28 md:w-36 md:h-36 relative transition-all duration-1000 ${progress > 10 ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
            {/* Main cardboard box */}
            <div className="w-full h-full bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-200 border-2 border-teal-300 relative overflow-hidden shadow-lg">
              {/* Cardboard corrugation lines */}
              <div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full h-0.5 bg-[#0000003f] opacity-60"
                    style={{ top: `${(i + 1) * 16.66}%` }}
                  />
                ))}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={`v-${i}`}
                    className="absolute h-full w-0.5 bg-[#0000003f] opacity-40"
                    style={{ left: `${(i + 1) * 16.66}%` }}
                  />
                ))}
              </div>
              
              {/* Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img 
                  src="/assets/logos/dino.png" 
                  alt="ENTROPRES Logo" 
                  className="w-24 h-24 md:w-28 md:h-28 object-contain opacity-80 z-50"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                {/* Fallback icon */}
                <div className="hidden w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-teal-600 to-emerald-600 flex items-center justify-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-teal-100 rounded"></div>
                </div>
              </div>
              
              {/* Box fold lines */}
              <div className="absolute top-0 left-1/2 w-0.5 h-full bg-teal-400 opacity-70 transform -translate-x-0.5"></div>
              <div className="absolute left-0 top-1/2 w-full h-0.5 bg-teal-400 opacity-70 transform -translate-y-0.5"></div>
            </div>
            
            {/* Box shadow/depth */}
            <div className="absolute -bottom-2 -right-2 w-full h-full bg-teal-300 opacity-50 -z-10"></div>
            
            {/* Tape strips */}
            <div className="absolute top-1/2 left-0 w-full h-3 bg-gradient-to-r from-transparent via-emerald-600 to-transparent opacity-60 transform -translate-y-1/2"></div>
            <div className="absolute left-1/2 top-0 w-3 h-full bg-gradient-to-b from-transparent via-emerald-600 to-transparent opacity-60 transform -translate-x-1/2"></div>
          </div>
        </div>

        {/* Company Name - Stamped Style */}
        <div className={`mb-8 transition-all duration-1000 delay-300 ${progress > 20 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="relative">
            <h1 className="text-3xl md:text-4xl font-bold text-black tracking-wider relative">
              Dinomite
              {/* Stamp effect */}
              <div className="absolute inset-0 border-2 border-teal-700 opacity-30 transform rotate-1"></div>
              <div className="absolute inset-0 border border-teal-600 opacity-50 transform -rotate-1"></div>
            </h1>
            {/* Ink splatter effect */}
            <div className="absolute -top-1 -right-2 w-2 h-2 bg-teal-700 rounded-full opacity-40"></div>
            <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-teal-600 rounded-full opacity-50"></div>
          </div>
        </div>

        {/* Progress Section - Cardboard Style */}
        <div className={`w-80 md:w-96 transition-all duration-1000 delay-500 ${progress > 30 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          {/* Progress Bar Container */}
          <div className="relative mb-4">
            {/* Cardboard progress track */}
            <div className="w-full h-4 bg-gradient-to-r from-emerald-200 via-[#000000] to-cyan-200 border-2 border-teal-400 relative overflow-hidden shadow-inner">
              {/* Corrugation texture */}
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-full w-0.5 bg-teal-300 opacity-40"
                    style={{ left: `${i * 5}%` }}
                  />
                ))}
              </div>
              
              {/* Progress fill - like tape being applied */}
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 via-teal-500 to-emerald-400 transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%`, backgroundColor: '#5bc6a9' }}
              >
                {/* Tape texture */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                
                {/* Tape edge highlight */}
                <div className="absolute right-0 top-0 w-1 h-full bg-teal-600 opacity-70"></div>
              </div>
            </div>
            
            {/* Progress shadow */}
            <div className="absolute -bottom-1 -right-1 w-full h-4 bg-teal-400 opacity-30 -z-10"></div>
          </div>

          {/* Progress Text - Hand-written style */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-teal-800 font-medium tracking-wide transform -rotate-1">
              {progress < 20 ? 'Unpacking...' :
               progress < 45 ? 'Assembling...' :
               progress < 70 ? 'Folding edges...' :
               progress < 90 ? 'Final touches...' :
               progress < 100 ? 'Sealing...' : 'Ready!'}
            </span>
            <span className="text-emerald-700 font-bold tabular-nums bg-teal-100 px-2 py-1 border border-teal-300 transform rotate-1">
              {Math.round(progress)}%
            </span>
          </div>

          {/* Completion message */}
          {isLoading && (
            <div className="mt-6 text-center animate-fade-in">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 border-2 border-teal-400 relative">
                <div className="w-2 h-2 bg-emerald-500 mr-2 transform rotate-45"></div>
                <span className="text-teal-800 text-sm font-medium tracking-wide">Package Ready!</span>
                {/* Delivery stamp */}
                <div className="absolute -top-2 -right-2 w-8 h-8 border-2 border-green-500 bg-green-100 flex items-center justify-center transform rotate-12 opacity-80">
                  <span className="text-green-600 text-xs font-bold">✓</span>
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