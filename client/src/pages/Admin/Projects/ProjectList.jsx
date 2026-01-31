import { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Github, ExternalLink, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        try {
            const res = await api.get('/projects');
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
            await api.delete(`/projects/${id}`);
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
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
                    <Briefcase className="text-primary" /> Manage Projects
                </h1>
                <Button asChild className="gap-2 shadow-lg shadow-primary/20">
                    <Link to="/admin/projects/new">
                        <Plus size={20} /> Add New
                    </Link>
                </Button>
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
                        >
                            <Card className="hover:border-primary/50 transition-all shadow-sm relative group flex flex-col h-full">
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    <Button variant="secondary" size="icon" asChild className="h-8 w-8 rounded-full">
                                        <Link to={`/admin/projects/edit/${project.id}`}>
                                            <Edit2 size={14} />
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleDelete(project.id)}
                                        className="h-8 w-8 rounded-full"
                                    >
                                        <Trash2 size={14} />
                                    </Button>
                                </div>

                                <CardHeader>
                                    <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                                </CardHeader>

                                <CardContent className="flex flex-col flex-grow">
                                    <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.techStack?.map((tech, idx) => (
                                            <Badge key={idx} variant="secondary" className="px-2 py-0 text-[10px] font-medium uppercase tracking-wider">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>

                                    <div className="flex gap-4 text-sm mt-auto">
                                        {project.repoLink && (
                                            <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-primary hover:underline font-medium">
                                                <Github size={14} /> Repo
                                            </a>
                                        )}
                                        {project.demoLink && (
                                            <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-secondary hover:underline font-medium">
                                                <ExternalLink size={14} /> Demo
                                            </a>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ProjectList;
