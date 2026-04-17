import { useState, useEffect } from 'react';
import api from '@/utils/api';
import { Plus, Trash2, Edit2, Github, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';


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
        <section className="px-6 py-8 space-y-8 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        Projects
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Showcase your best work and side projects
                    </p>
                </div>
                <Button asChild size="sm" className="gap-2 shadow-sm">
                    <Link to="/crm/projects/new">
                        <Plus size={16} /> Add Project
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                    <div key={project.id}>
                        <Card className="hover:border-primary/30 transition-all shadow-sm relative group flex flex-col h-full rounded-md">
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <Button variant="outline" size="icon" asChild className="h-8 w-8 rounded-md bg-background">
                                    <Link to={`/crm/projects/edit/${project.id}`}>
                                        <Edit2 size={14} />
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleDelete(project.id)}
                                    className="h-8 w-8 rounded-md text-red-500 hover:text-red-500 hover:bg-red-500/10 bg-background"
                                >
                                    <Trash2 size={14} />
                                </Button>
                            </div>

                            <CardHeader>
                                <CardTitle className="text-lg font-bold">{project.title}</CardTitle>
                            </CardHeader>

                            <CardContent className="flex flex-col flex-grow">
                                <p className="text-muted-foreground text-xs mb-4 line-clamp-3">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {project.techStack?.map((tech, idx) => (
                                        <Badge key={idx} variant="secondary" className="px-2 py-0 text-[10px] font-medium uppercase tracking-wider rounded-sm">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>

                                <div className="flex gap-4 text-xs mt-auto">
                                    {project.repoLink && (
                                        <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-primary hover:underline font-medium">
                                            <Github size={12} /> Repo
                                        </a>
                                    )}
                                    {project.demoLink && (
                                        <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground hover:underline font-medium">
                                            <ExternalLink size={12} /> Demo
                                        </a>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProjectList;
