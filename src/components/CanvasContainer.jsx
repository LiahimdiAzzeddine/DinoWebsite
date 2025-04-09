import { Canvas, useLoader, useThree } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  OrbitControls,
  Sphere,
  useAnimations,
} from "@react-three/drei";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import React, { forwardRef, Suspense, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
import * as THREE from "three";

// without registering scrolltriiger the model will break
gsap.registerPlugin(ScrollTrigger);

// Configuration pour chaque modele[2.303, 2.091, 5.028]
const modelConfigs = {
  "TrongCom": {
    url: "./models/TrongCom.glb",
    cameraPosition: {
      x:0,
      y:2,
      z:3
    },
    triggerSection: ".second-section",
    scale: [1.8, 1.8, 1.8]
  },
  "OldMacDonald": {
    url: "./models/OldMacDonald.glb",
    cameraPosition: {
      x: -3,
      y: 2.5,
      z: 5
    },
    triggerSection: ".second-section2",
    scale: [1.8, 1.8, 1.8]
  }
};

// Créer un contexte pour l'animation partagee
const AnimationContext = React.createContext();

export function AnimationProvider({ children }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [currentModel, setCurrentModel] = useState("TrongCom");
  
  const startAnimation = () => {
    setIsAnimating(true);
  };
  
  const completeAnimation = () => {
    setAnimationComplete(true);
    setIsAnimating(false);
  };
  
  return (
    <AnimationContext.Provider 
      value={{ 
        isAnimating, 
        animationComplete, 
        startAnimation, 
        completeAnimation,
        currentModel,
        setCurrentModel
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
}

export function SceneManager() {
  const { camera, scene } = useThree();
  const { currentModel, setCurrentModel } = React.useContext(AnimationContext);
  const animationTimeline = useRef(null);
  
  useEffect(() => {
    animationTimeline.current = gsap.timeline();
    
    //play the initial animation
    triggerInitialAnimation();
    
    return () => {
      if (animationTimeline.current) {
        animationTimeline.current.kill();
      }
    };
  }, []);
  
  const triggerInitialAnimation = () => {
    // This function will be called upon initial mounting to start the animations
    const tl = animationTimeline.current;
    if (tl) {
      tl.play();
    }
  };
  
  useLayoutEffect(() => {
    const initialScenePosition = scene.position.clone();
    const initialSceneRotation = scene.rotation.clone();
    const initialCameraPosition = camera.position.clone();
  
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: modelConfigs.TrongCom.triggerSection,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        immediateRender: false,
        onEnter: () => setCurrentModel("TrongCom"),
        onLeaveBack: () => {
          scene.position.copy(initialScenePosition);
          scene.rotation.copy(initialSceneRotation);
          camera.position.copy(initialCameraPosition);
        },
      },
    });
    
    // Étape 1 : déplacement vers le premier point (entrée dans le modèle)
    timeline.to(camera.position, {
      x: 2,
      y: 2.091,
      z: 3,
      duration: 1, // correspond à une portion du scroll
    });
    
    // Étape 2 : se déplace plus loin dans le modèle
    timeline.to(camera.position, {
      x: -3,
      y: 1.8,
      z: 4,
      duration: 1, // autre portion du scroll
    });
    
    // Étape 3 : fin du parcours (optionnel)
    timeline.to(camera.position, {
      x: 2.303,
      y: 2.091,
      z: 5.028,
      duration: 1,
    });
    
    // Animation en parallèle (position/rotation de la scène au même moment que la première étape)
    timeline.to(scene.position, {
      x: -1,
      duration: 1,
    }, "<"); // "<" signifie "en même temps que l'étape précédente
    
    timeline.to(scene.rotation, {
      y: Math.PI / 6,
      duration: 1,
    }, "<"); // également au même moment
    
  
    // Animation pour OldMacDonald
    const oldMacTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: modelConfigs.OldMacDonald.triggerSection,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        immediateRender: false,
        onEnter: () => setCurrentModel("OldMacDonald"),
        onLeaveBack: () => setCurrentModel("TrongCom"),
      },
    });
  
    oldMacTimeline.to(camera.position, {
      x: modelConfigs.OldMacDonald.cameraPosition.x,
      y: modelConfigs.OldMacDonald.cameraPosition.y,
      z: modelConfigs.OldMacDonald.cameraPosition.z,
      duration: 1,
    });
  
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  
  return (
    <>
      <SceneObjects modelKey={currentModel} />
    </>
  ); 
}



