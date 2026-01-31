import { useState, useEffect } from 'react';
import ProjectCard from '../../components/organisms/ProjectCard/ProjectCard';
import { motion } from 'framer-motion';
import api from '../../utils/api';

const Projects = () => {
    // Real GitHub Data
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get('/projects');
                // Standardise: if API returns { success: true, data: [] }, use res.data.data
                // My Project controller now returns: { success: true, data: projects }
                setProjects(res.data.data || []);
            } catch (error) {
                console.error('Failed to fetch projects', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

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
