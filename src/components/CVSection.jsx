import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { FileText, ExternalLink, RefreshCw, X, Maximize2, ArrowLeft, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import carnetImg from '../assets/Foto_carnet.jpeg';
import './CVSection.css';

const CVSection = () => {
  const [carnetKey,     setCarnetKey]     = useState(0);
  const [isRetracted,   setIsRetracted]   = useState(false);
  const [showCV,        setShowCV]        = useState(false);
  const [isLoading,     setIsLoading]     = useState(true);
  const [isFullscreen,  setIsFullscreen]  = useState(false);
  const [modalConfig,   setModalConfig]   = useState({ url: '', title: '' });

  const openCVModal = (url, title) => {
    setModalConfig({ url, title });
    setIsLoading(true);
    setIsFullscreen(false);
    setShowCV(true);
  };

  React.useEffect(() => {
    if (showCV) {
      const t = setTimeout(() => setIsLoading(false), 3000);
      return () => clearTimeout(t);
    }
  }, [showCV]);

  // 3-D tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-100, 100], [12, -12]);
  const rotateY = useTransform(mx, [-100, 100], [-12, 12]);

  const handleMouseMove = (e) => {
    const r  = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - (r.left + r.width  / 2));
    my.set(e.clientY - (r.top  + r.height / 2));
  };
  const handleMouseLeave = () => { mx.set(0); my.set(0); };

  const reloadCarnet = () => {
    setIsRetracted(true);
    setTimeout(() => { setCarnetKey(k => k + 1); setIsRetracted(false); }, 800);
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className="section cv-section" id="cv">
      <div className="container cv-container">

        {/* ── Left: info ── */}
        <motion.div className="cv-content" {...fadeUp(0)}>
          <p className="section-eyebrow">Documentos</p>
          <h2 className="section-title">Mi <span className="gradient-text">Hoja de Vida</span></h2>
          <div className="divider" />

          <p className="cv-description">
            Aquí puedes visualizar mi trayectoria profesional. He dispuesto dos versiones:
            una <span className="tech-highlight">versión completa</span> con certificaciones bajo
            protocolo de seguridad, y una{' '}
            <span className="tech-highlight">versión ejecutiva</span> de acceso rápido.
          </p>

          {/* Quick stats */}
          <div className="cv-stats">
            <div className="cv-stat">
              <Briefcase size={18} className="cv-stat__icon" />
              <div>
                <p className="cv-stat__value">3+ años</p>
                <p className="cv-stat__label">Experiencia</p>
              </div>
            </div>
            <div className="cv-stat">
              <GraduationCap size={18} className="cv-stat__icon" />
              <div>
                <p className="cv-stat__value">Ing. Software</p>
                <p className="cv-stat__label">Homologación activa</p>
              </div>
            </div>
            <div className="cv-stat">
              <MapPin size={18} className="cv-stat__icon" />
              <div>
                <p className="cv-stat__value">Colombia</p>
                <p className="cv-stat__label">Disponible remoto</p>
              </div>
            </div>
          </div>

          <div className="cv-actions">
            <motion.a
              href="https://wa.link/y26h7a"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary cv-btn"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FileText size={18} />
              Solicitar CV Completo
            </motion.a>

            <motion.button
              onClick={() => openCVModal('/CV-sola-edisonpinza.pdf', 'CV Ejecutivo — Edisson Pinza')}
              className="btn-outline cv-btn"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <ExternalLink size={18} />
              Ver CV Básico
            </motion.button>

            <motion.button
              onClick={reloadCarnet}
              className="cv-reload-btn"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <RefreshCw size={16} />
              Recargar ID
            </motion.button>
          </div>
        </motion.div>

        {/* ── Right: 3-D ID card ── */}
        <div className="carnet-wrapper" style={{ perspective: '1000px' }}>
          <motion.div
            key={carnetKey}
            className="carnet-fall-container"
            initial={{ y: -900, rotate: 4 }}
            animate={{ y: isRetracted ? -1200 : 0, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 50, damping: 12, mass: 2 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              className="carnet"
              onClick={reloadCarnet}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d', cursor: 'pointer' }}
              animate={{ y: [0, 5, 0] }}
              transition={{ y: { repeat: Infinity, duration: 3.5, ease: 'easeInOut' } }}
            >
              {/* Glare overlay */}
              <div className="carnet-glare" aria-hidden />

              {/* Badge clip */}
              <div className="badge-clip">
                <div className="clip-front" />
                <div className="clip-back" />
                <div className="carnet-hole" />
              </div>
              <div className="carnet-strap" />

              {/* Header */}
              <div className="carnet-header">
                <span className="carnet-company">DEVELOPER ID</span>
                <div className="carnet-chip" />
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
                  {[
                    { label: 'ID',     value: '1233191088' },
                    { label: 'EXP',    value: 'Mid-Level' },
                    { label: 'GITHUB', value: '@edissonpinza98', href: 'https://github.com/edissonpinza98' },
                    { label: 'STATUS', value: 'AUTHENTICATED', accent: true },
                  ].map(({ label, value, href, accent }) => (
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
                  <div className="barcode-bars">
                    {[...Array(20)].map((_, i) => (
                      <div key={i} className={`bar bar-${i % 4}`} />
                    ))}
                  </div>
                  <span className="barcode-label">SN-1233191088-2026</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ── PDF Modal ── */}
      <AnimatePresence>
        {showCV && (
          <motion.div
            className="cv-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCV(false)}
          >
            <motion.div
              className={`cv-modal-content ${isFullscreen ? 'is-fullscreen' : ''}`}
              initial={{ scale: 0.92, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 40 }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              onContextMenu={(e) => e.preventDefault()}
            >
              <div className="cv-modal-header">
                <div className="modal-title-group">
                  <button className="modal-back-btn" onClick={() => setShowCV(false)}>
                    <ArrowLeft size={18} />
                  </button>
                  <span className="modal-title">{modalConfig.title}</span>
                </div>
                <div className="modal-actions">
                  <button className="modal-icon-btn" onClick={() => setIsFullscreen(f => !f)} title="Pantalla completa">
                    <Maximize2 size={16} />
                  </button>
                  <button className="modal-icon-btn modal-close" onClick={() => setShowCV(false)} title="Cerrar">
                    <X size={16} />
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
