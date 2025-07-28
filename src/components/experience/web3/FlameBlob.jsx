import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";


export function FlameBlob({ position = [0, -3.5, 0], scale = 1.1 }) {
  const meshRef = useRef()

  const geometry = useMemo(() => {
    const baseGeo = new THREE.SphereGeometry(1, 64, 64)
    const positionAttr = baseGeo.attributes.position
    const vertex = new THREE.Vector3()

    for (let i = 0; i < positionAttr.count; i++) {
      vertex.fromBufferAttribute(positionAttr, i)

      // Remap Y from [-1, 1] to [0, 1]
      const y = (vertex.y + 1) / 2

      // Apply scale to X and Z to make bottom thin, top wide
      const scaleXZ = 0.3 + y * 0.7 // from 0.3 to 1
      vertex.x *= scaleXZ
      vertex.z *= scaleXZ

      // Update geometry
      positionAttr.setXYZ(i, vertex.x, vertex.y, vertex.z)
    }

    positionAttr.needsUpdate = true
    baseGeo.computeVertexNormals()

    return baseGeo
  }, [])

  // Optional animation (pulse)
  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime()

      // Animation de pulsation verticale (comme tu avais)
      meshRef.current.scale.y = 1 + Math.sin(t * 3) * 0.1

      // Variation dynamique de couleur et de lumière
      const mat = meshRef.current.material

      // Légère variation de la teinte (HSL)
      const hue = 0.08 + Math.sin(t * 0.5) * 0.02 // entre ~0.06 et 0.1
      mat.color.setHSL(hue, 1, 0.5)

      // Variation de l'intensité lumineuse (emissive)
      mat.emissiveIntensity = 0.5 + Math.sin(t * 4) * 0.2
    }
  })


  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial
        color="orange"
        emissive="yellow"
        emissiveIntensity={0.6}
        roughness={0.3}
        metalness={0.2}
      />
    </mesh>
  )
}