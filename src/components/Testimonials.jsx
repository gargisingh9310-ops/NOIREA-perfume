import React from 'react';
import { TESTIMONIALS } from '../data/perfumes';
import { Star } from 'lucide-react';

export default function Testimonials() {
  return (
    <section
      id="reviews"
      style={{
        padding: '9rem 0',
        backgroundColor: 'var(--bg-cream)',
        position: 'relative',
      }}
    >
      <div className="site-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <span className="mono-tag" style={{ color: 'var(--accent-gold)' }}>
            PATRON VOICES
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
              letterSpacing: '0.04em',
              margin: '0.4rem 0 0',
            }}
          >
            CRITICAL ACCLAIM
          </h2>
        </div>

        {/* 3-Column Reviews Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              style={{
                backgroundColor: 'var(--bg-sand)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '8px',
                padding: '3rem 2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '2rem',
                transition: 'all 0.35s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'var(--accent-gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-subtle)';
              }}
            >
              {/* Star Rating */}
              <div style={{ display: 'flex', gap: '0.3rem', color: 'var(--accent-gold)' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>

              {/* Quote */}
              <p
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontSize: '1.35rem',
                  fontStyle: 'italic',
                  lineHeight: 1.45,
                  color: 'var(--text-primary)',
                  margin: 0,
                }}
              >
                "{t.quote}"
              </p>

              {/* Author Info */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.2rem' }}>
                <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', margin: 0, fontWeight: 500 }}>
                  {t.author}
                </h5>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.2rem 0 0' }}>
                  {t.title} • {t.city}
                </p>
                <span className="mono-tag" style={{ color: 'var(--accent-gold)', fontSize: '0.62rem', display: 'block', marginTop: '0.4rem' }}>
                  WEARS {t.perfume}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
