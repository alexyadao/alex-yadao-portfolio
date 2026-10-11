import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Increments smoothly from 0% to 100% over 2.2 seconds (2200ms)
    const totalDuration = 2200;
    const startTime = performance.now();
    let animFrameId: number;

    const animateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressFraction = Math.min(elapsed / totalDuration, 1);

      // Smooth ease-out cubic curve for natural telemetry sync
      const eased = 1 - Math.pow(1 - progressFraction, 3);
      const currentVal = Math.min(Math.floor(eased * 100), 100);
      setPercent(currentVal);

      if (progressFraction < 1) {
        animFrameId = requestAnimationFrame(animateProgress);
      } else {
        // When percent reaches 100%: trigger exit state, wait 600ms, then invoke onComplete
        const exitTimer = setTimeout(() => {
          setIsExiting(true);
          const completeTimer = setTimeout(() => {
            onComplete();
          }, 600);
          return () => clearTimeout(completeTimer);
        }, 120);
        return () => clearTimeout(exitTimer);
      }
    };

    animFrameId = requestAnimationFrame(animateProgress);

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#03050a] flex flex-col items-center justify-center p-4 overflow-hidden select-none transition-all duration-700 ease-out ${
        isExiting ? 'opacity-0 scale-[0.98] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-label="Systems and Network Infrastructure Discovery"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* 1. Centered Radial Ambient Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(6,182,212,0.14) 0%, rgba(3,5,10,0.98) 75%)',
        }}
      />

      {/* 2. Faint Micro-Grid Dot Matrix Texture */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(6, 182, 212, 0.6) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* 3. Background: Radial Network Ping Rings & Topology Nodes */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-visible">
        <svg
          viewBox="-250 -250 500 500"
          className="w-[500px] h-[500px] md:w-[640px] md:h-[640px] overflow-visible"
        >
          <defs>
            {/* Ping Wave expansion keyframe animation */}
            <style>{`
              @keyframes pingWave {
                0% {
                  transform: scale(0.6);
                  opacity: 0.42;
                }
                50% {
                  opacity: 0.28;
                }
                100% {
                  transform: scale(2.4);
                  opacity: 0;
                }
              }

              @keyframes pingPulseNode {
                0%, 100% {
                  opacity: 0.35;
                  transform: scale(1);
                }
                50% {
                  opacity: 0.95;
                  transform: scale(1.4);
                }
              }

              @keyframes radarSweepBeam {
                0% {
                  transform: rotate(0deg);
                }
                100% {
                  transform: rotate(360deg);
                }
              }

              @keyframes cyberTwitch {
                0%, 100% {
                  transform: translate(0, 0) scale(1);
                  filter: drop-shadow(0 0 18px rgba(6, 182, 212, 0.7));
                }
                15% {
                  transform: translate(0, 0) scale(1.015);
                  filter: drop-shadow(0 0 22px rgba(6, 182, 212, 0.85));
                }
                28% {
                  transform: translate(1px, -0.5px) scale(1.005);
                  filter: drop-shadow(2px 0 0 rgba(236, 72, 153, 0.4)) drop-shadow(-2px 0 0 rgba(6, 182, 212, 0.6)) drop-shadow(0 0 18px rgba(6, 182, 212, 0.7));
                }
                31% {
                  transform: translate(-1px, 0.5px) scale(0.995);
                  filter: drop-shadow(0 0 18px rgba(6, 182, 212, 0.7));
                }
                48% {
                  transform: translate(0, 0) scale(0.99);
                  filter: drop-shadow(0 0 15px rgba(6, 182, 212, 0.6));
                }
                66% {
                  transform: translate(0.5px, 0.5px) scale(1.02);
                  filter: drop-shadow(0 0 24px rgba(6, 182, 212, 0.85));
                }
                79% {
                  transform: translate(-1.5px, -0.5px) scale(1.01);
                  filter: drop-shadow(2px 0 0 rgba(236, 72, 153, 0.45)) drop-shadow(-2px 0 0 rgba(6, 182, 212, 0.65)) drop-shadow(0 0 20px rgba(6, 182, 212, 0.8));
                }
                82% {
                  transform: translate(0, 0) scale(1);
                  filter: drop-shadow(0 0 18px rgba(6, 182, 212, 0.7));
                }
              }

              .ping-ring-1 {
                transform-origin: center;
                animation: pingWave 3.2s cubic-bezier(0.2, 0.8, 0.4, 1) infinite;
              }
              .ping-ring-2 {
                transform-origin: center;
                animation: pingWave 3.2s cubic-bezier(0.2, 0.8, 0.4, 1) infinite 0.8s;
              }
              .ping-ring-3 {
                transform-origin: center;
                animation: pingWave 3.2s cubic-bezier(0.2, 0.8, 0.4, 1) infinite 1.6s;
              }
              .ping-ring-4 {
                transform-origin: center;
                animation: pingWave 3.2s cubic-bezier(0.2, 0.8, 0.4, 1) infinite 2.4s;
              }

              .radar-beam {
                transform-origin: 0 0;
                animation: radarSweepBeam 5.5s linear infinite;
              }

              .cyber-twitch-logo {
                animation: cyberTwitch 3.8s ease-in-out infinite;
                transform-origin: center;
              }
            `}</style>

            {/* Cyan / Cobalt Gradients */}
            <linearGradient id="ping-cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>

            <radialGradient id="radar-beam-gradient" cx="0" cy="0" r="220" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(6, 182, 212, 0.25)" />
              <stop offset="60%" stopColor="rgba(59, 130, 246, 0.08)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* Static Background Radar Reference Rings */}
          <circle cx="0" cy="0" r="70" fill="none" stroke="#06b6d4" strokeWidth="0.8" strokeOpacity="0.12" />
          <circle cx="0" cy="0" r="120" fill="none" stroke="#06b6d4" strokeWidth="0.8" strokeOpacity="0.10" />
          <circle cx="0" cy="0" r="170" fill="none" stroke="#3b82f6" strokeWidth="0.8" strokeOpacity="0.08" strokeDasharray="3 6" />
          <circle cx="0" cy="0" r="220" fill="none" stroke="#06b6d4" strokeWidth="0.8" strokeOpacity="0.06" strokeDasharray="4 8" />

          {/* Coordinate Crosshairs */}
          <line x1="-240" y1="0" x2="-80" y2="0" stroke="#06b6d4" strokeWidth="0.75" strokeOpacity="0.1" />
          <line x1="80" y1="0" x2="240" y2="0" stroke="#06b6d4" strokeWidth="0.75" strokeOpacity="0.1" />
          <line x1="0" y1="-240" x2="0" y2="-80" stroke="#06b6d4" strokeWidth="0.75" strokeOpacity="0.1" />
          <line x1="0" y1="80" x2="0" y2="240" stroke="#06b6d4" strokeWidth="0.75" strokeOpacity="0.1" />

          {/* Subtle Radar Sweep Sector Beam */}
          <g className="radar-beam">
            <path
              d="M 0 0 L 220 0 A 220 220 0 0 0 170 -140 Z"
              fill="url(#radar-beam-gradient)"
              opacity="0.35"
            />
          </g>

          {/* Concentric Expanding Radar / Ping Ripple Waves */}
          <circle
            cx="0"
            cy="0"
            r="90"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="1.5"
            className="ping-ring-1"
          />
          <circle
            cx="0"
            cy="0"
            r="90"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            className="ping-ring-2"
          />
          <circle
            cx="0"
            cy="0"
            r="90"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="1.2"
            className="ping-ring-3"
          />
          <circle
            cx="0"
            cy="0"
            r="90"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.0"
            strokeDasharray="3 5"
            className="ping-ring-4"
          />

          {/* Network Node Points (Edge server nodes scattered at radial distances) */}
          {/* Node 1: Top-Right (70 deg, r=120) */}
          <g transform="translate(41, -112)" style={{ animation: 'pingPulseNode 2.6s ease-in-out infinite' }}>
            <circle cx="0" cy="0" r="5" fill="none" stroke="#06b6d4" strokeWidth="0.75" strokeOpacity="0.4" />
            <circle cx="0" cy="0" r="2" fill="#22d3ee" />
            <text x="8" y="3" fill="#06b6d4" fontSize="7" fontFamily="monospace" opacity="0.45">EDGE-01</text>
          </g>

          {/* Node 2: Left-Upper (160 deg, r=160) */}
          <g transform="translate(-150, -54)" style={{ animation: 'pingPulseNode 3.1s ease-in-out infinite 0.9s' }}>
            <circle cx="0" cy="0" r="4.5" fill="none" stroke="#3b82f6" strokeWidth="0.75" strokeOpacity="0.4" />
            <circle cx="0" cy="0" r="1.8" fill="#38bdf8" />
            <text x="-36" y="3" fill="#38bdf8" fontSize="7" fontFamily="monospace" opacity="0.4">GATEWAY</text>
          </g>

          {/* Node 3: Bottom-Right (310 deg, r=140) */}
          <g transform="translate(107, 90)" style={{ animation: 'pingPulseNode 2.9s ease-in-out infinite 1.4s' }}>
            <circle cx="0" cy="0" r="5" fill="none" stroke="#06b6d4" strokeWidth="0.75" strokeOpacity="0.4" />
            <circle cx="0" cy="0" r="2.2" fill="#22d3ee" />
            <text x="8" y="3" fill="#06b6d4" fontSize="7" fontFamily="monospace" opacity="0.45">SYNC:OK</text>
          </g>

          {/* Node 4: Bottom-Left (220 deg, r=185) */}
          <g transform="translate(-118, 141)" style={{ animation: 'pingPulseNode 3.4s ease-in-out infinite 2.1s' }}>
            <circle cx="0" cy="0" r="4.5" fill="none" stroke="#3b82f6" strokeWidth="0.75" strokeOpacity="0.35" />
            <circle cx="0" cy="0" r="1.7" fill="#818cf8" />
            <text x="-32" y="3" fill="#818cf8" fontSize="7" fontFamily="monospace" opacity="0.35">NODE-04</text>
          </g>

          {/* Node 5: Top-Left (125 deg, r=90) */}
          <g transform="translate(-51, -74)" style={{ animation: 'pingPulseNode 2.4s ease-in-out infinite 0.5s' }}>
            <circle cx="0" cy="0" r="1.6" fill="#38bdf8" />
          </g>

          {/* Node 6: Far Right (0 deg, r=200) */}
          <g transform="translate(200, 15)" style={{ animation: 'pingPulseNode 3.6s ease-in-out infinite 1.8s' }}>
            <circle cx="0" cy="0" r="1.6" fill="#06b6d4" opacity="0.6" />
          </g>
        </svg>
      </div>

      {/* 4. Centerpiece: The Cybernetic "A" Monogram & Pulse Glitch */}
      <div className="relative z-10 w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full cyber-twitch-logo overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Bright Electric Cyan & Sky Blue Gradient */}
            <linearGradient id="monogram-cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>

            {/* Glowing Core Filter */}
            <filter id="monogram-core-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="2.5" result="blur1" />
              <feGaussianBlur stdDeviation="6" result="blur2" />
              <feMerge>
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Left Tech Bracket ⟨ with micro-notch */}
          <path
            d="M 22 34 L 14 46 L 14 49 L 16 51 L 14 54 L 22 66"
            stroke="url(#monogram-cyan-grad)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
            filter="url(#monogram-core-glow)"
          />

          {/* Right Tech Bracket ⟩ with micro-notch */}
          <path
            d="M 78 34 L 86 46 L 86 49 L 84 51 L 86 54 L 78 66"
            stroke="url(#monogram-cyan-grad)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
            filter="url(#monogram-core-glow)"
          />

          {/* Bold, Sharp Geometric Capital Letter 'A' */}
          {/* Main outer legs and sharp apex */}
          <path
            d="M 33 70 L 50 25 L 67 70"
            stroke="url(#monogram-cyan-grad)"
            strokeWidth="3.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#monogram-core-glow)"
          />

          {/* Inner precision chevron accent */}
          <path
            d="M 41 55 L 50 31 L 59 55"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.65"
          />

          {/* High-tech segmented crossbar with micro digital gap */}
          <path
            d="M 38.5 53.5 L 47 53.5"
            stroke="url(#monogram-cyan-grad)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M 53 53.5 L 61.5 53.5"
            stroke="url(#monogram-cyan-grad)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Apex Core Luminous Point */}
          <circle cx="50" cy="25" r="2.2" fill="#ffffff" filter="url(#monogram-core-glow)" />

          {/* Foot Foundation Terminals */}
          <circle cx="33" cy="70" r="1.8" fill="#22d3ee" />
          <circle cx="67" cy="70" r="1.8" fill="#22d3ee" />
        </svg>
      </div>

      {/* 5. Centered Typography & Telemetry (Directly Below Monogram) */}
      <div className="mt-6 z-10 flex flex-col items-center text-center">
        {/* Name */}
        <h1 className="text-white font-bold tracking-[0.25em] text-sm md:text-base uppercase opacity-95">
          ALEXANDER CHRISTIAN R. YADAO
        </h1>

        {/* Status Subtitle */}
        <p className="text-cyan-400/80 font-mono tracking-[0.3em] text-[10px] md:text-xs uppercase mt-1 animate-pulse">
          BROADCASTING NETWORK DISCOVERY...
        </p>

        {/* Telemetry Counter */}
        <div className="font-mono text-[10px] md:text-[11px] text-cyan-300 tracking-wider mt-4">
          LATENCY: 4ms // SYSTEM SYNC: {percent}%
        </div>

        {/* 6. High-Tech Minimalist Progress Indicator */}
        <div className="w-44 md:w-52 h-[2px] bg-slate-800/80 rounded-full overflow-hidden mt-2 relative z-10">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 shadow-[0_0_10px_#06b6d4] transition-all duration-100 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
