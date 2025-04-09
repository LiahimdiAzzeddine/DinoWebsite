import { OrbitControls, ScrollControls } from "@react-three/drei";
import { Overlay } from "./Overlay";
import { MultiUser } from "./MultiUser";
import { useState } from "react";
import { Model } from "./Models";
import { MultiUserCollab } from "./MultiUserCollab";

export const Experience = () => {
  const [activeSection, setActiveSection] = useState(0); // État de la section active

  return (
    <>
      <ambientLight intensity={1} />
      {/**      <OrbitControls enableZoom={false}/>
 */}
      <ScrollControls pages={3} damping={0.25}>
      
      <Overlay setActiveSection={setActiveSection} />
       {/***/}
     <MultiUser/> 
      </ScrollControls>
    </>
  );

};
