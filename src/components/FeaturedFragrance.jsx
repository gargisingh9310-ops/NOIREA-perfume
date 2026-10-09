import React, { useState } from 'react';
import { PERFUMES } from '../data/perfumes';
import { Plus, Check, Droplet, Sparkles } from 'lucide-react';

export default function FeaturedFragrance({ onAddToCart, onQuickView }) {
  const sombre = PERFUMES.find((p) => p.id === 'sombre') || PERFUMES[3];
  const [activeTier, setActiveTier] = useState('top'); // 'top', 'heart', 'base'
  const [selectedVolume, setSelectedVolume] = useState(100);

  const tiers = [
    {
      id: 'top',
      label: 'TOP NOTES',
      sublabel: 'First 15–30 Minutes',
      headline: 'Tellicherry Black Pepper & Calabrian Bergamot',
      notes: sombre.pyramid.top,
    },
    {
      id: 'heart',
      label: 'HEART NOTES',
      sublabel: 'Hours 2–6',
      headline: 'Florentine Iris Pallida & Tuscan Leather Accord',
      notes: sombre.pyramid.heart,
    },
    {
      id: 'base',
      label: 'BASE NOTES',
      sublabel: 'Hours 6–14+',
      headline: 'Haitian Vetiver, Indonesian Patchouli & Black Amber',
      notes: sombre.pyramid.base,
    },
  ];

  const currentTierData = tiers.find((t) => t.id === activeTier) || tiers[0];
  const currentPrice = selectedVolume === 100 ? sombre.price : sombre.price50ml;

  return (
    <section
      id="featured"
      style={{
        padding: '9rem 0',
        backgroundColor: 'var(--bg-dark)',
        color: 'var(--text-light)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Ambient Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '20%',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(209, 148, 72, 0.12) 0%, rgba(18, 17, 16, 0) 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="featured-grid site-container"
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 0.95fr) minmax(340px, 1.05fr)',
          alignItems: 'center',
          gap: '6rem',
        }}
      >
        {/* Left: Huge Perfume Bottle Display */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '520px',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
              border: '1px solid rgba(250, 248, 245, 0.12)',
            }}
          >
            <img
              src="/assets/images/sombre.jpg"
              alt="NOIRÉA SOMBRE Hero Flacon"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                transform: 'scale(1.02)',
              }}
            />

            {/* Glowing Corner Badge */}
            <div
              style={{
                position: 'absolute',
                top: '1.8rem',
                left: '1.8rem',
                backgroundColor: 'rgba(18, 17, 16, 0.85)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                padding: '0.6rem 1.2rem',
                borderRadius: '999px',
                border: '1px solid rgba(209, 148, 72, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Sparkles size={12} color="var(--accent-champagne)" />
              <span className="mono-tag" style={{ color: 'var(--accent-champagne)', fontSize: '0.68rem' }}>
                MASTER EXTRAIT • 28%
              </span>
            </div>
          </div>
        </div>

        {/* Right: Scent Architecture & Interactive Olfactory Pyramid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <span className="mono-tag" style={{ color: 'var(--accent-champagne)' }}>
              FEATURED OLFACTORY COMPOSITION
            </span>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
                lineHeight: 1.05,
                letterSpacing: '0.04em',
                margin: '0.4rem 0 0',
                color: '#FAF6F0',
              }}
            >
              NOIRÉA SOMBRE
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: '1.35rem',
                fontStyle: 'italic',
                color: 'var(--accent-champagne)',
                marginTop: '0.4rem',
              }}
            >
              {sombre.tagline}
            </p>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.02rem',
              lineHeight: 1.7,
              color: 'var(--text-taupe)',
            }}
          >
            {sombre.description}
          </p>

          {/* Scent Pyramid Interactive Hierarchy */}
          <div
            style={{
              backgroundColor: 'rgba(250, 248, 245, 0.04)',
              border: '1px solid rgba(250, 248, 245, 0.1)',
              borderRadius: '8px',
              padding: '1.8rem 2rem',
              marginTop: '0.5rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <span className="mono-tag" style={{ color: 'var(--accent-champagne)' }}>
                INTERACTIVE SCENT PYRAMID
              </span>
              <span className="mono-tag" style={{ color: 'var(--text-taupe)' }}>
                EVAPORATION SPECTRUM
              </span>
            </div>

            {/* Tier Selectors */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.8rem', marginBottom: '1.5rem' }}>
              {tiers.map((tier) => {
                const isActive = tier.id === activeTier;
                return (
                  <button
                    key={tier.id}
                    onClick={() => setActiveTier(tier.id)}
                    style={{
                      padding: '0.8rem 0.6rem',
                      borderRadius: '4px',
                      backgroundColor: isActive ? 'var(--accent-gold)' : 'rgba(250, 248, 245, 0.05)',
                      color: isActive ? 'var(--bg-dark)' : 'var(--text-light)',
                      border: isActive ? '1px solid var(--accent-gold)' : '1px solid rgba(250, 248, 245, 0.12)',
                      textAlign: 'center',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        letterSpacing: '0.14em',
                        display: 'block',
                      }}
                    >
                      {tier.label}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.68rem',
                        opacity: isActive ? 0.9 : 0.6,
                        display: 'block',
                        marginTop: '0.2rem',
                      }}
                    >
                      {tier.sublabel}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Tier Notes Detail */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {currentTierData.notes.map((n, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    borderBottom: idx < currentTierData.notes.length - 1 ? '1px solid rgba(250, 248, 245, 0.08)' : 'none',
                    paddingBottom: '0.6rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.15rem',
                      color: '#FAF6F0',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {n.name}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.82rem',
                      color: 'var(--text-taupe)',
                      maxWidth: '260px',
                      textAlign: 'right',
                    }}
                  >
                    {n.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Volume Selector & Add to Bag */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', paddingTop: '0.5rem' }}>
            {/* Volume Switches */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span className="mono-tag" style={{ color: 'var(--text-taupe)' }}>VOLUME:</span>
              {[100, 50].map((vol) => (
                <button
                  key={vol}
                  onClick={() => setSelectedVolume(vol)}
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: '999px',
                    border: selectedVolume === vol ? '1px solid var(--accent-champagne)' : '1px solid rgba(250, 248, 245, 0.15)',
                    backgroundColor: selectedVolume === vol ? 'rgba(209, 148, 72, 0.18)' : 'transparent',
                    color: selectedVolume === vol ? 'var(--accent-champagne)' : 'var(--text-taupe)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                  }}
                >
                  {vol}ML — ${vol === 100 ? sombre.price : sombre.price50ml}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => onAddToCart(sombre, selectedVolume)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.8rem',
                  padding: '1.1rem 2.5rem',
                  backgroundColor: 'var(--accent-gold)',
                  color: 'var(--bg-dark)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.76rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  borderRadius: '2px',
                  flexGrow: 1,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#C2A675')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-gold)')}
              >
                <Plus size={15} />
                <span>ADD TO BAG — ${currentPrice}</span>
              </button>

              <button
                onClick={() => onQuickView(sombre)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1.1rem 2.0rem',
                  backgroundColor: 'transparent',
                  color: 'var(--text-light)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.76rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                  border: '1px solid rgba(250, 248, 245, 0.25)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--text-light)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(250, 248, 245, 0.25)')}
              >
                EXPLORE THE SCENT
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .featured-grid {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
          }
        }
      `}</style>
    </section>
  );
}
