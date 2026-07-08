import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Search, Loader2, Code2,
  Building2, Sparkles, LayoutGrid
} from 'lucide-react';
import Navbar from '../components/Navbar';
import { ProjectCard, LOCAL_PROJECTS, LOCAL_IMGS } from '../components/Projects';
import { supabase } from '../lib/supabaseClient';
import './AllProjects.css';

/* ─── Tab config ──────────────────────────────────────── */
const TABS = [
  { key: 'all',      label: 'Todos',     icon: <LayoutGrid size={13} /> },
  { key: 'empresa',  label: 'Empresas',  icon: <Building2  size={13} /> },
  { key: 'personal', label: 'En Venta',  icon: <Sparkles   size={13} /> },
];

/* ─── AllProjects page ────────────────────────────────── */
const AllProjects = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [allProjects, setAllProjects] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [query,       setQuery]       = useState('');

  // Read ?tab= from URL, default to 'all'
  const activeTab = searchParams.get('tab') || 'all';

  const setTab = (tab) => {
    setSearchParams(tab === 'all' ? {} : { tab });
    setQuery(''); // reset search on tab change
  };

  /* Fetch */
  const fetchProjects = useCallback(async () => {
    setLoading(true);

    const url = import.meta.env.VITE_SUPABASE_URL;
    if (!url || url === 'https://your-project-id.supabase.co') {
      setAllProjects(LOCAL_PROJECTS);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('visible', true)
        .order('order', { ascending: true });

      if (error) throw error;

      const enriched = (data || []).map((p, i) => ({
        ...p,
        localImg: LOCAL_IMGS[i % LOCAL_IMGS.length],
      }));

      setAllProjects(enriched.length > 0 ? enriched : LOCAL_PROJECTS);
    } catch {
      setAllProjects(LOCAL_PROJECTS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  /* Scroll to top on mount */
  useEffect(() => { window.scrollTo(0, 0); }, []);

  /* Filter */
  const filtered = useMemo(() => {
    let list = allProjects;

    if (activeTab !== 'all') {
      list = list.filter(p => p.category === activeTab);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tags || []).some(t => t.toLowerCase().includes(q))
      );
    }

    return list;
  }, [allProjects, activeTab, query]);

  const countFor = (tab) =>
    tab === 'all'
      ? allProjects.length
      : allProjects.filter(p => p.category === tab).length;

  return (
    <div className="allprojects-page">
      <Navbar />

      <div className="container">
        {/* Hero */}
        <header className="allprojects-hero">
          <div className="allprojects-hero__glow" aria-hidden />

          <button
            className="allprojects-hero__back"
            onClick={() => navigate('/#projects')}
          >
            <ArrowLeft size={14} /> Volver al inicio
          </button>

          <h1 className="allprojects-hero__title">
            Todos los <span className="gradient-text">Proyectos</span>
          </h1>
          <p className="allprojects-hero__sub">
            Explora el catálogo completo: proyectos desarrollados para empresas
            y software propio disponible para adquirir.
          </p>
        </header>

        {/* Tabs */}
        <div className="allprojects-tabs" role="tablist">
          {TABS.map(tab => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={activeTab === tab.key}
              className={[
                'allprojects-tab',
                activeTab === tab.key ? 'allprojects-tab--active' : '',
                activeTab === tab.key && tab.key !== 'all' ? `tab--${tab.key}` : '',
              ].join(' ')}
              onClick={() => setTab(tab.key)}
            >
              {tab.icon}
              {tab.label}
              {!loading && (
                <span className="tab-count">{countFor(tab.key)}</span>
              )}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="allprojects-toolbar">
          <div className="allprojects-toolbar__left">
            Mostrando&nbsp;
            <span className="allprojects-count">{loading ? '...' : filtered.length}</span>
            &nbsp;proyecto{filtered.length !== 1 ? 's' : ''}
          </div>

          <div className="allprojects-search">
            <Search size={15} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por nombre, tecnología..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              aria-label="Buscar proyectos"
            />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="allprojects-loading">
            <Loader2 size={26} className="allprojects-spin" />
            <p>Cargando proyectos...</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="allprojects-grid">
              {filtered.length === 0 ? (
                <motion.div
                  className="allprojects-empty"
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Code2 size={36} strokeWidth={1.2} />
                  <p>No se encontraron proyectos{query ? ` para "${query}"` : ''}.</p>
                  {query && (
                    <button
                      className="btn-retry"
                      onClick={() => setQuery('')}
                    >
                      Limpiar búsqueda
                    </button>
                  )}
                </motion.div>
              ) : (
                filtered.map((p, i) => (
                  <ProjectCard
                    key={p.id}
                    project={p}
                    index={i}
                    showCategory
                  />
                ))
              )}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default AllProjects;
