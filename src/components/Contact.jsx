import React from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Linkedin, Twitter, Github, MessageSquare } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    return (
        <section id="contact" className="section contact-section">
            <div className="container contact-container">

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    Contáct<span className="gradient-text">ame</span>
                </motion.h2>

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
                        href="https://wa.link/ip34wf"
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
                            src="src/assets/Qr-Whatsapp.png"
                            alt="QR WhatsApp"
                        />
                    </motion.div>

                </div>

                {/* Redes */}
                <div className="social-links">
                    <a href="#" className="social-icon" aria-label="Email">
                        <Mail size={24} />
                    </a>
                    <a href="https://wa.link/ip34wf" className="social-icon" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                        <MessageSquare size={24} />
                    </a>
                    <a href="https://t.me/yourusername" className="social-icon" aria-label="Telegram" target="_blank" rel="noopener noreferrer">
                        <Send size={24} />
                    </a>
                    <a href="#" className="social-icon" aria-label="LinkedIn">
                        <Linkedin size={24} />
                    </a>
                    <a href="#" className="social-icon" aria-label="GitHub">
                        <Github size={24} />
                    </a>
                    <a href="#" className="social-icon" aria-label="Twitter">
                        <Twitter size={24} />
                    </a>
                </div>

            </div>

            <footer className="footer">
                <p>© 2026 Edisson Pinza. Todos los derechos reservados. Diseñado & Construido con React.</p>
            </footer>
        </section>
    );
};

export default Contact;
