import { DinoOffice } from "./Web1";
import { Man } from "./Web2";




/**
 * Configuration for each 3D model
 * Contains model path, camera position, trigger sections, scale and animations
 */
const MODEL_CONFIGS = {
  Model1: {
    url: "./models/officeDino.glb",
    triggerSection: ".second-section",
    scale: [1, 1, 1],
    position: { x: -5, y: 0, z: 0 },
    colorA: '#75b9a4', 
    colorB: '#b6e6de',
    Component: DinoOffice,
  },
  Model2: {
    url: "./models/Web4.glb",
    triggerSection: ".second-section2",
    sectioncolor: 0x4abeab,
    colorA: '#75b9a4', 
    colorB: '#b6e6de',
    scale: [1.8, 1.8, 1.8],
    position: { x: 1, y: 0, z: 0 },
    Component: Man,
  },
  Model3: {
    url: "./models/Wasp.glb",
    triggerSection: "#section5",
    scale: [1, 1, 1],
    position: { x: -5, y: 0, z: 0 },
    sectioncolor: 0x9a70e7,
    colorA: '#d7e0eb', 
    colorB: '#cc64ca',
    Component: DinoOffice,
  },
  
};

export default MODEL_CONFIGS;
