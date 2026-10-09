import React, { useEffect, useRef } from 'react';

export default function PerfumeSpray({ isSpraying, progress }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles = [];
    let animId = null;

    canvas.width = 600;
    canvas.height = 450;

    const createParticle = () => {
      const angle = (Math.random() - 0.5) * 0.9 - Math.PI / 2; // Spray upward & outwards
      const speed = Math.random() * 4.5 + 2.8;
      return {
        x: 300 + (Math.random() - 0.5) * 8,
        y: 380,
        vx: Math.cos(angle) * speed * (0.8 + Math.random() * 0.4),
        vy: Math.sin(angle) * speed,
        size: Math.random() * 2.2 + 0.6,
        alpha: Math.random() * 0.65 + 0.35,
        decay: Math.random() * 0.016 + 0.009,
        color: Math.random() > 0.45 ? 'rgba(168, 216, 240,' : 'rgba(255, 255, 255,'
      };
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isSpraying && particles.length < 130) {
        // Emit fine mist bursts
        for (let i = 0; i < 6; i++) {
          particles.push(createParticle());
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy *= 0.98;
        p.alpha -= p.decay;
        p.size += 0.035;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
        } else {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color} ${Math.max(0, p.alpha)})`;
          ctx.shadowColor = 'rgba(168, 216, 240, 0.4)';
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isSpraying]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: '-340px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '450px',
        pointerEvents: 'none',
        zIndex: 50,
      }}
    />
  );
}
