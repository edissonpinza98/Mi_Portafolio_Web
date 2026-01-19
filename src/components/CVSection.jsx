import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { FileText, ExternalLink, RefreshCw, X, Maximize2, ArrowLeft } from 'lucide-react';
import carnetImg from '../assets/Foto_carnet.jpeg';
import './CVSection.css';

const CVSection = () => {
    const [carnetKey, setCarnetKey] = useState(0);
    const [isRetracted, setIsRetracted] = useState(false);
    const [showCV, setShowCV] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [modalConfig, setModalConfig] = useState({
        url: '',
        title: ''
    });

    const openCVModal = (url, title) => {
        setModalConfig({ url, title });
        setIsLoading(true);
        setIsFullscreen(false);
        setShowCV(true);
    };

    const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

    // Fallback security: ensure loader dismisses
    React.useEffect(() => {
        if (showCV) {
            const timer = setTimeout(() => setIsLoading(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showCV]);

    // 3D Tilt Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [15, -15]);
    const rotateY = useTransform(x, [-100, 100], [-15, 15]);

    const handleMouseMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(event.clientX - centerX);
        y.set(event.clientY - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const reloadCarnet = () => {
        setIsRetracted(true);
        setTimeout(() => {
            setCarnetKey(prev => prev + 1);
            setIsRetracted(false);
        }, 800);
    };

    return (
        <section className="section cv-section" id="cv">
            <div className="container cv-container">

                {/* Left Side: Documents & CV */}
                <div className="cv-content">
                    <div className="section-header">
                        <h2 className="section-title">Mi <span className="gradient-text">Hoja de Vida</span></h2>
                        <div className="header-decoration">
                            <span></span><span></span><span></span>
                        </div>
                    </div>

                    <p className="cv-description">
                        Aquí puedes visualizar mi trayectoria profesional. He dispuesto dos versiones para tu revisión:
                        una <span className="tech-highlight">versión completa</span> con certificaciones bajo protocolo de seguridad,
                        y una <span className="tech-highlight">versión ejecutiva</span> de acceso rápido.
                    </p>

                    <div className="cv-actions">
                        <motion.a
                            href="https://wa.link/y26h7a"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary cv-btn security-btn"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{
                                x: 0,
                                opacity: 1,
                                boxShadow: [
                                    "0 0 0px rgba(0, 242, 255, 0)",
                                    "0 0 20px rgba(0, 242, 255, 0.4)",
                                    "0 0 0px rgba(0, 242, 255, 0)"
                                ]
                            }}
                            transition={{
                                duration: 0.8,
                                boxShadow: {
                                    repeat: Infinity,
                                    duration: 2
                                }
                            }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ textDecoration: 'none' }}
                        >
                            <FileText size={20} />
                            Solicitar Full CV
                        </motion.a>

                        <motion.button
                            onClick={() => openCVModal("/CV-sola-edisonpinza.pdf", "Visualizador CV Ejecutivo")}
                            className="btn-outline cv-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <ExternalLink size={20} />
                            Ver CV (Básico)
                        </motion.button>

                        <motion.button
                            onClick={reloadCarnet}
                            className="btn-outline cv-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ padding: '0.8rem 1.5rem', cursor: 'pointer', background: 'rgba(0, 242, 255, 0.05)' }}
                        >
                            <RefreshCw size={20} />
                            Recargar ID
                        </motion.button>
                    </div>

                </div>

                {/* Right Side: The Falling Carnet */}
                <div className="carnet-wrapper" style={{ perspective: "1000px" }}>
                    <motion.div
                        key={carnetKey}
                        className="carnet-fall-container"
                        initial={{ y: -1000, rotate: 5 }}
                        animate={{ y: isRetracted ? -1500 : 0, rotate: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 50,
                            damping: 12,
                            mass: 2,
                            duration: 1.5
                        }}
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <motion.div
                            className="carnet glass-card"
                            onClick={reloadCarnet}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: 'preserve-3d',
                                cursor: 'pointer'
                            }}
                            animate={{
                                y: [0, 5, 0, 5, 0]
                            }}
                            transition={{
                                y: {
                                    repeat: Infinity,
                                    duration: 3,
                                    ease: "easeInOut"
                                }
                            }}
                        >
                            {/* Realistic Reflective Layer */}
                            <div className="carnet-glare"></div>

                            {/* Escarapela / Badge Holder Clip */}
                            <div className="badge-clip">
                                <div className="clip-front"></div>
                                <div className="clip-back"></div>
                                <div className="carnet-hole"></div>
                            </div>
                            <div className="carnet-strap"></div>

                            <div className="carnet-header">
                                <span className="carnet-company">DEVELOPER ID</span>
                                <div className="carnet-chip"></div>
                            </div>

                            <div className="carnet-body">
                                <div className="carnet-photo-frame">
                                    <div className="carnet-photo-placeholder">
                                        <img src={carnetImg} alt="Edisson Pinza" className="carnet-photo" />
                                    </div>
                                </div>

                                <h3 className="carnet-name">Edisson Hernando Pinza Jojoa</h3>
                                <p className="carnet-role">
                                    Técnico en sistemas y <br /> Desarrollador de Software Full Stack
                                </p>

                                <div className="carnet-info">
                                    <div className="info-row">
                                        <span className="label">ID:</span>
                                        <span className="value">1233191088</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="label">EXP:</span>
                                        <span className="value">Mid-Level</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="label">GITHUB:</span>
                                        <a href="https://github.com/edissonpinza98" target="_blank" rel="noopener noreferrer" className="value link">
                                            @edissonpinza98
                                        </a>
                                    </div>
                                    <div className="info-row">
                                        <span className="label">STATUS:</span>
                                        <span className="value status-active">AUTHENTICATED</span>
                                    </div>
                                </div>
                            </div>

                            <div className="carnet-footer">
                                <div className="barcode-container">
                                    <div className="barcode-bars">
                                        {[...Array(20)].map((_, i) => (
                                            <div key={i} className={`bar bar-${i % 4}`}></div>
                                        ))}
                                    </div>
                                    <span className="barcode-label">SN-1233191088-2026</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

            </div>

            {/* SECURE PROTECTED VIEWER MODAL */}
            <AnimatePresence>
                {showCV && (
                    <motion.div
                        className="cv-modal-overlay security-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className={`cv-modal-content glass-card security-card ${isFullscreen ? 'is-fullscreen' : ''}`}
                            initial={{ scale: 0.9, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 50 }}
                            onClick={(e) => e.stopPropagation()}
                            onContextMenu={(e) => e.preventDefault()}
                        >
                            <div className="cv-modal-header">
                                <div className="modal-title-group">
                                    <button className="back-btn" onClick={() => setShowCV(false)}>
                                        <ArrowLeft size={20} />
                                        <span>Regresar</span>
                                    </button>
                                    <div className="header-divider"></div>
                                    <div className="header-text">
                                        <h3>{modalConfig.title}</h3>
                                        <span className="file-info">ESTADO: LECTURA_PUBLICA</span>
                                    </div>
                                </div>
                                <div className="header-actions">
                                    <button
                                        className="maximize-btn"
                                        onClick={toggleFullscreen}
                                        title={isFullscreen ? "Restaurar" : "Pantalla Grande"}
                                    >
                                        <Maximize2 size={20} />
                                    </button>
                                    <button className="close-btn" onClick={() => setShowCV(false)}>
                                        <X size={24} />
                                    </button>
                                </div>
                            </div>

                            <div className="cv-viewer-container secure-viewer">
                                {isLoading && (
                                    <div className="cv-loader-overlay security-loader">
                                        <div className="loader-spinner"></div>
                                        <p>CARGANDO DOCUMENTO...</p>
                                    </div>
                                )}

                                <iframe
                                    src={modalConfig.url}
                                    title="CV Viewer"
                                    className="cv-iframe"
                                    onLoad={() => setIsLoading(false)}
                                    style={{
                                        backgroundColor: 'white',
                                        display: 'block'
                                    }}
                                />
                            </div>

                            <div className="cv-modal-footer security-footer">
                                <div className="terms-notice">
                                    Aviso: Visualización optimizada para navegadores modernos. Todos los derechos reservados © {new Date().getFullYear()}.
                                </div>
                                <div className="modal-tech-details">
                                    <span className="scan-line-text">SYSTEM_STABLE</span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
};

export default CVSection;
