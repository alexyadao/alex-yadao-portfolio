import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, ShieldCheck } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

interface BootLog {
  tag: string;
  tagColor: string;
  message: string;
  status?: string;
  delay: number;
}

const BOOT_LOGS: BootLog[] = [
  {
    tag: '[SYSTEM]',
    tagColor: 'text-cyan-400',
    message: 'Initializing Alexander Yadao Architecture Kernel...',
    delay: 150,
  },
  {
    tag: '[MEMORY]',
    tagColor: 'text-indigo-400',
    message: 'Allocating hardware registers & peripheral buses...',
    status: 'OK',
    delay: 550,
  },
  {
    tag: '[NETWORK]',
    tagColor: 'text-emerald-400',
    message: 'Verifying Vercel edge CDN & TLS 1.3 handshake...',
    status: 'OK',
    delay: 1000,
  },
  {
    tag: '[MODULES]',
    tagColor: 'text-amber-400',
    message: 'Mounting IoT telemetry & Full-Stack engine...',
    status: 'OK',
    delay: 1450,
  },
  {
    tag: '[STATUS]',
    tagColor: 'text-cyan-300',
    message: 'Systems nominal. Launching user interface...',
    delay: 1850,
  },
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [visibleLogs, setVisibleLogs] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // 1. Reveal logs progressively based on their scheduled delay
    const timeouts: NodeJS.Timeout[] = [];

    BOOT_LOGS.forEach((log, index) => {
      const timeout = setTimeout(() => {
        setVisibleLogs((prev) => [...prev, index]);
      }, log.delay);
      timeouts.push(timeout);
    });

    // 2. High-tech smooth progress bar timer running ~2.0 seconds
    const startTime = performance.now();
    const duration = 2000; // 2 seconds total

    let animationFrameId: number;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressFraction = Math.min(elapsed / duration, 1);
      
      // Easing curve (easeOutCubic) for natural boot pacing
      const easedProgress = Math.round((1 - Math.pow(1 - progressFraction, 3)) * 100);
      setProgress(easedProgress);

      if (progressFraction < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        // When progress reaches 100%, trigger smooth fade-out and unmount
        const exitTimer = setTimeout(() => {
          setIsFadingOut(true);
          const finishTimer = setTimeout(() => {
            onComplete();
          }, 700); // matches transition duration-700
          timeouts.push(finishTimer);
        }, 250);
        timeouts.push(exitTimer);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    // 3. Safety fallback timer so it never hangs indefinitely
    const safetyTimeout = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        onComplete();
      }, 700);
    }, 4000);
    timeouts.push(safetyTimeout);

    return () => {
      cancelAnimationFrame(animationFrameId);
      timeouts.forEach(clearTimeout);
    };
  }, [onComplete]);

  return (
    <div
      aria-label="System Boot Sequence"
      className={`fixed inset-0 z-50 bg-[#0a0f1d] text-cyan-400 font-mono flex flex-col justify-center items-center p-4 transition-opacity duration-700 ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Subtle Cybernetic Grid Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(rgba(6, 182, 212, 0.15) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Terminal Container Box */}
      <div className="relative bg-slate-900/90 border border-cyan-500/30 rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.15)] max-w-lg w-full p-6 backdrop-blur-md">
        {/* Linux / macOS Terminal Window Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-cyan-500/20 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-400/50 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-400/50 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-400/50 inline-block" />
            <span className="ml-2 font-mono text-zinc-400 text-[11px] flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              ay-kernel://boot.sys
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-cyan-400/70 font-mono">
            <Cpu className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span>x86_64 // ACY-OS</span>
          </div>
        </div>

        {/* Diagnostic Output Stream */}
        <div className="space-y-2.5 min-h-[148px] text-xs sm:text-[13px] leading-relaxed">
          {BOOT_LOGS.map((log, index) => {
            const isVisible = visibleLogs.includes(index);
            if (!isVisible) return null;

            return (
              <div
                key={index}
                className="flex items-start justify-between gap-2 animate-fadeIn"
              >
                <div className="flex items-start gap-2">
                  <span className={`font-semibold shrink-0 ${log.tagColor}`}>
                    {log.tag}
                  </span>
                  <span className="text-zinc-300 font-mono">
                    {log.message}
                  </span>
                </div>
                {log.status && (
                  <span className="text-emerald-400 font-bold shrink-0 ml-auto flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 inline" />
                    {log.status}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Linear High-Tech Progress Bar */}
        <div className="mt-6 pt-4 border-t border-cyan-500/20">
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span className="text-zinc-400">Boot Progress</span>
            <span className="text-cyan-300 font-bold">{progress}%</span>
          </div>

          <div className="w-full h-2 bg-slate-950/80 rounded-full overflow-hidden border border-cyan-500/30 p-[1px]">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 rounded-full transition-all duration-75 ease-out shadow-[0_0_10px_rgba(6,182,212,0.7)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Prompt Cursor Footer */}
          <div className="flex items-center justify-between text-[11px] text-zinc-500 mt-3 font-mono">
            <span>alex@yadao-system:~$ run startup</span>
            <span className="inline-block w-2 h-3.5 bg-cyan-400 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
