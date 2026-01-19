import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import CVSection from './components/CVSection';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Preloader from './components/Preloader';

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="App">
      <AnimatePresence mode="wait">
        {loading && (
          <Preloader key="loader" onLoadingComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <Navbar />
          <main>
            <Hero />
            <About />
            <CVSection />
            <Projects />
            <Contact />
          </main>
        </motion.div>
      )}
    </div>
  );
}

export default App;
