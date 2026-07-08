import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Loader2, AlertCircle, RefreshCw, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';
import project3 from '../assets/project3.png';
import project4 from '../assets/project4.png';
import project5 from '../assets/project5.png';
import './Projects.css';

// Fallback local data (used when Supabase is not configured)
const LOCAL_PROJECTS = [
  {
    id: 'local-1',
    title: 'BBQ Sabor y Presentación',
    description: 'Sistema de gestión y carta digital interactiva para restaurante, con administración de platillos, categorías y pedidos en tiempo real.',
    image_url: null,
    localImg: project5,
    tags: ['Vue.js', 'Vite', 'Firebase'],
    demo_url: 'https://bbq-saborypresentacion.netlify.app/',
    repo_url: '/not-found',
  },
  {
    id: 'local-2',
    title: 'Mocondino Conecta',
    description: 'Plataforma digital comunitaria integral para la gestión de juntas, promoción de talento local y negocios en Mocondino. Fomentando transparencia y participación ciudadana.',
    image_url: null,
    localImg: project4,
    tags: ['Vue.js', 'Vite', 'Firebase'],
    demo_url: 'https://mocondinoconecta.netlify.app/',
    repo_url: '/not-found',
  },
  {
    id: 'local-3',
    title: 'AI Business Automation',
    description: 'Sistema de automatización industrial integrando Python y modelos de IA para la optimización de flujos de trabajo operativos.',
    image_url: null,
    localImg: project1,
    tags: ['Python', 'TensorFlow', 'Node.js'],
    demo_url: '/not-found',
    repo_url: '/not-found',
  },
  {
    id: 'local-4',
    title: 'Financial Data Dashboard',
    description: 'Panel avanzado desarrollado en Power BI y React para la visualización de métricas contables y análisis predictivo.',
    image_url: null,
    localImg: project2,
    tags: ['Power BI', 'React', 'D3.js'],
    demo_url: '/not-found',
    repo_url: '/not-found',
  },
  {
    id: 'local-5',
    title: 'Inventory Control System',
    description: 'Aplicación Full Stack robusta para el control de inventarios y gestión de recursos empresariales a gran escala.',
    image_url: null,
    localImg: project3,
    tags: ['Java', 'Spring Boot', 'MySQL'],
    demo_url: '/not-found',
    repo_url: '/not-found',
  },
];

// Map local fallback images to Supabase records by order
const LOCAL_IMGS = [project5, project4, project1, project2, project3];

const isExternal = (url) => url && url.startsWith('http');

const ProjectLink = ({ href, icon, label }) => {
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="project-link">
        {icon} {label}
      </a>
    );
  }
  return (
    <Link to={href || '/not-found'} className="project-link project-link--disabled">
      {icon} {label}
    </Link>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);

    // If env vars not set, fall back to local data
    const url = import.meta.env.VITE_SUPABASE_URL;
    if (!url || url === 'https://your-project-id.supabase.co') {
      setProjects(LOCAL_PROJECTS);
      setLoading(false);
      return;
    }

    try {
      const { data, error: sbError } = await supabase
        .from('projects')
        .select('*')
        .eq('visible', true)
        .order('order', { ascending: true });

      if (sbError) throw sbError;

      // Attach local fallback images if image_url is missing
      const enriched = (data || []).map((p, i) => ({
        ...p,
        localImg: LOCAL_IMGS[i] || LOCAL_IMGS[0],
      }));

      setProjects(enriched.length > 0 ? enriched : LOCAL_PROJECTS);
    } catch (err) {
      console.error('Projects fetch error:', err);
      setError('No se pudieron cargar los proyectos. Mostrando datos locales.');
      setProjects(LOCAL_PROJECTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  return (
    <section id="projects" className="section projects-section">
      <div className="container">

        {/* Header */}
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-eyebrow">Portafolio</p>
          <h2 className="section-title">Mis <span className="gradient-text">Proyectos</span></h2>
          <div className="divider" />
          <p className="projects-sub">
            Soluciones reales construidas con tecnologías modernas.
          </p>
        </motion.div>

        {/* States */}
        {loading && (
          <div className="projects-state">
            <Loader2 size={28} className="spin-icon" />
            <p>Cargando proyectos...</p>
          </div>
        )}

        {error && !loading && (
          <div className="projects-error">
            <AlertCircle size={20} />
            <span>{error}</span>
            <button onClick={fetchProjects} className="btn-retry">
              <RefreshCw size={14} /> Reintentar
            </button>
          </div>
        )}

        {/* Grid */}
        {!loading && (
          <div className="projects-grid">
            {projects.map((project, index) => {
              const imgSrc = project.image_url || project.localImg;
              return (
                <motion.article
                  key={project.id}
                  className="project-card"
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Image */}
                  <div className="project-img-wrap">
                    {imgSrc
                      ? <img src={imgSrc} alt={project.title} className="project-img" loading="lazy" />
                      : <div className="project-img-placeholder"><Code2 size={32} /></div>
                    }
                    <div className="project-img-overlay" aria-hidden />
                  </div>

                  {/* Content */}
                  <div className="project-body">
                    <div className="project-tags">
                      {(project.tags || []).map((tag) => (
                        <span key={tag} className="tag-pill">{tag}</span>
                      ))}
                    </div>

                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.description}</p>

                    <div className="project-links">
                      <ProjectLink
                        href={project.demo_url}
                        icon={<ExternalLink size={15} />}
                        label="Demo"
                      />
                      <ProjectLink
                        href={project.repo_url}
                        icon={<Github size={15} />}
                        label="Código"
                      />
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
