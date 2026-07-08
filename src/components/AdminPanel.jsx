import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogIn, LogOut, Plus, Pencil, Trash2, Eye, EyeOff,
  Save, X, AlertCircle, CheckCircle, Loader2, GripVertical,
  ExternalLink, Github, Image as ImageIcon, RefreshCw,
  FolderOpen, Globe, LayoutDashboard, ChevronRight,
  Hash, Upload, XCircle, Building2, Sparkles,
  ChevronLeft, MessageSquare, Menu
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import './AdminPanel.css';

const BUCKET = 'project-covers';

const EMPTY_FORM = {
  title: '', description: '', image_url: '', tags: '',
  demo_url: '', repo_url: '', category: 'personal',
  whatsapp_msg: '', order: 0, visible: true,
};

/* ─── Storage helpers ─────────────────────────────────── */
const uploadImage = async (file) => {
  const ext = file.name.split('.').pop();
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(filename, file, { cacheControl: '3600', upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
  return data.publicUrl;
};
const deleteStorageImage = async (url) => {
  try {
    const parts = url.split(`/${BUCKET}/`);
    if (parts.length < 2) return;
    await supabase.storage.from(BUCKET).remove([parts[1]]);
  } catch (_) {}
};

/* ─── Toast ───────────────────────────────────────────── */
const Toast = ({ toast, onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  return (
    <motion.div className={`toast toast--${toast.type}`}
      initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.22 }}>
      <span className="toast__icon">
        {toast.type === 'success' ? <CheckCircle size={15} /> : <AlertCircle size={15} />}
      </span>
      <span className="toast__msg">{toast.message}</span>
    </motion.div>
  );
};

/* ─── Image Uploader ──────────────────────────────────── */
const ImageUploader = ({ currentUrl, onUploaded, onClear }) => {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [preview,   setPreview]   = useState(currentUrl || '');
  const [error,     setError]     = useState('');
  useEffect(() => { setPreview(currentUrl || ''); }, [currentUrl]);

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) { setError('Solo se permiten imágenes.'); return; }
    if (file.size > 5 * 1024 * 1024)    { setError('Máximo 5 MB por imagen.'); return; }
    setError('');
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    try {
      const url = await uploadImage(file);
      onUploaded(url);
    } catch (e) {
      setError('Error al subir: ' + e.message);
      setPreview(currentUrl || '');
    } finally { setUploading(false); }
  };

  return (
    <div className="img-uploader">
      <div className={`img-dropzone ${preview ? 'img-dropzone--filled' : ''}`}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); }}
        onClick={() => !preview && inputRef.current?.click()}>
        {uploading && <div className="img-uploading"><Loader2 size={24} className="spin" /><span>Subiendo...</span></div>}
        {!uploading && preview && (
          <>
            <img src={preview} alt="Portada" className="img-preview" />
            <div className="img-overlay">
              <button type="button" className="img-overlay__change"
                onClick={e => { e.stopPropagation(); inputRef.current?.click(); }}>
                <Upload size={14} /> Cambiar
              </button>
            </div>
            <button type="button" className="img-clear-btn"
              onClick={e => { e.stopPropagation(); setPreview(''); onClear(); }}>
              <XCircle size={18} />
            </button>
          </>
        )}
        {!uploading && !preview && (
          <div className="img-placeholder">
            <div className="img-placeholder__icon"><Upload size={22} /></div>
            <p className="img-placeholder__title">Arrastra la portada aquí</p>
            <p className="img-placeholder__sub">o haz clic para seleccionar</p>
            <p className="img-placeholder__hint">PNG · JPG · WEBP · máx. 5 MB</p>
          </div>
        )}
      </div>
      {error && <p className="img-error"><AlertCircle size={13} /> {error}</p>}
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }}
        onChange={e => handleFile(e.target.files[0])} />
    </div>
  );
};

