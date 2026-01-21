import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Camera, X, ChevronRight, ChevronLeft } from 'lucide-react';

const Travel = () => {
    const [selectedId, setSelectedId] = useState(null);

    const places = [
        "Pokhara", "Chitwan", "Lumbini", "Nagarkot",
        "Sirubari", "Bandipur", "Ghandruk", "Kathmandu",
        "Mustang", "Rara Lake", "Janakpur", "Illam",
        "Bardia", "Kalinchowk"
    ];

    const photos = [
        {
            id: 1,
            title: "Ktm Durbar Square",
            location: "Kathmandu",
            desc: "The historical heart of the city.",
            size: "large",
            url: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=1000&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "Phewa Lake",
            location: "Pokhara",
            desc: "Serenity reflected in water.",
            size: "medium",
            url: "https://images.unsplash.com/photo-1540206395-688085723adb?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "Himalayan Views",
            location: "Ghandruk",
            desc: "Waking up to the mountains.",
            size: "medium",
            url: "https://images.unsplash.com/photo-1589139981881-8b2c4e2c0792?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 4,
            title: "Swayambhunath",
            location: "Kathmandu",
            desc: "Peace atop the hill.",
            size: "small",
            url: "https://images.unsplash.com/photo-1582650630656-b63d0851eb72?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 5,
            title: "Chitwan Jungle",
            location: "Chitwan",
            desc: "Into the wild.",
            size: "medium",
            url: "https://images.unsplash.com/photo-1577791461965-02ec28236528?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 6,
            title: "Birthplace of Buddha",
            location: "Lumbini",
            desc: "Where peace began.",
            size: "small",
            url: "https://images.unsplash.com/photo-1629202685933-28c0db17406a?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: 7,
            title: "Mustang Valley",
            location: "Mustang",
            desc: "The forbidden kingdom.",
            size: "large",
            url: "https://images.unsplash.com/photo-1527838832700-50592524d78b?q=80&w=1000&auto=format&fit=crop"
        },
        {
            id: 8,
            title: "Rara Lake",
            location: "Mugu",
            desc: "Queen of lakes.",
            size: "medium",
            url: "https://images.unsplash.com/photo-1623566144883-93c66f9175d7?q=80&w=800&auto=format&fit=crop"
        }
    ];

    return (
        <div className="container mx-auto px-6 py-20 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-6xl font-bold mb-6">My <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Travels</span></h2>
                <div className="max-w-3xl mx-auto text-muted-foreground text-lg leading-relaxed space-y-4">
                    <p>
                        I have been traveling for almost <span className="text-white font-bold">6 years</span> now.
                        Whenever I get a chance, I love to explore new places and experience different cultures.
                    </p>
                    <p>
                        So far, I have been fortunate enough to visit amazing places across Nepal like
                        <span className="text-primary"> {places.join(", ")}</span>.
                    </p>
                </div>
            </motion.div>

            {/* Masonry Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
                {photos.map((photo, index) => (
                    <motion.div
                        key={index}
                        layoutId={`card-${photo.id}`}
                        onClick={() => setSelectedId(photo.id)}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className={`relative group rounded-3xl overflow-hidden bg-card/60 border border-border/50 cursor-pointer ${photo.size === "large" ? "md:col-span-2 md:row-span-2" :
                            photo.size === "medium" ? "md:row-span-1" : ""
                            }`}
                    >
                        {/* Image Layer */}
                        <motion.div
                            className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                            style={{ backgroundImage: `url(${photo.url})` }}
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                        {/* Content - Keep white here because it's over an image/dark overlay */}
                        <div className="absolute inset-0 flex flex-col justify-end p-6">
                            <h3 className="text-xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{photo.title}</h3>
                            <div className="flex items-center gap-2 text-primary-foreground text-sm mt-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                <MapPin size={14} className="text-primary" /> {photo.location}
                            </div>
                        </div>

                        {/* Camera Icon */}
                        <div className="absolute top-4 right-4 text-white/20 group-hover:text-white/40 transition-colors opacity-0 group-hover:opacity-100">
                            <Camera size={24} />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedId(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
                    >
                        {photos.map(photo => photo.id === selectedId && (
                            <motion.div
                                key={photo.id}
                                layoutId={`card-${photo.id}`}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-card w-full max-w-4xl rounded-3xl overflow-hidden relative border border-white/10 shadow-2xl"
                            >
                                <button
                                    onClick={() => setSelectedId(null)}
                                    className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-white hover:text-black transition-colors"
                                >
                                    <X size={24} />
                                </button>

                                <div className="grid md:grid-cols-2">
                                    <div className="h-[300px] md:h-[500px] bg-cover bg-center" style={{ backgroundImage: `url(${photo.url})` }} />
                                    <div className="p-8 flex flex-col justify-center bg-background/95">
                                        <div className="flex items-center gap-2 text-primary mb-2">
                                            <MapPin size={16} /> {photo.location}
                                        </div>
                                        <h2 className="text-3xl font-bold text-foreground mb-4">{photo.title}</h2>
                                        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                                            {photo.desc}
                                        </p>
                                        <div className="mt-auto pt-6 border-t border-border/50 flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">Photo {photo.id} of {photos.length}</span>
                                            <div className="flex gap-2">
                                                {/* Navigation buttons could go here */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Stats / Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
                {['6 Years', '12+ Cities', 'Countless Memories', '1 Passion'].map((item, i) => (
                    <div key={i} className="bg-muted/10 rounded-2xl p-6 text-center border border-border/50 hover:border-primary/20 transition-colors">
                        <span className="font-bold text-primary block text-xl mb-1">{item.split(' ')[0]}</span>
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">{item.split(' ').slice(1).join(' ')}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Travel;
