import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

const Preloader = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoadingComplete, 800);
          return 100;
        }
        return Math.min(prev + Math.random() * 5 + 2, 100);
      });
    }, 70);
    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="preloader"
      exit={{
        opacity: 0,
        y: -30,
        filter: 'blur(16px)',
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {/* Background glow */}
      <div className="pl-glow pl-glow--a" aria-hidden />
      <div className="pl-glow pl-glow--b" aria-hidden />

      <div className="pl-content">
        {/* Logo / name */}
        <motion.div
          className="pl-logo"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="pl-logo__bracket">&lt;</span>
          <span className="pl-logo__name">Edisson</span>
          <span className="pl-logo__suffix gradient-text">.dev</span>
          <span className="pl-logo__bracket">/&gt;</span>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="pl-bar-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="pl-bar-track">
            <motion.div
              className="pl-bar-fill"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            />
          </div>
          <span className="pl-percent">{Math.round(progress)}%</span>
        </motion.div>

        {/* Status line */}
        <motion.p
          className="pl-status"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {progress < 40 && 'Inicializando sistema...'}
          {progress >= 40 && progress < 80 && 'Cargando recursos...'}
          {progress >= 80 && 'Preparando portafolio...'}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Preloader;
