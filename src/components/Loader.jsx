import React, { useEffect, useState } from 'react';


const Loader= ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Simulate loading process
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onLoadingComplete();
          }, 50);
          return 100;
        }
        return newProgress;
      });
    }, 10);
    
    return () => clearInterval(interval);
  }, [onLoadingComplete]);
  
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="w-64 md:w-96">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
          Loading
        </h2>
        <div className="w-full bg-gray-800 rounded-full h-1.5">
          <div 
            className="bg-[#46bdaa] h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-gray-400 text-sm mt-2 text-right">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};

export default Loader;