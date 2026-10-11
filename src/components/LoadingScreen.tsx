import React, { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [percent, setPercent] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // 4.4-second cinematic progression (4400ms total progress duration)
    const totalDuration = 4400;
    const startTime = performance.now();
    let animFrameId: number;

    const animateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressFraction = Math.min(elapsed / totalDuration, 1);

      // Smooth easing with dynamic speed curves (rapid initial sync, steady progression, confident finish)
      // Ease in-out cubic blend
      let eased: number;
      if (progressFraction < 0.5) {
        eased = 4 * Math.pow(progressFraction, 3);
      } else {
        eased = 1 - Math.pow(-2 * progressFraction + 2, 3) / 2;
      }

      // Slightly add subtle micro-jitter pauses to mimic realistic edge handshake ping packets
      const val = Math.min(Math.floor(eased * 100), 100);
      setPercent(val);

      if (progressFraction < 1) {
        animFrameId = requestAnimationFrame(animateProgress);
      } else {
        // Once 100% reached, hold for a breath (180ms), fade out smoothly, and call onComplete
        const exitTimer = setTimeout(() => {
          setIsExiting(true);
          const completeTimer = setTimeout(() => {
            onComplete();
          }, 700);
          return () => clearTimeout(completeTimer);
        }, 180);
        return () => clearTimeout(exitTimer);
      }
    };

    animFrameId = requestAnimationFrame(animateProgress);

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [onComplete]);

  // Dynamic telemetry status message matching system boot & server discovery milestones
  const getDiscoveryStatus = (p: number) => {
    if (p < 15) return 'INITIALIZING CORE TELEMETRY...';
    if (p < 35) return 'EMITTING 360° NETWORK RADAR PING...';
    if (p < 55) return 'RESOLVING MULTI-REGION TOPOLOGY NODES...';
    if (p < 75) return 'SYNCHRONIZING EDGE SERVERS & SILICON BUSES...';
    if (p < 95) return 'CALIBRATING FULL-STACK INTERFACE CARRIERS...';
    return 'SYSTEM TOPOLOGY VERIFIED // NOMINAL';
  };

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#020617] flex flex-col items-center justify-center p-4 overflow-hidden select-none transition-all duration-700 ease-out ${
        isExiting ? 'opacity-0 scale-[0.98] pointer-events-none' : 'opacity-100 scale-100'
      }`}
      aria-label="Systems and Network Infrastructure Discovery"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* 1. Deep Midnight-Navy / Indigo / Cyan Gradient Backdrop Ambient Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.12) 0%, rgba(79, 70, 229, 0.08) 35%, rgba(15, 23, 42, 0.85) 70%, #020617 100%)',
        }}
      />

      {/* 2. Micro Dot Matrix Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(rgba(56, 189, 248, 0.25) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          backgroundPosition: 'center center',
        }}
      />

      {/* 3. Subtle Cybernetic Crosshair Overlay in Background */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 opacity-15">
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
        <div className="h-full w-[1px] absolute bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent" />
      </div>

      {/* 4. Background Layer: Full Radial Ping Sweep & Network Topology Radar */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-visible">
        <svg
          viewBox="0 0 1000 1000"
          className="w-[720px] h-[720px] sm:w-[920px] sm:h-[920px] md:w-[1100px] md:h-[1100px] max-w-none text-cyan-400 select-none animate-spin-extremely-slow"
          style={{ animationDuration: '40s' }}
        >
          <defs>
            {/* Ping Sweep Conic Gradient */}
            <radialGradient id="radarSweepGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#38bdf8" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
            </radialGradient>

            {/* Sweep Needle Gradient */}
            <linearGradient id="sweepRay" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>

            {/* Node Pulse Glow Filter */}
            <filter id="nodeGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Central Target Calibration Graticules */}
          <line x1="500" y1="20" x2="500" y2="980" stroke="#0e7490" strokeWidth="1" strokeDasharray="3 6" opacity="0.25" />
          <line x1="20" y1="500" x2="980" y2="500" stroke="#0e7490" strokeWidth="1" strokeDasharray="3 6" opacity="0.25" />
          <line x1="160" y1="160" x2="840" y2="840" stroke="#4f46e5" strokeWidth="0.8" strokeDasharray="2 8" opacity="0.18" />
          <line x1="160" y1="840" x2="840" y2="160" stroke="#4f46e5" strokeWidth="0.8" strokeDasharray="2 8" opacity="0.18" />

          {/* Concentric Radar Rings */}
          {/* Ring 1 (Inner core) */}
          <circle cx="500" cy="500" r="90" fill="none" stroke="#06b6d4" strokeWidth="1.2" strokeOpacity="0.35" strokeDasharray="4 4" />
          {/* Ring 2 */}
          <circle cx="500" cy="500" r="170" fill="none" stroke="#38bdf8" strokeWidth="1.2" strokeOpacity="0.28" />
          {/* Ring 3 (Dash Segmented) */}
          <circle cx="500" cy="500" r="260" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeOpacity="0.32" strokeDasharray="8 8" />
          {/* Ring 4 */}
          <circle cx="500" cy="500" r="350" fill="none" stroke="#06b6d4" strokeWidth="1.2" strokeOpacity="0.25" strokeDasharray="16 6 4 6" />
          {/* Ring 5 (Outer perimeter) */}
          <circle cx="500" cy="500" r="440" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeOpacity="0.18" strokeDasharray="3 6" />

          {/* Dynamic Radar Ping Sweep Beam (Rotating Vector Needle) */}
          <g className="origin-center animate-radar-sweep" style={{ transformOrigin: '500px 500px' }}>
            {/* The sweeping radar wedge beam */}
            <path
              d="M 500 500 L 940 500 A 440 440 0 0 0 811 189 Z"
              fill="url(#radarSweepGlow)"
              className="opacity-70"
            />
            {/* Leading ping sweep scan line */}
            <line
              x1="500"
              y1="500"
              x2="940"
              y2="500"
              stroke="url(#sweepRay)"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#nodeGlow)"
            />
            {/* Micro leading tracer light */}
            <circle cx="940" cy="500" r="3" fill="#38bdf8" filter="url(#nodeGlow)" />
          </g>

          {/* Dynamic Expanding Ping Echo Wave 1 */}
          <circle
            cx="500"
            cy="500"
            r="120"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="1.8"
            className="origin-center animate-ping-expand"
            style={{ transformOrigin: '500px 500px' }}
          />
          {/* Dynamic Expanding Ping Echo Wave 2 (Offset phase) */}
          <circle
            cx="500"
            cy="500"
            r="120"
            fill="none"
            stroke="#818cf8"
            strokeWidth="1.5"
            className="origin-center animate-ping-expand-delayed"
            style={{ transformOrigin: '500px 500px' }}
          />

          {/* Network Topology Connection Vector Lines between nodes */}
          <path
            d="M 500 500 L 620 380 L 740 410 L 820 310"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            opacity="0.4"
          />
          <path
            d="M 500 500 L 380 620 L 290 570 L 210 680"
            fill="none"
            stroke="#818cf8"
            strokeWidth="1.2"
            strokeDasharray="4 4"
            opacity="0.35"
          />
          <path
            d="M 500 500 L 390 390 L 280 340"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            opacity="0.35"
          />
          <path
            d="M 500 500 L 610 610 L 710 660 L 780 730"
            fill="none"
            stroke="#6366f1"
            strokeWidth="1.2"
            strokeDasharray="3 3"
            opacity="0.3"
          />

          {/* Discovered Edge Server & SysAdmin Topology Nodes */}
          {/* Node 1: US-WEST (Cyan) */}
          <g className="animate-pulse" style={{ animationDuration: '2.4s' }}>
            <circle cx="620" cy="380" r="5" fill="#06b6d4" filter="url(#nodeGlow)" />
            <circle cx="620" cy="380" r="10" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.5" />
            <text x="635" y="384" fill="#38bdf8" fontSize="10" fontFamily="monospace" letterSpacing="0.1em" opacity="0.8">
              NODE_USW-01 [12ms]
            </text>
          </g>

          {/* Node 2: AP-EAST (Indigo/Purple) */}
          <g className="animate-pulse" style={{ animationDuration: '3.1s' }}>
            <circle cx="740" cy="410" r="4.5" fill="#818cf8" filter="url(#nodeGlow)" />
            <circle cx="740" cy="410" r="9" fill="none" stroke="#6366f1" strokeWidth="1" opacity="0.5" />
            <text x="755" y="414" fill="#a5b4fc" fontSize="9" fontFamily="monospace" letterSpacing="0.1em" opacity="0.75">
              EDGE_APE-04 [28ms]
            </text>
          </g>

          {/* Node 3: EU-CENTRAL (Royal Blue) */}
          <g className="animate-pulse" style={{ animationDuration: '2.8s' }}>
            <circle cx="380" cy="620" r="5" fill="#38bdf8" filter="url(#nodeGlow)" />
            <circle cx="380" cy="620" r="11" fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.4" />
            <text x="270" y="624" fill="#38bdf8" fontSize="9" fontFamily="monospace" letterSpacing="0.1em" opacity="0.75">
              GATEWAY_EUC-09 [19ms]
            </text>
          </g>

          {/* Node 4: IOT-CORE (Cyan) */}
          <g className="animate-pulse" style={{ animationDuration: '1.9s' }}>
            <circle cx="390" cy="390" r="4" fill="#06b6d4" filter="url(#nodeGlow)" />
            <circle cx="390" cy="390" r="8" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.5" />
            <text x="290" y="394" fill="#67e8f9" fontSize="9" fontFamily="monospace" letterSpacing="0.1em" opacity="0.7">
              IOT_BUS_UART [0.8ms]
            </text>
          </g>

          {/* Node 5: PERIPHERAL-MESH (Sky Blue) */}
          <g className="animate-pulse" style={{ animationDuration: '3.5s' }}>
            <circle cx="610" cy="610" r="4.5" fill="#38bdf8" filter="url(#nodeGlow)" />
            <circle cx="610" cy="610" r="9" fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.4" />
            <text x="625" y="614" fill="#38bdf8" fontSize="9" fontFamily="monospace" letterSpacing="0.1em" opacity="0.7">
              MEM_REGISTERS [OK]
            </text>
          </g>

          {/* Node 6: Edge Worker (Indigo) */}
          <g className="animate-pulse" style={{ animationDuration: '2.2s' }}>
            <circle cx="820" cy="310" r="4" fill="#818cf8" filter="url(#nodeGlow)" />
            <text x="832" y="314" fill="#c7d2fe" fontSize="8" fontFamily="monospace" letterSpacing="0.1em" opacity="0.6">
              CDN_VERCEL_EDGE
            </text>
          </g>

          {/* Node 7: Core Bus */}
          <g className="animate-pulse" style={{ animationDuration: '2.6s' }}>
            <circle cx="210" cy="680" r="3.5" fill="#06b6d4" opacity="0.7" />
            <text x="120" y="684" fill="#67e8f9" fontSize="8" fontFamily="monospace" letterSpacing="0.1em" opacity="0.6">
              PCIe_GEN4_LINK
            </text>
          </g>
        </svg>
      </div>

      {/* 5. Centerpiece: Signature Geometric Animated Monogram {A} */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Glow halo backing behind the Monogram */}
        <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500/25 via-sky-500/15 to-indigo-600/25 rounded-full blur-2xl pointer-events-none animate-pulse" />

        {/* Outer Circular High-Tech Dial Bracket */}
        <div className="relative w-36 h-36 md:w-44 md:h-44 flex items-center justify-center">
          {/* Counter-rotating perimeter notches */}
          <svg
            className="absolute inset-0 w-full h-full text-cyan-500/40 animate-spin-reverse-slow"
            viewBox="0 0 160 160"
            style={{ animationDuration: '28s' }}
          >
            {/* Precision corner notches */}
            <circle
              cx="80"
              cy="80"
              r="76"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeDasharray="4 8 1 8"
              opacity="0.45"
            />
            <circle
              cx="80"
              cy="80"
              r="68"
              fill="none"
              stroke="#6366f1"
              strokeWidth="1"
              strokeDasharray="16 12 4 12"
              opacity="0.35"
            />
            {/* 4 Cardinal Calibration ticks */}
            <line x1="80" y1="2" x2="80" y2="10" stroke="#06b6d4" strokeWidth="2" />
            <line x1="80" y1="150" x2="80" y2="158" stroke="#06b6d4" strokeWidth="2" />
            <line x1="2" y1="80" x2="10" y2="80" stroke="#06b6d4" strokeWidth="2" />
            <line x1="150" y1="80" x2="158" y2="80" stroke="#06b6d4" strokeWidth="2" />
          </svg>

          {/* Forward rotating inner tick mark circle */}
          <svg
            className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] text-sky-400/30 animate-spin-slow"
            viewBox="0 0 144 144"
            style={{ animationDuration: '18s' }}
          >
            <circle
              cx="72"
              cy="72"
              r="66"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="30 20 10 20"
              opacity="0.5"
            />
          </svg>

          {/* The Geometric Monogram Vector: Alexander Christian Yadao {A} */}
          <div className="relative z-10 w-24 h-24 md:w-28 md:h-28 flex items-center justify-center animate-monogram-subtle-float">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full drop-shadow-[0_0_24px_rgba(6,182,212,0.65)]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="cyberMonogramGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#818cf8" />
                </linearGradient>

                <linearGradient id="cyberCrossbarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#67e8f9" />
                  <stop offset="60%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#a5b4fc" />
                </linearGradient>

                <linearGradient id="innerCoreGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#4f46e5" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Background ambient inner polygon diamond fill */}
              <polygon
                points="50,16 78,82 22,82"
                fill="url(#innerCoreGrad)"
                stroke="#06b6d4"
                strokeWidth="0.8"
                strokeOpacity="0.3"
              />

              {/* Main Structural Apex Frame of {A} */}
              {/* Left Beam */}
              <path
                d="M50 14L18 84H29L50 36L71 84H82L50 14Z"
                fill="url(#cyberMonogramGrad)"
                className="opacity-95"
              />

              {/* High-Tech Circuit Horizontal Crossbar */}
              <rect
                x="30"
                y="55"
                width="40"
                height="6.5"
                rx="1.5"
                fill="url(#cyberCrossbarGrad)"
                className="drop-shadow-[0_0_10px_rgba(56,189,248,0.9)]"
              />

              {/* Circuit Micro-Nodes on the Monogram Crossbar */}
              <circle cx="34" cy="58.25" r="1.8" fill="#ffffff" />
              <circle cx="66" cy="58.25" r="1.8" fill="#ffffff" />
              <circle cx="50" cy="58.25" r="2" fill="#020617" stroke="#67e8f9" strokeWidth="1" />

              {/* Apex Precision Crown Node */}
              <circle
                cx="50"
                cy="14"
                r="3"
                fill="#ffffff"
                className="drop-shadow-[0_0_8px_rgba(56,189,248,1)]"
              />

              {/* Stepped Architectural Accent Ticks */}
              <path d="M14 86L20 86" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />
              <path d="M80 86L86 86" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* 6. Typography & Systems Telemetry Stack */}
        <div className="mt-8 flex flex-col items-center text-center space-y-2 z-10">
          {/* Primary Engineer Title */}
          <h1 className="text-white text-sm sm:text-base md:text-lg font-bold tracking-[0.28em] uppercase font-mono drop-shadow-[0_2px_12px_rgba(255,255,255,0.2)]">
            ALEXANDER CHRISTIAN R. YADAO
          </h1>

          {/* Subtitle: Silicon Architecture & Systems */}
          <div className="flex items-center space-x-2 text-cyan-400/90 text-[10px] sm:text-[11px] md:text-xs tracking-[0.3em] font-mono">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>SYSTEMS &amp; COMPUTER ENGINEERING</span>
          </div>

          {/* Dynamic Ping Sweep Stage Status */}
          <p className="text-sky-300/75 text-[10px] sm:text-[11px] tracking-[0.25em] font-mono h-4">
            {getDiscoveryStatus(percent)}
          </p>
        </div>

        {/* 7. Ultra-Clean Neon Glowing Progress Bar & Percentage Telemetry */}
        <div className="mt-6 w-64 sm:w-72 md:w-80 flex flex-col items-center space-y-2 z-10">
          {/* Top telemetry tags */}
          <div className="w-full flex justify-between items-center text-[10px] font-mono text-cyan-400/70 tracking-widest px-0.5">
            <span>PING: 24ms [SYN-ACK]</span>
            <span className="text-cyan-300 font-bold tracking-wider">
              {percent}%
            </span>
          </div>

          {/* Glowing Track & Fill */}
          <div className="relative w-full h-[3px] bg-slate-900/90 rounded-full overflow-hidden border border-cyan-950/60 shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]">
            {/* The active filling neon bar */}
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 rounded-full transition-all duration-100 ease-out shadow-[0_0_14px_rgba(6,182,212,0.95)]"
              style={{ width: `${percent}%` }}
            />
          </div>

          {/* Bottom telemetry indicators */}
          <div className="w-full flex justify-between items-center text-[9px] font-mono text-slate-500 tracking-wider pt-0.5">
            <span className="flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              <span className="text-slate-400">STATUS: NOMINAL</span>
            </span>
            <span className="text-slate-400">EDGE MESH 100GbE</span>
          </div>
        </div>
      </div>

      {/* 8. Global CSS Keyframes for Radar Sweep, Expansion, and Monogram Ambient Dynamics */}
      <style>{`
        @keyframes radar-sweep {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes ping-expand {
          0% {
            r: 80px;
            opacity: 0.8;
          }
          70% {
            opacity: 0.35;
          }
          100% {
            r: 450px;
            opacity: 0;
          }
        }

        @keyframes ping-expand-delayed {
          0% {
            r: 80px;
            opacity: 0;
          }
          20% {
            opacity: 0.7;
          }
          80% {
            opacity: 0.25;
          }
          100% {
            r: 450px;
            opacity: 0;
          }
        }

        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse-slow {
          0% {
            transform: rotate(360deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        @keyframes monogram-subtle-float {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-2px) scale(1.015);
          }
        }

        .animate-radar-sweep {
          animation: radar-sweep 4s linear infinite;
        }

        .animate-ping-expand {
          animation: ping-expand 2.8s cubic-bezier(0.1, 0.4, 0.2, 1) infinite;
        }

        .animate-ping-expand-delayed {
          animation: ping-expand-delayed 2.8s cubic-bezier(0.1, 0.4, 0.2, 1) 1.4s infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 22s linear infinite;
        }

        .animate-spin-reverse-slow {
          animation: spin-reverse-slow 30s linear infinite;
        }

        .animate-monogram-subtle-float {
          animation: monogram-subtle-float 3.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
