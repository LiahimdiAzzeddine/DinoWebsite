import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
const PARTICLE_CONFIG = {
  count: 150,
  position: [0, -3.5, 0],
  velocityRange: 0.02,
  lifeRange: [100, 200],
  scaleRange: [0.2, 0.7],
  deltaMultiplier: 30,
  colors: {
    birth: 0xbdbbbb,
    death: 0xffffff,
  },
};

// Optimized SmokeParticles component
export default function SmokeParticles({ count, position, geometry, material }) {
  const meshRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          position[0] + (Math.random() - 0.5) * 0.1,
          position[1],
          position[2] + (Math.random() - 0.5) * 0.1,
        ],
        velocity: [
          (Math.random() - 0.5) * PARTICLE_CONFIG.velocityRange,
          -(Math.random() * 0.05 + 0.02),
          (Math.random() - 0.5) * PARTICLE_CONFIG.velocityRange,
        ],
        life: Math.random() * PARTICLE_CONFIG.lifeRange[0],
        maxLife: PARTICLE_CONFIG.lifeRange[0] + Math.random() * PARTICLE_CONFIG.lifeRange[1],
        scale: Math.random() * PARTICLE_CONFIG.scaleRange[1] + PARTICLE_CONFIG.scaleRange[0],
      });
    }
    return temp;
  }, [count, position]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    particles.forEach((particle, i) => {
      // Update position
      particle.position[0] += particle.velocity[0];
      particle.position[1] += particle.velocity[1];
      particle.position[2] += particle.velocity[2];

      // Update life
      particle.life += delta * PARTICLE_CONFIG.deltaMultiplier;

      if (particle.life > particle.maxLife) {
        // Reset particle
        particle.position[0] = position[0] + (Math.random() - 0.5) * 0.1;
        particle.position[1] = position[1];
        particle.position[2] = position[2] + (Math.random() - 0.5) * 0.1;
        particle.life = 0;
        particle.velocity[0] = (Math.random() - 0.5) * PARTICLE_CONFIG.velocityRange;
        particle.velocity[1] = -(Math.random() * 0.05 + 0.02);
        particle.velocity[2] = (Math.random() - 0.5) * PARTICLE_CONFIG.velocityRange;
      }

      // Update visual properties
      const lifeRatio = particle.life / particle.maxLife;
      dummy.position.set(...particle.position);
      dummy.scale.setScalar(particle.scale * (1 + lifeRatio * 2));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      const color = new THREE.Color().lerpColors(
        new THREE.Color(PARTICLE_CONFIG.colors.birth),
        new THREE.Color(PARTICLE_CONFIG.colors.death),
        lifeRatio
      );

      meshRef.current.setColorAt(i, color);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, count]}
    />
  );
}