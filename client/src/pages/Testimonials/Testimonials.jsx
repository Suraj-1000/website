import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
    // Mock Data
    const testimonials = [
        {
            id: 1,
            name: "Alex Johnson",
            role: "Product Manager at TechCorp",
            image: null,
            text: "Suraj is an exceptional developer who brings both technical expertise and creative problem-solving to the table. His ability to translate complex requirements into seamless user experiences is unmatched."
        },
        {
            id: 2,
            name: "Priya Sharma",
            role: "Senior Designer at CreativeStudio",
            image: null,
            text: "Working with Suraj was a breeze. He has a keen eye for design details and ensures that the final product looks exactly as envisioned, if not better. Highly recommended!"
        },
        {
            id: 3,
            name: "David Lee",
            role: "Startup Founder",
            image: null,
            text: "He built our MVP in record time without compromising on quality. The scalable architecture he designed allowed us to grow our user base rapidly. A true professional."
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <div className="container mx-auto px-6 py-20 min-h-screen flex flex-col items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl md:text-5xl font-bold mb-6">What People Say</h2>
                <p className="text-muted-foreground text-xl">
                    Feedback from clients and collaborators I've had the pleasure of working with.
                </p>
            </motion.div>

            <div className="relative w-full max-w-4xl">
                <div className="absolute top-0 left-0 -translate-x-12 hidden md:block text-primary/20">
                    <Quote size={80} />
                </div>

                <div className="bg-card/40 border border-border/50 rounded-3xl p-8 md:p-12 backdrop-blur-md relative overflow-hidden">
                    {/* Background Decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <AnimatePresence mode='wait'>
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="relative z-10 flex flex-col items-center text-center"
                        >
                            <div className="w-20 h-20 bg-secondary/20 rounded-full mb-6 flex items-center justify-center text-2xl font-bold text-secondary">
                                {testimonials[currentIndex].name.charAt(0)}
                            </div>

                            <p className="text-xl md:text-2xl font-light italic text-foreground/90 mb-8 leading-relaxed">
                                "{testimonials[currentIndex].text}"
                            </p>

                            <div>
                                <h4 className="text-lg font-bold text-primary">{testimonials[currentIndex].name}</h4>
                                <p className="text-sm text-muted-foreground">{testimonials[currentIndex].role}</p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-4 mt-8">
                    <button
                        onClick={prevTestimonial}
                        className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors text-foreground"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <div className="flex gap-2 items-center">
                        {testimonials.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-2 h-2 rounded-full transition-colors ${idx === currentIndex ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                                aria-label={`Go to testimonial ${idx + 1}`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={nextTestimonial}
                        className="p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors text-foreground"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
