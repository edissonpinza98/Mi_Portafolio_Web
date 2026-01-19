import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

const Preloader = ({ onLoadingComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onLoadingComplete, 1200);
                    return 100;
                }
                const increment = Math.random() * 4 + 1.5;
                return Math.min(prev + increment, 100);
            });
        }, 80);

        return () => clearInterval(timer);
    }, [onLoadingComplete]);

    return (
        <motion.div
            className="ethereal-preloader"
            exit={{
                opacity: 0,
                y: -50,
                filter: "blur(30px) brightness(1.5)",
                transition: { duration: 1, ease: [0.19, 1, 0.22, 1] }
            }}
        >
            {/* Dynamic Glassmorphism Background */}
            <div className="aurora-mesh">
                <div className="mesh-ball m1"></div>
                <div className="mesh-ball m2"></div>
                <div className="mesh-ball m3"></div>
                <div className="mesh-ball m4"></div>
                <div className="noise-texture"></div>
            </div>

            <div className="main-content-wrapper">
                {/* Central Kinetic Sculpture */}
                <div className="sculpture-container">
                    {/* Floating Glass Panels */}
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className={`glass-panel p-${i + 1}`}
                            animate={{
                                rotateY: [0, 360],
                                rotateX: [i * 30, i * 60, i * 30],
                                y: [-10, 10, -10]
                            }}
                            transition={{
                                duration: 10 + i * 2,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    ))}

                    {/* Highly Visible Progress Circle */}
                    <svg className="progress-ring" viewBox="0 0 100 100">
                        <circle className="ring-track" cx="50" cy="50" r="46" />
                        <motion.circle
                            className="ring-fill"
                            cx="50" cy="50" r="46"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: progress / 100 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                        />
                    </svg>

                    {/* Percentage Heartbeat */}
                    <div className="percentage-box">
                        <motion.div
                            className="progress-text"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            <span className="num">{Math.round(progress)}</span>
                            <span className="suffix">%</span>
                        </motion.div>
                    </div>
                </div>

                {/* Status Interface */}
                <div className="status-interface">
                    <div className="loader-title">
                        <div className="pulse-dot"></div>
                        <span className="shimmer-text">INITIALIZING_CORE_SYSTEM</span>
                    </div>

                    {/* Horizontal Progress bar as backup visibility */}
                    <div className="h-progress-bar">
                        <motion.div
                            className="h-progress-fill"
                            animate={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="loading-sub">
                        <span>ESTABLISHING_VIRTUAL_CONNECTION</span>
                        <span className="dots">
                            {[0, 1, 2].map(i => (
                                <motion.span
                                    key={i}
                                    animate={{ opacity: [0.2, 1, 0.2] }}
                                    transition={{ duration: 0.6, delay: i * 0.2, repeat: Infinity }}
                                >.</motion.span>
                            ))}
                        </span>
                    </div>
                </div>
            </div>

            {/* Tech Corner Accents */}
            <div className="tech-corner top-left"></div>
            <div className="tech-corner bottom-right"></div>
        </motion.div>
    );
};

export default Preloader;
