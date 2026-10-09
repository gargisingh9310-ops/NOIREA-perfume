import React, { forwardRef } from 'react';
import PerfumeCap from './PerfumeCap';
import PerfumeSpray from './PerfumeSpray';

const PerfumeBottle = forwardRef(({ capRef, isSpraying, style }, ref) => {
  return (
    <div
      ref={ref}
      className="bottle-3d-emerge"
      style={{
        position: 'absolute',
        width: '310px',
        height: '440px',
        transformStyle: 'preserve-3d',
        zIndex: 25,
        willChange: 'transform, opacity',
        ...style,
      }}
    >
      {/* 1. Fine Fragrance Mist Generator */}
      <PerfumeSpray isSpraying={isSpraying} />

      {/* 2. Independent 3D Crystal Cap (Lifts off during Phase 5) */}
      <PerfumeCap ref={capRef} />

      {/* 3. Silver Chrome Spray Atomizer Nozzle (Visible under cap) */}
      <div
        style={{
          position: 'absolute',
          top: '38px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '38px',
          height: '36px',
          borderRadius: '3px',
          background: 'linear-gradient(90deg, #A0A6AD 0%, #FFFFFF 40%, #CFD6DE 70%, #7E858E 100%)',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          zIndex: 20,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          paddingTop: '6px',
        }}
      >
        {/* Spray orifice dot */}
        <div
          style={{
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            backgroundColor: '#080808',
            boxShadow: '0 0 2px rgba(255, 255, 255, 0.5)',
          }}
        />
      </div>

      {/* 4. Translucent Icy-Blue Crystal Flacon Body */}
      <div
        style={{
          position: 'absolute',
          top: '60px',
          left: 0,
          width: '100%',
          height: '380px',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#080808',
          boxShadow: '0 30px 90px rgba(0, 0, 0, 0.85), 0 0 40px rgba(98, 164, 216, 0.15)',
          border: '1px solid rgba(168, 216, 240, 0.3)',
          transformStyle: 'preserve-3d',
        }}
      >
        <img
          src="/assets/images/hero_bottle.jpg"
          alt="NOIRÉA Translucent Bluish Glass Flacon"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />

        {/* Dynamic Glass Crystal Refraction Rim Highlight */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, transparent 40%, rgba(168, 216, 240, 0.12) 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* 5. Floor Reflection & Drop Shadow */}
      <div
        style={{
          position: 'absolute',
          bottom: '-30px',
          left: '10%',
          width: '80%',
          height: '25px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(0, 0, 0, 0.9) 0%, transparent 70%)',
          filter: 'blur(8px)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
});

PerfumeBottle.displayName = 'PerfumeBottle';
export default PerfumeBottle;
