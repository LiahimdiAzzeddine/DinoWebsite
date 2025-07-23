import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FireworksDisplay = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const fireworksRef = useRef([]);
  const lastFireworkTime = useRef(0);
  const messageRef = useRef(null);

  const colors = [
    ['#FFD700', '#FFA500', '#FF8C00'], // Gold gradient
    ['#FF4500', '#FF0000', '#DC143C'], // Red gradient
    ['#00FF00', '#32CD32', '#228B22'], // Green gradient
    ['#0080FF', '#0000FF', '#4169E1'], // Blue gradient
    ['#FF1493', '#FF69B4', '#FF20B2'], // Pink gradient
    ['#FFFFFF', '#F0F8FF', '#E6E6FA'], // White gradient
    ['#800080', '#9932CC', '#8A2BE2'], // Purple gradient
    ['#FF6347', '#FF7F50', '#FA8072'], // Tomato gradient
    ['#00CED1', '#48D1CC', '#20B2AA'], // Turquoise gradient
    ['#FFA500', '#FFB347', '#FFCC5C'], // Orange gradient
  ];

  // Types de feux d'artifice
  const fireworkTypes = ['burst', 'ring', 'willow', 'chrysanthemum', 'palm'];

  const createParticle = (x, y, colorPalette, angle, speed, type) => {
    const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    
    // Variations selon le type de feu d'artifice
    let particleSpeed = speed;
    let life = Math.random() * 80 + 60;
    let size = Math.random() * 2.5 + 1;
    
    if (type === 'willow') {
      particleSpeed *= 0.7;
      life *= 1.5;
    } else if (type === 'palm') {
      particleSpeed *= 0.8;
      life *= 1.2;
    } else if (type === 'ring') {
      particleSpeed = speed * 0.9;
    }

    return {
      x,
      y,
      vx: Math.cos(angle) * particleSpeed,
      vy: Math.sin(angle) * particleSpeed,
      life,
      maxLife: life,
      color,
      size,
      type,
      trail: [],
      gravity: type === 'willow' ? 0.08 : 0.12,
      resistance: type === 'willow' ? 0.992 : 0.995,
    };
  };

  const createFirework = (canvas, x = null, y = null, isClick = false) => {
    const startX = x || Math.random() * canvas.width;
    const startY = isClick ? y : canvas.height;
    const targetY = isClick ? y : Math.random() * (canvas.height * 0.6) + canvas.height * 0.1;
    const colorPalette = colors[Math.floor(Math.random() * colors.length)];
    const type = fireworkTypes[Math.floor(Math.random() * fireworkTypes.length)];

    return {
      x: startX,
      y: startY,
      targetY,
      particles: [],
      exploded: false,
      colorPalette,
      type,
      launchSpeed: 5,
      trail: [],
      isClick,
    };
  };

  const explodeFirework = (firework) => {
    const { type, colorPalette, x, y } = firework;
    let particleCount = Math.random() * 60 + 40;

    if (type === 'burst') {
      // Explosion classique en étoile
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.2;
        const speed = Math.random() * 8 + 3;
        firework.particles.push(createParticle(x, y, colorPalette, angle, speed, type));
      }
    } else if (type === 'ring') {
      // Anneau parfait
      particleCount = 50;
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount;
        const speed = Math.random() * 2 + 6;
        firework.particles.push(createParticle(x, y, colorPalette, angle, speed, type));
      }
    } else if (type === 'willow') {
      // Effet saule pleureur
      particleCount = Math.random() * 40 + 30;
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        firework.particles.push(createParticle(x, y, colorPalette, angle, speed, type));
      }
    } else if (type === 'chrysanthemum') {
      // Forme de chrysanthème avec des rayons
      const rays = 8 + Math.floor(Math.random() * 8);
      particleCount = rays * 6;
      for (let i = 0; i < rays; i++) {
        const baseAngle = (Math.PI * 2 * i) / rays;
        for (let j = 0; j < 6; j++) {
          const angle = baseAngle + (Math.random() - 0.5) * 0.3;
          const speed = Math.random() * 5 + 4 + j * 0.5;
          firework.particles.push(createParticle(x, y, colorPalette, angle, speed, type));
        }
      }
    } else if (type === 'palm') {
      // Effet palmier avec chute lente
      particleCount = Math.random() * 35 + 25;
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 3;
        firework.particles.push(createParticle(x, y, colorPalette, angle, speed, type));
      }
    }

    firework.exploded = true;

    // Particules d'étincelles centrales
    const sparkleCount = Math.random() * 15 + 10;
    for (let i = 0; i < sparkleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1;
      const sparkleColor = ['#FFFFFF', '#FFFACD', '#F0F8FF'];
      firework.particles.push(createParticle(x, y, sparkleColor, angle, speed, 'sparkle'));
    }
  };

  const updateParticles = (particles) => {
    for (let i = particles.length - 1; i >= 0; i--) {
      const particle = particles[i];

      // Initialiser la traînée si elle n'existe pas
      if (!particle.trail) {
        particle.trail = [];
      }

      // Mise à jour de la traînée
      if (particle.trail.length > 8) {
        particle.trail.shift();
      }
      particle.trail.push({ x: particle.x, y: particle.y });

      // Physique améliorée
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += particle.gravity;
      particle.vx *= particle.resistance;
      
      // Effet de flottement pour le type willow
      if (particle.type === 'willow') {
        particle.vx += (Math.random() - 0.5) * 0.1;
      }

      particle.life--;

      if (particle.life <= 0) {
        particles.splice(i, 1);
      }
    }
  };

  const drawParticle = (ctx, particle) => {
    const alpha = Math.max(0, particle.life / particle.maxLife);
    
    // Initialiser la traînée si elle n'existe pas
    if (!particle.trail) {
      particle.trail = [];
    }
    
    // Dessiner la traînée
    if (particle.trail.length > 1) {
      for (let i = 1; i < particle.trail.length; i++) {
        const trailAlpha = alpha * (i / particle.trail.length) * 0.3;
        ctx.globalAlpha = trailAlpha;
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = particle.size * 0.5;
        ctx.beginPath();
        ctx.moveTo(particle.trail[i - 1].x, particle.trail[i - 1].y);
        ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
        ctx.stroke();
      }
    }

    // Dessiner la particule principale
    ctx.globalAlpha = alpha;

    // Effet de lueur amélioré
    const glowSize = particle.size * 3;
    ctx.shadowColor = particle.color;
    ctx.shadowBlur = glowSize;

    // Particule principale
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();

    // Cœur brillant
    ctx.shadowBlur = 0;
    ctx.globalAlpha = alpha * 0.8;
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size * 0.3, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  };

  const drawFirework = (ctx, firework) => {
    if (!firework.exploded) {
      // Initialiser la traînée si elle n'existe pas
      if (!firework.trail) {
        firework.trail = [];
      }

      // Mise à jour de la traînée de lancement
      if (firework.trail.length > 15) {
        firework.trail.shift();
      }
      firework.trail.push({ x: firework.x, y: firework.y });

      // Dessiner la traînée de lancement
      if (firework.trail.length > 1) {
        for (let i = 1; i < firework.trail.length; i++) {
          const alpha = i / firework.trail.length;
          ctx.globalAlpha = alpha * 0.6;
          ctx.strokeStyle = firework.colorPalette[0];
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(firework.trail[i - 1].x, firework.trail[i - 1].y);
          ctx.lineTo(firework.trail[i].x, firework.trail[i].y);
          ctx.stroke();
        }
      }

      // Fusée en montée
      ctx.globalAlpha = 1;
      ctx.fillStyle = firework.colorPalette[0];
      ctx.shadowColor = firework.colorPalette[0];
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(firework.x, firework.y, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Dessiner les particules
    firework.particles.forEach(particle => drawParticle(ctx, particle));
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Effacer complètement le canvas (transparent)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const currentTime = Date.now();

    // Créer de nouveaux feux d'artifice
    if (currentTime - lastFireworkTime.current > Math.random() * 1000 + 500) {
      fireworksRef.current.push(createFirework(canvas));
      lastFireworkTime.current = currentTime;
    }

    // Mettre à jour et dessiner les feux d'artifice
    for (let i = fireworksRef.current.length - 1; i >= 0; i--) {
      const firework = fireworksRef.current[i];

      if (!firework.exploded) {
        // Animate firework ascending
        firework.y -= firework.launchSpeed;

        if (firework.y <= firework.targetY) {
          explodeFirework(firework);
        }
      }

      updateParticles(firework.particles);
      drawFirework(ctx, firework);

      // Remove firework if all particles are gone
      if (firework.exploded && firework.particles.length === 0) {
        fireworksRef.current.splice(i, 1);
      }
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  useEffect(() => {
    resizeCanvas();
    animate();

    const handleResize = () => resizeCanvas();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleClick = (event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Create instant firework at click position
    const firework = createFirework(canvas, x, y, true);
    explodeFirework(firework);
    fireworksRef.current.push(firework);
  };

  useEffect(() => {
    // Animate the message when component mounts
    if (messageRef.current) {
      // Set initial state
      gsap.set(messageRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 20
      });

      // Animate in
      gsap.to(messageRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        delay: 0.2
      });

      // Animate out after 3.5 seconds
      gsap.to(messageRef.current, {
        opacity: 0,
        scale: 0.9,
        y: -10,
        duration: 0.4,
        ease: "power2.in",
        delay: 3.5
      });
    }
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        className="absolute inset-0 cursorpointer pointer-events-auto w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Centered welcome message */}
      <div
        ref={messageRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <div
          className="rounded-2xl px-8 py-4"
          style={{
            backdropFilter: 'blur(40px) saturate(1.4)',
            backgroundColor: "#66666648",
            boxShadow: '0 0 10px #5e5e5e1c',
            outline: '1px solid #ffffff2b',
          }}
        >
          <div className="text-white text-xl tracking-wide whitespace-nowrap">
            Cliquez n'importe où pour créer des feux d'artifice !
          </div>
        </div>
      </div>
    </div>
  );
};

export default FireworksDisplay;