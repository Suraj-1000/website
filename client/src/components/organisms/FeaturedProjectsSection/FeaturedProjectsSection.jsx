import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProjectCard from '../ProjectCard/ProjectCard';

const FeaturedProjectsSection = () => {
    // Mock data for featured projects (mirrored from Projects page)
    const featuredProjects = [
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
