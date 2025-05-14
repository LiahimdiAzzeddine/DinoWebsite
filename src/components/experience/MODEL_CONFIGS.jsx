
import { Web1 } from "./Web1";
import { Web2 } from "./Web2";
import { Web3 } from "./Web3";

const MODEL_CONFIGS = {
  Model1: {
    url: "./models/web1.glb",
    triggerSection: "#section2",
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
 Model3: {
    url: "./models/Web3.glb",
     triggerSection: "#section4",
    sectioncolor: 0x4abeab,
    colorA: '#90a1b6', 
    colorB: '#e3e9bc',
    Component: Web3,
  },

};

export default MODEL_CONFIGS;
