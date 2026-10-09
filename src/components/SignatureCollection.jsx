import React from 'react';
import { PERFUMES } from '../data/perfumes';
import ProductCard from './ProductCard';
import { Sparkles } from 'lucide-react';

export default function SignatureCollection({ onQuickView, onAddToCart }) {
  return (
    <section
      id="collection"
      style={{
        padding: '9rem 0',
        backgroundColor: 'var(--bg-cream)',
        position: 'relative',
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
              HAUTE PARFUMERIE COLLECTION
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
              THE SIGNATURE COLLECTION
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
            Four singular olfactory compositions crafted from exceptional rare harvests and aged resins. Each flacon is hand-finished in our atelier.
          </p>
        </div>

        {/* 4-Product Responsive Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {PERFUMES.map((perfume) => (
            <ProductCard
              key={perfume.id}
              perfume={perfume}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        {/* Discovery Discovery Set Callout Banner */}
        <div
          style={{
            marginTop: '5rem',
            padding: '2.5rem 3.5rem',
            backgroundColor: 'var(--bg-sand)',
            borderRadius: '6px',
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                backgroundColor: 'rgba(169, 141, 96, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-gold)',
              }}
            >
              <Sparkles size={24} />
            </div>
            <div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', margin: 0 }}>
                THE NOIRÉA DISCOVERY ATELIER SET
              </h4>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0.2rem 0 0' }}>
                Experience all 4 signature creations in 10ml travel flacons ($85, redeemable against any 100ml flacon).
              </p>
            </div>
          </div>

          <button
            onClick={() => onAddToCart(PERFUMES[0], 10, true)}
            className="btn-noirea-outline"
          >
            <span>ORDER DISCOVERY SET — $85</span>
          </button>
        </div>
      </div>
    </section>
  );
}
