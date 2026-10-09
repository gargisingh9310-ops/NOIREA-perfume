import React, { useState, useMemo } from 'react';
import { PERFUMES } from '../data/perfumes';
import { Sparkles, Check, ArrowRight, Eye, Plus } from 'lucide-react';

export default function FragranceSelector({ onAddToCart, onQuickView }) {
  const [selectedMood, setSelectedMood] = useState('Mysterious');
  const [selectedIntensity, setSelectedIntensity] = useState('Intense');
  const [selectedOccasion, setSelectedOccasion] = useState('Statement');

  const moods = ['Fresh', 'Warm', 'Mysterious', 'Bold'];
  const intensities = ['Soft', 'Balanced', 'Intense'];
  const occasions = ['Day', 'Evening', 'Statement'];

  // Calculate matched perfume based on selected parameters
  const matchedPerfume = useMemo(() => {
    let bestMatch = PERFUMES[0];
    let highestScore = -1;

    PERFUMES.forEach((p) => {
      let score = 0;
      if (p.filterCriteria.mood.includes(selectedMood)) score += 3;
      if (p.filterCriteria.intensity.includes(selectedIntensity)) score += 2;
      if (p.filterCriteria.style.includes(selectedOccasion)) score += 2;

      if (score > highestScore) {
        highestScore = score;
        bestMatch = p;
      }
    });

    return bestMatch;
  }, [selectedMood, selectedIntensity, selectedOccasion]);

  return (
    <section
      id="finder"
      style={{
        padding: '10rem 0',
        backgroundColor: 'var(--bg-sand)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="site-container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 4.5rem' }}>
          <span
            className="mono-tag"
            style={{
              color: 'var(--accent-gold)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Sparkles size={13} />
            OLFACTORY CONSULTATION
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 5vw, 4.2rem)',
              letterSpacing: '0.04em',
              lineHeight: 1.05,
              color: 'var(--text-primary)',
              margin: '0.5rem 0 1rem',
            }}
          >
            FIND YOUR SIGNATURE SCENT
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1.02rem',
              color: 'var(--text-muted)',
              lineHeight: 1.65,
            }}
          >
            Select your desired mood, intensity, and wearing occasion to reveal your bespoke NOIRÉA fragrance recommendation.
          </p>
        </div>

        {/* Main Selector Container */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 1.15fr) minmax(320px, 0.85fr)',
            gap: '4rem',
            backgroundColor: 'var(--bg-cream)',
            borderRadius: '12px',
            border: '1px solid var(--border-subtle)',
            padding: '3.5rem',
            alignItems: 'center',
            boxShadow: '0 25px 60px rgba(36, 34, 31, 0.08)',
          }}
          className="finder-card"
        >
          {/* Left: Filter Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.4rem' }}>
            {/* 1. Mood Filter */}
            <div>
              <span className="mono-tag" style={{ display: 'block', marginBottom: '0.8rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                01 • MOOD
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {moods.map((m) => {
                  const active = m === selectedMood;
                  return (
                    <button
                      key={m}
                      onClick={() => setSelectedMood(m)}
                      className={`btn-noirea-pill ${active ? 'active' : ''}`}
                    >
                      {active && <Check size={12} />}
                      <span>{m}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Intensity Filter */}
            <div>
              <span className="mono-tag" style={{ display: 'block', marginBottom: '0.8rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                02 • INTENSITY
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {intensities.map((i) => {
                  const active = i === selectedIntensity;
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedIntensity(i)}
                      className={`btn-noirea-pill ${active ? 'active' : ''}`}
                    >
                      {active && <Check size={12} />}
                      <span>{i}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Occasion Filter */}
            <div>
              <span className="mono-tag" style={{ display: 'block', marginBottom: '0.8rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                03 • OCCASION
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {occasions.map((o) => {
                  const active = o === selectedOccasion;
                  return (
                    <button
                      key={o}
                      onClick={() => setSelectedOccasion(o)}
                      className={`btn-noirea-pill ${active ? 'active' : ''}`}
                    >
                      {active && <Check size={12} />}
                      <span>{o}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Live Match Reveal Card */}
          <div
            style={{
              backgroundColor: 'var(--bg-sand)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              boxShadow: '0 15px 35px rgba(36,34,31,0.06)',
            }}
          >
            <span className="mono-tag" style={{ color: 'var(--accent-gold)' }}>
              RECOMMENDED SIGNATURE
            </span>

            {/* Match Image */}
            <div
              style={{
                width: '190px',
                height: '240px',
                borderRadius: '8px',
                overflow: 'hidden',
                margin: '1.2rem auto',
                backgroundColor: '#DFD7C9',
                boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
              }}
            >
              <img
                src={matchedPerfume.image}
                alt={matchedPerfume.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.85rem',
                letterSpacing: '0.04em',
                margin: '0.2rem 0',
                color: 'var(--text-primary)',
              }}
            >
              {matchedPerfume.name}
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-editorial)',
                fontSize: '1.15rem',
                fontStyle: 'italic',
                color: 'var(--accent-gold)',
                marginBottom: '0.8rem',
              }}
            >
              "{matchedPerfume.tagline}"
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.4rem', marginBottom: '1.5rem' }}>
              {matchedPerfume.notes.map((n, i) => (
                <span key={i} className="mono-tag" style={{ fontSize: '0.62rem', padding: '0.2rem 0.5rem', background: 'rgba(155,128,96,0.1)' }}>
                  {n}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', width: '100%' }}>
              <button
                onClick={() => onAddToCart(matchedPerfume, 100)}
                className="btn-noirea-primary"
                style={{ flex: 1, padding: '0.85rem 1rem' }}
              >
                <span>ADD TO BAG — ${matchedPerfume.price}</span>
              </button>

              <button
                onClick={() => onQuickView(matchedPerfume)}
                className="btn-noirea-outline"
                style={{ padding: '0.85rem 1rem' }}
              >
                <Eye size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .finder-card {
            grid-template-columns: 1fr !important;
            padding: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
