import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Mail, ExternalLink, User } from 'lucide-react';
import './CVSection.css';

const CVSection = () => {
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
                            href="#"
                            className="btn-primary cv-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Download size={20} />
                            Descargar CV
                        </motion.a>

                        <motion.a
                            href="#"
                            className="btn-outline cv-btn"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FileText size={20} />
                            Ver Online
                        </motion.a>
                    </div>

                    <div className="additional-docs">
                        <h3>Documentos Adicionales</h3>
                        <ul className="docs-list">
                            <li>
                                <ExternalLink size={16} /> Certificaciones
                            </li>
                            <li>
                                <ExternalLink size={16} /> Portafolio PDF
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right Side: The Falling Carnet */}
                <div className="carnet-wrapper">
                    <motion.div
                        className="carnet-fall-container"
                        initial={{ y: -500, rotate: 5 }}
                        whileInView={{ y: 0, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            type: "spring",
                            stiffness: 60,
                            damping: 8,
                            mass: 2
                        }}
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                        {/* Lanyard/Strap visual connector */}
                        <div className="spring-connector">
                            <svg width="60" height="160" viewBox="0 0 60 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <linearGradient id="strapGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#00f2ff" />
                                        <stop offset="100%" stopColor="#7000ff" />
                                    </linearGradient>
                                </defs>
                                {/* Strap (Cordón) */}
                                <path
                                    d="M30 0 L30 140"
                                    stroke="url(#strapGradient)"
                                    strokeWidth="8"
                                    fill="none"
                                />
                                {/* Metal Clip at the bottom */}
                                <rect x="20" y="135" width="20" height="15" rx="2" fill="#aaa" />
                                <circle cx="30" cy="142" r="3" fill="#333" />
                                <path d="M25 150 L35 150 L32 160 L28 160 Z" fill="#ccc" />
                            </svg>
                        </div>

                        <motion.div
                            className="carnet glass-card"
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
                                        <User size={64} color="#a0a0a0" />
                                    </div>
                                </div>

                                <h3 className="carnet-name">Tu Nombre</h3>
                                <p className="carnet-role">Full Stack Developer</p>

                                <div className="carnet-info">
                                    <div className="info-row">
                                        <span className="label">ID:</span>
                                        <span className="value">DEV-2024-88</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="label">EXP:</span>
                                        <span className="value">User</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="label">WEB:</span>
                                        <span className="value">mi-portfolio.com</span>
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
        </section>
    );
};

export default CVSection;
