import * as THREE from "three"
import React, {useRef } from "react"
import { useFrame } from "@react-three/fiber"

export default function Rig({ children }) {
  const outer = useRef()
  useFrame(({clock }) => {
    const t = clock.getElapsedTime()
    outer.current.position.y = THREE.MathUtils.lerp(outer.current.position.y, 0, 0.05)
  })
  return (
    <group position={[0, -0.5, 0]} ref={outer}>
      {children}
    </group>
  )
}