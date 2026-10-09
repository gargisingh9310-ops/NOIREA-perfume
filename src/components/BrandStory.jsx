import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function BrandStory({ onDiscoverStory }) {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax scroll on the editorial perfume photography
      gsap.fromTo(imageRef.current,
        { y: 60, scale: 0.95 },
        {
          y: -40,
          scale: 1.05,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2
          }
        }
      );

      // Editorial text reveal on scroll
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          }
        }
      );

      gsap.fromTo(textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="brand-story"
      style={{
        padding: '11rem 0',
        backgroundColor: 'var(--bg-sand)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        className="story-grid site-container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 1fr) minmax(320px, 1.1fr)',
          alignItems: 'center',
          gap: '6rem',
        }}
      >
        {/* Left: Large Editorial Perfume Bottle Photography with Parallax */}
        <div style={{ position: 'relative' }}>
          <div
            style={{
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 30px 70px rgba(36, 34, 31, 0.12)',
              backgroundColor: '#DFD7C9',
            }}
          >
            <img
              ref={imageRef}
              src="/assets/images/velvet.jpg"
              alt="NOIRÉA VELVET Artistic Composition"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                transformOrigin: 'center center',
              }}
            />
          </div>

          {/* Floating Editorial Quote Pill */}
          <div
            style={{
              position: 'absolute',
              bottom: '-2rem',
              right: '-1.5rem',
              backgroundColor: 'var(--text-primary)',
              color: 'var(--bg-cream)',
              padding: '1.6rem 2rem',
              borderRadius: '4px',
              maxWidth: '280px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
            }}
            className="story-floating-quote"
          >
            <p
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: '1.15rem',
                fontStyle: 'italic',
                lineHeight: 1.4,
                margin: 0,
              }}
            >
              "An invisible architecture that lingers long after you have departed."
            </p>
          </div>
        </div>

        {/* Right: Asymmetric Editorial Manifesto */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div ref={titleRef}>
            <span
              className="mono-tag"
              style={{
                color: 'var(--accent-gold)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginBottom: '1rem',
              }}
            >
              <Sparkles size={13} />
              NOIRÉA PHILOSOPHY
            </span>

            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)',
                lineHeight: 1.02,
                letterSpacing: '0.02em',
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              THE ART OF PRESENCE
            </h2>
          </div>

          <div ref={textRef} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: 'clamp(1.3rem, 2.2vw, 1.7rem)',
                fontStyle: 'italic',
                color: 'var(--accent-gold)',
                lineHeight: 1.35,
                margin: 0,
              }}
            >
              "Fragrance is more than a scent. It is the impression that remains."
            </p>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '1.05rem',
                lineHeight: 1.8,
                color: 'var(--text-muted)',
                margin: 0,
              }}
            >
              Fragrance is not an accessory—it is an intimate signature. It is the intangible atmosphere you leave in a doorway, the tactile warmth in a whisper, and the sensory imprint etched into memory.
            </p>

            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.98rem',
                lineHeight: 1.75,
                color: 'var(--text-muted)',
                margin: 0,
              }}
            >
              Every NOIRÉA creation is formulated in limited micro-batches in Grasse, fusing rare cold-distilled botanicals with aged resinous ambers to evolve uniquely with your skin chemistry.
            </p>

            <div style={{ paddingTop: '1rem' }}>
              <a
                href="#ingredients-story"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--text-primary)',
                  borderBottom: '1px solid var(--text-primary)',
                  paddingBottom: '0.4rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--accent-gold)';
                  e.currentTarget.style.borderColor = 'var(--accent-gold)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-primary)';
                  e.currentTarget.style.borderColor = 'var(--text-primary)';
                }}
              >
                <span>DISCOVER OUR STORY & INGREDIENTS</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .story-grid {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
          }
          .story-floating-quote {
            position: relative !important;
            bottom: auto !important;
            right: auto !important;
            margin-top: 1.5rem !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
