import React from 'react';
import { motion } from 'framer-motion';
import {
    Mail,
    Github,
    Linkedin,
    Send,
    Facebook,
    MessageSquare
} from 'lucide-react';
import './Contact.css';

const Contact = () => {
    return (
        <section id="contact" className="section contact-section">
            <div className="container contact-container">

                <div className="section-header centered">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-title"
                    >
                        Contáct<span className="gradient-text">ame</span>
                    </motion.h2>
                    <div className="header-decoration">
                        <span></span><span></span><span></span>
                    </div>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="contact-text"
                >
                    ¿Tienes un proyecto en mente o simplemente quieres saludar? ¡Estoy disponible para nuevas oportunidades!
                </motion.p>

                {/* WhatsApp + QR */}
                <div className="contact-actions">

                    {/* BOTÓN WHATSAPP */}
                    <motion.a
                        href="https://wa.link/y26h7a"
                        className="whatsapp-btn"
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.94 }}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <MessageSquare size={22} />
                        Cotizar vía WhatsApp
                    </motion.a>

                    {/* QR */}
                    <motion.div
                        className="qr-whatsapp"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <span>O escanea el QR</span>
                        <img
                            src={new URL('../assets/Qr-Whatsapp.png', import.meta.url).href}
                            alt="QR WhatsApp"
                        />
                    </motion.div>

                </div>

                {/* Redes */}
                <div className="social-links">
                    {[
                        { icon: <Mail size={24} />, label: "Correo electrónico", href: "mailto:edissonpinza.98@gmail.com", color: "#ea4335" },
                        { icon: <Github size={24} />, label: "GitHub", href: "https://github.com/edissonpinza98", color: "#00f2ff" },
                        { icon: <Facebook size={24} />, label: "Facebook", href: "https://www.facebook.com/Dev.Edi98", color: "#1877f2" },
                        { icon: <Linkedin size={24} />, label: "LinkedIn", href: "https://www.linkedin.com/in/edisson-pinza-613160249", color: "#0a66c2" },
                        { icon: <Send size={24} />, label: "Telegram", href: "https://t.me/Dev_Edi", color: "#229ed9" }
                    ].map((link, idx) => (
                        <motion.a
                            key={link.label}
                            href={link.href}
                            className="social-icon-wrapper"
                            aria-label={link.label}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                            whileHover={{ y: -10 }}
                        >
                            <div className="icon-tooltip">{link.label.split(' ')[0]}</div>
                            <div className="icon-main">
                                {link.icon}
                                <div className="icon-glow" style={{ backgroundColor: link.color }}></div>
                            </div>
                            <div className="tech-ring"></div>
                            <div className="corner-dots">
                                <span></span><span></span>
                            </div>
                        </motion.a>
                    ))}
                </div>

            </div>

            <footer className="footer">
                <p>© 2026 Edisson Pinza. Todos los derechos reservados. Diseñado &amp; Construido con React.</p>
            </footer>
        </section>
    );
};

export default Contact;
