import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const navLinks = [
  { name: 'Inicio',     target: 'hero' },
  { name: 'Sobre mí',  target: 'about' },
  { name: 'CV',        target: 'cv' },
  { name: 'Proyectos', target: 'projects' },
  { name: 'Contacto',  target: 'contact' },
];

const Navbar = () => {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="nav-inner">

        {/* Logo */}
        <Link to="hero" smooth duration={500} className="nav-logo">
          <span className="nav-logo__bracket">&lt;</span>
          <span className="nav-logo__name">Edisson</span>
          <span className="nav-logo__dot gradient-text">.</span>
          <span className="nav-logo__suffix gradient-text">dev</span>
          <span className="nav-logo__bracket">/&gt;</span>
        </Link>

        {/* Desktop links — sin botón Admin */}
        <div className="nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.target}
              smooth spy
              activeClass="nav-link--active"
              offset={-80}
              duration={500}
              className="nav-link"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu — sin link Admin */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="nav-mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.target}
                smooth offset={-80} duration={500}
                className="nav-mobile__link"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
