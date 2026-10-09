import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PERFUMES } from '../data/perfumes';
import { ArrowRight, Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PerfumeScroller({ onQuickView, onAddToCart }) {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressDotRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  // References for bottles and text panels
  const bottleRefs = useRef([]);
  const textRefs = useRef([]);
  const notePillRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalStages = PERFUMES.length;
      const bottles = bottleRefs.current;
      const texts = textRefs.current;

      // Master ScrollTrigger timeline pinned for exactly 4 full product stages
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalStages * 950}`,
          pin: true,
          scrub: 1.0,
          anticipatePin: 1,
          onUpdate: (self) => {
            const rawIdx = self.progress * totalStages;
            const currentIdx = Math.min(totalStages - 1, Math.floor(rawIdx));
            setActiveIndex(currentIdx);

            // Update custom horizontal progress scrubber
            if (progressBarRef.current && progressDotRef.current) {
              const pct = self.progress * 100;
              gsap.to(progressBarRef.current, {
                width: `${pct}%`,
                duration: 0.1,
                ease: 'none',
              });
              gsap.to(progressDotRef.current, {
                left: `${pct}%`,
                duration: 0.1,
                ease: 'none',
              });
            }
          },
        },
      });

      // Initial state of bottles and text
      bottles.forEach((bottle, i) => {
        if (i === 0) {
          gsap.set(bottle, { opacity: 1, scale: 1, x: 0, rotationY: 0, zIndex: 10 });
          gsap.set(texts[i], { opacity: 1, y: 0, zIndex: 10 });
        } else {
          gsap.set(bottle, { opacity: 0, scale: 0.84, x: 140, rotationY: -12, zIndex: 5 });
          gsap.set(texts[i], { opacity: 0, y: 50, zIndex: 5 });
        }
      });

      // Sequential 3D Spatial Product Transitions
      for (let i = 0; i < totalStages - 1; i++) {
        const timePoint = i * 2.8 + 1.2;

        // Current product bottle moves away, scales down, rotates and fades out
        tl.to(
          bottles[i],
          {
            opacity: 0,
            scale: 0.8,
            x: -160,
            rotationY: 14,
            duration: 2.0,
            ease: 'power2.inOut',
          },
          timePoint
        )
          .to(
            texts[i],
            {
              opacity: 0,
              y: -40,
              duration: 1.4,
              ease: 'power2.in',
            },
            timePoint
          )

          // Next product bottle enters from opposite side, rotates in, scales into hero flacon
          .to(
            bottles[i + 1],
            {
              opacity: 1,
              scale: 1,
              x: 0,
              rotationY: 0,
              duration: 2.0,
              ease: 'power2.out',
            },
            timePoint + 0.7
          )
          .to(
            texts[i + 1],
            {
              opacity: 1,
              y: 0,
              duration: 1.6,
              ease: 'power2.out',
            },
            timePoint + 0.9
          );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const activePerfume = PERFUMES[activeIndex] || PERFUMES[0];

  return (
    <section
      ref={containerRef}
      id="collection-scroller"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        backgroundColor: '#080808',
        color: '#FFFFFF',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Background Dynamic Atmospheric Lighting Tone */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '25%',
          transform: 'translate(50%, -50%)',
          width: '60vw',
          height: '60vw',
          maxWidth: '850px',
          maxHeight: '850px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168, 216, 240, 0.12) 0%, rgba(37, 88, 140, 0.06) 40%, transparent 70%)',
          filter: 'blur(90px)',
          opacity: 0.6,
          transition: 'background 0.8s ease',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Main Pinned Showcase Layout */}
      <div
        className="showcase-grid site-container"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 0.42fr) minmax(360px, 0.58fr)',
          alignItems: 'center',
          gap: '5rem',
        }}
      >
        {/* LEFT CONTENT (approx 40% width) */}
        <div
          ref={leftColRef}
          style={{
            position: 'relative',
            height: '520px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {PERFUMES.map((perfume, idx) => (
            <div
              key={perfume.id}
              ref={(el) => (textRefs.current[idx] = el)}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '1.4rem',
                pointerEvents: activeIndex === idx ? 'auto' : 'none',
              }}
            >
              {/* Product Number & Fragrance Family */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.88rem',
                    fontWeight: 500,
                    letterSpacing: '0.24em',
                    color: 'var(--accent-icy-blue)',
                  }}
                >
                  {perfume.number} / 04
                </span>
                <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>—</span>
                <span className="mono-tag" style={{ color: 'var(--text-secondary)' }}>
                  {perfume.family}
                </span>
              </div>

              {/* Large Perfume Name */}
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(3.2rem, 6vw, 5.2rem)',
                  lineHeight: 0.95,
                  letterSpacing: '0.05em',
                  color: '#FFFFFF',
                  margin: 0,
                }}
              >
                {perfume.shortName}
              </h2>

              {/* Short Description */}
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 'clamp(1.02rem, 1.25vw, 1.18rem)',
                  lineHeight: 1.7,
                  color: 'var(--text-secondary)',
                  maxWidth: '460px',
                  margin: 0,
                  fontWeight: 300,
                }}
              >
                "{perfume.description}"
              </p>

              {/* Scent Notes (3 Notes) */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.4rem' }}>
                {perfume.notes.map((note, nIdx) => (
                  <span
                    key={nIdx}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      padding: '0.45rem 0.95rem',
                      borderRadius: '0px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: 'var(--accent-silver)',
                    }}
                  >
                    {note}
                  </span>
                ))}
              </div>

              {/* Minimal CTAs */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginTop: '0.8rem' }}>
                <button
                  onClick={() => onQuickView && onQuickView(perfume)}
                  className="btn-noirea-primary"
                  style={{ padding: '1rem 2rem' }}
                >
                  <span>DISCOVER {perfume.shortName}</span>
                  <ArrowRight size={14} />
                </button>

                {onAddToCart && (
                  <button
                    onClick={() => onAddToCart(perfume, 100)}
                    className="btn-noirea-outline"
                    style={{ padding: '1rem 1.6rem' }}
                  >
                    <Plus size={14} />
                    <span>${perfume.price}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT VISUAL (approx 60% width) — Huge Translucent Blue Glass Flacon Gallery */}
        <div
          ref={rightColRef}
          style={{
            position: 'relative',
            height: '660px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            perspective: '1400px',
          }}
        >
          {PERFUMES.map((perfume, idx) => (
            <div
              key={perfume.id}
              ref={(el) => (bottleRefs.current[idx] = el)}
              style={{
                position: 'absolute',
                width: '100%',
                maxWidth: '520px',
                height: '600px',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 40px 100px rgba(0, 0, 0, 0.95), 0 0 50px rgba(98, 164, 216, 0.14)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                backgroundColor: '#080808',
                transformStyle: 'preserve-3d',
              }}
            >
              <img
                src={perfume.image}
                alt={`NOIRÉA ${perfume.name} Flacon`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />

              {/* Floating Bottom Glass Monogram Tag */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '1.8rem',
                  left: '1.8rem',
                  backgroundColor: 'rgba(8, 8, 8, 0.85)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  padding: '0.8rem 1.4rem',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                }}
              >
                <span className="mono-tag" style={{ color: 'var(--accent-icy-blue)', fontSize: '0.64rem' }}>
                  NOIRÉA • {perfume.family}
                </span>
                <p
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.15rem',
                    letterSpacing: '0.06em',
                    margin: '0.2rem 0 0',
                    color: '#FFFFFF',
                    fontWeight: 400,
                  }}
                >
                  {perfume.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicator within Section 3: 01 ━━━━━○━━ 04 */}
      <div
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '90%',
          maxWidth: '460px',
          display: 'flex',
          alignItems: 'center',
          gap: '1.4rem',
          zIndex: 40,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            letterSpacing: '0.18em',
            color: 'var(--accent-icy-blue)',
            fontWeight: 600,
          }}
        >
          01
        </span>

        {/* Minimal Progress Line with Moving Circle */}
        <div
          style={{
            flex: 1,
            height: '2px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            position: 'relative',
            borderRadius: '1px',
          }}
        >
          {/* Active progress bar */}
          <div
            ref={progressBarRef}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '25%',
              backgroundColor: 'var(--accent-icy-blue)',
            }}
          />

          {/* Active indicator dot: ○ */}
          <div
            ref={progressDotRef}
            style={{
              position: 'absolute',
              top: '50%',
              left: '25%',
              transform: 'translate(-50%, -50%)',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '2px solid var(--accent-icy-blue)',
              boxShadow: '0 0 10px rgba(168, 216, 240, 0.8)',
            }}
          />
        </div>

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            letterSpacing: '0.18em',
            color: 'var(--text-secondary)',
          }}
        >
          04
        </span>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .showcase-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
