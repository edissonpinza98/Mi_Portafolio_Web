import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Cpu, Zap, Globe, Layers } from 'lucide-react';
import './About.css';

const SKILL_CATEGORIES = [
  {
    key: 'FRAMEWORKS_LIBS',
    icon: <Layers size={16} />,
    label: 'Frameworks & Libs',
    skills: ['React', 'Angular', 'Vue', 'Bootstrap', 'Tailwind CSS'],
  },
  {
    key: 'LANGUAGES_DEV',
    icon: <Globe size={16} />,
    label: 'Lenguajes',
    skills: ['JavaScript', 'TypeScript', 'Python', 'PHP', 'Java', 'Kotlin', 'HTML', 'CSS'],
  },
  {
    key: 'DATA_ARCHITECTURE',
    icon: <Database size={16} />,
    label: 'Datos & Arquitectura',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'DBMS', 'Power BI', 'Data Analysis'],
  },
  {
    key: 'INFRA_SYSTEMS',
    icon: <Cpu size={16} />,
    label: 'Infraestructura & Herramientas',
    skills: ['Git / GitHub', 'Redes & Infraestructura', 'Soporte Técnico', 'Ofimática Avanzada', 'UI/UX Design'],
  },
  {
    key: 'AUTOMATION_AI',
    icon: <Zap size={16} />,
    label: 'Automatización & IA',
    skills: ['IA Systematization', 'Workplace Optimization', 'Excel (VBA / Macros)', 'Prompt Engineering'],
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

const About = () => (
  <section id="about" className="section about-section">
    <div className="container">

      {/* Header */}
      <motion.div className="about-header" {...fadeUp(0)}>
        <p className="section-eyebrow">Quién soy</p>
        <h2 className="section-title">Sobre <span className="gradient-text">Mí</span></h2>
        <div className="divider" />
      </motion.div>

      {/* Bio */}
      <motion.div className="about-bio" {...fadeUp(0.1)}>
        <p>
          Soy <span className="tech-highlight">Desarrollador de Software</span> y{' '}
          <span className="tech-highlight">Técnico en Sistemas</span>, con homologación activa en{' '}
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
          <span className="tech-highlight">Inteligencia Artificial</span> como herramienta de apoyo para
          automatizar procesos, optimizar tareas y mejorar la eficiencia en distintos entornos laborales.
        </p>
        <p>
          Complemento mi perfil con el desarrollo de soluciones prácticas en{' '}
          <span className="tech-highlight">Excel aplicado a contaduría</span> y paneles en{' '}
          <span className="tech-highlight">Power BI</span>, enfocados en transformar datos operativos en
          información clara y útil para la toma de decisiones.
        </p>
      </motion.div>

      {/* Skills grid */}
      <motion.div className="skills-section" {...fadeUp(0.2)}>
        <div className="skills-header">
          <Code2 size={18} className="skills-header__icon" />
          <h3 className="skills-header__title">Mi Stack Tecnológico</h3>
        </div>

        <div className="skills-grid">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.key}
              className="skill-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
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
          ))}
        </div>
      </motion.div>

    </div>
  </section>
);

export default About;
