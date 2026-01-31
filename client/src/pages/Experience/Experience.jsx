import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

import { useState, useEffect } from 'react';
import api from '../../utils/api';

const Experience = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                // Ideally use environment variable for URL
                const res = await api.get('/experiences');
                setExperiences(res.data.data);
            } catch (error) {
                console.error('Failed to fetch experiences', error);
            } finally {
                setLoading(false);
            }
        };

        fetchExperiences();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="container mx-auto px-6 py-20 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-6xl font-bold mb-6">Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Journey</span></h2>
                <p className="text-xl text-muted-foreground">My hands-on experience in the industry.</p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-12">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.15 }}
                        className="relative pl-8 md:pl-0"
                    >
                        {/* Timeline Line (Desktop) */}
                        <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent -translate-x-1/2" />

                        <div className={`md:flex items-center justify-between gap-12 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                            {/* Date Bubble (Desktop) */}
                            <div className={`hidden md:flex flex-1 ${index % 2 === 0 ? 'justify-start' : 'justify-end'} relative z-10`}>
                                <div className="bg-card/80 backdrop-blur-md border border-primary/20 px-6 py-2 rounded-full text-foreground font-semibold shadow-[0_0_15px_rgba(124,58,237,0.1)]">
                                    {exp.period}
                                </div>
                            </div>

                            {/* Center Dot (Desktop) */}
                            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background z-20 shadow-lg shadow-primary/40" />

                            {/* Content Card */}
                            <div className="flex-1 group">
                                <div className="bg-card/30 border border-white/5 p-8 rounded-3xl backdrop-blur-md hover:bg-card/50 transition-all duration-500 hover:border-primary/30 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] group-hover:-translate-y-2 relative overflow-hidden">
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors relative z-10">{exp.role}</h3>
                                    <h4 className="text-lg text-muted-foreground mb-6 flex items-center gap-2 relative z-10">
                                        <Briefcase size={16} className="text-secondary" /> {exp.company}
                                    </h4>

                                    <div className="md:hidden inline-block mb-6 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                                        {exp.period}
                                    </div>

                                    <ul className="space-y-3 relative z-10">
                                        {exp.description.map((point, idx) => (
                                            <li key={idx} className="text-muted-foreground/80 leading-relaxed flex items-start gap-2 text-sm md:text-base">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-secondary flex-shrink-0" />
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Experience;
