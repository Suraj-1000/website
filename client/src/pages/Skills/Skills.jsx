import { motion } from 'framer-motion';
import { Code, Database, Layout, Terminal, Bot, Settings, Globe, Users, Brain } from 'lucide-react';

const Skills = () => {
    const skillCategories = [
        {
            title: "Languages",
            icon: <Code className="text-primary" />,
            skills: ["Python", "C", "Java", "JavaScript"]
        },
        {
            title: "Web Technologies",
            icon: <Globe className="text-secondary" />,
            skills: ["HTML", "CSS", "PHP", "MERN Stack"]
        },
        {
            title: "Databases",
            icon: <Database className="text-green-500" />,
            skills: ["MySQL", "MongoDB", "PostgreSQL"]
        },
        {
            title: "Soft Skills",
            icon: <Users className="text-yellow-500" />,
            skills: ["Communication", "Project Planning", "Positive Attitude", "Teamwork", "Problem Solving", "Data Management", "Workaholic"]
        },
        {
            title: "Tools & DevOps",
            icon: <Settings className="text-orange-500" />,
            skills: ["Git", "GitHub", "VS Code", "Canva", "Figma", "Postman", "JIRA", "phpMyAdmin", "Microsoft Office"]
        },
        {
            title: "AI & Innovation",
            icon: <Bot className="text-purple-500" />,
            skills: ["Prompt Engineering", "ChatGPT", "Gemini", "Claude", "Cursor", "Antigravity"]
        },
        {
            title: "QA & Methodologies",
            icon: <Terminal className="text-pink-500" />,
            skills: ["Manual/Automated Testing", "API Testing", "Agile Scrum", "Kanban", "Software Architecture", "SDLC"]
        }
    ];

    return (
        <div className="container mx-auto px-6 py-20 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-6xl font-bold mb-6">Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Arsenal</span></h2>
                <p className="text-xl text-muted-foreground">My expertise across the full stack.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {skillCategories.map((category, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card/40 border border-border/50 p-8 rounded-2xl backdrop-blur-sm hover:bg-card/60 transition-colors group"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-muted/50 rounded-xl group-hover:bg-primary/20 transition-colors">
                                {category.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-foreground">{category.title}</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {category.skills.map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1 bg-muted/50 border border-border/50 rounded-full text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Skills;
