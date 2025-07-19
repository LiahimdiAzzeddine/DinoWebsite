import React, { useState, useEffect } from 'react';

const DownloadAppAlert = ({ visible, onClose }) => {
    // Hook pour détecter la taille d'écran
    const [isDesktop, setIsDesktop] = useState(false);
    
    useEffect(() => {
        const checkScreenSize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    if (!visible) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            onClick={onClose}
        >
            <div
                className="block relative w-[440px] mx-auto"
                style={{
                    marginLeft: isDesktop ? "auto" : "auto",
                    marginRight: isDesktop ? "auto" : "auto",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="wrapper">
                    <header>
                        <h1 className="flex items-center py-6">
                            Download our App
                        </h1>
                        <div className="category">Available on iOS and Android</div>
                    </header>
                    <div className="content">
                        <div className='pb-5'>
                            Get the full experience with our mobile game. Download now and enjoy all features on your device.
                        </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
  <a
    href="https://apps.apple.com/us/app/money-bank-3d/id1523673634"
    title="App Store"
    aria-label="App Store"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center px-4 py-2 bg-white text-black border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition hover:-translate-y-0.5 w-64 sm:w-56"
  >
    <img
      src="../assets/logos/appStore.webp"
      alt="App Store"
      className="h-8 mr-3"
    />
    <div className="text-left">
      <div className="text-xs leading-tight">Download on the</div>
      <div className="text-base font-semibold">App Store</div>
    </div>
  </a>

  <a
    href="https://play.google.com/store/apps/details?id=com.tp.moneybank&hl=en&pli="
    title="Play Store"
    aria-label="Play Store"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center px-4 py-2 bg-white text-black border border-gray-300 rounded-xl shadow-sm hover:shadow-md transition hover:-translate-y-0.5 w-64 sm:w-56"
  >
    <img
      src="../assets/logos/play-store.webp"
      alt="Google Play"
      className="h-8 mr-3"
    />
    <div className="text-left">
      <div className="text-xs leading-tight">Get it on</div>
      <div className="text-base font-semibold">Google Play</div>
    </div>
  </a>
</div>

                        
                            <button 
                                onClick={onClose} 
                                className="inline-block font-bold text-base pointer-events-auto no-underline transition-all ease-out duration-100 
                                         rounded-2xl border shadow-sm hover:shadow-lg hover:-translate-y-px bg-gray-100 hover:bg-gray-200 px-4 ml-2
                                         sm:rounded-full"
                                style={{
                                    fontFamily: '"Nunito Sans", sans-serif',
                                    margin: "0.5em 0.5em 0.5em 0",
                                }}
                            >
                                Close
                            </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DownloadAppAlert;