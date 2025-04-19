import { useLoader, useThree } from "@react-three/fiber";
import { useContext, useMemo, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";

import MODEL_CONFIGS from "./MODEL_CONFIGS";
import Rig from "./Rig";
import { AnimationContext } from "./AnimationContext";
import { useGLTF } from "@react-three/drei";

// ─── Reusable global loaders ────────────────────────────────────────────────────
let dracoLoader = null;
let ktx2Loader = null;

/**
 * setupLoaders
 * Configures a GLTFLoader to use DRACO for compressed geometry
 * and KTX2 for compressed textures. Loaders are instantiated once.
 */
function setupLoaders(loader, gl) {
  if (!dracoLoader) {
    dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
  }
  if (!ktx2Loader) {
    ktx2Loader = new KTX2Loader();
    ktx2Loader
      .setTranscoderPath("https://cdn.jsdelivr.net/gh/pmndrs/drei-assets/basis/")
      .detectSupport(gl);
  }

  loader.setDRACOLoader(dracoLoader);
  loader.setKTX2Loader(ktx2Loader);
}

/**
 * Character Component
 * - Retrieves the current model key from AnimationContext
 * - Loads the corresponding glTF file (with DRACO + KTX2)
 * - Wraps the loaded scene in <Rig> to handle animations
 */
export function ModelContainer() {
  const { gl } = useThree();                              // WebGL context
  const { currentModel } = useContext(AnimationContext);  // active model key
  const config = MODEL_CONFIGS[currentModel];             // url, scale, Component, etc.

  const characterRef = useRef();                          // ref to the group for future manipulation

  // Memoize the loader setup function to avoid recreating it on every render
  const loaderSetup = useMemo(
    () => (loader) => setupLoaders(loader, gl),
    [gl]
  );

  // Load the GLTF model: URL + loader setup (DRACO/KTX2)
 /* const { scene, animations } = useLoader(
    GLTFLoader,
    config.url,
    loaderSetup
  );*/
  const { scene, animations,nodes, materials } = useGLTF(config.url);

  // The React component responsible for rendering the loaded scene
  const ModelComponent = config.Component;

  return (
    <Rig key={currentModel}>
        <ModelComponent scene={scene} animations={animations} config={config} nodes={nodes} materials={materials}/>
    </Rig>
  );
}

export default ModelContainer;
