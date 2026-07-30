import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import {
  FileText, ExternalLink, RefreshCw, X,
  Maximize2, Minimize2, ArrowLeft, MapPin, Briefcase, GraduationCap,
} from 'lucide-react';
import carnetImg from '../assets/Foto_carnet.jpeg';
import './CVSection.css';

const STATS = [
  { icon: <Briefcase size={16} />,    value: '3+ años',      label: 'Experiencia' },
  { icon: <GraduationCap size={16} />, value: 'Ing. Software', label: 'Homologación' },
  { icon: <MapPin size={16} />,        value: 'Colombia',      label: 'Remoto / Híbrido' },
];

const SKILLS = [
  { label: 'React',    color: 'default' },
  { label: 'Angular',  color: 'purple'  },
  { label: 'Vue',      color: 'cyan'    },
  { label: 'Node.js',  color: 'green'   },
  { label: 'Python',   color: 'default' },
  { label: 'Firebase', color: 'purple'  },
  { label: 'MySQL',    color: 'cyan'    },
  { label: 'Docker',   color: 'default' },
];

/* ── Barcode bars definition ───────────────────────── */
const BARS = [1,4,2,5,0,3,1,5,2,4,0,3,5,1,4,2,3,0,5,1,3,4,2,0,5];

const CVSection = () => {
  const [carnetKey,    setCarnetKey]    = useState(0);
  const [isRetracted,  setIsRetracted]  = useState(false);
  const [showCV,       setShowCV]       = useState(false);
  const [isLoading,    setIsLoading]    = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [modalConfig,  setModalConfig]  = useState({ url: '', title: '' });

  const openCVModal = (url, title) => {
    setModalConfig({ url, title });
    setIsLoading(true);
    setIsFullscreen(false);
    setShowCV(true);
  };

  React.useEffect(() => {
    if (showCV) {
      const t = setTimeout(() => setIsLoading(false), 3200);
      return () => clearTimeout(t);
    }
  }, [showCV]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-100, 100], [10, -10]);
  const rotateY = useTransform(mx, [-100, 100], [-10, 10]);

  const handleMouseMove  = e => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - (r.left + r.width  / 2));
    my.set(e.clientY - (r.top  + r.height / 2));
  };
  const handleMouseLeave = () => { mx.set(0); my.set(0); };

  const reloadCarnet = () => {
    setIsRetracted(true);
    setTimeout(() => { setCarnetKey(k => k + 1); setIsRetracted(false); }, 750);
  };

  const fadeUp = (delay = 0) => ({
    initial:     { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0  },
    viewport:    { once: true },
    transition:  { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="section cv-section" id="cv">
      <div className="container cv-container">

        {/* ── LEFT: text ── */}
        <motion.div className="cv-content" {...fadeUp(0)}>
          <p className="section-eyebrow">Documentos</p>
          <h2 className="section-title">Mi <span className="gradient-text">Hoja de Vida</span></h2>
          <div className="divider" />

          <p className="cv-description">
            Aquí puedes ver mi trayectoria profesional. Dispongo de dos versiones: una{' '}
            <span className="tech-highlight">versión completa</span> con todas mis certificaciones,
            y una <span className="tech-highlight">versión ejecutiva</span> de acceso rápido para
            una revisión inicial ágil.
          </p>

          <div className="cv-stats">
            {STATS.map((s, i) => (
              <motion.div key={s.label} className="cv-stat" {...fadeUp(0.1 + i * 0.08)}>
                <div className="cv-stat__icon-wrap">{s.icon}</div>
                <div>
                  <p className="cv-stat__value">{s.value}</p>
                  <p className="cv-stat__label">{s.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="cv-actions">
            <motion.a
              href="https://wa.link/y26h7a" target="_blank" rel="noopener noreferrer"
              className="btn-primary cv-btn"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            >
              <FileText size={16} /> Solicitar CV Completo
            </motion.a>

            <motion.button
              onClick={() => openCVModal('/CV-sola-edisonpinza.pdf', 'CV Ejecutivo — Edisson Pinza')}
              className="btn-outline cv-btn"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            >
              <ExternalLink size={16} /> Ver CV Ejecutivo
            </motion.button>

            <motion.button
              onClick={reloadCarnet}
              className="cv-reload-btn"
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
            >
              <RefreshCw size={15} /> Recargar ID
            </motion.button>
          </div>
        </motion.div>

        {/* ── RIGHT: ID card ── */}
        <motion.div className="carnet-wrapper" style={{ perspective: '1100px' }} {...fadeUp(0.2)}>
          <motion.div
            key={carnetKey}
            className="carnet-fall-container"
            initial={{ y: -980, rotate: 6, opacity: 0 }}
            animate={{ y: isRetracted ? -1300 : 0, rotate: 0, opacity: isRetracted ? 0 : 1 }}
            transition={{ type: 'spring', stiffness: 46, damping: 15, mass: 2.3 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Lanyard */}
            <div className="carnet-lanyard-wrap">
              <div className="carnet-clip-bar" />
              <div className="carnet-lanyard" />
            </div>

            {/* Card */}
            <motion.div
              className="carnet"
              onClick={reloadCarnet}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              animate={{ y: [0, 7, 0] }}
              transition={{ y: { repeat: Infinity, duration: 4, ease: 'easeInOut' } }}
            >
              {/* Layers */}
              <div className="carnet-bg" aria-hidden />
              <div className="carnet-border-ring" aria-hidden />
              <div className="carnet-glare" aria-hidden />
              <div className="carnet-scanline" aria-hidden />
              <div className="carnet-holo" aria-hidden />

              {/* ── Top stripe ── */}
              <div className="carnet-stripe">
                <div className="carnet-org">
                  <span className="carnet-org__name">Edisson · Dev</span>
                  <span className="carnet-org__sub">Software Engineer</span>
                </div>
                <div className="carnet-nfc">
                  <div className="carnet-chip" />
                  <span className="carnet-id-num">ID · 2026</span>
                </div>
              </div>

              {/* ── Body ── */}
              <div className="carnet-body">
                {/* Photo + status */}
                <div className="carnet-photo-col">
                  <div className="carnet-photo-frame">
                    <img src={carnetImg} alt="Edisson Pinza" className="carnet-photo" />
                  </div>
                  <div className="carnet-online">
                    <span className="carnet-online__dot" />
                    ACTIVO
                  </div>
                </div>

                {/* Info */}
                <div className="carnet-info-col">
                  <h3 className="carnet-name">Edisson H.<br />Pinza Jojoa</h3>
                  <p className="carnet-role">
                    Técnico en Sistemas<br />Full Stack Developer
                  </p>

                  <div className="carnet-fields">
                    <div className="carnet-field">
                      <span className="carnet-field__label">Cédula</span>
                      <span className="carnet-field__val">1.233.191.088</span>
                    </div>
                    <div className="carnet-field">
                      <span className="carnet-field__label">Nivel</span>
                      <span className="carnet-field__val">Mid-Level · Full Stack</span>
                    </div>
                    <div className="carnet-field">
                      <span className="carnet-field__label">GitHub</span>
                      <a
                        href="https://github.com/edissonpinza98"
                        target="_blank" rel="noopener noreferrer"
                        className="carnet-field__val is-link"
                        onClick={e => e.stopPropagation()}
                      >
                        @edissonpinza98
                      </a>
                    </div>
                    <div className="carnet-field">
                      <span className="carnet-field__label">Disponibilidad</span>
                      <span className="carnet-field__val">Remoto · Híbrido</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Divider ── */}
              <div className="carnet-divider" aria-hidden />

              {/* ── Skills ── */}
              <div className="carnet-skills">
                {SKILLS.map(s => (
                  <span key={s.label} className={`carnet-skill-tag ${s.color !== 'default' ? s.color : ''}`}>
                    {s.label}
                  </span>
                ))}
              </div>

              {/* ── Footer barcode ── */}
              <div className="carnet-footer">
                <div className="barcode-wrap">
                  <div className="barcode-bars" aria-hidden>
                    {BARS.map((b, i) => (
                      <div key={i} className={`bar bar-${b}`} />
                    ))}
                  </div>
                  <span className="barcode-label">EP-1233191088-2026</span>
                </div>

                <div className="carnet-footer-badge">
                  <span className="carnet-access-level">✦ FULL ACCESS</span>
                  <span className="carnet-issued">EMI: 01/2024 · EXP: 12/2026</span>
                </div>
              </div>

            </motion.div>
          </motion.div>
        </motion.div>

      </div>

      {/* ── PDF Modal ── */}
      <AnimatePresence>
        {showCV && (
          <motion.div
            className="cv-modal-overlay"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setShowCV(false)}
          >
            <motion.div
              className={`cv-modal-content ${isFullscreen ? 'is-fullscreen' : ''}`}
              initial={{ scale: 0.93, opacity: 0, y: 36 }}
              animate={{ scale: 1,    opacity: 1, y: 0  }}
              exit={{    scale: 0.93, opacity: 0, y: 36 }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              onClick={e => e.stopPropagation()}
              onContextMenu={e => e.preventDefault()}
            >
              <div className="cv-modal-header">
                <div className="modal-title-group">
                  <button className="modal-back-btn" onClick={() => setShowCV(false)}>
                    <ArrowLeft size={16} />
                  </button>
                  <span className="modal-dot" aria-hidden />
                  <span className="modal-title">{modalConfig.title}</span>
                </div>
                <div className="modal-actions">
                  <button className="modal-icon-btn" onClick={() => setIsFullscreen(f => !f)}
                    title={isFullscreen ? 'Salir pantalla completa' : 'Pantalla completa'}>
                    {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
                  </button>
                  <button className="modal-icon-btn modal-close" onClick={() => setShowCV(false)} title="Cerrar">
                    <X size={15} />
                  </button>
                </div>
              </div>

              <div className="cv-modal-body">
                {isLoading && (
                  <div className="cv-loader">
                    <div className="cv-spinner" />
                    <p>Cargando documento...</p>
                  </div>
                )}
                <iframe
                  src={modalConfig.url}
                  title={modalConfig.title}
                  className="cv-iframe"
                  onLoad={() => setIsLoading(false)}
                  style={{ opacity: isLoading ? 0 : 1 }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CVSection;
