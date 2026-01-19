import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, AlertTriangle, RefreshCw } from 'lucide-react';
import './NotFound.css';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="notfound-section">
            <div className="hyper-grid-v2"></div>
            <div className="binary-bg"></div>

            {/* Holographic Rings */}
            <div className="hologram-rings">
                <div className="ring"></div>
                <div className="ring"></div>
                <div className="ring"></div>
            </div>

            <motion.div
                className="notfound-container-v2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="glitch-wrapper">
                    <h1 className="error-code-v2" data-text="404">404</h1>
                </div>

                <div className="status-bar">
                    <div className="status-dot pulse-red"></div>
                    <span className="status-text">CRITICAL_SYSTEM_FAILURE</span>
                </div>

                <div className="terminal-box">
                    <div className="terminal-header">
                        <div className="dots"><span></span><span></span><span></span></div>
                        <span className="terminal-title">system_log.sh</span>
                    </div>
                    <div className="terminal-body">
                        <div className="log-line"><span className="log-time">[0.002]</span> Initializing secure_tunnel...</div>
                        <div className="log-line"><span className="log-time">[0.456]</span> Requesting resource from <span className="text-cyan">server_primary</span></div>
                        <div className="log-line error"><span className="log-time">[1.092]</span> [ERROR] 404_PAGE_NOT_FOUND</div>
                        <div className="log-line warning"><span className="log-time">[1.093]</span> Redirecting to fallback_node...</div>
                        <div className="log-line"><span className="log-line-cursor">_</span></div>
                    </div>
                </div>

                <p className="error-description">
                    La página que buscas ha sido desmaterializada o nunca existió en este cuadrante del ciberespacio.
                </p>

                <div className="notfound-actions-v2">
                    <motion.button
                        onClick={() => navigate('/')}
                        className="tech-btn primary"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Home size={18} />
                        <span>RETORNAR_AL_NEXO</span>
                    </motion.button>
                    <motion.button
                        onClick={() => window.location.reload()}
                        className="tech-btn outline"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <RefreshCw size={18} />
                        <span>RECONECTAR</span>
                    </motion.button>
                </div>
            </motion.div>

            <div className="laser-scanner"></div>
            <div className="corner-decor top-left"></div>
            <div className="corner-decor bottom-right"></div>
        </div>
    );
};

export default NotFound;
