import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import './PixelSwap.css';

export default function PixelSwap({
  firstContent,
  secondContent,
  active = false,
  trigger = 'manual',
  pixelSize = 48,
  gap = 2,
  pixelRadius = 4,
  pixelSpin = 0,
  pixelScale = 0.3,
  duration = 1200,
  pixelDuration = 500,
  pattern = 'diagonal',
  randomness = 0.12,
  fade = true,
  aspectRatio = '3 / 4',
  onComplete,
  className = '',
  style = {},
}) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isSwapped, setIsSwapped] = useState(false);
  const [animating, setAnimating] = useState(false);
  const timeoutRef = useRef(null);

  // ResizeObserver to calculate accurate grid columns & rows
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateDimensions = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setDimensions({
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        });
      }
    };

    updateDimensions();

    const observer = new ResizeObserver(updateDimensions);
    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle trigger logic (controlled active prop for manual trigger)
  useEffect(() => {
    if (trigger === 'manual') {
      if (active !== isSwapped) {
        setAnimating(true);
        setIsSwapped(active);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          setAnimating(false);
          if (onComplete) onComplete(active);
        }, duration);
      }
    }
  }, [active, trigger, isSwapped, duration, onComplete]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (trigger === 'hover' && !isSwapped) {
      setAnimating(true);
      setIsSwapped(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setAnimating(false);
        if (onComplete) onComplete(true);
      }, duration);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover' && isSwapped) {
      setAnimating(true);
      setIsSwapped(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setAnimating(false);
        if (onComplete) onComplete(false);
      }, duration);
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      const nextState = !isSwapped;
      setAnimating(true);
      setIsSwapped(nextState);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setAnimating(false);
        if (onComplete) onComplete(nextState);
      }, duration);
    }
  };

  // Calculate grid layout
  const { cols, rows, pixels } = useMemo(() => {
    const { width, height } = dimensions;
    if (width === 0 || height === 0) return { cols: 0, rows: 0, pixels: [] };

    const effectiveCell = pixelSize + gap;
    const colsCount = Math.max(1, Math.ceil(width / effectiveCell));
    const rowsCount = Math.max(1, Math.ceil(height / effectiveCell));

    const totalTravel = Math.max(1, duration - pixelDuration);
    const centerCol = (colsCount - 1) / 2;
    const centerRow = (rowsCount - 1) / 2;
    const maxCenterDist = Math.hypot(centerCol, centerRow) || 1;

    const list = [];
    for (let r = 0; r < rowsCount; r++) {
      for (let c = 0; c < colsCount; c++) {
        let normalizedProgress = 0;

        switch (pattern) {
          case 'center-out': {
            const dist = Math.hypot(c - centerCol, r - centerRow);
            normalizedProgress = dist / maxCenterDist;
            break;
          }
          case 'left-to-right':
            normalizedProgress = c / Math.max(1, colsCount - 1);
            break;
          case 'top-to-bottom':
            normalizedProgress = r / Math.max(1, rowsCount - 1);
            break;
          case 'random':
            normalizedProgress = Math.random();
            break;
          case 'diagonal':
          default:
            normalizedProgress = (r / Math.max(1, rowsCount - 1) + c / Math.max(1, colsCount - 1)) / 2;
            break;
        }

        const jitter = (Math.random() - 0.5) * randomness;
        const finalProgress = Math.min(1, Math.max(0, normalizedProgress + jitter));
        const delay = Math.round(finalProgress * totalTravel);

        list.push({
          id: `${r}-${c}`,
          row: r,
          col: c,
          delay,
        });
      }
    }

    return { cols: colsCount, rows: rowsCount, pixels: list };
  }, [dimensions, pixelSize, gap, duration, pixelDuration, pattern, randomness]);

  const cellWidth = dimensions.width > 0 && cols > 0 ? dimensions.width / cols : 0;
  const cellHeight = dimensions.height > 0 && rows > 0 ? dimensions.height / rows : 0;

  return (
    <div
      ref={containerRef}
      className={`pixelswap-container ${className}`}
      style={{
        aspectRatio: aspectRatio || undefined,
        ...style,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* 1. Underlying Revealed Layer (Second Content) */}
      <div
        className="pixelswap-content-layer"
        style={{
          zIndex: 1,
          opacity: isSwapped ? 1 : 0,
          transition: `opacity ${duration * 0.4}ms ease`,
        }}
      >
        {secondContent}
      </div>

      {/* 2. Top Initial Layer (First Content) */}
      <div
        className="pixelswap-content-layer"
        style={{
          zIndex: 2,
          opacity: isSwapped ? 0 : 1,
          pointerEvents: isSwapped ? 'none' : 'auto',
          transition: `opacity ${duration * 0.4}ms ease`,
        }}
      >
        {firstContent}
      </div>

      {/* 3. High-Precision Pixel Transition Grid Overlay */}
      {dimensions.width > 0 && dimensions.height > 0 && (animating || isSwapped) && (
        <div
          className="pixelswap-grid-overlay"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gap: `${gap}px`,
            padding: `${gap / 2}px`,
            zIndex: 10,
          }}
        >
          {pixels.map((p) => {
            const isDisappeared = isSwapped;
            const currentDelay = isSwapped ? p.delay : (duration - pixelDuration - p.delay);

            return (
              <div
                key={p.id}
                className="pixelswap-pixel"
                style={{
                  borderRadius: `${pixelRadius}px`,
                  transitionDuration: `${pixelDuration}ms`,
                  transitionDelay: `${Math.max(0, currentDelay)}ms`,
                  transform: isDisappeared
                    ? `scale(${pixelScale}) rotate(${pixelSpin}deg)`
                    : 'scale(1) rotate(0deg)',
                  opacity: isDisappeared ? (fade ? 0 : 1) : 1,
                }}
              >
                {/* Pixel Clipped Inner Mirror of Content for True Fragmented Dissolve */}
                <div
                  className="pixelswap-pixel-inner"
                  style={{
                    width: `${dimensions.width}px`,
                    height: `${dimensions.height}px`,
                    left: `-${p.col * cellWidth}px`,
                    top: `-${p.row * cellHeight}px`,
                    transformOrigin: 'top left',
                  }}
                >
                  {firstContent}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
