import React, { useState, useEffect, useMemo } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [activeStage, setActiveStage] = useState(0);

  // Modular telemetry indicators
  const modules = useMemo(
    () => [
      { id: 'CORE', label: 'CORE', threshold: 15 },
      { id: 'BUS', label: 'BUS', threshold: 45 },
      { id: 'IO', label: 'I/O', threshold: 75 },
      { id: 'NET', label: 'NET', threshold: 95 },
    ],
    []
  );

  useEffect(() => {
    const totalDuration = 2200; // ~2.2 seconds total sequence
    const startTime = performance.now();
    let animFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressFraction = Math.min(elapsed / totalDuration, 1);

      // Nonlinear smooth cyber acceleration
      // Starts snappy, moves steadily, finishes with precision
      const easeVal =
        progressFraction < 0.5
          ? 2 * progressFraction * progressFraction
          : 1 - Math.pow(-2 * progressFraction + 2, 2) / 2;

      const currentPercent = Math.min(Math.floor(easeVal * 100), 100);
      setProgress(currentPercent);

      if (currentPercent >= 95) setActiveStage(3);
      else if (currentPercent >= 75) setActiveStage(2);
      else if (currentPercent >= 45) setActiveStage(1);
      else setActiveStage(0);

      if (progressFraction < 1) {
        animFrameId = requestAnimationFrame(animate);
      } else {
        // Complete state: brief moment at 100% then trigger smooth cinematic exit
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            onComplete();
          }, 700);
        }, 180);
      }
    };

    animFrameId = requestAnimationFrame(animate);

    // Hard safety fallback timeout (3.5s max)
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
      className={`fixed inset-0 z-50 bg-[#05070c] font-mono text-cyan-400 overflow-hidden flex flex-col justify-center items-center p-6 select-none transition-all duration-700 ease-out ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-label="System Initializing"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Scoped Keyframes for Cyber Walk Glitch & ECG Travel Wave */}
      <style>{`
        @keyframes cyberWalkGlitch {
          0% {
            transform: translate(0, 0) scale(1);
            filter: drop-shadow(0 0 16px rgba(6, 182, 212, 0.8)) drop-shadow(0 0 35px rgba(16, 185, 129, 0.5));
          }
          10% {
            transform: translate(-3px, 1px) scale(1.02);
            filter: drop-shadow(-4px 0 3px rgba(244, 63, 94, 0.6)) drop-shadow(4px 0 3px rgba(6, 182, 212, 0.8)) drop-shadow(0 0 24px rgba(6, 182, 212, 0.9));
          }
          12% {
            transform: translate(3px, -1px) scale(0.99);
          }
          14% {
            transform: translate(0, 0) scale(1.01);
            filter: drop-shadow(0 0 20px rgba(6, 182, 212, 0.85)) drop-shadow(0 0 40px rgba(16, 185, 129, 0.6));
          }
          32% {
            transform: translate(2px, 2px) scale(1.03);
          }
          34% {
            transform: translate(-4px, -1px) scale(0.98);
            filter: drop-shadow(3px 0 2px rgba(244, 63, 94, 0.7)) drop-shadow(-3px 0 2px rgba(6, 182, 212, 0.9)) drop-shadow(0 0 22px rgba(6, 182, 212, 0.8));
          }
          36% {
            transform: translate(0, 0) scale(1);
          }
          58% {
            transform: translate(-2px, 1px) scale(1.02);
          }
          60% {
            transform: translate(4px, 0) scale(1.04);
            filter: drop-shadow(-5px 0 3px rgba(244, 63, 94, 0.65)) drop-shadow(5px 0 3px rgba(6, 182, 212, 0.85)) drop-shadow(0 0 30px rgba(16, 185, 129, 0.7));
          }
          62% {
            transform: translate(1px, -2px) scale(0.99);
          }
          64% {
            transform: translate(0, 0) scale(1);
          }
          82% {
            transform: translate(3px, -1px) scale(1.01);
          }
          84% {
            transform: translate(-3px, 2px) scale(0.98);
          }
          86% {
            transform: translate(0, 0) scale(1);
            filter: drop-shadow(0 0 16px rgba(6, 182, 212, 0.8)) drop-shadow(0 0 35px rgba(16, 185, 129, 0.5));
          }
          100% {
            transform: translate(0, 0) scale(1);
            filter: drop-shadow(0 0 16px rgba(6, 182, 212, 0.8)) drop-shadow(0 0 35px rgba(16, 185, 129, 0.5));
          }
        }

        @keyframes chromaRedGhost {
          0%, 100% {
            opacity: 0;
            transform: translate(0, 0);
          }
          10%, 13% {
            opacity: 0.65;
            transform: translate(-4px, 1px);
          }
          33%, 36% {
            opacity: 0.75;
            transform: translate(5px, -1px);
          }
          60%, 63% {
            opacity: 0.8;
            transform: translate(-6px, 2px);
          }
          83%, 85% {
            opacity: 0.5;
            transform: translate(3px, -2px);
          }
        }

        @keyframes chromaCyanGhost {
          0%, 100% {
            opacity: 0;
            transform: translate(0, 0);
          }
          11%, 14% {
            opacity: 0.75;
            transform: translate(4px, -1px);
          }
          34%, 37% {
            opacity: 0.85;
            transform: translate(-5px, 2px);
          }
          61%, 64% {
            opacity: 0.9;
            transform: translate(5px, -1px);
          }
          84%, 86% {
            opacity: 0.6;
            transform: translate(-3px, 1px);
          }
        }

        @keyframes ecgScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes ecgBeamScan {
          0% {
            transform: translateX(-20%);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateX(120%);
            opacity: 0;
          }
        }

        @keyframes radarSweepPulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.97);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.03);
          }
        }

        .cyber-walk-active {
          animation: cyberWalkGlitch 2.2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
        }

        .chroma-red-active {
          animation: chromaRedGhost 2.2s steps(2, start) infinite;
        }

        .chroma-cyan-active {
          animation: chromaCyanGhost 2.2s steps(2, start) infinite;
        }

        .ecg-loop-track {
          animation: ecgScroll 2.4s linear infinite;
        }

        .ecg-beam-pulse {
          animation: ecgBeamScan 1.6s ease-in-out infinite;
        }
      `}</style>

      {/* Dark Cinematic Ambient Void: Radial gradient glow + faint fine coordinate grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 60% at 50% 50%, rgba(6, 182, 212, 0.12) 0%, rgba(5, 7, 12, 0) 75%),
            radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.05) 0%, transparent 60%),
            linear-gradient(to right, rgba(6, 182, 212, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 182, 212, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 100% 100%, 48px 48px, 48px 48px',
        }}
      />

      {/* Subtle CRT Scanline Texture (Ultra-faint) */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] opacity-25" />

      {/* Drifting Cyber Micro-Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute top-1/4 left-1/4 w-1 h-1 bg-cyan-400/40 rounded-full blur-[0.5px] animate-pulse" />
        <span className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-emerald-400/30 rounded-full blur-[0.5px] animate-pulse delay-300" />
        <span className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-cyan-400/30 rounded-full blur-[0.5px] animate-pulse delay-700" />
        <span className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-teal-400/40 rounded-full blur-[0.5px] animate-pulse delay-500" />
      </div>

      {/* Central Interactive Presentation Container (Pure Minimal, No Outer Box/Window) */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-lg w-full px-4">
        
        {/* ============================================================== */}
        {/* 1. CENTERPIECE: THE GLITCHING "A" / "AY" MONOGRAM LOGO         */}
        {/* ============================================================== */}
        <div className="relative flex items-center justify-center h-32 w-32 md:h-40 md:w-40 mb-6">
          
          {/* Ambient Radial Backlight Glow behind Logo */}
          <div className="absolute inset-0 -m-6 rounded-full bg-gradient-to-tr from-cyan-500/20 via-emerald-500/15 to-transparent blur-2xl pointer-events-none" />

          {/* Red/Magenta Chromatic Split Ghost Clone */}
          <div className="absolute inset-0 w-full h-full pointer-events-none chroma-red-active opacity-0">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* Terminal bracket accents */}
              <path
                d="M 5.5 11 L 3 16 L 5.5 21"
                stroke="#f43f5e"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 26.5 11 L 29 16 L 26.5 21"
                stroke="#f43f5e"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Outer chevron legs */}
              <path
                d="M 8.5 24.5 L 16 6.5 L 23.5 24.5"
                stroke="#f43f5e"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Horizontal crossbar */}
              <path
                d="M 11.2 17.5 L 13.8 17.5 M 18.2 17.5 L 20.8 17.5"
                stroke="#f43f5e"
                strokeWidth="2.0"
                strokeLinecap="round"
              />
              {/* Stem */}
              <path
                d="M 11.5 12.5 L 16 17.5 L 20.5 12.5"
                stroke="#f43f5e"
                strokeWidth="2.0"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 16 17.5 L 16 25.5"
                stroke="#f43f5e"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Cyan Chromatic Split Ghost Clone */}
          <div className="absolute inset-0 w-full h-full pointer-events-none chroma-cyan-active opacity-0">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              {/* Terminal bracket accents */}
              <path
                d="M 5.5 11 L 3 16 L 5.5 21"
                stroke="#06b6d4"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 26.5 11 L 29 16 L 26.5 21"
                stroke="#06b6d4"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Outer chevron legs */}
              <path
                d="M 8.5 24.5 L 16 6.5 L 23.5 24.5"
                stroke="#06b6d4"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Horizontal crossbar */}
              <path
                d="M 11.2 17.5 L 13.8 17.5 M 18.2 17.5 L 20.8 17.5"
                stroke="#06b6d4"
                strokeWidth="2.0"
                strokeLinecap="round"
              />
              {/* Stem */}
              <path
                d="M 11.5 12.5 L 16 17.5 L 20.5 12.5"
                stroke="#06b6d4"
                strokeWidth="2.0"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 16 17.5 L 16 25.5"
                stroke="#06b6d4"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Primary High-Tech Vector Monogram (With Cyber Walk Glitch & Intense Neon Gradient Glow) */}
          <div className="relative w-full h-full cyber-walk-active">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              aria-label="AY Cyber Monogram"
            >
              <defs>
                <linearGradient id="cyber-logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#2dd4bf" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>

                <linearGradient id="beam-pulse-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                  <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>

                <filter id="neon-bloom" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="0.8" result="blur1" />
                  <feGaussianBlur stdDeviation="2.4" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Terminal bracket accents `<` and `>` */}
              <path
                d="M 5.5 11 L 3 16 L 5.5 21"
                stroke="url(#cyber-logo-gradient)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-80"
              />
              <path
                d="M 26.5 11 L 29 16 L 26.5 21"
                stroke="url(#cyber-logo-gradient)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-80"
              />

              {/* Letter 'A' outer geometric chevron & legs */}
              <path
                d="M 8.5 24.5 L 16 6.5 L 23.5 24.5"
                stroke="url(#cyber-logo-gradient)"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#neon-bloom)"
              />

              {/* Horizontal crossbar for 'A' with circuit split */}
              <path
                d="M 11.2 17.5 L 13.8 17.5 M 18.2 17.5 L 20.8 17.5"
                stroke="url(#cyber-logo-gradient)"
                strokeWidth="2.0"
                strokeLinecap="round"
              />

              {/* Letter 'Y' upper fork & central data bus / stem */}
              <path
                d="M 11.5 12.5 L 16 17.5 L 20.5 12.5"
                stroke="url(#cyber-logo-gradient)"
                strokeWidth="2.0"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 16 17.5 L 16 25.5"
                stroke="url(#cyber-logo-gradient)"
                strokeWidth="2.3"
                strokeLinecap="round"
                filter="url(#neon-bloom)"
              />

              {/* Circuit nodes / terminal connection pads */}
              <circle cx="16" cy="6.5" r="1.3" fill="#06b6d4" />
              <circle cx="8.5" cy="24.5" r="1.3" fill="#10b981" />
              <circle cx="23.5" cy="24.5" r="1.3" fill="#10b981" />
              <circle cx="16" cy="25.5" r="1.5" fill="#10b981" />
              <circle cx="16" cy="17.5" r="1.1" fill="#06b6d4" />
            </svg>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. THE MOVING ZIGZAG SIGNAL (OSCILLOSCOPE / TELEMETRY PULSE)  */}
        {/* ============================================================== */}
        <div className="relative w-64 sm:w-80 md:w-96 h-12 flex items-center justify-center overflow-hidden mb-6">
          {/* Subtle oscilloscope horizontal reference graticule line */}
          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-cyan-900/40 pointer-events-none" />

          {/* Endless Horizontally Moving Oscilloscope / ECG Wave */}
          <div className="relative w-[200%] h-full flex shrink-0 ecg-loop-track">
            {/* Repeating Waveform Segment 1 */}
            <svg
              viewBox="0 0 400 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-1/2 h-full shrink-0"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="ecg-trace-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                  <stop offset="35%" stopColor="#06b6d4" />
                  <stop offset="65%" stopColor="#2dd4bf" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>

                <filter id="ecg-glow" x="-10%" y="-40%" width="120%" height="180%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Realistic Digital Oscilloscope / ECG Waveform Path */}
              {/* Baseline -> subtle P bump -> Q drop -> high R spike -> deep S spike -> T wave recovery -> Baseline */}
              <path
                d="M 0 24 L 60 24 L 75 22 L 85 24 L 105 24 L 115 28 L 125 4 L 135 42 L 145 24 L 165 24 L 180 18 L 195 24 L 260 24 L 275 22 L 285 24 L 305 24 L 315 28 L 325 4 L 335 42 L 345 24 L 365 24 L 380 18 L 395 24 L 400 24"
                stroke="url(#ecg-trace-grad)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#ecg-glow)"
              />
            </svg>

            {/* Repeating Waveform Segment 2 (For seamless infinite cycle) */}
            <svg
              viewBox="0 0 400 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-1/2 h-full shrink-0"
              preserveAspectRatio="none"
            >
              <path
                d="M 0 24 L 60 24 L 75 22 L 85 24 L 105 24 L 115 28 L 125 4 L 135 42 L 145 24 L 165 24 L 180 18 L 195 24 L 260 24 L 275 22 L 285 24 L 305 24 L 315 28 L 325 4 L 335 42 L 345 24 L 365 24 L 380 18 L 395 24 L 400 24"
                stroke="url(#ecg-trace-grad)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#ecg-glow)"
              />
            </svg>
          </div>

          {/* Sweeping Beam Scan Glow Overlay */}
          <div className="absolute inset-y-0 w-28 ecg-beam-pulse pointer-events-none bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent blur-md" />

          {/* Left and Right Edge Vignette Fades */}
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#05070c] to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#05070c] to-transparent pointer-events-none" />
        </div>

        {/* ============================================================== */}
        {/* 3. HUD & TELEMETRY TEXT (MINIMAL & SOPHISTICATED)              */}
        {/* ============================================================== */}
        <div className="w-full flex flex-col items-center gap-3">
          
          {/* System Status Tag with Live Pulse Indicator */}
          <div className="flex items-center gap-2.5 text-[11px] sm:text-xs font-mono tracking-[0.22em] text-cyan-400/90 font-medium">
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
            </span>
            <span className="drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]">
              INITIALIZING SYSTEM CORE // v2.6.4
            </span>
          </div>

          {/* Real-time Digital Progress Counter & Module Checkpoints */}
          <div className="flex items-center justify-between w-64 sm:w-80 px-1 text-[11px] text-slate-400 font-mono">
            {/* Loaded Module Indicators */}
            <div className="flex items-center gap-2">
              {modules.map((mod, idx) => {
                const isLoaded = progress >= mod.threshold;
                return (
                  <span
                    key={mod.id}
                    className={`transition-all duration-300 text-[10px] tracking-wider px-1.5 py-0.5 rounded ${
                      isLoaded
                        ? 'text-cyan-300 font-bold bg-cyan-950/60 border border-cyan-500/40 shadow-[0_0_6px_rgba(6,182,212,0.3)]'
                        : 'text-slate-600 bg-slate-900/40 border border-slate-800/40'
                    }`}
                  >
                    {mod.label}
                  </span>
                );
              })}
            </div>

            {/* Glowing Digital Counter [ 0% ] -> [ 100% ] */}
            <span className="font-bold text-cyan-300 tracking-wider text-xs sm:text-sm drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]">
              [{' '}
              <span className="font-mono tabular-nums">
                {progress < 10 ? `0${progress}` : progress}
              </span>
              % ]
            </span>
          </div>

          {/* Ultra-Minimal Sleek High-Tech Progress Track Line */}
          <div className="w-64 sm:w-80 h-[3px] bg-slate-900/90 rounded-full overflow-hidden border border-cyan-500/20 relative shadow-[0_0_12px_rgba(6,182,212,0.15)]">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 rounded-full transition-all duration-75 ease-out shadow-[0_0_12px_rgba(6,182,212,0.9)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Micro Telemetry Coordinate String */}
          <div className="text-[10px] text-cyan-500/50 tracking-widest uppercase">
            BUS: 0x7FFD98 // SEC_BOOT: OK
          </div>

        </div>

      </div>
    </div>
  );
};
