import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Calendar, ChevronRight, X, ChevronLeft } from 'lucide-react';
import api, { API_URL as API_BASE } from '@/utils/api';
import { createPortal } from 'react-dom';

const Awards = () => {
    const [awards, setAwards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAward, setSelectedAward] = useState(null);
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const [lightboxImages, setLightboxImages] = useState([]);

    useEffect(() => {
        const fetchAwards = async () => {
            try {
                const res = await api.get('/awards');
                setAwards(res.data.data);
            } catch (error) {
                console.error('Failed to fetch awards', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAwards();
    }, []);

    const openLightbox = (images, index = 0) => {
        setLightboxImages(images);
        setLightboxIndex(index);
    };

    const closeLightbox = () => {
        setLightboxIndex(null);
        setLightboxImages([]);
    };

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
                    Honors & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Awards</span>
                </h1>
                <p className="text-xl text-muted-foreground">Recognition of my professional journey and achievements.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {awards.map((award, index) => (
                    <motion.div
                        key={award.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => setSelectedAward(award)}
                        className="group cursor-pointer bg-card/40 border border-border/50 rounded-3xl p-8 backdrop-blur-sm hover:bg-card/60 hover:border-primary/30 transition-all duration-300"
                    >
                        <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                            <Award size={24} />
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{award.title}</h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2">{award.issuer}</p>
                        <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar size={14} />
                                {new Date(award.date).getFullYear()}
                            </div>
                            <ChevronRight size={18} className="text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Award Modal */}
            <AnimatePresence>
                {selectedAward && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" onClick={() => setSelectedAward(null)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-card border border-border rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto scrollbar-hide shadow-2xl relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedAward(null)}
                                className="absolute top-4 right-4 p-2 bg-muted/80 backdrop-blur rounded-full hover:bg-destructive hover:text-white transition-colors z-20 shadow-sm"
                            >
                                <X size={20} />
                            </button>

                            <div className="p-8">
                                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2 pr-10">{selectedAward.title}</h2>
                                <p className="text-lg text-muted-foreground mb-1 font-medium">{selectedAward.issuer}</p>
                                <p className="text-sm text-muted-foreground mb-6">{new Date(selectedAward.date).toDateString()}</p>

                                {selectedAward.images && selectedAward.images.length > 0 && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        {selectedAward.images.map((img, idx) => (
                                            <div
                                                key={idx}
                                                className="rounded-xl overflow-hidden border border-border/50 h-48 cursor-zoom-in group relative"
                                                onClick={() => openLightbox(selectedAward.images.map(i => i.startsWith('http') ? i : `${API_BASE.replace('/api/v1', '')}${i}`), idx)}
                                            >
                                                <img
                                                    src={img.startsWith('http') ? img : `${API_BASE.replace('/api/v1', '')}${img}`}
                                                    alt={selectedAward.title}
                                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="prose prose-invert max-w-none text-foreground/90 leading-relaxed">
                                    <div dangerouslySetInnerHTML={{ __html: selectedAward.description }} />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Lightbox */}
            {createPortal(
                <AnimatePresence>
                    {lightboxIndex !== null && (
                        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 p-4" onClick={closeLightbox}>
                            <button onClick={closeLightbox} className="absolute top-4 right-4 text-white hover:text-primary"><X size={32} /></button>
                            <motion.img
                                key={lightboxIndex}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                src={lightboxImages[lightboxIndex]}
                                className="max-w-full max-h-full object-contain rounded-lg"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
};

export default Awards;
