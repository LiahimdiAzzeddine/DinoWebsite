
import { Web1 } from "./Web1";
import { Web2 } from "./Web2";
import { Web3 } from "./Web3";

const MODEL_CONFIGS = {
  Model1: {
    url: "./models/web1.glb",
    triggerSection: "#section2",
    sectioncolor: 0x9a70e7,
    colorA: '#33cebc', 
    colorB: '#93F9EE',
    Component: Web1,
  }, 
  Model2: {
    url: "./models/web2.glb",
    triggerSection: "#section3",
    sectioncolor: 0x9a70e7,
        colorA: '#33cebc', 
    colorB: '#93F9EE',
    Component: Web2,
  }, 
  Model3: {
    url: "./models/web3.glb",
    triggerSection: "#section4",
    sectioncolor: 0x9a70e7,
       colorA: '#33cebc', 
    colorB: '#93F9EE',
    Component: Web3,
  }

};

export default MODEL_CONFIGS;
