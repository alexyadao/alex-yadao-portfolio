import React, { useState, useEffect, useMemo } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [flickerState, setFlickerState] = useState(0);

  // Generate deterministic digital noise and telemetry blocks matching image.png
  const telemetryData = useMemo(() => [
    '0.435 905',
    '834.5 372 -0',
    '194.5 355 -0',
    '3345.6 2005 0-0',
    '173.2 245 0-0',
    '0.435 905',
    '0.435 905',
  ], []);

  // Grid blocks status matrix on right side
  const gridBlocks = useMemo(() => {
    return Array.from({ length: 48 }, (_, i) => ({
      id: i,
      active: (i * 7 + 3) % 5 !== 0,
      bright: i % 4 === 0,
    }));
  }, []);

  useEffect(() => {
    // Progress increment over ~2.5 seconds
    const duration = 2500;
    const startTime = performance.now();
    let animId: number;

    const updateProgress = (now: number) => {
      const elapsed = now - startTime;
      const fraction = Math.min(elapsed / duration, 1);
      
      // Cyberpunk easing: fast bursts and steady progression
      const currentVal = Math.floor(fraction * 100);
      setProgress(currentVal);

      if (fraction < 1) {
        animId = requestAnimationFrame(updateProgress);
      } else {
        // Trigger smooth graceful fade-out
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            onComplete();
          }, 700);
        }, 300);
      }
    };

    animId = requestAnimationFrame(updateProgress);

    // Subtle random micro-flicker loop
    const flickerInterval = setInterval(() => {
      setFlickerState((prev) => (prev + 1) % 10);
    }, 180);

    // Hard safety timeout (3.5s max)
    const safetyTimeout = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        onComplete();
      }, 700);
    }, 3500);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(flickerInterval);
      clearTimeout(safetyTimeout);
    };
  }, [onComplete]);

  return (
    <div
      aria-label="Cyberpunk System Boot"
      className={`fixed inset-0 z-50 bg-[#0a0f1d] font-mono text-cyan-400 overflow-hidden flex flex-col justify-between p-3 sm:p-6 select-none transition-all duration-700 ${
        isFadingOut ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background CRT Scanlines & Digital Mesh */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 opacity-30"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(6, 182, 212, 0.08) 0px, rgba(6, 182, 212, 0.08) 1px, transparent 1px, transparent 3px)',
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none z-10 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Cybernetic HUD Frame Outer Border (Matching Image.png) */}
      <div className="absolute inset-2 sm:inset-4 border border-cyan-500/40 rounded-2xl pointer-events-none shadow-[inset_0_0_25px_rgba(6,182,212,0.15)]">
        {/* Frame corner chamfer cuts / ticks */}
        <div className="absolute -top-1 left-8 w-16 h-2 bg-[#0a0f1d] border-b border-cyan-400" />
        <div className="absolute -bottom-1 right-8 w-24 h-2 bg-[#0a0f1d] border-t border-cyan-400" />
        <div className="absolute -left-1 top-12 h-16 w-2 bg-[#0a0f1d] border-r border-cyan-400" />
        <div className="absolute -right-1 bottom-12 h-16 w-2 bg-[#0a0f1d] border-l border-cyan-400" />
      </div>

      {/* ======================================================== */}
      {/* 1. TOP HUD: Status, Glitching Title, Window Controls     */}
      {/* ======================================================== */}
      <header className="relative z-20 flex items-center justify-between w-full px-2 pt-1 text-xs">
        {/* Top Left: Systems Nominal Indicator */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          </span>
          <span className="text-zinc-200 font-semibold tracking-wider text-xs sm:text-sm drop-shadow-[0_0_6px_rgba(6,182,212,0.6)]">
            Systems Nominal
          </span>
        </div>

        {/* Top Center: Glitching Engineer Name & Telemetry */}
        <div className="hidden sm:flex items-center gap-2 text-cyan-300 font-bold tracking-widest text-[11px] md:text-xs">
          <span className="text-cyan-500/80">--</span>
          <span className="glitch-text drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
            ALEXANDER CHRISTIAN R. YADAO // SYSTEMS ENG
          </span>
          <span className="text-cyan-500/80">--</span>
        </div>

        {/* Top Right: Futuristic Window Controls _ ▢ ✕ */}
        <div className="flex items-center gap-3 text-cyan-400/80 font-mono text-xs sm:text-sm">
          <span className="hover:text-cyan-200 cursor-default transition-colors">_</span>
          <span className="hover:text-cyan-200 cursor-default transition-colors">▢</span>
          <span className="hover:text-rose-400 cursor-default transition-colors">✕</span>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. CENTER SECTION: Reticles, Moving ECG & "Walking" Logo */}
      {/* ======================================================== */}
      <main className="relative z-20 flex-1 flex items-center justify-center w-full my-auto overflow-hidden">
        
        {/* Left Side Targeting Reticle (from image.png) */}
        <div className="absolute left-4 sm:left-10 md:left-20 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center opacity-60 pointer-events-none">
          <div className="relative w-28 h-28 lg:w-36 lg:h-36 rounded-full border border-cyan-500/40 flex items-center justify-center animate-[spin_20s_linear_infinite]">
            <div className="absolute inset-2 rounded-full border border-dashed border-cyan-400/30" />
            <div className="w-12 h-12 rounded-full border border-cyan-400/60 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_6px_#06b6d4]" />
            </div>
            {/* Crosshairs */}
            <div className="absolute inset-x-0 h-[1px] bg-cyan-500/40" />
            <div className="absolute inset-y-0 w-[1px] bg-cyan-500/40" />
          </div>
          {/* Diagnostic Subtext below reticle */}
          <div className="mt-4 text-[9px] text-cyan-400/70 font-mono space-y-0.5 text-left w-full">
            <div>LOADS: S115ve</div>
            <div>[MEM] Ready</div>
            <div>BUS: 384-bit</div>
          </div>
        </div>

        {/* Right Side Radar Sweeper & Hex Grid (from image.png) */}
        <div className="absolute right-4 sm:right-10 md:right-20 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center opacity-60 pointer-events-none">
          <div className="relative w-24 h-24 lg:w-32 lg:h-32 rounded-full border border-cyan-500/40 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(6,182,212,0.25)_60deg,transparent_60deg)] animate-[spin_4s_linear_infinite]" />
            <div className="w-12 h-12 rounded-full border border-cyan-400/50" />
            <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_6px_#10b981]" />
          </div>
          <div className="mt-3 text-[9px] text-cyan-400/70 font-mono space-y-0.5 text-right w-full">
            <div>RADAR: LOCK</div>
            <div>FREQ: 2.45 GHz</div>
            <div>STATUS: NOMINAL</div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* Moving Zigzag Signal Overlay (Oscilloscope/ECG Trace) */}
        {/* ---------------------------------------------------- */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-44 sm:h-56 w-full pointer-events-none overflow-hidden flex items-center">
          {/* Subtle horizontal glow baseline */}
          <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
          
          {/* Dual Seamless Scrolling High-Glow Zigzag SVGs */}
          <div className="flex w-[200%] animate-pulse-trace">
            {/* SVG Wave Tile 1 */}
            <svg
              className="w-1/2 h-44 sm:h-56 shrink-0"
              viewBox="0 0 1000 200"
              fill="none"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="zigzag-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur1" />
                  <feGaussianBlur stdDeviation="6" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                  <stop offset="25%" stopColor="#22d3ee" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
                  <stop offset="75%" stopColor="#22d3ee" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              {/* Digital Pulse Wave matching Image.png: flats interspersed with sharp energetic peaks */}
              <path
                d="M 0 100 
                   L 80 100 L 95 85 L 110 100 
                   L 150 100 L 175 140 L 200 45 L 225 155 L 250 30 L 275 160 L 300 100 
                   L 370 100 L 390 120 L 410 70 L 430 130 L 450 100
                   L 550 100 L 580 40 L 610 160 L 640 25 L 670 175 L 700 100
                   L 780 100 L 800 65 L 820 135 L 840 100
                   L 920 100 L 940 75 L 960 125 L 980 100 L 1000 100"
                stroke="url(#wave-grad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#zigzag-glow)"
              />

              {/* Floating Sparkles & Telemetry Nodes */}
              <circle cx="200" cy="45" r="3" fill="#22d3ee" className="animate-ping" />
              <circle cx="250" cy="30" r="3" fill="#10b981" />
              <circle cx="640" cy="25" r="3.5" fill="#22d3ee" className="animate-ping" />
              <circle cx="670" cy="175" r="3" fill="#10b981" />
            </svg>

            {/* SVG Wave Tile 2 (Seamless loop pair) */}
            <svg
              className="w-1/2 h-44 sm:h-56 shrink-0"
              viewBox="0 0 1000 200"
              fill="none"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 0 100 
                   L 80 100 L 95 85 L 110 100 
                   L 150 100 L 175 140 L 200 45 L 225 155 L 250 30 L 275 160 L 300 100 
                   L 370 100 L 390 120 L 410 70 L 430 130 L 450 100
                   L 550 100 L 580 40 L 610 160 L 640 25 L 670 175 L 700 100
                   L 780 100 L 800 65 L 820 135 L 840 100
                   L 920 100 L 940 75 L 960 125 L 980 100 L 1000 100"
                stroke="url(#wave-grad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#zigzag-glow)"
              />
            </svg>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* The Center "Walking" Cyberpunk Glitch Monogram Logo */}
        {/* ---------------------------------------------------- */}
        <div className="relative z-30 flex items-center justify-center">
          
          {/* Animated Ambient Backdrop Corona / Glitch Core */}
          <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-3xl scale-125 animate-pulse pointer-events-none" />

          {/* "Walking" Autonomous Animated Container */}
          <div
            className="walking-logo relative flex items-center justify-center p-3 sm:p-5"
            style={{
              animation: 'cyber-walk 1.6s infinite ease-in-out',
            }}
          >
            {/* Holographic Cyan Brackets Frame with Status Ticks */}
            <div className="absolute -inset-3 sm:-inset-6 border border-cyan-500/30 rounded-2xl pointer-events-none">
              <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
              <span className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
              <span className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
              <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
              
              {/* Micro Status lights on bracket edges */}
              <span className="absolute top-1/2 -left-1 w-1.5 h-1.5 bg-cyan-400 -translate-y-1/2 rounded-full animate-ping" />
              <span className="absolute top-1/2 -right-1 w-1.5 h-1.5 bg-emerald-400 -translate-y-1/2 rounded-full" />
            </div>

            {/* Large High-Voltage Monogram Emblem (Exact Letter {A} / {AY} geometry from image.png) */}
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 flex items-center justify-center">
              
              {/* Chromatic aberration glitch ghost: Magenta/Pink Layer */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-60 mix-blend-screen"
                style={{
                  transform: flickerState % 3 === 0 ? 'translate(3px, -1px)' : 'translate(1.5px, 0px)',
                  filter: 'drop-shadow(0 0 10px rgba(244, 63, 94, 0.8))',
                }}
              >
                <CyberLogoSvg strokeColor="#f43f5e" accentColor="#fb7185" />
              </div>

              {/* Chromatic aberration glitch ghost: Cyan/Electric Layer */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-60 mix-blend-screen"
                style={{
                  transform: flickerState % 4 === 0 ? 'translate(-3px, 2px)' : 'translate(-1.5px, 0px)',
                  filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.8))',
                }}
              >
                <CyberLogoSvg strokeColor="#06b6d4" accentColor="#38bdf8" />
              </div>

              {/* Primary High-Glow Monogram Layer */}
              <div 
                className="relative z-10 w-full h-full drop-shadow-[0_0_20px_rgba(34,211,238,0.9)]"
                style={{
                  clipPath: flickerState === 7 ? 'polygon(0 15%, 100% 15%, 100% 85%, 0 85%)' : 'none',
                }}
              >
                <CyberLogoSvg strokeColor="#22d3ee" accentColor="#10b981" />
              </div>

              {/* Glitch Horizontal Scan Slice Artifacts */}
              <div className="absolute inset-x-0 top-1/4 h-[3px] bg-cyan-300/40 blur-[1px] pointer-events-none animate-pulse" />
              <div className="absolute inset-x-0 top-2/3 h-[2px] bg-rose-400/40 blur-[1px] pointer-events-none" />
            </div>
          </div>
        </div>
      </main>

      {/* ======================================================== */}
      {/* 3. BOTTOM HUD: Diagnostics Stream, Center Bar, Matrix    */}
      {/* ======================================================== */}
      <footer className="relative z-20 w-full px-2 pb-1 flex flex-col md:flex-row items-end md:items-center justify-between gap-4">
        
        {/* Bottom Left: Diagnostics & Kernel Stream (Matching Image.png) */}
        <div className="w-full md:w-auto text-left text-xs leading-relaxed">
          <div className="text-zinc-200 font-mono text-[11px] sm:text-xs">
            <span className="text-cyan-400 font-bold">[KERNEL]</span> Initialization successful
          </div>
          <div className="text-cyan-300 font-mono text-[11px] sm:text-xs">
            A.Y. CORE Active
          </div>
          <div className="text-emerald-400 font-mono font-bold text-xs sm:text-sm tracking-wider flex items-center gap-1.5">
            LOADING: {progress}%
            <span className="inline-block w-2 h-3.5 bg-cyan-400 animate-pulse" />
          </div>
        </div>

        {/* Bottom Center: High-Tech Progress Bar with Calibrated Ruler Ticks */}
        <div className="w-full md:max-w-md mx-auto flex flex-col items-center">
          {/* Neon Loader Bar Container */}
          <div className="h-2 sm:h-2.5 border border-cyan-500/40 bg-cyan-950/40 p-[1.5px] rounded w-full backdrop-blur-md shadow-[0_0_12px_rgba(6,182,212,0.3)]">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-teal-300 to-emerald-400 rounded-sm transition-all duration-75 ease-out shadow-[0_0_14px_rgba(34,211,238,0.9)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Precision Ruler Calibration Ticks (as seen in Image.png) */}
          <div className="w-full flex justify-between items-center text-[8px] text-cyan-500/60 font-mono mt-1 px-0.5 select-none">
            <span>|</span>
            <span>·</span>
            <span>·</span>
            <span>|</span>
            <span>·</span>
            <span>·</span>
            <span>|</span>
            <span>·</span>
            <span>·</span>
            <span>|</span>
            <span>·</span>
            <span>·</span>
            <span>|</span>
            <span>·</span>
            <span>·</span>
            <span>|</span>
          </div>
        </div>

        {/* Bottom Right: Status Indicator & Hex Block Matrix (from Image.png) */}
        <div className="hidden sm:flex flex-col items-end gap-2 text-right">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-zinc-300 text-[11px] font-mono">Systems Nominal</span>
          </div>

          {/* Telemetry LED Status Block Matrix */}
          <div className="grid grid-cols-8 gap-1 p-1 bg-slate-950/60 rounded border border-cyan-500/20">
            {gridBlocks.map((block) => (
              <div
                key={block.id}
                className={`w-1.5 h-1.5 rounded-[1px] transition-colors duration-300 ${
                  block.bright
                    ? 'bg-cyan-400 shadow-[0_0_4px_#22d3ee]'
                    : block.active
                    ? 'bg-cyan-700/60'
                    : 'bg-zinc-800'
                }`}
              />
            ))}
          </div>
        </div>
      </footer>

      {/* Embedded Animation Styles for "Walking" Logo and Pulse Oscilloscope */}
      <style>{`
        @keyframes cyber-walk {
          0% {
            transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
          }
          20% {
            transform: translateY(-3px) translateX(2px) scale(1.02) rotate(0.5deg);
          }
          40% {
            transform: translateY(1px) translateX(-2px) scale(0.99) rotate(-0.5deg);
          }
          60% {
            transform: translateY(-2px) translateX(3px) scale(1.01) rotate(0.4deg);
          }
          80% {
            transform: translateY(2px) translateX(-1px) scale(0.98) rotate(-0.3deg);
          }
          100% {
            transform: translateY(0px) translateX(0px) scale(1) rotate(0deg);
          }
        }

        @keyframes pulse-trace {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-pulse-trace {
          animation: pulse-trace 4s linear infinite;
        }

        .glitch-text {
          position: relative;
        }
        .glitch-text::before {
          content: attr(data-text);
          position: absolute;
          left: -2px;
          text-shadow: 2px 0 #f43f5e;
          clip: rect(24px, 550px, 90px, 0);
        }
      `}</style>
    </div>
  );
};

/**
 * High-Precision Vector Component for the Center Cyberpunk "A" Monogram
 * Faithfully matches the geometric inner-chevron, dual-stroke, and circuits from Image.png
 */
const CyberLogoSvg: React.FC<{ strokeColor: string; accentColor: string }> = ({
  strokeColor,
  accentColor,
}) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full"
  >
    <defs>
      <linearGradient id="cyber-a-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={strokeColor} />
        <stop offset="50%" stopColor="#ffffff" />
        <stop offset="100%" stopColor={accentColor} />
      </linearGradient>
    </defs>

    {/* Outermost Tech Bracket Accents */}
    <path
      d="M 12 32 L 6 50 L 12 68"
      stroke={strokeColor}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.8"
    />
    <path
      d="M 88 32 L 94 50 L 88 68"
      stroke={strokeColor}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.8"
    />

    {/* Letter 'A' Heavy Outer Contour (Image.png) */}
    <path
      d="M 22 84 L 50 16 L 78 84"
      stroke="url(#cyber-a-gradient)"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Secondary Concentric Inner Stroke */}
    <path
      d="M 31 78 L 50 32 L 69 78"
      stroke={strokeColor}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.9"
    />

    {/* Triangular Central Core Cutout */}
    <polygon
      points="50,42 41,64 59,64"
      stroke={accentColor}
      strokeWidth="3.5"
      fill="none"
      strokeLinejoin="round"
    />

    {/* Horizontal High-Tech Crossbar Bus */}
    <path
      d="M 27 64 L 73 64"
      stroke="url(#cyber-a-gradient)"
      strokeWidth="4"
      strokeLinecap="round"
    />

    {/* Central Data Stem (Letter 'Y' harmony) */}
    <path
      d="M 50 64 L 50 86"
      stroke={accentColor}
      strokeWidth="4"
      strokeLinecap="round"
    />

    {/* Corner Circuit Pins / Terminals */}
    <circle cx="50" cy="16" r="3" fill="#ffffff" />
    <circle cx="22" cy="84" r="3.5" fill={accentColor} />
    <circle cx="78" cy="84" r="3.5" fill={accentColor} />
    <circle cx="50" cy="86" r="3" fill="#ffffff" />

    {/* Micro Glitch Chips / Horizontal Blocks on Legs */}
    <rect x="36" y="26" width="6" height="2" fill={strokeColor} opacity="0.9" />
    <rect x="58" y="26" width="6" height="2" fill={accentColor} opacity="0.9" />
    <rect x="18" y="52" width="7" height="2.5" fill={strokeColor} />
    <rect x="75" y="52" width="7" height="2.5" fill={strokeColor} />
    <rect x="47" y="72" width="6" height="2" fill="#ffffff" />
  </svg>
);
