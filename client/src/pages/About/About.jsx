import { motion, AnimatePresence } from 'framer-motion';
import { User, Heart, Coffee, Code, Users, Music, Plane, Camera, Award, Languages, Utensils, Waves, Brain, Laptop, Sparkles, Lightbulb, Target, Quote, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import api, { API_URL as API_BASE } from '../../utils/api';

const About = () => {
    // State for dynamic data
    const [awards, setAwards] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal State
    const [selectedAward, setSelectedAward] = useState(null);

    // Lightbox State
    const [lightboxIndex, setLightboxIndex] = useState(null); // Index of image in lightbox
    const [lightboxImages, setLightboxImages] = useState([]); // Array of all images for current award

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [awardsRes, langRes] = await Promise.all([
                    api.get('/awards'),
                    api.get('/languages')
                ]);
                setAwards(awardsRes.data.data);
                setLanguages(langRes.data.data);
            } catch (error) {
                console.error('Failed to fetch about data', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Prevent scrolling when modal or lightbox is open
    useEffect(() => {
        if (selectedAward || lightboxIndex !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedAward, lightboxIndex]);

    // Helper to open lightbox
    const openLightbox = (images, index = 0) => {
        setLightboxImages(images);
        setLightboxIndex(index);
    };

    // Helper to close lightbox
    const closeLightbox = () => {
        setLightboxIndex(null);
        setLightboxImages([]);
    };

    // Navigation handlers
    const nextImage = (e) => {
        e.stopPropagation();
        setLightboxIndex((prev) => (prev + 1) % lightboxImages.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setLightboxIndex((prev) => (prev - 1 + lightboxImages.length) % lightboxImages.length);
    };

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <div className="container mx-auto px-6 py-20 min-h-screen">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Me</span>
                </h1>
                <p className="text-xl text-muted-foreground">The story behind the code.</p>
            </motion.div>

            {/* Bento Grid */}
            <motion.div
                variants={container}
                initial="hidden"
                animate={loading ? "hidden" : "show"}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto auto-rows-[minmax(180px,auto)]"
            >
                {/* 1. Who I Am (Large Block - 2x2) */}
                <motion.div variants={item} className="md:col-span-2 md:row-span-2 bg-card/40 border border-border/50 rounded-3xl p-8 backdrop-blur-sm hover:bg-card/60 transition-colors group relative overflow-hidden flex flex-col justify-center">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity text-foreground">
                        <User size={120} />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                        <User className="text-primary" /> Who I Am
                    </h3>
                    <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                        <p>
                            I am a <span className="text-foreground font-bold">Dynamic Full Stack Web Developer</span>, driven by the thrill of building things that live on the internet. My journey involves crafting scalable applications using the <span className="text-primary">MERN Stack, Python, and Java</span>.
                        </p>
                        <p>
                            Currently based in <span className="text-foreground">Maitidevi, Kathmandu</span> (originally from Sunwal-10, Nawalparasi), I blend technical expertise with creativity. I don't just write code; I solve problems using <span className="text-secondary">AI-powered solutions</span> and innovative thinking.
                        </p>
                        <p>
                            I believe in the power of continuous learning and teamwork to transform complex requirements into seamless digital experiences.
                        </p>
                    </div>
                </motion.div>

                {/* 2. Awards (Small Block - 1x1 or expands if many) */}
                <motion.div variants={item} className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-yellow-500/10 to-transparent border border-border/50 rounded-3xl p-6 backdrop-blur-sm hover:border-yellow-500/30 transition-colors flex flex-col justify-center overflow-y-auto overflow-x-hidden max-h-[250px] scrollbar-hide">
                    <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2 sticky top-0 bg-transparent backdrop-blur-md z-10 pb-2">
                        <Award className="text-yellow-500" /> Recognition
                    </h3>
                    <div className="space-y-4">
                        {awards.length > 0 ? awards.map((award) => (
                            <div
                                key={award.id}
                                onClick={() => setSelectedAward(award)}
                                className="border-b border-white/10 last:border-0 pb-3 last:pb-0 cursor-pointer hover:bg-white/5 p-2 rounded-lg transition-colors group"
                            >
                                <p className="font-bold text-lg text-foreground leading-tight group-hover:text-primary transition-colors">{award.title}</p>
                                <p className="text-sm text-yellow-600 dark:text-yellow-200/80 mb-1">{award.issuer} ({new Date(award.date).getFullYear()})</p>
                                <p className="text-[10px] text-muted-foreground italic">Click for details</p>
                            </div>
                        )) : (
                            <p className="text-sm text-muted-foreground">No awards listed yet.</p>
                        )}
                    </div>
                </motion.div>

                {/* 3. Languages (Small Block - 1x1) */}
                <motion.div variants={item} className="md:col-span-1 md:row-span-1 bg-card/40 border border-border/50 rounded-3xl p-6 backdrop-blur-sm hover:bg-card/60 transition-colors flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <Languages className="text-green-500" /> Languages
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {languages.length > 0 ? languages.map((lang) => (
                            <span key={lang.id} className="px-3 py-1 bg-muted/50 rounded-full text-xs font-medium text-foreground/80 border border-border/50 flex flex-col items-center">
                                <span>{lang.name}</span>
                                <span className="text-[10px] opacity-70">{lang.proficiency}</span>
                            </span>
                        )) : (
                            <p className="text-sm text-muted-foreground">No languages listed.</p>
                        )}
                    </div>
                </motion.div>

                {/* 4. Philosophy (New - 1x1) */}
                <motion.div variants={item} className="md:col-span-1 md:row-span-1 bg-card/40 border border-border/50 rounded-3xl p-6 backdrop-blur-sm hover:bg-card/60 transition-colors flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <Lightbulb className="text-orange-500" /> Philosophy
                    </h3>
                    <p className="text-muted-foreground italic">
                        "Simplicity is the soul of efficiency."
                    </p>
                    <p className="text-sm text-foreground/80 mt-2">
                        I strive for code that is clean, documented, and user-centric.
                    </p>
                </motion.div>

                {/* 5. Future Goals (New - 1x1) */}
                <motion.div variants={item} className="md:col-span-1 md:row-span-1 bg-card/40 border border-border/50 rounded-3xl p-6 backdrop-blur-sm hover:bg-card/60 transition-colors flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <Target className="text-red-500" /> Next Up
                    </h3>
                    <ul className="text-sm text-muted-foreground space-y-2">
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400" /> Mastering Rust/WASM</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400" /> Building AI Agents</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-400" /> Open Source Contrib</li>
                    </ul>
                </motion.div>


                {/* 6. My Roots (Medium - 1x2 - Spans Row 3 & 4 in Col 3) */}
                <motion.div variants={item} className="md:col-span-1 md:row-span-2 bg-card/40 border border-border/50 rounded-3xl p-8 backdrop-blur-sm hover:bg-card/60 transition-colors flex flex-col justify-between">
                    <div>
                        <h3 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                            <Users className="text-pink-500" /> My Roots
                        </h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                            A close-knit family of three. My father works overseas in Aviation, and my mother is the pillar of our home in Nepal.
                        </p>
                        <p className="text-sm text-muted-foreground">
                            They instilled in me that <span className="text-foreground font-semibold">integrity</span> and <span className="text-foreground font-semibold">hard work</span> are the true currencies of life.
                        </p>
                    </div>
                    <div className="mt-6 p-4 bg-muted/30 rounded-xl border border-border/50">
                        <Heart className="text-red-500 mx-auto w-8 h-8 mb-2" />
                        <p className="text-center text-xs text-muted-foreground">"Family First"</p>
                    </div>
                </motion.div>

                {/* 7. Passions (Wide - 2x1 - Spans Row 4 in Col 1 & 2) */}
                <motion.div variants={item} className="md:col-span-2 md:row-span-1 bg-card/40 border border-border/50 rounded-3xl p-8 backdrop-blur-sm hover:bg-card/60 transition-colors flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                        <Sparkles className="text-purple-500" /> Passions & Hobbies
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                            { icon: <Plane className="text-blue-400" />, label: "Traveling" },
                            { icon: <Code className="text-green-400" />, label: "Coding" },
                            { icon: <Camera className="text-orange-400" />, label: "Photography" },
                            { icon: <Music className="text-pink-400" />, label: "Music" },
                            { icon: <Utensils className="text-yellow-400" />, label: "Cooking" },
                            { icon: <Brain className="text-purple-400" />, label: "Learning" },
                        ].map((hobby, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                                {hobby.icon}
                                <span className="text-sm font-medium text-foreground/80">{hobby.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* 8. Quote (Wide - 3x1 - Row 5) */}
                <motion.div variants={item} className="md:col-span-3 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border border-border/50 rounded-3xl p-8 backdrop-blur-sm flex flex-col items-center justify-center text-center">
                    <Quote className="text-foreground/20 mb-4 w-10 h-10" />
                    <p className="text-2xl md:text-3xl font-light italic text-foreground mb-4">
                        "The only way to do great work is to love what you do."
                    </p>
                    <p className="text-sm text-primary font-bold tracking-widest uppercase">- Steve Jobs</p>
                </motion.div>
            </motion.div>

            {/* Award Details Modal - Rendered via Portal to sit on top of everything */}
            {createPortal(
                <AnimatePresence>
                    {selectedAward && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md" onClick={() => setSelectedAward(null)}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-card border border-border rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto overflow-x-hidden scrollbar-hide shadow-2xl relative"
                                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                            >
                                <button
                                    onClick={() => setSelectedAward(null)}
                                    className="absolute top-4 right-4 p-2 bg-muted/80 backdrop-blur rounded-full hover:bg-destructive hover:text-white transition-colors z-20 shadow-sm"
                                >
                                    <X size={20} />
                                </button>

                                <div className="p-8">
                                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2 pr-10 break-words">{selectedAward.title}</h2>
                                    <p className="text-lg text-muted-foreground mb-1 font-medium break-words">{selectedAward.issuer}</p>
                                    <p className="text-sm text-muted-foreground mb-6">{new Date(selectedAward.date).toDateString()}</p>

                                    {/* Images Carousel/Grid */}
                                    {selectedAward.images && selectedAward.images.length > 0 && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                            {selectedAward.images.map((img, idx) => (
                                                <div
                                                    key={idx}
                                                    className="rounded-xl overflow-hidden border border-border/50 h-48 cursor-zoom-in group relative"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        openLightbox(
                                                            selectedAward.images.map(i => i.startsWith('http') ? i : `${API_BASE.replace('/api', '')}${i}`),
                                                            idx
                                                        );
                                                    }}
                                                >
                                                    <img
                                                        src={img.startsWith('http') ? img : `${API_BASE.replace('/api', '')}${img}`}
                                                        alt={`${selectedAward.title} - ${idx + 1}`}
                                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                                    />
                                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <span className="text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">View Fullscreen</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {selectedAward.image && (!selectedAward.images || selectedAward.images.length === 0) && (
                                        <div
                                            className="rounded-xl overflow-hidden border border-border/50 h-48 mb-6 cursor-zoom-in group relative"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openLightbox([
                                                    selectedAward.image.startsWith('http') ? selectedAward.image : `${API_BASE.replace('/api', '')}${selectedAward.image}`
                                                ], 0);
                                            }}
                                        >
                                            <img
                                                src={selectedAward.image.startsWith('http') ? selectedAward.image : `${API_BASE.replace('/api', '')}${selectedAward.image}`}
                                                alt={selectedAward.title}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <span className="text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">View Fullscreen</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Rich Text Description */}
                                    <div className="prose prose-invert max-w-none text-foreground/90 leading-relaxed break-words">
                                        <div dangerouslySetInnerHTML={{ __html: selectedAward.description }} />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}

            {/* Lightbox for Images with Navigation - Rendered via Portal */}
            {createPortal(
                <AnimatePresence>
                    {lightboxIndex !== null && lightboxImages.length > 0 && (
                        <div
                            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
                            onClick={closeLightbox}
                        >
                            <button
                                onClick={closeLightbox}
                                className="absolute top-4 right-4 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors z-70"
                            >
                                <X size={24} />
                            </button>

                            {/* Navigation Buttons */}
                            {lightboxImages.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors z-70"
                                    >
                                        <ChevronLeft size={32} />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors z-70"
                                    >
                                        <ChevronRight size={32} />
                                    </button>
                                </>
                            )}


                            <motion.img
                                key={lightboxIndex} // Key forces re-render for animation when index changes
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                src={lightboxImages[lightboxIndex]}
                                alt={`Full View ${lightboxIndex + 1}`}
                                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            />

                            {/* Image Counter */}
                            {lightboxImages.length > 1 && (
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 bg-black/50 px-3 py-1 rounded-full text-sm">
                                    {lightboxIndex + 1} / {lightboxImages.length}
                                </div>
                            )}
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
};

export default About;
