import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar         from './components/Navbar';
import Hero           from './components/Hero';
import About          from './components/About';
import CVSection      from './components/CVSection';
import Projects       from './components/Projects';
import Contact        from './components/Contact';
import Preloader      from './components/Preloader';
import NotFound       from './components/NotFound';
import DannaAssistant from './components/VirtualAssistant';
import AdminPanel     from './components/AdminPanel';
import AllProjects    from './pages/AllProjects';
import { supabase }   from './lib/supabaseClient';

/* ── Public home page ── */
const HomePage = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <About />
      <CVSection />
      <Projects />
      <Contact />
    </main>
  </>
);

/* ── Protected route (AdminPanel has its own login) ── */
const ProtectedRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(() => setChecking(false));
  }, []);

  if (checking) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)',
        fontFamily: 'var(--font-mono)',
        color: 'var(--text-muted)',
        fontSize: '0.85rem',
      }}>
        Verificando sesión...
      </div>
    );
  }

  return children;
};

/* ── App ── */
function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const isAdmin    = location.pathname.startsWith('/admin');
  const isProjects = location.pathname.startsWith('/proyectos');

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {loading && !isAdmin && !isProjects ? (
          <Preloader key="loader" onLoadingComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/"           element={<HomePage />} />
              <Route path="/proyectos"  element={<AllProjects />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>

            {/* Danna — solo en páginas públicas */}
            {!isAdmin && <DannaAssistant />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
