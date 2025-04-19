import { useState, useEffect } from 'react';

const VerticalProgressBar = ({ sections, setActiveSection }) => {
  const [visibleSections, setVisibleSections] = useState({});
  const [scrollProgress, setScrollProgress] = useState({});

  // Fonction pour gérer le défilement vers une section
  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  // Effet pour surveiller la visibilité des sections et la progression du défilement
  useEffect(() => {
    const calculateSectionVisibility = () => {
      const newVisibleSections = {};
      const newScrollProgress = {};
      
      sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          // Section est considérée visible si elle est dans la fenêtre
          const isVisible = rect.top < windowHeight && rect.bottom > 0;
          newVisibleSections[section.id] = isVisible;
          
          // Calculer le pourcentage de défilement pour cette section
          if (isVisible) {
            // Si l'élément est encore complètement au-dessous de la fenêtre de visualisation
            if (rect.top >= windowHeight) {
              newScrollProgress[section.id] = 0;
            }
            // Si l'élément est complètement au-dessus de la fenêtre de visualisation
            else if (rect.bottom <= 0) {
              newScrollProgress[section.id] = 100;
            }
            // Si l'élément est partiellement visible
            else {
              // Calculer le pourcentage de visibilité
              const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
              const percentage = (visibleHeight / rect.height) * 100;
              newScrollProgress[section.id] = Math.min(100, Math.max(0, percentage));
            }
          } else {
            // Si la section n'est pas visible, on garde la valeur précédente ou 0
            newScrollProgress[section.id] = scrollProgress[section.id] || 0;
          }
        }
      });
      
      setVisibleSections(newVisibleSections);
      setScrollProgress(newScrollProgress);
      
      // Mettre à jour la section active
      const activeSection = sections.find(section => 
        newVisibleSections[section.id] && 
        (newScrollProgress[section.id] > 30)
      );
      
      if (activeSection) {
        setActiveSection(activeSection.id);
      }
    };

    // Ajouter un écouteur d'événement pour le défilement
    window.addEventListener('scroll', calculateSectionVisibility);
    // Calculer la visibilité initiale
    calculateSectionVisibility();

    // Nettoyage
    return () => {
      window.removeEventListener('scroll', calculateSectionVisibility);
    };
  }, [sections, setActiveSection, scrollProgress]);

  return (
    <div className="fixed top-0 py-2 right-3 h-screen w-2 z-50 flex flex-col justify-center">
      {sections.map((section, index) => (
        <div key={index} className="relative my-2 h-16 w-full bg-white bg-opacity-20 rounded-full overflow-hidden">
          <button
            onClick={() => handleScroll(section.id)}
            className="absolute top-0 left-0 w-full h-full z-10"
            title={section.label}
          ></button>
          <div 
            className="absolute bottom-0 left-0 w-full bg-white transition-all duration-300 ease-out"
            style={{ 
              height: `${scrollProgress[section.id] || 0}%`,
              opacity: visibleSections[section.id] ? 1 : 0.5 
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default VerticalProgressBar;