/* ─── Project Card (admin view) ───────────────────────── */
const AdminProjectCard = ({ project, onEdit, onDelete, onToggleVisible, deleting }) => (
  <motion.div className="admin-project-card"
    layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.2 }}>
    {/* Cover */}
    <div className="apc-cover">
      {project.image_url
        ? <img src={project.image_url} alt={project.title} loading="lazy" />
        : <div className="apc-cover__placeholder"><ImageIcon size={28} /></div>
      }
      <div className="apc-cover__overlay" />
      <span className={`apc-status ${project.visible ? 'apc-status--on' : 'apc-status--off'}`}>
        <span className="apc-status__dot" />
        {project.visible ? 'Visible' : 'Oculto'}
      </span>
    </div>

    {/* Body */}
    <div className="apc-body">
      <div className="apc-tags">
        {(project.tags || []).slice(0, 3).map(t => (
          <span key={t} className="tag-pill tag-pill--xs">{t}</span>
        ))}
      </div>
      <p className="apc-title">{project.title}</p>
      <p className="apc-desc">{project.description}</p>
    </div>

    {/* Footer */}
    <div className="apc-footer">
      <div className="apc-actions">
        <button className={`icon-btn ${project.visible ? 'icon-btn--green' : 'icon-btn--ghost'}`}
          onClick={() => onToggleVisible(project)} title={project.visible ? 'Ocultar' : 'Mostrar'}>
          {project.visible ? <Eye size={14} /> : <EyeOff size={14} />}
        </button>
        <button className="icon-btn icon-btn--blue" onClick={() => onEdit(project)} title="Editar">
          <Pencil size={14} />
        </button>
        <button className="icon-btn icon-btn--red" onClick={() => onDelete(project)} title="Eliminar" disabled={deleting}>
          {deleting ? <Loader2 size={14} className="spin" /> : <Trash2 size={14} />}
        </button>
      </div>
      <div className="apc-links">
        {project.demo_url?.startsWith('http') && (
          <a href={project.demo_url} target="_blank" rel="noopener noreferrer"
            className="icon-btn icon-btn--ghost" title="Ver demo">
            <ExternalLink size={13} />
          </a>
        )}
        {project.repo_url?.startsWith('http') && (
          <a href={project.repo_url} target="_blank" rel="noopener noreferrer"
            className="icon-btn icon-btn--ghost" title="Ver repo">
            <Github size={13} />
          </a>
        )}
      </div>
    </div>
  </motion.div>
);

/* ─── Category section ────────────────────────────────── */
const CategorySection = ({ icon, title, type, projects, loading, onAdd, onEdit, onDelete, onToggle, deleteId }) => (
  <div className="admin-section">
    <div className="admin-section-header">
      <div className="admin-section-header__left">
        <div className={`admin-section-icon admin-section-icon--${type}`}>{icon}</div>
        <div>
          <p className="admin-section-title">{title}</p>
          <p className="admin-section-count">{projects.length} proyecto{projects.length !== 1 ? 's' : ''}</p>
        </div>
      </div>
      <button className="btn-primary btn--sm" onClick={() => onAdd(type)}>
        <Plus size={14} /> Nuevo
      </button>
    </div>

    {loading ? (
      <div className="admin-cards-empty"><Loader2 size={22} className="spin" /><p>Cargando...</p></div>
    ) : projects.length === 0 ? (
      <div className="admin-cards-empty">
        <FolderOpen size={30} strokeWidth={1.2} />
        <p>Aún no hay proyectos en esta categoría.</p>
        <button className="btn-primary btn--sm" onClick={() => onAdd(type)}>
          <Plus size={14} /> Agregar primero
        </button>
      </div>
    ) : (
      <AnimatePresence mode="popLayout">
        <div className="admin-cards-grid">
          {projects.map(p => (
            <AdminProjectCard key={p.id} project={p}
              onEdit={onEdit} onDelete={onDelete} onToggleVisible={onToggle}
              deleting={deleteId === p.id} />
          ))}
        </div>
      </AnimatePresence>
    )}
  </div>
);

