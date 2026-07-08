import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, Facebook, MessageSquare } from 'lucide-react';
import './Contact.css';

const SOCIALS = [
  { icon: <Mail size={20} />,     label: 'Email',    sublabel: 'edizonpinza@gmail.com',         href: 'mailto:edizonpinza@gmail.com',                       color: '#ea4335' },
  { icon: <Github size={20} />,   label: 'GitHub',   sublabel: '@edissonpinza98',                href: 'https://github.com/edissonpinza98',                  color: '#00c8e0' },
  { icon: <Facebook size={20} />, label: 'Facebook', sublabel: 'Dev.Edi98',                      href: 'https://www.facebook.com/Dev.Edi98',                 color: '#1877f2' },
  { icon: <Linkedin size={20} />, label: 'LinkedIn', sublabel: 'Edisson Pinza',                  href: 'https://www.linkedin.com/in/edisson-pinza-613160249',color: '#0a66c2' },
  { icon: <Send size={20} />,     label: 'Telegram', sublabel: '@Dev_Edi',                       href: 'https://t.me/Dev_Edi',                               color: '#229ed9' },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

const Contact = () => (
  <section id="contact" className="section contact-section">
    <div className="container">

      {/* Header */}
      <motion.div className="contact-header" {...fadeUp(0)}>
        <p className="section-eyebrow">Hablemos</p>
        <h2 className="section-title">Contáct<span className="gradient-text">ame</span></h2>
        <div className="divider" />
        <p className="contact-sub">
          ¿Tienes un proyecto en mente o simplemente quieres saludar?
          Estoy disponible para nuevas oportunidades.
        </p>
      </motion.div>

      {/* WhatsApp CTA */}
      <motion.div className="contact-cta-row" {...fadeUp(0.1)}>
        <div className="contact-cta-card">
          <div className="cta-card__left">
            <p className="cta-card__title">¿Listo para empezar?</p>
            <p className="cta-card__desc">
              Escríbeme directamente por WhatsApp y conversamos sobre tu proyecto.
            </p>
            <motion.a
              href="https://wa.link/y26h7a"
              target="_blank" rel="noopener noreferrer"
              className="btn-primary contact-wa-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <MessageSquare size={16} />
              Cotizar vía WhatsApp
            </motion.a>
          </div>

          <motion.div
            className="cta-card__qr"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <p className="qr-label">O escanea el QR</p>
            <img
              src={new URL('../assets/Qr-Whatsapp.png', import.meta.url).href}
              alt="QR WhatsApp Edisson Pinza"
              className="qr-img"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Social links */}
      <motion.div className="contact-socials" {...fadeUp(0.2)}>
        <p className="socials-label">También puedes encontrarme en</p>
        <div className="socials-grid">
          {SOCIALS.map((s, idx) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank" rel="noopener noreferrer"
              className="social-card"
              aria-label={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              whileHover={{ y: -4 }}
              style={{ '--accent': s.color }}
            >
              <span className="social-card__icon">{s.icon}</span>
              <div className="social-card__text">
                <span className="social-card__label">{s.label}</span>
                <span className="social-card__sub">{s.sublabel}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>

    </div>

    {/* ── Footer ── */}
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p className="site-footer__copy">
          © 2026 Edisson Pinza. Todos los derechos reservados.
          Diseñado &amp; construido con React.
        </p>

        {/* Admin link — discreto, solo texto mono pequeño */}
        <a
          href="/admin"
          className="footer-admin-link"
          title="Acceso interno"
          aria-label="Panel de administración"
        >
          <span className="footer-admin-link__cursor">_</span>
          sys
        </a>
      </div>
    </footer>
  </section>
);

export default Contact;
