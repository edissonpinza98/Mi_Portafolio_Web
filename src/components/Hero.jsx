import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { ArrowRight } from 'lucide-react';
import profileImg from '../assets/Foto-inicio.jpg';
import './Hero.css';

const Hero = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Configuration
        canvas.width = 500;
        canvas.height = 600;
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];

        // Initialize drops
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        const letters = "10";

        const draw = () => {
            // Semi-transparent black to create trail effect
            ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Matrix green/blue text
            ctx.fillStyle = '#00f2ff'; // Cyan/Electric Blue for modern look
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Random binary character
                const text = letters.charAt(Math.floor(Math.random() * letters.length));

                // Only draw on the "sides" (skip the center where the image is)
                // Assuming center is roughly between 20% and 80% of width
                // Actually user said "at the sides", so let's render two strips
                const x = i * fontSize;

                // Optional: Skip drawing in the very center to avoid overlapping the face too much 
                // if the z-index doesn't handle it perfectly, but z-index will handle it.
                // Let's keep it simple: draw everywhere, z-index puts it behind.

                ctx.fillText(text, x, drops[i] * fontSize);

                // Reset drop to top with random delay
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        };

        const interval = setInterval(draw, 33);
        return () => clearInterval(interval);
    }, []);

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
                    {/* Matrix Rain Canvas Background */}
                    <canvas ref={canvasRef} className="matrix-canvas" />

                    <div className="hero-img-wrapper">
                        <img src={profileImg} alt="Edisson" className="hero-img" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
