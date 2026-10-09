import React from 'react';
import { JOURNAL_ARTICLES } from '../data/perfumes';
import { ArrowRight } from 'lucide-react';

export default function JournalSection() {
  return (
    <section
      id="journal"
      style={{
        padding: '9rem 0',
        backgroundColor: 'var(--bg-sand)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="site-container">
        {/* Header */}
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
              THE NOIRÉA GAZETTE
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
              OLFACTORY JOURNAL
            </h2>
          </div>

          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.95rem',
              color: 'var(--text-muted)',
              maxWidth: '360px',
            }}
          >
            Reflections on perfume history, raw material distillations, and the philosophy of personal presence.
          </p>
        </div>

        {/* 3 Magazine Editorial Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
          }}
        >
          {JOURNAL_ARTICLES.map((article) => (
            <article
              key={article.id}
              style={{
                backgroundColor: 'var(--bg-cream)',
                borderRadius: '6px',
                border: '1px solid var(--border-subtle)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.4s var(--ease-luxury)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 45px rgba(26,25,24,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Article Image */}
              <div
                style={{
                  width: '100%',
                  paddingTop: '65%',
                  position: 'relative',
                  overflow: 'hidden',
                  backgroundColor: '#ECE7DF',
                }}
              >
                <img
                  src={article.image}
                  alt={article.title}
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

              {/* Article Content */}
              <div style={{ padding: '2.2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', flexGrow: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="mono-tag" style={{ color: 'var(--accent-gold)', fontSize: '0.65rem' }}>
                    {article.tag}
                  </span>
                  <span className="mono-tag" style={{ fontSize: '0.65rem' }}>
                    {article.readTime}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.45rem',
                    letterSpacing: '0.02em',
                    lineHeight: 1.2,
                    margin: 0,
                  }}
                >
                  {article.title}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-editorial)',
                    fontSize: '1.05rem',
                    fontStyle: 'italic',
                    color: 'var(--text-muted)',
                  }}
                >
                  "{article.subtitle}"
                </p>

                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.88rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                    margin: '0.4rem 0 1rem',
                  }}
                >
                  {article.excerpt}
                </p>

                <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <a
                    href="#"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem',
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--text-primary)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-gold)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                  >
                    <span>READ ESSAY</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
