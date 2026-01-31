import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Camera, X, Plane, Loader2 } from 'lucide-react';
import api, { API_URL as API_BASE } from '../../utils/api';

const Travel = () => {
    const [selectedId, setSelectedId] = useState(null);
    const [travels, setTravels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTravels = async () => {
            try {
                const res = await api.get('/travel');
                setTravels(res.data.data || []);
            } catch (error) {
                console.error('Failed to fetch travels:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTravels();
    }, []);

    const allPhotos = travels.flatMap(t =>
        (t.images || []).map((img, idx) => ({
            id: `${t.id}-${idx}`,
            travelId: t.id,
            title: t.title,
            location: t.location,
            desc: t.description,
            url: img.startsWith('http') ? img : `${API_BASE.replace('/api', '')}${img}`,
            // Simple logic for varying sizes
            size: idx % 3 === 0 ? "large" : idx % 2 === 0 ? "medium" : "small"
        }))
    );

    const uniqueLocations = [...new Set(travels.map(t => t.location))];

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <p className="text-muted-foreground animate-pulse font-medium">Loading adventures...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-20 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6 border border-primary/20">
                    <Plane size={16} /> WANDERLUST
                </div>
                <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
                    My <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary animate-gradient-x">Travels</span>
                </h2>
                <div className="max-w-3xl mx-auto text-muted-foreground text-lg leading-relaxed space-y-4">
                    <p>
                        Travel is more than just visiting new places; it's about the stories we gather and the memories we create.
                        Each journey has shaped my perspective in its own unique way.
                    </p>
                    {uniqueLocations.length > 0 && (
                        <p className="text-base">
                            So far, I have explored incredible destinations like
                            <span className="text-foreground font-semibold"> {uniqueLocations.join(", ")}</span>.
                        </p>
                    )}
                </div>
            </motion.div>

            {/* Masonry Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
                {allPhotos.map((photo, index) => (
                    <motion.div
                        key={photo.id}
                        layoutId={`card-${photo.id}`}
                        onClick={() => setSelectedId(photo.id)}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className={`relative group rounded-[2rem] overflow-hidden bg-card/60 border border-border/50 cursor-pointer shadow-lg hover:shadow-primary/5 transition-all duration-500 ${photo.size === "large" ? "md:col-span-2 md:row-span-2" :
                            photo.size === "medium" ? "md:row-span-1" : ""
                            }`}
                    >
                        {/* Image Layer */}
                        <motion.div
                            className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-1000 ease-out"
                            style={{ backgroundImage: `url(${photo.url})` }}
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                        {/* Content */}
                        <div className="absolute inset-0 flex flex-col justify-end p-8">
                            <h3 className="text-xl md:text-2xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{photo.title}</h3>
                            <div className="flex items-center gap-2 text-white/80 text-sm mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                                <MapPin size={14} className="text-primary" /> {photo.location}
                            </div>
                        </div>

                        {/* Camera Icon */}
                        <div className="absolute top-6 right-6 p-3 bg-white/10 backdrop-blur-md rounded-2xl text-white/50 group-hover:text-white transition-all opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 duration-500">
                            <Camera size={20} />
                        </div>
                    </motion.div>
                ))}
            </div>

            {travels.length === 0 && !loading && (
                <div className="text-center py-24 bg-card/20 rounded-[3rem] border border-dashed border-border/50">
                    <p className="text-xl text-muted-foreground font-medium">New adventures coming soon! 🌍</p>
                </div>
            )}

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedId(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-10 backdrop-blur-xl"
                    >
                        {allPhotos.map(photo => photo.id === selectedId && (
                            <motion.div
                                key={photo.id}
                                layoutId={`card-${photo.id}`}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-card w-full max-w-5xl rounded-[2.5rem] overflow-hidden relative border border-white/10 shadow-3xl"
                            >
                                <button
                                    onClick={() => setSelectedId(null)}
                                    className="absolute top-6 right-6 z-20 p-3 bg-black/50 hover:bg-primary rounded-2xl text-white transition-all duration-300"
                                >
                                    <X size={24} />
                                </button>

                                <div className="grid md:grid-cols-5 h-full min-h-[500px]">
                                    <div className="md:col-span-3 h-[300px] md:h-auto bg-cover bg-center" style={{ backgroundImage: `url(${photo.url})` }} />
                                    <div className="md:col-span-2 p-8 md:p-12 flex flex-col justify-center bg-card/50">
                                        <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase mb-4">
                                            <MapPin size={16} /> {photo.location}
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6 leading-tight">{photo.title}</h2>
                                        <div className="w-12 h-1 bg-primary/20 rounded-full mb-8" />
                                        <p className="text-muted-foreground text-lg leading-relaxed mb-10 overflow-y-auto max-h-[200px] custom-scrollbar pr-2">
                                            {photo.desc}
                                        </p>
                                        <div className="mt-auto pt-8 border-t border-border/50 flex justify-between items-center text-muted-foreground">
                                            <span className="text-sm font-medium">Memorable Moment</span>
                                            <span className="text-xs font-bold bg-muted px-4 py-2 rounded-full uppercase tracking-tighter">Experience</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Stats / Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24">
                {[
                    { val: `${uniqueLocations.length}`, label: 'Cities Visited' },
                    { val: `${travels.length}`, label: 'Journeys' },
                    { val: `${allPhotos.length}`, label: 'Captures' },
                    { val: '1', label: 'Passion' }
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-card/40 backdrop-blur-sm rounded-3xl p-8 text-center border border-border/50 hover:border-primary/30 hover:bg-card/60 transition-all duration-300 group"
                    >
                        <span className="font-black text-primary block text-4xl mb-2 group-hover:scale-110 transition-transform">{item.val}</span>
                        <span className="text-xs text-muted-foreground font-bold uppercase tracking-[0.2em]">{item.label}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Travel;
