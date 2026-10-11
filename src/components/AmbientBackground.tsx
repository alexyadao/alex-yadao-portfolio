import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface ParticleNode {
  // Base drifting origin
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  // Dynamic interactive offsets with spring physics
  offsetX: number;
  offsetY: number;
  offsetVx: number;
  offsetVy: number;
  // Current rendered position
  x: number;
  y: number;
  // Properties
  radius: number;
  baseRadius: number;
  depth: number; // 0.3 (far) to 1.0 (near)
  alpha: number;
  baseAlpha: number;
  pulsePhase: number;
  pulseSpeed: number;
  isJunction: boolean; // special micro-junction / chip node
  affinity: 'attract' | 'repel' | 'orbit'; // interactive physics personality
  color: string;
}

/**
 * AmbientBackground component
 * 
 * Provides an authentic Computer Engineering / Silicon Architecture dark base,
 * faint circuit/infrastructure grid, smoothly animated multi-color aurora glows,
 * and high-aesthetic floating digital particle nodes with fluid mouse-movement-responsive
 * attraction and repulsion physics that enhance the cinematic atmosphere.
 */
export const AmbientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Detect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking state with velocity and smooth interpolation
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      prevX: -1000,
      prevY: -1000,
      vx: 0,
      vy: 0,
      isActive: false,
      radius: 200, // Interaction sphere
      scanAngle: 0,
    };

    // Color palette based on theme
    const nodeColors = isDark
      ? ['#06b6d4', '#38bdf8', '#14b8a6', '#818cf8'] // Cyan, Sky Blue, Neon Teal, Indigo
      : ['#0284c7', '#0d9488', '#6366f1', '#64748b']; // Ocean, Teal, Indigo, Slate

    // Generate responsive particle pool
    const getParticleCount = () => {
      const area = width * height;
      if (area < 500000) return 30; // Mobile
      if (area < 1000000) return 46; // Tablet / small laptop
      return 68; // Desktop
    };

    let particles: ParticleNode[] = [];

    const initParticles = () => {
      const count = getParticleCount();
      particles = [];

      const affinities: ('attract' | 'repel' | 'orbit')[] = ['attract', 'repel', 'orbit', 'repel'];

      for (let i = 0; i < count; i++) {
        const depth = Math.random() * 0.7 + 0.3; // 0.3 to 1.0
        const isJunction = i % 6 === 0; // ~16% are silicon junction nodes
        const baseRadius = isJunction ? 2.4 * depth : (Math.random() * 1.3 + 1.1) * depth;
        const baseAlpha = (Math.random() * 0.25 + (isDark ? 0.35 : 0.25)) * depth;
        const startX = Math.random() * width;
        const startY = Math.random() * height;

        particles.push({
          originX: startX,
          originY: startY,
          vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0.04 : 0.25) * depth,
          vy: (Math.random() - 0.5) * (prefersReducedMotion ? 0.04 : 0.25) * depth,
          offsetX: 0,
          offsetY: 0,
          offsetVx: 0,
          offsetVy: 0,
          x: startX,
          y: startY,
          radius: baseRadius,
          baseRadius,
          depth,
          alpha: baseAlpha,
          baseAlpha,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          isJunction,
          affinity: affinities[i % affinities.length],
          color: nodeColors[Math.floor(Math.random() * nodeColors.length)],
        });
      }
    };

    // Handle high DPI scaling and resize
    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initParticles();
    };

    handleResize();

    // Mouse & Touch movement listeners
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      mouse.isActive = true;
      if ('touches' in e) {
        if (e.touches.length > 0) {
          mouse.targetX = e.touches[0].clientX;
          mouse.targetY = e.touches[0].clientY;
        }
      } else {
        mouse.targetX = e.clientX;
        mouse.targetY = e.clientY;
      }
    };

    const handlePointerLeave = () => {
      mouse.isActive = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);
    window.addEventListener('resize', handleResize);

    // Animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation (lerp) & velocity calculation
      if (mouse.isActive) {
        mouse.prevX = mouse.x;
        mouse.prevY = mouse.y;
        mouse.x += (mouse.targetX - mouse.x) * 0.14;
        mouse.y += (mouse.targetY - mouse.y) * 0.14;
        mouse.vx = mouse.x - mouse.prevX;
        mouse.vy = mouse.y - mouse.prevY;
        mouse.scanAngle += 0.03;
      } else {
        mouse.x += (-1000 - mouse.x) * 0.05;
        mouse.y += (-1000 - mouse.y) * 0.05;
        mouse.vx *= 0.9;
        mouse.vy *= 0.9;
      }

      // Render subtle interactive cursor radar beacon
      if (mouse.isActive && mouse.x > -50 && mouse.x < width + 50 && mouse.y > -50 && mouse.y < height + 50) {
        // Outer interactive field perimeter
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 24, 0, Math.PI * 2);
        ctx.strokeStyle = isDark ? 'rgba(6, 182, 212, 0.16)' : 'rgba(2, 132, 199, 0.14)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Rotating micro-radar sweep notch
        const nx = mouse.x + Math.cos(mouse.scanAngle) * 24;
        const ny = mouse.y + Math.sin(mouse.scanAngle) * 24;
        ctx.beginPath();
        ctx.arc(nx, ny, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? '#38bdf8' : '#0284c7';
        ctx.fill();

        // Cursor focal core
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(6, 182, 212, 0.45)' : 'rgba(2, 132, 199, 0.4)';
        ctx.fill();
      }

      // 1. Inter-particle mesh network connections
      const maxDistance = 100;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const proximityFactor = 1 - dist / maxDistance;
            const lineAlpha = proximityFactor * 0.13 * ((p1.depth + p2.depth) / 2);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark
              ? `rgba(6, 182, 212, ${lineAlpha})`
              : `rgba(15, 118, 110, ${lineAlpha * 0.8})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // 2. Particle Physics Simulation & Mouse Responsiveness
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Pulse breathing effect
        p.pulsePhase += p.pulseSpeed;
        const pulse = Math.sin(p.pulsePhase) * 0.22;
        p.alpha = Math.max(0.08, p.baseAlpha + pulse * 0.14);
        p.radius = Math.max(0.8, p.baseRadius + pulse * 0.28);

        // Natural floating drift on origin
        p.originX += p.vx;
        p.originY += p.vy;

        // Screen boundary wrapping on origin
        if (p.originX < -30) p.originX = width + 30;
        else if (p.originX > width + 30) p.originX = -30;
        if (p.originY < -30) p.originY = height + 30;
        else if (p.originY > height + 30) p.originY = -30;

        // Mouse-responsive interaction physics
        if (mouse.isActive && !prefersReducedMotion) {
          const currentPosX = p.originX + p.offsetX;
          const currentPosY = p.originY + p.offsetY;
          const dx = mouse.x - currentPosX;
          const dy = mouse.y - currentPosY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 1) {
            const normalizedDist = dist / mouse.radius; // 0 (center) to 1 (outer edge)
            const angle = Math.atan2(dy, dx);
            const intensity = (1 - normalizedDist) * p.depth;

            // Fluid kinetic drag from cursor velocity (slipstream wake)
            const kineticFactor = 0.08 * intensity;
            p.offsetVx += mouse.vx * kineticFactor;
            p.offsetVy += mouse.vy * kineticFactor;

            // Dual interaction mechanics: Attraction vs. Repulsion vs. Orbit
            if (p.affinity === 'attract') {
              // Gravitational attraction toward cursor with inner soft buffer
              if (dist > 50) {
                const attractForce = Math.sin(normalizedDist * Math.PI) * 1.6 * intensity;
                p.offsetVx += Math.cos(angle) * attractForce;
                p.offsetVy += Math.sin(angle) * attractForce;
              } else {
                // Soft close-proximity repulsion to prevent clustering exactly under the pointer
                const pushForce = (1 - dist / 50) * 1.8 * intensity;
                p.offsetVx -= Math.cos(angle) * pushForce;
                p.offsetVy -= Math.sin(angle) * pushForce;
              }
            } else if (p.affinity === 'repel') {
              // Fluid electromagnetic repulsion: pushes away smoothly like parting waves
              const repelForce = (1 - normalizedDist) * 2.2 * intensity;
              p.offsetVx -= Math.cos(angle) * repelForce;
              p.offsetVy -= Math.sin(angle) * repelForce;
            } else {
              // Orbit / swirl: tangential deflection that curves around the moving cursor
              const tangentAngle = angle + Math.PI / 2;
              const orbitForce = (1 - normalizedDist) * 1.5 * intensity;
              p.offsetVx += Math.cos(tangentAngle) * orbitForce - Math.cos(angle) * (orbitForce * 0.5);
              p.offsetVy += Math.sin(tangentAngle) * orbitForce - Math.sin(angle) * (orbitForce * 0.5);
            }

            // Interactive connection tracer line between cursor and proximate nodes
            if (dist < 140) {
              const mouseLinkAlpha = (1 - dist / 140) * (isDark ? 0.32 : 0.22) * p.depth;
              ctx.beginPath();
              ctx.moveTo(mouse.x, mouse.y);
              ctx.lineTo(currentPosX, currentPosY);
              ctx.strokeStyle = isDark
                ? `rgba(56, 189, 248, ${mouseLinkAlpha})`
                : `rgba(2, 132, 199, ${mouseLinkAlpha})`;
              ctx.lineWidth = 0.9;
              ctx.stroke();

              // Micro packet blip traveling along the connection line
              const blipProgress = ((Date.now() / 800) + (i * 0.15)) % 1;
              const blipX = mouse.x + (currentPosX - mouse.x) * blipProgress;
              const blipY = mouse.y + (currentPosY - mouse.y) * blipProgress;
              ctx.beginPath();
              ctx.arc(blipX, blipY, 1.2, 0, Math.PI * 2);
              ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${mouseLinkAlpha * 1.8})` : `rgba(2, 132, 199, ${mouseLinkAlpha * 1.5})`;
              ctx.fill();
            }

            // Glow bloom when in interaction range
            p.alpha = Math.min(0.95, p.alpha + (1 - normalizedDist) * 0.35);
            p.radius = p.baseRadius * (1 + (1 - normalizedDist) * 0.45);
          }
        }

        // Spring physics damping: elastic return of offset back toward natural origin
        const springTension = 0.05;
        const friction = 0.88;
        p.offsetVx += -p.offsetX * springTension;
        p.offsetVy += -p.offsetY * springTension;
        p.offsetVx *= friction;
        p.offsetVy *= friction;
        p.offsetX += p.offsetVx;
        p.offsetY += p.offsetVy;

        // Final rendered coordinates
        p.x = p.originX + p.offsetX;
        p.y = p.originY + p.offsetY;

        // Render Particle Body
        ctx.save();
        ctx.globalAlpha = p.alpha;

        if (p.isJunction) {
          // Silicon chip micro-junction node
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.3, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? 'rgba(6, 182, 212, 0.16)' : 'rgba(2, 132, 199, 0.12)';
          ctx.fill();

          ctx.fillStyle = p.color;
          const s = p.radius * 1.5;
          ctx.fillRect(p.x - s / 2, p.y - s / 2, s, s);

          // Center core pin
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        } else {
          // Standard circular particle node
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();

          // High-depth nodes get a luminous center core
          if (p.depth > 0.72) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * 0.45, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();
          }
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDark]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-slate-50 dark:bg-[#020617] transition-colors duration-500"
    >
      {/* 1. Subtle SVG Grid Overlay - tiny, faint grid pattern with 5-10% opacity */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.06] dark:opacity-[0.07] stroke-slate-500 dark:stroke-slate-400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="ambient-grid-pattern"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 32 0 L 0 0 0 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ambient-grid-pattern)" />
      </svg>

      {/* 2. Animated Aurora Glow: Deep Teal / Emerald */}
      <div
        className="absolute -top-[10%] -left-[10%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-br from-emerald-500/15 via-teal-600/10 to-transparent dark:from-emerald-500/20 dark:via-teal-600/15 dark:to-transparent blur-[130px] animate-pulse"
        style={{
          animationDuration: '9s',
        }}
      />

      {/* 3. Animated Aurora Glow: Deep Blue / Indigo */}
      <div
        className="absolute top-[25%] -right-[15%] w-[60vw] h-[60vw] max-w-[750px] max-h-[750px] rounded-full bg-gradient-to-bl from-indigo-600/15 via-blue-700/10 to-transparent dark:from-indigo-600/20 dark:via-blue-700/15 dark:to-transparent blur-[140px] animate-pulse"
        style={{
          animationDuration: '12s',
          animationDelay: '2s',
        }}
      />

      {/* 4. Secondary Subtle Cyan / Sky Core Glow */}
      <div
        className="absolute -bottom-[15%] left-[20%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full bg-gradient-to-tr from-cyan-600/10 via-teal-800/10 to-transparent dark:from-cyan-600/15 dark:via-teal-800/10 dark:to-transparent blur-[150px] animate-pulse"
        style={{
          animationDuration: '15s',
          animationDelay: '4s',
        }}
      />

      {/* 5. Mouse-Responsive Digital Particle Nodes Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 6. Vignette radial falloff for cinematic contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_0%,rgba(2,6,23,0.4)_100%)] dark:bg-[radial-gradient(circle_at_50%_30%,transparent_0%,rgba(2,6,23,0.6)_100%)] pointer-events-none" />
    </div>
  );
};

export default AmbientBackground;
