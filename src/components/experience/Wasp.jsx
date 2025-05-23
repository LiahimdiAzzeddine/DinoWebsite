/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 ./public/models/Wasp.glb 
*/

import React, { useEffect } from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger)
export function Wasp(props) {
  const group = React.useRef()
  const { scene, animations } = useGLTF('./models/Build02.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions, mixer } = useAnimations(animations, group)
  console.log("🚀 ~ Wasp ~ actions:", actions)
  
  useEffect(() => {
    if (!actions || !mixer) return;
  
    const excludedAnimations = [
      "camera action",
      "metaldoorclose",
      "metaldooropen",
      "metaldoordringaction"
    ];
  
    // Jouer toutes les animations une seule fois, sauf exclusions
    Object.entries(actions).forEach(([name, action]) => {
      const lowerName = name.toLowerCase();
      const isExcluded = excludedAnimations.some(excluded => lowerName.includes(excluded));
  
      if (!isExcluded) {
        action.setLoop(THREE.LoopOnce);
        action.clampWhenFinished = true;
        action.reset();
        action.play();
      }
    });
  
    // Gestion spéciale pour l’animation "camera action"
    const cameraAction = actions['camera action'];
    if (cameraAction) {
      cameraAction.play();
      cameraAction.paused = true;
  
      const duration = cameraAction.getClip().duration;
  
      ScrollTrigger.create({
        trigger: '#section5',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          cameraAction.time = progress *2* duration;
          mixer.update(0); // force l’update de la frame courante
        },
      });
    }
  
  }, [actions, mixer]);
  


  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Sketchfab_model" position={[0, -0.313, 0]} scale={0}>
          <group name="RootNode" position={[0, -2, 0]} scale={0}>
            <group name="Object_4" position={[0, -2, 0]} scale={0} />
            <group name="Object_16" position={[0, -2, 0]} scale={0} />
            <group name="Object_22" position={[0, -2, 0]} scale={0} />
            <group name="Object_7" position={[0, -2, 0]} scale={0} />
            <group name="Object_10" position={[0, -2, 0]} scale={0} />
            <group name="Object_19" position={[0, -2, 0]} scale={0} />
            <group name="Object_13" position={[0, -2, 0]} scale={0} />
          </group>
        </group>
        <group
          name="Sketchfab_model001"
          position={[0, 0.184, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.378}
        />
        <group name="cute_characterfbx" position={[0, 0.184, 0]} scale={0.004} />
        <group name="RootNode001" position={[0, 0.184, 0]} scale={0.004} />
        <group name="Cube" position={[0, 0.184, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={0.756} />
        <group name="Cylinder" position={[0, -0.313, 0]} scale={0} />
        <group
          name="Cube001"
          position={[0, 0.184, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.756}
        />
        <group
          name="Sphere"
          position={[0, 0.184, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.378}
        />
        <group
          name="Sphere001"
          position={[0, 0.184, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.378}
        />
        <group
          name="Cube002"
          position={[0, 0.184, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.355}
        />
        <group
          name="Cube012"
          position={[0, 0.184, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.378}
        />
        <group
          name="NurbsPath009"
          position={[-0.291, -0.129, -0.72]}
          rotation={[0.036, 0.59, 1.428]}
          scale={0.039}
        />
        <group name="ShaderObjects" position={[0, -3.367, 0]} scale={0} />
        <mesh
          name="Quad"
          castShadow
          receiveShadow
          geometry={nodes.Quad.geometry}
          material={materials['Material.009']}
          position={[2.977, 2.862, 0.62]}
          rotation={[-Math.PI, 0.862, -Math.PI]}
          scale={[6.275, 3.523, 3.523]}
        />
        <mesh
          name="MoviePanel"
          castShadow
          receiveShadow
          geometry={nodes.MoviePanel.geometry}
          material={materials.Metal}
          position={[3.003, 2.866, 0.597]}
          rotation={[0, -0.862, 0]}
          scale={[1.594, 1.574, 1.055]}
        />
        <mesh
          name="MetalDoorDring"
          castShadow
          receiveShadow
          geometry={nodes.MetalDoorDring.geometry}
          material={materials.Metal}
          position={[0, -0.858, 0]}>
          <mesh
            name="MetalDoor1"
            castShadow
            receiveShadow
            geometry={nodes.MetalDoor1.geometry}
            material={materials.Metal}
            position={[1.511, 0.155, 0]}
          />
          <mesh
            name="MetalDoor2"
            castShadow
            receiveShadow
            geometry={nodes.MetalDoor2.geometry}
            material={materials.Metal}
            position={[-1.511, 0.155, 0]}
            rotation={[Math.PI, 0, Math.PI]}
          />
        </mesh>
        <mesh
          name="GroundCylinderTransparent_1001"
          castShadow
          receiveShadow
          geometry={nodes.GroundCylinderTransparent_1001.geometry}
          material={materials.OpaqueGround_CustomShaders_Mat}
          position={[0, -3.021, 0]}
          scale={[0.915, 1, 0.915]}
        />
        <group name="Wasp" position={[0, 1.372, 0]} scale={0.044}>
          <mesh
            name="Cylinder002"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder002.geometry}
            material={materials.Yellow}
          />
          <mesh
            name="Cylinder002_1"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder002_1.geometry}
            material={materials.Black}
          />
          <mesh
            name="Cylinder002_2"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder002_2.geometry}
            material={materials.LightBlue}
          />
          <mesh
            name="Cylinder002_3"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder002_3.geometry}
            material={materials.Orange}
          />
        </group>
        <group name="All" position={[0, -2.256, 0]} scale={1.326}>
          <mesh
            name="Circle_Material_0"
            castShadow
            receiveShadow
            geometry={nodes.Circle_Material_0.geometry}
            material={materials['Material.002']}
            position={[0, -0.396, 0]}
            scale={0}
          />
          <mesh
            name="Cube001_Material_0"
            castShadow
            receiveShadow
            geometry={nodes.Cube001_Material_0.geometry}
            material={materials['Material.002']}
            position={[0, -0.396, 0]}
            scale={0}
          />
          <mesh
            name="Cube002_Material_0"
            castShadow
            receiveShadow
            geometry={nodes.Cube002_Material_0.geometry}
            material={materials['Material.002']}
            position={[0, -0.018, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={-0.002}
          />
          <mesh
            name="Cube012_Material_0"
            castShadow
            receiveShadow
            geometry={nodes.Cube012_Material_0.geometry}
            material={materials['Material.002']}
            position={[0, -0.379, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[0.024, 0.024, 0.015]}
          />
          <mesh
            name="Cube012_Material_0001"
            castShadow
            receiveShadow
            geometry={nodes.Cube012_Material_0001.geometry}
            material={materials['Material.002']}
            position={[0, -0.396, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[0.003, 0.003, 0]}
          />
          <mesh
            name="Cube_Material001_0"
            castShadow
            receiveShadow
            geometry={nodes.Cube_Material001_0.geometry}
            material={materials['Material.001']}
            position={[0, -0.396, 0]}
            rotation={[-Math.PI / 2, 0, -Math.PI]}
            scale={[-0.007, -0.007, 0]}
          />
          <mesh
            name="Cylinder_Material004_0"
            castShadow
            receiveShadow
            geometry={nodes.Cylinder_Material004_0.geometry}
            material={materials['Material.004']}
            position={[0, -0.396, 0]}
            scale={0}
          />
          <mesh
            name="Sphere001_Material003_0"
            castShadow
            receiveShadow
            geometry={nodes.Sphere001_Material003_0.geometry}
            material={materials['Material.005']}
            position={[0, -0.396, 0]}
            scale={0}
          />
          <mesh
            name="Sphere_Material002_0"
            castShadow
            receiveShadow
            geometry={nodes.Sphere_Material002_0.geometry}
            material={materials['Material.003']}
            position={[0, -0.396, 0]}
            scale={0}
          />
        </group>
        <mesh
          name="Cylinder001"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder001.geometry}
          material={materials['Material.007']}
          position={[0, -2.919, 0]}
          scale={2.164}
        />
        <PerspectiveCamera
          name="Camera"
          makeDefault={true}
          far={1000}
          near={0.1}
          fov={31.006}
          position={[10.987, 5.839, 18.583]}
          rotation={[-0.272, 0.31, 0.085]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('./models/Build02.glb')
