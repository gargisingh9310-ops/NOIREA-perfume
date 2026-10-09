import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onCheckout,
  onOpenQuickView
}) {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const freeShippingThreshold = 250;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const remainingForFree = freeShippingThreshold - subtotal;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(18, 17, 16, 0.65)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          animation: 'fadeIn 0.3s ease',
        }}
      />

      {/* Slide-in Panel */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '520px',
          height: '100%',
          backgroundColor: 'var(--bg-cream)',
          borderLeft: '1px solid var(--border-medium)',
          boxShadow: '-20px 0 60px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1001,
          animation: 'slideLeft 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '2rem 2.4rem 1.4rem',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <ShoppingBag size={20} color="var(--accent-gold)" />
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.4rem',
                letterSpacing: '0.08em',
                fontWeight: 500,
                color: 'var(--text-primary)',
              }}
            >
              YOUR SHOPPING BAG ({items.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Shopping Bag"
            style={{
              padding: '0.5rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '50%',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.backgroundColor = 'var(--bg-sand)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-muted)';
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div
          style={{
            padding: '1rem 2.4rem',
            backgroundColor: 'var(--bg-sand)',
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.12em', color: 'var(--text-primary)' }}>
              {remainingForFree > 0
                ? `ADD $${remainingForFree.toFixed(0)} MORE FOR COMPLIMENTARY WHITE-GLOVE SHIPPING`
                : '✓ COMPLIMENTARY COURIER SHIPPING UNLOCKED'}
            </span>
          </div>
          <div
            style={{
              width: '100%',
              height: '4px',
              backgroundColor: 'rgba(26, 25, 24, 0.1)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progressPercent}%`,
                backgroundColor: 'var(--accent-gold)',
                transition: 'width 0.5s var(--ease-luxury)',
              }}
            />
          </div>
        </div>

        {/* Items List */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.8rem 2.4rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.6rem',
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                gap: '1.2rem',
                color: 'var(--text-muted)',
              }}
            >
              <div
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '50%',
                  border: '1px dashed var(--border-medium)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-gold)',
                }}
              >
                <ShoppingBag size={28} strokeWidth={1.2} />
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.4rem',
                  color: 'var(--text-primary)',
                }}
              >
                Your bag is currently empty.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.88rem',
                  maxWidth: '300px',
                  lineHeight: 1.5,
                }}
              >
                Discover our signature haute parfumerie collection and find your olfactory signature.
              </p>
              <button
                onClick={onClose}
                className="btn-noirea-primary"
                style={{ marginTop: '0.8rem', padding: '0.8rem 1.8rem' }}
              >
                <span>EXPLORE COLLECTION</span>
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize || 100}`}
                style={{
                  display: 'flex',
                  gap: '1.4rem',
                  paddingBottom: '1.6rem',
                  borderBottom: '1px solid var(--border-subtle)',
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    width: '90px',
                    height: '110px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    backgroundColor: '#F0ECE5',
                    flexShrink: 0,
                    border: '1px solid var(--border-subtle)',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Details */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <span className="mono-tag" style={{ color: 'var(--accent-gold)', fontSize: '0.66rem' }}>
                          NO. {item.number} • {item.type}
                        </span>
                        <h4
                          style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1.15rem',
                            letterSpacing: '0.04em',
                            fontWeight: 500,
                            marginTop: '0.2rem',
                          }}
                        >
                          {item.shortName || item.name}
                        </h4>
                      </div>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.95rem',
                          fontWeight: 500,
                        }}
                      >
                        ${(item.price * item.quantity).toFixed(0)}
                      </span>
                    </div>

                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        color: 'var(--text-muted)',
                        marginTop: '0.3rem',
                      }}
                    >
                      {item.selectedSize ? `${item.selectedSize}ml Flacon` : '100ml / 3.4 fl. oz.'}
                    </p>
                  </div>

                  {/* Quantity and Remove */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.8rem' }}>
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        border: '1px solid var(--border-medium)',
                        borderRadius: '3px',
                        backgroundColor: 'var(--bg-cream)',
                      }}
                    >
                      <button
                        onClick={() => onUpdateQty(item.id, item.selectedSize || 100, item.quantity - 1)}
                        style={{ padding: '0.35rem 0.6rem', display: 'flex', alignItems: 'center', color: 'var(--text-primary)' }}
                      >
                        <Minus size={12} />
                      </button>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.8rem',
                          padding: '0 0.5rem',
                          minWidth: '24px',
                          textAlign: 'center',
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQty(item.id, item.selectedSize || 100, item.quantity + 1)}
                        style={{ padding: '0.35rem 0.6rem', display: 'flex', alignItems: 'center', color: 'var(--text-primary)' }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id, item.selectedSize || 100)}
                      aria-label="Remove item"
                      style={{
                        color: 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.72rem',
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.1em',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#B94A48')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                      <Trash2 size={13} />
                      <span>REMOVE</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}

          {/* Complimentary Discovery Perks */}
          {items.length > 0 && (
            <div
              style={{
                padding: '1.2rem',
                backgroundColor: 'rgba(169, 141, 96, 0.07)',
                borderRadius: '4px',
                border: '1px dashed rgba(169, 141, 96, 0.3)',
                display: 'flex',
                gap: '0.8rem',
                alignItems: 'flex-start',
              }}
            >
              <Sparkles size={18} color="var(--accent-gold)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                  Complimentary Discovery Vials
                </p>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Every full bottle includes two curated 2ml discovery vials to test before opening the cellophane.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div
            style={{
              padding: '1.6rem 2.4rem 2.2rem',
              borderTop: '1px solid var(--border-subtle)',
              backgroundColor: 'var(--bg-sand)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span className="mono-tag" style={{ color: 'var(--text-muted)' }}>
                SUBTOTAL
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.3rem',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                }}
              >
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Taxes and duties calculated at atelier dispatch. Free luxury gift packaging included.
            </p>

            <button
              onClick={onCheckout}
              className="btn-noirea-primary"
              style={{ width: '100%', padding: '1.1rem' }}
            >
              <ShieldCheck size={16} />
              <span>PROCEED TO CHECKOUT — ${subtotal.toFixed(2)}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
