import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send, Facebook, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import qrFallback from '../assets/Qr-Whatsapp.png';
import './Contact.css';

/* ── Default fallback values ─────────────────────────── */
const DEFAULTS = {
  whatsapp_link:      'https://wa.link/y26h7a',
  whatsapp_number:    '573025366119',
  whatsapp_qr_url:    '',
  email:              'edizonpinza@gmail.com',
  github_url:         'https://github.com/edissonpinza98',
  github_username:    '@edissonpinza98',
  linkedin_url:       'https://www.linkedin.com/in/edisson-pinza-613160249',
  facebook_url:       'https://www.facebook.com/Dev.Edi98',
  facebook_page:      'Dev.Edi98',
  telegram_url:       'https://t.me/Dev_Edi',
  telegram_username:  '@Dev_Edi',
};

const CONTACT_KEYS = Object.keys(DEFAULTS);

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

const Contact = () => {
  const [info, setInfo] = useState(DEFAULTS);

  /* Load contact settings from Supabase */
  useEffect(() => {
    const load = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('key, value')
          .in('key', CONTACT_KEYS);
        if (!error && data?.length) {
          const map = { ...DEFAULTS };
          data.forEach(r => { if (r.value) map[r.key] = r.value; });
          setInfo(map);
        }
      } catch (_) {
        /* silently use fallback defaults */
      }
    };
    load();

    /* Realtime: update live if admin changes a value */
    const channel = supabase
      .channel('contact_settings_watch')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'site_settings' },
        payload => {
          if (CONTACT_KEYS.includes(payload.new?.key) && payload.new?.value) {
            setInfo(prev => ({ ...prev, [payload.new.key]: payload.new.value }));
          }
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  /* Build social cards dynamically from loaded info */
  const SOCIALS = [
    {
      icon: <Mail size={20} />,
      label: 'Email',
      sublabel: info.email,
      href: `mailto:${info.email}`,
      color: '#ea4335',
    },
    {
      icon: <Github size={20} />,
      label: 'GitHub',
      sublabel: info.github_username,
      href: info.github_url,
      color: '#00c8e0',
    },
    {
      icon: <Facebook size={20} />,
      label: 'Facebook',
      sublabel: info.facebook_page,
      href: info.facebook_url,
      color: '#1877f2',
    },
    {
      icon: <Linkedin size={20} />,
      label: 'LinkedIn',
      sublabel: 'Edisson Pinza',
      href: info.linkedin_url,
      color: '#0a66c2',
    },
    {
      icon: <Send size={20} />,
      label: 'Telegram',
      sublabel: info.telegram_username,
      href: info.telegram_url,
      color: '#229ed9',
    },
  ];

  return (
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
                href={info.whatsapp_link}
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
                src={info.whatsapp_qr_url || qrFallback}
                alt="QR WhatsApp Edisson Pinza"
                className="qr-img"
                onError={e => { e.currentTarget.src = qrFallback; }}
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
};

export default Contact;
