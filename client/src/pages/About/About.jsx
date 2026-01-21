import { motion } from 'framer-motion';
import { User, Heart, Coffee, Code, Users, Music, Plane, Camera, Award, Languages, Utensils, Waves, Brain, Laptop, Sparkles, Lightbulb, Target, Quote } from 'lucide-react';

const About = () => {
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
                animate="show"
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

                {/* 2. Awards (Small Block - 1x1) */}
                <motion.div variants={item} className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-yellow-500/10 to-transparent border border-border/50 rounded-3xl p-6 backdrop-blur-sm hover:border-yellow-500/30 transition-colors flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <Award className="text-yellow-500" /> Recognition
                    </h3>
                    <div>
                        <p className="font-bold text-lg text-foreground">AAA Scholarship</p>
                        <p className="text-sm text-yellow-600 dark:text-yellow-200/80 mb-2">Herald College (2025)</p>
                        <p className="text-xs text-muted-foreground">Awarded for excellence in Academics, Attitude, & Attendance.</p>
                    </div>
                </motion.div>

                {/* 3. Languages (Small Block - 1x1) */}
                <motion.div variants={item} className="md:col-span-1 md:row-span-1 bg-card/40 border border-border/50 rounded-3xl p-6 backdrop-blur-sm hover:bg-card/60 transition-colors flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                        <Languages className="text-green-500" /> Languages
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {["Nepali", "English", "Hindi", "Bhojpuri"].map((lang, i) => (
                            <span key={i} className="px-3 py-1 bg-muted/50 rounded-full text-xs font-medium text-foreground/80 border border-border/50">
                                {lang}
                            </span>
                        ))}
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
        </div>
    );
};

export default About;
