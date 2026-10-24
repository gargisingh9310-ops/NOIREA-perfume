import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import PerfumeUnboxing from './components/PerfumeUnboxing';
import BrandEditorial from './components/BrandEditorial';
import PerfumeScroller from './components/PerfumeScroller';
import QuickViewModal from './components/QuickViewModal';
import MobileHeader from './components/MobileHeader';
import { Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [activeQuickView, setActiveQuickView] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Initialize Lenis Smooth Scrolling and synchronize with GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
    });

    // Sync Lenis scroll with ScrollTrigger updates
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger when page layout finishes initial render
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddToCart = (perfume, size = 100, qty = 1) => {
    showToast(`Added NOIRÉA ${perfume.shortName} (${size}ml) to your reservation.`);
  };

  const handleScrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="noirea-app"
      style={{
        minHeight: '100vh',
        backgroundColor: '#000000',
        color: '#FFFFFF',
        position: 'relative',
      }}
    >
      {/* Subtle Noise Texture Grain Overlay */}
      <div className="grain-overlay" />

      {/* 
        Subtle Luxury Mobile Header & Navigation Drawer 
        (Strictly hidden on desktop >= 1024px to preserve 100% of desktop appearance) 
      */}
      <MobileHeader onNavigate={handleScrollToSection} />

      {/* Main Experience: STRICTLY ONLY THREE SECTIONS */}
      <main>
        {/* SECTION 1 — Cinematic Perfume Unboxing Hero (Canvas Frame Scrubbing) */}
        <PerfumeUnboxing
          onExplore={() => handleScrollToSection('brand-editorial')}
        />

        {/* SECTION 2 — Brand Story and Fragrance Editorial (ShapeGrid & PerfumeSprayAnimation) */}
        <BrandEditorial
          onDiscoverCollection={() => handleScrollToSection('collection-scroller')}
        />

        {/* SECTION 3 — Pinned Four-Perfume Showcase */}
        <PerfumeScroller
          onQuickView={(perfume) => setActiveQuickView(perfume)}
          onAddToCart={handleAddToCart}
        />
      </main>

      {/* Interactive Detail Modal (When user discovers a specific flacon) */}
      <QuickViewModal
        perfume={activeQuickView}
        isOpen={!!activeQuickView}
        onClose={() => setActiveQuickView(null)}
        onAddToCart={(perfume, size, qty) => {
          handleAddToCart(perfume, size, qty);
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          className="noirea-toast"
          style={{
            position: 'fixed',
            bottom: '2.5rem',
            right: '2.5rem',
            backgroundColor: '#141414',
            color: '#FFFFFF',
            padding: '1rem 1.6rem',
            borderRadius: '0px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(44, 52, 128, 0.3)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            gap: '0.8rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            letterSpacing: '0.14em',
            animation: 'fadeIn 0.3s ease',
            border: '1px solid rgba(44, 52, 128, 0.4)',
          }}
        >
          <Sparkles size={16} color="var(--accent-icy-blue)" />
          <span>{toastMessage}</span>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .noirea-toast {
            bottom: calc(1.2rem + env(safe-area-inset-bottom, 0px)) !important;
            right: 1rem !important;
            left: 1rem !important;
            padding: 0.85rem 1.2rem !important;
            font-size: 0.72rem !important;
            justify-content: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </div>
  );
}
