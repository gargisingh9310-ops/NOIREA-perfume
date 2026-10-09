import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero({ onExplore, onDiscover }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: 'var(--bg-cream)',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'var(--header-height)',
        overflow: 'hidden',
      }}
    >
      {/* Background Architectural Ambient Light & Glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '15%',
          width: '55vw',
          height: '55vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(209, 148, 72, 0.08) 0%, rgba(250, 248, 245, 0) 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div
        className="hero-grid site-container"
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 1.1fr) minmax(340px, 0.9fr)',
          alignItems: 'center',
          gap: '4rem',
          width: '100%',
          paddingTop: '2rem',
          paddingBottom: '4rem',
        }}
      >
        {/* Left Column: Brand Typography & Manifesto */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
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
              HAUTE PARFUMERIE • EDITION 2026
            </span>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(3.8rem, 8.5vw, 7.8rem)',
                fontWeight: 400,
                lineHeight: 0.92,
                letterSpacing: '0.04em',
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              NOIRÉA
            </h1>

            <p
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)',
                fontStyle: 'italic',
                color: 'var(--accent-gold)',
                letterSpacing: '0.02em',
                lineHeight: 1.2,
                marginTop: '0.8rem',
              }}
            >
              SCENT, REFINED.
            </p>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: 'var(--text-muted)',
              maxWidth: '480px',
            }}
          >
            "Fragrance crafted for those who leave an impression. Formulated with rare hand-harvested botanicals and aged resinous essences in limited atelier batches."
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.4rem', flexWrap: 'wrap', paddingTop: '0.5rem' }}>
            <a
              href="#collection"
              className="btn-noirea-primary"
              onClick={onExplore}
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowRight size={14} />
            </a>

            <a
              href="#finder"
              className="btn-noirea-outline"
              onClick={onDiscover}
            >
              <span>DISCOVER THE SCENT</span>
            </a>
          </div>

          {/* Bottom Telemetry Meta */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '1.8rem',
              marginTop: '1rem',
            }}
          >
            <div>
              <span className="mono-tag" style={{ display: 'block' }}>EXTRAIT CONCENTRATION</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 500 }}>20% – 28% PURE ESSENCE</span>
            </div>
            <div>
              <span className="mono-tag" style={{ display: 'block' }}>ORIGIN</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 500 }}>GRASSE & PLACE VENDÔME</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Perfume Bottle (Slightly Off-Center Focus) */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 0',
          }}
        >
          {/* Subtle Background Glow Circle */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '85%',
              height: '85%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(220, 213, 202, 0.45) 0%, rgba(250, 248, 245, 0) 70%)',
              filter: 'blur(30px)',
              zIndex: 1,
            }}
          />

          {/* Perfume Bottle Composition with Parallax Tilt */}
          <div
            style={{
              position: 'relative',
              zIndex: 5,
              width: '100%',
              maxWidth: '480px',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 30px 70px rgba(26, 25, 24, 0.12)',
              transform: `perspective(1000px) rotateY(${mousePos.x * 0.4}deg) rotateX(${-mousePos.y * 0.4}deg)`,
              transition: 'transform 0.2s ease-out',
            }}
          >
            <img
              src="/assets/images/sombre.jpg"
              alt="NOIRÉA SOMBRE Eau de Parfum"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'cover',
              }}
            />

            {/* Floating Bottle Badge */}
            <div
              style={{
                position: 'absolute',
                bottom: '1.8rem',
                left: '1.8rem',
                backgroundColor: 'rgba(250, 248, 245, 0.92)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                padding: '0.8rem 1.4rem',
                borderRadius: '4px',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <span className="mono-tag" style={{ color: 'var(--accent-gold)' }}>FEATURED SIGNATURE</span>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', margin: '0.1rem 0 0', fontWeight: 500 }}>
                NOIRÉA SOMBRE
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: left;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
