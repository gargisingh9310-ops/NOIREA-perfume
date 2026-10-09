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
      // 1. Master ScrollTrigger pinning Section 2 at 100vh for 2200px scroll space
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: SCROLL_DURATION,
        pin: true,
        scrub: 0.8,
        anticipatePin: 1,
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
          start: 'top 70%',
        },
      });

      tl.fromTo(
        tagRef.current,
        { opacity: 0, y: 15 },
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
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.6'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 15 },
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

  return (
    <section
      ref={sectionRef}
      id="brand-editorial"
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
        squareSize={55}
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
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              maxWidth: '480px',
            }}
          >
            <p
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
          <div ref={ctaRef} style={{ paddingTop: '0.4rem' }}>
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
        <div style={{ position: 'relative', width: '100%', pointerEvents: 'auto' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
            }}
          >
            <PerfumeSprayAnimation
              triggerRef={sectionRef}
              scrollEnd={SCROLL_DURATION}
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
        @media (max-width: 992px) {
          #brand-editorial {
            height: auto !important;
            min-height: 100vh !important;
            padding: 7rem 0 8rem !important;
          }
          .editorial-grid {
            grid-template-columns: 1fr !important;
            gap: 3.5rem !important;
            max-height: none !important;
          }
          .editorial-badge {
            left: 1rem !important;
            bottom: -1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
