import {useContext, useEffect, useLayoutEffect, useRef} from "react";
import { useGLTF, PerspectiveCamera, useAnimations } from "@react-three/drei";
import gsap from "gsap";
import {Observer} from "gsap/Observer";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import { AnimationContext } from "./AnimationContext";
import * as THREE from "three";
import {Clock} from "three";
import {useThree} from "@react-three/fiber";

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

export function Web1({sectionID, isActive, lenis, ...props }) {
  const group = useRef();
  const sceneContainerGroup = useRef();
  const { nodes, materials, animations } = useGLTF("./models/web1webp.glb");
  const { actions, mixer } = useAnimations(animations, group);
  const { currentModel, setCurrentModel, setIsTransitioning, isTransitioning } = useContext(AnimationContext);
  const timelineMain = useRef();
  const { viewport } = useThree()

  // track scrolling status
  const currentTween = useRef(null);
  let nextScrollTrigger = null;

  let disableOtherSections = ()=>{
    if (!nextScrollTrigger){
      let currentScrollTrigger = ScrollTrigger.getById(sectionID);
      if (currentScrollTrigger && currentScrollTrigger.next()) {
        nextScrollTrigger = currentScrollTrigger.next();
        nextScrollTrigger.disable();
      }
    }else{
      nextScrollTrigger.disable();
    }
  }

  let enableOtherSections = ()=>{
    // use when scroll is too quick for transitions
    // this way any section t the end of the scroll could take control and disable the others
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.id !== sectionID) {
        trigger.enable();
      }
    })
  }

  const viewportRef = useRef(viewport);
  useEffect(() => {
    viewportRef.current = viewport;
  }, [viewport]);

  useLayoutEffect(() => {

    // animations
    animationsPlay.forEach((name) => {
      actions[name]?.reset().play();
    });
    const camAct = actions["CameraIn"];
    const camera = group.current.getObjectByName("Camera001");
    let sectionScrollProgress = 0;
    if (!camAct || !camera) return;

    camAct.reset().play().paused = true;
    const clipDur = camAct.getClip().duration;
    let sceneDefaultPos = sceneContainerGroup.current.position.y;

    // mobile scroll animation
    let lastProgress = 0;
    let lastY = sceneContainerGroup.current.position.y;
    const minY = 0; // your minimum Y value
    const maxY = 2;  // your maximum Y value

    // scroll triggers
    ScrollTrigger.create({
      id: sectionID,
      trigger: "#section2",
      start: "top bottom",
      end: "top top",
      scrub: true,
      markers: false,
      onUpdate: (self) => {
        sectionScrollProgress = self.progress;
        if (viewportRef.current.width < 5){
          // small screens
          let direction = self.direction; // 1 = scroll down, -1 = scroll up

          // Compute delta and clamp new Y position
          let delta = direction * 0.2; // Adjust speed here
          let newY = THREE.MathUtils.clamp(lastY + delta, minY, maxY);

          // Kill existing tween
          if (currentTween.current) {
            currentTween.current.kill();
          }

          // Tween model Y position
          currentTween.current = gsap.to(sceneContainerGroup.current.position, {
            y: newY,
            duration: 0.1,
            ease: "sine.out",
            overwrite: true,
            onUpdate: () => {
              lastY = sceneContainerGroup.current.position.y; // Track the current Y
            }
          });

          lastProgress = self.progress;
        }else{
          // desktop
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
      onToggle: self => {
        if (self.isActive) {
          setCurrentModel(sectionID);
          disableOtherSections();
          gsap.to(sceneContainerGroup.current.position, {
            y: sceneDefaultPos,
            duration:0.3,
            ease: "circ.out",
          });
        }
      },
      onLeave: (self) => {
        if (Math.abs(self.getVelocity()) <= 2000) {
          gsap.to(sceneContainerGroup.current.position, {
            y: sceneDefaultPos + 50,
            duration:.3,
            ease:"sine.inOut",
            onComplete: () => {
              nextScrollTrigger.enable();
            },
          });
        }else{
          enableOtherSections();
        }
      }
    });


    return () => {
      timelineMain.current?.kill();
      mixer.stopAllAction();
    };
  }, []);

  return (
    <group ref={group} {...props} dispose={null} visible={isActive}  >
      <group name="Scene" >
        <PerspectiveCamera
          name="Camera001"
          makeDefault={isActive}
          far={1000}
          near={0.1}
          fov={18.848}
          position={[3.446, 20.931, 15.945]}
          rotation={[-0.417, 0.041, -0.022]}
        />
        <group ref={sceneContainerGroup} name="scene_container"
               scale={viewport.width < 5 ? 0.5 : 1}
               position-x={viewport.width < 5 ? 2.5 : 0}
        >

        <mesh
          name="GroundCubeQuad003"
          castShadow
          receiveShadow
          geometry={nodes.GroundCubeQuad003.geometry}
          material={materials.PaletteMaterial001}
          position={[0.033, -0.193, -0.183]}
          scale={[2.331, 1.899, 1.98]}
        />
        <group
          name="Cube027"
          position={[-1.161, 2.888, 0.952]}
          rotation={[3.14, 0.051, 2.935]}
          scale={0.358}>
          <mesh
            name="Cube015"
            castShadow
            receiveShadow
            geometry={nodes.Cube015.geometry}
            material={materials['Material.013']}
          />
          <mesh
            name="Cube015_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube015_1.geometry}
            material={materials.PaletteMaterial002}
          />
        </group>
        <group name="Empty002" position={[-0.228, 2.14, 0.512]}>
          <group name="Retopo_Cube" rotation={[0, 1.005, 0]} scale={0.29}>
            <group position={[0.139, 0.691, 0]} scale={0.754}>
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
                material={materials['Material.022']}
              />
              <mesh
                name="mesh_2"
                castShadow
                receiveShadow
                geometry={nodes.mesh_2.geometry}
                material={materials.PaletteMaterial003}
              />
            </group>
          </group>
          <group name="Retopo_Cube001" rotation={[0, 1.005, 0]} scale={0.29}>
            <group position={[0.139, 0.691, 0]} scale={0.754}>
              <mesh
                name="mesh003"
                castShadow
                receiveShadow
                geometry={nodes.mesh003.geometry}
                material={materials.PaletteMaterial002}
              />
              <mesh
                name="mesh003_1"
                castShadow
                receiveShadow
                geometry={nodes.mesh003_1.geometry}
                material={materials.PaletteMaterial002}
              />
              <mesh
                name="mesh003_2"
                castShadow
                receiveShadow
                geometry={nodes.mesh003_2.geometry}
                material={materials.PaletteMaterial003}
              />
            </group>
          </group>
        </group>
        <group name="Empty004" position={[-0.569, 2.089, 0.83]} scale={0.342}>
          <group name="Cube004" scale={[3.169, 3.251, 3.169]}>
            <group position={[-0.001, 0.114, 0.001]} scale={0.114}>
              <mesh
                name="Cube009"
                castShadow
                receiveShadow
                geometry={nodes.Cube009.geometry}
                material={materials.PaletteMaterial002}
              />
              <mesh
                name="Cube009_1"
                castShadow
                receiveShadow
                geometry={nodes.Cube009_1.geometry}
                material={materials.PaletteMaterial003}
              />
              <mesh
                name="Cube009_2"
                castShadow
                receiveShadow
                geometry={nodes.Cube009_2.geometry}
                material={materials.PaletteMaterial002}
              />
            </group>
          </group>
        </group>
        <group name="Cube001" position={[-0.227, 2.049, -0.206]} scale={1.801}>
          <mesh
            name="Cube018"
            castShadow
            receiveShadow
            geometry={nodes.Cube018.geometry}
            material={materials['Material.004']}
          />
          <mesh
            name="Cube018_1"
            castShadow
            receiveShadow
            geometry={nodes.Cube018_1.geometry}
            material={materials.PaletteMaterial004}
          />
        </group>
        <mesh
          name="Cube005"
          castShadow
          receiveShadow
          geometry={nodes.Cube005.geometry}
          material={materials['Material.002']}
          position={[0.016, 1.246, -0.187]}
          scale={2.198}
        />
        <mesh
          name="Circle012"
          castShadow
          receiveShadow
          geometry={nodes.Circle012.geometry}
          material={nodes.Circle012.material}
          position={[-0.016, 1.914, 0.649]}
          scale={[1.782, 1.614, 1.782]}
        />
        <group
          name="Empty010"
          position={[1.123, 1.058, -1.336]}
          rotation={[-0.052, 0.055, -0.004]}
          scale={0.256}>
          <group
            name="Sphere010"
            position={[0.003, 0.291, 0]}
            rotation={[-0.595, 0, 0]}
            scale={[0.503, 0.494, 0.494]}>
            <mesh
              name="Sphere008_instance_0"
              castShadow
              receiveShadow
              geometry={nodes.Sphere008_instance_0.geometry}
              material={materials.PaletteMaterial002}
              position={[0, 0.509, 0]}
            />
          </group>
          <group
            name="Sphere011"
            position={[0.003, 0.291, 0]}
            rotation={[0.524, 0, Math.PI]}
            scale={[0.503, 0.494, 0.494]}>
            <mesh
              name="Sphere008_instance_1"
              castShadow
              receiveShadow
              geometry={nodes.Sphere008_instance_1.geometry}
              material={materials.PaletteMaterial002}
              position={[0, 0.509, 0]}
            />
          </group>
        </group>
        <mesh
          name="Cylinder002"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder002.geometry}
          material={materials['Material.022']}
          position={[-0.798, 2.539, 0.058]}
          rotation={[-Math.PI, -0.93, -Math.PI]}
          scale={1.293}
        />
        <group
          name="Armature001"
          position={[-0.724, 2.797, 0.172]}
          rotation={[0, -0.251, 0]}
          scale={0.219}>
          <primitive object={nodes.Bone} />
          <primitive object={nodes.Bone007} />
          <primitive object={nodes.Bone008} />
        </group>
        <group
          name="Cube003"
          position={[1.37, 1.732, -0.435]}
          rotation={[0, -0.475, -Math.PI]}
          scale={[-0.65, -0.719, -0.65]}>
          <group name="Cube032">
            <group position={[0.034, 0.574, -0.013]} scale={0.86}>
              <mesh
                name="Cube037"
                castShadow
                receiveShadow
                geometry={nodes.Cube037.geometry}
                material={materials['ArcadeBase.002']}
              />
              <mesh
                name="Cube037_1"
                castShadow
                receiveShadow
                geometry={nodes.Cube037_1.geometry}
                material={materials['ArcadeBase.002']}
              />
              <mesh
                name="Cube037_2"
                castShadow
                receiveShadow
                geometry={nodes.Cube037_2.geometry}
                material={materials['ArcadeBase.002']}
              />
              <mesh
                name="Cube037_3"
                castShadow
                receiveShadow
                geometry={nodes.Cube037_3.geometry}
                material={materials.PaletteMaterial002}
              />
              <mesh
                name="Cube037_4"
                castShadow
                receiveShadow
                geometry={nodes.Cube037_4.geometry}
                material={materials['ArcadeBase.002']}
              />
              <mesh
                name="Cube037_5"
                castShadow
                receiveShadow
                geometry={nodes.Cube037_5.geometry}
                material={materials.PaletteMaterial003}
              />
            </group>
          </group>
          <group position={[-1.195, 0.736, -1.603]} scale={2.326}>
            <mesh
              name="Cube011"
              castShadow
              receiveShadow
              geometry={nodes.Cube011.geometry}
              material={materials['ArcadeBase.002']}
            />
            <mesh
              name="Cube011_1"
              castShadow
              receiveShadow
              geometry={nodes.Cube011_1.geometry}
              material={materials.PaletteMaterial002}
            />
          </group>
        </group>
        <mesh
          name="Plane"
          castShadow
          receiveShadow
          geometry={nodes.Plane.geometry}
          material={materials.Desk}
          position={[-0.734, 2.862, -0.947]}
          rotation={[0, 0.616, 0]}
          scale={0.631}
        />
        <mesh
          name="SCREEN_LAPTOP001"
          castShadow
          receiveShadow
          geometry={nodes.SCREEN_LAPTOP001.geometry}
          material={materials.PaletteMaterial006}
          position={[0.446, 2.565, -0.221]}
          rotation={[1.448, -0.471, -1.837]}
          scale={[-15.195, 1.311, 9.741]}
        />
        <mesh
          name="Cylinder005"
          castShadow
          receiveShadow
          geometry={nodes.Cylinder005.geometry}
          material={materials.PaletteMaterial003}
          position={[-1.094, 2.712, 0.304]}
          rotation={[1.824, -1.397, -1.137]}
          scale={[0.895, 19.771, 0.895]}
        />
        <group
          name="Retopo_Sphere001"
          position={[-0.724, 2.797, 0.172]}
          rotation={[0, -0.251, 0]}
          scale={0.219}>
          <skinnedMesh
            name="mesh001"
            geometry={nodes.mesh001.geometry}
            material={materials.PaletteMaterial002}
            skeleton={nodes.mesh001.skeleton}
          />
          <skinnedMesh
            name="mesh001_1"
            geometry={nodes.mesh001_1.geometry}
            material={materials.PaletteMaterial003}
            skeleton={nodes.mesh001_1.skeleton}
          />
          <skinnedMesh
            name="mesh001_2"
            geometry={nodes.mesh001_2.geometry}
            material={materials.PaletteMaterial003}
            skeleton={nodes.mesh001_2.skeleton}
          />
          <group name="Empty005" position={[0.606, -0.576, 0.21]} scale={1.043} />
          <group name="Empty006" position={[-0.672, -0.557, 0.358]} scale={0.834} />
        </group>
        <group
          name="Armature004"
          position={[1.133, 1.655, -0.041]}
          rotation={[-1.396, 0.026, -0.483]}
          scale={[-0.219, 0.219, 0.219]}>
          <primitive object={nodes.Bone_1} />
          <primitive object={nodes.Bone007_1} />
          <primitive object={nodes.Bone008_1} />
        </group>
        <group
          name="Retopo_Sphere004"
          position={[1.133, 1.655, -0.041]}
          rotation={[-1.396, 0.026, -0.483]}
          scale={[-0.219, 0.22, 0.22]}>
          <skinnedMesh
            name="mesh008"
            geometry={nodes.mesh008.geometry}
            material={materials.PaletteMaterial002}
            skeleton={nodes.mesh008.skeleton}
          />
          <skinnedMesh
            name="mesh008_1"
            geometry={nodes.mesh008_1.geometry}
            material={materials.PaletteMaterial003}
            skeleton={nodes.mesh008_1.skeleton}
          />
          <skinnedMesh
            name="mesh008_2"
            geometry={nodes.mesh008_2.geometry}
            material={materials.PaletteMaterial003}
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
        <group
          name="Armature003"
          position={[-0.904, 3.258, -1.322]}
          rotation={[0, 0.63, 0]}
          scale={0.202}>
          <primitive object={nodes.Bone_2} />
          <primitive object={nodes.Bone007_2} />
          <primitive object={nodes.Bone008_2} />
        </group>
        <group
          name="Retopo_Sphere009"
          position={[-0.904, 3.258, -1.322]}
          rotation={[0, 0.63, 0]}
          scale={0.202}>
          <skinnedMesh
            name="mesh013"
            geometry={nodes.mesh013.geometry}
            material={materials.PaletteMaterial002}
            skeleton={nodes.mesh013.skeleton}
          />
          <skinnedMesh
            name="mesh013_1"
            geometry={nodes.mesh013_1.geometry}
            material={materials.PaletteMaterial003}
            skeleton={nodes.mesh013_1.skeleton}
          />
          <skinnedMesh
            name="mesh013_2"
            geometry={nodes.mesh013_2.geometry}
            material={materials.PaletteMaterial003}
            skeleton={nodes.mesh013_2.skeleton}
          />
          <group
            name="Empty021"
            position={[0.951, -0.059, 1.676]}
            rotation={[0, -0.594, 0]}
            scale={1.043}
          />
          <group name="Empty022" position={[-0.609, 0.103, 1.839]} scale={0.834} />
        </group>
      </group>
      </group>
    </group>
  );
}

useGLTF.preload("./models/web1webp.glb");
