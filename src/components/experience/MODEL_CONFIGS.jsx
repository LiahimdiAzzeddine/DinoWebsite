

const MODEL_CONFIGS = {
  web1: {
    url: "./models/web1.glb",
    triggerSection: "#section2",
    sectioncolor: 0x10b981, // emerald-500 (#10b981)
    colorA: '#4abeab',  
    colorB: '#6ac0f1', 
  },
  web2: {
    url: "./models/web2.glb",
    triggerSection: "#section3",
    sectioncolor: 0x14b8a6, // teal-500 (#14b8a6)
    colorA: '#d7e0eb',
    colorB: '#6ac0f1',
  },
  web3: {
    url: "./models/web3.glb",
    triggerSection: "#section4",
    sectioncolor: 0x2dd4bf, // teal-400 (#2dd4bf)
    colorA: '#e6fcf5',                    // Très clair pastel vert/teal (plus clair que emerald-50)
    colorB: '#6ac0f1',                    // Teal-500 (plus saturé et profond)
  },
};

export const WEB1_CONFIGS={
ANIMATIONS_TO_PLAY: [
  "Armature.001Action",
  "Armature.003Action.003",
  "Armature.004Action.002",
  "Cube.032Action",
  "Empty.001Action.001",
  "Empty.003Action.001",
  "Empty.005Action",
  "Empty.006Action",
  "Empty.009Action.002",
  "Empty.010Action.002",
  "Empty.010Action.004",
  "Sphere.010Action",
  "Sphere.011Action",
  "Ball1",
  "Ball2",
  "Ball4",
  "Ball3",
  "Ball5",
  "Sphere.010Action",
  "Sphere.011Action",
],
}

export default MODEL_CONFIGS;
