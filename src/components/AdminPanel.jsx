import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogIn, LogOut, Plus, Pencil, Trash2, Eye, EyeOff,
  Save, X, AlertCircle, CheckCircle, Loader2, GripVertical,
  ExternalLink, Github, Image as ImageIcon, RefreshCw,
  FolderOpen, Globe, LayoutDashboard, ChevronRight,
  Hash, Link2, ToggleLeft, ToggleRight
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import './AdminPanel.css';

/* ─── Empty form ──────────────────────────────────────── */
const EMPTY_FORM = {
  title: '',
  description: '',
  image_url: '',
  tags: '',
  demo_url: '',
  repo_url: '',
  order: 0,
  visible: true,
};

/* ─── Toast ───────────────────────────────────────────── */
const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <motion.div
      className={`toast toast--${toast.type}`}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.22 }}
    >
      <span className="toast__icon">
        {toast.type === 'success'
          ? <CheckCircle size={15} />
          : <AlertCircle size={15} />
        }
      </span>
      <span className="toast__msg">{toast.message}</span>
    </motion.div>
  );
};

/* ─── Project row ─────────────────────────────────────── */
const ProjectRow = ({ project, onEdit, onDelete, onToggleVisible, loading }) => (
  <motion.div
    className="admin-row"
    layout
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.22 }}
  >
    {/* Order */}
    <div className="admin-row__drag">
      <GripVertical size={14} className="drag-icon" />
      <span className="admin-row__order">{project.order}</span>
    </div>

    {/* Info */}
    <div className="admin-row__info">
      <p className="admin-row__title">{project.title}</p>
      <div className="admin-row__tags">
        {(project.tags || []).map((t) => (
          <span key={t} className="tag-pill tag-pill--xs">{t}</span>
        ))}
      </div>
    </div>

    {/* Status badge */}
    <div className="admin-row__status">
      <span className={`status-badge ${project.visible ? 'status-badge--on' : 'status-badge--off'}`}>
        {project.visible ? 'Visible' : 'Oculto'}
      </span>
    </div>

    {/* Actions */}
    <div className="admin-row__actions">
      {/* External links */}
      {project.demo_url?.startsWith('http') && (
        <a
          href={project.demo_url}
          target="_blank"
          rel="noopener noreferrer"
          className="icon-btn icon-btn--ghost"
          title="Ver demo"
        >
          <ExternalLink size={14} />
        </a>
      )}
      {project.repo_url?.startsWith('http') && (
        <a
          href={project.repo_url}
          target="_blank"
          rel="noopener noreferrer"
          className="icon-btn icon-btn--ghost"
          title="Ver repositorio"
        >
          <Github size={14} />
        </a>
      )}

      {/* Toggle visible */}
      <button
        className={`icon-btn ${project.visible ? 'icon-btn--green' : 'icon-btn--ghost'}`}
        onClick={() => onToggleVisible(project)}
        title={project.visible ? 'Ocultar' : 'Mostrar'}
        disabled={loading}
      >
        {project.visible ? <Eye size={14} /> : <EyeOff size={14} />}
      </button>

      {/* Edit */}
      <button
        className="icon-btn icon-btn--blue"
        onClick={() => onEdit(project)}
        title="Editar proyecto"
        disabled={loading}
      >
        <Pencil size={14} />
      </button>

      {/* Delete */}
      <button
        className="icon-btn icon-btn--red"
        onClick={() => onDelete(project.id)}
        title="Eliminar proyecto"
        disabled={loading}
      >
        {loading ? <Loader2 size={14} className="spin" /> : <Trash2 size={14} />}
      </button>
    </div>
  </motion.div>
);

