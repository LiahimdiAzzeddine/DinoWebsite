import { useContext, useEffect, useMemo, useRef } from "react";
import { AnimationContext } from "./AnimationContext";
import MODEL_CONFIGS from "./MODEL_CONFIGS";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';

const GradientSkybox = () => {
  const { scene } = useThree();
  const { currentModel } = useContext(AnimationContext);
  
  // Color references
  const colorA = useRef(new THREE.Color(MODEL_CONFIGS.Model1.colorA));
  const colorB = useRef(new THREE.Color(MODEL_CONFIGS.Model1.colorB));
  const targetA = useRef(new THREE.Color(MODEL_CONFIGS.Model1.colorA));
  const targetB = useRef(new THREE.Color(MODEL_CONFIGS.Model1.colorB));
  
  // Skybox creation
  const skybox = useMemo(() => {
    const geometry = new THREE.SphereGeometry(20, 32, 32);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        colorA: { value: colorA.current },
        colorB: { value: colorB.current },
        brightness: { value: 1 },  // Beaucoup plus lumineux
        contrast: { value: 1 }     // Pour garder le contraste
      },
      vertexShader: `
        varying vec3 vPosition;
        void main() {
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 colorA;
        uniform vec3 colorB;
        uniform float brightness;
        uniform float contrast;
        varying vec3 vPosition;
        
        // Function to adjust color brightness and ensure vivid colors
        vec3 adjustColor(vec3 color, float bright) {
          // First amplify the color
          vec3 brightColor = color * bright;
          
          // Calculate perceived luminance (human eye sensitivity)
          float luminance = 0.299 * brightColor.r + 0.587 * brightColor.g + 0.114 * brightColor.b;
          
          // Boost saturation by mixing with luminance
          vec3 saturated = mix(vec3(luminance), brightColor, 1.3);
          
          // Ensure we don't exceed limits
          return clamp(saturated, 0.0, 1.0);
        }
        
        void main() {
          // Normalize position and use y-coordinate for gradient
          vec3 normal = normalize(vPosition);
          
          // Create gradient with improved transition
          float factor = pow(normal.y * 0.5 + 0.5, contrast);
          
          // Mix colors with original dominance
          vec3 baseColor = mix(colorA, colorB, factor);
          
          // Make colors much brighter and more vivid
          vec3 finalColor = adjustColor(baseColor, brightness);
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      side: THREE.BackSide,
      depthWrite: false
    });
    
    return new THREE.Mesh(geometry, material);
  }, []);
  
  // Setup and cleanup
  useEffect(() => {
    // Ajouter une lumière directionnelle plus puissante pour éclairer la scène
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(1, 1, 1);
    
    // Ajouter une lumière ambiante plus forte
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    
    scene.add(skybox);
    scene.add(directionalLight);
    scene.add(ambientLight);
    
    return () => {
      scene.remove(skybox);
      scene.remove(directionalLight);
      scene.remove(ambientLight);
    };
  }, [scene, skybox]);
  
  // Update colors when model changes
  useEffect(() => {
    if (MODEL_CONFIGS[currentModel]) {
      // Éclaircir légèrement les couleurs cibles
      const modelColorA = new THREE.Color(MODEL_CONFIGS[currentModel].colorA);
      const modelColorB = new THREE.Color(MODEL_CONFIGS[currentModel].colorB);
      
      // Rendre les couleurs légèrement plus vives dès le départ
      modelColorA.multiplyScalar(1.2);
      modelColorB.multiplyScalar(1.2);
      
      targetA.current.copy(modelColorA);
      targetB.current.copy(modelColorB);
    }
  }, [currentModel]);
  
  // Smooth color transitions
  useFrame(() => {
    colorA.current.lerp(targetA.current, 0.01);
    colorB.current.lerp(targetB.current, 0.01);
    
    if (skybox.material && skybox.material.uniforms) {
      skybox.material.uniforms.colorA.value = colorA.current;
      skybox.material.uniforms.colorB.value = colorB.current;
    }
  });

  return null;
};

export default GradientSkybox;