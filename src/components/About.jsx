import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Cpu, Zap, Globe, Layers } from 'lucide-react';
import './About.css';

const SkillsFluid = ({ categories }) => {
    const getIcon = (title) => {
        switch (title) {
            case "FRAMEWORKS_LIBS": return <Layers size={18} />;
            case "LANGUAGES_DEV": return <Globe size={18} />;
            case "DATA_ARCHITECTURE": return <Database size={18} />;
            case "INFRA_SYSTEMS": return <Cpu size={18} />;
            case "AUTOMATION_AI": return <Zap size={18} />;
            default: return <Layers size={18} />;
        }
    };

    const formatTitle = (title) => {
        const titles = {
            "FRAMEWORKS_LIBS": "FRAMEWORKS & LIBRARIES",
            "LANGUAGES_DEV": "PROGRAMMING LANGUAGES",
            "DATA_ARCHITECTURE": "DATA & ARCHITECTURE",
            "INFRA_SYSTEMS": "INFRASTRUCTURE & TOOLS",
            "AUTOMATION_AI": "AUTOMATION & AI"
        };
        return titles[title] || title;
    };


    return (
        <div className="skills-fluid">
            <div className="fluid-grid">
                {categories.map((cat, idx) => (
                    <motion.div
                        key={cat.title}
                        className="fluid-category"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                        <div className="category-header">
                            <span className="category-icon">{getIcon(cat.title)}</span>
                            <h4 className="category-title">{formatTitle(cat.title)}</h4>
                        </div>

                        <div className="skills-list">
                            {cat.skills.map((skill) => (
                                <span key={skill} className="skill-pill">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const About = () => {
    const skillCategories = [
        {
            title: "FRAMEWORKS_LIBS",
            skills: ["React", "Angular", "Vue", "Bootstrap", "Tailwind CSS"]
        },
        {
            title: "LANGUAGES_DEV",
            skills: ["JavaScript", "TypeScript", "Python", "PHP", "Java", "Kotlin", "HTML", "CSS"]
        },
        {
            title: "DATA_ARCHITECTURE",
            skills: ["MySQL", "PostgreSQL", "MongoDB", "DBMS", "Power BI", "Data Analysis"]
        },
        {
            title: "INFRA_SYSTEMS",
            skills: ["Git / GitHub", "Redes & Infraestructura", "Soporte Técnico", "Ofimática Avanzada", "UI/UX Design"]
        },
        {
            title: "AUTOMATION_AI",
            skills: ["IA Systematization", "Workplace Optimization", "Excel (VBA / Macros)", "Prompt Engineering"]
        }
    ];


    return (
        <section id="about" className="section about-section">
            <div className="container">
                <div className="about-header">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-title"
                    >
                        Sobre <span className="gradient-text">Mí</span>
                    </motion.h2>
                    <div className="header-line"></div>
                </div>

                <div className="about-layout-centered">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="about-bio-full"
                    >
                        <div className="bio-content">
                            <p>
                                Soy <span className="tech-highlight">Desarrollador de Software</span> y <span className="tech-highlight">Técnico en Sistemas</span>,
                                con homologación activa en <span className="tech-highlight">Ingeniería de Software</span> y una formación técnica en constante evolución.
                            </p>

                            <p>
                                Trabajo con desarrollo de software y soluciones web, integrando frameworks modernos como <span className="tech-highlight">React, Angular y Vue</span>. Poseo conocimientos funcionales en
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
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="skills-wrapper"
                >
                    <div className="skills-header">
                        <div className="header-decoration">
                            <span></span><span></span><span></span>
                        </div>
                        <h3 className="skills-subtitle">
                            <Code2 size={20} className="subtitle-icon" />
                            <span>MI STACK TECNOLÓGICO</span>
                        </h3>

                        <div className="header-decoration">
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                    <SkillsFluid categories={skillCategories} />
                </motion.div>
            </div>
        </section>
    );
};

export default About;
