import { OrbitControls, ScrollControls } from "@react-three/drei";
import { Overlay } from "./Overlay-old";
import Character from "./experience/ModelContainer";
import { useThree } from "@react-three/fiber";
import { useContext } from "react";
import { AnimationContext } from "./experience/AnimationContext";

const MODEL_CONFIGS = {
  TrongCom: {
    url: "./models/scene.glb",
    scale: [1.8, 1.8, 1.8],

    page:1
  },
  OldMacDonald: {
    url: "./models/OldMacDonald.glb",
    scale: [1.8, 1.8, 1.8],

    page:2
  }
};

export function SceneManager() {
  const { currentModel, setCurrentModel } = useContext(AnimationContext);
  

  
  return <Character modelKey={currentModel} />;
}

export const Experience = () => {

  return (
    <>
      <ambientLight intensity={1} />
      <OrbitControls enableZoom={false}/>
      <ScrollControls pages={3} damping={0.1}>
        <SceneManager/>
      <Overlay/>
      </ScrollControls>
    </>
  );

};
