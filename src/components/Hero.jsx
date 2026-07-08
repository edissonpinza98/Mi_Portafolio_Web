import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ArrowRight, Github, Linkedin, Download, Zap, Code2 } from 'lucide-react';
import profileImg from '../assets/Foto-inicio.jpg';
import './Hero.css';

/* ─────────────────────────────────────────────────────
   Matrix canvas — renders OVER the photo with
   mix-blend-mode so the face stays fully visible.
───────────────────────────────────────────────────── */
const MatrixOverlay = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width  = W;
    canvas.height = H;

    const FS   = 11;                  // font size
    const cols  = Math.floor(W / FS);
    const drops = Array.from({ length: cols }, () => -Math.random() * 30);

    // Mix of binary + hex chars for a dev feel
    const CHARS = '01アイウエオカキクケコ0123456789ABCDEF<>/\\{}[]|';

    let frame;
    const tick = () => {
      // Fade trail — very transparent black so face shows through
      ctx.fillStyle = 'rgba(7, 7, 15, 0.18)';
      ctx.fillRect(0, 0, W, H);

      for (let i = 0; i < cols; i++) {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
        const y  = drops[i] * FS;

        // Head char — bright cyan
        if (drops[i] >= 0) {
          ctx.fillStyle = '#00d4ee';
          ctx.font      = `bold ${FS}px JetBrains Mono, monospace`;
          ctx.fillText(ch, i * FS, y);
        }

        // Trailing chars — dim green
        if (drops[i] - 1 >= 0) {
          ctx.fillStyle = 'rgba(0, 255, 157, 0.45)';
          ctx.font      = `${FS}px JetBrains Mono, monospace`;
          const trailCh = CHARS[Math.floor(Math.random() * CHARS.length)];
          ctx.fillText(trailCh, i * FS, (drops[i] - 1) * FS);
        }

        if (drops[i] * FS > H && Math.random() > 0.965) {
          drops[i] = -Math.floor(Math.random() * 20);
        }
        drops[i] += 0.5; // slow, deliberate speed
      }
      frame = requestAnimationFrame(tick);
    };

    // Start with a slight delay so the photo is visible first
    const t = setTimeout(() => { frame = requestAnimationFrame(tick); }, 400);

    return () => {
      clearTimeout(t);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-matrix-overlay" aria-hidden />;
};

/* ─────────────────────────────────────────────────────
   Background ambient canvas (behind the card)
───────────────────────────────────────────────────── */
const AmbientCanvas = () => {
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
    let cols   = Math.floor(canvas.width / FS);
    const drops = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(7,7,15,0.07)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(91,155,255,0.11)';
      ctx.font      = `${FS}px JetBrains Mono, monospace`;
      for (let i = 0; i < drops.length; i++) {
        const t = Math.random() > 0.5 ? '1' : '0';
        ctx.fillText(t, i * FS, drops[i] * FS);
        if (drops[i] * FS > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const id = setInterval(draw, 45);
    const ro = new ResizeObserver(() => {
      resize();
      cols = Math.floor(canvas.width / FS);
      drops.length = 0;
      drops.push(...Array(cols).fill(1));
    });
    ro.observe(canvas);
    return () => { clearInterval(id); ro.disconnect(); };
  }, []);

  return <canvas ref={ref} className="hero-canvas" aria-hidden />;
};

/* ─────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────── */
const Hero = () => {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section id="hero" className="hero-section">
      <div className="hero-glow hero-glow--left"  aria-hidden />
      <div className="hero-glow hero-glow--right" aria-hidden />
      <div className="hero-glow hero-glow--top"   aria-hidden />

      <div className="container hero-inner">

        {/* ── Left ── */}
        <div className="hero-text">
          <motion.p className="hero-eyebrow section-eyebrow" {...fadeUp(0.1)}>
            Desarrollador de Software · Full Stack
          </motion.p>

          <motion.h1 className="hero-title" {...fadeUp(0.2)}>
            Hola, soy<br />
            <span className="gradient-text">Edisson Pinza</span>
          </motion.h1>

          <motion.p className="hero-desc" {...fadeUp(0.35)}>
            Desarrollo soluciones web modernas combinando React, Angular y consumo de APIs,
            integrando inteligencia artificial junto con diseño UI/UX para crear aplicaciones
            eficientes, escalables y orientadas a problemas reales.
          </motion.p>

          <motion.div className="hero-actions" {...fadeUp(0.5)}>
            <Link to="projects" smooth offset={-80} duration={500} className="btn-primary">
              Ver Proyectos <ArrowRight size={16} />
            </Link>
            <Link to="contact" smooth offset={-80} duration={500} className="btn-outline">
              Contactar
            </Link>
          </motion.div>

          <motion.div className="hero-socials" {...fadeUp(0.65)}>
            <a href="https://github.com/edissonpinza98"
               target="_blank" rel="noopener noreferrer"
               className="hero-social" aria-label="GitHub">
              <Github size={17} />
            </a>
            <a href="https://www.linkedin.com/in/edisson-pinza-613160249"
               target="_blank" rel="noopener noreferrer"
               className="hero-social" aria-label="LinkedIn">
              <Linkedin size={17} />
            </a>
            <a href="/CV-sola-edisonpinza.pdf"
               target="_blank" rel="noopener noreferrer"
               className="hero-social" aria-label="Descargar CV">
              <Download size={17} />
            </a>
            <span className="hero-social-divider" />
            <span className="hero-available">
              <span className="hero-available__dot" />
              Disponible para proyectos
            </span>
          </motion.div>
        </div>

        {/* ── Right — photo card ── */}
        <motion.div
          className="hero-image-wrap"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1,   y: 0  }}
          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Ambient binary bg (behind card) */}
          <AmbientCanvas />

          {/* Decorative ring */}
          <div className="hero-ring" aria-hidden />

          {/* Glow pulse */}
          <div className="hero-photo-glow" aria-hidden />

          {/* Photo card */}
          <div className="hero-photo-card">
            {/* Real photo */}
            <img
              src={profileImg}
              alt="Edisson Pinza — Desarrollador Full Stack"
              className="hero-photo"
              draggable={false}
            />

            {/* Matrix overlay ON TOP of photo */}
            <MatrixOverlay />

            {/* Gradient vignette edges so matrix fades at borders */}
            <div className="hero-photo-vignette" aria-hidden />

            {/* Gradient border shimmer */}
            <div className="hero-photo-shimmer" aria-hidden />

            {/* Corner scan accent — top-right */}
            <div className="hero-corner hero-corner--tr" aria-hidden />
            <div className="hero-corner hero-corner--bl" aria-hidden />

            {/* Scan line animation */}
            <div className="hero-scanline" aria-hidden />
          </div>

          {/* Badge — bottom right */}
          <motion.div
            className="hero-badge hero-badge--br"
            animate={{ y: [0, -7, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="hero-badge__ico hero-badge__ico--blue">
              <Zap size={14} />
            </span>
            <div>
              <p className="hero-badge__label">Experiencia</p>
              <p className="hero-badge__value">3+ años</p>
            </div>
          </motion.div>

          {/* Badge — top left */}
          <motion.div
            className="hero-badge hero-badge--tl"
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
          >
            <span className="hero-badge__ico hero-badge__ico--purple">
              <Code2 size={14} />
            </span>
            <div>
              <p className="hero-badge__label">Stack</p>
              <p className="hero-badge__value">Full Stack</p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
