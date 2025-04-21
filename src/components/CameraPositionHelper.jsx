import { Html, OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import * as THREE from "three";

const CameraPositionHelper = ({ enabled = true }) => {
  const { camera } = useThree();
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const [target, setTarget] = useState({ x: 0, y: 0, z: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });

  const controls = useRef();

  useLayoutEffect(() => {
    if (!enabled) return;

    const updateValues = () => {
      setPosition({
        x: Number(camera.position.x.toFixed(4)),
        y: Number(camera.position.y.toFixed(4)),
        z: Number(camera.position.z.toFixed(4)),
      });

      setRotation({
        x: Number(camera.rotation.x.toFixed(4)),
        y: Number(camera.rotation.y.toFixed(4)),
        z: Number(camera.rotation.z.toFixed(4)),
      });

      if (controls.current) {
        setTarget({
          x: Number(controls.current.target.x.toFixed(4)),
          y: Number(controls.current.target.y.toFixed(4)),
          z: Number(controls.current.target.z.toFixed(4)),
        });
      }
    };

    const interval = setInterval(updateValues, 100);
    return () => clearInterval(interval);
  }, [camera, enabled]);

  // Copy GSAP code snippet
  const copyGsapCode = () => {
    const code = `timeline.to(camera.position, {
  x: ${position.x},
  y: ${position.y},
  z: ${position.z},
  duration: 1.5,
  ease: "power2.inOut"
});
timeline.to(camera.rotation, {
  x: ${rotation.x},
  y: ${rotation.y},
  z: ${rotation.z},
  duration: 1.5,
  ease: "power2.inOut"
});`;
    navigator.clipboard.writeText(code);
    alert("GSAP code copied!");
  };

  // Copy camera config block for your JS config
  const copyCameraConfig = () => {
    const code = `{
  pos: new THREE.Vector3(${position.x}, ${position.y}, ${position.z}),
  rot: new THREE.Euler(${rotation.x}, ${rotation.y}, ${rotation.z})
}`;
    navigator.clipboard.writeText(code);
    alert("Camera config copied!");
  };

  // Hotkey listener
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "c") {
        copyGsapCode();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <OrbitControls ref={controls} />

      <Html fullscreen transform={false} style={{ pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: "2%",
            right: "20%",
            backgroundColor: "rgba(0,0,0,0.7)",
            color: "white",
            padding: "12px",
            borderRadius: "8px",
            fontFamily: "monospace",
            fontSize: "12px",
            pointerEvents: "auto",
            zIndex: 1000,
          }}
        >
          <div>
            <strong>Camera Position:</strong>
            <div>x: {position.x}, y: {position.y}, z: {position.z}</div>
          </div>

          <div style={{ marginTop: "8px" }}>
            <strong>Rotation (Euler):</strong>
            <div>x: {rotation.x}, y: {rotation.y}, z: {rotation.z}</div>
          </div>

          <div style={{ marginTop: "8px" }}>
            <strong>Target (lookAt):</strong>
            <div>x: {target.x}, y: {target.y}, z: {target.z}</div>
          </div>

          <button
            onClick={copyGsapCode}
            style={{
              marginTop: "10px",
              padding: "6px 12px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Copy GSAP Code
          </button>

          <button
            onClick={copyCameraConfig}
            style={{
              marginTop: "6px",
              padding: "6px 12px",
              backgroundColor: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Copy Camera Config
          </button>
        </div>
      </Html>
    </>
  );
};

export default CameraPositionHelper;
