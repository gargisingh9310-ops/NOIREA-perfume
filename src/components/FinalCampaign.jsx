import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCampaign({ onShopCollection }) {
  const sectionRef = useRef(null);
  const bgImageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic slow zoom & parallax on the hero campaign image
      gsap.fromTo(bgImageRef.current,
        { scale: 1.0, y: 0 },
        {
          scale: 1.12,
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
          }
        }
      );

      // Smooth text reveal
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="campaign"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-dark)',
      }}
    >
      {/* Full-Screen Background Image with Parallax */}
      <img
        ref={bgImageRef}
        src="/assets/images/editorial_banner.jpg"
        alt="NOIRÉA Final Campaign Haute Parfumerie"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      />

      {/* Atmospheric Contrast Vignette */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to top, rgba(23, 22, 20, 0.75) 0%, rgba(23, 22, 20, 0.3) 50%, rgba(23, 22, 20, 0.5) 100%)',
          zIndex: 2,
        }}
      />

      {/* Center Campaign Typography & CTA */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '900px',
          padding: '0 2rem',
          color: 'var(--text-light)',
        }}
      >
        <span
          className="mono-tag"
          style={{
            color: 'var(--accent-champagne)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            marginBottom: '1.2rem',
          }}
        >
          <Sparkles size={13} />
          NOIRÉA SIGNATURE
        </span>

        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.8rem, 7vw, 5.8rem)',
            letterSpacing: '0.04em',
            lineHeight: 1.02,
            textTransform: 'uppercase',
            margin: '0 0 2rem',
            color: '#FAF6F0',
            textShadow: '0 10px 40px rgba(0, 0, 0, 0.6)',
          }}
        >
          MORE THAN A FRAGRANCE.<br />A SIGNATURE.
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-editorial)',
            fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
            fontStyle: 'italic',
            color: 'var(--accent-champagne)',
            marginBottom: '2.5rem',
          }}
        >
          "Crafted for those who leave an indelible impression."
        </p>

        <button
          onClick={onShopCollection}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.9rem',
            padding: '1.2rem 3rem',
            backgroundColor: 'var(--accent-gold)',
            color: 'var(--bg-dark)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            fontWeight: 600,
            border: 'none',
            borderRadius: '2px',
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.35)',
            transition: 'all 0.35s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#B29A78';
            e.currentTarget.style.transform = 'translateY(-3px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent-gold)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <span>SHOP THE COLLECTION</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </section>
  );
}
