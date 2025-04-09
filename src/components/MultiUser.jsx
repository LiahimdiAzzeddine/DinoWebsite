import { PerspectiveCamera, useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader";
import * as THREE from "three";
import { useScroll } from "@react-three/drei";

export const NB_PAGES = 3;

export const MultiUser = ({ props }) => {
  const gl = useThree((state) => state.gl);
  const group = useRef();
  const cameraRef = useRef();
  
  const scroll = useScroll();
  
  const cameraPositions = [
    { position: new THREE.Vector3(-7.138, 5.747, 3.95), rotation: new THREE.Euler(-0.937, -0.903, -0.818) },
    { position: new THREE.Vector3(-2.5, 3.5, 1.5), rotation: new THREE.Euler(-0.7, -0.7, -0.5) },
    { position: new THREE.Vector3(-1.5,2,0.1), rotation: new THREE.Euler(-0.5, -1.2, -0.3) }
  ];

  const { nodes, materials, animations } = useGLTF(
    "./models/MultiUserCollab.glb",
    undefined,
    undefined,
    (loader) => {
      const ktx2loader = new KTX2Loader();
      ktx2loader.setTranscoderPath(
        "https://unpkg.com/three@0.168.0/examples/jsm/libs/basis/"
      );
      ktx2loader.detectSupport(gl);
      loader.setKTX2Loader(ktx2loader);
    }
  );

  //animations
  /*
  const { actions } = useAnimations(animations, group);
  
  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach(action => action.play());
    }
  }, [actions]);*/

  useFrame(() => {
    if (!cameraRef.current) return;

    const scrollOffset = scroll.offset;
    
    const currentPage = Math.min(Math.floor(scrollOffset * NB_PAGES), NB_PAGES - 1);
    
    const pageProgress = (scrollOffset * NB_PAGES) % 1;
    
    if (currentPage < NB_PAGES - 1) {
      const currentPos = cameraPositions[currentPage];
      const nextPos = cameraPositions[currentPage + 1];
      
      cameraRef.current.position.lerpVectors(
        currentPos.position,
        nextPos.position,
        pageProgress
      );
      
      const currentRotation = new THREE.Quaternion().setFromEuler(currentPos.rotation);
      const nextRotation = new THREE.Quaternion().setFromEuler(nextPos.rotation);
      
      const interpolatedRotation = new THREE.Quaternion().slerpQuaternions(
        currentRotation,
        nextRotation,
        pageProgress
      );
      
      cameraRef.current.quaternion.copy(interpolatedRotation);
    }
  });

  return (
    <>
      <group ref={group} {...props} dispose={null} scale={[0.1, 0.1, 0.1]} >
        <group name="MultiUserCollabglb">
          <group name="MultiUserCollab">
            <group name="RoomBase" position={[0, 0, 0]} scale={[0.1, 0.1, 0.1]}>
              <group name="CameraSpline">
                <group name="Cam" position={[-10.56, 0, 10.11]} />
                <group name="Look" position={[-0.05, 0, -0.37]} />
              </group>
              <PerspectiveCamera
                ref={cameraRef}
                name="View"
                makeDefault={true}
                far={1000.134}
                near={0.3}
                fov={40}
                position={[-7.138, 5.747, 3.95]}
                rotation={[-0.937, -0.903, -0.818]}
              />
              <directionalLight
                name="Directional_Light"
                intensity={3.142}
                decay={2}
                position={[2.32, 3.93, 4.86]}
                rotation={[-0.889, 0.399, -0.924]}>
                <group position={[0, 0, -1]} />
              </directionalLight>
              <directionalLight
                name="Directional_Light_Fill"
                intensity={1.571}
                decay={2}
                position={[-5.91, 3.99, -1.97]}
                rotation={[-2.707, -1.061, 2.013]}>
                <group position={[0, 0, -1]} />
              </directionalLight>
              <group name="GroundGrass" position={[0, -0.431, 0]}>
              <mesh
                name="GroundGrass_1"
                castShadow
                receiveShadow
                geometry={nodes.GroundGrass_1.geometry}
                material={materials.Opaque_Mat}
              />
            </group>
            <group name="GroundCubeCurve" position={[0, -0.431, 0]}>
              <mesh
                name="GroundCubeCurve_1"
                castShadow
                receiveShadow
                geometry={nodes.GroundCubeCurve_1.geometry}
                material={materials.Ground_MultiUserCollab_Mat}
              />
            </group>
            <group name="GlassBenchSmall" position={[0.211, 0.579, -3.964]}>
              <mesh
                name="GlassBenchSmall_1"
                castShadow
                receiveShadow
                geometry={nodes.GlassBenchSmall_1.geometry}
                material={materials.Glass_Mat}
              />
              <group name="Tree" position={[-0.757, 0.018, -0.043]} scale={0.829}>
                <mesh
                  name="Tree_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.Tree_1.geometry}
                  material={materials.Opaque_Mat}
                  scale={1.012}
                />
                <mesh
                  name="Tree_(1)"
                  castShadow
                  receiveShadow
                  geometry={nodes['Tree_(1)'].geometry}
                  material={materials.Opaque_Mat}
                  scale={1.012}
                />
              </group>
              <group
                name="RockSmall2"
                position={[0.419, 0, 0.127]}
                rotation={[Math.PI, 0, Math.PI]}
                scale={0.996}>
                <mesh
                  name="RockSmall2_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.RockSmall2_1.geometry}
                  material={materials.StonesGrey}
                />
                <mesh
                  name="RockSmall2_(1)"
                  castShadow
                  receiveShadow
                  geometry={nodes['RockSmall2_(1)'].geometry}
                  material={materials.StonesGrey}
                />
              </group>
              <group name="RockSmall3" position={[-0.08, -0.001, 0.026]}>
                <mesh
                  name="RockSmall3_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.RockSmall3_1.geometry}
                  material={materials.StonesGrey}
                />
                <mesh
                  name="RockSmall3_(1)"
                  castShadow
                  receiveShadow
                  geometry={nodes['RockSmall3_(1)'].geometry}
                  material={materials.StonesGrey}
                />
              </group>
            </group>
            <group
              name="GlassBenchSmall_2"
              position={[5.203, 0.579, -0.067]}
              rotation={[0, -1.57, 0]}>
              <mesh
                name="GlassBenchSmall_3"
                castShadow
                receiveShadow
                geometry={nodes.GlassBenchSmall_3.geometry}
                material={materials.Glass_Mat}
              />
              <group
                name="SmallSquareTower"
                position={[-0.006, 0, -0.014]}
                rotation={[2.741, 1.554, -2.746]}>
                <mesh
                  name="SmallSquareTower_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.SmallSquareTower_1.geometry}
                  material={materials.Opaque_Mat}>
                  <mesh
                    name="SmallSquareTower_(1)"
                    castShadow
                    receiveShadow
                    geometry={nodes['SmallSquareTower_(1)'].geometry}
                    material={materials.Opaque_Mat}
                  />
                </mesh>
              </group>
              <group name="Well" position={[0.713, 0, -0.014]} rotation={[0, 1.57, 0]}>
                <mesh
                  name="Well_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.Well_1.geometry}
                  material={materials.Opaque_Mat}>
                  <mesh
                    name="Well_(1)"
                    castShadow
                    receiveShadow
                    geometry={nodes['Well_(1)'].geometry}
                    material={materials.Opaque_Mat}
                  />
                </mesh>
              </group>
              <group
                name="SimpleTowerBricks"
                position={[-0.734, 0, -0.014]}
                rotation={[0, 1.57, 0]}>
                <mesh
                  name="SimpleTowerBricks_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.SimpleTowerBricks_1.geometry}
                  material={materials.Opaque_Mat}>
                  <mesh
                    name="SimpleTowerBricks_(1)"
                    castShadow
                    receiveShadow
                    geometry={nodes['SimpleTowerBricks_(1)'].geometry}
                    material={materials.Opaque_Mat}
                  />
                </mesh>
              </group>
            </group>
            <group
              name="GlassBenchSmall_(1)"
              position={[5.203, 0.579, 2.44]}
              rotation={[0, -1.57, 0]}>
              <mesh
                name="GlassBenchSmall_4"
                castShadow
                receiveShadow
                geometry={nodes.GlassBenchSmall_4.geometry}
                material={materials.Glass_Mat}
              />
              <group name="Dragon_01" position={[-0.664, 0.158, 0]} scale={2.273}>
                <group name="Dragon_01_Cube_026">
                  <mesh
                    name="Dragon_01_Cube_026_3"
                    castShadow
                    receiveShadow
                    geometry={nodes.Dragon_01_Cube_026_3.geometry}
                    material={materials.F44336}
                  />
                  <mesh
                    name="Dragon_01_Cube_026_4"
                    castShadow
                    receiveShadow
                    geometry={nodes.Dragon_01_Cube_026_4.geometry}
                    material={materials._009688}
                  />
                  <mesh
                    name="Dragon_01_Cube_026_5"
                    castShadow
                    receiveShadow
                    geometry={nodes.Dragon_01_Cube_026_5.geometry}
                    material={materials._1A1A1A}
                  />
                  <mesh
                    name="Dragon_01_Cube_026_6"
                    castShadow
                    receiveShadow
                    geometry={nodes.Dragon_01_Cube_026_6.geometry}
                    material={materials.FFFFFF}
                  />
                  <group name="Dragon_01_Cube_026_(1)">
                    <mesh
                      name="Dragon_01_Cube_026_3"
                      castShadow
                      receiveShadow
                      geometry={nodes.Dragon_01_Cube_026_3.geometry}
                      material={materials.F44336}
                    />
                    <mesh
                      name="Dragon_01_Cube_026_4"
                      castShadow
                      receiveShadow
                      geometry={nodes.Dragon_01_Cube_026_4.geometry}
                      material={materials._009688}
                    />
                    <mesh
                      name="Dragon_01_Cube_026_5"
                      castShadow
                      receiveShadow
                      geometry={nodes.Dragon_01_Cube_026_5.geometry}
                      material={materials._1A1A1A}
                    />
                    <mesh
                      name="Dragon_01_Cube_026_6"
                      castShadow
                      receiveShadow
                      geometry={nodes.Dragon_01_Cube_026_6.geometry}
                      material={materials.FFFFFF}
                    />
                  </group>
                </group>
              </group>
              <group name="Unicorn_01" position={[0, 0.126, 0]} scale={2.246}>
                <group name="Unicorn_01_Cube_028_Cube_030">
                  <mesh
                    name="Unicorn_01_Cube_028_Cube_030_3"
                    castShadow
                    receiveShadow
                    geometry={nodes.Unicorn_01_Cube_028_Cube_030_3.geometry}
                    material={materials.F06292}
                  />
                  <mesh
                    name="Unicorn_01_Cube_028_Cube_030_4"
                    castShadow
                    receiveShadow
                    geometry={nodes.Unicorn_01_Cube_028_Cube_030_4.geometry}
                    material={materials.FFFFFF}
                  />
                  <mesh
                    name="Unicorn_01_Cube_028_Cube_030_5"
                    castShadow
                    receiveShadow
                    geometry={nodes.Unicorn_01_Cube_028_Cube_030_5.geometry}
                    material={materials._1A1A1A}
                  />
                  <mesh
                    name="Unicorn_01_Cube_028_Cube_030_6"
                    castShadow
                    receiveShadow
                    geometry={nodes.Unicorn_01_Cube_028_Cube_030_6.geometry}
                    material={materials.FF9800}
                  />
                  <group name="Unicorn_01_Cube_028_Cube_030_(1)">
                    <mesh
                      name="Unicorn_01_Cube_028_Cube_030_3"
                      castShadow
                      receiveShadow
                      geometry={nodes.Unicorn_01_Cube_028_Cube_030_3.geometry}
                      material={materials.F06292}
                    />
                    <mesh
                      name="Unicorn_01_Cube_028_Cube_030_4"
                      castShadow
                      receiveShadow
                      geometry={nodes.Unicorn_01_Cube_028_Cube_030_4.geometry}
                      material={materials.FFFFFF}
                    />
                    <mesh
                      name="Unicorn_01_Cube_028_Cube_030_5"
                      castShadow
                      receiveShadow
                      geometry={nodes.Unicorn_01_Cube_028_Cube_030_5.geometry}
                      material={materials._1A1A1A}
                    />
                    <mesh
                      name="Unicorn_01_Cube_028_Cube_030_6"
                      castShadow
                      receiveShadow
                      geometry={nodes.Unicorn_01_Cube_028_Cube_030_6.geometry}
                      material={materials.FF9800}
                    />
                  </group>
                </group>
              </group>
              <group
                name="WatchtowerWithRoof"
                position={[0.681, 0.013, 0.007]}
                rotation={[0, 1.57, 0]}
                scale={0.423}>
                <mesh
                  name="WatchtowerWithRoof_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.WatchtowerWithRoof_1.geometry}
                  material={materials.Opaque_Mat}>
                  <mesh
                    name="WatchtowerWithRoof_(1)"
                    castShadow
                    receiveShadow
                    geometry={nodes['WatchtowerWithRoof_(1)'].geometry}
                    material={materials.Opaque_Mat}
                  />
                </mesh>
              </group>
            </group>
            <group
              name="TallWallEntrance"
              position={[1.873, -0.018, -1.297]}
              rotation={[0, -0.721, 0]}>
              <mesh
                name="TallWallEntrance_1"
                castShadow
                receiveShadow
                geometry={nodes.TallWallEntrance_1.geometry}
                material={materials.Opaque_Mat}
              />
            </group>
            <group name="PointyTower" position={[2.345, -0.029, -0.873]} rotation={[0, -0.729, 0]}>
              <mesh
                name="PointyTower_1"
                castShadow
                receiveShadow
                geometry={nodes.PointyTower_1.geometry}
                material={materials.Opaque_Mat}
              />
            </group>
            <group
              name="SmallSquareTowerBricks"
              position={[1.281, -0.016, -1.725]}
              rotation={[0, -0.729, 0]}>
              <mesh
                name="SmallSquareTowerBricks_1"
                castShadow
                receiveShadow
                geometry={nodes.SmallSquareTowerBricks_1.geometry}
                material={materials.Opaque_Mat}
              />
            </group>
            <group name="Scenery">
              <group name="Well_2" position={[1.627, -0.022, -0.008]} rotation={[0, 1.257, 0]}>
                <mesh
                  name="Well_3"
                  castShadow
                  receiveShadow
                  geometry={nodes.Well_3.geometry}
                  material={materials.Opaque_Mat}
                />
              </group>
              <group
                name="RockSmall2_2"
                position={[2.161, -0.01, 0.377]}
                rotation={[Math.PI, -0.165, Math.PI]}
                scale={1.002}>
                <mesh
                  name="RockSmall2_3"
                  castShadow
                  receiveShadow
                  geometry={nodes.RockSmall2_3.geometry}
                  material={materials.StonesGrey}
                />
              </group>
              <group
                name="RockSmall3_2"
                position={[-0.126, -0.015, -0.986]}
                rotation={[Math.PI, -1.152, Math.PI]}
                scale={0.999}>
                <mesh
                  name="RockSmall3_3"
                  castShadow
                  receiveShadow
                  geometry={nodes.RockSmall3_3.geometry}
                  material={materials.StonesGrey}
                />
              </group>
              <group
                name="Tree_2"
                position={[-0.91, -0.003, -1.77]}
                rotation={[0, 1.356, 0]}
                scale={1.005}>
                <mesh
                  name="Tree_3"
                  castShadow
                  receiveShadow
                  geometry={nodes.Tree_3.geometry}
                  material={materials.Opaque_Mat}
                  scale={0.829}
                />
              </group>
              <group name="Plant1" position={[-3.045, -0.148, -2.233]}>
                <mesh
                  name="Plant1_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.Plant1_1.geometry}
                  material={materials.Opaque_Mat}
                />
              </group>
              <group
                name="Plant2"
                position={[2.967, -0.131, 1.169]}
                rotation={[Math.PI, -0.139, Math.PI]}>
                <mesh
                  name="Plant2_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.Plant2_1.geometry}
                  material={materials.Opaque_Mat}
                />
              </group>
              <group name="Plant3" position={[-1.06, 0.003, -1.54]}>
                <mesh
                  name="Plant3_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.Plant3_1.geometry}
                  material={materials.Opaque_Mat}
                />
              </group>
            </group>
            <group name="People">
              <group name="Object" position={[5.1, 0.78, -0.69]} scale={0}>
                <group name="SimpleTowerBricks_2">
                  <mesh
                    name="SimpleTowerBricks_3"
                    castShadow
                    receiveShadow
                    geometry={nodes.SimpleTowerBricks_3.geometry}
                    material={materials.Opaque_Mat}
                  />
                </group>
              </group>
              <group name="Object2" position={[-0.1, 0, 0.66]}>
                <group name="SmallSquareTower_2">
                  <mesh
                    name="SmallSquareTower_3"
                    castShadow
                    receiveShadow
                    geometry={nodes.SmallSquareTower_3.geometry}
                    material={materials.Opaque_Mat}
                  />
                </group>
              </group>
              <group name="Object3" position={[-0.39, 0, -0.4]}>
                <group name="RockSmall2_4">
                  <mesh
                    name="RockSmall2_5"
                    castShadow
                    receiveShadow
                    geometry={nodes.RockSmall2_5.geometry}
                    material={materials.StonesGrey}
                  />
                </group>
              </group>
              <group name="Object4" position={[5.203, 0.705, 2.44]} rotation={[0, -1.57, 0]}>
                <group name="Unicorn_01_" rotation={[0, -1.57, 0]} scale={2.246}>
                  <group name="Unicorn_01_Cube_028_Cube_030_1">
                    <mesh
                      name="Unicorn_01_Cube_028_Cube_030_3"
                      castShadow
                      receiveShadow
                      geometry={nodes.Unicorn_01_Cube_028_Cube_030_3.geometry}
                      material={materials.F06292}
                    />
                    <mesh
                      name="Unicorn_01_Cube_028_Cube_030_4"
                      castShadow
                      receiveShadow
                      geometry={nodes.Unicorn_01_Cube_028_Cube_030_4.geometry}
                      material={materials.FFFFFF}
                    />
                    <mesh
                      name="Unicorn_01_Cube_028_Cube_030_5"
                      castShadow
                      receiveShadow
                      geometry={nodes.Unicorn_01_Cube_028_Cube_030_5.geometry}
                      material={materials._1A1A1A}
                    />
                    <mesh
                      name="Unicorn_01_Cube_028_Cube_030_6"
                      castShadow
                      receiveShadow
                      geometry={nodes.Unicorn_01_Cube_028_Cube_030_6.geometry}
                      material={materials.FF9800}
                    />
                  </group>
                </group>
              </group>
              <group
                name="Object5"
                position={[5.203, 0.737, 1.776]}
                rotation={[0, -1.57, 0]}
                scale={2.273}>
                <group name="Dragon_01_(1)">
                  <group name="Dragon_01_Cube_026_1">
                    <mesh
                      name="Dragon_01_Cube_026_3"
                      castShadow
                      receiveShadow
                      geometry={nodes.Dragon_01_Cube_026_3.geometry}
                      material={materials.F44336}
                    />
                    <mesh
                      name="Dragon_01_Cube_026_4"
                      castShadow
                      receiveShadow
                      geometry={nodes.Dragon_01_Cube_026_4.geometry}
                      material={materials._009688}
                    />
                    <mesh
                      name="Dragon_01_Cube_026_5"
                      castShadow
                      receiveShadow
                      geometry={nodes.Dragon_01_Cube_026_5.geometry}
                      material={materials._1A1A1A}
                    />
                    <mesh
                      name="Dragon_01_Cube_026_6"
                      castShadow
                      receiveShadow
                      geometry={nodes.Dragon_01_Cube_026_6.geometry}
                      material={materials.FFFFFF}
                    />
                  </group>
                </group>
              </group>
              <group
                name="PersonVR"
                position={[-2.28, 0.009, 0.82]}
                rotation={[-Math.PI, 1.354, -Math.PI]}>
                <group name="Person">
                  <mesh
                    name="Body"
                    castShadow
                    receiveShadow
                    geometry={nodes.Body.geometry}
                    material={materials['PersonGradient-MulriUserEvent']}
                    position={[0, 0.775, 0]}>
                    <mesh
                      name="ArmLeft"
                      castShadow
                      receiveShadow
                      geometry={nodes.ArmLeft.geometry}
                      material={materials['PersonGradient-MulriUserEvent']}
                      position={[0.069, 0.226, -0.003]}
                      scale={1.229}>
                      <mesh
                        name="IconVRController_L"
                        castShadow
                        receiveShadow
                        geometry={nodes.IconVRController_L.geometry}
                        material={materials['BlockRed.001']}
                        position={[0.032, -0.18, 0.28]}
                        rotation={[0.453, 0, 0]}
                        scale={0.814}
                      />
                    </mesh>
                    <mesh
                      name="ArmRight"
                      castShadow
                      receiveShadow
                      geometry={nodes.ArmRight.geometry}
                      material={materials['PersonGradient-MulriUserEvent']}
                      position={[-0.061, 0.226, 0.007]}
                      scale={1.229}>
                      <mesh
                        name="IconVRController_R"
                        castShadow
                        receiveShadow
                        geometry={nodes.IconVRController_R.geometry}
                        material={materials['BlockRed.001']}
                        position={[-0.032, -0.18, 0.272]}
                        rotation={[0.453, 0, 0]}
                        scale={0.814}
                      />
                    </mesh>
                    <group name="Communication" position={[0, 0.756, 0]}>
                      <mesh
                        name="IconSpeech"
                        castShadow
                        receiveShadow
                        geometry={nodes.IconSpeech.geometry}
                        material={materials.SpeechMat}
                        position={[0.115, 0.318, 0]}
                        rotation={[Math.PI / 2, 0, 0]}
                      />
                    </group>
                    <mesh
                      name="Head"
                      castShadow
                      receiveShadow
                      geometry={nodes.Head.geometry}
                      material={materials['PersonGradient-MulriUserEvent']}
                      position={[0, 0.304, 0]}>
                      <mesh
                        name="IconHMD"
                        castShadow
                        receiveShadow
                        geometry={nodes.IconHMD.geometry}
                        material={materials['BlockRed.001']}
                        position={[0, 0.203, 0.192]}
                      />
                    </mesh>
                    <mesh
                      name="LegLeft"
                      castShadow
                      receiveShadow
                      geometry={nodes.LegLeft.geometry}
                      material={materials['PersonGradient-MulriUserEvent']}
                      position={[0.072, -0.291, 0]}
                    />
                    <mesh
                      name="LegRight"
                      castShadow
                      receiveShadow
                      geometry={nodes.LegRight.geometry}
                      material={materials['PersonGradient-MulriUserEvent']}
                      position={[-0.072, -0.291, 0]}
                    />
                  </mesh>
                </group>
              </group>
              <group
                name="PersonPhone_Empty001"
                position={[1.781, 0.009, 2.182]}
                rotation={[Math.PI, -0.698, Math.PI]}>
                <group name="Person_1">
                  <mesh
                    name="Body_1"
                    castShadow
                    receiveShadow
                    geometry={nodes.Body_1.geometry}
                    material={materials['PersonGradient-MulriUserEvent']}
                    position={[0, 0.775, 0]}>
                    <mesh
                      name="ArmLeft_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.ArmLeft_1.geometry}
                      material={materials['PersonGradient-MulriUserEvent']}
                      position={[0.069, 0.226, -0.003]}
                      scale={1.229}
                    />
                    <mesh
                      name="ArmRight_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.ArmRight_1.geometry}
                      material={materials['PersonGradient-MulriUserEvent']}
                      position={[-0.061, 0.226, 0.007]}
                      scale={1.229}>
                      <group
                        name="IconPhone"
                        position={[0.025, -0.086, 0.276]}
                        rotation={[-Math.PI, 0.347, -Math.PI]}
                        scale={0.814}>
                        <mesh
                          name="IconPhone_1"
                          castShadow
                          receiveShadow
                          geometry={nodes.IconPhone_1.geometry}
                          material={materials.BlockOrange}
                        />
                        <mesh
                          name="IconPhone_2"
                          castShadow
                          receiveShadow
                          geometry={nodes.IconPhone_2.geometry}
                          material={materials['White.001']}
                        />
                        <mesh
                          name="PhoneightAR"
                          castShadow
                          receiveShadow
                          geometry={nodes.PhoneightAR.geometry}
                          material={materials.ProjectorLight}
                          position={[-0.003, 0.028, -0.009]}
                          rotation={[-1.875, -0.108, -2.811]}
                          scale={0.403}
                        />
                        <mesh
                          name="PhoneightFace"
                          castShadow
                          receiveShadow
                          geometry={nodes.PhoneightFace.geometry}
                          material={materials['ProjectorLight Variant']}
                          position={[0, -0.001, 0]}
                          rotation={[1.261, 0.11, 2.812]}
                          scale={[0.335, 0.108, 0.687]}
                        />
                      </group>
                    </mesh>
                    <group name="Communication_1" position={[0, 0.756, 0]} />
                    <mesh
                      name="Head_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.Head_1.geometry}
                      material={materials['PersonGradient-MulriUserEvent']}
                      position={[0, 0.304, 0]}
                    />
                    <mesh
                      name="LegLeft_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.LegLeft_1.geometry}
                      material={materials['PersonGradient-MulriUserEvent']}
                      position={[0.072, -0.291, 0]}
                    />
                    <mesh
                      name="LegRight_1"
                      castShadow
                      receiveShadow
                      geometry={nodes.LegRight_1.geometry}
                      material={materials['PersonGradient-MulriUserEvent']}
                      position={[-0.072, -0.291, 0]}
                    />
                  </mesh>
                </group>
              </group>
              <group
                name="PersonHMD_Empty001"
                position={[-2.398, 0.009, -0.873]}
                rotation={[0, 0.89, 0]}>
                <group name="Person_2">
                  <mesh
                    name="Body_2"
                    castShadow
                    receiveShadow
                    geometry={nodes.Body_2.geometry}
                    material={materials['PersonGradient-MulriUserEvent']}
                    position={[0, 0.775, 0]}>
                    <mesh
                      name="ArmLeft_2"
                      castShadow
                      receiveShadow
                      geometry={nodes.ArmLeft_2.geometry}
                      material={materials['PersonGradient-MulriUserEvent']}
                      position={[0.069, 0.226, -0.003]}
                      scale={1.229}>
                      <mesh
                        name="IconVRController_L_1"
                        castShadow
                        receiveShadow
                        geometry={nodes.IconVRController_L_1.geometry}
                        material={materials['BlockRed.001']}
                        position={[0.032, -0.18, 0.28]}
                        rotation={[0.453, 0, 0]}
                        scale={0.814}
                      />
                    </mesh>
                    <mesh
                      name="ArmRight_2"
                      castShadow
                      receiveShadow
                      geometry={nodes.ArmRight_2.geometry}
                      material={materials['PersonGradient-MulriUserEvent']}
                      position={[-0.061, 0.226, 0.007]}
                      scale={1.229}>
                      <mesh
                        name="IconVRController_R_1"
                        castShadow
                        receiveShadow
                        geometry={nodes.IconVRController_R_1.geometry}
                        material={materials['BlockRed.001']}
                        position={[-0.032, -0.18, 0.272]}
                        rotation={[0.453, 0, 0]}
                        scale={0.814}
                      />
                    </mesh>
                    <group name="Communication_2" position={[0, 0.756, 0]}>
                      <mesh
                        name="IconSpeech_1"
                        castShadow
                        receiveShadow
                        geometry={nodes.IconSpeech_1.geometry}
                        material={materials.SpeechMat}
                        position={[0.115, 0.318, 0]}
                        rotation={[Math.PI / 2, 0, 0]}
                      />
                    </group>
                    <mesh
                      name="Head_2"
                      castShadow
                      receiveShadow
                      geometry={nodes.Head_2.geometry}
                      material={materials['PersonGradient-MulriUserEvent']}
                      position={[0, 0.304, 0]}>
                      <mesh
                        name="IconHMD_1"
                        castShadow
                        receiveShadow
                        geometry={nodes.IconHMD_1.geometry}
                        material={materials['BlockRed.001']}
                        position={[0, 0.203, 0.192]}
                      />
                    </mesh>
                    <mesh
                      name="LegLeft_2"
                      castShadow
                      receiveShadow
                      geometry={nodes.LegLeft_2.geometry}
                      material={materials['PersonGradient-MulriUserEvent']}
                      position={[0.072, -0.291, 0]}
                    />
                    <mesh
                      name="LegRight_2"
                      castShadow
                      receiveShadow
                      geometry={nodes.LegRight_2.geometry}
                      material={materials['PersonGradient-MulriUserEvent']}
                      position={[-0.072, -0.291, 0]}
                    />
                  </mesh>
                </group>
              </group>
            </group>
            <group name="LittleGuards" position={[2.238, 0.456, -1.124]}>
              <group
                name="Unicorn"
                position={[-0.472, 0.012, -0.9]}
                rotation={[0, -0.065, 0]}
                scale={0.001}>
                <group name="Unicorn_1">
                  <group name="Unicorn_01_Cube_028_Cube_030_2">
                    <mesh
                      name="Unicorn_01_Cube_028_Cube_030_3"
                      castShadow
                      receiveShadow
                      geometry={nodes.Unicorn_01_Cube_028_Cube_030_3.geometry}
                      material={materials.F06292}
                    />
                    <mesh
                      name="Unicorn_01_Cube_028_Cube_030_4"
                      castShadow
                      receiveShadow
                      geometry={nodes.Unicorn_01_Cube_028_Cube_030_4.geometry}
                      material={materials.FFFFFF}
                    />
                    <mesh
                      name="Unicorn_01_Cube_028_Cube_030_5"
                      castShadow
                      receiveShadow
                      geometry={nodes.Unicorn_01_Cube_028_Cube_030_5.geometry}
                      material={materials._1A1A1A}
                    />
                    <mesh
                      name="Unicorn_01_Cube_028_Cube_030_6"
                      castShadow
                      receiveShadow
                      geometry={nodes.Unicorn_01_Cube_028_Cube_030_6.geometry}
                      material={materials.FF9800}
                    />
                  </group>
                </group>
              </group>
              <group
                name="Dragon"
                position={[0.334, 0.712, -0.033]}
                rotation={[Math.PI, -1.218, Math.PI]}
                scale={0.001}>
                <group name="Dragon_1">
                  <group name="Dragon_01_Cube_026_2">
                    <mesh
                      name="Dragon_01_Cube_026_3"
                      castShadow
                      receiveShadow
                      geometry={nodes.Dragon_01_Cube_026_3.geometry}
                      material={materials.F44336}
                    />
                    <mesh
                      name="Dragon_01_Cube_026_4"
                      castShadow
                      receiveShadow
                      geometry={nodes.Dragon_01_Cube_026_4.geometry}
                      material={materials._009688}
                    />
                    <mesh
                      name="Dragon_01_Cube_026_5"
                      castShadow
                      receiveShadow
                      geometry={nodes.Dragon_01_Cube_026_5.geometry}
                      material={materials._1A1A1A}
                    />
                    <mesh
                      name="Dragon_01_Cube_026_6"
                      castShadow
                      receiveShadow
                      geometry={nodes.Dragon_01_Cube_026_6.geometry}
                      material={materials.FFFFFF}
                    />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
    </>
  );
};