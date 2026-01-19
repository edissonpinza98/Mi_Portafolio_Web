import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

const Preloader = ({ onLoadingComplete }) => {
    const [progress, setProgress] = useState(0);
    const [statusIndex, setStatusIndex] = useState(0);
    const [isSystemActive, setIsSystemActive] = useState(false);

    const statuses = [
        "LINK_START",
        "SYNCING_NEURAL_INTERFACE",
        "LOADING_BIOMETRIC_DATA",
        "PURIFYING_CORE_FRAGMENTS",
        "PROTOCOL_OVERRIDE_ENABLED",
        "IDENTITY_LOADED"
    ];

    useEffect(() => {
        setIsSystemActive(true);
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onLoadingComplete, 1200);
                    return 100;
                }
                const increment = Math.random() < 0.3 ? 0.5 : Math.random() * 8;
                return Math.min(prev + increment, 100);
            });
        }, 120);

        const statusTimer = setInterval(() => {
            setStatusIndex(p => (p < statuses.length - 1 ? p + 1 : p));
        }, 700);

        return () => {
            clearInterval(timer);
            clearInterval(statusTimer);
        };
    }, [onLoadingComplete]);

    return (
        <motion.div
            className="futuristic-preloader"
            exit={{
                opacity: 0,
                scale: 2,
                filter: "blur(20px)",
                transition: { duration: 1, ease: [0.7, 0, 0.3, 1] }
            }}
        >
            {/* Background Grid & Particles */}
            <div className="hyper-grid"></div>
            <div className="energy-particles">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="particle"
                        initial={{
                            x: Math.random() * window.innerWidth - window.innerWidth / 2,
                            y: Math.random() * window.innerHeight - window.innerHeight / 2,
                            opacity: 0
                        }}
                        animate={{
                            opacity: [0, 0.5, 0],
                            scale: [0, 1, 0.5]
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                    />
                ))}
            </div>

            <div className="core-focus">
                {/* Visualizer Structure */}
                <div className="hologram-circles">
                    <div className="ring r1"></div>
                    <div className="ring r2"></div>
                    <div className="ring r3"></div>

                    {/* The "Neural" Hexagon */}
                    <div className="hexagon-wrapper">
                        <svg className="hexagon-svg" viewBox="0 0 100 100">
                            <motion.path
                                d="M50 5 L90 27 L90 72 L50 95 L10 72 L10 27 Z"
                                fill="none"
                                stroke="url(#hexGradient)"
                                strokeWidth="0.5"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <defs>
                                <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#00f2ff" />
                                    <stop offset="100%" stopColor="#7c3aed" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    <div className="loading-core">
                        <motion.div
                            className="core-glow"
                            animate={{
                                opacity: [0.3, 0.8, 0.3],
                                scale: [0.8, 1.2, 0.8]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <div className="progress-number">
                            <span className="count">{Math.round(progress)}</span>
                            <span className="percent">%</span>
                        </div>
                    </div>
                </div>

                <div className="tech-info">
                    <div className="status-code">0x-SYSTEM_STABLE</div>
                    <motion.div
                        key={statusIndex}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="status-label"
                    >
                        {statuses[statusIndex]}
                    </motion.div>
                    <div className="access-bar">
                        <motion.div
                            className="fill"
                            animate={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="bit-stream">
                        {Math.random().toString(16).substr(2, 24).toUpperCase()}
                    </div>
                </div>
            </div>

            <div className="frame-border">
                <div className="corner tl"></div>
                <div className="corner tr"></div>
                <div className="corner bl"></div>
                <div className="corner br"></div>
            </div>

            <div className="scanning-line"></div>
        </motion.div>
    );
};

export default Preloader;
