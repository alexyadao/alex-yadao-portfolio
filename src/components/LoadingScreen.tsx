import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Increments smoothly from 0% to 100% over precisely 5.5 seconds (5500ms)
    const totalDuration = 5500;
    const startTime = performance.now();
    let animFrameId: number;

    const animateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressFraction = Math.min(elapsed / totalDuration, 1);

      // Smooth silicon architecture clock calibration curve
      const eased =
        progressFraction < 0.5
          ? 2 * progressFraction * progressFraction
          : 1 - Math.pow(-2 * progressFraction + 2, 2) / 2;

      const currentVal = Math.min(Math.floor(eased * 100), 100);
      setPercent(currentVal);

      if (progressFraction < 1) {
        animFrameId = requestAnimationFrame(animateProgress);
      } else {
        // When percent reaches 100: trigger exit state, wait 600ms, then invoke onComplete
        const exitTimer = setTimeout(() => {
          setIsExiting(true);
          const completeTimer = setTimeout(() => {
            onComplete();
          }, 600);
          return () => clearTimeout(completeTimer);
        }, 150);
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
      aria-label="Silicon Architecture Initializing"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Scoped Keyframes for Cyber Monogram Pulse & Traveling PCB Data Surges */}
      <style>{`
        @keyframes cyberPulse {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            filter: drop-shadow(0 0 16px rgba(6, 182, 212, 0.75));
          }
          8% {
            transform: translate(1px, -0.5px) scale(1.02);
            filter: drop-shadow(2px 0 0 rgba(236, 72, 153, 0.5)) drop-shadow(-2px 0 0 rgba(6, 182, 212, 0.6)) drop-shadow(0 0 20px rgba(6, 182, 212, 0.9));
          }
          12% {
            transform: translate(-0.5px, 0.5px) scale(0.99);
          }
          16% {
            transform: translate(0, 0) scale(1);
            filter: drop-shadow(0 0 16px rgba(6, 182, 212, 0.75));
          }
          45% {
            transform: translate(-1px, -0.5px) scale(1.015);
            filter: drop-shadow(-2px 0 0 rgba(236, 72, 153, 0.45)) drop-shadow(2px 0 0 rgba(6, 182, 212, 0.7)) drop-shadow(0 0 24px rgba(34, 211, 238, 0.9));
          }
          49% {
            transform: translate(0.5px, 0.5px) scale(0.995);
          }
          53% {
            transform: translate(0, 0) scale(1);
            filter: drop-shadow(0 0 16px rgba(6, 182, 212, 0.75));
          }
          82% {
            transform: translate(1.2px, 0.5px) scale(1.01);
            filter: drop-shadow(2px 0 0 rgba(236, 72, 153, 0.5)) drop-shadow(-2px 0 0 rgba(6, 182, 212, 0.6)) drop-shadow(0 0 18px rgba(6, 182, 212, 0.8));
          }
          86% {
            transform: translate(-1px, -1px) scale(0.99);
          }
          90% {
            transform: translate(0, 0) scale(1);
            filter: drop-shadow(0 0 16px rgba(6, 182, 212, 0.75));
          }
        }

        @keyframes pcbFlowForward {
          0% {
            stroke-dashoffset: 600;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        @keyframes pcbFlowBackward {
          0% {
            stroke-dashoffset: -600;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }

        .monogram-cyber-pulse {
          animation: cyberPulse 2.8s cubic-bezier(0.25, 1, 0.5, 1) infinite;
        }

        .pcb-pulse-stream-1 {
          stroke-dasharray: 80 400;
          animation: pcbFlowForward 3.2s linear infinite;
        }

        .pcb-pulse-stream-2 {
          stroke-dasharray: 60 360;
          animation: pcbFlowForward 2.6s linear infinite;
        }

        .pcb-pulse-stream-3 {
          stroke-dasharray: 90 420;
          animation: pcbFlowBackward 3.6s linear infinite;
        }

        .pcb-pulse-stream-4 {
          stroke-dasharray: 70 380;
          animation: pcbFlowBackward 3.0s linear infinite;
        }
      `}</style>

      {/* Depth & Lighting: Subtle radial backdrop glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(6,182,212,0.12) 0%, rgba(3,5,10,0.95) 70%)',
        }}
      />

      {/* Texture: Faint ambient micro-dot grid across the background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(6, 182, 212, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Scanline Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] opacity-10" />

      {/* ========================================================================= */}
      {/* BACKGROUND LAYER: ANIMATED PCB CIRCUIT TRACES & MOVING DATA PACKETS       */}
      {/* ========================================================================= */}
      <svg
        viewBox="0 0 1600 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="trace-cyan-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="trace-blue-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.9" />
          </linearGradient>

          <filter id="pcb-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* --------------------------------------------------------------------- */}
        {/* BASE PCB BUS TRACES (Sharp horizontals + strict 45-degree angles)     */}
        {/* --------------------------------------------------------------------- */}
        {/* LEFT BUS GROUP */}
        {/* Trace L1: Top-Left Upper Bus */}
        <path
          d="M 0 180 L 320 180 L 480 340 L 680 340 L 730 390 L 760 390"
          stroke="#06b6d4"
          strokeWidth="1.5"
          strokeOpacity="0.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Trace L2: Mid-Upper Left Bus */}
        <path
          d="M 0 300 L 250 300 L 380 430 L 720 430"
          stroke="#2563eb"
          strokeWidth="1.5"
          strokeOpacity="0.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Trace L3: Center-Left Direct Data Bus */}
        <path
          d="M 0 450 L 420 450 L 460 490 L 710 490"
          stroke="#06b6d4"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Trace L4: Mid-Lower Left Bus */}
        <path
          d="M 0 600 L 280 600 L 440 440 L 690 440"
          stroke="#0f766e"
          strokeWidth="1.5"
          strokeOpacity="0.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Trace L5: Bottom-Left Bus */}
        <path
          d="M 0 720 L 350 720 L 520 550 L 730 550"
          stroke="#2563eb"
          strokeWidth="1.5"
          strokeOpacity="0.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* RIGHT BUS GROUP */}
        {/* Trace R1: Top-Right Upper Bus */}
        <path
          d="M 1600 180 L 1280 180 L 1120 340 L 920 340 L 870 390 L 840 390"
          stroke="#06b6d4"
          strokeWidth="1.5"
          strokeOpacity="0.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Trace R2: Mid-Upper Right Bus */}
        <path
          d="M 1600 300 L 1350 300 L 1220 430 L 880 430"
          stroke="#2563eb"
          strokeWidth="1.5"
          strokeOpacity="0.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Trace R3: Center-Right Direct Data Bus */}
        <path
          d="M 1600 450 L 1180 450 L 1140 490 L 890 490"
          stroke="#06b6d4"
          strokeWidth="1.5"
          strokeOpacity="0.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Trace R4: Mid-Lower Right Bus */}
        <path
          d="M 1600 600 L 1320 600 L 1160 440 L 910 440"
          stroke="#0f766e"
          strokeWidth="1.5"
          strokeOpacity="0.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Trace R5: Bottom-Right Bus */}
        <path
          d="M 1600 720 L 1250 720 L 1080 550 L 870 550"
          stroke="#2563eb"
          strokeWidth="1.5"
          strokeOpacity="0.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* --------------------------------------------------------------------- */}
        {/* ANIMATED PULSES (Electric currents surging through traces)            */}
        {/* --------------------------------------------------------------------- */}
        <path
          d="M 0 180 L 320 180 L 480 340 L 680 340 L 730 390 L 760 390"
          stroke="url(#trace-cyan-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#pcb-glow)"
          className="pcb-pulse-stream-1"
        />
        <path
          d="M 0 450 L 420 450 L 460 490 L 710 490"
          stroke="url(#trace-cyan-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#pcb-glow)"
          className="pcb-pulse-stream-2"
        />
        <path
          d="M 1600 180 L 1280 180 L 1120 340 L 920 340 L 870 390 L 840 390"
          stroke="url(#trace-cyan-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#pcb-glow)"
          className="pcb-pulse-stream-3"
        />
        <path
          d="M 1600 450 L 1180 450 L 1140 490 L 890 490"
          stroke="url(#trace-blue-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          filter="url(#pcb-glow)"
          className="pcb-pulse-stream-4"
        />

        {/* --------------------------------------------------------------------- */}
        {/* PCB TEST VIAS & JUNCTION PADS (Authentic ring and hole nodes)         */}
        {/* --------------------------------------------------------------------- */}
        {/* Left junctions */}
        <circle cx="320" cy="180" r="3" fill="#06b6d4" opacity="0.8" />
        <circle cx="320" cy="180" r="1.5" fill="#03050a" />
        <circle cx="480" cy="340" r="3" fill="#22d3ee" opacity="0.9" />
        <circle cx="480" cy="340" r="1.5" fill="#03050a" />
        <circle cx="760" cy="390" r="3.5" fill="#22d3ee" filter="url(#pcb-glow)" />

        <circle cx="250" cy="300" r="3" fill="#2563eb" opacity="0.8" />
        <circle cx="250" cy="300" r="1.5" fill="#03050a" />
        <circle cx="720" cy="430" r="3.5" fill="#38bdf8" filter="url(#pcb-glow)" />

        <circle cx="420" cy="450" r="3" fill="#06b6d4" opacity="0.8" />
        <circle cx="420" cy="450" r="1.5" fill="#03050a" />
        <circle cx="710" cy="490" r="3.5" fill="#22d3ee" filter="url(#pcb-glow)" />

        <circle cx="280" cy="600" r="3" fill="#0f766e" opacity="0.8" />
        <circle cx="280" cy="600" r="1.5" fill="#03050a" />
        <circle cx="690" cy="440" r="3.5" fill="#06b6d4" filter="url(#pcb-glow)" />

        {/* Right junctions */}
        <circle cx="1280" cy="180" r="3" fill="#06b6d4" opacity="0.8" />
        <circle cx="1280" cy="180" r="1.5" fill="#03050a" />
        <circle cx="1120" cy="340" r="3" fill="#22d3ee" opacity="0.9" />
        <circle cx="1120" cy="340" r="1.5" fill="#03050a" />
        <circle cx="840" cy="390" r="3.5" fill="#22d3ee" filter="url(#pcb-glow)" />

        <circle cx="1350" cy="300" r="3" fill="#2563eb" opacity="0.8" />
        <circle cx="1350" cy="300" r="1.5" fill="#03050a" />
        <circle cx="880" cy="430" r="3.5" fill="#38bdf8" filter="url(#pcb-glow)" />

        <circle cx="1180" cy="450" r="3" fill="#06b6d4" opacity="0.8" />
        <circle cx="1180" cy="450" r="1.5" fill="#03050a" />
        <circle cx="890" cy="490" r="3.5" fill="#22d3ee" filter="url(#pcb-glow)" />

        <circle cx="1320" cy="600" r="3" fill="#0f766e" opacity="0.8" />
        <circle cx="1320" cy="600" r="1.5" fill="#03050a" />
        <circle cx="910" cy="440" r="3.5" fill="#06b6d4" filter="url(#pcb-glow)" />
      </svg>

      {/* ========================================================================= */}
      {/* CENTERPIECE: CYBERNETIC "A" MONOGRAM & AUTONOMOUS GLITCH PULSE            */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
        
        {/* Concentrated radial core glow */}
        <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-2xl pointer-events-none" />

        {/* Monogram Vector Container with Cyber Pulse Animation */}
        <div className="relative w-full h-full monogram-cyber-pulse flex items-center justify-center">
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            aria-label="Silicon Architecture Monogram"
          >
            <defs>
              <linearGradient id="monogram-core-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="25%" stopColor="#67e8f9" />
                <stop offset="70%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>

              <filter id="monogram-neon-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="0.8" result="blur1" />
                <feGaussianBlur stdDeviation="2.5" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Flanking Angle Brackets `⟨` and `⟩` with sharp digital corner accents */}
            <path
              d="M 5.5 11 L 3 16 L 5.5 21"
              stroke="#22d3ee"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-80"
            />
            <path
              d="M 26.5 11 L 29 16 L 26.5 21"
              stroke="#22d3ee"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-80"
            />

            {/* Modern Geometric Capital Letter "A" Chevron Legs */}
            <path
              d="M 8.5 24.5 L 16 6.5 L 23.5 24.5"
              stroke="url(#monogram-core-grad)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#monogram-neon-glow)"
            />

            {/* Crossbar with Circuit Disconnect Gap */}
            <path
              d="M 11.2 17.5 L 13.8 17.5 M 18.2 17.5 L 20.8 17.5"
              stroke="url(#monogram-core-grad)"
              strokeWidth="2.0"
              strokeLinecap="round"
            />

            {/* Upper Data Fork & Central Bus Stem */}
            <path
              d="M 11.5 12.5 L 16 17.5 L 20.5 12.5"
              stroke="url(#monogram-core-grad)"
              strokeWidth="2.0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 16 17.5 L 16 25.5"
              stroke="url(#monogram-core-grad)"
              strokeWidth="2.4"
              strokeLinecap="round"
              filter="url(#monogram-neon-glow)"
            />

            {/* Circuit Nodes / Terminal Pads */}
            <circle cx="16" cy="6.5" r="1.3" fill="#ffffff" />
            <circle cx="8.5" cy="24.5" r="1.3" fill="#22d3ee" />
            <circle cx="23.5" cy="24.5" r="1.3" fill="#22d3ee" />
            <circle cx="16" cy="25.5" r="1.5" fill="#38bdf8" />
            <circle cx="16" cy="17.5" r="1.1" fill="#ffffff" />
          </svg>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CENTERED TYPOGRAPHY & TELEMETRY                                           */}
      {/* ========================================================================= */}
      <div className="mt-6 z-10 flex flex-col items-center text-center">
        
        {/* 1. Name */}
        <h1 className="text-white font-bold tracking-[0.25em] text-sm md:text-base uppercase opacity-95">
          ALEXANDER CHRISTIAN R. YADAO
        </h1>

        {/* 2. System Subtitle */}
        <p className="text-cyan-400/80 font-mono tracking-[0.3em] text-[10px] md:text-xs uppercase mt-1 animate-pulse">
          INITIALIZING SYSTEM KERNEL...
        </p>

        {/* 3. Telemetry Readout */}
        <span className="font-mono text-[11px] text-cyan-300 tracking-widest mt-4">
          SYSTEM LOAD: {percent}%
        </span>

        {/* ======================================================================= */}
        {/* HIGH-TECH MINIMALIST PROGRESS BAR                                       */}
        {/* ======================================================================= */}
        <div className="w-44 md:w-52 h-[2px] bg-slate-800/80 rounded-full overflow-hidden mt-2 relative">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 shadow-[0_0_10px_#06b6d4] transition-all duration-100 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>

      </div>
    </div>
  );
};
