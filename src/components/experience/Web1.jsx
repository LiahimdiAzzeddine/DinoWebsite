import {useContext, useEffect, useLayoutEffect, useRef} from "react";
import { useGLTF, PerspectiveCamera, useAnimations } from "@react-three/drei";
import gsap from "gsap";
import { AnimationContext } from "./AnimationContext";
import * as THREE from "three";
import {Clock} from "three";

export function Web1({ isActive, lenis, ...props }) {
  const group = useRef();
  const sceneContainerGroup = useRef();
  const { nodes, materials, animations } = useGLTF("./models/Web1.glb");
  const animationsPlay = [
    "Armature.001Action",
    "Armature.003Action.003",
    "Armature.004Action.002",
    "Cube.032Action",
    "Empty.001Action.001",
    "Empty.003Action.001",
    "Empty.005Action",
    "Empty.006Action",
    "Empty.009Action.002",
    "Empty.010Action.002",
    "Empty.010Action.004",
    "Sphere.010Action",
    "Sphere.011Action",
  ];

  const enterBackPose = {
    pos: { x: 9.518234104129505, y: 10.246442276415198, z: 13.155294189145259 },
    rot: {
      x: -0.5847639562422204,
      y: 0.6849448260986001,
      z: 0.35641899589135906,
    },
  };
  const { actions, mixer } = useAnimations(animations, group);

  const { currentModel, setIsTransitioning, isTransitioning } =
    useContext(AnimationContext);
  const timelineMain = useRef();
  // track scrolling status
  let isEnteringBack = false;
  let hasLeft = false;
  const currentTween = useRef(null);


  useLayoutEffect(() => {
    if (!isActive || !actions || !mixer || !group.current) return;

    animationsPlay.forEach((name) => {
      actions[name]?.reset().play();
    });
    const camAct = actions["CameraIn"];
    const camera = group.current.getObjectByName("Camera001");
    let sectionScrollProgress = 0;
    if (!camAct || !camera) return;

    camAct.reset().play().paused = true;
    const clipDur = camAct.getClip().duration;


    timelineMain.current = gsap.timeline({
      scrollTrigger: {
        trigger: "#section2",
        start: "top bottom",
        end: "top top",
        scrub: 0.3,
        onUpdate: (self) => {
          sectionScrollProgress = self.progress;
          if (!isTransitioning && !isEnteringBack && !hasLeft) {
            // Kill any existing tween
            if (currentTween.current) {
              currentTween.current.kill();
            }

            // Create new tween
            currentTween.current = gsap.to(camAct, {
              time: sectionScrollProgress * clipDur,
              duration: 0.1, // Adjust this value to control smoothing amount
              ease: "sine.out",
              overwrite: true
            });
          }
        },
        onLeave: () => {
          if (currentModel !== "Model1" || isTransitioning) return;
          setIsTransitioning(true);
          hasLeft = true;

          // timelineMain.current.pause();
          gsap.to(sceneContainerGroup.current.position, {
            y: sceneContainerGroup.current.position.y + 150,
            duration:0.5,
            ease:"sine.inOut",
            onComplete: () => {
              setIsTransitioning(false);
              console.log("onComplete: cam position: " , sceneContainerGroup.current.y);
            },
          });
        },
        onEnterBack: () => {
          if (currentModel !== "Model1" || isTransitioning) return;
          console.log("🚀 ~ useLayoutEffect ~ onEnterBack:");
          setIsTransitioning(true);
          isEnteringBack = true;
          gsap.to(sceneContainerGroup.current.position, {
            y: sceneContainerGroup.current.position.y - 150,
            duration: 1,
            ease: "sine.out",
            onComplete: () => {
              setIsTransitioning(false);
              isEnteringBack = false;
              hasLeft = false;
            }
          });
        },
      },
    });

    return () => {
      timelineMain.current?.kill();
      mixer.stopAllAction();
    };
  }, []);

  return (
    <group ref={group} {...props} dispose={null} visible={isActive}>
      <group name="Scene">
        <PerspectiveCamera
          name="Camera001"
          makeDefault={isActive}
          far={1000}
          near={0.1}
          fov={18.848}
          position={[3.446, 20.931, 15.945]}
          rotation={[-0.417, 0.041, -0.022]}
        />
        <group ref={sceneContainerGroup} name="scene_container">

        <mesh
          name="GroundCubeQuad003"
          castShadow
          receiveShadow
          geometry={nodes.GroundCubeQuad003.geometry}
          material={materials.Ground_FileSize_Mat}
          position={[0.033, -0.966, -0.183]}
          scale={[1.223, 0.997, 1.039]}
        />
        <group
          name="Cube027"
          position={[-1.161, 2.888, 0.952]}
          rotation={[3.14, 0.051, 2.935]}
          scale={0.803}
        >
          <mesh
            name="Cube015"
            castShadow
            receiveShadow
            geometry={nodes.Cube015.geometry}
            material={materials["ArcadeMetal.001"]}
          />
          <mesh
            name="Cube015_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube015_1.geometry}
            material={materials["Material.011"]}
          />
          <mesh
            name="Cube015_2"
            castShadow
            receiveShadow
            geometry={nodes.Cube015_2.geometry}
            material={materials["Material.016"]}
          />
          <mesh
            name="Cube015_3"
            castShadow
            receiveShadow
            geometry={nodes.Cube015_3.geometry}
            material={materials["Material.013"]}
          />
          <group
            name="Cylinder005"
            position={[0.07, -0.534, -0.167]}
            rotation={[-1.735, 1.532, -1.233]}
            scale={[0.021, 0.453, 0.021]}
          >
            <mesh
              name="Cylinder013"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder013.geometry}
              material={materials["Material.010"]}
            />
            <mesh
              name="Cylinder013_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder013_1.geometry}
              material={materials.Blackk}
            />
          </group>
          <group
            name="Cylinder006"
            position={[0.043, -0.098, -0.004]}
            rotation={[-1.735, 1.532, 0.154]}
            scale={[0.027, 0.292, 0.027]}
          >
            <mesh
              name="Cylinder012"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder012.geometry}
              material={nodes.Cylinder012.material}
            />
            <mesh
              name="Cylinder012_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder012_1.geometry}
              material={materials.Blackk}
            />
          </group>
          <group
            name="Cylinder007"
            position={[0.229, -0.492, -0.005]}
            rotation={[-0.01, 0.006, 0.48]}
            scale={[0.021, 0.454, 0.02]}
          >
            <mesh
              name="Cylinder014"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder014.geometry}
              material={materials["Material.009"]}
            />
            <mesh
              name="Cylinder014_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder014_1.geometry}
              material={materials.Blackk}
            />
          </group>
        </group>
        <group name="Empty002" position={[-0.228, 2.14, 0.512]}>
          <group name="Retopo_Cube" rotation={[0, 1.005, 0]} scale={0.29}>
            <mesh
              name="mesh"
              castShadow
              receiveShadow
              geometry={nodes.mesh.geometry}
              material={materials["spike.001"]}
            />
            <mesh
              name="mesh_1"
              castShadow
              receiveShadow
              geometry={nodes.mesh_1.geometry}
              material={materials["Material.022"]}
            />
            <mesh
              name="mesh_2"
              castShadow
              receiveShadow
              geometry={nodes.mesh_2.geometry}
              material={materials.Blackk}
            />
          </group>
          <group name="Retopo_Cube001" rotation={[0, 1.005, 0]} scale={0.29}>
            <mesh
              name="mesh003"
              castShadow
              receiveShadow
              geometry={nodes.mesh003.geometry}
              material={materials["spike.001"]}
            />
            <mesh
              name="mesh003_1"
              castShadow
              receiveShadow
              geometry={nodes.mesh003_1.geometry}
              material={materials["Material.005"]}
            />
            <mesh
              name="mesh003_2"
              castShadow
              receiveShadow
              geometry={nodes.mesh003_2.geometry}
              material={materials.Blackk}
            />
          </group>
        </group>
        <group name="Empty004" position={[-0.569, 2.089, 0.83]} scale={0.342}>
          <group name="Cube004" scale={[3.169, 3.251, 3.169]}>
            <mesh
              name="Cube009"
              castShadow
              receiveShadow
              geometry={nodes.Cube009.geometry}
              material={materials["Material.014"]}
            />
            <mesh
              name="Cube009_1"
              castShadow
              receiveShadow
              geometry={nodes.Cube009_1.geometry}
              material={materials["Material.017"]}
            />
            <mesh
              name="Cube009_2"
              castShadow
              receiveShadow
              geometry={nodes.Cube009_2.geometry}
              material={materials["Material.018"]}
            />
          </group>
        </group>
        <group name="Cube001" position={[-0.793, 1.533, -0.855]}>
          <mesh
            name="Cube018"
            castShadow
            receiveShadow
            geometry={nodes.Cube018.geometry}
            material={materials["Material.004"]}
          />
          <mesh
            name="Cube018_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube018_1.geometry}
            material={materials["Material.001"]}
          />
        </group>
        <mesh
          name="Cube005"
          castShadow
          receiveShadow
          geometry={nodes.Cube005.geometry}
          material={materials["Material.002"]}
          position={[0.016, 1.473, 0.089]}
        />
        <mesh
          name="Circle012"
          castShadow
          receiveShadow
          geometry={nodes.Circle012.geometry}
          material={nodes.Circle012.material}
          position={[-1.198, 1.669, 1.767]}
          scale={[1.104, 1, 1.104]}
        />
        <group
          name="BézierCurve001"
          position={[-1.151, 1.699, 1.75]}
          scale={[1.104, 1, 1.104]}
        />
        <mesh
          name="Circle005"
          castShadow
          receiveShadow
          geometry={nodes.Circle005.geometry}
          material={nodes.Circle005.material}
          position={[-1.043, 1.767, -1.047]}
        />
        <group name="Empty" position={[1.106, 1.058, -0.662]} scale={0.256}>
          <mesh
            name="Sphere"
            castShadow
            receiveShadow
            geometry={nodes.Sphere.geometry}
            material={materials["Material.003"]}
            position={[0.003, -0.01, 0]}
            scale={[0.385, 0.379, 0.379]}
          />
        </group>
        <group name="BézierCurve002" position={[-1.017, 10.239, 1.56]} />
        <group name="Empty007" position={[1.114, 1.058, -0.982]} scale={0.256}>
          <mesh
            name="Sphere004"
            castShadow
            receiveShadow
            geometry={nodes.Sphere004.geometry}
            material={materials["Material.003"]}
            position={[0.003, -0.01, 0]}
            scale={[0.385, 0.379, 0.379]}
          />
        </group>
        <group name="Empty008" position={[1.098, 1.058, -0.333]} scale={0.256}>
          <mesh
            name="Sphere008"
            castShadow
            receiveShadow
            geometry={nodes.Sphere008.geometry}
            material={materials["Material.003"]}
            position={[0.003, -0.01, 0]}
            scale={[0.385, 0.379, 0.379]}
          />
        </group>
        <group name="Empty009" position={[1.089, 1.058, 0.046]} scale={0.256}>
          <mesh
            name="Sphere009"
            castShadow
            receiveShadow
            geometry={nodes.Sphere009.geometry}
            material={materials["Material.003"]}
            position={[0.003, -0.01, 0]}
            scale={[0.385, 0.379, 0.379]}
          />
        </group>
        <group
          name="Empty010"
          position={[1.123, 1.058, -1.336]}
          rotation={[-0.052, 0.055, -0.004]}
          scale={0.256}
        >
          <mesh
            name="Sphere010"
            castShadow
            receiveShadow
            geometry={nodes.Sphere010.geometry}
            material={materials["Material.003"]}
            position={[0.003, 0.291, 0]}
            rotation={[-0.595, 0, 0]}
            scale={[0.503, 0.494, 0.494]}
          />
          <mesh
            name="Sphere011"
            castShadow
            receiveShadow
            geometry={nodes.Sphere011.geometry}
            material={materials["Material.003"]}
            position={[0.003, 0.291, 0]}
            rotation={[0.524, 0, Math.PI]}
            scale={[0.503, 0.494, 0.494]}
          />
        </group>
        <mesh
          name="Cylinder002"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder002.geometry}
          material={materials["Material.022"]}
          position={[-0.221, 2.628, -0.663]}
          rotation={[Math.PI, -0.93, Math.PI]}
          scale={0.05}
        />
        <group
          name="Armature001"
          position={[-0.724, 2.797, 0.172]}
          rotation={[0, -0.251, 0]}
          scale={0.219}
        >
          <group name="Retopo_Sphere001">
            <skinnedMesh
              name="mesh001"
              geometry={nodes.mesh001.geometry}
              material={materials["Material.032"]}
              skeleton={nodes.mesh001.skeleton}
            />

            <skinnedMesh
              name="mesh001_1"
              geometry={nodes.mesh001_1.geometry}
              material={materials.pants}
              skeleton={nodes.mesh001_1.skeleton}
            />
            <skinnedMesh
              name="mesh001_2"
              geometry={nodes.mesh001_2.geometry}
              material={materials.skin}
              skeleton={nodes.mesh001_2.skeleton}
            />
            <group
              name="Empty005"
              position={[0.606, -0.576, 0.21]}
              scale={1.043}
            />
            <group
              name="Empty006"
              position={[-0.672, -0.557, 0.358]}
              scale={0.834}
            />
          </group>
          <primitive object={nodes.Bone} />
          <primitive object={nodes.Bone007} />
          <primitive object={nodes.Bone008} />
        </group>
        <group
          name="Cube003"
          position={[1.37, 1.732, -0.435]}
          rotation={[0, -0.475, -Math.PI]}
          scale={[-0.65, -0.719, -0.65]}
        >
          <mesh
            name="Cube011"
            castShadow
            receiveShadow
            geometry={nodes.Cube011.geometry}
            material={materials["ArcadeBase.002"]}
          />
          <mesh
            name="Cube011_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube011_1.geometry}
            material={materials["Material.023"]}
          />
          <group
            name="Armature004"
            position={[-0.046, -0.107, -0.705]}
            rotation={[-1.718, 0.101, -3.135]}
            scale={[0.337, 0.336, 0.306]}
          >
            <group name="Retopo_Sphere004">
              <skinnedMesh
                name="mesh008"
                geometry={nodes.mesh008.geometry}
                material={materials["Material.020"]}
                skeleton={nodes.mesh008.skeleton}
              />
              <skinnedMesh
                name="mesh008_1"
                geometry={nodes.mesh008_1.geometry}
                material={materials["pants.002"]}
                skeleton={nodes.mesh008_1.skeleton}
              />
              <skinnedMesh
                name="mesh008_2"
                geometry={nodes.mesh008_2.geometry}
                material={materials["skin.002"]}
                skeleton={nodes.mesh008_2.skeleton}
              />
              <group
                name="Empty001"
                position={[-0.535, 1.454, 1.297]}
                rotation={[0, 0.223, 0]}
                scale={1.043}
              />
              <group
                name="Empty003"
                position={[-0.084, 1.321, 1.145]}
                rotation={[0, 0.223, 0]}
                scale={0.834}
              />
            </group>
            <primitive object={nodes.Bone_1} />
            <primitive object={nodes.Bone007_1} />
            <primitive object={nodes.Bone008_1} />
          </group>
          <group name="Cube032">
            <mesh
              name="Cube037"
              castShadow
              receiveShadow
              geometry={nodes.Cube037.geometry}
              material={materials["ArcadeBase.002"]}
            />
            <mesh
              name="Cube037_1"
              castShadow
              receiveShadow
              geometry={nodes.Cube037_1.geometry}
              material={materials["ArcadeMetal.003"]}
            />
            <mesh
              name="Cube037_2"
              castShadow
              receiveShadow
              geometry={nodes.Cube037_2.geometry}
              material={materials["Material.021"]}
            />
            <mesh
              name="Cube037_3"
              castShadow
              receiveShadow
              geometry={nodes.Cube037_3.geometry}
              material={materials["Material.023"]}
            />
            <mesh
              name="Cube037_4"
              castShadow
              receiveShadow
              geometry={nodes.Cube037_4.geometry}
              material={materials["Material.024"]}
            />
            <mesh
              name="Cube037_5"
              castShadow
              receiveShadow
              geometry={nodes.Cube037_5.geometry}
              material={materials["Material.025"]}
            />
          </group>
        </group>
        <mesh
          name="Plane"
          castShadow
          receiveShadow
          geometry={nodes.Plane.geometry}
          material={materials.Desk}
          position={[-0.7, 3.171, -0.899]}
          rotation={[0, 0.616, 0]}
        >
          <group
            name="Armature003"
            position={[0.077, 0.087, -0.463]}
            rotation={[0, 0.014, 0]}
            scale={0.202}
          >
            <group name="Retopo_Sphere009">
              <skinnedMesh
                name="mesh013"
                geometry={nodes.mesh013.geometry}
                material={materials["Material.032"]}
                skeleton={nodes.mesh013.skeleton}
              />
              <skinnedMesh
                name="mesh013_1"
                geometry={nodes.mesh013_1.geometry}
                material={materials["pants.004"]}
                skeleton={nodes.mesh013_1.skeleton}
              />
              <skinnedMesh
                name="mesh013_2"
                geometry={nodes.mesh013_2.geometry}
                material={materials["skin.004"]}
                skeleton={nodes.mesh013_2.skeleton}
              />
              <group
                name="Empty021"
                position={[0.951, -0.059, 1.676]}
                rotation={[0, -0.594, 0]}
                scale={1.043}
              />
              <group
                name="Empty022"
                position={[-0.609, 0.103, 1.839]}
                scale={0.834}
              />
            </group>
            <primitive object={nodes.Bone_2} />
            <primitive object={nodes.Bone007_2} />
            <primitive object={nodes.Bone008_2} />
          </group>
          <group
            name="Cylinder001"
            position={[-0.276, 0.22, 0.125]}
            rotation={[0, 0.339, 0]}
            scale={[0.071, 0.09, 0.071]}
          >
            <mesh
              name="Cylinder015"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder015.geometry}
              material={materials["Material.031"]}
            />
            <mesh
              name="Cylinder015_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder015_1.geometry}
              material={materials["skin.004"]}
            />
          </group>
          <mesh
            name="LAPTOP003"
            castShadow
            receiveShadow
            geometry={nodes.LAPTOP003.geometry}
            material={materials["BASE_LAPTOP_MAT.002"]}
            position={[0.03, 0.063, -0.101]}
            rotation={[0, 0.037, 0]}
            scale={[-0.164, -0.014, -0.105]}
          />
          <group
            name="SCREEN_LAPTOP003"
            position={[0.035, 0.175, 0.064]}
            rotation={[-1.085, 0.017, 0.033]}
            scale={[-0.164, -0.014, -0.105]}
          >
            <mesh
              name="Cube045"
              castShadow
              receiveShadow
              geometry={nodes.Cube045.geometry}
              material={materials["KEYBOARD.002"]}
            />
            <mesh
              name="Cube045_1"
              castShadow
              receiveShadow
              geometry={nodes.Cube045_1.geometry}
              material={materials["CODE_SCREEN_MAT.002"]}
            />
          </group>
        </mesh>
        <mesh
          name="LAPTOP001"
          castShadow
          receiveShadow
          geometry={nodes.LAPTOP001.geometry}
          material={materials["BASE_LAPTOP_MAT.002"]}
          position={[1.472, 1.557, 0.398]}
          rotation={[-Math.PI, 1.334, -Math.PI]}
          scale={[-0.164, -0.014, -0.105]}
        />
        <group
          name="SCREEN_LAPTOP001"
          position={[1.634, 1.668, 0.36]}
          rotation={[-1.694, 0.471, 1.837]}
          scale={[-0.164, -0.014, -0.105]}
        >
          <mesh
            name="Cube002"
            castShadow
            receiveShadow
            geometry={nodes.Cube002.geometry}
            material={materials["KEYBOARD.002"]}
          />
          <mesh
            name="Cube002_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube002_1.geometry}
            material={materials["CODE_SCREEN_MAT.002"]}
          />
        </group>
        </group>

      </group>
    </group>
  );
}

useGLTF.preload("./models/Web1.glb");
