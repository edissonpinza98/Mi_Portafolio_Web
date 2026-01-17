import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Mail, ExternalLink, User, Github, RefreshCw } from 'lucide-react';
import carnetImg from '../assets/Foto_carnet.jpeg';
import './CVSection.css';

const CVSection = () => {
    const [carnetKey, setCarnetKey] = useState(0);
    const [isRetracted, setIsRetracted] = useState(false);
    const [showCV, setShowCV] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

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
                    <h2 className="section-title">Mi <span className="gradient-text">Hoja de Vida</span></h2>
                    <p className="cv-description">
                        Aquí puedes visualizar mi experiencia profesional detallada y descargar mi currículum actualizado a la fecha.
                        Estoy disponible para nuevas oportunidades.
                    </p>

                    <div className="cv-actions">
                        <motion.a
                            href="/CV-sola-edisonpinza.pdf"
                            download="Edisson_Pinza_CV.pdf"
                            className="btn-primary cv-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Download size={20} />
                            Descargar CV
                        </motion.a>

                        <motion.button
                            onClick={() => setShowCV(true)}
                            className="btn-outline cv-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ cursor: 'pointer' }}
                        >
                            <FileText size={20} />
                            Ver Online
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

                    <div className="additional-docs">
                        <h3 className="docs-title">Documentación Técnica</h3>
                        <ul className="docs-list">
                            <li>
                                <div className="doc-icon-wrapper">
                                    <ExternalLink size={14} />
                                </div>
                                <span>Certificaciones de Ingeniería</span>
                            </li>
                            <li>
                                <div className="doc-icon-wrapper">
                                    <ExternalLink size={14} />
                                </div>
                                <span>Portafolio de Proyectos PDF</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right Side: The Falling Carnet */}
                <div className="carnet-wrapper">
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
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >


                        <motion.div
                            className="carnet glass-card"
                            onClick={reloadCarnet}
                            style={{ cursor: 'pointer' }}
                            animate={{
                                rotate: [0, 2, 0, -2, 0],
                                y: [0, 5, 0, 5, 0]
                            }}
                            transition={{
                                rotate: {
                                    repeat: Infinity,
                                    duration: 5,
                                    ease: "easeInOut"
                                },
                                y: {
                                    repeat: Infinity,
                                    duration: 3,
                                    ease: "easeInOut"
                                }
                            }}
                        >
                            {/* Hanging String Visualization (Visual sugar) */}
                            <div className="carnet-hole"></div>

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
                                <p className="carnet-role" style={{ fontSize: '0.75rem', lineHeight: '1.2' }}>
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
                                <div className="barcode">||| || ||| || ||||</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

            </div>

            {/* PDF Viewer Modal */}
            <AnimatePresence>
                {showCV && (
                    <motion.div
                        className="cv-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowCV(false)}
                    >
                        {/* Futuristic Background Grid */}
                        <div className="cyber-grid-bg"></div>

                        <motion.div
                            className="cv-modal-content glass-card"
                            initial={{ scale: 0.8, opacity: 0, y: 100, rotateX: -15 }}
                            animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 100, rotateX: 15 }}
                            transition={{ type: "spring", damping: 30, stiffness: 200 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Scanning line effect */}
                            <div className="modal-scan-line"></div>
                            <div className="cv-modal-header">
                                <div className="modal-title-group">
                                    <FileText className="modal-icon" size={24} />
                                    <div className="header-text">
                                        <h3>Curriculum Vitae</h3>
                                        <span className="file-info">Edisson_Pinza_CV.pdf • PDF</span>
                                    </div>
                                </div>
                                <button className="close-btn" onClick={() => setShowCV(false)} aria-label="Cerrar">
                                    <RefreshCw size={24} className="close-icon" />
                                </button>
                            </div>

                            <div className="cv-viewer-container">
                                {isLoading && (
                                    <div className="cv-loader-overlay">
                                        <div className="loader-spinner"></div>
                                        <p>Preparando documento...</p>
                                    </div>
                                )}
                                <iframe
                                    src="/CV-sola-edisonpinza.pdf#toolbar=0&navpanes=0&scrollbar=0"
                                    title="CV Viewer"
                                    className="cv-iframe"
                                    onLoad={() => setIsLoading(false)}
                                />
                            </div>

                            <div className="cv-modal-footer">
                                <div className="footer-actions">
                                    <a href="/CV-sola-edisonpinza.pdf" download="Edisson_Pinza_CV.pdf" className="btn-primary footer-btn">
                                        <Download size={18} /> Descargar PDF
                                    </a>
                                    <button className="btn-outline footer-btn" onClick={() => setShowCV(false)}>
                                        Cerrar Vista
                                    </button>
                                </div>
                                <div className="modal-tech-details">
                                    <span>SECURE_VIEWER_V1.0</span>
                                    <span className="scan-line-text">SYSTEM_READY</span>
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
