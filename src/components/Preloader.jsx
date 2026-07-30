import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

/* ── Hex grid canvas ─────────────────────────────────── */
const HexGrid = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const SIZE  = 36;
    const W     = SIZE * 2;
    const H     = Math.sqrt(3) * SIZE;
    const hexes = [];

    // Build hex grid
    const buildGrid = () => {
      hexes.length = 0;
      const cols = Math.ceil(canvas.width  / W) + 2;
      const rows = Math.ceil(canvas.height / H) + 2;
      for (let r = -1; r < rows; r++) {
        for (let c = -1; c < cols; c++) {
          const x = c * W + (r % 2 === 0 ? 0 : SIZE);
          const y = r * H * 0.75;
          hexes.push({ x, y, alpha: Math.random() * 0.08, pulse: Math.random() * Math.PI * 2 });
        }
      }
    };
    buildGrid();

    const drawHex = (x, y, size, alpha) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(79, 142, 247, ${alpha})`;
      ctx.lineWidth   = 0.6;
      ctx.stroke();
    };

    let frame;
    let t = 0;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.012;
      hexes.forEach(h => {
        h.pulse += 0.018;
        const a = 0.04 + Math.abs(Math.sin(h.pulse)) * 0.12;
        drawHex(h.x, h.y, SIZE - 2, a);
      });
      frame = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={ref} className="pl-hex-canvas" aria-hidden />;
};

/* ── Orbital ring ────────────────────────────────────── */
const OrbitalRing = ({ progress }) => {
  const DOTS   = 8;
  const RADIUS = 90;

  return (
    <div className="pl-orbital" aria-hidden>
      {/* Static ring */}
      <svg className="pl-orbital__svg" viewBox="0 0 220 220" fill="none">
        {/* Outer ring */}
        <circle cx="110" cy="110" r="100" stroke="rgba(79,142,247,0.12)" strokeWidth="1" />
        {/* Progress arc */}
        <circle
          cx="110" cy="110" r="100"
          stroke="url(#arcGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 100}`}
          strokeDashoffset={`${2 * Math.PI * 100 * (1 - progress / 100)}`}
          transform="rotate(-90 110 110)"
          style={{ transition: 'stroke-dashoffset 0.2s ease-out' }}
        />
        {/* Inner ring */}
        <circle cx="110" cy="110" r="76" stroke="rgba(157,78,221,0.1)" strokeWidth="1" strokeDasharray="4 6" />
        <defs>
          <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4f8ef7" />
            <stop offset="100%" stopColor="#9d4edd" />
          </linearGradient>
        </defs>
      </svg>

      {/* Orbiting dots */}
      {Array.from({ length: DOTS }).map((_, i) => {
        const angle = (360 / DOTS) * i;
        return (
          <div
            key={i}
            className="pl-orbital__dot"
            style={{ '--angle': `${angle}deg`, '--r': `${RADIUS}px`, '--delay': `${i * 0.15}s` }}
          />
        );
      })}

      {/* Center pulse ring */}
      <div className="pl-orbital__pulse" />
      <div className="pl-orbital__pulse pl-orbital__pulse--2" />
    </div>
  );
};

/* ── Glitch text ─────────────────────────────────────── */
const GlitchText = ({ text }) => (
  <div className="pl-glitch" data-text={text} aria-label={text}>
    {text}
  </div>
);

/* ── Status messages ─────────────────────────────────── */
const PHASES = [
  { at: 0,  msg: 'Iniciando entorno...',       color: '#4f8ef7' },
  { at: 20, msg: 'Cargando módulos...',         color: '#00c8e0' },
  { at: 45, msg: 'Compilando recursos...',      color: '#9d4edd' },
  { at: 70, msg: 'Optimizando interfaz...',     color: '#4f8ef7' },
  { at: 88, msg: 'Sistema listo.',              color: '#00ff9d' },
];

const getPhase = (p) => {
  let phase = PHASES[0];
  PHASES.forEach(ph => { if (p >= ph.at) phase = ph; });
  return phase;
};

/* ── Main preloader ──────────────────────────────────── */
const Preloader = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [done,     setDone]     = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setDone(true);
            setTimeout(onLoadingComplete, 900);
          }, 600);
          return 100;
        }
        // Realistic acceleration curve
        const speed = prev < 30 ? 3.5
                    : prev < 60 ? 2.5
                    : prev < 85 ? 1.8
                    : 1.2;
        return Math.min(prev + Math.random() * speed + 0.8, 100);
      });
    }, 60);
    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  const phase   = getPhase(progress);
  const rounded = Math.round(progress);

  return (
    <motion.div
      className={`preloader ${done ? 'preloader--exit' : ''}`}
      exit={{
        clipPath: ['inset(0% 0% 0% 0%)', 'inset(50% 0% 50% 0%)', 'inset(50% 0% 50% 0%)'],
        transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      {/* Hex grid bg */}
      <HexGrid />

      {/* Ambient glows */}
      <div className="pl-glow pl-glow--a" aria-hidden />
      <div className="pl-glow pl-glow--b" aria-hidden />
      <div className="pl-glow pl-glow--c" aria-hidden />

      {/* Scan line */}
      <div className="pl-scanline" aria-hidden />

      {/* Main content */}
      <div className="pl-content">

        {/* Orbital ring wrapping the logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="pl-orbit-wrap"
        >
          <OrbitalRing progress={progress} />

          {/* Center logo */}
          <div className="pl-center-logo">
            <motion.div
              className="pl-logo"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <span className="pl-logo__bracket">&lt;</span>
              <GlitchText text="Edisson" />
              <span className="pl-logo__suffix">.dev</span>
              <span className="pl-logo__bracket">/&gt;</span>
            </motion.div>

            {/* Big percent counter */}
            <motion.div
              className="pl-counter"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{ '--phase-color': phase.color }}
            >
              {rounded}
              <span className="pl-counter__sym">%</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="pl-bar-wrap"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="pl-bar-track">
            <motion.div
              className="pl-bar-fill"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              style={{ '--phase-color': phase.color }}
            />
            {/* Particle head */}
            <motion.div
              className="pl-bar-head"
              animate={{ left: `${progress}%` }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              style={{ '--phase-color': phase.color }}
            />
          </div>
        </motion.div>

        {/* Status text */}
        <motion.div
          className="pl-status-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={phase.msg}
              className="pl-status"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              style={{ color: phase.color }}
            >
              <span className="pl-status__cursor">▋</span>
              {phase.msg}
            </motion.p>
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Corner decorations */}
      <div className="pl-corner pl-corner--tl" aria-hidden />
      <div className="pl-corner pl-corner--tr" aria-hidden />
      <div className="pl-corner pl-corner--bl" aria-hidden />
      <div className="pl-corner pl-corner--br" aria-hidden />
    </motion.div>
  );
};

export default Preloader;
