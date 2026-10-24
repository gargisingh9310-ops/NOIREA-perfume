import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';
import ShapeGrid from './ShapeGrid';
import PerfumeSprayAnimation from './PerfumeSprayAnimation';

gsap.registerPlugin(ScrollTrigger);

const SCROLL_DURATION = '+=2200';

export default function BrandEditorial({ onDiscoverCollection }) {
  const sectionRef = useRef(null);
  const sprayAnimRef = useRef(null);
  const contentGridRef = useRef(null);
  const tagRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const bodyTextRef = useRef(null);
  const dividerLine1Ref = useRef(null);
  const dividerLine2Ref = useRef(null);
  const ctaRef = useRef(null);
  const atmosphericGlowRef = useRef(null);

  useEffect(() => {
    const container = sectionRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 1024;

      // 1. Master ScrollTrigger pinning Section 2 and driving perfume spray animation
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: () => (window.innerWidth < 1024 ? '+=1600' : SCROLL_DURATION),
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (sprayAnimRef.current?.setProgress) {
            sprayAnimRef.current.setProgress(self.progress);
          }
        },
      });

      // 2. Slow atmospheric deep-blue radial glow movement
      gsap.to(atmosphericGlowRef.current, {
        scale: 1.25,
        opacity: 0.25,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 3. Hairline divider animations
      gsap.fromTo(
        dividerLine1Ref.current,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        dividerLine2Ref.current,
        { scaleX: 0, transformOrigin: 'right center' },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
          },
        }
      );

      // 4. Subtle entrance reveal for typography when Section 2 locks into view
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: isMobile ? 'top 95%' : 'top 70%',
        },
      });

      const yOffset = isMobile ? 0 : 15;

      tl.fromTo(
        tagRef.current,
        { opacity: 0, y: yOffset },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      )
        .fromTo(
          [line1Ref.current, line2Ref.current],
          { y: '100%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 1.0, stagger: 0.12, ease: 'power3.out' },
          '-=0.5'
        )
        .fromTo(
          bodyTextRef.current,
          { opacity: 0, y: yOffset },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.6'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: yOffset },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.6'
        );
    }, container);

    return () => ctx.revert();
  }, []);

  const handleScrollToCollection = (e) => {
    e.preventDefault();
    if (onDiscoverCollection) {
      onDiscoverCollection();
    } else {
      document.getElementById('collection-scroller')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isMobileView = typeof window !== 'undefined' && window.innerWidth < 1024;
  const activeScrollDuration = isMobileView ? '+=1600' : SCROLL_DURATION;

  return (
    <section
      ref={sectionRef}
      id="brand-editorial"
      className="editorial-section"
      style={{
        position: 'relative',
        backgroundColor: '#000000',
        color: '#FFFFFF',
        width: '100%',
        height: '100vh',
        minHeight: '640px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 1. Animated ShapeGrid Canvas Covering Full Section Background */}
      <ShapeGrid
        direction="right"
        speed={0.35}
        borderColor="rgba(44, 52, 128, 0.28)"
        squareSize={isMobileView ? 42 : 55}
        hoverFillColor="#2C3480"
        shape="square"
        hoverTrailAmount={5}
        className="noirea-shape-grid"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
        }}
      />

      {/* 2. Top Monochrome Hairline Divider */}
      <div
        ref={dividerLine1Ref}
        className="editorial-divider-line"
        style={{
          position: 'absolute',
          top: 0,
          left: '4.5rem',
          right: '4.5rem',
          height: '1px',
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      />

      {/* 3. Subtle Atmospheric Radial Glow Behind the Perfume Composition */}
      <div
        ref={atmosphericGlowRef}
        className="editorial-ambient-glow"
        style={{
          position: 'absolute',
          top: '50%',
          right: '12%',
          transform: 'translateY(-50%)',
          width: '50vw',
          height: '50vw',
          maxWidth: '700px',
          maxHeight: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(44, 52, 128, 0.22) 0%, rgba(44, 52, 128, 0.06) 45%, transparent 70%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* 4. Editorial Content Grid (Vertically Balanced within 100vh) */}
      <div
        ref={contentGridRef}
        className="editorial-grid site-container"
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'grid',
          gridTemplateColumns: 'minmax(340px, 0.95fr) minmax(420px, 1.05fr)',
          alignItems: 'center',
          gap: 'clamp(2.5rem, 4.5vw, 5.5rem)',
          width: '100%',
          maxHeight: '90vh',
          pointerEvents: 'none',
        }}
      >
        {/* Left Side: Editorial Typography & Copy */}
        <div
          className="editorial-copy-col"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.4rem',
            pointerEvents: 'auto',
          }}
        >
          {/* Small Label */}
          <div ref={tagRef}>
            <span
              className="mono-tag"
              style={{
                color: '#FFFFFF',
                opacity: 0.9,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontSize: '0.72rem',
                letterSpacing: '0.28em',
              }}
            >
              <Sparkles size={13} color="#FFFFFF" />
              THE WORLD OF NOIRÉA
            </span>
          </div>

          {/* Large Headline with Masked Reveal */}
          <div>
            <h2
              className="editorial-heading"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.2rem, 3.8vw, 3.8rem)',
                lineHeight: 1.08,
                letterSpacing: '0.02em',
                color: '#FFFFFF',
                margin: 0,
              }}
            >
              <div style={{ overflow: 'hidden', paddingBottom: '0.15rem' }}>
                <span ref={line1Ref} style={{ display: 'block' }}>
                  MORE THAN A SCENT.
                </span>
              </div>
              <div style={{ overflow: 'hidden', paddingTop: '0.15rem' }}>
                <span
                  ref={line2Ref}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-editorial)',
                    fontStyle: 'italic',
                    color: '#E0E5EC',
                  }}
                >
                  A STATE OF PRESENCE.
                </span>
              </div>
            </h2>
          </div>

          {/* Supporting Copy */}
          <div
            ref={bodyTextRef}
            className="editorial-body-wrap"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              maxWidth: '480px',
            }}
          >
            <p
              className="editorial-description"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.92rem, 1.1vw, 1.05rem)',
                lineHeight: 1.65,
                color: '#A5A5A5',
                margin: 0,
                fontWeight: 300,
              }}
            >
              Created for moments that deserve to be remembered. NOIRÉA brings together refined fragrance, modern design, and a distinctive sense of presence.
            </p>
          </div>

          {/* CTA Action */}
          <div ref={ctaRef} className="editorial-cta-wrap" style={{ paddingTop: '0.4rem' }}>
            <a
              href="#collection-scroller"
              onClick={handleScrollToCollection}
              className="btn-noirea-primary"
            >
              <span>DISCOVER THE COLLECTION</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* Right Side: Landscape-Oriented Scroll-Controlled Perfume Spray Frame Animation */}
        <div className="editorial-visual-col" style={{ position: 'relative', width: '100%', pointerEvents: 'auto' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
            }}
          >
            <PerfumeSprayAnimation
              ref={sprayAnimRef}
              isControlled={true}
              triggerRef={sectionRef}
              scrollEnd={activeScrollDuration}
            />
          </div>

          {/* Floating Editorial Monogram Badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '-1.2rem',
              left: '-1.2rem',
              backgroundColor: '#0D0D0D',
              color: '#FFFFFF',
              padding: '0.9rem 1.4rem',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.85)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.2rem',
              zIndex: 30,
            }}
            className="editorial-badge"
          >
            <span
              className="mono-tag"
              style={{
                color: '#FFFFFF',
                fontSize: '0.58rem',
                letterSpacing: '0.3em',
              }}
            >
              EDITION 2026
            </span>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '0.9rem',
                letterSpacing: '0.1em',
              }}
            >
              GRASSE &bull; PARIS
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Monochrome Hairline Divider */}
      <div
        ref={dividerLine2Ref}
        className="editorial-divider-line"
        style={{
          position: 'absolute',
          bottom: 0,
          left: '4.5rem',
          right: '4.5rem',
          height: '1px',
          backgroundColor: 'rgba(255, 255, 255, 0.12)',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      />

      <style>{`
        /* STRICT PRESERVATION: At >= 1024px desktop, all original styling applies */
        @media (max-width: 1023px) {
          #brand-editorial.editorial-section {
            height: 100vh !important;
            height: 100dvh !important;
            min-height: 0 !important;
            padding: calc(4.6rem + env(safe-area-inset-top, 0px)) 1rem calc(1rem + env(safe-area-inset-bottom, 0px)) !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
          }

          .editorial-grid {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            width: 100% !important;
            max-width: 100% !important;
            grid-template-columns: none !important;
            gap: 0.85rem !important;
            max-height: 100% !important;
            padding: 0 !important;
            margin: 0 auto !important;
            box-sizing: border-box !important;
          }

          .editorial-divider-line {
            left: 1rem !important;
            right: 1rem !important;
          }

          .editorial-ambient-glow {
            width: 80vw !important;
            height: 80vw !important;
            right: 50% !important;
            top: 60% !important;
            transform: translate(50%, -50%) !important;
            filter: blur(55px) !important;
            opacity: 0.35 !important;
          }

          /* 1. Header, Description, and CTA Styling on Mobile */
          .editorial-copy-col {
            width: 100% !important;
            max-width: 440px !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
            gap: 0.55rem !important;
            margin: 0 auto !important;
          }

          .editorial-copy-col .mono-tag {
            font-size: 0.65rem !important;
            letter-spacing: 0.18em !important;
            gap: 0.4rem !important;
            justify-content: center !important;
          }

          .editorial-heading {
            font-size: clamp(1.35rem, 4.6vw, 1.85rem) !important;
            line-height: 1.15 !important;
            letter-spacing: 0.02em !important;
            text-align: center !important;
          }

          .editorial-body-wrap {
            max-width: 100% !important;
            margin: 0 auto !important;
          }

          .editorial-description {
            font-size: 0.78rem !important;
            line-height: 1.45 !important;
            max-width: 320px !important;
            margin: 0 auto !important;
            text-align: center !important;
            color: rgba(255, 255, 255, 0.78) !important;
          }

          .editorial-cta-wrap {
            display: flex !important;
            justify-content: center !important;
            padding-top: 0.2rem !important;
            width: 100% !important;
          }

          .editorial-cta-wrap .btn-noirea-primary {
            padding: 0.65rem 1.4rem !important;
            font-size: 0.66rem !important;
            letter-spacing: 0.14em !important;
            min-height: 40px !important;
            height: 40px !important;
            max-width: 260px !important;
            width: auto !important;
            gap: 0.45rem !important;
            white-space: nowrap !important;
            margin: 0 auto !important;
          }

          .editorial-cta-wrap .btn-noirea-primary svg {
            width: 12px !important;
            height: 12px !important;
          }

          /* 2. Visual Container: Perfume Bottle Centered & Scaled to Viewport */
          .editorial-visual-col {
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 auto !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            position: relative !important;
          }

          .editorial-visual-col > div:first-child {
            width: 100% !important;
            max-width: min(340px, 92vw) !important;
            margin: 0 auto !important;
            display: flex !important;
            justify-content: center !important;
          }

          /* Atelier seal badge positioned neatly below canvas without overlapping */
          .editorial-badge {
            position: static !important;
            margin: 0.5rem auto 0 !important;
            align-self: center !important;
            padding: 0.35rem 0.8rem !important;
            flex-direction: row !important;
            align-items: center !important;
            gap: 0.5rem !important;
            box-shadow: none !important;
            border-color: rgba(255, 255, 255, 0.08) !important;
            background-color: rgba(13, 13, 13, 0.8) !important;
          }

          .editorial-badge span.mono-tag {
            font-size: 0.52rem !important;
            letter-spacing: 0.2em !important;
          }

          .editorial-badge span:last-child {
            font-size: 0.75rem !important;
            letter-spacing: 0.08em !important;
          }
        }

        /* Screen widths <= 360px (e.g. 320px narrow phones) */
        @media (max-width: 360px) {
          #brand-editorial.editorial-section {
            padding: calc(4.2rem + env(safe-area-inset-top, 0px)) 0.5rem calc(0.8rem + env(safe-area-inset-bottom, 0px)) !important;
          }

          .editorial-grid {
            gap: 0.65rem !important;
          }

          .editorial-heading {
            font-size: 1.3rem !important;
          }

          .editorial-description {
            font-size: 0.74rem !important;
            line-height: 1.4 !important;
            max-width: 280px !important;
          }

          .editorial-cta-wrap .btn-noirea-primary {
            padding: 0.55rem 1.1rem !important;
            font-size: 0.62rem !important;
            min-height: 36px !important;
            height: 36px !important;
            max-width: 240px !important;
          }

          .editorial-visual-col > div:first-child {
            max-width: min(280px, 92vw) !important;
          }

          .editorial-badge {
            padding: 0.25rem 0.65rem !important;
            margin-top: 0.4rem !important;
          }
        }

        /* Ultra-short viewports (<= 560px screen height) */
        @media (max-height: 560px) and (max-width: 1023px) {
          #brand-editorial.editorial-section {
            padding: calc(3.8rem + env(safe-area-inset-top, 0px)) 0.5rem calc(0.5rem + env(safe-area-inset-bottom, 0px)) !important;
          }

          .editorial-grid {
            gap: 0.45rem !important;
          }

          .editorial-copy-col {
            gap: 0.35rem !important;
          }

          .editorial-heading {
            font-size: 1.25rem !important;
          }

          .editorial-description {
            display: -webkit-box !important;
            -webkit-line-clamp: 2 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
            font-size: 0.72rem !important;
          }

          .editorial-cta-wrap .btn-noirea-primary {
            min-height: 34px !important;
            height: 34px !important;
            font-size: 0.6rem !important;
            padding: 0.45rem 0.9rem !important;
          }

          .editorial-visual-col > div:first-child {
            max-width: min(250px, 85vw) !important;
          }

          .editorial-badge {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
