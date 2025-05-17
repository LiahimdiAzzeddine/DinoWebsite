
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
    url: "./models/web2.glb",
    triggerSection: "#section3",
    sectioncolor: 0x9a70e7,
    colorA: '#d7e0eb', 
    colorB: '#cc64ca',
    Component: Web2,
  }, 
  Model3: {
    url: "./models/web3.glb",
    triggerSection: "#section4",
    sectioncolor: 0x9a70e7,
    colorA: '#d7e0eb', 
    colorB: '#cc64ca',
    Component: Web3,
  }

};

export default MODEL_CONFIGS;
