import { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, useGLTF, PerspectiveCamera, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js";

// Enregistrer ScrollTrigger
gsap.registerPlugin(ScrollTrigger);


export function Model({ activeSection }) {
  const gl = useThree((state) => state.gl);
  const group = useRef();
  const { scene,animations } = useGLTF(
    [
      "/models/MultiUserCollab.glb",
      "/models/CrossPlatform.glb",
      "/models/CustomShaders.glb",
    ][activeSection],
    undefined,
    undefined,
    (loader) => {
      const ktx2loader = new KTX2Loader();
      ktx2loader.setTranscoderPath(
        "https://cdn.jsdelivr.net/gh/pmndrs/drei-assets/basis/"
      );
      ktx2loader.detectSupport(gl);
      loader.setKTX2Loader(ktx2loader);
    }
  );

  const { set } = useThree();
    const { actions } = useAnimations(animations, group)

/**/
useEffect(() => {
  if (scene) {
    const cameras = [];
    scene.traverse((obj) => {
      if (obj.isPerspectiveCamera) {
        if (!obj.userData.modified) { 
          obj.position.set(
            obj.position.x * 1.5,
            obj.position.y * 1.5,
            obj.position.z * 1.5
          );
          obj.updateProjectionMatrix();
          obj.userData.modified = true; 
        }
        cameras.push(obj);
      }
    });

    if (cameras.length > 0) {
      set({ camera: cameras[0] }); 
    }
  }
}, [scene, set]);

  return (
    <primitive
      ref={group}
      object={scene}
      scale={[0.4, 0.4, 0.4]} 
      position={[0, -1, 0]}
    />
  );
}
