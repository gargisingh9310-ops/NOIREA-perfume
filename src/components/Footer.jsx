import React from 'react';

export default function Footer() {
  const shopLinks = ['All Fragrances', 'Signature Collection', 'Discovery Sets', 'Gift Cards'];
  const discoverLinks = ['Our Story', 'Ingredients', 'Journal', 'Fragrance Guide'];
  const helpLinks = ['Contact Atelier', 'Shipping & Delivery', 'Returns & Exchanges', 'FAQ'];
  const socialLinks = ['Instagram', 'Pinterest', 'Facebook'];

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-dark)',
        color: 'var(--text-light)',
        padding: '7rem 0 4rem',
        borderTop: '1px solid rgba(250, 248, 245, 0.1)',
      }}
    >
      <div className="site-container">
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(280px, 1.4fr) repeat(4, minmax(130px, 1fr))',
            gap: '4rem',
            marginBottom: '6rem',
          }}
          className="footer-grid"
        >
          {/* Brand Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.6rem',
                letterSpacing: '0.12em',
                margin: 0,
                color: '#FAF6F0',
              }}
            >
              NOIRÉA
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: 'var(--accent-champagne)',
                margin: 0,
              }}
            >
              SCENT, REFINED.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                color: 'var(--text-taupe)',
                lineHeight: 1.65,
                marginTop: '0.8rem',
                maxWidth: '320px',
              }}
            >
              Haute parfumerie crafted with artisanal integrity in Paris and Grasse.
            </p>
          </div>

          {/* SHOP Column */}
          <div>
            <span className="mono-tag" style={{ color: 'var(--accent-champagne)', display: 'block', marginBottom: '1.4rem' }}>
              SHOP
            </span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {shopLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#collection"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.88rem',
                      color: 'var(--text-taupe)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FAF6F0')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-taupe)')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* DISCOVER Column */}
          <div>
            <span className="mono-tag" style={{ color: 'var(--accent-champagne)', display: 'block', marginBottom: '1.4rem' }}>
              DISCOVER
            </span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {discoverLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#story"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.88rem',
                      color: 'var(--text-taupe)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FAF6F0')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-taupe)')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* HELP Column */}
          <div>
            <span className="mono-tag" style={{ color: 'var(--accent-champagne)', display: 'block', marginBottom: '1.4rem' }}>
              HELP
            </span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {helpLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.88rem',
                      color: 'var(--text-taupe)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FAF6F0')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-taupe)')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* SOCIAL Column */}
          <div>
            <span className="mono-tag" style={{ color: 'var(--accent-champagne)', display: 'block', marginBottom: '1.4rem' }}>
              SOCIAL
            </span>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {socialLinks.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '0.88rem',
                      color: 'var(--text-taupe)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FAF6F0')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-taupe)')}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(250, 248, 245, 0.08)',
            paddingTop: '2.5rem',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.15em', color: 'var(--text-taupe)' }}>
            PARIS • PLACE VENDÔME • 75001
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.15em', color: 'var(--text-taupe)' }}>
            © 2026 NOIRÉA. ALL RIGHTS RESERVED.
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 3rem !important;
          }
        }
        @media (max-width: 580px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
