import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ArrowRight, Download } from 'lucide-react';
import profileImg from '../assets/profile.png';
import './Hero.css';

const Hero = () => {
    return (
        <section id="hero" className="hero-section">
            <div className="hero-bg-glow" />

            <div className="container hero-content">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="hero-greeting"
                    >
                        Hola, soy Edisson
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="hero-title"
                    >
                        Desarrollador Web <br />
                        <span className="gradient-text">Full Stack</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="hero-sub"
                    >
                        Desarrollo soluciones web modernas combinando React, Angular y consumo de APIs, integrando inteligencia artificial junto con diseño UI/UX para crear aplicaciones eficientes, escalables y orientadas a problemas reales.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="hero-buttons"
                    >
                        <Link to="projects" smooth={true} offset={-80} className="btn-primary flex items-center gap-2 cursor-pointer">
                            Ver Proyectos <ArrowRight size={20} />
                        </Link>
                        <Link to="contact" smooth={true} offset={-80} className="btn-outline cursor-pointer">
                            Contactar
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="hero-img-container"
                >
                    <div className="hero-img-wrapper">
                        <img src={profileImg} alt="Edisson" className="hero-img" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
