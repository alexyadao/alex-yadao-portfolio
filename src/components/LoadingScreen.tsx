import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // 4.4-second cinematic progression (4400ms total duration)
    const totalDuration = 4400;
    const startTime = performance.now();
    let animFrameId: number;

    const animateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressFraction = Math.min(elapsed / totalDuration, 1);

      // Smooth cubic-bezier ease in-out curve
      let eased: number;
      if (progressFraction < 0.5) {
        eased = 4 * Math.pow(progressFraction, 3);
      } else {
        eased = 1 - Math.pow(-2 * progressFraction + 2, 3) / 2;
      }

      const val = Math.min(Math.floor(eased * 100), 100);
      setPercent(val);

      if (progressFraction < 1) {
        animFrameId = requestAnimationFrame(animateProgress);
      } else {
        // Hold for a momentary breath upon hitting 100%, then trigger smooth cinematic fade out
        const exitTimer = setTimeout(() => {
          setIsExiting(true);
          const completeTimer = setTimeout(() => {
            onComplete();
          }, 700);
          return () => clearTimeout(completeTimer);
        }, 160);
        return () => clearTimeout(exitTimer);
      }
    };

    animFrameId = requestAnimationFrame(animateProgress);

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [onComplete]);

  // Telemetry status updates mapped to loading stages
  const getOrbitalStatus = (p: number) => {
    if (p < 20) return 'INITIALIZING SYSTEM KERNEL & ORBITAL BUS...';
    if (p < 45) return 'DISCOVERING DISTRIBUTED ORBITAL DATA NODES...';
    if (p < 70) return 'SYNCHRONIZING TOPOLOGY & ENCRYPTED DATALINKS...';
    if (p < 92) return 'CALIBRATING HARDWARE LOGIC & BUS INTERFACES...';
    return 'ALL DATA NODES SYNCHRONIZED // SYSTEMS NOMINAL';
  };

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center p-4 overflow-hidden select-none transition-all duration-700 ease-out ${
        isExiting ? 'opacity-0 scale-[0.98] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-label="Systems Initialization Loading Screen"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Inline styles for smooth 60fps orbital rotations & keyframes */}
      <style>{`
        @keyframes orbit-cw-1 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-ccw-1 {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes orbit-cw-2 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-ccw-2 {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes orbit-pulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.75; transform: scale(1.02); }
        }
        @keyframes logo-glow-breath {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(6, 182, 212, 0.35)) drop-shadow(0 0 45px rgba(16, 185, 129, 0.2)); }
          50% { filter: drop-shadow(0 0 35px rgba(6, 182, 212, 0.65)) drop-shadow(0 0 70px rgba(16, 185, 129, 0.35)); }
        }
        @keyframes particle-drift {
          0% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-12px) translateX(8px); opacity: 0.7; }
          100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
        }
        .animate-orbit-cw-1 {
          animation: orbit-cw-1 32s linear infinite;
        }
        .animate-orbit-ccw-1 {
          animation: orbit-ccw-1 26s linear infinite;
        }
        .animate-orbit-cw-2 {
          animation: orbit-cw-2 40s linear infinite;
        }
        .animate-orbit-ccw-2 {
          animation: orbit-ccw-2 20s linear infinite;
        }
        .animate-logo-glow {
          animation: logo-glow-breath 3.5s ease-in-out infinite;
        }
      `}</style>

      {/* 1. Deep Midnight-Navy / Indigo Ambient Radial Void */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.12) 0%, rgba(79, 70, 229, 0.08) 35%, rgba(15, 23, 42, 0.88) 70%, #020617 100%)',
        }}
      />

      {/* 2. Micro Dot Matrix Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(rgba(56, 189, 248, 0.35) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          backgroundPosition: 'center center',
        }}
      />

      {/* 3. Subtle Digital Floating Dust / Nodes in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        <div
          className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400 top-[18%] left-[22%]"
          style={{ animation: 'particle-drift 7s ease-in-out infinite' }}
        />
        <div
          className="absolute w-1 h-1 rounded-full bg-emerald-400 top-[32%] right-[25%]"
          style={{ animation: 'particle-drift 9s ease-in-out infinite 1s' }}
        />
        <div
          className="absolute w-1.5 h-1.5 rounded-full bg-sky-400 bottom-[24%] left-[28%]"
          style={{ animation: 'particle-drift 8s ease-in-out infinite 2s' }}
        />
        <div
          className="absolute w-1 h-1 rounded-full bg-indigo-400 bottom-[36%] right-[20%]"
          style={{ animation: 'particle-drift 10s ease-in-out infinite 3s' }}
        />
        <div
          className="absolute w-1 h-1 rounded-full bg-cyan-300 top-[65%] left-[15%]"
          style={{ animation: 'particle-drift 6s ease-in-out infinite 1.5s' }}
        />
      </div>

      {/* 4. Background Layer: Sparse, Faint Orbital Trajectories & Gracefully Sliding Data Nodes */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-visible">
        <svg
          viewBox="0 0 1000 1000"
          className="w-[780px] h-[780px] sm:w-[940px] sm:h-[940px] md:w-[1150px] md:h-[1150px] max-w-none text-cyan-400 select-none"
        >
          <defs>
            {/* Gradients for Orbital Paths */}
            <linearGradient id="orbitGradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.35" />
            </linearGradient>

            <linearGradient id="orbitGradIndigo" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#818cf8" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
            </linearGradient>

            <linearGradient id="orbitGradEmerald" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.25" />
            </linearGradient>

            {/* Glowing Node Filter */}
            <filter id="orbitalNodeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Subtle Cybernetic Background Axial Rays */}
          <line x1="500" y1="60" x2="500" y2="940" stroke="#0e7490" strokeWidth="0.8" strokeDasharray="3 8" opacity="0.15" />
          <line x1="60" y1="500" x2="940" y2="500" stroke="#0e7490" strokeWidth="0.8" strokeDasharray="3 8" opacity="0.15" />

          {/* ========================================================================= */}
          {/* ORBITAL RING 1: Inner Inclined Orbit (Tilted -28°, Counter-Clockwise) */}
          {/* ========================================================================= */}
          <g transform="rotate(-28 500 500)" style={{ transformOrigin: '500px 500px' }}>
            {/* The faint elliptical orbital track */}
            <ellipse
              cx="500"
              cy="500"
              rx="290"
              ry="140"
              fill="none"
              stroke="url(#orbitGradCyan)"
              strokeWidth="1.2"
              strokeDasharray="6 6"
              opacity="0.6"
            />
            {/* Inner faint guide track */}
            <ellipse
              cx="500"
              cy="500"
              rx="286"
              ry="136"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="0.5"
              opacity="0.2"
            />

            {/* Rotating Data Node Carrier on Orbit 1 */}
            <g
              className="animate-orbit-ccw-1"
              style={{ transformOrigin: '500px 500px' }}
            >
              {/* Data Node 1A: SYS.KERNEL // [0x4A] */}
              <g transform="translate(790, 500)">
                <circle cx="0" cy="0" r="3.5" fill="#06b6d4" filter="url(#orbitalNodeGlow)" />
                <circle cx="0" cy="0" r="7" fill="none" stroke="#06b6d4" strokeWidth="0.8" opacity="0.6" />
                <line x1="5" y1="-5" x2="22" y2="-16" stroke="#06b6d4" strokeWidth="0.8" opacity="0.7" />
                <line x1="22" y1="-16" x2="92" y2="-16" stroke="#06b6d4" strokeWidth="0.8" opacity="0.7" />
                <text
                  x="26"
                  y="-20"
                  fill="#67e8f9"
                  fontSize="8.5"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                  letterSpacing="0.12em"
                  fontWeight="600"
                >
                  SYS.KERNEL // 0x4A
                </text>
              </g>

              {/* Data Node 1B: SEC.VAULT // AES */}
              <g transform="translate(210, 500)">
                <circle cx="0" cy="0" r="3" fill="#38bdf8" filter="url(#orbitalNodeGlow)" />
                <circle cx="0" cy="0" r="6" fill="none" stroke="#38bdf8" strokeWidth="0.8" opacity="0.5" />
                <line x1="-5" y1="5" x2="-20" y2="16" stroke="#38bdf8" strokeWidth="0.8" opacity="0.7" />
                <line x1="-20" y1="16" x2="-88" y2="16" stroke="#38bdf8" strokeWidth="0.8" opacity="0.7" />
                <text
                  x="-85"
                  y="12"
                  fill="#7dd3fc"
                  fontSize="8.5"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                  letterSpacing="0.12em"
                  fontWeight="600"
                >
                  SEC.VAULT // AES
                </text>
              </g>
            </g>
          </g>

          {/* ========================================================================= */}
          {/* ORBITAL RING 2: Middle Inclined Orbit (Tilted +38°, Clockwise) */}
          {/* ========================================================================= */}
          <g transform="rotate(38 500 500)" style={{ transformOrigin: '500px 500px' }}>
            {/* The faint elliptical orbital track */}
            <ellipse
              cx="500"
              cy="500"
              rx="390"
              ry="180"
              fill="none"
              stroke="url(#orbitGradIndigo)"
              strokeWidth="1.3"
              strokeDasharray="8 6"
              opacity="0.55"
            />
            <ellipse
              cx="500"
              cy="500"
              rx="393"
              ry="183"
              fill="none"
              stroke="#6366f1"
              strokeWidth="0.5"
              opacity="0.2"
            />

            {/* Rotating Data Node Carrier on Orbit 2 */}
            <g
              className="animate-orbit-cw-1"
              style={{ transformOrigin: '500px 500px' }}
            >
              {/* Data Node 2A: DATALINK.SYNC // 10G */}
              <g transform="translate(890, 500)">
                <circle cx="0" cy="0" r="4" fill="#818cf8" filter="url(#orbitalNodeGlow)" />
                <circle cx="0" cy="0" r="8" fill="none" stroke="#818cf8" strokeWidth="1" opacity="0.6" />
                <line x1="6" y1="-6" x2="24" y2="-18" stroke="#818cf8" strokeWidth="0.8" opacity="0.7" />
                <line x1="24" y1="-18" x2="108" y2="-18" stroke="#818cf8" strokeWidth="0.8" opacity="0.7" />
                <text
                  x="28"
                  y="-22"
                  fill="#c7d2fe"
                  fontSize="9"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                  letterSpacing="0.12em"
                  fontWeight="600"
                >
                  DATALINK // 10G-ETH
                </text>
              </g>

              {/* Data Node 2B: NEURAL.BUS // ACTV */}
              <g transform="translate(110, 500)">
                <circle cx="0" cy="0" r="3.5" fill="#06b6d4" filter="url(#orbitalNodeGlow)" />
                <circle cx="0" cy="0" r="7" fill="none" stroke="#06b6d4" strokeWidth="0.8" opacity="0.5" />
                <line x1="-5" y1="5" x2="-22" y2="18" stroke="#06b6d4" strokeWidth="0.8" opacity="0.7" />
                <line x1="-22" y1="18" x2="-98" y2="18" stroke="#06b6d4" strokeWidth="0.8" opacity="0.7" />
                <text
                  x="-94"
                  y="14"
                  fill="#67e8f9"
                  fontSize="8.5"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                  letterSpacing="0.12em"
                  fontWeight="600"
                >
                  NEURAL.BUS // ACTV
                </text>
              </g>
            </g>
          </g>

          {/* ========================================================================= */}
          {/* ORBITAL RING 3: Outer Distant Orbit (Tilted -65°, Slow Clockwise) */}
          {/* ========================================================================= */}
          <g transform="rotate(-65 500 500)" style={{ transformOrigin: '500px 500px' }}>
            {/* The faint elliptical orbital track */}
            <ellipse
              cx="500"
              cy="500"
              rx="470"
              ry="210"
              fill="none"
              stroke="url(#orbitGradEmerald)"
              strokeWidth="1.2"
              strokeDasharray="12 8"
              opacity="0.5"
            />

            {/* Rotating Data Node Carrier on Orbit 3 */}
            <g
              className="animate-orbit-cw-2"
              style={{ transformOrigin: '500px 500px' }}
            >
              {/* Data Node 3A: TOPOLOGY.MGR // OK */}
              <g transform="translate(970, 500)">
                <circle cx="0" cy="0" r="3.5" fill="#10b981" filter="url(#orbitalNodeGlow)" />
                <circle cx="0" cy="0" r="7" fill="none" stroke="#10b981" strokeWidth="0.8" opacity="0.6" />
                <line x1="6" y1="5" x2="22" y2="16" stroke="#10b981" strokeWidth="0.8" opacity="0.7" />
                <line x1="22" y1="16" x2="105" y2="16" stroke="#10b981" strokeWidth="0.8" opacity="0.7" />
                <text
                  x="26"
                  y="12"
                  fill="#6ee7b7"
                  fontSize="8.5"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                  letterSpacing="0.12em"
                  fontWeight="600"
                >
                  TOPOLOGY // NOMINAL
                </text>
              </g>

              {/* Data Node 3B: STORAGE.IOPS // NVMe */}
              <g transform="translate(30, 500)">
                <circle cx="0" cy="0" r="3" fill="#06b6d4" filter="url(#orbitalNodeGlow)" />
                <circle cx="0" cy="0" r="6" fill="none" stroke="#06b6d4" strokeWidth="0.8" opacity="0.5" />
                <line x1="-5" y1="-5" x2="-20" y2="-16" stroke="#06b6d4" strokeWidth="0.8" opacity="0.7" />
                <line x1="-20" y1="-16" x2="-95" y2="-16" stroke="#06b6d4" strokeWidth="0.8" opacity="0.7" />
                <text
                  x="-92"
                  y="-20"
                  fill="#67e8f9"
                  fontSize="8.5"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                  letterSpacing="0.12em"
                  fontWeight="600"
                >
                  IOPS.ARRAY // NVMe
                </text>
              </g>
            </g>
          </g>

          {/* ========================================================================= */}
          {/* ORBITAL RING 4: Steep Transverse Orbit (Tilted +72°, Counter-Clockwise) */}
          {/* ========================================================================= */}
          <g transform="rotate(72 500 500)" style={{ transformOrigin: '500px 500px' }}>
            <ellipse
              cx="500"
              cy="500"
              rx="440"
              ry="160"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="0.9"
              strokeDasharray="4 10"
              opacity="0.35"
            />

            <g
              className="animate-orbit-ccw-2"
              style={{ transformOrigin: '500px 500px' }}
            >
              {/* Data Node 4: DEV.CLUSTER // CLOUD */}
              <g transform="translate(940, 500)">
                <circle cx="0" cy="0" r="3.5" fill="#38bdf8" filter="url(#orbitalNodeGlow)" />
                <circle cx="0" cy="0" r="6.5" fill="none" stroke="#38bdf8" strokeWidth="0.8" opacity="0.6" />
                <line x1="5" y1="-5" x2="20" y2="-16" stroke="#38bdf8" strokeWidth="0.8" opacity="0.7" />
                <line x1="20" y1="-16" x2="98" y2="-16" stroke="#38bdf8" strokeWidth="0.8" opacity="0.7" />
                <text
                  x="24"
                  y="-20"
                  fill="#7dd3fc"
                  fontSize="8.5"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                  letterSpacing="0.12em"
                  fontWeight="600"
                >
                  DEV.CORE // CLOUD
                </text>
              </g>
            </g>
          </g>
        </svg>
      </div>

      {/* 5. Centerpiece: Official Portfolio Logo & Systems Monogram */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Monogram Outer Glassmorphic Housing */}
        <div className="relative mb-7 animate-logo-glow">
          {/* Ambient Glow Background Orb */}
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/25 via-emerald-500/20 to-indigo-500/25 rounded-3xl blur-2xl opacity-75 animate-pulse" />

          {/* Precision Glass Container */}
          <div className="relative h-28 w-28 sm:h-32 sm:w-32 md:h-36 md:w-36 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-cyan-500/40 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-4 shadow-2xl shadow-cyan-950/60 hover:border-cyan-400/70 transition-all duration-300">
            {/* The Official Monogram SVG (matching Logo.tsx) */}
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full transform transition-transform duration-500"
              aria-label="Alexander Yadao Official Monogram"
            >
              <defs>
                <linearGradient id="load-ay-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="60%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <filter id="load-logo-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="0.8" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Terminal bracket accents `<` and `>` */}
              <path
                d="M 5.5 11 L 3 16 L 5.5 21"
                stroke="url(#load-ay-gradient)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-75"
              />
              <path
                d="M 26.5 11 L 29 16 L 26.5 21"
                stroke="url(#load-ay-gradient)"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-75"
              />

              {/* Letter 'A' outer geometric chevron & legs */}
              <path
                d="M 8.5 24.5 L 16 6.5 L 23.5 24.5"
                stroke="url(#load-ay-gradient)"
                strokeWidth="2.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#load-logo-glow)"
              />

              {/* Horizontal crossbar for 'A' with circuit split */}
              <path
                d="M 11.2 17.5 L 13.8 17.5 M 18.2 17.5 L 20.8 17.5"
                stroke="url(#load-ay-gradient)"
                strokeWidth="2.0"
                strokeLinecap="round"
              />

              {/* Letter 'Y' upper fork & central data bus / stem */}
              <path
                d="M 11.5 12.5 L 16 17.5 L 20.5 12.5"
                stroke="url(#load-ay-gradient)"
                strokeWidth="2.0"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 16 17.5 L 16 25.5"
                stroke="url(#load-ay-gradient)"
                strokeWidth="2.3"
                strokeLinecap="round"
                filter="url(#load-logo-glow)"
              />

              {/* Circuit nodes / terminal connection pads */}
              <circle cx="16" cy="6.5" r="1.4" fill="#06b6d4" />
              <circle cx="8.5" cy="24.5" r="1.4" fill="#10b981" />
              <circle cx="23.5" cy="24.5" r="1.4" fill="#10b981" />
              <circle cx="16" cy="25.5" r="1.6" fill="#10b981" />
              <circle cx="16" cy="17.5" r="1.2" fill="#06b6d4" />
            </svg>

            {/* Online Status Beacon Pulse (Matching Logo.tsx) */}
            <span
              className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center"
              title="System Online"
            >
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
            </span>
          </div>
        </div>

        {/* 6. Typography: Personal Brand & Domain Engineering */}
        <div className="flex flex-col items-center text-center space-y-1.5 mb-6 max-w-sm sm:max-w-md">
          <h1 className="text-white text-base sm:text-lg md:text-xl font-bold tracking-[0.28em] uppercase drop-shadow-[0_0_16px_rgba(6,182,212,0.4)]">
            ALEXANDER CHRISTIAN R. YADAO
          </h1>
          <p className="text-cyan-400/90 text-[11px] sm:text-xs font-mono font-medium tracking-[0.25em] uppercase">
            SYSTEMS & COMPUTER ENGINEERING
          </p>
        </div>

        {/* 7. Progress HUD & High-Tech Telemetry */}
        <div className="flex flex-col items-center w-64 sm:w-80 md:w-96 space-y-3">
          {/* Slender Neon Gradient Progress Track */}
          <div className="relative w-full h-1.5 sm:h-2 bg-slate-900/90 rounded-full overflow-hidden border border-cyan-500/30 p-[1px] shadow-inner shadow-black">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 transition-all duration-75 ease-out shadow-[0_0_12px_rgba(6,182,212,0.8)]"
              style={{ width: `${percent}%` }}
            />
          </div>

          {/* Real-time Status Readout & Percentage Counter */}
          <div className="w-full flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-wider">
            <div className="flex items-center gap-1.5 text-cyan-300/80 truncate pr-2">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0" />
              <span className="truncate">{getOrbitalStatus(percent)}</span>
            </div>
            <div className="text-cyan-300 font-bold tracking-widest shrink-0 pl-1 font-mono">
              {percent}%
            </div>
          </div>

          {/* Telemetry Secondary Footer Bar */}
          <div className="w-full flex items-center justify-between pt-1 border-t border-cyan-500/10 text-[9px] sm:text-[10px] font-mono text-zinc-500">
            <span className="text-cyan-500/70">ORBITAL SYNC // NOMINAL</span>
            <span className="text-zinc-400/80">LATENCY: 12ms</span>
            <span className="text-emerald-400/70">STATE: 0x00</span>
          </div>
        </div>
      </div>
    </div>
  );
};
