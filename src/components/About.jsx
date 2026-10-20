import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Cpu, Zap, Globe, Layers, Sparkles, Bot } from 'lucide-react';
import './About.css';

const SKILL_CATEGORIES = [
  {
    key: 'FRAMEWORKS_LIBS',
    icon: <Layers size={18} />,
    label: 'Frameworks & Libs',
    color: '#06b6d4',
    skills: ['React', 'Angular', 'Vue', 'Bootstrap', 'Tailwind CSS'],
  },
  {
    key: 'LANGUAGES_DEV',
    icon: <Globe size={18} />,
    label: 'Lenguajes',
    color: '#a855f7',
    skills: ['JavaScript', 'TypeScript', 'Python', 'PHP', 'Java', 'Kotlin', 'HTML', 'CSS'],
  },
  {
    key: 'AI_IDES',
    icon: <Bot size={18} />,
    label: 'IDEs de IA & Asistentes',
    color: '#ec4899',
    skills: ['Cursor.ai', 'Kiro', 'Antigravity', 'Prompt Engineering', 'AI Pair Programming'],
  },
  {
    key: 'DATA_ARCHITECTURE',
    icon: <Database size={18} />,
    label: 'Datos & Arquitectura',
    color: '#10b981',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'DBMS', 'Power BI', 'Data Analysis'],
  },
  {
    key: 'INFRA_SYSTEMS',
    icon: <Cpu size={18} />,
    label: 'Infraestructura & Herramientas',
    color: '#3b82f6',
    skills: ['Git / GitHub', 'Redes & Infraestructura', 'Soporte Técnico', 'Ofimática Avanzada', 'UI/UX Design'],
  },
  {
    key: 'AUTOMATION_AI',
    icon: <Zap size={18} />,
    label: 'Automatización & IA',
    color: '#f59e0b',
    skills: ['IA Systematization', 'Workplace Optimization', 'Excel (VBA / Macros)'],
  },
];

const About = () => (
  <section id="about" className="section about-section" style={{ perspective: '1200px' }}>
    {/* Subtle ambient light orb */}
    <div className="about-glow" aria-hidden />

    <div className="container">

      {/* Header — 3D slide down */}
      <motion.div
        className="about-header"
        initial={{ opacity: 0, y: -30, rotateX: 10 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="section-eyebrow">Quién soy</p>
        <h2 className="section-title">Sobre <span className="gradient-text">Mí</span></h2>
        <div className="divider" />
      </motion.div>

      {/* Editorial Bio Card — 3D tilt in from LEFT */}
      <motion.div
        className="about-bio-card"
        initial={{ opacity: 0, x: -70, rotateY: -8, scale: 0.96 }}
        whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div className="about-bio-card__accent" aria-hidden />
        <div className="about-bio-card__content">
          <p>
            Soy <span className="tech-highlight">Tecnólogo en Análisis y Desarrollo de Software</span> y{' '}
            <span className="tech-highlight">Técnico en Sistemas</span>, cursando actualmente{' '}
            <span className="tech-highlight">Ingeniería de Software</span> y una formación técnica en
            constante evolución.
          </p>
          <p>
            Trabajo con desarrollo de software y soluciones web, integrando frameworks modernos como{' '}
            <span className="tech-highlight">React, Angular y Vue</span>. Poseo conocimientos funcionales
            en <span className="tech-highlight">JavaScript (TypeScript), Python, PHP, Java y Kotlin</span>,
            lo que me permite desenvolverme con solvencia en la lógica de negocio, el desarrollo frontend
            y backend, y la resolución de problemas técnicos.
          </p>
          <p>
            Tengo experiencia en bases de datos como{' '}
            <span className="tech-highlight">MySQL, PostgreSQL y MongoDB</span>, además de una base sólida
            en <span className="tech-highlight">soporte técnico, redes y ofimática avanzada</span>. Integro{' '}
            <span className="tech-highlight">Inteligencia Artificial</span> y entornos de desarrollo aumentados
            con IA como <span className="tech-highlight">Cursor.ai, Kiro y Antigravity</span> como herramientas
            clave para automatizar procesos, optimizar tareas, acelerar la codificación y maximizar la eficiencia en distintos entornos laborales.
          </p>
          <p>
            Complemento mi perfil con el desarrollo de soluciones prácticas en{' '}
            <span className="tech-highlight">Excel aplicado a contaduría</span> y paneles en{' '}
            <span className="tech-highlight">Power BI</span>, enfocados en transformar datos operativos en
            información clara y útil para la toma de decisiones.
          </p>
        </div>
      </motion.div>

      {/* Skills grid — 3D alternating stagger */}
      <div className="skills-section">
        <motion.div
          className="skills-header"
          initial={{ opacity: 0, x: 50, rotateY: 6 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="skills-header__badge">
            <Code2 size={18} className="skills-header__icon" />
          </div>
          <h3 className="skills-header__title">Mi Stack Tecnológico</h3>
        </motion.div>

        <div className="skills-grid" style={{ perspective: '1200px' }}>
          {SKILL_CATEGORIES.map((cat, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <motion.div
                key={cat.key}
                className="skill-card"
                style={{ '--cat-color': cat.color, transformStyle: 'preserve-3d' }}
                initial={{
                  opacity: 0,
                  x: isLeft ? -45 : 45,
                  rotateY: isLeft ? -8 : 8,
                  scale: 0.94,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  rotateY: 0,
                  scale: 1,
                }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, delay: (idx % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="skill-card__header">
                  <span className="skill-card__icon">{cat.icon}</span>
                  <span className="skill-card__label">{cat.label}</span>
                </div>
                <div className="skill-card__pills">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="skill-pill">{skill}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  </section>
);

export default About;
