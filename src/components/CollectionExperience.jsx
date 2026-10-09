import React, { useRef } from 'react';
import { PERFUMES } from '../data/perfumes';
import { ArrowLeft, ArrowRight, Eye, Plus } from 'lucide-react';

export default function CollectionExperience({ onQuickView, onAddToCart }) {
  const scrollContainerRef = useRef(null);

  const handleScroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = direction === 'left' ? -420 : 420;
    scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section
      style={{
        padding: '9rem 0',
        backgroundColor: 'var(--bg-cream)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="site-container">
        {/* Header & Arrow Controls */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '3.5rem',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
        >
          <div>
            <span className="mono-tag" style={{ color: 'var(--accent-gold)' }}>
              OLFACTORY HORIZONS
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
              COLLECTION EXPERIENCE
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '0.8rem' }}>
            <button
              onClick={() => handleScroll('left')}
              aria-label="Previous Fragrance"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                border: '1px solid var(--border-medium)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--text-primary)';
                e.currentTarget.style.color = 'var(--bg-cream)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
            >
              <ArrowLeft size={18} />
            </button>

            <button
              onClick={() => handleScroll('right')}
              aria-label="Next Fragrance"
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                border: '1px solid var(--border-medium)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-primary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--text-primary)';
                e.currentTarget.style.color = 'var(--bg-cream)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollContainerRef}
        style={{
          display: 'flex',
          gap: '2.5rem',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          paddingLeft: 'max(4rem, calc((100vw - var(--container-max)) / 2 + 4rem))',
          paddingRight: '4rem',
          paddingBottom: '2rem',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
        className="horizontal-track"
      >
        {PERFUMES.map((perfume) => (
          <div
            key={perfume.id}
            style={{
              flex: '0 0 380px',
              scrollSnapAlign: 'start',
              backgroundColor: 'var(--bg-sand)',
              borderRadius: '8px',
              border: '1px solid var(--border-subtle)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.4s var(--ease-luxury)',
            }}
          >
            {/* Top Code / Family */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
              <span className="mono-tag" style={{ color: 'var(--accent-gold)' }}>
                EDITION {perfume.number}
              </span>
              <span className="mono-tag">
                {perfume.family}
              </span>
            </div>

            {/* Perfume Image */}
            <div
              style={{
                width: '100%',
                paddingTop: '115%',
                position: 'relative',
                borderRadius: '4px',
                overflow: 'hidden',
                backgroundColor: '#F0ECE5',
                marginBottom: '1.5rem',
              }}
            >
              <img
                src={perfume.image}
                alt={perfume.name}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>

            {/* Content Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
              <h3
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.6rem',
                  letterSpacing: '0.04em',
                  margin: 0,
                }}
              >
                {perfume.name}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-editorial)',
                  fontSize: '1.1rem',
                  fontStyle: 'italic',
                  color: 'var(--accent-gold)',
                }}
              >
                {perfume.tagline}
              </p>

              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.88rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  margin: '0.4rem 0 1.2rem',
                }}
              >
                {perfume.description}
              </p>

              <div style={{ display: 'flex', gap: '0.8rem', marginTop: 'auto' }}>
                <button
                  onClick={() => onAddToCart(perfume, 100)}
                  className="btn-noirea-primary"
                  style={{ flex: 1, padding: '0.85rem 1rem' }}
                >
                  <Plus size={13} />
                  <span>ADD — ${perfume.price}</span>
                </button>

                <button
                  onClick={() => onQuickView(perfume)}
                  className="btn-noirea-outline"
                  style={{ padding: '0.85rem 1rem' }}
                >
                  <Eye size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .horizontal-track::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
