import React, { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles } from 'lucide-react';
import './PerfumeSprayAnimation.css';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 240;

const padZero = (n) => String(n).padStart(3, '0');
const getFramePath = (index) => `/perfumesprey/ezgif-frame-${padZero(index + 1)}.jpg`;

const PerfumeSprayAnimation = forwardRef(function PerfumeSprayAnimation(
  { triggerRef, scrollEnd = '+=2400', isControlled = false, className = '' },
  ref
) {
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

    const images = imagesRef.current;
    if (!images || images.length === 0) return;

    // Retrieve requested frame, or gracefully fallback to nearest loaded frame
    let img = images[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      let nearest = null;
      let minDiff = Infinity;
      for (let i = 0; i < images.length; i++) {
        if (images[i] && images[i].complete && images[i].naturalWidth > 0) {
          const diff = Math.abs(i - frameIdx);
          if (diff < minDiff) {
            minDiff = diff;
            nearest = images[i];
          }
        }
      }
      img = nearest;
    }

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

  // Imperative handle for parent master ScrollTrigger to drive frame updates seamlessly
  useImperativeHandle(ref, () => ({
    setProgress: (progress) => {
      const clamped = Math.min(1, Math.max(0, progress));
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(clamped * TOTAL_FRAMES))
      );
      requestFrameRender(frameIndex);

      // Atmospheric backlight glow sync
      if (glowRef.current) {
        const scale = 1 + 0.25 * clamped;
        const opacity = 0.6 + 0.25 * clamped;
        glowRef.current.style.transform = `translate(-50%, -50%) scale(${scale})`;
        glowRef.current.style.opacity = `${opacity}`;
      }
    },
    setFrame: (frameIdx) => {
      requestFrameRender(frameIdx);
    },
    getCurrentFrame: () => currentFrameRef.current,
    isReady: () => isLoaded,
  }), [requestFrameRender, isLoaded]);

  // Preload all 240 image frames
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;
    const images = [];

    const onImageLoaded = (idx) => {
      if (isCancelled) return;
      loadedCount++;
      const progress = Math.round((loadedCount / TOTAL_FRAMES) * 100);
      setLoadingProgress(progress);

      // Render first frame immediately as soon as frame 0 is available
      if (idx === 0 && !isLoaded) {
        setIsLoaded(true);
        requestFrameRender(0);
      }

      // Hide loader once initial batch is ready
      if (loadedCount >= 10 && !isLoaded) {
        setIsLoaded(true);
        requestFrameRender(currentFrameRef.current);
      }

      // If newly loaded frame matches current requested frame, redraw
      if (idx === currentFrameRef.current) {
        requestFrameRender(idx);
      }

      if (loadedCount === TOTAL_FRAMES) {
        setIsLoaded(true);
        requestFrameRender(currentFrameRef.current);
        ScrollTrigger.refresh();
      }
    };

    const onImageError = (idx) => {
      onImageLoaded(idx); // Gracefully continue if an individual frame fails
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => onImageLoaded(i);
      img.onerror = () => onImageError(i);
      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      isCancelled = true;
    };
  }, [requestFrameRender, isLoaded]);

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

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
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

  // Optional standalone ScrollTrigger fallback if not controlled by master section trigger
  useEffect(() => {
    if (isControlled) return;

    const container = containerRef.current;
    if (!container) return;

    const scrollTarget = triggerRef?.current || container;

    const ctx = gsap.context(() => {
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
  }, [isControlled, triggerRef, scrollEnd, requestFrameRender]);

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
});

export default PerfumeSprayAnimation;
