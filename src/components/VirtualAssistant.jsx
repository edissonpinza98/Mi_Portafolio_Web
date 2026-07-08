import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot } from 'lucide-react';
import './VirtualAssistant.css';

const DannaAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "¡Hola! Soy Danna, la asistente virtual de Edisson. ¿En qué puedo ayudarte hoy?", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    const sendSound = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3'));

    const edissonData = useMemo(() => ({
        name: "Edisson Pinza Jojoa",
        wa: "+57 3025366119",
        waLink: "https://wa.link/y26h7a",
        mail: "edizonpinza@gmail.com",
        experience: "**2 años como Docente de Sistemas** y **1 año como Desarrollador de Software**",
        skills: "React, Angular, Vue, Python, Java, PHP y Kotlin",
        teaching: "Hacking Ético, Redes, Excel Empresarial y Ofimática"
    }), []);

    const intents = useMemo(() => [
        {
            id: 'contact',
            triggers: ['contacto', 'escribir', 'hablar', 'whatsapp', 'numero', 'celular', 'correo', 'email', 'telefono', 'ubicarlo', 'contratar', 'redes sociales', 'facebook', 'linkedin', 'donde vive', '¿Cómo contactarlo?'],
            response: `¡Claro! Aquí tienes el contacto directo de Edisson: \n\n📱 **WhatsApp:** [${edissonData.wa}](${edissonData.waLink}) \n✉️ **Email:** [${edissonData.mail}] \n\n¡Está listo para trabajar en nuevos proyectos!`
        },
        {
            id: 'teaching',
            triggers: ['docente', 'profesor', 'enseño', 'materias', 'clases', 'enseñar', 'academia', 'estudios', 'educacion', 'años', 'experiencia'],
            response: `Edisson tiene una sólida trayectoria de **${edissonData.experience}**. Ha dictado materias como: **Hacking Ético**, **Redes**, **Excel (Básico/Avanzado)** e **Instalación de Software**.`
        },
        {
            id: 'software',
            triggers: ['software', 'hacer', 'crear', 'apps', 'web', 'apk', 'proyectos', 'automatizacion', 'ia', 'android', 'paginas'],
            response: `Es experto en desarrollar **Aplicaciones Web**, **Apps Móviles (APKs)** y sistemas de **Sistematización de Datos**. Sus proyectos integran IA y arquitecturas modernas.`
        },
        {
            id: 'skills',
            triggers: ['habilidades', 'tecnologias', 'stack', 'que sabe', 'lenguajes', 'programacion', 'maneja', 'domina', 'frameworks'],
            response: `Domina el stack completo: **${edissonData.skills}**. Además, es experto en **Ciberseguridad** y **Sistematización de procesos**.`
        },
        {
            id: 'greeting',
            triggers: ['hola', 'buenos dias', 'buenas tardes', 'que tal', 'saludos', 'hi', 'hello', 'danna'],
            response: `¡Hola! Soy Danna, la asistente virtual de Edisson. ¿Te gustaría saber sobre su experiencia como docente o necesitas sus datos de contacto?`
        },
        {
            id: 'who',
            triggers: ['quien eres', 'quien es', 'edisson', 'perfil', 'biografia', 'nombre'],
            response: `Edisson Pinza es un **Desarrollador de Software** y **Ex-Docente de Sistemas**. Combina la pedagogía con el desarrollo técnico de alto nivel.`
        }
    ], [edissonData]);

    const playNotification = () => {
        if (sendSound.current) {
            sendSound.current.currentTime = 0;
            sendSound.current.play().catch(e => console.log("Audio play blocked", e));
        }
    };

    const processInput = (userInput) => {
        const cleanInput = userInput.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const contactIntent = intents.find(i => i.id === 'contact');

        if (contactIntent.triggers.some(t => cleanInput.includes(t.toLowerCase()))) {
            return contactIntent.response;
        }

        let matchedIntent = intents.find(intent =>
            intent.id !== 'contact' && intent.triggers.some(t => cleanInput.includes(t.toLowerCase()))
        );

        return matchedIntent ? matchedIntent.response :
            `Entiendo. Soy Danna, y puedo darte información real sobre Edisson: es **Desarrollador Full Stack** y tuvo **2 años de docencia** en sistemas. ¿Te paso su WhatsApp o prefieres saber de sus proyectos?`;
    };

    const handleSendMessage = (text) => {
        if (!text.trim()) return;
        playNotification();
        setMessages(prev => [...prev, { id: Date.now(), text, sender: 'user' }]);
        setInputValue('');
        setIsTyping(true);

        setTimeout(() => {
            const botResponse = processInput(text);
            playNotification();
            setMessages(prev => [...prev, { id: Date.now() + 1, text: botResponse, sender: 'bot' }]);
            setIsTyping(false);
        }, 1100);
    };

    const renderMessage = (content) => {
        const parts = content.split(/(\[.*?\]\(.*?\))/g);
        return parts.map((part, i) => {
            const match = part.match(/\[(.*?)\]\((.*?)\)/);
            if (match) {
                return <a key={i} href={match[2]} target="_blank" rel="noopener noreferrer" className="chat-link">{match[1]}</a>;
            }
            return part;
        });
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    return (
        <div className="danna-premium-wrapper">
            <motion.div
                className={`danna-hologram-toggle ${isOpen ? 'is-active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
            >
                <div className="danna-cloud-msg">Hola, soy Danna</div>
                <div className="holographic-robot">
                    {isOpen ? <X size={22} className="close-icon-glow" /> : (
                        <div className="robot-aura">
                            <Bot size={26} strokeWidth={1.5} className="main-bot-icon" />
                            <div className="aura-waves"></div>
                            <div className="aura-core"></div>
                        </div>
                    )}
                </div>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="danna-chat-card"
                        initial={{ opacity: 0, y: 40, scale: 0.95, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: 40, scale: 0.95, filter: 'blur(10px)' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    >
                        <div className="chat-header-v2">
                            <div className="header-branding">
                                <div className="ai-avatar-glow">
                                    <Bot size={18} />
                                    <div className="pulse-aura"></div>
                                </div>
                                <div className="ai-meta">
                                    <h4>Danna Assistant</h4>
                                    <div className="status-badge">
                                        <span className="dot"></span>
                                        <span>SYSTEM_ONLINE</span>
                                    </div>
                                </div>
                            </div>
                            <button className="chat-close-btn" onClick={() => setIsOpen(false)}>
                                <X size={18} />
                            </button>
                        </div>

                        <div className="chat-stream" ref={scrollRef}>
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    className={`stream-row ${msg.sender}`}
                                    initial={{ opacity: 0, x: msg.sender === 'bot' ? -10 : 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <div className="bubble-v2">{renderMessage(msg.text)}</div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className="stream-row bot">
                                    <div className="bubble-v2 typing-v2">
                                        <div className="dot-bounce"></div>
                                        <div className="dot-bounce"></div>
                                        <div className="dot-bounce"></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="chat-input-area">
                            <div className="input-wrapper-v2">
                                <input
                                    type="text"
                                    placeholder="Consultar con la IA..."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                                />
                                <button className="send-action" onClick={() => handleSendMessage(inputValue)}>
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="intel-chips">
                            <button onClick={() => handleSendMessage("¿Quién es Edisson?")}>Sobre Él</button>
                            <button onClick={() => handleSendMessage("¿Qué tecnologías domina?")}>Tecnologías</button>
                            <button onClick={() => handleSendMessage("¿contacto?")}>Contacto</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DannaAssistant;

