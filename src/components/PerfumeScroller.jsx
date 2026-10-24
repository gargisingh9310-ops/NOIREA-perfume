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

      const isMobile = window.innerWidth < 1024;
      const scrollDuration = isMobile ? `+=${totalStages * 650}` : `+=${totalStages * 950}`;
      const enterX = isMobile ? 50 : 140;
      const exitX = isMobile ? -50 : -160;

      // Master ScrollTrigger timeline pinned for product stages
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: scrollDuration,
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
          gsap.set(bottle, { opacity: 0, scale: 0.84, x: enterX, rotationY: -12, zIndex: 5 });
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
            x: exitX,
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
      className="collection-scroller-section"
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
        className="showcase-ambient-glow"
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
        {/* LEFT CONTENT (approx 40% width on desktop) */}
        <div
          ref={leftColRef}
          className="showcase-text-col"
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
              className="showcase-text-card"
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
              <div className="showcase-item-meta" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
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
                className="showcase-item-title"
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
                className="showcase-item-desc"
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
              <div className="showcase-item-notes" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.4rem' }}>
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
              <div className="showcase-item-ctas" style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginTop: '0.8rem' }}>
                <button
                  onClick={() => onQuickView && onQuickView(perfume)}
                  className="btn-noirea-primary showcase-btn-discover"
                  style={{ padding: '1rem 2rem' }}
                >
                  <span>DISCOVER {perfume.shortName}</span>
                  <ArrowRight size={14} />
                </button>

                {onAddToCart && (
                  <button
                    onClick={() => onAddToCart(perfume, 100)}
                    className="btn-noirea-outline showcase-btn-price"
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

        {/* RIGHT VISUAL (approx 60% width on desktop) — Flacon Gallery */}
        <div
          ref={rightColRef}
          className="showcase-bottle-col"
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
              className="showcase-bottle-card"
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
                className="showcase-bottle-badge"
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
                  NOIRÉA &bull; {perfume.family}
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
        className="showcase-progress-wrap"
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
        /* STRICT PRESERVATION: At >= 1024px desktop, all original styling applies */
        @media (max-width: 1023px) {
          .collection-scroller-section {
            height: 100vh !important;
            height: 100dvh !important;
            padding: calc(3.4rem + env(safe-area-inset-top, 0px)) 1rem calc(0.8rem + env(safe-area-inset-bottom, 0px)) !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
          }

          /* Ambient glow centered behind flacon on mobile */
          .showcase-ambient-glow {
            top: 36% !important;
            right: 50% !important;
            transform: translate(50%, -50%) !important;
            width: 85vw !important;
            height: 85vw !important;
            max-width: 420px !important;
            max-height: 420px !important;
            opacity: 0.45 !important;
          }

          .showcase-grid {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            height: 100% !important;
            max-height: 100% !important;
            gap: 0.5rem !important;
            padding: 0 !important;
            box-sizing: border-box !important;
          }

          /* 1. Perfume Image is the Main Focus: large, clear, centered, fully visible */
          .showcase-bottle-col {
            order: 1 !important;
            width: 100% !important;
            max-width: 300px !important;
            height: clamp(210px, 46vh, 320px) !important;
            flex: 1 1 auto !important;
            min-height: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            position: relative !important;
            perspective: 1000px !important;
            margin: 0 auto !important;
          }

          .showcase-bottle-card {
            top: 0 !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            margin: auto !important;
            height: 100% !important;
            max-height: 100% !important;
            width: auto !important;
            max-width: min(240px, 80vw) !important;
            aspect-ratio: 896 / 1200 !important;
            border-radius: 8px !important;
            overflow: hidden !important;
            background-color: #080808 !important;
            border: 1px solid rgba(255, 255, 255, 0.1) !important;
            box-shadow: 0 15px 45px rgba(0, 0, 0, 0.95), 0 0 30px rgba(98, 164, 216, 0.12) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }

          .showcase-bottle-card img {
            width: 100% !important;
            height: 100% !important;
            object-fit: contain !important;
            object-position: center !important;
            display: block !important;
          }

          /* Remove obstructing image overlay card on mobile so bottle is 100% unobstructed */
          .showcase-bottle-badge {
            display: none !important;
          }

          /* 2. Compact Product Details and Text */
          .showcase-text-col {
            order: 2 !important;
            width: 100% !important;
            max-width: 360px !important;
            height: clamp(135px, 28vh, 175px) !important;
            flex: 0 0 auto !important;
            position: relative !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            margin: 0 auto !important;
            padding: 0 !important;
          }

          .showcase-text-card {
            gap: 0.35rem !important;
            align-items: center !important;
            text-align: center !important;
            justify-content: center !important;
            padding: 0 !important;
          }

          .showcase-item-meta {
            gap: 0.4rem !important;
            margin-bottom: 0 !important;
          }

          .showcase-item-meta span {
            font-size: 0.68rem !important;
            letter-spacing: 0.16em !important;
          }

          .showcase-item-title {
            font-size: clamp(1.4rem, 4.2vw, 1.85rem) !important;
            line-height: 1.0 !important;
            letter-spacing: 0.04em !important;
            margin: 0 !important;
          }

          .showcase-item-desc {
            font-size: 0.72rem !important;
            line-height: 1.35 !important;
            max-width: 290px !important;
            margin: 0 !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 1 !important;
            -webkit-box-orient: vertical !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }

          .showcase-item-notes {
            gap: 0.32rem !important;
            justify-content: center !important;
            margin-top: 0 !important;
          }

          .showcase-item-notes span {
            font-size: 0.58rem !important;
            padding: 0.22rem 0.52rem !important;
            letter-spacing: 0.12em !important;
            border-radius: 2px !important;
          }

          /* 3. Compact Buttons that fit without horizontal scroll */
          .showcase-item-ctas {
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 0.4rem !important;
            margin-top: 0.15rem !important;
            width: 100% !important;
            max-width: 320px !important;
          }

          .showcase-btn-discover {
            flex: 1 1 auto !important;
            padding: 0.5rem 0.85rem !important;
            font-size: 0.65rem !important;
            letter-spacing: 0.12em !important;
            min-height: 36px !important;
            height: 36px !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 0.3rem !important;
            white-space: nowrap !important;
          }

          .showcase-btn-discover svg {
            width: 12px !important;
            height: 12px !important;
          }

          .showcase-btn-price {
            flex: 0 0 auto !important;
            padding: 0.5rem 0.75rem !important;
            font-size: 0.68rem !important;
            letter-spacing: 0.08em !important;
            min-height: 36px !important;
            height: 36px !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 0.25rem !important;
            white-space: nowrap !important;
          }

          .showcase-btn-price svg {
            width: 12px !important;
            height: 12px !important;
          }

          /* 4. Hide bottom 01-04 pagination on mobile only */
          .showcase-progress-wrap {
            display: none !important;
          }
        }

        /* Viewports <= 360px wide (e.g. 320px small phones) */
        @media (max-width: 360px) {
          .collection-scroller-section {
            padding: calc(3.2rem + env(safe-area-inset-top, 0px)) 0.5rem calc(0.5rem + env(safe-area-inset-bottom, 0px)) !important;
          }

          .showcase-bottle-col {
            max-width: 250px !important;
            height: clamp(200px, 46vh, 240px) !important;
          }

          .showcase-bottle-card {
            max-width: min(180px, 75vw) !important;
          }

          .showcase-text-col {
            height: 135px !important;
            max-width: 300px !important;
          }

          .showcase-item-title {
            font-size: 1.45rem !important;
          }

          .showcase-item-meta span {
            font-size: 0.64rem !important;
          }

          .showcase-item-notes span {
            font-size: 0.54rem !important;
            padding: 0.18rem 0.45rem !important;
          }

          .showcase-item-ctas {
            gap: 0.35rem !important;
            max-width: 295px !important;
          }

          .showcase-btn-discover {
            padding: 0.45rem 0.75rem !important;
            font-size: 0.62rem !important;
            letter-spacing: 0.08em !important;
            min-height: 34px !important;
            height: 34px !important;
          }

          .showcase-btn-price {
            padding: 0.45rem 0.65rem !important;
            font-size: 0.65rem !important;
            min-height: 34px !important;
            height: 34px !important;
          }
        }

        /* Ultra-short viewports (<= 560px screen height) */
        @media (max-height: 560px) and (max-width: 1023px) {
          .collection-scroller-section {
            padding: calc(3.0rem + env(safe-area-inset-top, 0px)) 0.5rem calc(0.4rem + env(safe-area-inset-bottom, 0px)) !important;
          }

          .showcase-grid {
            gap: 0.25rem !important;
          }

          .showcase-bottle-col {
            height: clamp(190px, 48vh, 235px) !important;
          }

          .showcase-text-col {
            height: 125px !important;
          }

          .showcase-text-card {
            gap: 0.25rem !important;
          }

          .showcase-item-desc {
            display: none !important;
          }

          .showcase-item-title {
            font-size: 1.35rem !important;
          }

          .showcase-item-meta span {
            font-size: 0.62rem !important;
          }

          .showcase-item-notes span {
            font-size: 0.52rem !important;
            padding: 0.16rem 0.42rem !important;
          }

          .showcase-btn-discover,
          .showcase-btn-price {
            min-height: 32px !important;
            height: 32px !important;
            font-size: 0.6rem !important;
          }
        }
      `}</style>
    </section>
  );
}
