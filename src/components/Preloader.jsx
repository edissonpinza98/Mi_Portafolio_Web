import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Preloader.css';

const Preloader = ({ onLoadingComplete }) => {
    const [progress, setProgress] = useState(0);
    const [statusIndex, setStatusIndex] = useState(0);
    const [isSystemActive, setIsSystemActive] = useState(false);

    const statuses = [
        "BOOTING_CORE",
        "SYNCING_ASSETS",
        "OPTIMIZING",
        "READY"
    ];

    useEffect(() => {
        setIsSystemActive(true);
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onLoadingComplete, 400); // Much faster exit
                    return 100;
                }
                // Faster and more consistent progress
                const increment = Math.random() * 25 + 5;
                return Math.min(prev + increment, 100);
            });
        }, 50); // Faster interval

        const statusTimer = setInterval(() => {
            setStatusIndex(p => (p < statuses.length - 1 ? p + 1 : p));
        }, 300); // Statuses sync with speed



        return () => {
            clearInterval(timer);
            clearInterval(statusTimer);
        };
    }, [onLoadingComplete]);

    return (
        <motion.div
            className="prism-preloader"
            exit={{
                opacity: 0,
                scale: 1.1,
                filter: "blur(20px)",
                transition: { duration: 0.8, ease: "circIn" }
            }}
        >
            {/* Ambient Background */}
            <div className="prism-bg">
                <div className="bg-glow"></div>
                <div className="star-particles"></div>
            </div>

            <div className="prism-main-content">
                <div className="geometric-stage">
                    {/* The Prism Wireframe */}
                    <div className="prism-container">
                        <div className="prism-wire">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className={`wire w${i + 1}`}></div>
                            ))}
                        </div>
                        <motion.div
                            className="prism-core"
                            animate={{
                                opacity: [0.3, 0.7, 0.3],
                                scale: [0.9, 1.1, 0.9]
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                </div>

                <div className="prism-info-panel">
                    <div className="percentage-box">
                        <span className="p-number">{Math.round(progress)}</span>
                        <span className="p-percent">%</span>
                    </div>

                    <div className="modern-status-bar">
                        <div className="status-indicator"></div>
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={statusIndex}
                                className="status-label-new"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                            >
                                {statuses[statusIndex]}
                            </motion.span>
                        </AnimatePresence>
                    </div>

                    <div className="loading-line-wrapper">
                        <div className="loading-line-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            </div>

            {/* Decorative Corner Details */}
            <div className="ui-decor top-left"></div>
            <div className="ui-decor bottom-right"></div>
        </motion.div>


    );
};

export default Preloader;
