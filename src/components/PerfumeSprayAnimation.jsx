import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';
import './PerfumeSprayAnimation.css';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 240;

const padZero = (n) => String(n).padStart(3, '0');
const getFramePath = (index) => `/perfumesprey/ezgif-frame-${padZero(index + 1)}.jpg`;

export default function PerfumeSprayAnimation({ triggerRef, scrollEnd = '+=2400', className = '' }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const glowRef = useRef(null);

  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const isRenderingRef = useRef(false);
  const sizeRef = useRef({ width: 0, height: 0 });

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Render frame preserving exact 16:9 aspect ratio with zero cropping
  const renderFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const { width, height } = sizeRef.current;
    if (width <= 0 || height <= 0) return;

    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;
    const imgRatio = imgW / imgH; // 1920 / 1080 = 1.77778
    const canvasRatio = width / height;

    let drawW, drawH, drawX, drawY;

    // Aspect contain scaling: 100% of bottle, cap, and spray mist are visible without clipping
    if (canvasRatio > imgRatio) {
      drawH = height;
      drawW = height * imgRatio;
      drawX = (width - drawW) / 2;
      drawY = 0;
    } else {
      drawW = width;
      drawH = width / imgRatio;
      drawX = 0;
      drawY = (height - drawH) / 2;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  // Request Animation Frame throttled render
  const requestFrameRender = useCallback((frameIdx) => {
    currentFrameRef.current = frameIdx;
    if (!isRenderingRef.current) {
      isRenderingRef.current = true;
      requestAnimationFrame(() => {
        renderFrame(currentFrameRef.current);
        isRenderingRef.current = false;
      });
    }
  }, [renderFrame]);

  // Preload all 240 image frames
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;
    const images = [];

    const onImageLoaded = () => {
      if (isCancelled) return;
      loadedCount++;
      const progress = Math.round((loadedCount / TOTAL_FRAMES) * 100);
      setLoadingProgress(progress);

      // Once the first 20 frames are ready, display canvas immediately
      if (loadedCount >= 20 && !isLoaded) {
        setIsLoaded(true);
        requestFrameRender(0);
      }

      if (loadedCount === TOTAL_FRAMES) {
        setIsLoaded(true);
        requestFrameRender(currentFrameRef.current);
        ScrollTrigger.refresh();
      }
    };

    const onImageError = () => {
      onImageLoaded(); // Gracefully continue if an individual frame fails
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = onImageLoaded;
      img.onerror = onImageError;
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      isCancelled = true;
    };
  }, [requestFrameRender]);

  // Handle Retina Canvas Resolution and Container Resizing
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
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

      sizeRef.current = { width: w, height: h };
      renderFrame(currentFrameRef.current);
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [renderFrame]);

  // GSAP ScrollTrigger Frame Scrubbing Timeline
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollTarget = triggerRef?.current || container;

    const ctx = gsap.context(() => {
      // 1. Frame Scrubbing ScrollTrigger mapped to scroll progress of the pinned section
      ScrollTrigger.create({
        trigger: scrollTarget,
        start: 'top top',
        end: scrollEnd,
        scrub: 0.8,
        onUpdate: (self) => {
          const frameIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.floor(self.progress * TOTAL_FRAMES))
          );
          requestFrameRender(frameIndex);
        },
      });

      // 2. Subtle atmospheric backlight enhancement
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.25,
          opacity: 0.85,
          duration: 1,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: scrollTarget,
            start: 'top top',
            end: scrollEnd,
            scrub: 1,
          },
        });
      }
    }, container);

    return () => ctx.revert();
  }, [triggerRef, scrollEnd, requestFrameRender]);

  return (
    <div
      ref={containerRef}
      className={`perfume-spray-container ${className}`}
    >
      {/* 1. Atmospheric Backlight Glow */}
      <div ref={glowRef} className="spray-ambient-glow" />

      {/* 2. Main Frame Canvas */}
      <canvas ref={canvasRef} className="spray-canvas" />

      {/* 3. Luxury Loading State */}
      <div className={`spray-loader ${isLoaded ? 'loaded' : ''}`}>
        <span
          className="mono-tag"
          style={{
            color: 'var(--accent-icy-blue)',
            fontSize: '0.65rem',
            letterSpacing: '0.28em',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <Sparkles size={11} color="var(--accent-icy-blue)" />
          NOIRÉA &bull; ATELIER DE PARFUM
        </span>
        <div className="spray-loader-bar">
          <div
            className="spray-loader-fill"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
