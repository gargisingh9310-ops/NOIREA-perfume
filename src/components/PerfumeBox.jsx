import React, { forwardRef } from 'react';

const PerfumeBox = forwardRef(({ lidRef, baseRef, innerRef }, ref) => {
  return (
    <div
      ref={ref}
      className="box-3d-stage"
      style={{
        position: 'relative',
        width: '320px',
        height: '460px',
        transformStyle: 'preserve-3d',
        perspective: '1400px',
      }}
    >
      {/* 1. Box Base & Interior Cradle */}
      <div
        ref={baseRef}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#0D0D0D',
          borderRadius: '4px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 40px 100px rgba(0, 0, 0, 0.95), 0 0 50px rgba(0, 0, 0, 0.8)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '2rem 1.5rem',
          transformStyle: 'preserve-3d',
          zIndex: 10,
        }}
      >
        {/* Soft Velvet / Suede Interior Recess */}
        <div
          ref={innerRef}
          style={{
            position: 'absolute',
            inset: '12px',
            backgroundColor: '#080808',
            borderRadius: '2px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            boxShadow: 'inset 0 10px 40px rgba(0, 0, 0, 0.95)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            paddingBottom: '1.2rem',
          }}
        >
          <span
            className="mono-tag"
            style={{
              fontSize: '0.62rem',
              letterSpacing: '0.3em',
              color: 'rgba(255, 255, 255, 0.35)',
            }}
          >
            NOIRÉA • CRADLE N° 01
          </span>
        </div>

        {/* Ambient Floor Shadow */}
        <div
          style={{
            position: 'absolute',
            bottom: '-40px',
            left: '5%',
            width: '90%',
            height: '35px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(0, 0, 0, 0.8) 0%, transparent 70%)',
            filter: 'blur(12px)',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />
      </div>

      {/* 2. Pure White Luxury Box Front / Lid (Rotates open around top hinge) */}
      <div
        ref={lidRef}
        className="box-lid-3d"
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '4px',
          overflow: 'hidden',
          backgroundColor: '#FFFFFF',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.7), inset 0 0 0 1px rgba(0, 0, 0, 0.08)',
          zIndex: 30,
          transformOrigin: 'top center',
          cursor: 'default',
        }}
      >
        <img
          src="/assets/images/box.jpg"
          alt="NOIRÉA Luxury Packaging Box"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />

        {/* Subtle highlight sheen */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
});

PerfumeBox.displayName = 'PerfumeBox';
export default PerfumeBox;
