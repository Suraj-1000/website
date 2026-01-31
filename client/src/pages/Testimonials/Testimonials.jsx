import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Mail, Phone, Building2, Briefcase } from 'lucide-react';
import api from '../../utils/api';

const Testimonials = () => {
    const [references, setReferences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReferences = async () => {
            try {
                const res = await api.get('/references');
                setReferences(res.data.data);
            } catch (error) {
                console.error('Failed to fetch references', error);
            } finally {
                setLoading(false);
            }
        };
        fetchReferences();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="container mx-auto px-6 py-20 min-h-screen flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">References</span></h2>
                <p className="text-muted-foreground text-xl">
                    People I've worked with who can vouch for my skills and dedication.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
                {references.length > 0 ? references.map((ref, index) => (
                    <motion.div
                        key={ref.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card/40 border border-border/50 rounded-2xl p-8 backdrop-blur-sm hover:bg-card/60 transition-colors group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Users size={64} />
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-foreground mb-1">{ref.name}</h3>
                            <div className="flex items-center gap-2 text-primary font-medium mb-4">
                                <Briefcase size={16} />
                                <span>{ref.position}</span>
                            </div>

                            <div className="bg-muted/30 rounded-xl p-4 mb-6 border border-border/50">
                                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                                    <Building2 size={16} />
                                    <span>{ref.company}</span>
                                </div>
                                <div className="text-sm font-medium text-foreground/80">
                                    Relation: {ref.relationship}
                                </div>
                            </div>

                            <div className="space-y-3">
                                {ref.email && (
                                    <a href={`mailto:${ref.email}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                                        <Mail size={16} />
                                        {ref.email}
                                    </a>
                                )}
                                {ref.phone && (
                                    <a href={`tel:${ref.phone}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                                        <Phone size={16} />
                                        {ref.phone}
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )) : (
                    <div className="col-span-full text-center text-muted-foreground py-10">
                        No references available at the moment.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Testimonials;
