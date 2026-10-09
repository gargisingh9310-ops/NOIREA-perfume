import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles, Eye, Plus } from 'lucide-react';
import { PERFUMES } from '../data/perfumes';

export default function SearchOverlay({
  isOpen,
  onClose,
  onQuickView,
  onAddToCart
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const popularTags = [
    'WOODY / LEATHER',
    'CALABRIAN BERGAMOT',
    'DAMASK ROSE',
    'ORIENTAL / WARM',
    'BOURBON VANILLA',
    'SAFFRON',
    'VETIVER'
  ];

  const filteredPerfumes = PERFUMES.filter((perfume) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    const matchName = perfume.name.toLowerCase().includes(q);
    const matchFamily = perfume.family.toLowerCase().includes(q);
    const matchTagline = perfume.tagline.toLowerCase().includes(q);
    const matchDesc = perfume.description.toLowerCase().includes(q);
    const matchNotes = perfume.notes.some((n) => n.toLowerCase().includes(q));
    return matchName || matchFamily || matchTagline || matchDesc || matchNotes;
  });

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1200,
        backgroundColor: 'rgba(250, 248, 245, 0.98)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        animation: 'fadeIn 0.3s ease',
      }}
    >
      <div className="site-container" style={{ padding: '3rem 4rem 6rem', width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Top Bar / Close */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5rem' }}>
          <span className="mono-tag" style={{ color: 'var(--accent-gold)' }}>
            NOIRÉA FRAGRANCE SEARCH & DISCOVERY
          </span>

          <button
            onClick={onClose}
            aria-label="Close search"
            style={{
              padding: '0.8rem',
              backgroundColor: 'var(--bg-sand)',
              border: '1px solid var(--border-medium)',
              borderRadius: '50%',
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
              e.currentTarget.style.backgroundColor = 'var(--bg-sand)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Big Search Input */}
        <div style={{ position: 'relative', marginBottom: '2.5rem' }}>
          <Search
            size={28}
            style={{
              position: 'absolute',
              left: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--accent-gold)',
            }}
          />

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by fragrance name, note (e.g. Saffron, Leather, Rose), or family..."
            style={{
              width: '100%',
              padding: '1.2rem 1.2rem 1.2rem 3.4rem',
              fontFamily: 'var(--font-editorial)',
              fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: '2px solid var(--text-primary)',
              color: 'var(--text-primary)',
              outline: 'none',
            }}
          />

          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                position: 'absolute',
                right: '0',
                top: '50%',
                transform: 'translateY(-50%)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.15em',
                color: 'var(--text-muted)',
              }}
            >
              CLEAR
            </button>
          )}
        </div>

        {/* Suggested Quick Filter Tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
          <span className="mono-tag" style={{ color: 'var(--text-muted)', marginRight: '0.4rem' }}>
            POPULAR INQUIRIES:
          </span>
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className={`btn-noirea-pill ${query.toLowerCase() === tag.toLowerCase() ? 'active' : ''}`}
            >
              <span>{tag}</span>
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.8rem' }}>
            <span className="mono-tag">
              {filteredPerfumes.length} {filteredPerfumes.length === 1 ? 'FRAGRANCE' : 'FRAGRANCES'} FOUND
            </span>
            {query && (
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Showing results matching "{query}"
              </span>
            )}
          </div>

          {filteredPerfumes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 1rem', color: 'var(--text-muted)' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '0.8rem' }}>
                No fragrance matches found.
              </p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.95rem', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
                Try searching for specific notes like Bergamot, Saffron, Leather, Sandalwood, or Amber.
              </p>
              <button onClick={() => setQuery('')} className="btn-noirea-outline">
                <span>VIEW ALL FRAGRANCES</span>
              </button>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: '2rem',
              }}
            >
              {filteredPerfumes.map((perfume) => (
                <div
                  key={perfume.id}
                  style={{
                    backgroundColor: 'var(--bg-cream)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '4px',
                    padding: '1.4rem',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      paddingTop: '110%',
                      position: 'relative',
                      borderRadius: '3px',
                      overflow: 'hidden',
                      backgroundColor: '#F0ECE5',
                      marginBottom: '1rem',
                    }}
                  >
                    <img
                      src={perfume.image}
                      alt={perfume.name}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>

                  <span className="mono-tag" style={{ color: 'var(--accent-gold)', fontSize: '0.66rem' }}>
                    NO. {perfume.number} • {perfume.family}
                  </span>

                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginTop: '0.2rem' }}>
                    {perfume.name}
                  </h3>

                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.4rem 0 1rem' }}>
                    {perfume.notes.slice(0, 3).join(' • ')}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.8rem', borderTop: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '0.95rem' }}>
                      ${perfume.price}
                    </span>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => {
                          onClose();
                          onQuickView(perfume);
                        }}
                        style={{
                          padding: '0.5rem 0.8rem',
                          backgroundColor: 'var(--bg-sand)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '2px',
                          fontSize: '0.68rem',
                          fontFamily: 'var(--font-mono)',
                          letterSpacing: '0.1em',
                        }}
                      >
                        DETAILS
                      </button>

                      <button
                        onClick={() => {
                          onAddToCart(perfume, 100);
                        }}
                        style={{
                          padding: '0.5rem 0.8rem',
                          backgroundColor: 'var(--text-primary)',
                          color: 'var(--bg-cream)',
                          borderRadius: '2px',
                          fontSize: '0.68rem',
                          fontFamily: 'var(--font-mono)',
                          letterSpacing: '0.1em',
                        }}
                      >
                        + BAG
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
