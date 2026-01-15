import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Linkedin, Twitter, Github } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
        alert('Mensaje enviado (simulación)');
    };

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
                    ¿Tienes un proyecto en mente o simplemente quieres saludar?
                    ¡Estoy disponible para nuevas oportunidades!
                </motion.p>

                <motion.form
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="contact-form"
                    onSubmit={handleSubmit}
                >
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="Tu Nombre"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Tu Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="message"
                            placeholder="Tu Mensaje"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-primary flex justify-center items-center gap-2">
                        Enviar Mensaje <Send size={18} />
                    </button>
                </motion.form>

                <div className="social-links">
                    <a href="#" className="social-icon" aria-label="Email">
                        <Mail size={24} />
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
                <p>© 2026 Edisson pinza. Todos los derechos reservados. Diseñado & Construido con React.</p>
            </footer>
        </section>
    );
};

export default Contact;
