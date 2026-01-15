import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import CVSection from './components/CVSection';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  // Custom cursor effect logic could go here

  return (
    <div className="App">
      <Navbar />
      <main>
        <Hero />
        <About />
        <CVSection />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