/* ─── Project form modal ──────────────────────────────── */
const ProjectForm = ({ initial, onSave, onClose, saving }) => {
  const [form, setForm] = useState(
    initial
      ? { ...initial, tags: (initial.tags || []).join(', ') }
      : EMPTY_FORM
  );

  const set = (key) => (e) =>
    setForm((f) => ({
      ...f,
      [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      order: parseInt(form.order, 10) || 0,
    });
  };

  return (
    <motion.div
      className="form-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="form-modal"
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ type: 'spring', damping: 30, stiffness: 280 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="form-header">
          <div className="form-header__left">
            <span className="form-header__icon">
              {initial ? <Pencil size={16} /> : <Plus size={16} />}
            </span>
            <h3 className="form-header__title">
              {initial ? 'Editar proyecto' : 'Nuevo proyecto'}
            </h3>
          </div>
          <button className="icon-btn icon-btn--ghost form-close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <form className="form-body" onSubmit={handleSubmit}>

          <div className="form-field">
            <label className="form-label">Título *</label>
            <input
              className="form-input"
              value={form.title}
              onChange={set('title')}
              placeholder="Nombre del proyecto"
              required
              autoFocus
            />
          </div>

          <div className="form-field">
            <label className="form-label">Descripción *</label>
            <textarea
              className="form-input form-textarea"
              value={form.description}
              onChange={set('description')}
              placeholder="Describe brevemente el proyecto y su objetivo..."
              rows={4}
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label">
              <ImageIcon size={12} />
              URL de imagen
            </label>
            <input
              className="form-input"
              value={form.image_url}
              onChange={set('image_url')}
              placeholder="https://... (vacío = imagen local por defecto)"
            />
          </div>

          <div className="form-field">
            <label className="form-label">
              <Hash size={12} />
              Tags <span className="form-hint">separados por coma</span>
            </label>
            <input
              className="form-input"
              value={form.tags}
              onChange={set('tags')}
              placeholder="React, Node.js, Firebase"
            />
          </div>

          <div className="form-grid-2">
            <div className="form-field">
              <label className="form-label">
                <ExternalLink size={12} />
                URL Demo
              </label>
              <input
                className="form-input"
                value={form.demo_url}
                onChange={set('demo_url')}
                placeholder="https://mi-proyecto.netlify.app"
              />
            </div>
            <div className="form-field">
              <label className="form-label">
                <Github size={12} />
                URL Repositorio
              </label>
              <input
                className="form-input"
                value={form.repo_url}
                onChange={set('repo_url')}
                placeholder="https://github.com/..."
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-field">
              <label className="form-label">
                <Hash size={12} />
                Orden
              </label>
              <input
                className="form-input"
                type="number"
                min="0"
                value={form.order}
                onChange={set('order')}
              />
            </div>
            <div className="form-field form-field--toggle">
              <label className="toggle-label">
                <span className="toggle-label__text">Visible en portafolio</span>
                <button
                  type="button"
                  className={`toggle-switch ${form.visible ? 'toggle-switch--on' : ''}`}
                  onClick={() => setForm((f) => ({ ...f, visible: !f.visible }))}
                  aria-pressed={form.visible}
                >
                  <span className="toggle-switch__thumb" />
                </button>
              </label>
            </div>
          </div>

          {/* Footer */}
          <div className="form-footer">
            <button
              type="button"
              className="btn-ghost"
              onClick={onClose}
              disabled={saving}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving
                ? <><Loader2 size={15} className="spin" /> Guardando...</>
                : <><Save size={15} /> Guardar proyecto</>
              }
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

/* ─── Login form ──────────────────────────────────────── */
const LoginForm = () => {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) setError('Credenciales incorrectas. Verifica tu email y contraseña.');
    setLoading(false);
  };

  return (
    <div className="login-wrap">
      <div className="login-bg-glow" aria-hidden />
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Icon */}
        <div className="login-icon-wrap">
          <LayoutDashboard size={28} />
        </div>

        <div className="login-header">
          <p className="login-eyebrow">Panel administrativo</p>
          <h2 className="login-title">
            Acceso al <span className="gradient-text">Dashboard</span>
          </h2>
          <p className="login-sub">Gestiona los proyectos de tu portafolio</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-field">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
              autoFocus
            />
          </div>

          <div className="form-field">
            <label className="form-label">Contraseña</label>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                className="login-error"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <AlertCircle size={15} />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <button type="submit" className="btn-primary btn-full" disabled={loading}>
            {loading
              ? <><Loader2 size={16} className="spin" /> Verificando...</>
              : <><LogIn size={16} /> Ingresar al panel</>
            }
          </button>
        </form>

        <p className="login-hint">
          Crea tu cuenta admin en{' '}
          <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer">
            Supabase Authentication
          </a>
        </p>
      </motion.div>
    </div>
  );
};

