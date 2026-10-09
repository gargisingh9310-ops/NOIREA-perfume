import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function EditorialBanner({ onShopSignature }) {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Full-Width Cinematic Background Image */}
      <img
        src="/assets/images/editorial_banner.jpg"
        alt="NOIRÉA Architectural Perfume Still Life"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      />

      {/* Atmospheric Contrast Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to top, rgba(18, 17, 16, 0.7) 0%, rgba(18, 17, 16, 0.25) 50%, rgba(18, 17, 16, 0.4) 100%)',
          zIndex: 2,
        }}
      />

      {/* Floating Center Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '850px',
          padding: '0 2rem',
          color: 'var(--text-light)',
        }}
      >
        <span
          className="mono-tag"
          style={{
            color: 'var(--accent-champagne)',
            display: 'block',
            marginBottom: '1rem',
          }}
        >
          THE NOIRÉA PROMISE
        </span>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)',
            letterSpacing: '0.04em',
            lineHeight: 1.05,
            textTransform: 'uppercase',
            margin: '0 0 2rem',
            color: '#FAF6F0',
            textShadow: '0 10px 40px rgba(0,0,0,0.5)',
          }}
        >
          MORE THAN A FRAGRANCE.<br />A SIGNATURE.
        </h2>

        <button
          onClick={onShopSignature}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.8rem',
            padding: '1.15rem 2.8rem',
            backgroundColor: 'var(--accent-gold)',
            color: 'var(--bg-dark)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontWeight: 600,
            border: 'none',
            borderRadius: '2px',
            boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
            transition: 'all 0.35s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#C2A675';
            e.currentTarget.style.transform = 'translateY(-3px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent-gold)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span>SHOP SIGNATURE</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </section>
  );
}
