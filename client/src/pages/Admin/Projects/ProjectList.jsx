import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/projects');
            // Assuming API returns { success: true, data: [] }
            setProjects(res.data.data || []);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.delete(`http://localhost:5000/api/projects/${id}`, config);
            setProjects(projects.filter(p => p.id !== id));
        } catch (error) {
            console.error('Failed to delete project:', error);
            alert('Failed to delete project');
        }
    };

    if (loading) return <div className="text-center p-10">Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Manage Projects
                </h1>
                <Link
                    to="/admin/projects/new"
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                    <Plus size={20} /> Add New
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            layout
                            className="bg-card border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative group flex flex-col h-full"
                        >
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <Link
                                    to={`/admin/projects/edit/${project.id}`}
                                    className="p-2 bg-secondary/10 text-secondary rounded-full hover:bg-secondary/20 transition-colors"
                                >
                                    <Edit2 size={16} />
                                </Link>
                                <button
                                    onClick={() => handleDelete(project.id)}
                                    className="p-2 bg-red-500/10 text-red-500 rounded-full hover:bg-red-500/20 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.techStack?.map((tech, idx) => (
                                    <span key={idx} className="text-xs px-2 py-1 bg-muted rounded-full">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-4 text-sm mt-auto">
                                {project.repoLink && (
                                    <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                                        <Github size={14} /> Repo
                                    </a>
                                )}
                                {project.demoLink && (
                                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-secondary hover:underline">
                                        <ExternalLink size={14} /> Demo
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ProjectList;
