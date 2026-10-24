import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';
import './PerfumeUnboxing.css';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 232;

const padZero = (n) => String(n).padStart(3, '0');
const getFramePath = (index) => `/boxperfume/ezgif-frame-${padZero(index + 1)}.jpg`;

export default function PerfumeUnboxing() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const ambientGlowRef = useRef(null);

  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const isRenderingRef = useRef(false);
  const sizeRef = useRef({ width: 0, height: 0 });

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Render a specific frame onto the canvas with proper aspect ratio containment/coverage
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
    const imgRatio = imgW / imgH;
    const canvasRatio = width / height;

    let drawW, drawH, drawX, drawY;

    // Maintain aspect ratio with graceful center placement
    if (canvasRatio > imgRatio) {
      drawW = width;
      drawH = width / imgRatio;
      drawX = 0;
      drawY = (height - drawH) / 2;
    } else {
      drawH = height;
      drawW = height * imgRatio;
      drawX = (width - drawW) / 2;
      drawY = 0;
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

  // Preload all 232 image frames
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;
    const images = [];

    const onImageLoaded = () => {
      if (isCancelled) return;
      loadedCount++;
      const progress = Math.round((loadedCount / TOTAL_FRAMES) * 100);
      setLoadingProgress(progress);

      // Once the first 25 frames are ready, make the scene visible and render frame 0
      if (loadedCount >= 25 && !isLoaded) {
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
      onImageLoaded(); // gracefully continue on failed frame
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

  // Handle Resize and Retina Canvas Resolution
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

  // GSAP ScrollTrigger Master Scrubbed Timeline
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 1024;
      const scrollEndDistance = isMobile ? '+=2200' : '+=3500';

      // 1. Master ScrollTrigger pinned to viewport (responsive scrub distance for mobile)
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: scrollEndDistance,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        onUpdate: (self) => {
          const frameIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.floor(self.progress * TOTAL_FRAMES))
          );
          requestFrameRender(frameIndex);
        },
      });

      // 2. Timeline for subtle ambient lighting and scroll indicator fade
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: scrollEndDistance,
          scrub: 0.8,
        },
      });

      // Scroll prompt indicator fades out on initial scroll
      tl.to(
        scrollIndicatorRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.08,
          ease: 'power1.out',
        },
        0
      )

        // Subtle ambient glow pulse as bottle emerges
        .to(
          ambientGlowRef.current,
          {
            scale: 1.3,
            opacity: 0.95,
            duration: 0.4,
            ease: 'power1.inOut',
          },
          0.35
        );
    }, container);

    return () => ctx.revert();
  }, [requestFrameRender]);

  return (
    <section
      ref={containerRef}
      id="hero-experience"
      className="unboxing-hero-section"
    >
      {/* 1. Atmospheric Deep Royal Blue Glow */}
      <div ref={ambientGlowRef} className="unboxing-ambient-glow" />

      {/* 2. Main Frame-by-Frame Canvas Viewport */}
      <div className="unboxing-canvas-container">
        <canvas ref={canvasRef} className="unboxing-canvas" />
      </div>

      {/* 3. Subtle Edge Vignette Overlay */}
      <div className="unboxing-vignette" />

      {/* 4. Luxury Loading State */}
      <div className={`unboxing-loader ${isLoaded ? 'loaded' : ''}`}>
        <span
          className="mono-tag"
          style={{
            color: '#FFFFFF',
            fontSize: '0.72rem',
            letterSpacing: '0.3em',
          }}
        >
          NOIRÉA &bull; HAUTE PARFUMERIE
        </span>
        <div className="loader-bar-bg">
          <div
            className="loader-bar-fill"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.64rem',
            color: '#A5A5A5',
            letterSpacing: '0.18em',
          }}
        >
          INITIALIZING ATELIER EXPERIENCE {loadingProgress}%
        </span>
      </div>

      {/* 5. Minimal Scroll Prompt Indicator */}
      <div ref={scrollIndicatorRef} className="unboxing-scroll-prompt scroll-prompt-pulse">
        <span className="mono-tag" style={{ fontSize: '0.68rem', letterSpacing: '0.28em' }}>
          SCROLL TO UNBOX
        </span>
        <ArrowDown size={14} color="var(--accent-icy-blue)" />
      </div>
    </section>
  );
}
