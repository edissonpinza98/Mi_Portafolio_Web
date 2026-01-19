import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';
import project3 from '../assets/project3.png';
import './Projects.css';

const Projects = () => {

    return (
        <section id="projects" className="section">
            <div className="container">
                <div className="section-header centered">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-title"
                    >
                        Mis <span className="gradient-text">Proyectos</span>
                    </motion.h2>
                    <div className="header-decoration">
                        <span></span><span></span><span></span>
                    </div>
                </div>

                <div className="projects-grid">
                    {[
                        {
                            title: "AI Business Automation",
                            desc: "Sistema de automatización industrial integrando Python y modelos de IA para la optimización de flujos de trabajo operativos.",
                            img: project1,
                            tags: ["Python", "TensorFlow", "Node.js"],
                            demo: "/not-found",
                            repo: "/not-found"
                        },
                        {
                            title: "Financial Data Dashboard",
                            desc: "Panel avanzado desarrollado en Power BI y React para la visualización de métricas contables y análisis predictivo.",
                            img: project2,
                            tags: ["Power BI", "React", "D3.js"],
                            demo: "/not-found",
                            repo: "/not-found"
                        },
                        {
                            title: "Inventory Control Sysem",
                            desc: "Aplicación Full Stack robusta para el control de inventarios y gestión de recursos empresariales a gran escala.",
                            img: project3,
                            tags: ["Java", "Spring Boot", "MySQL"],
                            demo: "/not-found",
                            repo: "/not-found"
                        }
                    ].map((project, index) => (
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
                                    <Link to={project.demo} className="project-link">
                                        <ExternalLink size={18} /> Demo
                                    </Link>
                                    <Link to={project.repo} className="project-link">
                                        <Github size={18} /> Código
                                    </Link>
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
