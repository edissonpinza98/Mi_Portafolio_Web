import React from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import './About.css';

const TagCloud = ({ skills }) => {
    const containerRef = React.useRef(null);
    const [rotation, setRotation] = React.useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = React.useState(false);

    // Flatten skills with their categories for color coding
    const allSkills = React.useMemo(() => {
        return skills.flatMap(cat =>
            cat.skills.map(skill => ({
                name: skill,
                category: cat.title,
                color: cat.title === "Frontend" ? "#00f2ff" :
                    cat.title === "Backend" ? "#00ff88" :
                        cat.title === "Diseño" ? "#ff0088" : "#ffff00"
            }))
        );
    }, [skills]);

    const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

    React.useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
            const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
            setMousePos({ x, y });
        };

        // Add event listener to window or container
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    React.useEffect(() => {
        let animationFrame;
        const animate = () => {
            setRotation(prev => ({
                // Continuous rotation + mouse influence
                // Base speed 0.003, mouse adds up to +/- 0.01
                x: prev.x + 0.002 - (mousePos.y * 0.005),
                y: prev.y + 0.002 + (mousePos.x * 0.005)
            }));
            animationFrame = requestAnimationFrame(animate);
        };
        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [mousePos]);

    // Calculate positions on a sphere
    const points = React.useMemo(() => {
        const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
        return allSkills.map((skill, i) => {
            const y = 1 - (i / (allSkills.length - 1)) * 2;
            const radius = Math.sqrt(1 - y * y);
            const theta = phi * i;

            return {
                ...skill,
                x: Math.cos(theta) * radius,
                y: y,
                z: Math.sin(theta) * radius
            };
        });
    }, [allSkills]);

    return (
        <div
            className="tag-cloud-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            ref={containerRef}
            style={{ minHeight: '300px' }}
        >
            <div className="tag-cloud-sphere">
                {points.map((point, i) => {
                    // Rotate point
                    const cosX = Math.cos(rotation.x);
                    const sinX = Math.sin(rotation.x);
                    const cosY = Math.cos(rotation.y);
                    const sinY = Math.sin(rotation.y);

                    // Rotation logic
                    let y = point.y * cosX - point.z * sinX;
                    let z = point.y * sinX + point.z * cosX;
                    let x = point.x * cosY - z * sinY;
                    z = point.x * sinY + z * cosY;

                    const scale = (z + 2) / 2.5; // Depth scale (increased base size)
                    const opacity = Math.max(0.2, (z + 1.5) / 2.5); // Better visibility for back items

                    return (
                        <span
                            key={i}
                            className="tag-item"
                            style={{
                                transform: `translate3d(${x * 160}px, ${y * 160}px, 0) scale(${scale})`, // Increased radius
                                opacity: opacity,
                                color: point.color,
                                zIndex: Math.floor(scale * 100)
                            }}
                        >
                            {point.name}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

const About = () => {
    const skillCategories = [
        {
            title: "Frontend",
            skills: ["React", "Angular", "Vue", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion"]
        },
        {
            title: "Backend",
            skills: ["Node.js", "Consumo de APIs REST"]
        },
        {
            title: "Diseño",
            skills: ["UI/UX Design"]
        },
        {
            title: "Control de versiones",
            skills: ["Git"]
        }
    ];

    return (
        <section id="about" className="section about-section">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="section-title"
                >
                    Sobre <span className="gradient-text">Mí</span>
                </motion.h2>

                <div className="about-grid">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="about-text"
                    >
                        <p>
                            Soy desarrollador web enfocado en crear soluciones funcionales y bien diseñadas. Me gusta
                            combinar lógica, rendimiento y diseño UI/UX para construir interfaces claras, intuitivas y
                            centradas en el usuario.
                        </p>
                        <p>
                            Trabajo principalmente con el ecosistema de JavaScript, utilizando React, Angular y Vue,
                            consumo APIs REST e integro inteligencia artificial en proyectos reales. Me enfoco en
                            escribir código limpio, escalable y fácil de mantener.
                        </p>
                        <p>
                            Siempre estoy aprendiendo y explorando nuevas tecnologías, especialmente en inteligencia
                            artificial y tendencias de diseño, porque el desarrollo web evoluciona constantemente.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="skills-wrapper"
                    >
                        <h3 className="skills-title flex items-center gap-2">
                            <Code2 className="text-cyan-400" /> Habilidades
                        </h3>
                        <TagCloud skills={skillCategories} />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
