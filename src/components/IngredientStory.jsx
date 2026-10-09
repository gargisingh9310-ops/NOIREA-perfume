import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { INGREDIENTS } from '../data/perfumes';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function IngredientStory() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const sectionRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const itemsContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax scroll on the large botanical flatlay image
      gsap.fromTo(imageWrapperRef.current,
        { y: 50, scale: 0.96 },
        {
          y: -40,
          scale: 1.04,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeIngredient = INGREDIENTS[selectedIdx] || INGREDIENTS[0];

  return (
    <section
      ref={sectionRef}
      id="ingredients-story"
      style={{
        padding: '10rem 0',
        backgroundColor: 'var(--bg-cream)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="site-container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '4.5rem',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
        >
          <div>
            <span
              className="mono-tag"
              style={{
                color: 'var(--accent-gold)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Sparkles size={13} />
              MATIÈRES PREMIÈRES • BOTANICAL ESSENCES
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
                letterSpacing: '0.04em',
                lineHeight: 1.02,
                color: 'var(--text-primary)',
                margin: '0.5rem 0 0',
              }}
            >
              RARE INGREDIENTS
            </h2>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: 'var(--text-muted)',
              maxWidth: '420px',
              lineHeight: 1.7,
            }}
          >
            From the sunlit bergamot orchards of Calabria to the wild vetiver hills of Les Cayes, we procure single-origin botanicals aged to perfection.
          </p>
        </div>

        {/* 2-Column Split: Editorial Photography & Ingredient Accordion */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 1fr) minmax(320px, 1fr)',
            gap: '5rem',
            alignItems: 'center',
          }}
          className="ingredients-split"
        >
          {/* Left: Large Editorial Botanical Photography with Parallax */}
          <div
            ref={imageWrapperRef}
            style={{
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 30px 70px rgba(36, 34, 31, 0.12)',
              backgroundColor: '#DFD7C9',
            }}
          >
            <img
              src="/assets/images/ingredients.jpg"
              alt="NOIRÉA Rare Raw Botanical Ingredients"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />

            {/* Overlay Active Tag */}
            <div
              style={{
                position: 'absolute',
                top: '1.5rem',
                left: '1.5rem',
                backgroundColor: 'rgba(241, 236, 227, 0.94)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                padding: '0.6rem 1.2rem',
                borderRadius: '3px',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <span className="mono-tag" style={{ color: 'var(--accent-gold)' }}>
                {activeIngredient.category}
              </span>
            </div>
          </div>

          {/* Right: Interactive Ingredient Selector */}
          <div ref={itemsContainerRef} style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {INGREDIENTS.map((item, idx) => {
              const isSelected = idx === selectedIdx;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedIdx(idx)}
                  style={{
                    backgroundColor: isSelected ? 'var(--bg-sand)' : 'transparent',
                    border: isSelected ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                    padding: '1.3rem 1.8rem',
                    borderRadius: '6px',
                    transition: 'all 0.35s var(--ease-luxury)',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <h4
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.35rem',
                        letterSpacing: '0.02em',
                        color: 'var(--text-primary)',
                        margin: 0,
                      }}
                    >
                      {item.name}
                    </h4>
                    <span className="mono-tag" style={{ color: isSelected ? 'var(--accent-gold)' : 'var(--text-muted)' }}>
                      {item.origin}
                    </span>
                  </div>

                  {isSelected && (
                    <div style={{ marginTop: '0.8rem', animation: 'fadeIn 0.3s ease' }}>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                        {item.description}
                      </p>
                      <div style={{ marginTop: '0.6rem', display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                        <span className="mono-tag" style={{ color: 'var(--accent-gold)', fontSize: '0.64rem' }}>
                          PROFILE:
                        </span>
                        <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                          {item.character}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .ingredients-split {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
