import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 overflow-hidden pt-20">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-center relative z-10 max-w-4xl"
            >
                <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium tracking-wide animate-pulse">
                    Open for Work & Collaboration
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
                    Transforming Ideas into <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary animate-gradient-x">
                        Digital Reality
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                    Dynamic Full Stack Web Developer, passionate about crafting scalable, user-friendly web applications with the MERN Stack, Python, and Java. Driven to integrate AI-powered solutions and solve complex problems.
                </p>

                <div className="flex flex-col sm:flex-row gap-5 justify-center mb-16">
                    <Link
                        to="/projects"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-white font-semibold text-lg hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:-translate-y-1"
                    >
                        View Projects <ArrowRight size={20} />
                    </Link>
                    <Link
                        to="/contact"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-foreground font-semibold text-lg hover:bg-white/10 transition-all hover:-translate-y-1"
                    >
                        Contact Me
                    </Link>
                </div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
