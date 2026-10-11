import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Progress increment from 0% to 100% over precisely 4.4 seconds (4400ms)
    const totalDuration = 4400;
    const startTime = performance.now();
    let animFrameId: number;

    const animateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const fraction = Math.min(elapsed / totalDuration, 1);

      // Smooth hardware clock progression curve
      const easedFraction =
        fraction < 0.5
          ? 2 * fraction * fraction
          : 1 - Math.pow(-2 * fraction + 2, 2) / 2;

      const currentPercent = Math.min(Math.floor(easedFraction * 100), 100);
      setProgress(currentPercent);

      if (fraction < 1) {
        animFrameId = requestAnimationFrame(animateProgress);
      } else {
        // Upon reaching 100%, trigger smooth exit
        const exitTimer = setTimeout(() => {
          setIsFadingOut(true);
          const completeTimer = setTimeout(() => {
            onComplete();
          }, 700);
          return () => clearTimeout(completeTimer);
        }, 300);
        return () => clearTimeout(exitTimer);
      }
    };

    animFrameId = requestAnimationFrame(animateProgress);

    // Safety fallback timeout (6.0s max) to guarantee the screen never hangs
    const safetyTimeout = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        onComplete();
      }, 700);
    }, 6000);

    return () => {
      cancelAnimationFrame(animFrameId);
      clearTimeout(safetyTimeout);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#03050a] flex flex-col items-center justify-center p-4 overflow-hidden select-none transition-opacity duration-700 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="System Initializing"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Scoped CSS animations for logic clock flow, circuit pulses & monogram jitter */}
      <style>{`
        @keyframes clockStreamLoop {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes dataPacketPulse {
          0% {
            transform: translateX(-20%);
            opacity: 0;
          }
          15% {
            opacity: 0.9;
          }
          85% {
            opacity: 0.9;
          }
          100% {
            transform: translateX(120%);
            opacity: 0;
          }
        }

        @keyframes cyberMonogramGlitch {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            filter: drop-shadow(0 0 16px rgba(6,182,212,0.85)) drop-shadow(0 0 32px rgba(56,189,248,0.5));
          }
          10% {
            transform: translate(1px, -0.5px) scale(1.015);
            filter: drop-shadow(2px 0 0 rgba(56,189,248,0.6)) drop-shadow(-2px 0 0 rgba(6,182,212,0.7)) drop-shadow(0 0 20px rgba(6,182,212,0.9));
          }
          14% {
            transform: translate(-0.5px, 0.5px) scale(0.99);
            opacity: 0.94;
          }
          18% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          42% {
            transform: translate(-1px, -0.5px) scale(1.02);
            filter: drop-shadow(-2px 0 0 rgba(56,189,248,0.5)) drop-shadow(2px 0 0 rgba(6,182,212,0.8)) drop-shadow(0 0 24px rgba(6,182,212,0.85));
          }
          46% {
            transform: translate(0.5px, 0.5px) scale(0.985);
            opacity: 0.92;
          }
          50% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          72% {
            transform: translate(1.5px, 0.5px) scale(1.01);
            filter: drop-shadow(2px 0 0 rgba(14,165,233,0.6)) drop-shadow(-2px 0 0 rgba(6,182,212,0.7)) drop-shadow(0 0 18px rgba(6,182,212,0.8));
          }
          76% {
            transform: translate(-1px, -1px) scale(0.995);
          }
          80% {
            transform: translate(0, 0) scale(1);
          }
          94% {
            transform: translate(-0.5px, 0.8px) scale(1.008);
            opacity: 0.95;
          }
          96% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
        }

        .clock-stream-anim {
          animation: clockStreamLoop 4s linear infinite;
        }

        .data-packet-anim {
          animation: dataPacketPulse 2.8s ease-in-out infinite;
        }

        .monogram-glitch-anim {
          animation: cyberMonogramGlitch 2.6s cubic-bezier(0.25, 1, 0.5, 1) infinite;
        }
      `}</style>

      {/* Subtle backdrop: Faint coordinate grid in deep cobalt void (entirely borderless, no windows, no outlines) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 70%),
            linear-gradient(to right, rgba(6, 182, 212, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(6, 182, 212, 0.12) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 60px 60px, 60px 60px',
        }}
      />

      {/* Deep Cobalt & Electric Cyan Radial Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_75%_55%_at_50%_50%,rgba(6,182,212,0.07),rgba(2,132,199,0.03)_60%,transparent_80%)]" />

      {/* ========================================================================= */}
      {/* 1. DIGITAL HARDWARE LOGIC CLOCK / CIRCUIT TRACE BACKGROUND ACCENT         */}
      {/* ========================================================================= */}
      <div className="absolute left-0 right-0 w-full top-1/2 -translate-y-1/2 h-44 md:h-60 pointer-events-none overflow-hidden opacity-35 z-0 flex items-center">
        
        {/* Continuous Seamless Horizontally Streaming Logic Clock Waveform */}
        <div className="relative w-[200%] h-full flex shrink-0 clock-stream-anim">
          
          {/* Waveform Segment 1 */}
          <svg
            viewBox="0 0 1200 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-1/2 h-full shrink-0 overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="logic-clock-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                <stop offset="30%" stopColor="#06b6d4" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="1" />
                <stop offset="70%" stopColor="#0284c7" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
              </linearGradient>

              <filter id="clock-glow" x="-10%" y="-40%" width="120%" height="180%">
                <feGaussianBlur stdDeviation="1.8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Timing Grid Tick Marks (T0, T1, T2... clock cycle indicators) */}
            <g stroke="#06b6d4" strokeOpacity="0.22" strokeWidth="1" strokeDasharray="2 4">
              <line x1="0" y1="18" x2="0" y2="122" />
              <line x1="100" y1="18" x2="100" y2="122" />
              <line x1="200" y1="18" x2="200" y2="122" />
              <line x1="300" y1="18" x2="300" y2="122" />
              <line x1="400" y1="18" x2="400" y2="122" />
              <line x1="500" y1="18" x2="500" y2="122" />
              <line x1="600" y1="18" x2="600" y2="122" />
              <line x1="700" y1="18" x2="700" y2="122" />
              <line x1="800" y1="18" x2="800" y2="122" />
              <line x1="900" y1="18" x2="900" y2="122" />
              <line x1="1000" y1="18" x2="1000" y2="122" />
              <line x1="1100" y1="18" x2="1100" y2="122" />
              <line x1="1200" y1="18" x2="1200" y2="122" />
            </g>

            {/* Clock Ticks on Baseline */}
            <g stroke="#38bdf8" strokeOpacity="0.35" strokeWidth="1.5">
              <line x1="50" y1="92" x2="50" y2="98" />
              <line x1="150" y1="92" x2="150" y2="98" />
              <line x1="250" y1="92" x2="250" y2="98" />
              <line x1="350" y1="92" x2="350" y2="98" />
              <line x1="450" y1="92" x2="450" y2="98" />
              <line x1="550" y1="92" x2="550" y2="98" />
              <line x1="650" y1="92" x2="650" y2="98" />
              <line x1="750" y1="92" x2="750" y2="98" />
              <line x1="850" y1="92" x2="850" y2="98" />
              <line x1="950" y1="92" x2="950" y2="98" />
              <line x1="1050" y1="92" x2="1050" y2="98" />
              <line x1="1150" y1="92" x2="1150" y2="98" />
            </g>

            {/* Secondary Parallel Bus Trace (Circuit bus line with 45-degree angle jogs) */}
            <path
              d="
                M 0 110
                L 260 110 L 280 120 L 520 120 L 540 110 L 860 110 L 880 120 L 1140 120 L 1160 110 L 1200 110
              "
              stroke="#0284c7"
              strokeOpacity="0.25"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Stepped Digital Square Wave (Logic 0 / Logic 1 clock pulse stream) */}
            {/* Low (y=90) -> Sharp Rising Edge -> High (y=45) -> Sharp Falling Edge -> Low */}
            <path
              d="
                M 0 90
                L 50 90 L 50 45 L 100 45 L 100 90
                L 150 90 L 150 45 L 200 45 L 200 90
                L 250 90 L 250 45 L 300 45 L 300 90
                L 350 90 L 350 45 L 400 45 L 400 90
                L 450 90 L 450 45 L 500 45 L 500 90
                L 550 90 L 550 45 L 600 45 L 600 90
                L 650 90 L 650 45 L 700 45 L 700 90
                L 750 90 L 750 45 L 800 45 L 800 90
                L 850 90 L 850 45 L 900 45 L 900 90
                L 950 90 L 950 45 L 1000 45 L 1000 90
                L 1050 90 L 1050 45 L 1100 45 L 1100 90
                L 1150 90 L 1150 45 L 1200 45 L 1200 90
              "
              stroke="url(#logic-clock-grad)"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="miter"
              filter="url(#clock-glow)"
            />

            {/* Hardware Logic Vias / Bus Pads at Logic Clock Transitions */}
            <circle cx="50" cy="45" r="2" fill="#38bdf8" opacity="0.8" />
            <circle cx="150" cy="45" r="2" fill="#38bdf8" opacity="0.8" />
            <circle cx="250" cy="45" r="2" fill="#38bdf8" opacity="0.8" />
            <circle cx="350" cy="45" r="2" fill="#38bdf8" opacity="0.8" />
            <circle cx="450" cy="45" r="2" fill="#38bdf8" opacity="0.8" />
            <circle cx="550" cy="45" r="2" fill="#38bdf8" opacity="0.8" />
            <circle cx="650" cy="45" r="2" fill="#38bdf8" opacity="0.8" />
            <circle cx="750" cy="45" r="2" fill="#38bdf8" opacity="0.8" />
            <circle cx="850" cy="45" r="2" fill="#38bdf8" opacity="0.8" />
            <circle cx="950" cy="45" r="2" fill="#38bdf8" opacity="0.8" />
            <circle cx="1050" cy="45" r="2" fill="#38bdf8" opacity="0.8" />
            <circle cx="1150" cy="45" r="2" fill="#38bdf8" opacity="0.8" />
          </svg>

          {/* Waveform Segment 2 (Identical for continuous linear loop) */}
          <svg
            viewBox="0 0 1200 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-1/2 h-full shrink-0 overflow-visible"
            preserveAspectRatio="none"
          >
            <g stroke="#06b6d4" strokeOpacity="0.22" strokeWidth="1" strokeDasharray="2 4">
              <line x1="0" y1="18" x2="0" y2="122" />
              <line x1="100" y1="18" x2="100" y2="122" />
              <line x1="200" y1="18" x2="200" y2="122" />
              <line x1="300" y1="18" x2="300" y2="122" />
              <line x1="400" y1="18" x2="400" y2="122" />
              <line x1="500" y1="18" x2="500" y2="122" />
              <line x1="600" y1="18" x2="600" y2="122" />
              <line x1="700" y1="18" x2="700" y2="122" />
              <line x1="800" y1="18" x2="800" y2="122" />
              <line x1="900" y1="18" x2="900" y2="122" />
              <line x1="1000" y1="18" x2="1000" y2="122" />
              <line x1="1100" y1="18" x2="1100" y2="122" />
              <line x1="1200" y1="18" x2="1200" y2="122" />
            </g>

            <g stroke="#38bdf8" strokeOpacity="0.35" strokeWidth="1.5">
              <line x1="50" y1="92" x2="50" y2="98" />
              <line x1="150" y1="92" x2="150" y2="98" />
              <line x1="250" y1="92" x2="250" y2="98" />
              <line x1="350" y1="92" x2="350" y2="98" />
              <line x1="450" y1="92" x2="450" y2="98" />
              <line x1="550" y1="92" x2="550" y2="98" />
              <line x1="650" y1="92" x2="650" y2="98" />
              <line x1="750" y1="92" x2="750" y2="98" />
              <line x1="850" y1="92" x2="850" y2="98" />
              <line x1="950" y1="92" x2="950" y2="98" />
              <line x1="1050" y1="92" x2="1050" y2="98" />
              <line x1="1150" y1="92" x2="1150" y2="98" />
            </g>

            <path
              d="
                M 0 110
                L 260 110 L 280 120 L 520 120 L 540 110 L 860 110 L 880 120 L 1140 120 L 1160 110 L 1200 110
              "
              stroke="#0284c7"
              strokeOpacity="0.25"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            <path
              d="
                M 0 90
                L 50 90 L 50 45 L 100 45 L 100 90
                L 150 90 L 150 45 L 200 45 L 200 90
                L 250 90 L 250 45 L 300 45 L 300 90
                L 350 90 L 350 45 L 400 45 L 400 90
                L 450 90 L 450 45 L 500 45 L 500 90
                L 550 90 L 550 45 L 600 45 L 600 90
                L 650 90 L 650 45 L 700 45 L 700 90
                L 750 90 L 750 45 L 800 45 L 800 90
                L 850 90 L 850 45 L 900 45 L 900 90
                L 950 90 L 950 45 L 1000 45 L 1000 90
                L 1050 90 L 1050 45 L 1100 45 L 1100 90
                L 1150 90 L 1150 45 L 1200 45 L 1200 90
              "
              stroke="url(#logic-clock-grad)"
              strokeWidth="2"
              strokeLinecap="square"
              strokeLinejoin="miter"
              filter="url(#clock-glow)"
            />

            <circle cx="50" cy="45" r="2" fill="#38bdf8" opacity="0.8" />
            <circle cx="150" cy="45" r="2" fill="#38bdf8" opacity="0.8" />
            <circle cx="250" cy="45" r="2" fill="#38bdf8" opacity="0.8" />
            <circle cx="350" cy="45" r="2" fill="#38bdf8" opacity="0.8" />
            <circle cx="450" cy="45" r="2" fill="#38bdf8" opacity="0.8" />
            <circle cx="550" cy="45" r="2" fill="#38bdf8" opacity="0.8" />
            <circle cx="650" cy="45" r="2" fill="#38bdf8" opacity="0.8" />
            <circle cx="750" cy="45" r="2" fill="#38bdf8" opacity="0.8" />
            <circle cx="850" cy="45" r="2" fill="#38bdf8" opacity="0.8" />
            <circle cx="950" cy="45" r="2" fill="#38bdf8" opacity="0.8" />
            <circle cx="1050" cy="45" r="2" fill="#38bdf8" opacity="0.8" />
            <circle cx="1150" cy="45" r="2" fill="#38bdf8" opacity="0.8" />
          </svg>
        </div>

        {/* Streaming Data Packet Glow Beam (Gliding across clock trace) */}
        <div className="absolute inset-y-0 w-48 md:w-80 data-packet-anim pointer-events-none bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent blur-lg" />

        {/* Soft edge fade so wave enters and exits seamlessly with no hard container boxes */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#03050a] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#03050a] to-transparent pointer-events-none" />
      </div>

      {/* ========================================================================= */}
      {/* 2. CENTERPIECE: GLOWING ANIMATED MONOGRAM (CYAN / SKY BLUE / COBALT)      */}
      {/* ========================================================================= */}
      <div className="w-32 h-32 md:w-40 md:h-40 relative z-10 flex items-center justify-center">
        
        {/* Deep cobalt/cyan bloom behind monogram */}
        <div className="absolute inset-0 rounded-full bg-cyan-500/15 blur-2xl pointer-events-none" />

        {/* Glitch Monogram Container */}
        <div className="relative w-full h-full monogram-glitch-anim">
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
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>

              <filter id="monogram-glow-filter" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="0.8" result="blur1" />
                <feGaussianBlur stdDeviation="2.4" result="blur2" />
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
              filter="url(#monogram-glow-filter)"
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
              filter="url(#monogram-glow-filter)"
            />

            {/* Circuit Nodes / Terminal Pads (Electric Cyan & Sky Blue) */}
            <circle cx="16" cy="6.5" r="1.3" fill="#06b6d4" />
            <circle cx="8.5" cy="24.5" r="1.3" fill="#38bdf8" />
            <circle cx="23.5" cy="24.5" r="1.3" fill="#38bdf8" />
            <circle cx="16" cy="25.5" r="1.5" fill="#0284c7" />
            <circle cx="16" cy="17.5" r="1.1" fill="#06b6d4" />
          </svg>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. CENTERPIECE TYPOGRAPHY & MINIMAL PROGRESS INDICATOR                    */}
      {/* ========================================================================= */}
      <div className="mt-6 z-10 flex flex-col items-center text-center">
        
        {/* Name */}
        <h1 className="text-white text-sm font-bold tracking-[0.25em] uppercase">
          ALEXANDER CHRISTIAN R. YADAO
        </h1>

        {/* Tech Label */}
        <p className="text-cyan-400/70 tracking-[0.3em] text-[11px] font-mono mt-1 uppercase">
          INITIALIZING SYSTEM KERNEL...
        </p>

        {/* Minimal Loading Bar: Thin neon-cyan line filled over 4.4 seconds */}
        <div className="h-[2px] max-w-[160px] w-full bg-cyan-950/60 rounded-full overflow-hidden mt-3.5 z-10">
          <div
            className="bg-gradient-to-r from-cyan-500 via-sky-400 to-cyan-300 shadow-[0_0_8px_#06b6d4] h-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>
    </div>
  );
};
