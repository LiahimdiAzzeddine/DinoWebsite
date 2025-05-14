// ConfettiSystem.jsx
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ConfettiSystem({ count = 200 }) {
  const meshRef = useRef();

  const confetti = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 10,
          Math.random() * 5 + 5,
          (Math.random() - 0.5) * 10
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          -Math.random() * 0.1,
          (Math.random() - 0.5) * 0.1
        ),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
        color: new THREE.Color(`hsl(${Math.random() * 360}, 100%, 50%)`)
      });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    confetti.forEach((particle, i) => {
      particle.position.add(particle.velocity);
      particle.rotation += particle.rotationSpeed;

      if (particle.position.y < -2) {
        particle.position.y = Math.random() * 5 + 5;
      }

      const dummy = new THREE.Object3D();
      dummy.position.copy(particle.position);
      dummy.rotation.set(0, 0, particle.rotation);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
      meshRef.current.setColorAt(i, particle.color);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[null, null, count]}
      castShadow
      receiveShadow
    >
      <planeGeometry args={[0.1, 0.2]} />
      <meshBasicMaterial vertexColors />
    </instancedMesh>
  );
}