// Transformer en composant avancé avec référence
export const Character =forwardRef(({ modelKey }, ref) => {
  const { gl,scene } = useThree();
  const config = modelConfigs[modelKey];
  scene.position.x=-2;
  // Load the model
  const gltf = useLoader(GLTFLoader, config.url, (loader) => {
    // DRACOLoader for Draco compression
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    loader.setDRACOLoader(dracoLoader);

    // KTX2Loader for compressed textures
    const ktx2Loader = new KTX2Loader();
    ktx2Loader.setTranscoderPath(
      "https://cdn.jsdelivr.net/gh/pmndrs/drei-assets/basis/"
    );
    ktx2Loader.detectSupport(gl);
    loader.setKTX2Loader(ktx2Loader);
  });
  
  const { actions } = useAnimations(gltf.animations, ref);
  
//play the animations
  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => action.play());
    }
  }, [actions]);

  return <primitive ref={ref} object={gltf.scene} scale={config.scale} position={[0,0,0]} />;
});

export const Platform =forwardRef(({ url }, ref) => {
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

export function SceneObjects({ modelKey }) {
  const { isAnimating, startAnimation } = useContext(AnimationContext);
  const mainGroup = useRef();
  const characterRef = useRef();
  const platformRef = useRef();
  const config = modelConfigs[modelKey];
  const [previousKey, setPreviousKey] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  //play the Entrance animation
  useEffect(() => {
    if (mainGroup.current && (!isLoaded || previousKey !== modelKey)) {
      // Position initiale
      mainGroup.current.position.y = -10;
      mainGroup.current.scale.set(0.5, 0.5, 0.5);
      
      const timeline = gsap.timeline();
      
      timeline.to(mainGroup.current.position, {
        y: 0,
        duration: 1,
        ease: "back.out(1.5)"
      });
      
      timeline.to(mainGroup.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1,
        ease: "back.out(1.5)",
        onComplete: () => {
          setIsLoaded(true);
          setPreviousKey(modelKey);
        }
      }, "-=0.8"); // starts before the position animation is finished
      
      startAnimation();
    }
  }, [modelKey, isLoaded]);
  
  // Effect to manage model changes
  useEffect(() => {
    if (mainGroup.current && previousKey !== null && previousKey !== modelKey) {
      const timeline = gsap.timeline();
      
      //Make the current model disappear
      timeline.to(mainGroup.current.scale, {
        x: 0.9,
        y: 0.9,
        z: 0.9,
        duration: 0.5,
        ease: "power2.out"
      });
      
      // Make the current modelappear
      timeline.to(mainGroup.current.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
        onComplete: () => {
          setPreviousKey(modelKey);
        }
      });
    }
  }, [modelKey]);
  
  return (
    <group ref={mainGroup}>
      <Character ref={characterRef} modelKey={modelKey} />
      <Platform ref={platformRef} url="./models/FileSize.glb" />
    </group>
  );
}
export const CanvasContainer = () => {
  return (
    <Canvas
      camera={{
        fov: 45,
        far: 1000.134,
        near: 0.3,
        position: [2.303, 2.091, 5.028],
        rotation: [0, 0.112, 0.019],
      }}
      shadows
    >
      <OrbitControls
        enablePan={true}
        enableRotate={true}
        enableZoom={false}
      />
      <Suspense fallback={null}>
        <AnimationProvider>
          <SceneManager />
        </AnimationProvider>
      </Suspense>
      <Environment preset="city"/>
      <Environment blur={0.8} background>
          <Sphere scale={15}>
            <meshBasicMaterial color={"#47b9a8"} side={THREE.BackSide} />
          </Sphere>
          <Lightformer
            position={[5, 0, -5]}
            form="rect" // circle | ring | rect (optional, default = rect)
            intensity={1} // power level (optional = 1)
            color="red" // (optional = white)
            scale={[3, 5]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 0, 0]}
          />

          <Lightformer
            position={[-5, 0, 1]}
            form="circle" // circle | ring | rect (optional, default = rect)
            intensity={1} // power level (optional = 1)
            color="green" // (optional = white)
            scale={[2, 5]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 0, 0]}
          />

          <Lightformer
            position={[0, 5, -2]}
            form="ring" // circle | ring | rect (optional, default = rect)
            intensity={0.5} // power level (optional = 1)
            color="orange" // (optional = white)
            scale={[10, 5]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 0, 0]}
          />
          <Lightformer
            position={[0, 0, 5]}
            form="rect" // circle | ring | rect (optional, default = rect)
            intensity={1} // power level (optional = 1)
            color="purple" // (optional = white)
            scale={[10, 5]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 0, 0]}
          />
        </Environment>
    </Canvas>
  );
};