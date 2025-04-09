import { Canvas } from "@react-three/fiber";
import "./App.css";
import { Experience } from "./components/Experience";
import { Scene } from "./components/Scene";
import { useRef, useState } from "react";
import { CanvasContainer } from "./components/CanvasContainer";
import { Overlay } from "./components/Overlay";



function App() {
      const [activeSection, setActiveSection] = useState(0); 
      const section= useRef();
  return (
    
    <main className="overflow-x-hidden">
			<div className="h-screen w-full fixed top-0 z-10 block">
        {/** 
				<CanvasContainer />*/}
			</div>
    <Overlay setActiveSection={setActiveSection}/>
		</main>
  );
}

export default App;
{/**
  <Canvas camera={{
        fov: 45,
        far:1000.134,
        near:0.3,
        position:[2.303, 2.091, 7.028],
        rotation:[-0.172, 0.112, 0.019],
      }}>
      <Scene/>
    </Canvas>
  */}