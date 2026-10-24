import React, { useEffect, useRef, useCallback } from 'react';
import './ShapeGrid.css';

function parseColorWithAlpha(colorStr, alpha) {
  if (!colorStr) return `rgba(44, 52, 128, ${alpha})`;

  if (colorStr.startsWith('#')) {
    const hex = colorStr.replace('#', '');
    let r = 44, g = 52, b = 128;
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  if (colorStr.startsWith('rgba')) {
    const parts = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (parts) {
      return `rgba(${parts[1]}, ${parts[2]}, ${parts[3]}, ${alpha})`;
    }
  }

  if (colorStr.startsWith('rgb')) {
    const parts = colorStr.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (parts) {
      return `rgba(${parts[1]}, ${parts[2]}, ${parts[3]}, ${alpha})`;
    }
  }

  return colorStr;
}

export default function ShapeGrid({
  direction = 'right',
  speed = 0.35,
  borderColor = 'rgba(44, 52, 128, 0.28)',
  squareSize = 55,
  hoverFillColor = '#2C3480',
  shape = 'square',
  hoverTrailAmount = 5,
  className = '',
  style = {},
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const gridOffset = useRef({ x: 0, y: 0 });
  const mousePos = useRef({ x: -1000, y: -1000, inside: false });
  const trailRef = useRef([]);
  const animFrameId = useRef(null);
  const isVisibleRef = useRef(true);
  const sizeRef = useRef({ width: 0, height: 0 });

  // Handle pointer move to track hovered grid cells and maintain hover trail
  const handlePointerMove = useCallback((e) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    mousePos.current = { x: px, y: py, inside: true };

    const gx = Math.floor((px - gridOffset.current.x) / squareSize);
    const gy = Math.floor((py - gridOffset.current.y) / squareSize);
    const now = performance.now();

    const trail = trailRef.current;
    if (trail.length === 0 || trail[0].gx !== gx || trail[0].gy !== gy) {
      trail.unshift({ gx, gy, timestamp: now });
      if (trail.length > hoverTrailAmount + 2) {
        trail.pop();
      }
    }
  }, [squareSize, hoverTrailAmount]);

  const handlePointerLeave = useCallback(() => {
    mousePos.current = { x: -1000, y: -1000, inside: false };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let isDestroyed = false;

    // High DPI Resize Handling
    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);

      if (w <= 0 || h <= 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      sizeRef.current = { width: w, height: h };
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // IntersectionObserver to pause animation when out of viewport
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting && !animFrameId.current) {
          animFrameId.current = requestAnimationFrame(render);
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Main animation render loop
    const render = (now) => {
      if (isDestroyed) return;

      if (!isVisibleRef.current) {
        animFrameId.current = null;
        return;
      }

      const { width, height } = sizeRef.current;

      if (width > 0 && height > 0) {
        // Update animated grid continuous movement offset
        switch (direction) {
          case 'right':
            gridOffset.current.x = (gridOffset.current.x + speed) % squareSize;
            break;
          case 'left':
            gridOffset.current.x = (gridOffset.current.x - speed + squareSize) % squareSize;
            break;
          case 'down':
            gridOffset.current.y = (gridOffset.current.y + speed) % squareSize;
            break;
          case 'up':
            gridOffset.current.y = (gridOffset.current.y - speed + squareSize) % squareSize;
            break;
          case 'diagonal':
          default:
            gridOffset.current.x = (gridOffset.current.x + speed) % squareSize;
            gridOffset.current.y = (gridOffset.current.y + speed) % squareSize;
            break;
        }

        ctx.clearRect(0, 0, width, height);

        const offsetX = gridOffset.current.x % squareSize;
        const offsetY = gridOffset.current.y % squareSize;

        const startX = -squareSize + (offsetX < 0 ? offsetX + squareSize : offsetX);
        const startY = -squareSize + (offsetY < 0 ? offsetY + squareSize : offsetY);

        const currentGx = mousePos.current.inside
          ? Math.floor((mousePos.current.x - gridOffset.current.x) / squareSize)
          : null;
        const currentGy = mousePos.current.inside
          ? Math.floor((mousePos.current.y - gridOffset.current.y) / squareSize)
          : null;

        // Clean up expired trail items (> 1200ms)
        trailRef.current = trailRef.current.filter((item) => now - item.timestamp < 1200);

        // Render shapes and grid lines
        for (let x = startX; x < width + squareSize; x += squareSize) {
          for (let y = startY; y < height + squareSize; y += squareSize) {
            const cellGx = Math.floor((x - gridOffset.current.x) / squareSize);
            const cellGy = Math.floor((y - gridOffset.current.y) / squareSize);

            // Determine if hovered or in trail
            let cellAlpha = 0;

            if (currentGx !== null && cellGx === currentGx && cellGy === currentGy) {
              cellAlpha = 0.52; // Current hover cell opacity
            } else {
              const trailIdx = trailRef.current.findIndex(
                (item) => item.gx === cellGx && item.gy === cellGy
              );
              if (trailIdx !== -1 && trailIdx < hoverTrailAmount) {
                const item = trailRef.current[trailIdx];
                const age = now - item.timestamp;
                const ageDecay = Math.max(0, 1 - age / 1200);
                const rankDecay = 1 - (trailIdx + 1) / (hoverTrailAmount + 1);
                cellAlpha = rankDecay * ageDecay * 0.38;
              }
            }

            // Fill cell if illuminated
            if (cellAlpha > 0.01) {
              ctx.fillStyle = parseColorWithAlpha(hoverFillColor, cellAlpha);
              if (shape === 'circle') {
                ctx.beginPath();
                ctx.arc(
                  x + squareSize / 2,
                  y + squareSize / 2,
                  squareSize / 2.3,
                  0,
                  Math.PI * 2
                );
                ctx.fill();
              } else {
                ctx.fillRect(x, y, squareSize, squareSize);
              }
            }

            // Draw grid outline
            ctx.strokeStyle = borderColor;
            ctx.lineWidth = 1;

            if (shape === 'circle') {
              ctx.beginPath();
              ctx.arc(
                x + squareSize / 2,
                y + squareSize / 2,
                squareSize / 2.3,
                0,
                Math.PI * 2
              );
              ctx.stroke();
            } else {
              ctx.strokeRect(x, y, squareSize, squareSize);
            }
          }
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      isDestroyed = true;
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [direction, speed, borderColor, squareSize, hoverFillColor, shape, hoverTrailAmount]);

  return (
    <div
      ref={containerRef}
      className={`shape-grid-container ${className}`}
      style={style}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <canvas ref={canvasRef} className="shape-grid-canvas" />
    </div>
  );
}
