import { Code, Database, Layout, Terminal, Bot, Settings, Globe, Users, Brain, Server, Cloud, Smartphone, PenTool, Cpu, Shield, GitBranch, Package, Monitor, Tablet, HardDrive, Wifi, Zap, BarChart, Layers, Command } from 'lucide-react';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

// Mapping string icon names to components
const IconMap = {
    Code, Database, Layout, Terminal, Bot, Settings, Globe, Users, Brain,
    Server, Cloud, Smartphone, PenTool, Cpu, Shield, GitBranch, Package,
    Monitor, Tablet, HardDrive, Wifi, Zap, BarChart, Layers, Command
};

const Skills = () => {
    const [skillCategories, setSkillCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/skills');
                setSkillCategories(res.data.data);
            } catch (error) {
                console.error('Failed to fetch skills', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSkills();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="container mx-auto px-6 py-20 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-6xl font-bold mb-6">Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Arsenal</span></h2>
                <p className="text-xl text-muted-foreground">My expertise across the full stack.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {skillCategories.map((category, index) => {
                    const IconComponent = IconMap[category.icon] || Code;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-card/40 border border-border/50 p-8 rounded-2xl backdrop-blur-sm hover:bg-card/60 transition-colors group"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-muted/50 rounded-xl group-hover:bg-primary/20 transition-colors">
                                    <IconComponent className="text-primary" size={24} />
                                </div>
                                <h3 className="text-2xl font-bold text-foreground">{category.category}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {category.items.map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 bg-muted/50 border border-border/50 rounded-full text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default Skills;
