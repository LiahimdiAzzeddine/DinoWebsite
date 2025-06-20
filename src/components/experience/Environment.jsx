import React, { useContext, useEffect, useRef } from 'react';
import { Environment, useTexture } from "@react-three/drei";
import { AnimationContext } from "./AnimationContext";
import * as THREE from "three";
import { useFrame } from '@react-three/fiber';

export const EnvironmentScene = () => {
  const { currentModel, prevModel } = useContext(AnimationContext);
  const transitionRef = useRef({
    inProgress: false,
    progress: 0,
    duration: 1.8, 
  });

  const environmentConfigs = {
    web1: {
      preset: "sunset",
      intensity: 1.2,
      ambientIntensity: 0.8,
      hemiSkyColor: "#b090ff",
      hemiGroundColor: "#382b5c"
    },
    web2: {
      preset: "city",
      intensity: 2.0,
      ambientIntensity: 1,
      hemiSkyColor: "#fff",
      hemiGroundColor: "#fff"
    },
    web3: {
      preset: "park",
      intensity: 1.3,
      ambientIntensity: 0.9,
      hemiSkyColor: "#a0ffc0",
      hemiGroundColor: "#2d6e41"
    },

  };

  const ambientLightRef = useRef();
  const hemiLightRef = useRef();
  const envRef = useRef();
  
  // Configuration initiale 
  useEffect(() => {
    if (!currentModel) return;
    
    const config = environmentConfigs[currentModel] || environmentConfigs.model1;
    
    if (prevModel && prevModel !== currentModel) {
      transitionRef.current = {
        inProgress: true,
        progress: 0,
        duration: 1.8
      };
    } else {
      if (ambientLightRef.current) {
        ambientLightRef.current.intensity = config.ambientIntensity;
      }
      
      if (hemiLightRef.current) {
        hemiLightRef.current.intensity = config.intensity;
        hemiLightRef.current.skyColor = new THREE.Color(config.hemiSkyColor);
        hemiLightRef.current.groundColor = new THREE.Color(config.hemiGroundColor);
      }
      
      if (envRef.current) {
        envRef.current.intensity = config.intensity;
      }
    }
  }, [currentModel, prevModel]);

  useFrame((state, delta) => {
    if (!currentModel || !transitionRef.current.inProgress) return;
    
    transitionRef.current.progress += delta / transitionRef.current.duration;
    
    if (transitionRef.current.progress >= 1) {
      transitionRef.current.inProgress = false;
      transitionRef.current.progress = 1;
    }
    
    const progress = transitionRef.current.progress;
    const prevConfig = environmentConfigs[prevModel] || environmentConfigs.model1;
    const currentConfig = environmentConfigs[currentModel];
    
    if (ambientLightRef.current) {
      ambientLightRef.current.intensity = THREE.MathUtils.lerp(
        prevConfig.ambientIntensity,
        currentConfig.ambientIntensity,
        progress
      );
    }
    
    if (hemiLightRef.current) {
      hemiLightRef.current.intensity = THREE.MathUtils.lerp(
        prevConfig.intensity,
        currentConfig.intensity,
        progress
      );
      
      const prevSkyColor = new THREE.Color(prevConfig.hemiSkyColor);
      const currentSkyColor = new THREE.Color(currentConfig.hemiSkyColor);
      hemiLightRef.current.skyColor.lerpColors(prevSkyColor, currentSkyColor, progress);
      
      const prevGroundColor = new THREE.Color(prevConfig.hemiGroundColor);
      const currentGroundColor = new THREE.Color(currentConfig.hemiGroundColor);
      hemiLightRef.current.groundColor.lerpColors(prevGroundColor, currentGroundColor, progress);
    }
    
    if (envRef.current) {
      envRef.current.intensity = THREE.MathUtils.lerp(
        prevConfig.intensity,
        currentConfig.intensity,
        progress
      );
    }
  });

  useFrame((state) => {
    if (!currentModel) return;
    
    const breathingFactor = Math.sin(state.clock.elapsedTime * 0.3) * 0.05 + 1;
    
    if (envRef.current) {
      const baseIntensity = environmentConfigs[currentModel].intensity;
      envRef.current.intensity = baseIntensity * breathingFactor;
    }
  });

  return (
    <>
      <ambientLight 
        ref={ambientLightRef}
        intensity={environmentConfigs[currentModel]?.ambientIntensity || 0.8} 
      />
      
      <hemisphereLight
        ref={hemiLightRef}
        skyColor={environmentConfigs[currentModel]?.hemiSkyColor || "#b090ff"}
        groundColor={environmentConfigs[currentModel]?.hemiGroundColor || "#382b5c"}
        intensity={environmentConfigs[currentModel]?.intensity || 1.0}
        position={[0, 10, 0]}
      />
      
      <Environment 
        ref={envRef}
        preset={environmentConfigs[currentModel]?.preset || "sunset"}
        intensity={environmentConfigs[currentModel]?.intensity || 1.0}
      />
    </>
  );
};

export default EnvironmentScene;