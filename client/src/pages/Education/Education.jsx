import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, School, Link as LinkIcon, MapPin, Calendar } from 'lucide-react';

import { useState, useEffect } from 'react';
import api from '../../utils/api';

const Education = () => {
    const [educationData, setEducationData] = useState([]);
    const [loading, setLoading] = useState(true);

    const learningResources = [
        { name: "Programiz", url: "https://www.programiz.com/html" },
        { name: "Codecademy", url: "https://www.codecademy.com/" },
        { name: "W3Schools", url: "https://www.w3schools.com/" },
        { name: "Coding Karunadu (YouTube)", url: "https://youtu.be/7UIBIaEZVWw" },
    ];

    useEffect(() => {
        const fetchEducation = async () => {
            try {
                const res = await api.get('/education');
                setEducationData(res.data);
            } catch (error) {
                console.error('Failed to fetch education', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEducation();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="container mx-auto px-6 py-20 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-6xl font-bold mb-6">Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Journey</span></h2>
                <p className="text-xl text-muted-foreground">My educational background and the resources that help me learn.</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                {/* Timeline Section */}
                <div className="lg:col-span-2 space-y-8">
                    {educationData.map((item, index) => {
                        const IconComponent = item.icon === 'GraduationCap' ? GraduationCap : item.icon === 'School' ? School : BookOpen;
                        return (
                            <motion.div
                                key={item.id || index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.2 }}
                                className="relative pl-8 border-l-2 border-border/20 hover:border-primary transition-colors group"
                            >
                                <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-background border-2 border-primary group-hover:bg-primary transition-colors ring-4 ring-transparent group-hover:ring-primary/20" />

                                <motion.div
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    className="bg-card/40 border border-border/50 p-6 rounded-2xl backdrop-blur-sm shadow-lg hover:shadow-primary/10 hover:bg-card/60 transition-all"
                                >
                                    <div className={`inline-flex p-3 rounded-lg bg-muted/50 mb-4 ${item.color}`}>
                                        <IconComponent size={24} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-1 text-foreground">{item.degree}</h3>
                                    <h4 className="text-lg text-primary mb-2">{item.institution}</h4>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                        <MapPin size={14} /> {item.address}
                                    </div>
                                    <div className="flex flex-wrap gap-3 text-sm font-medium">
                                        <span className="bg-muted/50 text-foreground/90 px-3 py-1 rounded-md border border-border/50 flex items-center gap-2">
                                            <Calendar size={14} className="text-muted-foreground" /> {item.year}
                                        </span>
                                        {item.grade && (
                                            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full border border-primary/20">
                                                {item.grade}
                                            </span>
                                        )}
                                    </div>
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Resources Section */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-1"
                >
                    <div className="bg-gradient-to-br from-card/40 to-card/10 border border-border/50 rounded-3xl p-8 backdrop-blur-sm sticky top-24 transform hover:-translate-y-1 transition-transform duration-300">
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-foreground">
                            <LinkIcon size={24} className="text-secondary" /> Learning Hub
                        </h3>
                        <p className="text-muted-foreground mb-6 text-sm">
                            Curated platforms I use for continuous improvement:
                        </p>
                        <ul className="space-y-4">
                            {learningResources.map((res, idx) => (
                                <li key={idx}>
                                    <a
                                        href={res.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50 hover:bg-primary/20 hover:border-primary/50 hover:text-foreground transition-all group"
                                    >
                                        <span className="font-medium">{res.name}</span>
                                        <LinkIcon size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Education;
