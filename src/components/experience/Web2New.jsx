/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 ./public/models/web3Ktx2.glb 
*/

import React, { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { useGraph, useThree } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera, useAnimations, Scroll } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { AnimationContext } from "./AnimationContext";

gsap.registerPlugin(Observer);

export default function Web2({ sectionID, isActive, ...props }) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('./models/Model2.glb')
  const { actions, mixer } = useAnimations(animations, group)
  const { setCurrentModel } = useContext(AnimationContext);

  const Animations = [
    "40M",
    "40MRope",
    "ArmatureMan",
    "BallonHotAirAction",
    "Balloon",
    "Balloon.001",
    "Balloon.002",
    "Emoji",
    "LeftHand",
    "RightHand",
  ];
  const smoothAnimations = ["Clouds1", "Clouds2"];

  let isTransitioning = false;
  let nextScrollTrigger = null;
  let prevScrollTrigger = null;
  let scrollDirection = 1;
  let velocityD = 0;
  const sceneContainerGroup = useRef();

  let disableOtherSections = () => {
    if (!prevScrollTrigger) {
      let currentScrollTrigger = ScrollTrigger.getById(sectionID);
      if (currentScrollTrigger && currentScrollTrigger.previous()) {
        prevScrollTrigger = currentScrollTrigger.previous();
        prevScrollTrigger.disable();
      }
    } else {
      prevScrollTrigger.disable();
    }

    if (!nextScrollTrigger) {
      let currentScrollTrigger = ScrollTrigger.getById(sectionID);
      if (currentScrollTrigger && currentScrollTrigger.next()) {
        nextScrollTrigger = currentScrollTrigger.next();
        nextScrollTrigger.disable();
      }
    } else {
      nextScrollTrigger.disable();
    }
  }

  let enterAnim = actions["UP"];
  let leaveAnim = actions["Down"];
  let sceneDefaultPos = 0;

  // handling screen width change
  const { viewport } = useThree()
  const viewportRef = useRef(viewport);
  useEffect(() => {
    viewportRef.current = viewport;
  }, [viewport]);

  useEffect(() => {
    const target = document.documentElement;
    const observer = Observer.create({
      target,
      type: "wheel,touch,pointer,scroll",
      onChange: (obs) => {
        scrollDirection = obs.deltaY > 0 ? 1 : -1;
        velocityD = Math.abs(obs.velocityY);
      },
      preventDefault: true,
    });

    return () => observer.kill();
  }, []);

  let playStaticAnimations = () => {
    Animations.forEach((name) => {
      actions[name]?.reset().play();
    });

    smoothAnimations.forEach((name) => {
      actions[name]?.reset().setEffectiveTimeScale(0.2).play();
    });
  }

  useLayoutEffect(() => {
    sceneDefaultPos = sceneContainerGroup.current.position.y;
    enterAnim = actions["UP"];
    leaveAnim = actions["Down"];
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const playActionOnce = (actionName, sectionID, scrollSpeed = 1, onFinishCallback = () => { }) => {
        if (isTransitioning) return;

        const action = actions[actionName];
        if (!action) return;

        const oppositeName = actionName === "UP" ? "Down" : actionName === "UP2" ? "Down2" : "UP2";
        const oppositeAction = actions[oppositeName];
        if (oppositeAction) oppositeAction.stop();

        isTransitioning = true;

        action.reset().setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;
        action.time = 0;

        const minSpeed = 5;
        const maxSpeed = 10;
        const scale = Math.min(Math.max(scrollSpeed / 1000, minSpeed), maxSpeed);
        action.timeScale = scale;

        if (actionName === "UP") {
          enterAnim = action;
        } else {
          leaveAnim = action;
        }

        const onFinish = () => {
          isTransitioning = false;
          mixer.removeEventListener('finished', onFinish);
          onFinishCallback();
        };

        mixer.addEventListener('finished', (e) => {
          if (e.action === action) onFinish();
        });

        action.play();
      };

      const enableNextSection = () => {
        if (nextScrollTrigger) {
          nextScrollTrigger.enable();
        }
      };

      const enablePrevSection = () => {
        if (prevScrollTrigger) {
          prevScrollTrigger.enable();
        }
      };


      const trigger = ScrollTrigger.create({
        id: sectionID,
        trigger: "#section3",
        start: "center+=100 bottom",
        end: "center+=100 top",
        scrub: true,
        markers: false,
        preventClicks: true,
        onToggle: ({ isActive, direction }) => {
          console.log("🚀 ~ onToggle ~ isActive:", isActive, "direction:", scrollDirection);

          if (isActive) {
            disableOtherSections();
            playStaticAnimations();
            setCurrentModel(sectionID);

            if (scrollDirection === 1) {
              playActionOnce("UP", sectionID, velocityD);
            } else {
              playActionOnce("Down2", sectionID, velocityD);
            }
          } else {
            if (scrollDirection === 1) {
              // Sortie vers le bas
              playActionOnce("UP2", sectionID, velocityD, () => {
                enableNextSection();
              });
            } else {
              // Sortie vers le haut
              playActionOnce("Down", sectionID, velocityD, () => {
                enablePrevSection();
              });
            }
          }
        }


      });

      return () => trigger.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <group ref={group} {...props} dispose={null} visible={isActive}>
      <group name="Scene">
        <group name="CamMove" position={[23.142, 20.042, 1.408]} scale={0.15}>
          <PerspectiveCamera
            name="Camera"
            makeDefault={false}
            far={1000}
            near={0.1}
            fov={16.696}
            position={[0, 0.151, 0.577]}
            rotation={[0, 1.571, 0]}
            scale={6.678}
          />
        </group>
        <group name="All" position={[0, 10.276, 0]} scale={6.534} ref={sceneContainerGroup}>
          <group
            name="Armature001"
            position={[-0.014, 0.129, -0.036]}
            rotation={[0.077, 1.536, -0.317]}
            scale={0.051}>
            <group name="Retopo_Sphere001">
              <skinnedMesh
                name="mesh001"
                geometry={nodes.mesh001.geometry}
                material={materials['Material.016']}
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
            </group>
            <primitive object={nodes.Bone} />
            <primitive object={nodes.Bone007} />
            <primitive object={nodes.Bone008} />
          </group>
          <group
            name="BallonHotAir"
            position={[-2.232, 0.699, 0.379]}
            rotation={[0.007, -0.012, -0.001]}
            scale={0.106}>
            <mesh
              name="Sphere010"
              castShadow
              receiveShadow
              geometry={nodes.Sphere010.geometry}
              material={materials['Material.007']}
            />
            <mesh
              name="Sphere010_1"
              castShadow
              receiveShadow
              geometry={nodes.Sphere010_1.geometry}
              material={materials['Material.005']}
            />
            <mesh
              name="Sphere010_2"
              castShadow
              receiveShadow
              geometry={nodes.Sphere010_2.geometry}
              material={materials['Material.010']}
            />
            <mesh
              name="Sphere010_3"
              castShadow
              receiveShadow
              geometry={nodes.Sphere010_3.geometry}
              material={materials['Material.009']}
            />
            <mesh
              name="Sphere010_4"
              castShadow
              receiveShadow
              geometry={nodes.Sphere010_4.geometry}
              material={materials['Material.011']}
            />
            <mesh
              name="Sphere010_5"
              castShadow
              receiveShadow
              geometry={nodes.Sphere010_5.geometry}
              material={materials['Material.013']}
            />
            <mesh
              name="Sphere010_6"
              castShadow
              receiveShadow
              geometry={nodes.Sphere010_6.geometry}
              material={materials['Material.012']}
            />
          </group>
          <group
            name="Cube043_Cube001"
            position={[0.321, -1.207, 0.607]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.153}>
            <mesh
              name="Cube043_Cube001_1"
              castShadow
              receiveShadow
              geometry={nodes.Cube043_Cube001_1.geometry}
              material={materials['Orange.001']}
            />
            <mesh
              name="Cube043_Cube001_2"
              castShadow
              receiveShadow
              geometry={nodes.Cube043_Cube001_2.geometry}
              material={materials['Material.006']}
            />
          </group>
          <group
            name="Cube043_Cube053"
            position={[0.352, -0.883, -0.3]}
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.153}>
            <mesh
              name="Cube043_Cube053_1"
              castShadow
              receiveShadow
              geometry={nodes.Cube043_Cube053_1.geometry}
              material={materials.Orange}
            />
            <mesh
              name="Cube043_Cube053_2"
              castShadow
              receiveShadow
              geometry={nodes.Cube043_Cube053_2.geometry}
              material={materials['Material.006']}
            />
          </group>
          <group
            name="Cube044_Cube054"
            position={[-1.019, -0.625, 0.125]}
            rotation={[Math.PI / 2, 0, -1.594]}
            scale={0.153}>
            <mesh
              name="Cube044_Cube054_1"
              castShadow
              receiveShadow
              geometry={nodes.Cube044_Cube054_1.geometry}
              material={materials.blue}
            />
            <mesh
              name="Cube044_Cube054_2"
              castShadow
              receiveShadow
              geometry={nodes.Cube044_Cube054_2.geometry}
              material={materials['Material.006']}
            />
          </group>
          <group
            name="Empty005"
            position={[0.001, 0.259, -0.089]}
            rotation={[1.528, 1.519, -0.667]}
            scale={0.16}>
            <group
              name="Trophy"
              position={[0.357, -0.012, 0.013]}
              rotation={[1.425, -1.328, 1.432]}
              scale={0.955}>
              <mesh
                name="Cylinder009"
                castShadow
                receiveShadow
                geometry={nodes.Cylinder009.geometry}
                material={materials.M_Tropy}
              />
              <mesh
                name="Cylinder009_1"
                castShadow
                receiveShadow
                geometry={nodes.Cylinder009_1.geometry}
                material={materials['Material.008']}
              />
              <mesh
                name="Cylinder009_2"
                castShadow
                receiveShadow
                geometry={nodes.Cylinder009_2.geometry}
                material={materials.Material}
              />
            </group>
          </group>
          <group
            name="Empty006"
            position={[-0.011, 0.279, 0.028]}
            rotation={[0.831, 1.513, -0.007]}
            scale={0.041}>
            <group
              name="Armature"
              position={[0.239, 0.054, 0.33]}
              rotation={[1.601, 0.618, 1.507]}
              scale={3.568}>
              <skinnedMesh
                name="Cube"
                geometry={nodes.Cube.geometry}
                material={materials.Blackk}
                skeleton={nodes.Cube.skeleton}
              />
              <primitive object={nodes.Bone_1} />
            </group>
            <mesh
              name="Cube001"
              castShadow
              receiveShadow
              geometry={nodes.Cube001.geometry}
              material={materials.skin}
              position={[-0.12, -0.118, 0.312]}
              rotation={[-1.58, 0.644, 1.602]}
              scale={3.568}
            />
            <mesh
              name="Cube008"
              castShadow
              receiveShadow
              geometry={nodes.Cube008.geometry}
              material={materials.skin}
              position={[0.136, -0.126, 0.306]}
              rotation={[1.611, 1.033, -1.617]}
              scale={3.568}
            />
            <group
              name="Cube011"
              position={[0.321, 0.089, 0.383]}
              rotation={[1.581, 0.176, -1.628]}
              scale={[0.076, 2.381, 0.076]}>
              <mesh
                name="Cube019"
                castShadow
                receiveShadow
                geometry={nodes.Cube019.geometry}
                material={materials.Blackk}
              />
              <mesh
                name="Cube019_1"
                castShadow
                receiveShadow
                geometry={nodes.Cube019_1.geometry}
                material={materials['Material.008']}
              />
            </group>
          </group>
          <mesh
            name="Sphere001"
            castShadow
            receiveShadow
            geometry={nodes.Sphere001.geometry}
            material={nodes.Sphere001.material}
            position={[-0.561, 1.904, 0.309]}
            rotation={[Math.PI, 0, Math.PI]}
            scale={[0.069, 0.117, 0.117]}
          />
          <mesh
            name="Sphere002"
            castShadow
            receiveShadow
            geometry={nodes.Sphere002.geometry}
            material={materials['Material.001']}
            position={[-0.033, -0.041, -0.554]}
            rotation={[-0.413, 0.743, 0.652]}
            scale={0.104}>
            <group
              name="glasss2"
              position={[0.003, 0.084, 1.035]}
              rotation={[1.706, -0.077, -0.068]}
              scale={0.241}>
              <mesh
                name="Mesh006"
                castShadow
                receiveShadow
                geometry={nodes.Mesh006.geometry}
                material={materials.glass_mat}
              />
              <mesh
                name="Mesh006_1"
                castShadow
                receiveShadow
                geometry={nodes.Mesh006_1.geometry}
                material={materials.Glass_shader_out}
              />
            </group>
            <mesh
              name="Mouth_Cube002"
              castShadow
              receiveShadow
              geometry={nodes.Mouth_Cube002.geometry}
              material={materials.Eye_Lid}
              position={[-0.001, -0.532, 0.853]}
              rotation={[Math.PI / 2, 0, 0]}
              scale={0.43}
            />
          </mesh>
          <mesh
            name="Sphere014"
            castShadow
            receiveShadow
            geometry={nodes.Sphere014.geometry}
            material={nodes.Sphere014.material}
            position={[-0.561, 0.624, -0.44]}
            scale={[0.069, 0.117, 0.117]}
          />
        </group>
        <PerspectiveCamera
          name="BlockedCam"
          makeDefault={isActive}
          far={1000}
          near={0.1}
          fov={16.696}
          position={[23.089, 1.705, 1.436]}
          rotation={[0, 1.571, 0]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('./models/Model2.glb')