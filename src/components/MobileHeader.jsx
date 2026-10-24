import React, { useState, useEffect, useCallback } from 'react';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';

export default function MobileHeader({ onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  const handleLinkClick = useCallback((e, sectionId) => {
    e.preventDefault();
    setIsOpen(false);
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [onNavigate]);

  const navLinks = [
    { number: '01', title: 'ATELIER UNBOXING', sectionId: 'hero-experience', subtitle: 'Interactive flacon reveal' },
    { number: '02', title: 'BRAND EDITORIAL', sectionId: 'brand-editorial', subtitle: 'The world of NOIRÉA & spray' },
    { number: '03', title: 'LA COLLECTION', sectionId: 'collection-scroller', subtitle: 'Four signature extraits' },
  ];

  return (
    <>
      {/* 
        Sticky Mobile & Tablet Bar 
        Strictly hidden at >= 1024px to preserve 100% of the desktop layout
      */}
      <header className="noirea-mobile-header" aria-label="Mobile Navigation">
        <div className="mobile-header-inner">
          {/* Brand Wordmark */}
          <a
            href="#hero-experience"
            onClick={(e) => handleLinkClick(e, 'hero-experience')}
            className="mobile-header-logo"
            aria-label="NOIRÉA Home"
          >
            NOIRÉA
          </a>

          {/* Subtitle tag visible on tablets / wider phones */}
          <span className="mobile-header-edition">
            HAUTE PARFUMERIE
          </span>

          {/* Hamburger Toggle Button (44x44px minimum touch target) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mobile-menu-toggle"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            type="button"
          >
            {isOpen ? <X size={22} color="#FFFFFF" /> : <Menu size={22} color="#FFFFFF" />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer */}
      {isOpen && (
        <div
          className="mobile-drawer-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation Menu"
        >
          {/* Top Bar with Brand & Close */}
          <div className="mobile-drawer-top">
            <span className="mobile-drawer-brand">
              <Sparkles size={12} color="var(--accent-icy-blue)" />
              NOIRÉA &bull; ATELIER DE PARFUM
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="mobile-drawer-close"
              aria-label="Close menu"
              type="button"
            >
              <X size={22} color="#FFFFFF" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mobile-drawer-nav">
            {navLinks.map((link) => (
              <a
                key={link.sectionId}
                href={`#${link.sectionId}`}
                onClick={(e) => handleLinkClick(e, link.sectionId)}
                className="mobile-drawer-link"
              >
                <div className="mobile-link-header">
                  <span className="mobile-link-num">{link.number}</span>
                  <span className="mobile-link-title">{link.title}</span>
                </div>
                <span className="mobile-link-subtitle">{link.subtitle}</span>
              </a>
            ))}
          </nav>

          {/* Bottom Call to Action and Maison Details */}
          <div className="mobile-drawer-footer">
            <button
              onClick={(e) => handleLinkClick(e, 'collection-scroller')}
              className="btn-noirea-primary mobile-drawer-cta"
              type="button"
            >
              <span>DISCOVER THE 4 FLACONS</span>
              <ArrowRight size={14} />
            </button>

            <div className="mobile-drawer-colophon">
              <span className="mono-tag" style={{ fontSize: '0.62rem', letterSpacing: '0.24em' }}>
                EDITION 2026 &bull; GRASSE &bull; PARIS
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Component Styles: Scoped entirely to mobile/tablet (< 1024px) */}
      <style>{`
        /* STRICT DESKTOP PRESERVATION: Hidden on screens 1024px and wider */
        @media (min-width: 1024px) {
          .noirea-mobile-header,
          .mobile-drawer-overlay {
            display: none !important;
          }
        }

        /* Mobile & Tablet Styles (< 1024px) */
        @media (max-width: 1023px) {
          .noirea-mobile-header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 58px;
            z-index: 850;
            background: rgba(8, 8, 8, 0.82);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
            transition: background 0.3s ease, border-color 0.3s ease;
          }

          .mobile-header-inner {
            width: 100%;
            height: 100%;
            padding: 0 1.25rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .mobile-header-logo {
            font-family: var(--font-serif);
            font-size: 1.35rem;
            letter-spacing: 0.16em;
            color: #FFFFFF;
            text-decoration: none;
            line-height: 1;
            font-weight: 400;
          }

          .mobile-header-edition {
            font-family: var(--font-mono);
            font-size: 0.62rem;
            letter-spacing: 0.22em;
            color: var(--accent-icy-blue);
            opacity: 0.85;
          }

          @media (max-width: 480px) {
            .mobile-header-edition {
              display: none;
            }
          }

          .mobile-menu-toggle {
            min-width: 44px;
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 0px;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .mobile-menu-toggle:active {
            background: rgba(168, 216, 240, 0.15);
            border-color: var(--accent-icy-blue);
          }

          /* Fullscreen Drawer */
          .mobile-drawer-overlay {
            position: fixed;
            inset: 0;
            z-index: 1050;
            background: rgba(6, 6, 6, 0.96);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 1.5rem 1.5rem 2rem;
            animation: mobileFadeIn 0.25s ease-out;
            overflow-y: auto;
          }

          .mobile-drawer-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-bottom: 1.25rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }

          .mobile-drawer-brand {
            font-family: var(--font-mono);
            font-size: 0.68rem;
            letter-spacing: 0.2em;
            color: var(--accent-icy-blue);
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .mobile-drawer-close {
            min-width: 44px;
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 50%;
            cursor: pointer;
          }

          .mobile-drawer-nav {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
            margin: 2rem 0;
          }

          .mobile-drawer-link {
            display: flex;
            flex-direction: column;
            gap: 0.35rem;
            padding: 1rem 1.2rem;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.07);
            border-radius: 2px;
            text-decoration: none;
            transition: all 0.25s ease;
          }

          .mobile-drawer-link:active {
            background: rgba(168, 216, 240, 0.08);
            border-color: var(--accent-icy-blue);
          }

          .mobile-link-header {
            display: flex;
            align-items: center;
            gap: 0.85rem;
          }

          .mobile-link-num {
            font-family: var(--font-mono);
            font-size: 0.75rem;
            color: var(--accent-icy-blue);
            font-weight: 500;
          }

          .mobile-link-title {
            font-family: var(--font-serif);
            font-size: 1.35rem;
            letter-spacing: 0.08em;
            color: #FFFFFF;
            line-height: 1.1;
          }

          .mobile-link-subtitle {
            font-family: var(--font-sans);
            font-size: 0.76rem;
            color: var(--text-secondary);
            padding-left: 1.8rem;
          }

          .mobile-drawer-footer {
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
            padding-top: 1.5rem;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
          }

          .mobile-drawer-cta {
            width: 100%;
            padding: 0.95rem 1.5rem;
            font-size: 0.72rem;
            min-height: 44px;
          }

          .mobile-drawer-colophon {
            text-align: center;
            color: var(--text-muted);
          }

          @keyframes mobileFadeIn {
            from {
              opacity: 0;
              transform: translateY(-8px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }
      `}</style>
    </>
  );
}
