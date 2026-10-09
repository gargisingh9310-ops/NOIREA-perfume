import React, { useState } from 'react';
import { INGREDIENTS } from '../data/perfumes';
import { Sparkles } from 'lucide-react';

export default function IngredientSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeIng = INGREDIENTS[activeIdx] || INGREDIENTS[0];

  return (
    <section
      id="ingredients"
      style={{
        padding: '9rem 0',
        backgroundColor: 'var(--bg-sand)',
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
            <span className="mono-tag" style={{ color: 'var(--accent-gold)' }}>
              MATIÈRES PREMIÈRES • BOTANICAL ALCHEMY
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                letterSpacing: '0.04em',
                lineHeight: 1.05,
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
              fontSize: '0.95rem',
              color: 'var(--text-muted)',
              maxWidth: '380px',
              lineHeight: 1.6,
            }}
          >
            We traverse the globe from the rose valleys of Isparta to the vetiver hills of Haiti, procuring single-harvest botanicals distilled with artisanal patience.
          </p>
        </div>

        {/* 2-Column Split: Artistic Flatlay Imagery & Interactive Ingredient Inspector */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 1fr) minmax(320px, 1fr)',
            gap: '5rem',
            alignItems: 'center',
          }}
          className="ingredients-grid"
        >
          {/* Left: Luxury Botanical Flatlay Asset */}
          <div
            style={{
              position: 'relative',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(26,25,24,0.1)',
            }}
          >
            <img
              src="/assets/images/ingredients.jpg"
              alt="NOIRÉA Rare Botanical Ingredients Flatlay"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </div>

          {/* Right: Interactive Ingredient Selector & Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {INGREDIENTS.map((item, idx) => {
              const isSelected = idx === activeIdx;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  style={{
                    backgroundColor: isSelected ? 'var(--bg-cream)' : 'transparent',
                    border: isSelected ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                    padding: '1.4rem 1.8rem',
                    borderRadius: '6px',
                    transition: 'all 0.35s var(--ease-luxury)',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 10px 25px rgba(26,25,24,0.06)' : 'none',
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
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                        {item.description}
                      </p>
                      <div style={{ marginTop: '0.6rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <span className="mono-tag" style={{ color: 'var(--accent-gold)', fontSize: '0.65rem' }}>
                          OLFACTORY PROFILE:
                        </span>
                        <span style={{ fontFamily: 'var(--font-editorial)', fontStyle: 'italic', fontSize: '1rem', color: 'var(--text-primary)' }}>
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
          .ingredients-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
