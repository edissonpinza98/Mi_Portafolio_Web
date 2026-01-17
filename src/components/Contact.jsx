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
                            src={new URL('../assets/Qr-Whatsapp.png', import.meta.url).href}
                            alt="QR WhatsApp"
                        />
                    </motion.div>

                </div>

                {/* Redes */}
                <div className="social-links">

                    {/* Correo */}
                    <a
                        href="mailto:tuemail@correo.com"
                        className="social-icon"
                        aria-label="Correo electrónico"
                    >
                        <Mail size={24} />
                    </a>

                    {/* GitHub */}
                    <a
                        href="https://github.com/edissonpinza98"
                        className="social-icon"
                        aria-label="GitHub"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Github size={24} />
                    </a>

                    {/* Facebook */}
                    <a
                        href="https://www.facebook.com/Dev.Edi98"
                        className="social-icon"
                        aria-label="Facebook"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Facebook size={24} />
                    </a>

                    {/* LinkedIn */}
                    <a
                        href="https://www.linkedin.com/in/edisson-pinza-613160249"
                        className="social-icon"
                        aria-label="LinkedIn"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Linkedin size={24} />
                    </a>

                    {/* Telegram */}
                    <a
                        href="https://t.me/Dev_Edi"
                        className="social-icon"
                        aria-label="Telegram"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Send size={24} />
                    </a>

                </div>

            </div>

            <footer className="footer">
                <p>© 2026 Edisson Pinza. Todos los derechos reservados. Diseñado &amp; Construido con React.</p>
            </footer>
        </section>
    );
};

export default Contact;
