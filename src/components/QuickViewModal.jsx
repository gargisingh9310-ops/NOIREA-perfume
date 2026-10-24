import React, { useState } from 'react';
import { X, Plus, Minus, Check, Sparkles, Droplets, Clock } from 'lucide-react';

export default function QuickViewModal({ perfume, isOpen, onClose, onAddToCart }) {
  if (!isOpen || !perfume) return null;

  const [selectedSize, setSelectedSize] = useState(100);
  const [quantity, setQuantity] = useState(1);

  const currentPrice = selectedSize === 100 ? perfume.price : perfume.price50ml;

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(perfume, selectedSize, quantity);
    }
    onClose();
  };

  return (
    <div
      className="quick-view-modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(4, 4, 4, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          animation: 'fadeIn 0.3s ease',
        }}
      />

      {/* Modal Card */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '960px',
          maxHeight: '90vh',
          backgroundColor: '#0F0F0F',
          color: '#FFFFFF',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '4px',
          boxShadow: '0 40px 100px rgba(0, 0, 0, 0.95), 0 0 50px rgba(98, 164, 216, 0.15)',
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 0.9fr) 1.1fr',
          overflow: 'hidden',
          zIndex: 1101,
          animation: 'slideUpModal 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="quick-view-grid"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="quick-view-close-btn"
          style={{
            position: 'absolute',
            top: '1.2rem',
            right: '1.2rem',
            zIndex: 10,
            padding: '0.6rem',
            minWidth: '44px',
            minHeight: '44px',
            backgroundColor: 'rgba(20, 20, 20, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '50%',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.color = '#080808';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(20, 20, 20, 0.9)';
            e.currentTarget.style.color = '#FFFFFF';
          }}
        >
          <X size={18} />
        </button>

        {/* Left: Product Flacon Presentation */}
        <div
          className="quick-view-flacon-wrap"
          style={{
            position: 'relative',
            backgroundColor: '#080808',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            minHeight: '440px',
            borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <img
            src={perfume.image}
            alt={perfume.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          {/* Badge Overlay */}
          <div
            style={{
              position: 'absolute',
              top: '1.5rem',
              left: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                letterSpacing: '0.22em',
                padding: '0.35rem 0.8rem',
                backgroundColor: 'rgba(8, 8, 8, 0.85)',
                backdropFilter: 'blur(8px)',
                borderRadius: '0px',
                color: 'var(--accent-icy-blue)',
                border: '1px solid rgba(168, 216, 240, 0.3)',
              }}
            >
              NO. {perfume.number} / 04
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.64rem',
                letterSpacing: '0.16em',
                padding: '0.3rem 0.7rem',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(8px)',
                borderRadius: '0px',
                color: 'var(--accent-silver)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
              }}
            >
              {perfume.concentration}
            </span>
          </div>
        </div>

        {/* Right: Product Narrative & Ordering */}
        <div
          className="quick-view-info-col"
          style={{
            padding: '3rem 2.8rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.4rem',
          }}
        >
          {/* Header */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.4rem' }}>
              <span className="mono-tag" style={{ color: 'var(--accent-icy-blue)' }}>
                {perfume.family}
              </span>
              <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
              <span className="mono-tag" style={{ color: 'var(--text-secondary)' }}>
                {perfume.type}
              </span>
            </div>

            <h2
              className="quick-view-heading"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.2rem',
                letterSpacing: '0.04em',
                fontWeight: 400,
                color: '#FFFFFF',
                lineHeight: 1.1,
              }}
            >
              {perfume.name}
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: '1.15rem',
                fontStyle: 'italic',
                color: 'var(--accent-silver)',
                marginTop: '0.3rem',
              }}
            >
              "{perfume.tagline}"
            </p>
          </div>

          {/* Description */}
          <p
            className="quick-view-desc"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.92rem',
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
              fontWeight: 300,
            }}
          >
            {perfume.description}
          </p>

          {/* Size Selector */}
          <div>
            <span className="mono-tag" style={{ display: 'block', marginBottom: '0.6rem', color: 'var(--text-secondary)' }}>
              SELECT FLACON SIZE
            </span>
            <div className="quick-view-size-selector" style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => setSelectedSize(100)}
                className="quick-view-size-btn"
                style={{
                  flex: 1,
                  padding: '0.9rem',
                  border: `1px solid ${selectedSize === 100 ? 'var(--accent-icy-blue)' : 'rgba(255, 255, 255, 0.15)'}`,
                  backgroundColor: selectedSize === 100 ? 'rgba(168, 216, 240, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '0px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.2rem',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 500, color: '#FFFFFF' }}>
                  100ML / 3.4 FL. OZ.
                </span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Signature Flacon — ${perfume.price}
                </span>
              </button>

              <button
                onClick={() => setSelectedSize(50)}
                className="quick-view-size-btn"
                style={{
                  flex: 1,
                  padding: '0.9rem',
                  border: `1px solid ${selectedSize === 50 ? 'var(--accent-icy-blue)' : 'rgba(255, 255, 255, 0.15)'}`,
                  backgroundColor: selectedSize === 50 ? 'rgba(168, 216, 240, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '0px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.2rem',
                }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 500, color: '#FFFFFF' }}>
                  50ML / 1.7 FL. OZ.
                </span>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  Voyage Flacon — ${perfume.price50ml}
                </span>
              </button>
            </div>
          </div>

          {/* Scent Notes Preview */}
          <div
            className="quick-view-accords-box"
            style={{
              padding: '1.2rem',
              backgroundColor: '#141414',
              borderRadius: '0px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <span className="mono-tag" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--accent-icy-blue)' }}>
              OLFACTORY ACCORDS
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {perfume.notes.map((note, idx) => (
                <span
                  key={idx}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.12em',
                    padding: '0.35rem 0.75rem',
                    backgroundColor: '#080808',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: 'var(--accent-silver)',
                  }}
                >
                  {note}
                </span>
              ))}
            </div>

            <div className="quick-view-accords-footer" style={{ display: 'flex', gap: '2rem', marginTop: '1rem', paddingTop: '0.8rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={14} color="var(--accent-icy-blue)" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                  LONGEVITY: {perfume.longevity}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Droplets size={14} color="var(--accent-icy-blue)" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                  SILLAGE: {perfume.sillage}
                </span>
              </div>
            </div>
          </div>

          {/* Quantity & CTA */}
          <div className="quick-view-cta-row" style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            {/* Quantity Stepper */}
            <div
              className="quick-view-stepper"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: '#080808',
              }}
            >
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ padding: '0.8rem 1rem', display: 'flex', alignItems: 'center', color: '#FFFFFF', minHeight: '44px', minWidth: '44px', justifyContent: 'center' }}
                aria-label="Decrease quantity"
                type="button"
              >
                <Minus size={14} />
              </button>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9rem',
                  padding: '0 0.8rem',
                  minWidth: '30px',
                  textAlign: 'center',
                  color: '#FFFFFF',
                }}
              >
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{ padding: '0.8rem 1rem', display: 'flex', alignItems: 'center', color: '#FFFFFF', minHeight: '44px', minWidth: '44px', justifyContent: 'center' }}
                aria-label="Increase quantity"
                type="button"
              >
                <Plus size={14} />
              </button>
            </div>

            {/* Add to Bag Button */}
            <button
              onClick={handleAdd}
              className="btn-noirea-primary quick-view-add-btn"
              style={{ flex: 1, padding: '1rem 1.6rem' }}
              type="button"
            >
              <span>ADD TO BAG — ${(currentPrice * quantity).toFixed(0)}</span>
            </button>
          </div>

          {/* Reassurances */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.4rem' }}>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
              <Check size={14} color="var(--accent-icy-blue)" /> Hand-engraved white box & satin flacon pouch
            </p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-sans)', fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
              <Check size={14} color="var(--accent-icy-blue)" /> Two complimentary sample vials included
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUpModal {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* STRICT PRESERVATION: At >= 861px desktop, desktop grid applies */
        @media (max-width: 860px) {
          .quick-view-modal-backdrop {
            padding: 0.75rem !important;
          }

          .quick-view-grid {
            grid-template-columns: 1fr !important;
            max-height: 88vh !important;
            max-height: 88dvh !important;
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch;
          }

          .quick-view-close-btn {
            top: 0.65rem !important;
            right: 0.65rem !important;
          }

          .quick-view-flacon-wrap {
            min-height: 190px !important;
            max-height: 230px !important;
            border-right: none !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
          }

          .quick-view-info-col {
            padding: 1.4rem 1.25rem 2rem !important;
            gap: 1.1rem !important;
          }

          .quick-view-heading {
            font-size: 1.75rem !important;
          }

          .quick-view-accords-footer {
            flex-wrap: wrap !important;
            gap: 0.9rem !important;
          }

          .quick-view-cta-row {
            gap: 0.6rem !important;
          }

          .quick-view-add-btn {
            min-height: 44px !important;
            padding: 0.85rem 1.2rem !important;
            font-size: 0.72rem !important;
          }
        }

        @media (max-width: 430px) {
          .quick-view-modal-backdrop {
            padding: 0.4rem !important;
          }

          .quick-view-size-selector {
            flex-direction: column !important;
            gap: 0.5rem !important;
          }

          .quick-view-size-btn {
            padding: 0.75rem 0.8rem !important;
            min-height: 44px !important;
          }

          .quick-view-cta-row {
            flex-direction: column !important;
            width: 100% !important;
          }

          .quick-view-stepper {
            width: 100% !important;
            justify-content: center !important;
          }

          .quick-view-add-btn {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