/* ─── Project Form Modal ──────────────────────────────── */
const ProjectForm = ({ initial, defaultCategory, onSave, onClose, saving }) => {
  const [form, setForm] = useState(
    initial
      ? { ...initial, tags: (initial.tags || []).join(', ') }
      : { ...EMPTY_FORM, category: defaultCategory || 'personal' }
  );
  const set = key => e => setForm(f => ({ ...f, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const handleSubmit = e => {
    e.preventDefault();
    onSave({ ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean), order: parseInt(form.order, 10) || 0 });
  };

  return (
    <motion.div className="form-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="form-modal"
        initial={{ opacity: 0, y: 32, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ type: 'spring', damping: 30, stiffness: 280 }}
        onClick={e => e.stopPropagation()}>

        <div className="form-header">
          <div className="form-header__left">
            <span className="form-header__icon">{initial ? <Pencil size={16} /> : <Plus size={16} />}</span>
            <h3 className="form-header__title">{initial ? 'Editar proyecto' : 'Nuevo proyecto'}</h3>
          </div>
          <button className="icon-btn icon-btn--ghost form-close" onClick={onClose}><X size={16} /></button>
        </div>

        <form className="form-body" onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="form-label"><ImageIcon size={12} /> Portada del proyecto</label>
            <ImageUploader currentUrl={form.image_url}
              onUploaded={url => setForm(f => ({ ...f, image_url: url }))}
              onClear={() => setForm(f => ({ ...f, image_url: '' }))} />
            <p className="form-hint-text">Se sube a Supabase Storage · se muestra en la tarjeta del proyecto.</p>
          </div>

          <div className="form-field">
            <label className="form-label">Título *</label>
            <input className="form-input" value={form.title} onChange={set('title')} placeholder="Nombre del proyecto" required autoFocus />
          </div>

          <div className="form-field">
            <label className="form-label">Descripción *</label>
            <textarea className="form-input form-textarea" value={form.description} onChange={set('description')}
              placeholder="Describe brevemente el proyecto..." rows={3} required />
          </div>

          <div className="form-field">
            <label className="form-label"><Hash size={12} /> Tags <span className="form-hint">separados por coma</span></label>
            <input className="form-input" value={form.tags} onChange={set('tags')} placeholder="React, Node.js, Firebase" />
          </div>

          <div className="form-field">
            <label className="form-label">Categoría</label>
            <select className="form-input" value={form.category} onChange={set('category')}>
              <option value="empresa">Proyecto para empresa</option>
              <option value="personal">Propio / En venta</option>
            </select>
          </div>

          {form.category === 'personal' && (
            <div className="form-field">
              <label className="form-label"><MessageSquare size={12} /> Mensaje WhatsApp <span className="form-hint">para el botón "Adquirir"</span></label>
              <textarea className="form-input form-textarea" value={form.whatsapp_msg} onChange={set('whatsapp_msg')}
                placeholder="Hola Edisson, me interesa adquirir este proyecto. ¿Podemos hablar?" rows={2} />
            </div>
          )}

          <div className="form-grid-2">
            <div className="form-field">
              <label className="form-label"><ExternalLink size={12} /> URL Demo</label>
              <input className="form-input" value={form.demo_url} onChange={set('demo_url')} placeholder="https://mi-proyecto.netlify.app" />
            </div>
            <div className="form-field">
              <label className="form-label"><Github size={12} /> URL Repositorio</label>
              <input className="form-input" value={form.repo_url} onChange={set('repo_url')} placeholder="https://github.com/..." />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-field">
              <label className="form-label"><Hash size={12} /> Orden</label>
              <input className="form-input" type="number" min="0" value={form.order} onChange={set('order')} />
            </div>
            <div className="form-field form-field--toggle">
              <label className="toggle-label">
                <span className="toggle-label__text">Visible en portafolio</span>
                <button type="button" className={`toggle-switch ${form.visible ? 'toggle-switch--on' : ''}`}
                  onClick={() => setForm(f => ({ ...f, visible: !f.visible }))} aria-pressed={form.visible}>
                  <span className="toggle-switch__thumb" />
                </button>
              </label>
            </div>
          </div>

          <div className="form-footer">
            <button type="button" className="btn-ghost" onClick={onClose} disabled={saving}>Cancelar</button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? <><Loader2 size={15} className="spin" /> Guardando...</> : <><Save size={15} /> Guardar proyecto</>}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

/* ─── Login ───────────────────────────────────────────── */
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault(); setLoading(true); setError('');
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) setError('Credenciales incorrectas. Verifica tu email y contraseña.');
    setLoading(false);
  };

  return (
    <div className="login-wrap">
      <div className="login-bg-glow" aria-hidden />
      <motion.div className="login-card" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
        <div className="login-icon-wrap"><LayoutDashboard size={28} /></div>
        <div className="login-header">
          <p className="login-eyebrow">Panel administrativo</p>
          <h2 className="login-title">Acceso al <span className="gradient-text">Dashboard</span></h2>
          <p className="login-sub">Gestiona los proyectos de tu portafolio</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-field">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" value={email}
              onChange={e => setEmail(e.target.value)} placeholder="tu@email.com" required autoFocus />
          </div>
          <div className="form-field">
            <label className="form-label">Contraseña</label>
            <input className="form-input" type="password" value={password}
              onChange={e => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <AnimatePresence>
            {error && (
              <motion.div className="login-error"
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <AlertCircle size={15} /> <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>
          <button type="submit" className="btn-primary btn-full" disabled={loading}>
            {loading ? <><Loader2 size={16} className="spin" /> Verificando...</> : <><LogIn size={16} /> Ingresar al panel</>}
          </button>
        </form>
        <p className="login-hint">
          Crea tu cuenta en{' '}
          <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer">Supabase Authentication</a>
        </p>
      </motion.div>
    </div>
  );
};

/* ─── Main AdminPanel ─────────────────────────────────── */
const AdminPanel = () => {
  const [session,    setSession]    = useState(null);
  const [projects,   setProjects]   = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [saving,     setSaving]     = useState(false);
  const [showForm,   setShowForm]   = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [defCategory, setDefCategory] = useState('personal');
  const [toasts,     setToasts]     = useState([]);
  const [deleteId,   setDeleteId]   = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [collapsed,  setCollapsed]  = useState(false);
  const [activeSection, setActiveSection] = useState('empresa');

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(t => [...t, { id, message, type }]);
  }, []);
  const removeToast = useCallback(id => setToasts(t => t.filter(x => x.id !== id)), []);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from('projects').select('*').order('order', { ascending: true });
    if (error) addToast('Error al cargar: ' + error.message, 'error');
    else setProjects(data || []);
    setLoading(false);
  }, [addToast]);

  useEffect(() => { if (session) fetchProjects(); }, [session, fetchProjects]);

  const handleSave = async formData => {
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
      setShowForm(false); setEditTarget(null); fetchProjects();
    }
    setSaving(false);
  };

  const handleDelete = async project => {
    if (!window.confirm('¿Eliminar este proyecto? No se puede deshacer.')) return;
    setDeleteId(project.id);
    if (project.image_url?.includes(`/${BUCKET}/`)) await deleteStorageImage(project.image_url);
    const { error } = await supabase.from('projects').delete().eq('id', project.id);
    if (error) addToast('Error al eliminar: ' + error.message, 'error');
    else { addToast('Proyecto eliminado'); fetchProjects(); }
    setDeleteId(null);
  };

  const handleToggle = async project => {
    const { error } = await supabase.from('projects').update({ visible: !project.visible }).eq('id', project.id);
    if (error) addToast('Error: ' + error.message, 'error');
    else { addToast(project.visible ? 'Ocultado' : 'Publicado'); fetchProjects(); }
  };

  const openCreate = cat => { setDefCategory(cat || 'personal'); setEditTarget(null); setShowForm(true); };
  const openEdit   = p   => { setEditTarget(p); setShowForm(true); };

  if (!session) return <LoginForm />;

  const empresaProjects  = projects.filter(p => p.category === 'empresa');
  const personalProjects = projects.filter(p => p.category === 'personal');
  const visibleCount     = projects.filter(p => p.visible).length;

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className={`admin-sidebar ${collapsed ? 'admin-sidebar--collapsed' : ''} ${mobileMenu ? 'admin-sidebar--open' : ''}`}>
        <div className="sidebar-logo">
          <LayoutDashboard size={18} className="sidebar-logo__icon" />
          {!collapsed && (
            <div className="sidebar-logo__text">
              <span className="sidebar-logo__name">Admin Panel</span>
              <span className="sidebar-logo__sub">portafolio · cms</span>
            </div>
          )}
          <button className="sidebar-collapse-btn" onClick={() => setCollapsed(c => !c)} title={collapsed ? 'Expandir' : 'Colapsar'}>
            {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {!collapsed && <span className="sidebar-section-label">Proyectos</span>}
          <a className={`sidebar-link sidebar-link--empresa ${activeSection === 'empresa' ? 'sidebar-link--active' : ''}`}
            data-tip="Empresas" onClick={() => { setActiveSection('empresa'); setMobileMenu(false); }}>
            <span className="sidebar-link__icon"><Building2 size={16} /></span>
            <span className="sidebar-link__text">Empresariales</span>
            {!collapsed && <span className="sidebar-link__badge">{empresaProjects.length}</span>}
          </a>
          <a className={`sidebar-link sidebar-link--venta ${activeSection === 'personal' ? 'sidebar-link--active' : ''}`}
            data-tip="En Venta" onClick={() => { setActiveSection('personal'); setMobileMenu(false); }}>
            <span className="sidebar-link__icon"><Sparkles size={16} /></span>
            <span className="sidebar-link__text">En Venta</span>
            {!collapsed && <span className="sidebar-link__badge">{personalProjects.length}</span>}
          </a>

          <div className="sidebar-divider" />
          {!collapsed && <span className="sidebar-section-label">General</span>}
          <a href="/" target="_blank" rel="noopener noreferrer" className="sidebar-link" data-tip="Portafolio">
            <span className="sidebar-link__icon"><Globe size={16} /></span>
            <span className="sidebar-link__text">Ver portafolio</span>
            {!collapsed && <ExternalLink size={11} style={{ marginLeft: 'auto', opacity: 0.4 }} />}
          </a>
        </nav>

        <div className="sidebar-user">
          <div className="sidebar-avatar">{session.user.email.charAt(0).toUpperCase()}</div>
          {!collapsed && (
            <div className="sidebar-user__info">
              <p className="sidebar-user__email">{session.user.email}</p>
              <p className="sidebar-user__role">Administrador</p>
            </div>
          )}
          <button className="icon-btn icon-btn--red sidebar-logout" onClick={() => supabase.auth.signOut()} title="Cerrar sesión">
            <LogOut size={15} />
          </button>
        </div>
      </aside>

      {mobileMenu && <div className="sidebar-backdrop" onClick={() => setMobileMenu(false)} />}

      {/* Main */}
      <main className="admin-main">
        {/* Mobile bar */}
        <div className="admin-mobile-bar">
          <button className="icon-btn icon-btn--ghost" onClick={() => setMobileMenu(true)}><Menu size={18} /></button>
          <span className="admin-mobile-bar__title">Admin Panel</span>
          <button className="btn-primary btn--xs" onClick={() => openCreate(activeSection)}><Plus size={14} /> Nuevo</button>
        </div>

        {/* Desktop topbar */}
        <div className="admin-topbar">
          <div>
            <h1 className="admin-topbar__title">
              {activeSection === 'empresa' ? 'Proyectos Empresariales' : 'Software En Venta'}
            </h1>
            <p className="admin-topbar__sub">{projects.length} total · {visibleCount} publicados</p>
          </div>
          <div className="admin-topbar__actions">
            <button className="btn-ghost btn--sm" onClick={fetchProjects} disabled={loading}>
              <RefreshCw size={14} className={loading ? 'spin' : ''} /> Actualizar
            </button>
            <button className="btn-primary btn--sm" onClick={() => openCreate(activeSection)}>
              <Plus size={15} /> Nuevo proyecto
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="admin-stats">
          <div className="stat-card"><p className="stat-card__value" style={{ color: 'var(--accent-blue)' }}>{projects.length}</p><p className="stat-card__label">Total</p></div>
          <div className="stat-card"><p className="stat-card__value" style={{ color: 'var(--accent-blue)' }}>{empresaProjects.length}</p><p className="stat-card__label">Empresas</p></div>
          <div className="stat-card"><p className="stat-card__value" style={{ color: 'var(--accent-purple)' }}>{personalProjects.length}</p><p className="stat-card__label">En Venta</p></div>
          <div className="stat-card"><p className="stat-card__value" style={{ color: 'var(--accent-green)' }}>{visibleCount}</p><p className="stat-card__label">Publicados</p></div>
        </div>

        {/* Active section */}
        <AnimatePresence mode="wait">
          {activeSection === 'empresa' ? (
            <motion.div key="empresa" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
              <CategorySection icon={<Building2 size={17} />} title="Proyectos Empresariales" type="empresa"
                projects={empresaProjects} loading={loading}
                onAdd={openCreate} onEdit={openEdit} onDelete={handleDelete} onToggle={handleToggle} deleteId={deleteId} />
            </motion.div>
          ) : (
            <motion.div key="personal" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
              <CategorySection icon={<Sparkles size={17} />} title="Software En Venta" type="venta"
                projects={personalProjects} loading={loading}
                onAdd={openCreate} onEdit={openEdit} onDelete={handleDelete} onToggle={handleToggle} deleteId={deleteId} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {showForm && (
          <ProjectForm initial={editTarget} defaultCategory={defCategory}
            onSave={handleSave} onClose={() => { setShowForm(false); setEditTarget(null); }} saving={saving} />
        )}
      </AnimatePresence>

      <div className="toast-stack" aria-live="polite">
        <AnimatePresence>
          {toasts.map(t => <Toast key={t.id} toast={t} onClose={() => removeToast(t.id)} />)}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminPanel;
