import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

/* ══════════════════════════════════════════════════════
   MATRIX RAIN CANVAS
══════════════════════════════════════════════════════ */
const MatrixCanvas = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const FS   = 13;
    const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ01アカサタナハマ</>{}[];()=>const let import export function async await class';
    let cols   = Math.floor(canvas.width / FS);
    const drops = Array.from({ length: cols }, () => Math.random() * -50);

    const tick = () => {
      ctx.fillStyle = 'rgba(4, 4, 13, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
        const y  = drops[i] * FS;

        /* Head — bright */
        if (Math.random() > 0.92) {
          ctx.fillStyle = '#ffffff';
          ctx.font = `bold ${FS}px 'JetBrains Mono', monospace`;
        } else if (drops[i] > 2) {
          /* Use alternating green/blue/purple tones */
          const tone = i % 3;
          if (tone === 0)      ctx.fillStyle = `rgba(0, 255, 140, ${0.25 + Math.random() * 0.45})`;
          else if (tone === 1) ctx.fillStyle = `rgba(91, 155, 255, ${0.2 + Math.random() * 0.4})`;
          else                 ctx.fillStyle = `rgba(155, 107, 255, ${0.15 + Math.random() * 0.3})`;
          ctx.font = `${FS}px 'JetBrains Mono', monospace`;
        } else {
          ctx.fillStyle = 'rgba(0, 255, 140, 0.08)';
          ctx.font = `${FS}px 'JetBrains Mono', monospace`;
        }

        if (y > 0 && y < canvas.height) {
          ctx.fillText(ch, i * FS, y);
        }

        if (y > canvas.height && Math.random() > 0.97) {
          drops[i] = Math.random() * -30;
        }
        drops[i] += 0.55;
      }
    };

    const id = setInterval(tick, 40);

    const ro = new ResizeObserver(() => {
      resize();
      cols = Math.floor(canvas.width / FS);
      drops.length = 0;
      drops.push(...Array.from({ length: cols }, () => Math.random() * -50));
    });
    ro.observe(canvas);

    return () => { clearInterval(id); ro.disconnect(); };
  }, []);

  return <canvas ref={ref} className="pl-matrix-canvas" aria-hidden />;
};

/* ══════════════════════════════════════════════════════
   BOOT LOG LINES
══════════════════════════════════════════════════════ */
const LOG_SEQUENCE = [
  { tag: 'INFO', type: 'info', msg: <>Iniciando <b>runtime</b> v2.0.26…</> },
  { tag: 'RUN',  type: 'run',  msg: <>Cargando módulos <b>React · Vite</b></> },
  { tag: 'OK',   type: 'ok',   msg: <>Assets <b>compilados</b> correctamente</> },
  { tag: 'RUN',  type: 'run',  msg: <>Conectando a <b>Supabase</b> API…</> },
  { tag: 'OK',   type: 'ok',   msg: <>Base de datos <b>online</b></> },
  { tag: 'INFO', type: 'info', msg: <>Optimizando <b>interfaz</b> UI/UX</> },
  { tag: 'WARN', type: 'warn', msg: <>Precargando <b>proyectos</b> del portafolio</> },
  { tag: 'OK',   type: 'ok',   msg: <>Sistema <b>listo</b> — bienvenido</> },
];

/* ══════════════════════════════════════════════════════
   PHASE COLORS
══════════════════════════════════════════════════════ */
const PHASES = [
  { at: 0,  color: '#5b9bff', shadow: 'rgba(91,155,255,0.8)'  },
  { at: 25, color: '#00d4ee', shadow: 'rgba(0,212,238,0.8)'   },
  { at: 50, color: '#9b6bff', shadow: 'rgba(155,107,255,0.8)' },
  { at: 75, color: '#5b9bff', shadow: 'rgba(91,155,255,0.8)'  },
  { at: 92, color: '#00ff8c', shadow: 'rgba(0,255,140,0.8)'   },
];

const getPhase = p => [...PHASES].reverse().find(ph => p >= ph.at) || PHASES[0];

/* ══════════════════════════════════════════════════════
   TYPING NAME HOOK
══════════════════════════════════════════════════════ */
const useTyping = (text, startDelay = 600, speed = 80) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone]           = useState(false);

  useEffect(() => {
    let i = 0;
    const t0 = setTimeout(() => {
      const id = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(id); setDone(true); }
      }, speed);
      return () => clearInterval(id);
    }, startDelay);
    return () => clearTimeout(t0);
  }, [text, startDelay, speed]);

  return { displayed, done };
};

