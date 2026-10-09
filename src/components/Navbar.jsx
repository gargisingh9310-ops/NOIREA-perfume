import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';

export default function Navbar({
  cartCount = 0,
  onOpenCart,
  onOpenSearch
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'COLLECTION', href: '#collection-scroller' },
    { name: 'DISCOVER', href: '#finder' },
    { name: 'JOURNAL', href: '#journal' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: 'var(--header-height)',
          zIndex: 100,
          transition: 'all 0.5s var(--ease-luxury)',
          backgroundColor: isScrolled ? 'rgba(241, 236, 227, 0.94)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        }}
      >
        <div
          className="site-container"
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Left: Brand Wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.9rem',
              letterSpacing: '0.14em',
              fontWeight: 400,
              color: 'var(--text-primary)',
              textDecoration: 'none',
              lineHeight: 1,
            }}
          >
            NOIRÉA
          </a>

          {/* Center: Desktop Navigation */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '3rem',
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.22em',
                  color: 'var(--text-primary)',
                  position: 'relative',
                  padding: '0.4rem 0',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-gold)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right: Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }}>
            {/* SEARCH */}
            <button
              onClick={onOpenSearch}
              aria-label="Search Fragrances"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.18em',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            >
              <Search size={16} strokeWidth={1.5} />
              <span className="desktop-only">SEARCH</span>
            </button>

            {/* ACCOUNT */}
            <button
              aria-label="Account"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.18em',
              }}
              className="desktop-only"
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            >
              <User size={16} strokeWidth={1.5} />
              <span>ACCOUNT</span>
            </button>

            {/* BAG */}
            <button
              onClick={onOpenCart}
              aria-label="Shopping Bag"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--text-primary)',
                padding: '0.45rem 0.9rem',
                borderRadius: '999px',
                border: '1px solid var(--border-medium)',
                backgroundColor: 'rgba(241, 236, 227, 0.6)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.15em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-gold)';
                e.currentTarget.style.color = 'var(--accent-gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-medium)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
            >
              <ShoppingBag size={15} strokeWidth={1.5} />
              <span>BAG ({cartCount})</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-only"
              style={{
                display: 'none',
                alignItems: 'center',
                padding: '0.4rem',
                color: 'var(--text-primary)',
              }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 'var(--header-height)',
            left: 0,
            width: '100%',
            height: 'calc(100vh - var(--header-height))',
            backgroundColor: 'var(--bg-cream)',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '3rem 2rem 4rem',
            animation: 'fadeIn 0.3s ease',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2rem',
                  letterSpacing: '0.08em',
                  color: 'var(--text-primary)',
                }}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '2rem' }}>
            <p className="mono-tag" style={{ color: 'var(--accent-gold)' }}>
              NOIRÉA HAUTE PARFUMERIE
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              PARIS • GRASSE • LONDON • MILANO
            </p>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-only {
            display: none !important;
          }
          .mobile-only {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
