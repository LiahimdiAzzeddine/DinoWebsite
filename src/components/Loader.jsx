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
  const [fakeProgress, setFakeProgress] = useState(0);
  const [display, setDisplay] = useState(false);

  // 🚀 Phase artificielle
  useEffect(() => {
    if (fakeProgress < 80) {
      const id = setInterval(() => {
        setFakeProgress(prev => {
          const next = Math.min(prev + 10, 80);
          if (next > 10) setDisplay(true);
          return next;
        });
      }, 500);
      return () => clearInterval(id);
    }
  }, [fakeProgress,isLoading]);

  useEffect(() => {
    if (fakeProgress <20 && gltfProgress >= 90) {
      setProgress(gltfProgress);
      setFakeProgress(gltfProgress);
    } else if (fakeProgress < 80) {
      setProgress(fakeProgress);
    } else {
      const real = 80 + (gltfProgress / 100) * 20;
      setProgress(Math.min(real, 100));
    }
  }, [fakeProgress, gltfProgress,isLoading]);

  // ✅ Fin du chargement
  useEffect(() => {
    if (
      gltfProgress === 100 &&
      loaded === total &&
      fakeProgress > 70
    ) {
      setTimeout(() => {
        setIsLoading(true);
        setFadeOut(true);
      }, 1000);
    }
  }, [gltfProgress, loaded, total, fakeProgress,isLoading]);

  if (fadeOut) return null;
  
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
        <div className=" relative">
          <div className={`w-28 h-24 md:w-36 md:h-32 relative transition-all duration-1000 ${progress > 0 ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
            {/* Main cardboard box rounded-[0.3em] bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-200 border-2 border-teal-300  shadow-lg*/}
            <div className="w-full h-full  relative overflow-hidden ">
              {/* Cardboard corrugation lines
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
              </div> */}
              
              {/* Logo */}
              <div className="absolute inset-0 flex items-center justify-center rounded-[0.3em]">
                <img 
                  src="/src/assets/logos/dinoBlack2.png" 
                  alt="Logo" 
                   width="112" height="96"
                     loading="eager"
  decoding="async"
                  className="md:w-36 md:h-32 object-contain opacity-80 z-50"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                {/* Fallback icon 
                <div className="hidden w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-teal-600 to-emerald-600 items-center justify-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-teal-100 rounded"></div>
                </div>*/}
              </div>
              
              {/* Box fold lines 
              <div className="absolute top-0 left-1/2 w-0.5 h-full bg-teal-400 opacity-70 transform -translate-x-0.5"></div>
              <div className="absolute left-0 top-1/2 w-full h-0.5 bg-teal-400 opacity-70 transform -translate-y-0.5"></div>*/}
            </div>
            
            {/* Box shadow/depth 
            <div className="absolute -bottom-2 -right-2 w-full h-full bg-teal-300 opacity-50 -z-10 rounded-[0.3em] "></div>
            */}
            {/* Tape strips 
            <div className="absolute top-1/2 left-0 w-full h-3 bg-gradient-to-r from-transparent via-emerald-600 to-transparent opacity-60 transform -translate-y-1/2"></div>
            <div className="absolute left-1/2 top-0 w-3 h-full bg-gradient-to-b from-transparent via-emerald-600 to-transparent opacity-60 transform -translate-x-1/2"></div>
*/}

          </div>
        </div>

        {/* Company Name - Stamped Style 
        <div className={`mb-8 transition-all duration-1000 delay-300 ${progress > 10 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="relative">
            <h1 className="text-3xl md:text-4xl font-bold text-black tracking-wider relative">
              Dinomite
              <div className="absolute inset-0 border-2 border-teal-700 opacity-30 transform rotate-1"></div>
              <div className="absolute inset-0 border border-teal-600 opacity-50 transform -rotate-1"></div>
            </h1>
            <div className="absolute -top-1 -right-2 w-2 h-2 bg-teal-700 rounded-full opacity-40"></div>
            <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-teal-600 rounded-full opacity-50"></div>
          </div>
        </div>*/}

        {/* Progress Section - Cardboard Style */}
        <div className={`w-80 md:w-96 transition-all duration-1000 delay-500 ${(progress > 20 && display) ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          {/* Progress Bar Container */}
          <div className="relative mb-4">
            {/* Cardboard progress track */}
            <div className="w-full h-4 bg-gradient-to-r from-cyan-100 via-cyan-100 to-cyan-100 border-2 border-[#4f968a] relative overflow-hidden rounded-[0.3em]">
              {/* Corrugation texture */}
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-full w-0.5 bg-teal-200 opacity-40"
                    style={{ left: `${i * 5}%` }}
                  />
                ))}
              </div>
              
              {/* Progress fill - like tape being applied */}
              <div 
                className="h-full bg-gradient-to-r from-[#87ffe9] via-[#6acab9] to-[#417d72] transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%`, backgroundColor: '#5bc6a9' }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                
                <div className="absolute right-0 top-0 w-1 h-full bg-[#396f66] opacity-70 rounded-[0.3em]"></div>
              </div>
            </div>
            {
              /**
               *  <div className="absolute -bottom-1 -right-1 w-full h-4 bg-teal-300 opacity-30 -z-10 rounded-[0.3em]"></div>
               * 
               */
            }
           

          </div>

          {/* Progress Text - Hand-written style */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-[#4f968a] font-bold font-medium tracking-wide transform -rotate-1">
              {progress < 20 ? 'Unpacking...' :
               progress < 45 ? 'Assembling...' :
               progress < 70 ? 'Folding edges...' :
               progress < 90 ? 'Final touches...' :
               progress < 100 ? 'Sealing...' : 'Ready!'}
            </span>
            <span className="text-emerald-700 font-bold tabular-nums bg-[#bafbf1] px-2 py-1 border border-[#4f968a] transform rotate-1 rounded-[0.3em]">
              {Math.round(progress)}%
            </span>
          </div>

          {/* Completion message */}
          {progress>95 && (
            <div className="mt-6 text-center animate-fade-in">
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-100 to-[#bafbf1] border-2 border-[#4f968a] relative rounded-[0.3em]">
                <div className="w-2 h-2 bg-emerald-500 mr-2 transform rotate-45"></div>
                <span className="text-teal-800 text-sm font-medium tracking-wide pr-5 nunito">Package Ready!</span>
                {/* Delivery stamp */}
                <div className="absolute -top-2 -right-2 w-8 h-8 border-2 border-[#4f968a] bg-green-100 flex items-center justify-center transform rotate-12 opacity-80 rounded-[0.3em]">
                  <span className="text-[#4f968a] text-xs font-bold nunito">✓</span>
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