/* ══════════════════════════════════════════════════════
   MAIN PRELOADER
══════════════════════════════════════════════════════ */
const Preloader = ({ onLoadingComplete }) => {
  const [progress,   setProgress]   = useState(0);
  const [logLines,   setLogLines]   = useState([]);
  const [exiting,    setExiting]    = useState(false);
  const doneRef = useRef(false);

  /* Typing effect for name */
  const { displayed: firstName, done: firstDone } = useTyping('Edisson', 400,  85);
  const { displayed: lastName }                    = useTyping('Pinza',  firstDone ? 100 : 99999, 90);

  /* Boot log: add a line every ~progress threshold */
  const addLog = useCallback((line) => {
    setLogLines(prev => prev.length >= 8 ? [...prev.slice(1), line] : [...prev, line]);
  }, []);

  /* Progress ticker */
  useEffect(() => {
    let logIdx = 0;
    const logThresholds = [5, 15, 30, 45, 60, 72, 85, 96];

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          if (!doneRef.current) {
            doneRef.current = true;
            setTimeout(() => {
              setExiting(true);
              setTimeout(onLoadingComplete, 750);
            }, 400);
          }
          return 100;
        }

        const next = Math.min(
          prev + (Math.random() * (prev < 30 ? 3.5 : prev < 65 ? 2.5 : prev < 88 ? 1.6 : 0.8) + 0.4),
          100
        );

        /* Emit log lines at thresholds */
        while (logIdx < logThresholds.length && next >= logThresholds[logIdx]) {
          const entry = LOG_SEQUENCE[logIdx];
          if (entry) addLog({ ...entry, id: logIdx, time: new Date().toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) });
          logIdx++;
        }

        return next;
      });
    }, 55);

    return () => clearInterval(timer);
  }, [onLoadingComplete, addLog]);

  const phase   = getPhase(progress);
  const rounded = Math.round(progress);
  const fillBg  = `linear-gradient(90deg, #5b9bff, ${phase.color})`;
  const fillGlow = `0 0 12px ${phase.shadow}, 0 0 28px ${phase.shadow}`;
  const headGlow = `0 0 8px 4px ${phase.shadow}, 0 0 20px 8px ${phase.shadow}`;

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="preloader"
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Scanlines */}
          <div className="pl-scanlines" aria-hidden />

          {/* HUD corners */}
          {['tl','tr','bl','br'].map(p => (
            <div key={p} className={`pl-hud pl-hud--${p}`} aria-hidden />
          ))}

          {/* ── LEFT: matrix rain ── */}
          <div className="pl-left">
            <MatrixCanvas />
            <div className="pl-left-glow" aria-hidden />
          </div>

          {/* Divider glow */}
          <div className="pl-divider-glow" aria-hidden />

          {/* ── RIGHT: terminal UI ── */}
          <div className="pl-right">
            <div className="pl-right-glow" aria-hidden />

            {/* System label */}
            <motion.div
              className="pl-sys-label"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              PORTFOLIO · BOOT SEQUENCE
            </motion.div>

            {/* Name */}
            <div className="pl-name-block">
              <motion.p
                className="pl-name-prefix"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                &gt; whoami
              </motion.p>
              <div className="pl-name">
                <span className="pl-name__first">{firstName}</span>
                {firstDone && <>&nbsp;</>}
                <span className="pl-name__last">{firstDone ? lastName : ''}</span>
                <span className="pl-name__cursor" aria-hidden />
              </div>
            </div>

            {/* Role */}
            <motion.div
              className="pl-role"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
            >
              Full Stack Developer · AI · UI/UX
            </motion.div>

            {/* Boot log */}
            <motion.div
              className="pl-log"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <AnimatePresence initial={false}>
                {logLines.map((line, i) => (
                  <motion.div
                    key={line.id}
                    className={`pl-log-line ${i === logLines.length - 1 ? 'pl-log-line--active' : ''}`}
                    initial={{ opacity: 0, x: -10, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, x: 0,   filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.28 }}
                  >
                    <span className="pl-log-line__time">{line.time}</span>
                    <span className={`pl-log-line__tag pl-log-line__tag--${line.type}`}>{line.tag}</span>
                    <span className="pl-log-line__msg">{line.msg}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Progress */}
            <motion.div
              className="pl-progress-block"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="pl-progress-header">
                <span className="pl-progress-label">Cargando sistema</span>
                <span
                  className="pl-pct"
                  style={{ color: phase.color, textShadow: `0 0 18px ${phase.shadow}` }}
                >
                  {rounded}%
                </span>
              </div>

              <div className="pl-track">
                {/* Segment ticks */}
                <div className="pl-track-ticks" aria-hidden>
                  {[...Array(19)].map((_, i) => <div key={i} className="pl-tick" />)}
                </div>

                {/* Fill */}
                <motion.div
                  className="pl-fill"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  style={{ background: fillBg, boxShadow: fillGlow }}
                >
                  {/* Head particle */}
                  <div
                    className="pl-fill-head"
                    style={{ boxShadow: headGlow }}
                  />
                </motion.div>
              </div>

              <div className="pl-progress-footer">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </motion.div>
          </div>

        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Preloader;
