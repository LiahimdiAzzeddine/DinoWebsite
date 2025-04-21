
import { Animals } from "./Animals";
import { OfficeDino } from "./OfficeDino";
import { Wasp } from "./Wasp";

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
    Component: OfficeDino,
  },
  Model2: {
    url: "./models/animals.glb",
    triggerSection: ".second-section2",
    sectioncolor: 0x4abeab,
    colorA: '#90a1b6', 
    colorB: '#e3e9bc',
    scale: [1.8, 1.8, 1.8],
    position: { x: 1, y: 0, z: 0 },
    Component: Animals,
  },
  Model3: {
    url: "./models/Wasp.glb",
    triggerSection: "#section5",
    scale: [1, 1, 1],
    position: { x: -5, y: 0, z: 0 },
    sectioncolor: 0x9a70e7,
    colorA: '#d7e0eb', 
    colorB: '#cc64ca',
    Component: Wasp,
  },
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
