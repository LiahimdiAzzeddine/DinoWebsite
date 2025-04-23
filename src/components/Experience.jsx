import { Environment, Html, OrbitControls, PerspectiveCamera, ScrollControls } from "@react-three/drei";
import { Overlay } from "./Overlay";
import { DinoOffice } from "./experience/Web1";
import { Suspense } from "react";

export const Experience = () => {
  return (
    <>
      <ambientLight intensity={0.03} />
      <spotLight
        angle={0.14}
        color="#ffd0d0"
        penumbra={1}
        position={[25, 50, -20]}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
        castShadow
      />
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
      <ScrollControls pages={6} damping={0.25}>
        <Overlay/>
        <Suspense
          fallback={
            <Html center>
              <div className="loading">Model loading...</div>
            </Html>
          }
        >
          <DinoOffice/>
        </Suspense>
      </ScrollControls>
    </>
  );
};