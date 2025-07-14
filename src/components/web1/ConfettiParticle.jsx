import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

// Composant pour les particules de confettis
export const ConfettiParticle = ({ position, color, velocity, gravity = -9.8 }) => {
  const meshRef = useRef();
  const [life, setLife] = useState(1);
  
  useFrame((state, delta) => {
    if (!meshRef.current || life <= 0) return;
    
    // Mise à jour de la physique
    velocity.y += gravity * delta;
    meshRef.current.position.add(velocity.clone().multiplyScalar(delta));
    
    // Rotation
    meshRef.current.rotation.x += delta * 5;
    meshRef.current.rotation.y += delta * 3;
    
    // Diminution de la vie
    setLife(prev => prev - delta);
    
    // Fade out
    if (meshRef.current.material) {
      meshRef.current.material.opacity = Math.max(0, life);
    }
  });
  
  if (life <= 0) return null;
  
  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshBasicMaterial color={color} transparent opacity={life} />
    </mesh>
  );
};