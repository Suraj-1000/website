import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Languages as LangIcon, Globe, CheckCircle2 } from 'lucide-react';
import api from '@/utils/api';

const Languages = () => {
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const res = await api.get('/languages');
                setLanguages(res.data.data);
            } catch (error) {
                console.error('Failed to fetch languages', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLanguages();
    }, []);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
    );

    return (
        <div className="container mx-auto px-6 pb-24 pt-12 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Language</span> Proficiency
                </h1>
                <p className="text-xl text-muted-foreground">My linguistic skills and cultural adaptability.</p>
            </motion.div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {languages.map((lang, index) => (
                    <motion.div
                        key={lang.id}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-card/40 border border-border/50 rounded-3xl p-8 backdrop-blur-sm flex items-center gap-6 group hover:bg-card/60 transition-colors"
                    >
                        <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:rotate-12 transition-transform">
                            <Globe size={32} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-1 flex items-center gap-2">
                                {lang.name}
                                <CheckCircle2 size={18} className="text-primary" />
                            </h3>
                            <p className="text-primary font-medium tracking-wide uppercase text-xs">{lang.proficiency}</p>
                            
                            <div className="mt-4 w-full h-2 bg-secondary rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: lang.proficiency.toLowerCase().includes('native') ? '100%' : lang.proficiency.toLowerCase().includes('fluent') ? '90%' : '75%' }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="h-full bg-gradient-to-r from-primary to-secondary"
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="mt-24 text-center p-12 bg-primary/5 rounded-[3rem] border border-primary/10 max-w-2xl mx-auto"
            >
                <LangIcon className="mx-auto text-primary mb-6" size={48} />
                <h2 className="text-2xl font-bold mb-4">Multilingual Communication</h2>
                <p className="text-muted-foreground">
                    Effective communication is the key to successful collaboration. Being multilingual allows me to connect with people across borders and contribute to global teams.
                </p>
            </motion.div>
        </div>
    );
};

export default Languages;
