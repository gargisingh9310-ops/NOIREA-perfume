import React, { forwardRef } from 'react';

const PerfumeCap = forwardRef(({ style }, ref) => {
  return (
    <div
      ref={ref}
      className="cap-3d-lift"
      style={{
        position: 'absolute',
        top: '6px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '120px',
        height: '80px',
        zIndex: 40,
        pointerEvents: 'none',
        transformOrigin: 'bottom center',
        ...style,
      }}
    >
      {/* 3D Crystal Octagonal Cap Silhouette */}
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Crystal Faceted Top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            width: '110px',
            height: '42px',
            borderRadius: '4px',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(168, 216, 240, 0.7) 40%, rgba(70, 130, 190, 0.85) 100%)',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.9), inset 0 -1px 2px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Subtle engraved monogram on top of cap */}
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '0.75rem',
              letterSpacing: '0.18em',
              color: 'rgba(255, 255, 255, 0.85)',
              fontWeight: 600,
            }}
          >
            N
          </span>
        </div>

        {/* Silver Metallic Neck Collar / Connector */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            width: '54px',
            height: '32px',
            borderRadius: '2px',
            background: 'linear-gradient(90deg, #8A929B 0%, #FFFFFF 35%, #CCD3DB 65%, #6E757E 100%)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
            zIndex: -1,
          }}
        />
      </div>
    </div>
  );
});

PerfumeCap.displayName = 'PerfumeCap';
export default PerfumeCap;
