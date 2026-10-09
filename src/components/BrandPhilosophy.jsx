import React from 'react';

export default function BrandPhilosophy() {
  return (
    <section
      style={{
        padding: '11rem 0',
        backgroundColor: 'var(--bg-sand)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="site-container" style={{ maxWidth: '1100px' }}>
        <span
          className="mono-tag"
          style={{
            color: 'var(--accent-gold)',
            display: 'block',
            marginBottom: '2rem',
          }}
        >
          NOIRÉA MANIFESTO
        </span>

        <h2 className="giant-quote" style={{ color: 'var(--text-primary)', margin: 0 }}>
          “WE BELIEVE A FRAGRANCE<br />
          SHOULD BE REMEMBERED<br />
          BEFORE IT IS SEEN.”
        </h2>

        <div
          style={{
            width: '60px',
            height: '1px',
            backgroundColor: 'var(--accent-gold)',
            margin: '3rem auto 2rem',
          }}
        />

        <p
          style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: '1.35rem',
            fontStyle: 'italic',
            color: 'var(--text-muted)',
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: 1.5,
          }}
        >
          Distilled in limited editions for the discerning collector.
        </p>
      </div>
    </section>
  );
}