/* ─── Main Admin Panel ────────────────────────────────── */
const AdminPanel = () => {
  const [session,    setSession]    = useState(null);
  const [projects,   setProjects]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [saving,     setSaving]     = useState(false);
  const [showForm,   setShowForm]   = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [toasts,     setToasts]     = useState([]);
  const [deleteId,   setDeleteId]   = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  /* Auth */
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  /* Toast */
  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  /* Fetch */
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('order', { ascending: true });

    if (error) addToast('Error al cargar proyectos: ' + error.message, 'error');
    else setProjects(data || []);
    setLoading(false);
  }, [addToast]);

  useEffect(() => { if (session) fetchProjects(); }, [session, fetchProjects]);

  /* Save */
  const handleSave = async (formData) => {
    setSaving(true);
    const { id, localImg, ...payload } = formData;
    let error;
    if (editTarget) {
      ({ error } = await supabase.from('projects').update(payload).eq('id', editTarget.id));
    } else {
      ({ error } = await supabase.from('projects').insert([payload]));
    }
    if (error) addToast('Error al guardar: ' + error.message, 'error');
    else {
      addToast(editTarget ? 'Proyecto actualizado' : 'Proyecto creado');
      setShowForm(false);
      setEditTarget(null);
      fetchProjects();
    }
    setSaving(false);
  };

  /* Delete */
  const handleDelete = async (id) => {
    if (!window.confirm('¿Eliminar este proyecto? Esta acción no se puede deshacer.')) return;
    setDeleteId(id);
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) addToast('Error al eliminar: ' + error.message, 'error');
    else { addToast('Proyecto eliminado'); fetchProjects(); }
    setDeleteId(null);
  };

  /* Toggle visible */
  const handleToggleVisible = async (project) => {
    const { error } = await supabase
      .from('projects')
      .update({ visible: !project.visible })
      .eq('id', project.id);
    if (error) addToast('Error: ' + error.message, 'error');
    else { addToast(project.visible ? 'Proyecto ocultado' : 'Proyecto publicado'); fetchProjects(); }
  };

  const openCreate = () => { setEditTarget(null); setShowForm(true); };
  const openEdit   = (p)  => { setEditTarget(p);   setShowForm(true); };

  if (!session) return <LoginForm />;

  const visibleCount = projects.filter((p) => p.visible).length;

  return (
    <div className="admin-layout">

      {/* ── Sidebar ── */}
      <aside className={`admin-sidebar ${mobileMenu ? 'admin-sidebar--open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <LayoutDashboard size={18} className="sidebar-logo__icon" />
          <span className="sidebar-logo__name">Admin</span>
          <span className="sidebar-logo__dot gradient-text">.panel</span>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          <a href="#projects" className="sidebar-link sidebar-link--active" onClick={() => setMobileMenu(false)}>
            <FolderOpen size={16} />
            <span>Proyectos</span>
            <ChevronRight size={13} className="sidebar-link__arrow" />
          </a>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="sidebar-link"
            onClick={() => setMobileMenu(false)}
          >
            <Globe size={16} />
            <span>Ver portafolio</span>
            <ExternalLink size={11} className="sidebar-link__ext" />
          </a>
        </nav>

        {/* User */}
        <div className="sidebar-user">
          <div className="sidebar-avatar">
            {session.user.email.charAt(0).toUpperCase()}
          </div>
          <div className="sidebar-user__info">
            <p className="sidebar-user__email">{session.user.email}</p>
            <p className="sidebar-user__role">Administrador</p>
          </div>
          <button
            className="icon-btn icon-btn--red sidebar-logout"
            onClick={() => supabase.auth.signOut()}
            title="Cerrar sesión"
          >
            <LogOut size={15} />
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileMenu && (
        <div className="sidebar-backdrop" onClick={() => setMobileMenu(false)} />
      )}

      {/* ── Main ── */}
      <main className="admin-main">

        {/* Mobile topbar */}
        <div className="admin-mobile-bar">
          <button
            className="icon-btn icon-btn--ghost"
            onClick={() => setMobileMenu(true)}
          >
            <LayoutDashboard size={18} />
          </button>
          <span className="admin-mobile-bar__title">Panel Admin</span>
          <button className="btn-primary btn--xs" onClick={openCreate}>
            <Plus size={14} /> Nuevo
          </button>
        </div>

        {/* Topbar */}
        <div className="admin-topbar">
          <div className="admin-topbar__text">
            <h1 className="admin-topbar__title">Proyectos</h1>
            <p className="admin-topbar__sub">
              {projects.length} en total &nbsp;·&nbsp; {visibleCount} publicados
            </p>
          </div>
          <div className="admin-topbar__actions">
            <button
              className="btn-ghost btn--sm"
              onClick={fetchProjects}
              disabled={loading}
            >
              <RefreshCw size={14} className={loading ? 'spin' : ''} />
              Actualizar
            </button>
            <button className="btn-primary btn--sm" onClick={openCreate}>
              <Plus size={15} />
              Nuevo proyecto
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="admin-stats">
          <div className="stat-card">
            <p className="stat-card__value" style={{ color: 'var(--accent-blue)' }}>{projects.length}</p>
            <p className="stat-card__label">Total</p>
          </div>
          <div className="stat-card">
            <p className="stat-card__value" style={{ color: 'var(--accent-green)' }}>{visibleCount}</p>
            <p className="stat-card__label">Publicados</p>
          </div>
          <div className="stat-card">
            <p className="stat-card__value">{projects.length - visibleCount}</p>
            <p className="stat-card__label">Ocultos</p>
          </div>
        </div>

        {/* Table */}
        <div className="admin-table">
          <div className="admin-table__head">
            <span>Orden</span>
            <span>Proyecto</span>
            <span>Estado</span>
            <span>Acciones</span>
          </div>

          {loading ? (
            <div className="admin-table__empty">
              <Loader2 size={22} className="spin" />
              <p>Cargando proyectos...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="admin-table__empty">
              <FolderOpen size={32} strokeWidth={1.2} />
              <p>No hay proyectos todavía.</p>
              <button className="btn-primary btn--sm" onClick={openCreate}>
                <Plus size={14} /> Crear el primero
              </button>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {projects.map((p) => (
                <ProjectRow
                  key={p.id}
                  project={p}
                  onEdit={openEdit}
                  onDelete={handleDelete}
                  onToggleVisible={handleToggleVisible}
                  loading={deleteId === p.id}
                />
              ))}
            </AnimatePresence>
          )}
        </div>
      </main>

      {/* Form modal */}
      <AnimatePresence>
        {showForm && (
          <ProjectForm
            initial={editTarget}
            onSave={handleSave}
            onClose={() => { setShowForm(false); setEditTarget(null); }}
            saving={saving}
          />
        )}
      </AnimatePresence>

      {/* Toasts */}
      <div className="toast-stack" aria-live="polite">
        <AnimatePresence>
          {toasts.map((t) => (
            <Toast key={t.id} toast={t} onClose={() => removeToast(t.id)} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminPanel;
