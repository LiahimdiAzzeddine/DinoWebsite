import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useState, useRef, useEffect } from 'react';

class Firework {
  constructor(scene, camera) {
    this.scene = scene;
    this.camera = camera;
    this.done = false;
    this.dest = [];
    this.geometry = new THREE.BufferGeometry();
    this.material = new THREE.PointsMaterial({
      size: 2.0, // Taille énorme pour être visible
      vertexColors: true,
      transparent: true,
      opacity: 1.0,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: false, // Taille constante peu importe la distance
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.scene.add(this.points);
    console.log('🎆 Firework créé et ajouté à la scène');
    this.launch();
  }

  launch() {
    // Distribution sur tout l'écran
    const x = THREE.MathUtils.randFloatSpread(8); // Large dispersion horizontale
    const y = THREE.MathUtils.randFloat(-3, 3); // Large dispersion verticale
    const z = THREE.MathUtils.randFloat(-5, -1); // Différentes profondeurs

    const from = new THREE.Vector3(x, y - 1.5, z);
    const to = new THREE.Vector3(x, y + 1.5, z);

    console.log('🚀 Lancement feu d\'artifice:', { from, to });

    this.geometry.setFromPoints([from]);
    this.dest = [to];

    const color = new THREE.Color().setHSL(Math.random(), 1, 0.9);
    const colorArray = new Float32Array([color.r, color.g, color.b]);
    this.geometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
  }

  explode(center) {
    console.log('💥 Explosion à:', center);
    const count = 100; // Encore plus de particules pour couvrir plus d'espace
    const positions = [];
    const colors = [];
    const destinations = [];

    for (let i = 0; i < count; i++) {
      const from = new THREE.Vector3(
        center.x + THREE.MathUtils.randFloatSpread(0.1),
        center.y + THREE.MathUtils.randFloatSpread(0.1),
        center.z + THREE.MathUtils.randFloatSpread(0.1)
      );
      const to = new THREE.Vector3(
        center.x + THREE.MathUtils.randFloatSpread(6.0), // Explosion massive
        center.y + THREE.MathUtils.randFloatSpread(6.0),
        center.z + THREE.MathUtils.randFloatSpread(3.0)
      );
      const color = new THREE.Color().setHSL(Math.random(), 1, 1.0); // Maximum de luminosité

      positions.push(from.x, from.y, from.z);
      colors.push(color.r, color.g, color.b);
      destinations.push(to);
    }

    this.dest = destinations;
    this.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3));
    this.geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3));
  }

  update() {
    const posAttr = this.geometry.getAttribute('position');
    const count = this.dest.length;

    if (count === 0) return;

    if (count === 1) {
      // Phase de montée
      const from = new THREE.Vector3().fromBufferAttribute(posAttr, 0);
      from.lerp(this.dest[0], 0.05); // Vitesse plus lente
      posAttr.setXYZ(0, from.x, from.y, from.z);
      posAttr.needsUpdate = true;

      if (from.distanceTo(this.dest[0]) < 0.2) {
        this.explode(from);
      }
    } else {
      // Phase d'explosion
      for (let i = 0; i < count; i++) {
        const from = new THREE.Vector3().fromBufferAttribute(posAttr, i);
        from.lerp(this.dest[i], 0.02); // Vitesse plus lente
        posAttr.setXYZ(i, from.x, from.y, from.z);
      }
      posAttr.needsUpdate = true;
      this.material.opacity -= 0.005; // Fade très lent pour voir plus longtemps

      if (this.material.opacity <= 0) {
        console.log('🎆 Feu d\'artifice terminé, nettoyage');
        this.scene.remove(this.points);
        this.geometry.dispose();
        this.material.dispose();
        this.done = true;
      }
    }
  }
}

export default function FireworksManager({ isActive = false, intensity = 0.02 }) {
  const { scene, camera } = useThree();
  const [fireworks, setFireworks] = useState([]);
  const fireworksRef = useRef([]);

  console.log('🎆 FireworksManager render:', { isActive, intensity, sceneChildren: scene.children.length });

  // Nettoyer les feux d'artifice quand le composant n'est plus actif
  useEffect(() => {
    if (!isActive) {
      console.log('🧹 Nettoyage des feux d\'artifice');
      fireworksRef.current.forEach(fw => {
        if (fw.points && fw.points.parent) {
          scene.remove(fw.points);
          fw.geometry?.dispose();
          fw.material?.dispose();
        }
      });
      fireworksRef.current = [];
      setFireworks([]);
    } else {
      console.log('🎆 Activation des feux d\'artifice');
    }
  }, [isActive, scene]);

  useFrame(() => {
    if (!isActive) return;

    // Créer des feux d'artifice avec une intensité plus élevée pour les tests
    if (Math.random() < intensity * 5) { // Encore plus d'intensité
      console.log('🎆 Création d\'un nouveau feu d\'artifice');
      const newFirework = new Firework(scene, camera);
      fireworksRef.current.push(newFirework);
      setFireworks(prev => [...prev, newFirework]);
    }

    // Mettre à jour et nettoyer les feux d'artifice
    fireworksRef.current = fireworksRef.current.filter((fw, index) => {
      fw.update();
      if (fw.done) {
        setFireworks(prev => prev.filter((_, i) => i !== index));
        return false;
      }
      return true;
    });
  });

  return null;
}