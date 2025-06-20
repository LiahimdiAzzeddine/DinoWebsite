import { OrbitControls, ScrollControls, useAnimations } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
import EnvironmentScene from "./experience/Environment";

export function Character({ url }) {
  const group = useRef()

  // Load the model
  const gltf = useLoader(GLTFLoader, url);
  const { actions } = useAnimations(gltf.animations, group)
   useEffect(() => {
      if (actions) {
        Object.values(actions).forEach(action => action.play());
      }
    }, [actions]);

  return <primitive ref={group} object={gltf.scene}  scale={[0.5,0.5,0.5]}/>;
}
export function Platform({ url }) {
    const { gl } = useThree(); 
    const plat = useRef()
  
    const gltf = useLoader(GLTFLoader, url, (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
      loader.setDRACOLoader(dracoLoader);
      const ktx2Loader = new KTX2Loader();
      ktx2Loader.setTranscoderPath("https://cdn.jsdelivr.net/gh/pmndrs/drei-assets/basis/");
      ktx2Loader.detectSupport(gl);
      loader.setKTX2Loader(ktx2Loader);
    });
    return <primitive ref={plat} object={gltf.scene} scale={[0.5,0.5,0.5]} position={[0,-2.02,0]} />;
  }

export const Scene = () => {
    const [activeSection, setActiveSection] = useState(0); 
    const { scene, camera } = useThree();


  return (
    <>
      <OrbitControls />
      <ScrollControls pages={3} damping={0.25}>
        <Character url="./models/Party.glb" />
        <EnvironmentScene/>
      </ScrollControls>
    </>
  );
};
