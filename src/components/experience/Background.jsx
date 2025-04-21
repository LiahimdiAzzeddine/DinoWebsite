import { Environment, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export const Background = () => {
  // Nouvelles couleurs spécifiées
  const colorA = "#fead8b"; // Couleur moins saturée (gauche)
  const colorB = "#f15442"; // Couleur plus saturée (droite)
  
  // Create refs for the materials
  const materialRef = useRef();
  const envMaterialRef = useRef();
  
  // Shader personnalisé avec gradient horizontal (axe X) au lieu de vertical
  const gradientShader = {
    uniforms: {
      colorA: { value: new THREE.Color(colorA) },
      colorB: { value: new THREE.Color(colorB) },
      start: { value: -0.8 }, // Ajusté pour accentuer le gradient
      end: { value: 0.8 },    // Ajusté pour accentuer le gradient
      time: { value: 0 }
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
      uniform float start;
      uniform float end;
      uniform float time;
      varying vec3 vPosition;
      
      void main() {
        // Utilisation de l'axe X (au lieu de Y) pour le gradient horizontal
        float x = normalize(vPosition).x;
        float gradient = smoothstep(start, end, x);
        
        // Augmentation de la saturation du côté droit
        vec3 saturatedColorB = colorB * 1.2; // Augmentation de la saturation
        
        // Mélange des couleurs avec la saturation modifiée
        vec3 finalColor = mix(colorA, saturatedColorB, gradient);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `
  };

  // Animation si nécessaire
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime();
    }
    if (envMaterialRef.current) {
      envMaterialRef.current.uniforms.time.value = clock.getElapsedTime();
    }
  });

  return (
    <>
      {/* Sphère de fond principale */}
      <Sphere scale={[500, 500, 500]} rotation-y={Math.PI / 2}>
        <shaderMaterial 
          ref={materialRef}
          attach="material" 
          args={[gradientShader]}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Sphère d'environnement */}
      <Environment resolution={256}>
        <Sphere
          scale={[100, 100, 100]}
          rotation-y={Math.PI / 2}
          rotation-x={Math.PI}
        >
          <shaderMaterial 
            ref={envMaterialRef}
            attach="material" 
            args={[gradientShader]}
            side={THREE.BackSide}
          />
        </Sphere>
      </Environment>
    </>
  );
};