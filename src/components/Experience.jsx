import {
  Environment,
  Html,
  ScrollControls,
} from "@react-three/drei";
import { Overlay } from "./Overlay";
import { DinoOffice } from "./experience/Web1";
import { Suspense, useState } from "react";
import ScrollHandler from "./experience/ScrollHandler";
import { Man } from "./experience/Web2";
import { Machine } from "./experience/Web3";

export const Experience = () => {
  const totalPages = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const [changeModel, setCangeModel] = useState(0);
  const handelChange=(page)=>{
    setCurrentPage(page)
    setCangeModel(!changeModel)
  }

  return (
    <>
      <ambientLight intensity={0.03}/>
   <spotLight
        castShadow
        position={[25, 50, -20]}
        angle={0.05}
        penumbra={1}
        intensity={1}
        color="#ffd0d0"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
       
      <directionalLight
        castShadow
        position={[5, 10, 5]}
        intensity={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={500}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />

      <ScrollControls pages={totalPages} damping={0.25}>
      <ScrollHandler
          totalPages={totalPages}
          onPageChange={setCurrentPage} // Met à jour l'état de la page actuelle
        />
        <Overlay />
        <Suspense
          fallback={
            <Html center>
              <div className="loading">Model loading...</div>
            </Html>
          }
        >
          {currentPage >= 3 ? (currentPage >= 4?<Machine currentPage={currentPage}/>: <Man currentPage={currentPage}/>): <DinoOffice currentPage={currentPage} /> }
        </Suspense>
      </ScrollControls>
    </>
  );
};
