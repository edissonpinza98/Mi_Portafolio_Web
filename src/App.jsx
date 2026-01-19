import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import CVSection from './components/CVSection';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Preloader from './components/Preloader';
import NotFound from './components/NotFound';

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

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="loader" onLoadingComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
