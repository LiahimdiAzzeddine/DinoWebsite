import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Observer } from "gsap/Observer";


export const SmokeParticles = ({ rocketRef, isActive }) => {
  const groupRef = useRef()
  const maxParticles = 300
const scrollVelocityRef = useRef(0);
Observer.create({
  type: "wheel,touch,scroll",
  target: window,
  onChangeY: (self) => {
    scrollVelocityRef.current = self.velocityY;
  },
  onStop: () => {
    scrollVelocityRef.current = 0;
  }
});


  const particles = useMemo(() => {
    return new Array(maxParticles).fill().map(() => {
      const scale = 0.1 + Math.random() * 0.8
      const geometry = new THREE.SphereGeometry(scale, 6 + Math.floor(Math.random() * 6), 6)
      const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 1, // Sans reflets
        metalness: 0,
        transparent: true,
        opacity: 1,
        depthWrite: false
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.visible = false
      mesh.userData = {
        life: 0,
        maxLife: 30 + Math.random() * 40,
        expansion: 1 + Math.random() * 0.3,
        fixedWorldPosition: new THREE.Vector3(),
        initialScale: 0.8 + Math.random() * 0.4,
        // Ajout d'un flag pour savoir si la particule est active
        isActive: false
      }
      return mesh
    })
  }, [])

  useEffect(() => {
    particles.forEach(p => groupRef.current.add(p))
  }, [particles])

  useFrame(() => {
const scrollVelocity = scrollVelocityRef.current;

    if (!groupRef.current || !rocketRef.current) return

    const particlesToSpawn = scrollVelocity == 0 ? 1 : Math.floor(Math.random() * 10) + 10;
    if (scrollVelocity >= -500 &&isActive) {
      for (let i = 0; i < particlesToSpawn; i++) {
        if (Math.random() < 0.8) {
          // Trouver une particule inactive au lieu d'utiliser un index fixe
          const availableParticle = particles.find(p => !p.userData.isActive)

          if (availableParticle) {
            const p = availableParticle
            p.visible = true
            p.userData.isActive = true

            // Position initiale avec plus de variation pour créer plusieurs nuages
            const initialPos = new THREE.Vector3(
              (Math.random() - 0.5) * 1.5, // Plus de spread horizontal
              (Math.random() - 0.7) * 0.3, // Petit spread vertical
              (Math.random() - 0.5) * 1.5  // Plus de spread en profondeur
            )

            // Convertir en position mondiale et la FIXER pour toujours
            groupRef.current.localToWorld(initialPos)
            p.userData.fixedWorldPosition.copy(initialPos)

            p.material.opacity = 0.8 + Math.random() * 0.2
            p.userData.life = 0
            p.scale.setScalar(p.userData.initialScale)
          }
        }
      }
      
    }

    // Update active particles
    particles.forEach(p => {
      if (!p.userData.isActive) return

      p.userData.life += 1
      const lifeRatio = p.userData.life / p.userData.maxLife

      // Convertir la position mondiale FIXE en position locale pour l'affichage
      const localPos = p.userData.fixedWorldPosition.clone();
      groupRef.current.worldToLocal(localPos);
    

      p.position.copy(localPos);

      // Scale expansion (fumée qui s'étale)
      const scaleMultiplier = (scrollVelocity == 0 ? 0.45 : 0.45) + (lifeRatio * p.userData.expansion)
      p.scale.setScalar(p.userData.initialScale * scaleMultiplier)

      // Opacity fade
      p.material.opacity = (1 - Math.pow(lifeRatio, 2))

      // Color change (fumée qui se refroidit)
      const grayValue = 0.9 - lifeRatio * 0.2
      // p.material.color.setRGB(grayValue, grayValue, grayValue)

      if (p.userData.life >= p.userData.maxLife) {
        p.visible = false
        p.userData.isActive = false // Marquer comme inactive pour pouvoir être réutilisée
      }
    })
  })

  return <group position-y={-3.5} ref={groupRef} />
}