import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, AlertTriangle, RefreshCw } from 'lucide-react';
import './NotFound.css';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="notfound-section">
            <div className="hyper-grid"></div>

            <motion.div
                className="notfound-container"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="error-code">
                    <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
                    >4</motion.span>
                    <span>0</span>
                    <motion.span
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.1, repeat: Infinity }}
                    >4</motion.span>
                </div>

                <div className="error-header">
                    <AlertTriangle className="error-icon" size={32} />
                    <h2>CONNECTION_LOST</h2>
                </div>

                <p className="error-msg">
                    El recurso solicitado no se encuentra en el servidor. <br />
                    Es posible que el enlace esté roto o la página haya sido movida a otra dimensión.
                </p>

                <div className="error-details">
                    <div className="detail-row">
                        <span className="label">STATUS:</span>
                        <span className="value text-red">NOT_FOUND</span>
                    </div>
                    <div className="detail-row">
                        <span className="label">PROTOCOL:</span>
                        <span className="value">TCP/SECURE_FAIL</span>
                    </div>
                    <div className="detail-row">
                        <span className="label">LOCATION:</span>
                        <span className="value">UNKNOWN_COORDINATES</span>
                    </div>
                </div>

                <div className="notfound-actions">
                    <button onClick={() => navigate('/')} className="btn-primary">
                        <Home size={20} />
                        Volver al Inicio
                    </button>
                    <button onClick={() => window.location.reload()} className="btn-outline">
                        <RefreshCw size={20} />
                        Reintentar Enlace
                    </button>
                </div>
            </motion.div>

            <div className="scanning-line"></div>
        </div>
    );
};

export default NotFound;
