import { useState, useEffect } from 'react';
import ProjectCard from '../../components/organisms/ProjectCard/ProjectCard';
import { motion } from 'framer-motion';

const Projects = () => {
    // Real GitHub Data
    const [projects, setProjects] = useState([
        {
            id: 1,
            title: "Voice Command App",
            description: "A voice-controlled application for enhanced accessibility and hands-free interaction.",
            techStack: ["JavaScript", "Speech API"],
            repoLink: "https://github.com/Suraj-1000/Voice-Command-App",
            demoLink: "#",
            imageUrl: null
        },
        {
            id: 2,
            title: "Tourist Attraction Finder",
            description: "Helps travelers discover popular tourist spots and hidden gems in their vicinity.",
            techStack: ["JavaScript", "Maps API"],
            repoLink: "https://github.com/Suraj-1000/Tourist-Attraction-Finder",
            demoLink: "#",
            imageUrl: null
        },
        {
            id: 3,
            title: "AI and Machine Learning",
            description: "A collection of Jupyter Notebooks exploring various AI and ML models and algorithms.",
            techStack: ["Jupyter Notebook", "Python"],
            repoLink: "https://github.com/Suraj-1000/Artificial-Intelligence-and-Machine-Learning",
            demoLink: "#",
            imageUrl: null
        },
        {
            id: 4,
            title: "ISA Weather Forecast",
            description: "Real-time weather forecasting application providing accurate climatic data.",
            techStack: ["JavaScript", "OpenWeatherMap"],
            repoLink: "https://github.com/Suraj-1000/ISA_Weather-Forecast-Application",
            demoLink: "#",
            imageUrl: null
        },
        {
            id: 5,
            title: "Course Management System",
            description: "A Java-based system for managing courses, students, and academic records.",
            techStack: ["Java", "Swing", "MySQL"],
            repoLink: "https://github.com/Suraj-1000/Course-Management-System-in-Java",
            demoLink: "#",
            imageUrl: null
        },
        {
            id: 6,
            title: "HRMS",
            description: "Human Resource Management System for streamlining employee data and attendance.",
            techStack: ["PHP", "MySQL"],
            repoLink: "https://github.com/Suraj-1000/HRMS",
            demoLink: "#",
            imageUrl: null
        },
        {
            id: 8,
            title: "Job Portal App",
            description: "A comprehensive platform for job seekers and employers to connect.",
            techStack: ["Node.js (OOP)", "PostgreSQL", "React"],
            repoLink: "https://github.com/Suraj-1000/Job-Portal-App",
            demoLink: "#",
            imageUrl: null
        },
        {
            id: 9,
            title: "Real Time Chat System",
            description: "A seamless real-time messaging application for instant communication.",
            techStack: ["Node.js (OOP)", "PostgreSQL", "Socket.io"],
            repoLink: "#",
            demoLink: "#",
            imageUrl: null
        },
        {
            id: 10,
            title: "Chat Bot",
            description: "An intelligent bot capable of handling user queries and automating responses.",
            techStack: ["Node.js (OOP)", "PostgreSQL", "NLP"],
            repoLink: "#",
            demoLink: "#",
            imageUrl: null
        },
        {
            id: 11,
            title: "Rate and Review System",
            description: "A feature-rich system allowing users to rate and review products/services.",
            techStack: ["Node.js (OOP)", "PostgreSQL", "React"],
            repoLink: "#",
            demoLink: "#",
            imageUrl: null
        },
        {
            id: 12,
            title: "Single Vendor Ecommerce",
            description: "A complete e-commerce solution for a single vendor with cart and payment integration.",
            techStack: ["Node.js (OOP)", "PostgreSQL", "React"],
            repoLink: "#",
            demoLink: "#",
            imageUrl: null
        },
        {
            id: 13,
            title: "Web Technologies",
            description: "Weekly workshop projects demonstrating fundamental and advanced web concepts.",
            techStack: ["HTML", "CSS", "JavaScript"],
            repoLink: "https://github.com/Suraj-1000/Web-Technologies",
            demoLink: "#",
            imageUrl: null
        }
    ]);

    return (
        <div className="container mx-auto px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mb-12"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
                <p className="text-muted-foreground text-lg">
                    A collection of my work, ranging from web applications to experimental tools.
                    Each project represents a unique challenge and solution.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                ))}
            </div>
        </div>
    );
};

export default Projects;
