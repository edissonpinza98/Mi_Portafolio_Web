import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink, Github, Loader2, AlertCircle,
  RefreshCw, Code2, ArrowRight, MessageSquare,
  Building2, Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';
import project3 from '../assets/project3.png';
import project4 from '../assets/project4.png';
import project5 from '../assets/project5.png';
import './Projects.css';

/* ─── Fallback data ───────────────────────────────────── */
const LOCAL_PROJECTS = [
  {
    id: 'local-1', category: 'empresa',
    title: 'BBQ Sabor y Presentación',
    description: 'Sistema de gestión y carta digital interactiva para restaurante, con administración de platillos, categorías y pedidos en tiempo real.',
    localImg: project5, image_url: null,
    tags: ['Vue.js', 'Vite', 'Firebase'],
    demo_url: 'https://bbq-saborypresentacion.netlify.app/', repo_url: '/not-found',
    whatsapp_msg: null,
  },
  {
    id: 'local-2', category: 'empresa',
    title: 'Mocondino Conecta',
    description: 'Plataforma digital comunitaria integral para la gestión de juntas, promoción de talento local y negocios en Mocondino.',
    localImg: project4, image_url: null,
    tags: ['Vue.js', 'Vite', 'Firebase'],
    demo_url: 'https://mocondinoconecta.netlify.app/', repo_url: '/not-found',
    whatsapp_msg: null,
  },
  {
    id: 'local-3', category: 'personal',
    title: 'AI Business Automation',
    description: 'Sistema de automatización industrial integrando Python y modelos de IA para la optimización de flujos de trabajo operativos.',
    localImg: project1, image_url: null,
    tags: ['Python', 'TensorFlow', 'Node.js'],
    demo_url: '/not-found', repo_url: '/not-found',
    whatsapp_msg: 'Hola Edisson, me interesa adquirir el sistema AI Business Automation. ¿Podemos hablar?',
  },
  {
    id: 'local-4', category: 'personal',
    title: 'Financial Data Dashboard',
    description: 'Panel avanzado en Power BI y React para la visualización de métricas contables y análisis predictivo.',
    localImg: project2, image_url: null,
    tags: ['Power BI', 'React', 'D3.js'],
    demo_url: '/not-found', repo_url: '/not-found',
    whatsapp_msg: 'Hola Edisson, me interesa el Financial Data Dashboard. ¿Podemos hablar?',
  },
  {
    id: 'local-5', category: 'personal',
    title: 'Inventory Control System',
    description: 'Aplicación Full Stack robusta para el control de inventarios y gestión de recursos empresariales a gran escala.',
    localImg: project3, image_url: null,
    tags: ['Java', 'Spring Boot', 'MySQL'],
    demo_url: '/not-found', repo_url: '/not-found',
    whatsapp_msg: 'Hola Edisson, me interesa el sistema de control de inventarios. ¿Podemos hablar?',
  },
];

const LOCAL_IMGS = [project5, project4, project1, project2, project3];
const WA_BASE    = 'https://wa.me/573025366119?text=';
const PREVIEW    = 4; // cards shown per category on home

/* ─── Helpers ─────────────────────────────────────────── */
const isExternal = (url) => url && url.startsWith('http');

const waUrl = (msg, title) => {
  const text = msg || `Hola Edisson, me interesa el proyecto "${title}". ¿Podemos hablar?`;
  return `${WA_BASE}${encodeURIComponent(text)}`;
};

