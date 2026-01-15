import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';
import project3 from '../assets/project3.png';
import './Projects.css';

const Projects = () => {
    const projects = [
        {
            title: "Dashboard Analítico AI",
            desc: "Plataforma de visualización de datos en tiempo real con integración de IA para predicciones de mercado. Diseño futurista con modo oscuro.",
            img: project1,
            tags: ["React", "D3.js", "Node.js"],
            demo: "#",
            repo: "#"
        },
        {
            title: "NeoBank Mobile App",
            desc: "Interfaz moderna para una aplicación bancaria de nueva generación. Enfoque en la experiencia de usuario y transiciones fluidas.",
            img: project2,
            tags: ["React Native", "TypeScript", "Framer"],
            demo: "#",
            repo: "#"
        },
        {
            title: "LUXE E-Commerce",
            desc: "Tienda online minimalista para marcas de moda de lujo. Optimizado para conversión y velocidad.",
            img: project3,
            tags: ["Next.js", "Stripe", "Tailwind"],
            demo: "#",
            repo: "#"
        }
    ];

    return (
        <section id="projects" className="section">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    Mis <span className="gradient-text">Proyectos</span>
                </motion.h2>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="project-card"
                        >
                            <div className="project-image-container">
                                <img src={project.img} alt={project.title} className="project-image" />
                            </div>
                            <div className="project-content">
                                <h3 className="project-title">{project.title}</h3>
                                <div className="project-tags">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="project-tag">{tag}</span>
                                    ))}
                                </div>
                                <p className="project-desc">{project.desc}</p>
                                <div className="project-links">
                                    <a href={project.demo} className="project-link">
                                        <ExternalLink size={18} /> Demo
                                    </a>
                                    <a href={project.repo} className="project-link">
                                        <Github size={18} /> Código
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
