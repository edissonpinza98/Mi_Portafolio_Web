/* ════════════════════════════════════════════════════════
   AUDIO ENGINE — SOFT & FRIENDLY LUXURY UI CLICK
   Sonido suave, cálido, profesional y amigable estilo
   tap táctil de alta gama (Apple / Linear UI) con latencia cero.
════════════════════════════════════════════════════════ */

let audioCtx = null;

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

/**
 * Sonido de clic suave, cálido, profesional y amigable.
 * Tono redondo tipo tap acústico sutil / gota de cristal suave.
 * Sin frecuencias chirriantes, sin agresividad y con respuesta instantánea.
 */
export const playSoftClick = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // Ganancia maestra con envolvente suave y volumen calibrado (discreto y elegante)
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, now);
    // Ataque suave de 4ms para eliminar cualquier golpe seco o chasquido
    masterGain.gain.exponentialRampToValueAtTime(0.075, now + 0.004);
    // Caída redonda y corta (58ms)
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.058);
    masterGain.connect(ctx.destination);

    // Filtro pasa-bajos cálido para suavizar bordes y dar tono agradable
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(950, now);
    filter.Q.setValueAtTime(1.1, now);
    filter.connect(masterGain);

    // Tono principal: frecuencia cálida media (520Hz bajando suavemente a 410Hz)
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(410, now + 0.05);

    // Armónico sutil muy suave para dar calidez orgánica (estilo tap de madera suave/cristal fino)
    const oscHarmonic = ctx.createOscillator();
    const harmonicGain = ctx.createGain();
    oscHarmonic.type = 'sine';
    oscHarmonic.frequency.setValueAtTime(780, now);
    oscHarmonic.frequency.exponentialRampToValueAtTime(615, now + 0.035);

    harmonicGain.gain.setValueAtTime(0.02, now);
    harmonicGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

    osc.connect(filter);
    oscHarmonic.connect(harmonicGain);
    harmonicGain.connect(filter);

    osc.start(now);
    oscHarmonic.start(now);

    osc.stop(now + 0.065);
    oscHarmonic.stop(now + 0.065);
  } catch (err) {
    // Silencioso ante cualquier bloqueo de audio
  }
};

// Alias por compatibilidad
export const playHaloClick = playSoftClick;

/**
 * Inicializa la escucha global de clics para todos los botones y enlaces.
 * Activación inmediata mediante la fase de captura del navegador.
 */
export const initGlobalSound = () => {
  if (typeof window === 'undefined') return () => {};

  const handleClick = (e) => {
    const target = e.target.closest(
      'button, a, input[type="submit"], input[type="button"], [role="button"], .nav-link, .nav-logo, .cv-btn, .cv-reload-btn, .carnet, .project-card, .social-card, .allprojects-tab, .modal-icon-btn, .modal-back-btn'
    );
    if (target) {
      playSoftClick();
    }
  };

  window.addEventListener('click', handleClick, { capture: true, passive: true });

  return () => {
    window.removeEventListener('click', handleClick, { capture: true });
  };
};
