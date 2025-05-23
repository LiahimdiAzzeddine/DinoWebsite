/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 ./public/models/model4.glb 
*/

import React, { useEffect } from 'react'
import { useGraph } from '@react-three/fiber'
import { useGLTF, PerspectiveCamera, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
export function Model4(props) {
  const group = React.useRef()
  const { scene, animations } = useGLTF('./models/model4.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions, mixer } = useAnimations(animations, group);
  console.log("🚀 ~ Model4 ~ actions:", actions['CameraAction.001'])

  useEffect(() => {
    if (!actions || !mixer || !actions['CameraAction.001']) return;

    const action = actions['CameraAction.001'];
    const duration = action.getClip().duration;

    action.play();
    action.paused = true; // We manually control time

    const trigger = ScrollTrigger.create({
      trigger: '#section6',
      start: 'top bottom',
      end: 'top top',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        action.time = progress * duration;
        mixer.update(0); // Force refresh of frame
      },
    });

    // Cleanup ScrollTrigger on unmount
    return () => {
      trigger.kill();
    };
  }, [actions, mixer]);

  return (
    <group ref={group} {...props} dispose={null} position={[-5,0,0]}>
      <group name="tex">
        <group name="EmptyHead002" position={[7.379, 0.785, -0.04]} rotation={[Math.PI / 2, 0, 0]} scale={[0.011, 0.009, 0.008]} />
        <group name="EmptyGlasses006" position={[7.379, 0.785, -0.04]} rotation={[Math.PI / 2, 0, 0]} scale={[0.011, 0.009, 0.008]} />
        <group name="Character_Female_Preset_11001" position={[7.379, 0.785, -0.04]} rotation={[Math.PI / 2, 0, 0]} scale={[0.011, 0.009, 0.008]} />
        <group name="Artist02" position={[2.028, 4.211, -5.972]} rotation={[-Math.PI, 1.211, -Math.PI]} scale={0.736}>
          <group name="Armature006" rotation={[Math.PI / 2, 0, 0]} scale={0.011}>
            <primitive object={nodes.mixamorigHips} />
            <skinnedMesh name="HANDS_01_1006" geometry={nodes.HANDS_01_1006.geometry} material={materials['Modular_Characters.007']} skeleton={nodes.HANDS_01_1006.skeleton} />
          </group>
        </group>
        <group name="Character_Male_Preset_02002" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group name="EmptyBeard004" />
          <group name="EmptyGlasses007" />
          <group name="EmptyHair004" />
          <group name="EmptyHat004" />
        </group>
        <group name="Armature001" position={[-2.835, 3.092, -4.866]} rotation={[1.597, 0.029, 0.11]} scale={0.008}>
          <primitive object={nodes.mixamorigHips_1} />
          <group name="GLASSES_03_2">
            <skinnedMesh name="Scene139" geometry={nodes.Scene139.geometry} material={materials['Modular_Characters.008']} skeleton={nodes.Scene139.skeleton} />
            <skinnedMesh name="Scene139_1" geometry={nodes.Scene139_1.geometry} material={materials['Modular_Characters_Transparent.002']} skeleton={nodes.Scene139_1.skeleton} />
          </group>
        </group>
        <group name="WALKING" position={[0.724, 4.212, -5.373]} scale={0.802} />
        <group name="NurbsPath" position={[0.724, 4.212, -3.488]} rotation={[0, Math.PI / 2, 0]} />
        <group name="Character_Female_Preset_06001" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group name="EmptyGlasses008" />
          <group name="EmptyHead003" />
        </group>
        <group name="Woman" position={[-3.441, 3.055, 2.547]} rotation={[Math.PI, -1.125, Math.PI]} scale={0.738}>
          <group name="Armature005" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <primitive object={nodes.mixamorigHips_2} />
            <skinnedMesh name="SHOES_06_1002" geometry={nodes.SHOES_06_1002.geometry} material={materials['Modular_Characters.001']} skeleton={nodes.SHOES_06_1002.skeleton} />
          </group>
        </group>
        <group name="Character_Male_Preset_05001" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group name="EmptyBeard005" />
          <group name="EmptyGlasses009" />
          <group name="EmptyHair005" />
          <group name="EmptyHat005" />
        </group>
        <group name="Bosse" position={[-2.324, 3.233, -6.839]} rotation={[0, 0.01, -0.015]} scale={0.718}>
          <group name="Armature007" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <primitive object={nodes.mixamorigHips_3} />
            <skinnedMesh name="BEARD_04_2001" geometry={nodes.BEARD_04_2001.geometry} material={materials['Modular_Characters.006']} skeleton={nodes.BEARD_04_2001.skeleton} />
          </group>
        </group>
        <group name="Character_Male_Preset_16" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <group name="EmptyBeard006" />
          <group name="EmptyGlasses010" />
          <group name="EmptyHair006" />
          <group name="EmptyHat006" />
        </group>
        <group name="Arstist03" position={[-3.345, 3.095, 1.783]} rotation={[0, -0.564, 0]} scale={0.76}>
          <group name="Armature008" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <primitive object={nodes.mixamorigHips_4} />
            <skinnedMesh name="HANDS_01_1007" geometry={nodes.HANDS_01_1007.geometry} material={materials['Modular_Characters.009']} skeleton={nodes.HANDS_01_1007.skeleton} />
          </group>
        </group>
        <group name="WALLdesing02" rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <group name="design03" rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <group name="pcgamer" position={[-22.886, 0, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <group name="Sketchfab_model" position={[4.154, 6.413, 2.885]} rotation={[-Math.PI / 2, 0, -0.805]} scale={0.319} />
        <group name="Collada_visual_scene_group" position={[4.154, 6.413, 2.885]} rotation={[0, -0.805, 0]} scale={0.319} />
        <group name="Object_2" position={[4.154, 6.413, 2.885]} rotation={[0, -0.805, 0]} scale={0.319}>
          <primitive object={nodes._rootJoint} />
        </group>
        <group name="Sketchfab_model001" position={[4.205, 6.632, 3.685]} rotation={[-Math.PI / 2, 0, 2.959]} scale={0.316}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="world_0">
                <group name="geometry_0_1">
                  <mesh name="Object_5" geometry={nodes.Object_5.geometry} material={materials.material_0} position={[0.255, 0.026, 0.03]} />
                </group>
              </group>
            </group>
          </group>
        </group>
        <group name="EmptyHair" position={[7.379, 0.785, -0.04]} rotation={[Math.PI / 2, 0, 0]} scale={[0.011, 0.009, 0.008]} />
        <group name="EmptyHat" position={[7.379, 0.785, -0.04]} rotation={[Math.PI / 2, 0, 0]} scale={[0.011, 0.009, 0.008]} />
        <group name="EmptyGlasses" position={[7.379, 0.785, -0.04]} rotation={[Math.PI / 2, 0, 0]} scale={[0.011, 0.009, 0.008]} />
        <group name="EmptyBeard" position={[7.379, 0.785, -0.04]} rotation={[Math.PI / 2, 0, 0]} scale={[0.011, 0.009, 0.008]} />
        <group name="Character_Male_Preset_02" position={[7.379, 0.785, -0.04]} rotation={[Math.PI / 2, 0, 0]} scale={[0.011, 0.009, 0.008]} />
        <group name="EmptyHair001" position={[7.379, 0.785, -0.04]} rotation={[Math.PI / 2, 0, 0]} scale={[0.011, 0.009, 0.008]} />
        <group name="EmptyHat001" position={[7.379, 0.785, -0.04]} rotation={[Math.PI / 2, 0, 0]} scale={[0.011, 0.009, 0.008]} />
        <group name="EmptyGlasses001" position={[7.379, 0.785, -0.04]} rotation={[Math.PI / 2, 0, 0]} scale={[0.011, 0.009, 0.008]} />
        <group name="EmptyBeard001" position={[7.379, 0.785, -0.04]} rotation={[Math.PI / 2, 0, 0]} scale={[0.011, 0.009, 0.008]} />
        <group name="Character_Male_Preset_02001" position={[7.379, 0.785, -0.04]} rotation={[Math.PI / 2, 0, 0]} scale={[0.011, 0.009, 0.008]} />
        <group name="EmptyHair002" position={[7.379, 0.785, -0.04]} rotation={[Math.PI / 2, 0, 0]} scale={[0.011, 0.009, 0.008]} />
        <group name="EmptyHat002" position={[7.379, 0.785, -0.04]} rotation={[Math.PI / 2, 0, 0]} scale={[0.011, 0.009, 0.008]} />
        <group name="EmptyGlasses002" position={[7.379, 0.785, -0.04]} rotation={[Math.PI / 2, 0, 0]} scale={[0.011, 0.009, 0.008]} />
        <group name="EmptyBeard002" position={[7.379, 0.785, -0.04]} rotation={[Math.PI / 2, 0, 0]} scale={[0.011, 0.009, 0.008]} />
        <group name="Character_Male_Preset_05" position={[7.379, 0.785, -0.04]} rotation={[Math.PI / 2, 0, 0]} scale={[0.011, 0.009, 0.008]} />
        <group name="EmptyHair003" position={[7.379, 0.785, -0.04]} rotation={[Math.PI / 2, 0, 0]} scale={[0.011, 0.009, 0.008]} />
        <group name="EmptyHat003" position={[7.379, 0.785, -0.04]} rotation={[Math.PI / 2, 0, 0]} scale={[0.011, 0.009, 0.008]} />
        <group name="EmptyGlasses003" position={[7.379, 0.785, -0.04]} rotation={[Math.PI / 2, 0, 0]} scale={[0.011, 0.009, 0.008]} />
        <group name="EmptyBeard003" position={[7.379, 0.785, -0.04]} rotation={[Math.PI / 2, 0, 0]} scale={[0.011, 0.009, 0.008]} />
        <group name="Character_Male_Preset_07" position={[7.379, 0.785, -0.04]} rotation={[Math.PI / 2, 0, 0]} scale={[0.011, 0.009, 0.008]} />
        <group name="DEV01" position={[2.722, 4.357, -6.221]} rotation={[-Math.PI, 0.027, -Math.PI]} scale={0.73}>
          <group name="Armature003" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <primitive object={nodes.mixamorigHips_5} />
            <skinnedMesh name="SHOES_02_5" geometry={nodes.SHOES_02_5.geometry} material={materials['Modular_Characters.004']} skeleton={nodes.SHOES_02_5.skeleton} />
          </group>
        </group>
        <group name="EmptyHead" position={[7.379, 0.785, -0.04]} rotation={[Math.PI / 2, 0, 0]} scale={[0.011, 0.009, 0.008]} />
        <group name="EmptyGlasses004" position={[7.379, 0.785, -0.04]} rotation={[Math.PI / 2, 0, 0]} scale={[0.011, 0.009, 0.008]} />
        <group name="Character_Female_Preset_06" position={[7.379, 0.785, -0.04]} rotation={[Math.PI / 2, 0, 0]} scale={[0.011, 0.009, 0.008]} />
        <group name="EmptyHead001" position={[7.379, 0.785, -0.04]} rotation={[Math.PI / 2, 0, 0]} scale={[0.011, 0.009, 0.008]} />
        <group name="EmptyGlasses005" position={[7.379, 0.785, -0.04]} rotation={[Math.PI / 2, 0, 0]} scale={[0.011, 0.009, 0.008]} />
        <group name="Character_Female_Preset_11" position={[7.379, 0.785, -0.04]} rotation={[Math.PI / 2, 0, 0]} scale={[0.011, 0.009, 0.008]} />
        <PerspectiveCamera name="Camera01" makeDefault={true} far={1000} near={0.1} fov={39.598} position={[-23.128, 23.72, 24.714]} rotation={[-0.705, -0.629, -0.465]} />
        <spotLight intensity={108.703} angle={1.463} decay={2} position={[0, 12.132, 0]} rotation={[-Math.PI / 2, 0, 0]} target={nodes.Spot.target}>
          <primitive object={nodes.Spot.target} position={[0, 0, -1]} />
        </spotLight>
        <spotLight intensity={108.703} angle={1.264} decay={2} position={[-12.943, -3.563, 0]} rotation={[Math.PI / 2, -Math.PI / 2, 0]} target={nodes.Spot001.target}>
          <primitive object={nodes.Spot001.target} position={[0, 0, -1]} />
        </spotLight>
        <spotLight intensity={108.703} angle={1.264} decay={2} position={[13.162, 2.646, 1.764]} rotation={[0, 1.556, -Math.PI / 2]} target={nodes.Spot002.target}>
          <primitive object={nodes.Spot002.target} position={[0, 0, -1]} />
        </spotLight>
        <spotLight intensity={108.703} angle={1.264} decay={2} position={[8.599, 2.646, 15.26]} rotation={[0, 1.556, -Math.PI / 2]} target={nodes.Spot003.target}>
          <primitive object={nodes.Spot003.target} position={[0, 0, -1]} />
        </spotLight>
        <spotLight intensity={108.703} angle={1.264} decay={2} position={[7.975, 2.646, -13.901]} rotation={[0, 1.556, -Math.PI / 2]} target={nodes.Spot004.target}>
          <primitive object={nodes.Spot004.target} position={[0, 0, -1]} />
        </spotLight>
        <pointLight name="Point" intensity={0.054} decay={2} color="#00ff7f" position={[-1.934, 4.923, -7.056]} rotation={[-Math.PI / 2, 0, 0]} />
        <pointLight name="Point001_1" intensity={0.054} decay={2} color="#00ff7f" position={[-1.657, 5.113, -7.056]} rotation={[-Math.PI / 2, 0, 0]} />
        <pointLight name="Point002_1" intensity={0.054} decay={2} color="#00ff7f" position={[-1.934, 4.449, -7.056]} rotation={[-Math.PI / 2, 0, 0]} />
        <pointLight name="Point003_1" intensity={0.054} decay={2} color="#00ff7f" position={[-1.647, 4.62, -7.056]} rotation={[-Math.PI / 2, 0, 0]} />
        <spotLight intensity={108.703} angle={1.264} decay={2} position={[-9.039, 7.585, 0.675]} rotation={[Math.PI / 2, -Math.PI / 2, 0]} target={nodes.Spot005.target}>
          <primitive object={nodes.Spot005.target} position={[0, 0, -1]} />
        </spotLight>
        <pointLight name="Point004_1" intensity={0.054} decay={2} color="#00ff7f" position={[4.291, 6.753, -0.959]} rotation={[-Math.PI / 2, 0, -Math.PI]} />
        <pointLight name="Point005" intensity={0.054} decay={2} color="#00ff7f" position={[4.27, 6.482, -1.485]} rotation={[-Math.PI / 2, 0, -Math.PI]} />
        <pointLight name="Point006_1" intensity={0.054} decay={2} color="#00ff7f" position={[4.266, 6.621, -1.21]} rotation={[-Math.PI / 2, 0, -Math.PI]} />
        <pointLight name="Point008_1" intensity={0.054} decay={2} color="#00ff7f" position={[4.27, 6.629, -1.757]} rotation={[-Math.PI / 2, 0, -Math.PI]} />
        <pointLight name="Point009" intensity={0.054} decay={2} color="#00ff7f" position={[4.222, 6.508, -0.96]} rotation={[-Math.PI / 2, 0, -Math.PI]} />
        <mesh name="office_chair_022" geometry={nodes.office_chair_022.geometry} material={materials['Color.027']} position={[0.199, 3.075, 6.46]} rotation={[Math.PI / 2, 0, 0.992]} scale={[0.013, 0.013, 0.01]} />
        <mesh name="office_chair_022_1" geometry={nodes.office_chair_022_1.geometry} material={materials['Color.027']} position={[-1.857, 3.075, 1.954]} rotation={[Math.PI / 2, 0, 1.756]} scale={[0.011, 0.011, 0.009]} />
        <group name="Walls_011009" position={[1.489, 4.007, -0.475]} rotation={[Math.PI, 0, 0]} scale={[0.011, 0.009, 0.01]}>
          <mesh name="Scene269" geometry={nodes.Scene269.geometry} material={materials['Color.021']} />
          <mesh name="Scene269_1" geometry={nodes.Scene269_1.geometry} material={materials['Material.147']} />
          <mesh name="Scene269_2" geometry={nodes.Scene269_2.geometry} material={materials['Color.002']} />
          <mesh name="Scene269_3" geometry={nodes.Scene269_3.geometry} material={materials['Material.146']} />
          <mesh name="Scene269_4" geometry={nodes.Scene269_4.geometry} material={materials['Color.022']} />
          <mesh name="Scene269_5" geometry={nodes.Scene269_5.geometry} material={materials['Material.020']} />
          <mesh name="Scene269_6" geometry={nodes.Scene269_6.geometry} material={materials['Color.020']} />
          <mesh name="Scene269_7" geometry={nodes.Scene269_7.geometry} material={materials['Material.148']} />
          <mesh name="Scene269_8" geometry={nodes.Scene269_8.geometry} material={materials.Material} />
          <mesh name="Scene269_9" geometry={nodes.Scene269_9.geometry} material={materials['Material.010']} />
        </group>
        <mesh name="shelf_048001" geometry={nodes.shelf_048001.geometry} material={materials['Color.024']} position={[4.135, 4.192, 3.1]} rotation={[Math.PI / 2, 0, Math.PI / 2]} scale={[0.013, 0.015, 0.011]} />
        <mesh name="office_chair_022_1001" geometry={nodes.office_chair_022_1001.geometry} material={materials['Color.027']} position={[-1.857, 3.075, 0.426]} rotation={[Math.PI / 2, 0, 0.571]} scale={[0.011, 0.011, 0.009]} />
        <mesh name="office_chair_022_1002" geometry={nodes.office_chair_022_1002.geometry} material={materials['Color.027']} position={[-1.922, 3.075, -2.796]} rotation={[Math.PI / 2, 0, 1.804]} scale={[0.011, 0.011, 0.009]} />
        <mesh name="office_chair_022_1003" geometry={nodes.office_chair_022_1003.geometry} material={materials['Color.027']} position={[-2.081, 3.075, -4.412]} rotation={[Math.PI / 2, 0, 0.511]} scale={[0.011, 0.011, 0.009]} />
        <mesh name="sofa_006" geometry={nodes.sofa_006.geometry} material={materials['Color.027']} position={[-3.817, 3.069, 0.35]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={[0.01, 0.011, 0.008]} />
        <mesh name="sofa_006001" geometry={nodes.sofa_006001.geometry} material={materials['Color.027']} position={[-3.806, 3.085, -3.927]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={[0.01, 0.011, 0.008]} />
        <mesh name="Partitions_017" geometry={nodes.Partitions_017.geometry} material={materials['Material.147']} position={[0.813, 4.174, 3.378]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh name="Partitions_017001" geometry={nodes.Partitions_017001.geometry} material={materials['Material.147']} position={[-1.143, 4.174, 3.378]} rotation={[Math.PI / 2, 0, Math.PI / 2]} scale={0.01} />
        <mesh name="Partitions_017002" geometry={nodes.Partitions_017002.geometry} material={materials['Material.147']} position={[-1.143, 4.174, 1.366]} rotation={[Math.PI / 2, 0, Math.PI / 2]} scale={0.01} />
        <mesh name="Partitions_017003" geometry={nodes.Partitions_017003.geometry} material={materials['Material.147']} position={[-1.143, 4.174, -0.645]} rotation={[Math.PI / 2, 0, Math.PI / 2]} scale={0.01} />
        <mesh name="Partitions_017004" geometry={nodes.Partitions_017004.geometry} material={materials['Material.147']} position={[-1.143, 4.174, -2.657]} rotation={[Math.PI / 2, 0, Math.PI / 2]} scale={0.01} />
        <mesh name="Partitions_017005" geometry={nodes.Partitions_017005.geometry} material={materials['Material.147']} position={[-1.143, 4.174, -4.665]} rotation={[Math.PI / 2, 0, Math.PI / 2]} scale={0.01} />
        <mesh name="Partitions_017006" geometry={nodes.Partitions_017006.geometry} material={materials['Material.147']} position={[-1.143, 4.174, -6.676]} rotation={[Math.PI / 2, 0, Math.PI / 2]} scale={0.01} />
        <mesh name="office_chair_022_1004" geometry={nodes.office_chair_022_1004.geometry} material={materials['Color.027']} position={[-0.268, 4.142, 0.901]} rotation={[Math.PI / 2, 0, -0.554]} scale={[0.011, 0.011, 0.009]} />
        <mesh name="office_chair_022_1005" geometry={nodes.office_chair_022_1005.geometry} material={materials['Color.024']} position={[3.526, 4.142, 2.17]} rotation={[Math.PI / 2, 0, 1.764]} scale={[0.011, 0.011, 0.009]} />
        <mesh name="office_chair_001001" geometry={nodes.office_chair_001001.geometry} material={materials['Color.011']} position={[-2.356, 3.089, -6.895]} rotation={[Math.PI / 2, 0, -0.079]} scale={0.008} />
        <mesh name="electronics_032" geometry={nodes.electronics_032.geometry} material={materials['Color.026']} position={[-1.948, 3.066, -6.596]} rotation={[Math.PI / 2, 0, -Math.PI]} scale={0.009} />
        <mesh name="electronics_024" geometry={nodes.electronics_024.geometry} material={materials['Color.028']} position={[-2.043, 3.732, -6.279]} rotation={[Math.PI / 2, 0, 2.895]} scale={0.008} />
        <mesh name="electronics_024001" geometry={nodes.electronics_024001.geometry} material={materials['Color.028']} position={[-2.608, 3.732, -6.268]} rotation={[Math.PI / 2, 0, -2.946]} scale={0.008} />
        <mesh name="electronics_029" geometry={nodes.electronics_029.geometry} material={materials['Color.030']} position={[-2.325, 3.773, -6.394]} rotation={[Math.PI / 2, 0, 3.108]} scale={0.01} />
        <mesh name="flower_024" geometry={nodes.flower_024.geometry} material={materials['Color.032']} position={[-1.574, 3.752, -6.875]} rotation={[Math.PI / 2, 0, 0]} scale={0.005} />
        <mesh name="electronics_024002" geometry={nodes.electronics_024002.geometry} material={materials['Color.028']} position={[-4.232, 3.732, -6.101]} rotation={[Math.PI / 2, 0, -1.618]} scale={0.008} />
        <mesh name="prop_101" geometry={nodes.prop_101.geometry} material={materials['Color.038']} position={[-4.037, 3.765, -2.191]} rotation={[Math.PI / 2, 0, 0]} scale={0.006} />
        <mesh name="electronics_024003" geometry={nodes.electronics_024003.geometry} material={materials['Color.028']} position={[0.639, 4.866, -6.777]} rotation={[Math.PI / 2, 0, 0.077]} scale={0.008} />
        <mesh name="electronics_029003" geometry={nodes.electronics_029003.geometry} material={materials['Color.030']} position={[0.689, 4.88, -6.613]} rotation={[1.576, -0.003, -0.014]} scale={0.01} />
        <mesh name="electronics_029004" geometry={nodes.electronics_029004.geometry} material={materials['Color.030']} position={[2.969, 4.846, -6.363]} rotation={[Math.PI / 2, 0, -0.143]} scale={0.01} />
        <mesh name="prop_037001" geometry={nodes.prop_037001.geometry} material={materials['Color.039']} position={[-3.999, 3.725, -5.649]} rotation={[Math.PI / 2, 0, 0]} scale={0.006} />
        <mesh name="prop_101001" geometry={nodes.prop_101001.geometry} material={materials['Color.038']} position={[-0.776, 4.852, -0.809]} rotation={[Math.PI / 2, 0, 0]} scale={0.006} />
        <mesh name="electronics_024005" geometry={nodes.electronics_024005.geometry} material={materials['Color.028']} position={[-0.8, 4.862, -2.318]} rotation={[Math.PI / 2, 0, -1.551]} scale={0.008} />
        <mesh name="electronics_029006" geometry={nodes.electronics_029006.geometry} material={materials['Color.030']} position={[-0.643, 4.878, -2.334]} rotation={[Math.PI / 2, 0, -1.556]} scale={0.01} />
        <mesh name="prop_037002" geometry={nodes.prop_037002.geometry} material={materials['Color.039']} position={[3.137, 4.849, -6.583]} rotation={[Math.PI / 2, 0, 0]} scale={0.006} />
        <mesh name="lamp_013" geometry={nodes.lamp_013.geometry} material={materials['Color.040']} position={[0.279, 4.836, -6.63]} rotation={[Math.PI / 2, 0, 0]} scale={0.008} />
        <mesh name="musical_instrument_006" geometry={nodes.musical_instrument_006.geometry} material={materials['Color.041']} position={[2.364, 4.851, -6.609]} rotation={[Math.PI / 2, 0, 0]} scale={0.003} />
        <mesh name="musical_instrument_006001" geometry={nodes.musical_instrument_006001.geometry} material={materials['Color.041']} position={[2.951, 4.851, -6.609]} rotation={[Math.PI / 2, 0, 0]} scale={0.003} />
        <mesh name="flower_001" geometry={nodes.flower_001.geometry} material={materials['Color.042']} position={[4.176, 4.216, -2.556]} rotation={[Math.PI / 2, 0, 0]} scale={0.013} />
        <mesh name="coffee_table_014" geometry={nodes.coffee_table_014.geometry} material={materials['Color.044']} position={[0.263, 4.216, 1.806]} rotation={[Math.PI / 2, 0, 0]} scale={0.009} />
        <mesh name="prop_101002" geometry={nodes.prop_101002.geometry} material={materials['Color.038']} position={[0.396, 4.486, 1.71]} rotation={[Math.PI / 2, 0, 2.359]} scale={0.006} />
        <mesh name="prop_101003" geometry={nodes.prop_101003.geometry} material={materials['Color.038']} position={[0.324, 4.486, 1.638]} rotation={[Math.PI / 2, 0, 2.359]} scale={0.006} />
        <mesh name="shop_065" geometry={nodes.shop_065.geometry} material={materials['Color.046']} position={[0.244, 4.479, 1.83]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh name="prop_081001" geometry={nodes.prop_081001.geometry} material={materials['Color.047']} position={[4.15, 4.735, 2.762]} rotation={[Math.PI / 2, 0, 1.679]} scale={0.013} />
        <mesh name="prop_080" geometry={nodes.prop_080.geometry} material={materials['Color.050']} position={[4.225, 5.059, 2.655]} rotation={[Math.PI / 2, 0, Math.PI / 2]} scale={0.012} />
        <mesh name="prop_076003" geometry={nodes.prop_076003.geometry} material={materials['Color.048']} position={[4.178, 5.059, 3.083]} rotation={[Math.PI / 2, 0, 0]} scale={0.014} />
        <mesh name="prop_076004" geometry={nodes.prop_076004.geometry} material={materials['Color.048']} position={[4.139, 5.059, 3.238]} rotation={[Math.PI / 2, 0, 0]} scale={0.014} />
        <mesh name="prop_076005" geometry={nodes.prop_076005.geometry} material={materials['Color.048']} position={[4.186, 5.059, 3.424]} rotation={[Math.PI / 2, 0, 0]} scale={0.014} />
        <mesh name="prop_076006" geometry={nodes.prop_076006.geometry} material={materials['Color.048']} position={[4.186, 5.059, 3.88]} rotation={[Math.PI / 2, 0, 0]} scale={0.014} />
        <mesh name="prop_076007" geometry={nodes.prop_076007.geometry} material={materials['Color.048']} position={[4.186, 5.059, 4.176]} rotation={[Math.PI / 2, 0, 0]} scale={0.014} />
        <mesh name="prop_086001" geometry={nodes.prop_086001.geometry} material={materials['Color.049']} position={[4.136, 4.318, 3.07]} rotation={[Math.PI / 2, 0, 0]} scale={0.008} />
        <mesh name="prop_078" geometry={nodes.prop_078.geometry} material={materials['Color.051']} position={[4.142, 4.714, 4.796]} rotation={[Math.PI / 2, 0, Math.PI / 2]} scale={0.014} />
        <mesh name="flower_020003" geometry={nodes.flower_020003.geometry} material={materials['Color.052']} position={[4.153, 5.389, 3.614]} rotation={[Math.PI / 2, 0, 0]} scale={0.009} />
        <mesh name="flower_020004" geometry={nodes.flower_020004.geometry} material={materials['Color.052']} position={[4.153, 5.73, 4.327]} rotation={[Math.PI / 2, 0, 0]} scale={0.009} />
        <mesh name="flower_020005" geometry={nodes.flower_020005.geometry} material={materials['Color.052']} position={[4.153, 5.394, 4.813]} rotation={[Math.PI / 2, 0, 0]} scale={0.009} />
        <mesh name="prop_035002" geometry={nodes.prop_035002.geometry} material={materials['Color.053']} position={[4.148, 4.351, 4.501]} rotation={[Math.PI / 2, 0, 0.283]} scale={0.008} />
        <mesh name="prop_035003" geometry={nodes.prop_035003.geometry} material={materials['Color.053']} position={[4.148, 4.351, 4.819]} rotation={[Math.PI / 2, 0, -0.019]} scale={0.008} />
        <mesh name="prop_035004" geometry={nodes.prop_035004.geometry} material={materials['Color.053']} position={[4.148, 4.721, 3.822]} rotation={[Math.PI / 2, 0, 0.283]} scale={0.008} />
        <mesh name="prop_035005" geometry={nodes.prop_035005.geometry} material={materials['Color.053']} position={[4.148, 4.721, 4.141]} rotation={[Math.PI / 2, 0, 0.026]} scale={0.008} />
        <mesh name="prop_035006" geometry={nodes.prop_035006.geometry} material={materials['Color.053']} position={[4.148, 4.721, 3.353]} rotation={[Math.PI / 2, 0, 0.026]} scale={0.008} />
        <mesh name="flower_013" geometry={nodes.flower_013.geometry} material={materials['Color.056']} position={[4.138, 6.056, 2.908]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh name="electronics_032001" geometry={nodes.electronics_032001.geometry} material={materials['Color.026']} position={[1.188, 4.195, -6.497]} rotation={[Math.PI / 2, 0, 0]} scale={0.007} />
        <mesh name="electronics_032002" geometry={nodes.electronics_032002.geometry} material={materials['Color.026']} position={[-0.535, 4.195, -1.95]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.007} />
        <mesh name="electronics_032003" geometry={nodes.electronics_032003.geometry} material={materials['Color.026']} position={[-3.959, 3.079, -5.558]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.007} />
        <mesh name="prop_013" geometry={nodes.prop_013.geometry} material={materials['Color.057']} position={[-2.013, 3.077, 2.706]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh name="training_item_002" geometry={nodes.training_item_002.geometry} material={materials['Color.058']} position={[-1.619, 3.077, 3.186]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh name="office_table_006" geometry={nodes.office_table_006.geometry} material={materials['Color.008']} position={[-3.889, 3.073, 2.331]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.009} />
        <mesh name="electronics_024006" geometry={nodes.electronics_024006.geometry} material={materials['Color.028']} position={[-4.223, 3.722, 2.302]} rotation={[Math.PI / 2, 0, -1.618]} scale={0.008} />
        <mesh name="office_table_006001" geometry={nodes.office_table_006001.geometry} material={materials['Color.008']} position={[-3.879, 3.073, -1.747]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.009} />
        <mesh name="electronics_024007" geometry={nodes.electronics_024007.geometry} material={materials['Color.028']} position={[-4.197, 3.722, -1.777]} rotation={[Math.PI / 2, 0, -1.618]} scale={0.008} />
        <mesh name="office_table_006003" geometry={nodes.office_table_006003.geometry} material={materials['Color.008']} position={[-3.878, 3.073, -6.038]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.009} />
        <mesh name="electronics_029008" geometry={nodes.electronics_029008.geometry} material={materials['Color.030']} position={[-4.077, 3.75, -6.08]} rotation={[Math.PI / 2, 0, -1.564]} scale={0.01} />
        <mesh name="electronics_029007" geometry={nodes.electronics_029007.geometry} material={materials['Color.030']} position={[-4.073, 3.75, -1.771]} rotation={[Math.PI / 2, 0, -1.564]} scale={0.01} />
        <mesh name="electronics_029001" geometry={nodes.electronics_029001.geometry} material={materials['Color.030']} position={[-4.086, 3.75, 2.28]} rotation={[Math.PI / 2, 0, -1.564]} scale={0.01} />
        <mesh name="office_table_006004" geometry={nodes.office_table_006004.geometry} material={materials['Color.008']} position={[-0.446, 4.201, -0.408]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.009} />
        <mesh name="office_table_006005" geometry={nodes.office_table_006005.geometry} material={materials['Color.008']} position={[-0.446, 4.201, -2.369]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.009} />
        <mesh name="office_table_006006" geometry={nodes.office_table_006006.geometry} material={materials['Color.008']} position={[0.719, 4.201, -6.415]} rotation={[Math.PI / 2, 0, 0]} scale={0.009} />
        <mesh name="office_table_006007" geometry={nodes.office_table_006007.geometry} material={materials['Color.008']} position={[2.702, 4.201, -6.415]} rotation={[Math.PI / 2, 0, 0]} scale={0.009} />
        <mesh name="electronics_024008" geometry={nodes.electronics_024008.geometry} material={materials['Color.028']} position={[2.629, 4.859, -6.804]} rotation={[Math.PI / 2, 0, 0.077]} scale={0.008} />
        <mesh name="electronics_029002" geometry={nodes.electronics_029002.geometry} material={materials['Color.030']} position={[2.68, 4.874, -6.64]} rotation={[1.576, -0.003, -0.014]} scale={0.01} />
        <mesh name="electronics_029005" geometry={nodes.electronics_029005.geometry} material={materials['Color.030']} position={[2.999, 4.861, -6.557]} rotation={[1.576, -0.003, -0.014]} scale={0.01} />
        <mesh name="flower_015" geometry={nodes.flower_015.geometry} material={materials['Color.019']} position={[-1.934, 5.022, -7.067]} rotation={[Math.PI / 2, 0, 2.042]} scale={0.006} />
        <mesh name="flower_036" geometry={nodes.flower_036.geometry} material={materials['Color.019']} position={[-1.642, 4.885, -7.075]} rotation={[Math.PI / 2, 0, 0]} scale={0.006} />
        <mesh name="prop_036" geometry={nodes.prop_036.geometry} material={materials['Color.019']} position={[-1.915, 4.219, -7.098]} rotation={[Math.PI / 2, 0, 0]} scale={0.004} />
        <mesh name="prop_072" geometry={nodes.prop_072.geometry} material={materials['Color.019']} position={[-1.935, 4.516, -7.102]} rotation={[Math.PI / 2, 0, -0.065]} scale={0.007} />
        <mesh name="prop_080001" geometry={nodes.prop_080001.geometry} material={materials['Color.019']} position={[-1.667, 4.379, -7.049]} rotation={[Math.PI / 2, 0, 0]} scale={0.009} />
        <mesh name="shelf_074" geometry={nodes.shelf_074.geometry} material={materials['Color.019']} position={[-1.784, 4.439, -7.144]} rotation={[Math.PI / 2, 0, 0]} scale={[0.007, 0.009, 0.007]} />
        <mesh name="shelf_074_1" geometry={nodes.shelf_074_1.geometry} material={materials['Color.019']} position={[-1.784, 4.945, -7.144]} rotation={[Math.PI / 2, 0, 0]} scale={[0.007, 0.009, 0.007]} />
        <mesh name="picture_060" geometry={nodes.picture_060.geometry} material={materials['Color.023']} position={[-3.897, 4.593, -7.152]} rotation={[Math.PI / 2, -Math.PI / 2, 0]} scale={0.006} />
        <mesh name="prop_103" geometry={nodes.prop_103.geometry} material={materials['Color.031']} position={[-2.862, 4.786, -7.123]} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
        <mesh name="flower_022" geometry={nodes.flower_022.geometry} material={materials['Color.033']} position={[4.274, 6.564, -0.94]} rotation={[Math.PI / 2, 0, 0]} scale={0.007} />
        <mesh name="flower_037" geometry={nodes.flower_037.geometry} material={materials['Color.033']} position={[4.293, 6.413, -1.74]} rotation={[Math.PI / 2, 0, 0]} scale={0.007} />
        <mesh name="prop_078001" geometry={nodes.prop_078001.geometry} material={materials['Color.033']} position={[4.295, 6.263, -1.481]} rotation={[Math.PI / 2, 0, Math.PI / 2]} scale={0.006} />
        <mesh name="shelf_006" geometry={nodes.shelf_006.geometry} material={materials['Color.033']} position={[4.233, 6.476, -1.336]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.007} />
        <mesh name="flower_001001" geometry={nodes.flower_001001.geometry} material={materials['Color.042']} position={[4.176, 4.216, -0.197]} rotation={[Math.PI / 2, 0, 0]} scale={0.013} />
        <mesh name="electronics_012" geometry={nodes.electronics_012.geometry} material={materials['Color.034']} position={[4.313, 6.267, -0.949]} rotation={[Math.PI / 2, 0, 0.993]} scale={0.005} />
        <mesh name="electronics_007" geometry={nodes.electronics_007.geometry} material={materials['Color.036']} position={[4.321, 6.457, -1.206]} rotation={[1.461, 1.134, 2.11]} scale={0.005} />
        <mesh name="electronics_007001" geometry={nodes.electronics_007001.geometry} material={materials['Color.036']} position={[4.325, 6.587, -1.482]} rotation={[1.461, 1.134, 2.11]} scale={0.005} />
        <mesh name="office_table_006010" geometry={nodes.office_table_006010.geometry} material={materials['Color.008']} position={[-2.352, 3.081, -6.592]} rotation={[Math.PI / 2, 0, 3.138]} scale={0.009} />
        <mesh name="toy_002" geometry={nodes.toy_002.geometry} material={materials['Material.003']} position={[4.034, 4.194, -1.371]} rotation={[Math.PI / 2, 0, Math.PI / 2]} scale={0.011} />
        <group name="Cube002" position={[-3.332, 6.132, -7.144]} rotation={[0, 0, -Math.PI]} scale={[-0.862, -0.676, -0.023]}>
          <mesh name="Cube001" geometry={nodes.Cube001.geometry} material={materials['Material.004']} />
          <mesh name="Cube001_1" geometry={nodes.Cube001_1.geometry} material={materials['Material.005']} />
        </group>
        <group name="Cube003" position={[-1.874, 6.132, -7.144]} rotation={[0, 0, -Math.PI]} scale={[-0.529, -0.842, -0.029]}>
          <mesh name="Cube004" geometry={nodes.Cube004.geometry} material={materials['Material.004']} />
          <mesh name="Cube004_1" geometry={nodes.Cube004_1.geometry} material={materials['Material.009']} />
        </group>
        <mesh name="electronics_024009" geometry={nodes.electronics_024009.geometry} material={materials['Color.028']} position={[-0.8, 4.862, -0.391]} rotation={[Math.PI / 2, 0, -1.551]} scale={0.008} />
        <mesh name="electronics_029009" geometry={nodes.electronics_029009.geometry} material={materials['Color.030']} position={[-0.643, 4.878, -0.407]} rotation={[Math.PI / 2, 0, -1.556]} scale={0.01} />
        <group name="Object_6" position={[4.154, 6.413, 2.885]} rotation={[0, -0.805, 0]} scale={0.319}>
          <mesh name="Object_2_1" geometry={nodes.Object_2_1.geometry} material={materials.stu_obj_base} />
          <mesh name="Object_2_2" geometry={nodes.Object_2_2.geometry} material={materials.stu_chr_classic_sonic_body} />
          <mesh name="Object_2_3" geometry={nodes.Object_2_3.geometry} material={materials.stu_chr_classic_sonic_eye} />
        </group>
        <mesh name="Object_6001" geometry={nodes.Object_6001.geometry} material={materials.stu_obj_base} position={[4.157, 6.413, 3.669]} rotation={[0, -0.805, 0]} scale={0.319} />
        <mesh name="office_chair_016001" geometry={nodes.office_chair_016001.geometry} material={materials['Color.054']} position={[-3.466, 3.091, 2.549]} rotation={[Math.PI / 2, 0, 2.412]} scale={0.007} />
        <mesh name="office_chair_016002" geometry={nodes.office_chair_016002.geometry} material={materials['Color.054']} position={[-3.693, 3.091, -1.751]} rotation={[Math.PI / 2, 0, 2.032]} scale={0.007} />
        <mesh name="office_chair_016003" geometry={nodes.office_chair_016003.geometry} material={materials['Color.054']} position={[-3.692, 3.091, -6.185]} rotation={[Math.PI / 2, 0, 2.032]} scale={0.007} />
        <mesh name="office_chair_016005" geometry={nodes.office_chair_016005.geometry} material={materials['Color.054']} position={[-0.283, 4.207, -0.572]} rotation={[Math.PI / 2, 0, 2.01]} scale={0.007} />
        <mesh name="office_chair_016006" geometry={nodes.office_chair_016006.geometry} material={materials['Color.054']} position={[-0.332, 4.207, -2.509]} rotation={[Math.PI / 2, 0, 1.662]} scale={0.007} />
        <mesh name="office_chair_016007" geometry={nodes.office_chair_016007.geometry} material={materials['Color.054']} position={[0.667, 4.207, -6.246]} rotation={[Math.PI / 2, 0, -2.513]} scale={0.007} />
        <mesh name="office_chair_016008" geometry={nodes.office_chair_016008.geometry} material={materials['Color.054']} position={[2.692, 4.207, -6.204]} rotation={[Math.PI / 2, 0, 3.084]} scale={0.007} />
        <mesh name="GroundCubeQuad002" geometry={nodes.GroundCubeQuad002.geometry} material={materials['Ground_FileSize_Mat.002']} position={[0, 3.668, -0.13]} rotation={[0, 1.571, 0]} scale={[1.2, 1, 0.792]} />
      </group>
    </group>
  )
}

useGLTF.preload('./models/model4.glb')
