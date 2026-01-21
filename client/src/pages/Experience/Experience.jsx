import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';

const Experience = () => {
    const experiences = [
        {
            id: 1,
            role: "Backend Developer (Part-Time, Intern)",
            company: "Engineering & Tech.Connect",
            location: "Michigan, US (Remote)",
            period: "Nov 2024 - Nov 2025",
            description: [
                "Built responsive web apps with MERN stack.",
                "Developed APIs and managed MongoDB database operations.",
                "Integrated React.js frontend with backend and optimized performance.",
                "Used Git for version control and handled cloud deployments.",
                "Conducted functional and API testing with Postman.",
                "Explored AI-driven features and Prompt Engineering."
            ]
        }
    ];

    return (
        <div className="container mx-auto px-6 py-20 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-6xl font-bold mb-6">Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">Journey</span></h2>
                <p className="text-xl text-muted-foreground">My hands-on experience in the industry.</p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-12">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="relative pl-8 md:pl-0"
                    >
                        {/* Timeline Line (Desktop) */}
                        <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-0.5 bg-border/50 -translate-x-1/2" />

                        <div className={`md:flex items-center justify-between gap-12 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                            {/* Date Bubble (Desktop) */}
                            <div className="hidden md:flex flex-1 justify-center relative z-10">
                                <div className="bg-card border border-border/50 px-6 py-2 rounded-full text-primary font-bold shadow-lg">
                                    {exp.period}
                                </div>
                            </div>

                            {/* Content Card */}
                            <div className="flex-1 bg-card/40 border border-border/50 p-8 rounded-2xl backdrop-blur-sm hover:border-primary/50 transition-colors group">
                                <h3 className="text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{exp.role}</h3>
                                <h4 className="text-lg text-muted-foreground mb-4 flex items-center gap-2">
                                    <Briefcase size={16} /> {exp.company}
                                </h4>
                                <div className="md:hidden text-sm text-primary mb-4 flex items-center gap-2">
                                    <Calendar size={14} /> {exp.period}
                                </div>
                                <ul className="space-y-2 text-muted-foreground list-disc list-inside">
                                    {exp.description.map((point, idx) => (
                                        <li key={idx} className="leading-relaxed">{point}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Empty Space for alignment */}
                            <div className="hidden md:block flex-1" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Experience;
