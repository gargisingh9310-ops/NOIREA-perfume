import React, { useState } from 'react';
import { Check } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <section
      style={{
        padding: '9rem 0',
        backgroundColor: 'var(--bg-cream)',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      <div className="site-container" style={{ maxWidth: '720px' }}>
        <span className="mono-tag" style={{ color: 'var(--accent-gold)', display: 'block', marginBottom: '1rem' }}>
          ATELIER DISPATCHES
        </span>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
            letterSpacing: '0.04em',
            margin: '0 0 1rem',
          }}
        >
          ENTER THE WORLD OF NOIRÉA
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1.02rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
          }}
        >
          Discover new fragrances, raw material harvest journals, and invitations to private atelier releases.
        </p>

        {!subscribed ? (
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              maxWidth: '520px',
              margin: '0 auto',
              backgroundColor: 'var(--bg-sand)',
              borderRadius: '3px',
              border: '1px solid var(--border-medium)',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(26,25,24,0.04)',
            }}
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                padding: '1.1rem 1.4rem',
                border: 'none',
                background: 'transparent',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                color: 'var(--text-primary)',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              className="btn-noirea-primary"
              style={{
                borderRadius: 0,
                border: 'none',
                padding: '1.1rem 2.2rem',
              }}
            >
              <span>JOIN</span>
            </button>
          </form>
        ) : (
          <div
            style={{
              padding: '1.4rem 2rem',
              backgroundColor: 'rgba(169, 141, 96, 0.12)',
              borderRadius: '4px',
              border: '1px solid var(--accent-gold)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.8rem',
              color: 'var(--text-primary)',
            }}
          >
            <Check size={18} color="var(--accent-gold)" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', letterSpacing: '0.14em' }}>
              WELCOME TO THE NOIRÉA ATELIER. CHECK YOUR INBOX.
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
