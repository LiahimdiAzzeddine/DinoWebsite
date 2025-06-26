import { useContext, useEffect, useMemo, useRef } from "react";
import { AnimationContext } from "./AnimationContext";
import MODEL_CONFIGS from "./MODEL_CONFIGS";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';

export default function GradientSkybox() {
  const { scene } = useThree();
  const { currentModel } = useContext(AnimationContext);

  // Références des couleurs
  const colorA = useRef(new THREE.Color());
  const colorB = useRef(new THREE.Color());
  const targetA = useRef(new THREE.Color());
  const targetB = useRef(new THREE.Color());

  // Skybox shader
  const skybox = useMemo(() => {
    const geometry = new THREE.SphereGeometry(100, 64, 64); // Taille augmentée
    const material = new THREE.ShaderMaterial({
      uniforms: {
        colorA: { value: colorA.current },
        colorB: { value: colorB.current },
        brightness: { value: 1.0 },
        contrast: { value: 1.0 }
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

        vec3 adjustColor(vec3 color, float bright) {
          vec3 brightColor = color * bright;
          float luminance = 0.299 * brightColor.r + 0.587 * brightColor.g + 0.114 * brightColor.b;
          vec3 saturated = mix(vec3(luminance), brightColor, 1.3);
          return clamp(saturated, 0.0, 1.0);
        }

        void main() {
          vec3 normal = normalize(vPosition);

          // Nouvelle distribution plus naturelle du gradient vertical
          float factor = smoothstep(0.0, 1.0, normal.y * 0.5 + 0.5);

          vec3 baseColor = mix(colorA, colorB, factor);
          vec3 finalColor = adjustColor(baseColor, brightness);
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      side: THREE.BackSide,
      depthWrite: false,
    });

    return new THREE.Mesh(geometry, material);
  }, []);

  // Ajout à la scène
  useEffect(() => {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(1, 1, 1);
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

  // Met à jour les couleurs en fonction du modèle actif
  useEffect(() => {
    let config = MODEL_CONFIGS[currentModel];
    if (config) {
      const modelColorA = new THREE.Color(config.colorA).multiplyScalar(1.1); // léger boost
      const modelColorB = new THREE.Color(config.colorB).multiplyScalar(1.1);
      targetA.current.copy(modelColorA);
      targetB.current.copy(modelColorB);
    }else{
 config = MODEL_CONFIGS[1];
 const modelColorA = new THREE.Color(config.colorA).multiplyScalar(1.1); // léger boost
      const modelColorB = new THREE.Color(config.colorB).multiplyScalar(1.1);
      targetA.current.copy(modelColorA);
      targetB.current.copy(modelColorB);
    }
  }, [currentModel]);

  // Interpolation douce
  useFrame(() => {
    colorA.current.lerp(targetA.current, 0.03);
    colorB.current.lerp(targetB.current, 0.03);

    if (skybox.material?.uniforms) {
      skybox.material.uniforms.colorA.value = colorA.current;
      skybox.material.uniforms.colorB.value = colorB.current;
    }
  });

  return null;
};

