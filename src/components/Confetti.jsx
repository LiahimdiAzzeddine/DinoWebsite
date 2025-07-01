import React, { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";

export default function MultipleExplosions() {
  const [explosions, setExplosions] = useState([]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setExplosions((prev) => [
      ...prev,
      { id: Date.now(), x: e.clientX - rect.left, y: e.clientY - rect.top },
    ]);
  };

  return (
    <div
      style={{ width: "100vw", height: "100vh", position: "relative", cursor: "pointer" }}
      onClick={handleClick}
    >
      {explosions.map(({ id, x, y }) => (
        <ConfettiExplosion
          key={id}
          force={0.8}
          duration={3000}
          particleCount={100}
          width={1600}
          colors={["#ff0a54", "#ff477e", "#ff85a1", "#f9f871"]}
          style={{ position: "absolute", top: y, left: x, pointerEvents: "none" }}
        />
      ))}
      <p style={{position: "absolute", top: 10, left: 10, color: "#333"}}>
        Clique n’importe où pour une explosion de confettis !
      </p>
    </div>
  );
}