/* ─── Single project card ─────────────────────────────── */
const ProjectCard = ({ project, index, showCategory = false }) => {
  const imgSrc = project.image_url || project.localImg;

  return (
    <motion.article
      className="project-card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Image */}
      <div className="project-img-wrap">
        {imgSrc
          ? <img src={imgSrc} alt={project.title} className="project-img" loading="lazy" />
          : (
            <div className="project-img-placeholder">
              <div className="project-img-placeholder__icon"><Code2 size={20} /></div>
              <span className="project-img-placeholder__label">Sin portada</span>
            </div>
          )
        }
        <div className="project-img-overlay" aria-hidden />

        {/* Category badge */}
        {showCategory && (
          <span className={`project-cat-badge project-cat-badge--${project.category}`}>
            {project.category === 'empresa'
              ? <><Building2 size={10} /> Empresa</>
              : <><Sparkles size={10} /> Propio</>
            }
          </span>
        )}
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

        <div className="project-actions">
          {/* Demo */}
          {isExternal(project.demo_url) ? (
            <a href={project.demo_url} target="_blank" rel="noopener noreferrer"
               className="project-link">
              <ExternalLink size={13} /> Demo
            </a>
          ) : (
            <span className="project-link project-link--disabled">
              <ExternalLink size={13} /> Demo
            </span>
          )}

          {/* Repo */}
          {isExternal(project.repo_url) ? (
            <a href={project.repo_url} target="_blank" rel="noopener noreferrer"
               className="project-link">
              <Github size={13} /> Código
            </a>
          ) : (
            <span className="project-link project-link--disabled">
              <Github size={13} /> Código
            </span>
          )}

          {/* WhatsApp buy — only for personal/sale projects */}
          {project.category === 'personal' && (
            <a
              href={waUrl(project.whatsapp_msg, project.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link project-link--wa"
              title="Adquirir este proyecto"
            >
              <MessageSquare size={13} /> Adquirir
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
};

/* ─── Category section ────────────────────────────────── */
const CategorySection = ({ title, eyebrow, desc, projects, viewMoreTab, loading }) => {
  const visible = projects.slice(0, PREVIEW);
  const hasMore = projects.length > PREVIEW;

  return (
    <div className="projects-category">
      <div className="projects-cat-header">
        <div className="projects-cat-header__left">
          <p className={`projects-cat-eyebrow ${viewMoreTab === 'personal' ? 'projects-cat-eyebrow--sale' : ''}`}>
            {viewMoreTab === 'empresa'
              ? <><Building2 size={11} /> {eyebrow}</>
              : <><Sparkles size={11} /> {eyebrow}</>
            }
          </p>
          <h2 className="projects-cat-title">{title}</h2>
          <p className="projects-cat-desc">{desc}</p>
        </div>

        {hasMore && (
          <Link
            to={`/proyectos?tab=${viewMoreTab}`}
            className={`btn-see-more ${viewMoreTab === 'personal' ? 'btn-see-more--purple' : ''}`}
          >
            Ver todos ({projects.length}) <ArrowRight size={13} />
          </Link>
        )}
      </div>

      {loading ? (
        <div className="projects-state">
          <Loader2 size={24} className="spin-icon" />
          <p>Cargando proyectos...</p>
        </div>
      ) : visible.length === 0 ? (
        <div className="projects-state">
          <Code2 size={28} strokeWidth={1.2} />
          <p>Próximamente...</p>
        </div>
      ) : (
        <div className="projects-grid">
          {visible.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Main component ──────────────────────────────────── */
const Projects = () => {
  const [allProjects, setAllProjects] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    const url = import.meta.env.VITE_SUPABASE_URL;
    if (!url || url === 'https://your-project-id.supabase.co') {
      setAllProjects(LOCAL_PROJECTS);
      setLoading(false);
      return;
    }

    try {
      const { data, error: sbErr } = await supabase
        .from('projects')
        .select('*')
        .eq('visible', true)
        .order('order', { ascending: true });

      if (sbErr) throw sbErr;

      const enriched = (data || []).map((p, i) => ({
        ...p,
        localImg: LOCAL_IMGS[i % LOCAL_IMGS.length],
      }));

      setAllProjects(enriched.length > 0 ? enriched : LOCAL_PROJECTS);
    } catch (err) {
      setError('No se pudieron cargar los proyectos.');
      setAllProjects(LOCAL_PROJECTS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  const empresaProjects  = allProjects.filter(p => p.category === 'empresa');
  const personalProjects = allProjects.filter(p => p.category === 'personal');

  return (
    <section id="projects" className="section projects-section">
      <div className="container">

        {/* Section header */}
        <motion.div
          className="projects-main-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-eyebrow">Portafolio</p>
          <h2 className="section-title">
            Mis <span className="gradient-text">Proyectos</span>
          </h2>
          <div className="divider" />
        </motion.div>

        {/* Error banner */}
        {error && !loading && (
          <div className="projects-error">
            <AlertCircle size={18} />
            <span>{error}</span>
            <button onClick={fetchProjects} className="btn-retry">
              <RefreshCw size={13} /> Reintentar
            </button>
          </div>
        )}

        {/* ── Category: Empresas ── */}
        <CategorySection
          eyebrow="Trabajo para empresas"
          title={<>Proyectos <span className="gradient-text">Empresariales</span></>}
          desc="Soluciones reales desarrolladas para clientes. Tengo el derecho de mostrarlos en mi portafolio."
          projects={empresaProjects}
          viewMoreTab="empresa"
          loading={loading}
        />

        <hr className="projects-separator" />

        {/* ── Category: Propios / en venta ── */}
        <CategorySection
          eyebrow="Proyectos propios · en venta"
          title={<>Software <span className="gradient-text">Disponible</span></>}
          desc="Proyectos desarrollados por mí. Si te interesa el diseño o funcionalidad, puedes adquirirlo."
          projects={personalProjects}
          viewMoreTab="personal"
          loading={loading}
        />

      </div>
    </section>
  );
};

export { ProjectCard, LOCAL_PROJECTS, LOCAL_IMGS, WA_BASE, waUrl };
export default Projects;
