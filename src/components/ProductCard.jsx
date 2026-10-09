import React, { useState } from 'react';
import { Eye, ShoppingBag, Plus } from 'lucide-react';

export default function ProductCard({ perfume, onQuickView, onAddToCart }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: isHovered ? 'var(--bg-sand)' : 'var(--bg-cream)',
        borderRadius: '6px',
        border: '1px solid var(--border-subtle)',
        padding: '1.8rem',
        transition: 'all 0.5s var(--ease-luxury)',
        boxShadow: isHovered ? '0 20px 45px rgba(26, 25, 24, 0.08)' : 'none',
        transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Header / Number */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
        <span className="mono-tag" style={{ color: 'var(--accent-gold)' }}>
          NO. {perfume.number}
        </span>
        <span className="mono-tag" style={{ color: 'var(--text-muted)' }}>
          {perfume.type}
        </span>
      </div>

      {/* Perfume Bottle Image Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '125%', // 4:5 aspect ratio
          borderRadius: '4px',
          overflow: 'hidden',
          backgroundColor: '#F0ECE5',
          marginBottom: '1.8rem',
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
            transform: isHovered ? 'scale(1.06)' : 'scale(1.0)',
            transition: 'transform 0.7s var(--ease-luxury)',
          }}
        />

        {/* Quick View Button (Reveals on Hover) */}
        <button
          onClick={() => onQuickView(perfume)}
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '50%',
            transform: `translateX(-50%) translateY(${isHovered ? '0' : '20px'})`,
            opacity: isHovered ? 1 : 0,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 1.2rem',
            backgroundColor: 'rgba(250, 248, 245, 0.95)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            borderRadius: '999px',
            border: '1px solid var(--border-medium)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
            transition: 'all 0.35s var(--ease-luxury)',
            zIndex: 10,
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--text-primary)';
            e.currentTarget.style.color = 'var(--bg-cream)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(250, 248, 245, 0.95)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
        >
          <Eye size={13} />
          <span>QUICK VIEW</span>
        </button>
      </div>

      {/* Fragrance Metadata */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.45rem',
              letterSpacing: '0.04em',
              fontWeight: 500,
              margin: 0,
              color: 'var(--text-primary)',
            }}
          >
            {perfume.shortName}
          </h3>

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '1.05rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
            }}
          >
            ${perfume.price}
          </span>
        </div>

        <p
          style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: '1.05rem',
            fontStyle: 'italic',
            color: 'var(--accent-gold)',
            lineHeight: 1.3,
          }}
        >
          {perfume.tagline}
        </p>

        {/* Scent Notes Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', margin: '0.6rem 0 1.2rem' }}>
          {perfume.notes.slice(0, 3).map((note, idx) => (
            <span
              key={idx}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.66rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '0.25rem 0.6rem',
                backgroundColor: 'rgba(169, 141, 96, 0.08)',
                color: 'var(--text-muted)',
                borderRadius: '3px',
                border: '1px solid rgba(169, 141, 96, 0.15)',
              }}
            >
              {note}
            </span>
          ))}
        </div>

        {/* Add to Bag Button */}
        <button
          onClick={() => onAddToCart(perfume, 100)}
          className="btn-noirea-primary"
          style={{
            width: '100%',
            padding: '0.9rem 1.4rem',
            marginTop: 'auto',
          }}
        >
          <Plus size={14} />
          <span>ADD TO BAG — ${perfume.price}</span>
        </button>
      </div>
    </div>
  );
}
