import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import './DotGrid.css';

// Helper to parse hex / rgb / rgba strings into RGBA components
function hexToRgba(hexOrRgb, alpha = 1) {
  if (!hexOrRgb) return { r: 44, g: 52, b: 128, a: alpha };

  if (hexOrRgb.startsWith('#')) {
    const hex = hexOrRgb.replace('#', '');
    let r = 44, g = 52, b = 128;
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length >= 6) {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }
    return { r, g, b, a: alpha };
  }

  const match = hexOrRgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (match) {
    return {
      r: parseInt(match[1], 10),
      g: parseInt(match[2], 10),
      b: parseInt(match[3], 10),
      a: match[4] !== undefined ? parseFloat(match[4]) : alpha,
    };
  }

  return { r: 44, g: 52, b: 128, a: alpha };
}

export default function DotGrid({
  dotSize = 4,
  gap = 28,
  baseColor = '#2C3480',
  activeColor = '#2C3480',
  proximity = 120,
  speedTrigger = 100,
  shockRadius = 220,
  shockStrength = 3,
  maxSpeed = 4000,
  resistance = 750,
  returnDuration = 1.5,
  className = '',
  style = {},
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  const dotsRef = useRef([]);
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    prevX: -1000,
    prevY: -1000,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    inside: false,
  });

  const isVisibleRef = useRef(true);
  const animFrameId = useRef(null);
  const sizeRef = useRef({ width: 0, height: 0, dpr: 1 });

  const parsedBaseColor = useRef(hexToRgba(baseColor, 0.28));
  const parsedActiveColor = useRef(hexToRgba(activeColor, 0.95));

  // Update parsed colors if props change
  useEffect(() => {
    parsedBaseColor.current = hexToRgba(baseColor, 0.28);
    parsedActiveColor.current = hexToRgba(activeColor, 0.95);
  }, [baseColor, activeColor]);

  // Handle pointer movement across window with bounds checking for smooth tracking
  const handlePointerMove = useCallback(
    (e) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;

      const now = performance.now();
      const mouse = mouseRef.current;

      const isInside =
        px >= -proximity &&
        px <= rect.width + proximity &&
        py >= -proximity &&
        py <= rect.height + proximity;

      mouse.inside = isInside;

      if (mouse.lastTime > 0) {
        const dt = Math.max(1, now - mouse.lastTime) / 1000;
        const dx = px - mouse.prevX;
        const dy = py - mouse.prevY;
        const currentVx = dx / dt;
        const currentVy = dy / dt;
        const currentSpeed = Math.sqrt(currentVx * currentVx + currentVy * currentVy);

        mouse.vx = currentVx;
        mouse.vy = currentVy;
        mouse.speed = Math.min(maxSpeed, currentSpeed);

        // If mouse is moving fast, apply directional inertia displacement to nearby dots
        if (mouse.speed > speedTrigger && isInside) {
          const dots = dotsRef.current;
          const speedFactor = Math.min(2.5, mouse.speed / speedTrigger);
          const proxSq = proximity * proximity;

          for (let i = 0; i < dots.length; i++) {
            const dot = dots[i];
            const distSq = (dot.originX - px) ** 2 + (dot.originY - py) ** 2;

            if (distSq < proxSq) {
              const dist = Math.sqrt(distSq);
              const force = (1 - dist / proximity) * speedFactor * 4;
              const angle = Math.atan2(currentVy, currentVx);

              const targetX = Math.cos(angle) * force;
              const targetY = Math.sin(angle) * force;

              gsap.killTweensOf(dot);
              gsap.fromTo(
                dot,
                { x: targetX, y: targetY },
                {
                  x: 0,
                  y: 0,
                  duration: returnDuration,
                  ease: 'elastic.out(1, 0.45)',
                  overwrite: 'auto',
                }
              );
            }
          }
        }
      }

      mouse.prevX = px;
      mouse.prevY = py;
      mouse.x = px;
      mouse.y = py;
      mouse.lastTime = now;
    },
    [proximity, speedTrigger, maxSpeed, returnDuration]
  );

  // Handle pointer down click shockwave
  const handlePointerDown = useCallback(
    (e) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Check if click occurred within section bounds
      if (
        clickX < 0 ||
        clickX > rect.width ||
        clickY < 0 ||
        clickY > rect.height
      ) {
        return;
      }

      const dots = dotsRef.current;
      const shockRadiusSq = shockRadius * shockRadius;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const dx = dot.originX - clickX;
        const dy = dot.originY - clickY;
        const distSq = dx * dx + dy * dy;

        if (distSq < shockRadiusSq && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const angle = Math.atan2(dy, dx);
          const force = (1 - dist / shockRadius) * shockStrength * 10;
          const rippleDelay = (dist / shockRadius) * 0.08;

          const offsetX = Math.cos(angle) * force;
          const offsetY = Math.sin(angle) * force;

          gsap.killTweensOf(dot);
          gsap.fromTo(
            dot,
            { x: offsetX, y: offsetY },
            {
              x: 0,
              y: 0,
              duration: returnDuration,
              delay: rippleDelay,
              ease: 'elastic.out(1.1, 0.4)',
              overwrite: 'auto',
            }
          );
        }
      }
    },
    [shockRadius, shockStrength, returnDuration]
  );

  const handlePointerLeave = useCallback(() => {
    mouseRef.current.inside = false;
    mouseRef.current.x = -1000;
    mouseRef.current.y = -1000;
  }, []);

  // Main Canvas Setup and Animation Loop
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let isDestroyed = false;

    // Build the grid of dots based on container dimensions
    const setupGrid = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);

      if (w <= 0 || h <= 0) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      sizeRef.current = { width: w, height: h, dpr };

      // Calculate grid coordinates with symmetrical offset
      const cols = Math.floor(w / gap) + 1;
      const rows = Math.floor(h / gap) + 1;
      const offsetX = (w - (cols - 1) * gap) / 2;
      const offsetY = (h - (rows - 1) * gap) / 2;

      const newDots = [];
      const baseRadius = dotSize / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          newDots.push({
            originX: offsetX + c * gap,
            originY: offsetY + r * gap,
            x: 0,
            y: 0,
            baseRadius,
          });
        }
      }

      dotsRef.current = newDots;
    };

    setupGrid();

    // IntersectionObserver to pause rendering when section is offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // ResizeObserver for responsive canvas updates
    const resizeObserver = new ResizeObserver(() => {
      setupGrid();
    });
    resizeObserver.observe(container);

    // Window event listeners for global pointer interaction
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    // Animation Render Loop
    const render = () => {
      if (isDestroyed) return;

      if (isVisibleRef.current) {
        const { width, height } = sizeRef.current;
        const mouse = mouseRef.current;
        const dots = dotsRef.current;

        ctx.clearRect(0, 0, width, height);

        const base = parsedBaseColor.current;
        const active = parsedActiveColor.current;
        const proxSq = proximity * proximity;

        for (let i = 0; i < dots.length; i++) {
          const dot = dots[i];
          const drawX = dot.originX + dot.x;
          const drawY = dot.originY + dot.y;

          // Proximity effect
          let radius = dot.baseRadius;
          let r = base.r;
          let g = base.g;
          let b = base.b;
          let a = base.a;

          if (mouse.inside) {
            const distSq = (drawX - mouse.x) ** 2 + (drawY - mouse.y) ** 2;
            if (distSq < proxSq) {
              const t = 1 - Math.sqrt(distSq) / proximity;
              const easeT = t * t; // Smooth quadratic falloff

              // Interpolate towards active highlighted color and increase scale
              r = Math.round(base.r + (active.r - base.r) * easeT);
              g = Math.round(base.g + (active.g - base.g) * easeT);
              b = Math.round(base.b + (active.b - base.b) * easeT);
              a = base.a + (active.a - base.a) * easeT;
              radius = dot.baseRadius * (1 + easeT * 0.45);
            }
          }

          // If dot is currently displaced by shockwave or inertia, boost its glow
          const displacement = Math.sqrt(dot.x * dot.x + dot.y * dot.y);
          if (displacement > 0.5) {
            const dispRatio = Math.min(1, displacement / 15);
            a = Math.min(1, a + dispRatio * 0.4);
            radius = Math.max(radius, dot.baseRadius * (1 + dispRatio * 0.3));
          }

          ctx.beginPath();
          ctx.arc(drawX, drawY, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
          ctx.fill();
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      isDestroyed = true;
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerleave', handlePointerLeave);

      dotsRef.current.forEach((dot) => gsap.killTweensOf(dot));
    };
  }, [gap, dotSize, proximity, handlePointerMove, handlePointerDown, handlePointerLeave]);

  return (
    <div
      ref={containerRef}
      className={`dot-grid-container ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        ...style,
      }}
    >
      <canvas ref={canvasRef} className="dot-grid-canvas" />
    </div>
  );
}
