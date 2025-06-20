import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const SmokeParticles = ({
  count = 50,
  emitterRef,
  rocketRef,
  geometry,
  material,
  play,
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const worldPosition = useRef(new THREE.Vector3());
  const rocketDirection = useRef(new THREE.Vector3());
  const previousRocketPosition = useRef(new THREE.Vector3());
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [0, 0, 0],
        velocity: [0, 0, 0],
        life: Math.random() * 100,
        maxLife: 100 + Math.random() * 150,
        scale: Math.random() * 0.08 + 0.02,
      });
    }
    return temp;
  }, [count]);

  useFrame((state, delta) => {
    if (!meshRef.current || !emitterRef.current || !rocketRef.current || !play) return;

    // Get world position of emitter
    emitterRef.current.getWorldPosition(worldPosition.current);
    
    // Calculate rocket movement direction
    const currentRocketPosition = new THREE.Vector3();
    rocketRef.current.getWorldPosition(currentRocketPosition);
    
    rocketDirection.current.subVectors(currentRocketPosition, previousRocketPosition.current);
    if (rocketDirection.current.length() > 0) {
      rocketDirection.current.normalize();
    }
    previousRocketPosition.current.copy(currentRocketPosition);

    particles.forEach((particle, i) => {
      // Update position
      particle.position[0] += particle.velocity[0];
      particle.position[1] += particle.velocity[1];
      particle.position[2] += particle.velocity[2];

      // Update life
      particle.life += delta * 30;
      
      if (particle.life > particle.maxLife) {
        // Reset particle at emitter position
        particle.position[0] = worldPosition.current.x + (Math.random() - 0.5) * 0.05;
        particle.position[1] = worldPosition.current.y;
        particle.position[2] = worldPosition.current.z + (Math.random() - 0.5) * 0.05;
        particle.life = 0;
        
        // Set velocity opposite to rocket direction with spread
        const oppositeDirection = rocketDirection.current.clone().negate();
        const spread = 0.3;
        
        particle.velocity[0] = oppositeDirection.x * 0.03 + (Math.random() - 0.5) * spread * 0.02;
        particle.velocity[1] = oppositeDirection.y * 0.03 + (Math.random() - 0.5) * spread * 0.02 - 0.01; // Add slight downward drift
        particle.velocity[2] = oppositeDirection.z * 0.03 + (Math.random() - 0.5) * spread * 0.02;
      }

      // Update visual representation
      const lifeRatio = particle.life / particle.maxLife;
      dummy.position.set(...particle.position);
      dummy.scale.setScalar(particle.scale * (1 + lifeRatio * 0.5));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Color interpolation
      const color = new THREE.Color().lerpColors(
        new THREE.Color(0xbdbbbb), // Birth color
        new THREE.Color(0xffffff), // Death color (bright white)
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
};