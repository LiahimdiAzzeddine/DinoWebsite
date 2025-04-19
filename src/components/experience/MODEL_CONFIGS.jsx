
import { Office } from "./Office";
import { Animals } from "./Animals";
import { OfficeDino } from "./OfficeDino";
import { Customshaders } from "./Customshaders";

/**
 * Configuration for each 3D model
 * Contains model path, camera position, trigger sections, scale and animations
 */
const MODEL_CONFIGS = {
  TrongCom: {
    url: "./models/animals.glb",
    triggerSection: ".second-section",
    scale: [1, 1, 1],
    position: { x: -5, y: 0, z: 0 },
    sectioncolor: 0x9a70e7,
    Component: Animals,
    // Paramètres d'animation
    animation: {
      camera: { x: -2.1202796686, y: 1.9744925851, z: 1.2070712632 },
      target: [-0.2254370442, -0.0999060476, -0.0898092319], // Point vers lequel la caméra regarde
      // Paramètres du ScrollTrigger
      scrollTrigger: {
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        immediateRender: false,
      }
    }
  },
  OldMacDonald: {
    url: "./models/Office.glb",
    triggerSection: ".second-section2",
    sectioncolor: 0x4abeab,
    scale: [1.8, 1.8, 1.8],
    position: { x: 1, y: 0, z: 0 },
    Component: Office,
    // Paramètres d'animation standard
    animation: {
      camera: { x: 5, y: 3.8, z: 2.8 },
      position: { x: 2.31, y: 0.01, z: -0.7 },
      rotation: { x: 0.67, y: -12.9, z: 0.79 },
      target: [0, 0,0], 
      // Paramètres du ScrollTrigger
      scrollTrigger: {
        start: "top bottom",
        end: "top top",
        scrub: true,
        immediateRender: false
      }
    }
  }
};

  // Default camera settings
  export const cameraSettings = {
    fov: 45,
    far: 1000.134,
    near: 0.3,
    position: [2.303, 2.091, 5.028],
    rotation: [0, 0.112, 0.019],
  };
export default MODEL_CONFIGS;
