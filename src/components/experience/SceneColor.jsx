import { useContext, useRef, useEffect, useState } from "react";
import { AnimationContext } from "./AnimationContext";
import MODEL_CONFIGS from "./MODEL_CONFIGS";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";

export const SceneColor = () => {
  const { currentModel } = useContext(AnimationContext);
  const { scene } = useThree();
  const [gradientColors, setGradientColors] = useState({});
  const mixFactorRef = useRef(0);
  const targetColorRef = useRef(new THREE.Color(MODEL_CONFIGS[currentModel]?.sectioncolor || 0x9a70e7));
  const currentColorRef = useRef(new THREE.Color(MODEL_CONFIGS[currentModel]?.sectioncolor || 0x9a70e7));
  
  useEffect(() => {
    const colorGradients = {
      model1: {
        primary: new THREE.Color(0x70b0e7), 
        secondary: new THREE.Color(0x3864c9),  
        accent: new THREE.Color(0xb0d3ff)      
      },
      TrongCom: {
        primary: new THREE.Color(0x9a70e7),  
        secondary: new THREE.Color(0x6a38c9),   
        accent: new THREE.Color(0xd3b0ff) 
    
      },
      model4: {
        primary: new THREE.Color(0x70e7b0),  
        secondary: new THREE.Color(0x38c964),  
        accent: new THREE.Color(0xb0ffd3) 
      },
      OldMacDonald: {
        primary: new THREE.Color(0xe7b070),  
        secondary: new THREE.Color(0xc96438),  
        accent: new THREE.Color(0xffd3b0)  
      }
    };
    
    setGradientColors(colorGradients);
    
    if (currentModel && colorGradients[currentModel]) {
      targetColorRef.current = colorGradients[currentModel].primary;
    } else {
      targetColorRef.current = new THREE.Color(MODEL_CONFIGS[currentModel]?.sectioncolor || 0x9a70e7);
    }
    
    mixFactorRef.current = 0;
    
  }, [currentModel]);

  useFrame((state, delta) => {
    if (mixFactorRef.current < 1) {
      mixFactorRef.current += delta * 0.5;
      
      if (mixFactorRef.current > 1) mixFactorRef.current = 1;
      
      currentColorRef.current.lerp(targetColorRef.current, mixFactorRef.current);
      
      scene.background = currentColorRef.current.clone();
      
      if (scene.fog) {
        scene.fog.color = currentColorRef.current.clone();
      } else {
        scene.fog = new THREE.Fog(
          currentColorRef.current.clone(),
          10,
          60
        );
      }
    }
    
    // Effet de pulsation légère pour la couleur d'ambiance
    if (currentModel && gradientColors[currentModel]) {
      const pulseFactor = Math.sin(state.clock.elapsedTime * 0.5) * 0.15 + 0.85;
      const pulseColor = currentColorRef.current.clone().lerp(
        gradientColors[currentModel].accent,
        pulseFactor * 0.2
      );
      
      scene.background = pulseColor;
      if (scene.fog) scene.fog.color = pulseColor;
    }
  });

  useEffect(() => {
    if (!currentModel || !gradientColors[currentModel]) return;
    
    scene.children = scene.children.filter(child => 
      !(child instanceof THREE.AmbientLight || child instanceof THREE.HemisphereLight)
    );
    
    const hemisphereLight = new THREE.HemisphereLight(
      gradientColors[currentModel].accent.getHex(),
      gradientColors[currentModel].secondary.getHex(),
      0.8
    );
    scene.add(hemisphereLight);
    
  }, [currentModel, gradientColors, scene]);

  return (
    <>
    </>
  );
};

export default SceneColor;