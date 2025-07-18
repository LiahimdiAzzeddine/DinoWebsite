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
                        <h1 className="sm:min-h-[2em] min-h-[2.1em] flex items-center">
                            Download our App
                        </h1>
                        <p className="category">Available on iOS and Android</p>
                    </header>
                    <div className="content">
                        <p>
                            Get the full experience with our mobile app. Download now and enjoy all features on your device.
                        </p>

                        <div data-v-7479a2c4="">
                            <a
                                href="https://apps.apple.com/us/app/money-bank-3d/id1523673634"
                                title="App Store"
                                aria-label="App Store"
                                target="_blank"
                                className="inline-block font-bold text-base pointer-events-auto no-underline transition-all ease-out duration-100 
                                         rounded-2xl border shadow-sm hover:shadow-lg hover:-translate-y-px
                                         sm:rounded-full"
                                style={{
                                    fontFamily: '"Nunito Sans", sans-serif',
                                    margin: "0.5em 0.5em 0.5em 0",
                                }}
                            >
                                <div className="flex items-center gap-2 text-center">
                                    <img
                                        src="../assets/logos/appStore.webp"
                                        loading="eager"
                                        decoding="async"
                                        className="h-8"
                                        alt="Download on App Store"
                                    />
                                </div>
                            </a>
                            <a
                                href="https://play.google.com/store/apps/details?id=com.tp.moneybank&hl=en&pli="
                                title="Play Store"
                                aria-label="Play Store"
                                target="_blank"
                                className="inline-block font-bold text-base pointer-events-auto no-underline transition-all ease-out duration-100 
                                         rounded-2xl border shadow-sm hover:shadow-lg hover:-translate-y-px
                                         sm:rounded-full"
                                style={{
                                    fontFamily: '"Nunito Sans", sans-serif',
                                    margin: "0.5em 0.5em 0.5em 0",
                                }}
                            >
                                <div className="flex items-center gap-2 text-center">
                                    <img
                                        src="../assets/logos/play-store.webp"
                                        loading="eager"
                                        decoding="async"
                                        className="h-8"
                                        alt="Get it on Google Play"
                                    />
                                </div>
                            </a>
                            
                            <button 
                                onClick={onClose} 
                                className="inline-block font-bold text-base pointer-events-auto no-underline transition-all ease-out duration-100 
                                         rounded-2xl border shadow-sm hover:shadow-lg hover:-translate-y-px bg-gray-100 hover:bg-gray-200 px-4 py-2 ml-2
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
        </div>
    );
};

export default DownloadAppAlert;