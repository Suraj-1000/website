import { motion } from 'framer-motion';
import { Code2, Server, BrainCircuit } from 'lucide-react';

const ExpertiseSection = () => {
    const expertise = [
        {
            icon: <Code2 size={32} />,
            title: "Frontend Magic",
            desc: "Crafting responsive, interactive UIs with React, Tailwind, and Framer Motion."
        },
        {
            icon: <Server size={32} />,
            title: "Backend Logic",
            desc: "Building scalable APIs and robust database architectures with Node.js and PostgreSQL."
        },
        {
            icon: <BrainCircuit size={32} />,
            title: "AI Integration",
            desc: "Leveraging LLMs and modern AI tools to create smarter applications."
        }
    ];

    return (
        <section className="py-24 bg-muted/10">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">What I <span className="text-primary">Do</span></h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">Bridging the gap between design and possibility.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {expertise.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-card/50 border border-border/50 p-8 rounded-2xl hover:bg-card hover:border-primary/20 transition-all text-center group"
                        >
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExpertiseSection;
