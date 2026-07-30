import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import {
  FileText, ExternalLink, RefreshCw, X, Maximize2,
  ArrowLeft, MapPin, Briefcase, GraduationCap, Minimize2,
} from 'lucide-react';
import carnetImg from '../assets/Foto_carnet.jpeg';
import './CVSection.css';

/* ── Stat card data ─────────────────────────────────── */
const STATS = [
  {
    icon: <Briefcase size={16} />,
    value: '3+ años',
    label: 'Experiencia',
  },
  {
    icon: <GraduationCap size={16} />,
    value: 'Ing. Software',
    label: 'Homologación',
  },
  {
    icon: <MapPin size={16} />,
    value: 'Colombia',
    label: 'Remoto / Híbrido',
  },
];

/* ── Info rows on the ID card ───────────────────────── */
const CARD_INFO = [
  { label: 'ID',     value: '1233191088' },
  { label: 'EXP',    value: 'Mid-Level' },
  { label: 'GITHUB', value: '@edissonpinza98', href: 'https://github.com/edissonpinza98' },
  { label: 'STATUS', value: 'AUTHENTICATED', accent: true },
];

const CVSection = () => {
  const [carnetKey,    setCarnetKey]    = useState(0);
  const [isRetracted,  setIsRetracted]  = useState(false);
  const [showCV,       setShowCV]       = useState(false);
  const [isLoading,    setIsLoading]    = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [modalConfig,  setModalConfig]  = useState({ url: '', title: '' });

  /* ── Open PDF modal ── */
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

  /* ── 3-D tilt ── */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-100, 100], [12, -12]);
  const rotateY = useTransform(mx, [-100, 100], [-12, 12]);

  const handleMouseMove  = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - (r.left + r.width  / 2));
    my.set(e.clientY - (r.top  + r.height / 2));
  };
  const handleMouseLeave = () => { mx.set(0); my.set(0); };

  /* ── Reload carnet animation ── */
  const reloadCarnet = () => {
    setIsRetracted(true);
    setTimeout(() => { setCarnetKey(k => k + 1); setIsRetracted(false); }, 800);
  };

  const fadeUp = (delay = 0) => ({
    initial:    { opacity: 0, y: 24 },
    whileInView:{ opacity: 1, y: 0  },
    viewport:   { once: true },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="section cv-section" id="cv">
      <div className="container cv-container">

        {/* ════════════ LEFT — Text content ════════════ */}
        <motion.div className="cv-content" {...fadeUp(0)}>
          <p className="section-eyebrow">Documentos</p>
          <h2 className="section-title">Mi <span className="gradient-text">Hoja de Vida</span></h2>
          <div className="divider" />

          <p className="cv-description">
            Aquí puedes ver mi trayectoria profesional. Dispongo de dos versiones: una{' '}
            <span className="tech-highlight">versión completa</span> con todas mis certificaciones,
            y una <span className="tech-highlight">versión ejecutiva</span> de acceso rápido para
            revisión inicial.
          </p>

          {/* Stats */}
          <div className="cv-stats">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                className="cv-stat"
                {...fadeUp(0.1 + i * 0.08)}
              >
                <div className="cv-stat__icon-wrap">{s.icon}</div>
                <div>
                  <p className="cv-stat__value">{s.value}</p>
                  <p className="cv-stat__label">{s.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Buttons */}
          <div className="cv-actions">
            <motion.a
              href="https://wa.link/y26h7a"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary cv-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <FileText size={16} />
              Solicitar CV Completo
            </motion.a>

            <motion.button
              onClick={() => openCVModal('/CV-sola-edisonpinza.pdf', 'CV Ejecutivo — Edisson Pinza')}
              className="btn-outline cv-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <ExternalLink size={16} />
              Ver CV Ejecutivo
            </motion.button>

            <motion.button
              onClick={reloadCarnet}
              className="cv-reload-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <RefreshCw size={15} />
              Recargar ID
            </motion.button>
          </div>
        </motion.div>

        {/* ════════════ RIGHT — ID Card ════════════ */}
        <motion.div
          className="carnet-wrapper"
          style={{ perspective: '1100px' }}
          {...fadeUp(0.2)}
        >
          <motion.div
            key={carnetKey}
            className="carnet-fall-container"
            initial={{ y: -950, rotate: 5, opacity: 0 }}
            animate={{ y: isRetracted ? -1200 : 0, rotate: 0, opacity: isRetracted ? 0 : 1 }}
            transition={{ type: 'spring', stiffness: 48, damping: 14, mass: 2.2 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              className="carnet"
              onClick={reloadCarnet}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              animate={{ y: [0, 6, 0] }}
              transition={{ y: { repeat: Infinity, duration: 3.8, ease: 'easeInOut' } }}
            >
              {/* Glare */}
              <div className="carnet-glare" aria-hidden />

              {/* Badge clip + strap */}
              <div className="badge-clip" aria-hidden>
                <div className="clip-front" />
                <div className="clip-back" />
                <div className="carnet-hole" />
              </div>
              <div className="carnet-strap" aria-hidden />

              {/* Header */}
              <div className="carnet-header">
                <span className="carnet-company">Developer ID</span>
                <div className="carnet-chip" aria-hidden />
              </div>

              {/* Body */}
              <div className="carnet-body">
                <div className="carnet-photo-frame">
                  <img src={carnetImg} alt="Edisson Pinza" className="carnet-photo" />
                </div>

                <h3 className="carnet-name">Edisson Hernando Pinza Jojoa</h3>
                <p className="carnet-role">
                  Técnico en Sistemas &amp;<br />Desarrollador Full Stack
                </p>

                <div className="carnet-info">
                  {CARD_INFO.map(({ label, value, href, accent }) => (
                    <div key={label} className="info-row">
                      <span className="label">{label}:</span>
                      {href
                        ? <a href={href} target="_blank" rel="noopener noreferrer" className="value link">{value}</a>
                        : <span className={`value ${accent ? 'status-active' : ''}`}>{value}</span>
                      }
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer barcode */}
              <div className="carnet-footer">
                <div className="barcode-container">
                  <div className="barcode-bars" aria-hidden>
                    {[...Array(22)].map((_, i) => (
                      <div key={i} className={`bar bar-${i % 4}`} />
                    ))}
                  </div>
                  <span className="barcode-label">SN-1233191088-2026</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>

      {/* ════════════ PDF Modal ════════════ */}
      <AnimatePresence>
        {showCV && (
          <motion.div
            className="cv-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setShowCV(false)}
          >
            <motion.div
              className={`cv-modal-content ${isFullscreen ? 'is-fullscreen' : ''}`}
              initial={{ scale: 0.93, opacity: 0, y: 36 }}
              animate={{ scale: 1,    opacity: 1, y: 0  }}
              exit={{ scale: 0.93,    opacity: 0, y: 36 }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              onContextMenu={(e) => e.preventDefault()}
            >
              {/* Modal header */}
              <div className="cv-modal-header">
                <div className="modal-title-group">
                  <button className="modal-back-btn" onClick={() => setShowCV(false)} title="Cerrar">
                    <ArrowLeft size={16} />
                  </button>
                  <span className="modal-dot" aria-hidden />
                  <span className="modal-title">{modalConfig.title}</span>
                </div>
                <div className="modal-actions">
                  <button
                    className="modal-icon-btn"
                    onClick={() => setIsFullscreen(f => !f)}
                    title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
                  >
                    {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
                  </button>
                  <button className="modal-icon-btn modal-close" onClick={() => setShowCV(false)} title="Cerrar">
                    <X size={15} />
                  </button>
                </div>
              </div>

              {/* Modal body */}
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
