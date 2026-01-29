import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Briefcase, Calendar, MapPin, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';

const ExperienceList = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchExperiences = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/experiences');
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
        if (window.confirm('Are you sure you want to delete this experience?')) {
            try {
                await axios.delete(`http://localhost:5000/api/experiences/${id}`);
                setExperiences(experiences.filter(exp => exp.id !== id));
            } catch (error) {
                console.error('Failed to delete experience', error);
                alert('Failed to delete experience');
            }
        }
    };

    if (loading) return <div className="text-center p-10">Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
                    <Briefcase className="text-primary" /> Manage Experience
                </h1>
                <Button asChild className="gap-2 shadow-lg shadow-primary/20">
                    <Link to="/admin/experience/new">
                        <Plus size={20} /> Add New
                    </Link>
                </Button>
            </div>

            <div className="grid gap-6">
                {experiences.map((exp) => (
                    <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Card className="hover:border-primary/50 transition-all shadow-sm relative group overflow-hidden">
                            <CardHeader className="flex flex-col md:flex-row justify-between gap-4 pb-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <CardTitle className="text-xl font-bold">{exp.role}</CardTitle>
                                        <Badge variant="secondary" className="bg-primary/10 text-primary font-bold uppercase tracking-wider text-[10px]">
                                            {exp.period || `${exp.startDate} - ${exp.endDate}`}
                                        </Badge>
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-sm font-medium">
                                        <div className="flex items-center gap-1.5 text-primary">
                                            <Building2 size={16} />
                                            {exp.company}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-muted-foreground">
                                            <MapPin size={16} />
                                            {exp.location}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="outline" size="icon" asChild className="h-9 w-9">
                                        <Link to={`/admin/experience/edit/${exp.id}`}>
                                            <Edit2 size={16} />
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleDelete(exp.id)}
                                        className="h-9 w-9 text-destructive hover:text-destructive hover:bg-destructive/10"
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </CardHeader>
                        </Card>
                    </motion.div>
                ))}

                {experiences.length === 0 && (
                    <Card className="flex flex-col items-center justify-center py-20 border-dashed bg-muted/20">
                        <p className="text-muted-foreground font-medium">No experiences found. Add your first one!</p>
                        <Button asChild variant="link" className="mt-2" href="/admin/experience/new">
                            <Link to="/admin/experience/new">Get Started</Link>
                        </Button>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default ExperienceList;
