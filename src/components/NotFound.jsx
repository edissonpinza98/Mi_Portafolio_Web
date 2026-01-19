import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, RefreshCw } from 'lucide-react';

import './NotFound.css';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="notfound-section-premium">
            {/* Ambient Background Elements */}
            <div className="ambient-background">
                <div className="glow-sphere"></div>
                <div className="grid-overlay"></div>
                <div className="noise-floor"></div>
            </div>

            <div className="content-wrapper-full">
                <motion.div
                    className="error-visual"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    <h1 className="main-error-code">404</h1>
                    <div className="error-divider"></div>
                    <h2 className="error-subtitle">PÁGINA NO ENCONTRADA</h2>
                </motion.div>

                <motion.div
                    className="error-info-modern"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    <p className="description-text">
                        Parece que el enlace que seguiste está roto o la página ha sido movida.
                        No te preocupes, el sistema está estable.
                    </p>

                    <div className="action-group-modern">
                        <motion.button
                            onClick={() => navigate('/')}
                            className="premium-btn primary-gold"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Home size={18} />
                            <span>VOLVER AL INICIO</span>
                        </motion.button>

                        <motion.button
                            onClick={() => navigate(-1)}
                            className="premium-btn ghost-white"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <ArrowLeft size={18} />
                            <span>REGRESAR</span>
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Subtle Footer info */}
            <div className="notfound-footer">
                <span className="status-code">HTTP_STATUS: 404_NOT_FOUND</span>
                <span className="location-info">COORDINATES: UNKNOWN_SECTOR</span>
            </div>

            {/* Decorative Scanner Line */}
            <div className="vertical-scanner"></div>
        </div>
    );
};


export default NotFound;
