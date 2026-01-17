import React from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import './About.css';

const CyberMatrix = ({ categories }) => {
    return (
        <div className="cyber-matrix">
            <div className="matrix-grid">
                {categories.map((cat, idx) => (
                    <motion.div
                        key={cat.title}
                        className={`matrix-panel ${cat.title.toLowerCase()}`}
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                        <div className="panel-header">
                            <div className="header-label">
                                <span className="label-code">{`0${idx + 1}`}</span>
                                <span className="label-text">{cat.title}</span>
                            </div>
                            <div className="header-status">
                                <span className="status-bit"></span>
                                <span className="status-bit"></span>
                                <span className="status-bit"></span>
                            </div>
                        </div>

                        <div className="panel-body">
                            <div className="skills-matrix">
                                {cat.skills.map((skill, sIdx) => (
                                    <div key={skill} className="skill-cell">
                                        <div className="cell-bracket"></div>
                                        <span className="skill-name">{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="panel-footer">
                            <div className="footer-line"></div>
                            <div className="footer-meta">
                                <span>TYPE: SYSTEM_MODULE</span>
                                <span>STATUS: ACTIVE</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="matrix-fx">
                <div className="scan-line"></div>
            </div>
        </div>
    );
};

const About = () => {
    const skillCategories = [
        {
            title: "LANGUAGES_DEV",
            skills: ["JavaScript (TypeScript)", "Python", "PHP", "Java / Kotlin", "Node.js", "Express"]
        },
        {
            title: "DATA_ARCHITECTURE",
            skills: ["MySQL", "PostgreSQL", "MongoDB", "Power BI", "Data Analysis"]
        },
        {
            title: "INFRA_SYSTEMS",
            skills: ["Redes & Infraestructura", "Soporte Técnico", "Ofimática Avanzada", "Git / GitHub", "UI/UX Design"]
        },
        {
            title: "AUTOMATION_AI",
            skills: ["IA Systematization", "Excel (Contaduría)", "VBA / Macros", "Workplace Optimization"]
        }
    ];

    return (
        <section id="about" className="section about-section">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    Sobre <span className="gradient-text">Mí</span>
                </motion.h2>

                <div className="about-stack">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="about-text"
                    >
                        <p>
                            Soy <span className="tech-highlight">Tecnólogo en Análisis y Desarrollo de Software</span> y <span className="tech-highlight">Técnico en Sistemas</span>,
                            con homologación activa en <span className="tech-highlight">Ingeniería de Software</span> y una formación técnica en constante evolución.
                        </p>
                        <p>
                            Trabajo con desarrollo de software y soluciones web, con conocimientos funcionales en
                            <span className="tech-highlight">JavaScript (TypeScript), Python, PHP, Java y Kotlin</span>, lo que me permite desenvolverme con
                            solvencia en la lógica de negocio, el desarrollo frontend y backend, y la resolución de problemas técnicos.
                        </p>
                        <p>
                            Tengo experiencia en bases de datos como <span className="tech-highlight">MySQL, PostgreSQL y MongoDB</span>, además de una base sólida en
                            <span className="tech-highlight">soporte técnico, redes y ofimática avanzada</span>. Integro <span className="tech-highlight">Inteligencia Artificial</span> como herramienta
                            de apoyo para automatizar procesos, optimizar tareas y mejorar la eficiencia en distintos entornos laborales.
                        </p>
                        <p>
                            Complemento mi perfil con el desarrollo de soluciones prácticas en <span className="tech-highlight">Excel aplicado a contaduría</span> y
                            paneles en <span className="tech-highlight">Power BI</span>, enfocados en transformar datos operativos en información clara y útil para
                            la toma de decisiones.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="skills-wrapper"
                    >
                        <h3 className="skills-subtitle flex items-center gap-2">
                            <Code2 className="text-cyan-400" /> Habilidades
                        </h3>
                        <CyberMatrix categories={skillCategories} />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
