import { Html, OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useLayoutEffect, useRef, useState } from "react";



const CameraPositionHelper = ({ enabled = true }) => {
    const { camera } = useThree();
    const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
    const [target, setTarget] = useState({ x: 0, y: 0, z: 0 });
    const controls = useRef();
  
    // Mise à jour des valeurs à chaque frame
    useLayoutEffect(() => {
      if (!enabled) return;
      
      const updateValues = () => {
        // Récupération de la position de la caméra
        setPosition({
          x: Number(camera.position.x.toFixed(4)),
          y: Number(camera.position.y.toFixed(4)),
          z: Number(camera.position.z.toFixed(4))
        });
        
        // Récupération du point que la caméra regarde
        if (controls.current) {
          setTarget({
            x: Number(controls.current.target.x.toFixed(4)),
            y: Number(controls.current.target.y.toFixed(4)),
            z: Number(controls.current.target.z.toFixed(4))
          });
        }
      };
  
      const interval = setInterval(updateValues, 100);
      return () => clearInterval(interval);
    }, [camera, enabled]);
  
    // Fonction pour copier le code d'animation GSAP avec les positions actuelles
    const copyGsapCode = () => {
      const code = `timeline.to(camera.position, {
    x: ${position.x},
    y: ${position.y},
    z: ${position.z},
    duration: 1,
    onUpdate: () => camera.lookAt(${target.x}, ${target.y}, ${target.z}),
  });`;
      
      navigator.clipboard.writeText(code);
      alert("GSAP code copied");
    };
  
    // Si l'outil est désactivé, ne rien afficher
    if (!enabled) return null;
  
    return (
      <>
        {/* OrbitControls pour manipuler la caméra */}
        <OrbitControls ref={controls} />
        
        {/* Interface pour afficher et copier les coordonnées */}
        <Html fullscreen transform={false} style={{ pointerEvents: "none" }}>
    <div style={{
      position: 'absolute',
      top: '2%',
      right: '25%',
      backgroundColor: 'rgba(0,0,0,0.7)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontFamily: 'monospace',
      fontSize: '12px',
      pointerEvents: 'auto',
      zIndex: 100000
    }}>
      <div>
        <strong>Camera Position:</strong>
        <div>x: {position.x}, y: {position.y}, z: {position.z}</div>
      </div>
      <div style={{ marginTop: '8px' }}>
        <strong>Target (lookAt):</strong>
        <div>x: {target.x}, y: {target.y}, z: {target.z}</div>
      </div>
      <button 
        onClick={copyGsapCode}
        style={{
          marginTop: '10px',
          padding: '5px 10px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer'
        }}
      >
        Copy GSAP Code
      </button>
    </div>
  </Html>
  
      </>
    );
  };
  export default CameraPositionHelper;