import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Fill gracefully from 0% to 100% over approximately 2.5 seconds
    const totalDuration = 2500;
    const startTime = performance.now();
    let animFrameId: number;

    const animateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const fraction = Math.min(elapsed / totalDuration, 1);

      // Smooth cyber ease-in-out curve
      const easedFraction =
        fraction < 0.5
          ? 2 * fraction * fraction
          : 1 - Math.pow(-2 * fraction + 2, 2) / 2;

      const currentPercent = Math.min(Math.floor(easedFraction * 100), 100);
      setProgress(currentPercent);

      if (fraction < 1) {
        animFrameId = requestAnimationFrame(animateProgress);
      } else {
        // Trigger onComplete after a 500ms delay once reaching 100%
        const exitTimer = setTimeout(() => {
          setIsFadingOut(true);
          const completeTimer = setTimeout(() => {
            onComplete();
          }, 700);
          return () => clearTimeout(completeTimer);
        }, 500);
        return () => clearTimeout(exitTimer);
      }
    };

    animFrameId = requestAnimationFrame(animateProgress);

    // Safety fallback timeout (3.5s max) to guarantee the screen never hangs
    const safetyTimeout = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        onComplete();
      }, 700);
    }, 3500);

    return () => {
      cancelAnimationFrame(animFrameId);
      clearTimeout(safetyTimeout);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#03050a] flex flex-col items-center justify-center p-4 overflow-hidden select-none transition-all duration-700 ease-out ${
        isFadingOut ? 'opacity-0 scale-[0.97] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-label="System Initializing"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Inline styles and keyframes for the Cyber Walk glitch, chromatic aberration & edge-to-edge wave pulse */}
      <style>{`
        @keyframes cyberWalkGlitch {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            filter: drop-shadow(0 0 16px rgba(6,182,212,0.8)) drop-shadow(0 0 35px rgba(16,185,129,0.5));
          }
          10% {
            transform: translate(1px, -0.5px) scale(1.015);
            filter: drop-shadow(2px 0 0 rgba(236,72,153,0.5)) drop-shadow(-2px 0 0 rgba(6,182,212,0.6)) drop-shadow(0 0 20px rgba(6,182,212,0.85));
          }
          15% {
            transform: translate(-0.5px, 0.5px) scale(0.99);
            opacity: 0.92;
          }
          20% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          40% {
            transform: translate(-1px, -0.5px) scale(1.02);
            filter: drop-shadow(-2px 0 0 rgba(236,72,153,0.45)) drop-shadow(2px 0 0 rgba(6,182,212,0.7)) drop-shadow(0 0 25px rgba(16,185,129,0.6));
          }
          45% {
            transform: translate(0.5px, 0.5px) scale(0.985);
            opacity: 0.88;
          }
          50% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          70% {
            transform: translate(1.5px, 0.5px) scale(1.01);
            filter: drop-shadow(2px 0 0 rgba(236,72,153,0.5)) drop-shadow(-2px 0 0 rgba(6,182,212,0.6)) drop-shadow(0 0 18px rgba(6,182,212,0.8));
          }
          75% {
            transform: translate(-1px, -1px) scale(0.995);
          }
          80% {
            transform: translate(0, 0) scale(1);
          }
          92% {
            transform: translate(-0.5px, 1px) scale(1.008);
            opacity: 0.94;
          }
          95% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
        }

        @keyframes waveTravelLoop {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -1600;
          }
        }

        @keyframes beamScanSlide {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          20% {
            opacity: 0.8;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            transform: translateX(200%);
            opacity: 0;
          }
        }

        .cyber-logo-glitch {
          animation: cyberWalkGlitch 2.4s cubic-bezier(0.25, 1, 0.5, 1) infinite;
        }

        .edge-wave-dash {
          stroke-dasharray: 800 200;
          animation: waveTravelLoop 3.6s linear infinite;
        }

        .beam-scan-anim {
          animation: beamScanSlide 2.8s ease-in-out infinite;
        }
      `}</style>

      {/* Subtle backdrop: Faint scanning grid & drifting particles (entirely borderless, no windows, no outlines) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 70%),
            linear-gradient(to right, rgba(6, 182, 212, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 182, 212, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 64px 64px, 64px 64px',
        }}
      />

      {/* Ambient faint radial backlight in dark void */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(6,182,212,0.06),transparent_70%)]" />

      {/* ========================================================================= */}
      {/* EDGE-TO-EDGE MOVING ZIGZAG SIGNAL (TRANSLUCENT OSCILLOSCOPE, NO CLIPPING) */}
      {/* ========================================================================= */}
      <div className="absolute left-0 right-0 w-full top-1/2 -translate-y-1/2 h-32 md:h-48 pointer-events-none overflow-visible opacity-25 z-0 flex items-center">
        <svg
          viewBox="0 0 1600 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="edge-wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
              <stop offset="30%" stopColor="#06b6d4" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
              <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
            </linearGradient>

            <filter id="wave-glow" x="-5%" y="-50%" width="110%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Sharp, continuous electronic oscilloscope heartbeat waveform stretching edge-to-edge from x=0 to x=1600 */}
          <path
            d="
              M 0 60
              L 160 60 L 175 56 L 185 60 L 210 60 L 220 68 L 235 12 L 250 108 L 265 60 L 290 60 L 305 52 L 320 60
              L 480 60 L 495 56 L 505 60 L 530 60 L 540 68 L 555 12 L 570 108 L 585 60 L 610 60 L 625 52 L 640 60
              L 800 60 L 815 56 L 825 60 L 850 60 L 860 68 L 875 12 L 890 108 L 905 60 L 930 60 L 945 52 L 960 60
              L 1120 60 L 1135 56 L 1145 60 L 1170 60 L 1180 68 L 1195 12 L 1210 108 L 1225 60 L 1250 60 L 1265 52 L 1280 60
              L 1440 60 L 1455 56 L 1465 60 L 1490 60 L 1500 68 L 1515 12 L 1530 108 L 1545 60 L 1570 60 L 1585 52 L 1600 60
            "
            stroke="url(#edge-wave-gradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#wave-glow)"
            className="edge-wave-dash"
            style={{
              filter: 'drop-shadow(0 0 6px rgba(6,182,212,0.4))',
            }}
          />
        </svg>

        {/* Seamless Traveling Radar / Electric Signal Sweep Beam */}
        <div className="absolute inset-y-0 w-64 md:w-96 beam-scan-anim pointer-events-none bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent blur-xl" />
      </div>

      {/* ========================================================================= */}
      {/* CENTERPIECE: THE ANIMATED MONOGRAM LOGO (GLITCHY, ENERGETIC & BORDERLESS) */}
      {/* ========================================================================= */}
      <div className="w-32 h-32 md:w-40 md:h-40 relative z-10 flex items-center justify-center">
        
        {/* Soft emerald/cyan bloom behind monogram */}
        <div className="absolute inset-0 rounded-full bg-cyan-500/15 blur-2xl pointer-events-none" />

        {/* Glitch Monogram Container */}
        <div className="relative w-full h-full cyber-logo-glitch">
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            aria-label="Alexander Yadao Monogram"
          >
            <defs>
              <linearGradient id="cyber-a-monogram-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="45%" stopColor="#2dd4bf" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>

              <filter id="logo-high-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="0.8" result="blur1" />
                <feGaussianBlur stdDeviation="2.2" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Cyber Brackets `⟨` and `⟩` around central A */}
            <path
              d="M 5.5 11 L 3 16 L 5.5 21"
              stroke="url(#cyber-a-monogram-grad)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-75"
            />
            <path
              d="M 26.5 11 L 29 16 L 26.5 21"
              stroke="url(#cyber-a-monogram-grad)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-75"
            />

            {/* Letter 'A' Outer Geometric Chevron & Legs */}
            <path
              d="M 8.5 24.5 L 16 6.5 L 23.5 24.5"
              stroke="url(#cyber-a-monogram-grad)"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#logo-high-glow)"
            />

            {/* Horizontal Crossbar for 'A' with Circuit Split */}
            <path
              d="M 11.2 17.5 L 13.8 17.5 M 18.2 17.5 L 20.8 17.5"
              stroke="url(#cyber-a-monogram-grad)"
              strokeWidth="2.0"
              strokeLinecap="round"
            />

            {/* Letter 'Y' Upper Fork & Central Data Bus / Stem */}
            <path
              d="M 11.5 12.5 L 16 17.5 L 20.5 12.5"
              stroke="url(#cyber-a-monogram-grad)"
              strokeWidth="2.0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 16 17.5 L 16 25.5"
              stroke="url(#cyber-a-monogram-grad)"
              strokeWidth="2.3"
              strokeLinecap="round"
              filter="url(#logo-high-glow)"
            />

            {/* Circuit Nodes / Terminal Pads */}
            <circle cx="16" cy="6.5" r="1.3" fill="#06b6d4" />
            <circle cx="8.5" cy="24.5" r="1.3" fill="#10b981" />
            <circle cx="23.5" cy="24.5" r="1.3" fill="#10b981" />
            <circle cx="16" cy="25.5" r="1.5" fill="#10b981" />
            <circle cx="16" cy="17.5" r="1.1" fill="#06b6d4" />
          </svg>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MINIMAL MODERN TYPOGRAPHY (FULLY CENTERED BELOW LOGO)                     */}
      {/* ========================================================================= */}
      <div className="mt-6 z-10 flex flex-col items-center text-center">
        
        {/* Name */}
        <h1 className="text-white text-base md:text-lg font-bold tracking-[0.2em] uppercase opacity-90">
          Alexander Christian R. Yadao
        </h1>

        {/* Tech Label */}
        <p className="text-cyan-500/80 text-[10px] md:text-xs tracking-[0.3em] font-medium uppercase mt-1">
          INITIALIZING SYSTEM ENGINE...
        </p>

        {/* Clean Digital Percentage Count */}
        <span className="font-mono text-[10px] md:text-xs text-cyan-400/80 mt-4 tracking-wider">
          SYSTEM LOAD: {progress}%
        </span>

        {/* Aesthetic Minimal Progress Indicator */}
        <div className="h-[3px] border-none bg-slate-900/40 max-w-[180px] w-full rounded overflow-hidden mt-2 z-10">
          <div
            className="bg-gradient-to-r from-cyan-500 to-emerald-400 shadow-[0_0_8px_#06b6d4] h-full transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>
    </div>
  );
};
