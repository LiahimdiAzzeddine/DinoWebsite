import { useLoader, useThree } from "@react-three/fiber";
import { forwardRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
export  const Platform =forwardRef(({ url }, ref) => {
  const { gl } = useThree();

  const gltf = useLoader(GLTFLoader, url, (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    loader.setDRACOLoader(dracoLoader);
    const ktx2Loader = new KTX2Loader();
    ktx2Loader.setTranscoderPath(
      "https://cdn.jsdelivr.net/gh/pmndrs/drei-assets/basis/"
    );
    ktx2Loader.detectSupport(gl);
    loader.setKTX2Loader(ktx2Loader);
  });

  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      scale={[0.5, 0.5, 0.5]}
      position={[0, -2.02, 0]}
    />
  );
});
export default Platform;