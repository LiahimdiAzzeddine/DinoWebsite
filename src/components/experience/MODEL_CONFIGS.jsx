
import { Web1 } from "./Web1";
import { Web2 } from "./Web2";
import { Web3 } from "./Web3";

const MODEL_CONFIGS = {
  Model1: {
    url: "./models/web1.glb",
    triggerSection: "#section2",
    sectioncolor: 0x9a70e7,
    colorA: '#d7e0eb', 
    colorB: '#6ac0f1',
    Component: Web1,
  },
  Model2: {
    url: "./models/web2.glb",
    triggerSection: "#section3",
    sectioncolor: 0x9a70e7,
    colorA: '#d7e0eb', 
    colorB: '#6ac0f1',
    Component: Web2,
  }, 
  Model3: {
    url: "./models/web3.glb",
    triggerSection: "#section4",
    sectioncolor: 0x9a70e7,
    colorA: '#d7e0eb', 
    colorB: '#6ac0f1',
    Component: Web3,
  },
  // I added this to fix a lightning change, I found that a lot of places reference Model1 explicitly.
  // I changed model ids to be web1, web2, etc, and so I added this since some lighting and scene coloring files use it to get lighting data.
  // I also left Model1, Model2, etc, since they are still referenced all around, and I felt lazy to change them all. sorry about the mess.
  web1: {
    url: "./models/web1.glb",
    triggerSection: "#section2",
    sectioncolor: 0x9a70e7,
    colorA: '#d7e0eb',
    colorB: '#6ac0f1',
    Component: Web1,
  },
  web2: {
    url: "./models/web2.glb",
    triggerSection: "#section3",
    sectioncolor: 0x9a70e7,
    colorA: '#d7e0eb',
    colorB: '#6ac0f1',
    Component: Web2,
  },
  web3: {
    url: "./models/web3.glb",
    triggerSection: "#section4",
    sectioncolor: 0x9a70e7,
    colorA: '#d7e0eb',
    colorB: '#6ac0f1',
    Component: Web3,
  },

};

export default MODEL_CONFIGS;
