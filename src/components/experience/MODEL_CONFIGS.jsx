
import { Web1 } from "./Web1";
import { Web2 } from "./Web2";

/**
 * Configuration for each 3D model
 * Contains model path, camera position, trigger sections, scale and animations
 */
const MODEL_CONFIGS = {
  Model1: {
    url: "./models/web1.glb",
    triggerSection: ".second-section",
    sectioncolor: 0x9a70e7,
    colorA: '#d7e0eb', 
    colorB: '#cc64ca',
    Component: Web1,
  },
  
  Model2: {
    url: "./models/Web2.glb",
     triggerSection: "#section3",
    sectioncolor: 0x4abeab,
    colorA: '#90a1b6', 
    colorB: '#e3e9bc',
    Component: Web2,
  },

};

export default MODEL_CONFIGS;
