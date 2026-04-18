import { useState, useEffect } from 'react';
import api from '@/utils/api';
import { Plus, Edit2, Trash2, Briefcase, Calendar, MapPin, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';


const ExperienceList = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchExperiences = async () => {
        try {
            const res = await api.get('/experiences');
            setExperiences(res.data.data);
        } catch (error) {
            console.error('Failed to fetch experiences', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExperiences();
    }, []);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/experiences/${id}`);
            setExperiences(experiences.filter(exp => exp.id !== id));
        } catch (error) {
            console.error('Failed to delete experience', error);
        }
    };

    if (loading) return <div className="text-center p-10">Loading...</div>;

    return (
        <section className="px-6 py-8 space-y-8 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
                        Experience
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage your professional journey and career history
                    </p>
                </div>
                <Button asChild size="sm" className="gap-2 shadow-sm">
                    <Link to="/crm/experience/new">
                        <Plus size={16} /> Add Experience
                    </Link>
                </Button>
            </div>

            <div className="grid gap-4">
                {experiences.map((exp) => (
                    <div key={exp.id}>
                        <Card className="hover:border-primary/30 transition-all shadow-sm relative group overflow-hidden rounded-md">
                            <CardHeader className="flex flex-col md:flex-row justify-between gap-4 pb-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <CardTitle className="text-lg font-bold">{exp.role}</CardTitle>
                                        <Badge variant="secondary" className="bg-secondary text-secondary-foreground font-medium text-[10px] rounded-sm">
                                            {exp.period || `${exp.startDate} - ${exp.endDate}`}
                                        </Badge>
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-xs font-medium">
                                        <div className="flex items-center gap-1.5 text-primary">
                                            <Building2 size={14} />
                                            {exp.company}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-muted-foreground">
                                            <MapPin size={14} />
                                            {exp.location}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="outline" size="icon" asChild className="h-8 w-8 rounded-md">
                                        <Link to={`/crm/experience/edit/${exp.id}`}>
                                            <Edit2 size={14} />
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleDelete(exp.id)}
                                        className="h-8 w-8 rounded-md text-red-500 hover:text-red-500 hover:bg-red-500/10"
                                    >
                                        <Trash2 size={14} />
                                    </Button>
                                </div>
                            </CardHeader>
                        </Card>
                    </div>
                ))}

                {experiences.length === 0 && (
                    <Card className="flex flex-col items-center justify-center py-20 border-dashed bg-muted/20">
                        <p className="text-muted-foreground font-medium text-sm">No experiences found. Add your first one!</p>
                        <Button asChild variant="link" className="mt-2 text-primary" href="/crm/experience/new">
                            <Link to="/crm/experience/new">Get Started</Link>
                        </Button>
                    </Card>
                )}
            </div>
        </section>
    );
};

export default ExperienceList;
