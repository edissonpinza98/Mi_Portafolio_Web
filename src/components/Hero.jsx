import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ArrowRight, Github, Linkedin, Download } from 'lucide-react';
import profileImg from '../assets/Foto-inicio.jpg';
import './Hero.css';

const Hero = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const fontSize = 13;
    let columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    const letters = '01';

    const draw = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(79, 142, 247, 0.18)';
      ctx.font = `${fontSize}px var(--font-mono)`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 40);
    const ro = new ResizeObserver(() => {
      resize();
      columns = Math.floor(canvas.width / fontSize);
      drops.length = 0;
      drops.push(...Array(columns).fill(1));
    });
    ro.observe(canvas);

    return () => {
      clearInterval(interval);
      ro.disconnect();
    };
  }, []);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section id="hero" className="hero-section">
      {/* Ambient glow */}
      <div className="hero-glow hero-glow--left"  aria-hidden />
      <div className="hero-glow hero-glow--right" aria-hidden />

      <div className="container hero-inner">

        {/* ── Text side ── */}
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
              Ver Proyectos <ArrowRight size={17} />
            </Link>
            <Link to="contact" smooth offset={-80} duration={500} className="btn-outline">
              Contactar
            </Link>
          </motion.div>

          <motion.div className="hero-socials" {...fadeUp(0.65)}>
            <a href="https://github.com/edissonpinza98"
               target="_blank" rel="noopener noreferrer"
               className="hero-social" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/edisson-pinza-613160249"
               target="_blank" rel="noopener noreferrer"
               className="hero-social" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="/CV-sola-edisonpinza.pdf"
               target="_blank" rel="noopener noreferrer"
               className="hero-social" aria-label="Descargar CV">
              <Download size={18} />
            </a>
            <span className="hero-social-divider" />
            <span className="hero-available">
              <span className="hero-available__dot" />
              Disponible para proyectos
            </span>
          </motion.div>
        </div>

        {/* ── Image side ── */}
        <motion.div
          className="hero-image-wrap"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Matrix canvas behind image */}
          <canvas ref={canvasRef} className="hero-canvas" aria-hidden />

          {/* Decorative ring */}
          <div className="hero-ring" aria-hidden />

          {/* Photo */}
          <div className="hero-photo-frame">
            <img src={profileImg} alt="Edisson Pinza — Desarrollador Full Stack" className="hero-photo" />
          </div>

          {/* Floating badge */}
          <motion.div
            className="hero-badge"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="hero-badge__icon">⚡</span>
            <div>
              <p className="hero-badge__label">Experiencia</p>
              <p className="hero-badge__value">3+ años</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
