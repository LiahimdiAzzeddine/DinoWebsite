
import { Animals } from "./Animals";
import { OfficeDino } from "./OfficeDino";
import { Wasp } from "./Wasp";
import { Web1 } from "./Web1";
import { Web2 } from "./Web2";

/**
 * Configuration for each 3D model
 * Contains model path, camera position, trigger sections, scale and animations
 */
const MODEL_CONFIGS = {
  Model1: {
    url: "./models/officeDino.glb",
    triggerSection: "#section5",
    scale: [1, 1, 1],
    position: { x: -5, y: 0, z: 0 },
    colorA: '#75b9a4', 
    colorB: '#b6e6de',
    Component: OfficeDino,
  },
  Model2: {
    url: "./models/Web2.glb",
    triggerSection: ".second-section2",
    sectioncolor: 0x4abeab,
    colorA: '#90a1b6', 
    colorB: '#e3e9bc',
    scale: [1.8, 1.8, 1.8],
    position: { x: 1, y: 0, z: 0 },
    Component: Web2,
  },
  Model3: {
    url: "./models/web1.glb",
    triggerSection: ".second-section",
    scale: [1, 1, 1],
    position: { x: -5, y: 0, z: 0 },
    sectioncolor: 0x9a70e7,
    colorA: '#d7e0eb', 
    colorB: '#cc64ca',
    Component: Web1,
  },
  
};

export default MODEL_CONFIGS;
