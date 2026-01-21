import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProjectCard from '../ProjectCard/ProjectCard';

const FeaturedProjectsSection = () => {
    // Mock data for featured projects (mirrored from Projects page)
    const featuredProjects = [
        {
            id: 1,
            title: "Recipe Sharing App",
            description: "A cross-platform mobile application for food lovers to share and discover recipes. Features user authentication, recipe creation with images, and social interaction.",
            techStack: ["Flutter", "Node.js", "SQLite"],
            repoLink: "#",
            demoLink: "#",
            imageUrl: null
        },
        {
            id: 2,
            title: "Smart Tourist Guide App",
            description: "An AR-powered travel companion offering real-time guidance, location history, and augmented reality navigation for tourists.",
            techStack: ["Flutter", "AR", "Node.js", "MongoDB"],
            repoLink: "#",
            demoLink: "#",
            imageUrl: null
        },
        {
            id: 3,
            title: "Travel Expense Tracker",
            description: "A utility app for travelers to track expenses, converting currencies and generating spending reports on the go.",
            techStack: ["Flutter", "Node.js", "Express"],
            repoLink: "#",
            demoLink: "#",
            imageUrl: null
        }
    ];

    return (
        <section className="py-24">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Featured <span className="text-secondary">Work</span></h2>
                        <p className="text-muted-foreground">A glimpse into my recent development.</p>
                    </div>
                    <Link to="/projects" className="hidden md:flex items-center gap-2 text-primary hover:text-white transition-colors">
                        View All <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featuredProjects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link to="/projects" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors">
                        View All Projects <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProjectsSection;
