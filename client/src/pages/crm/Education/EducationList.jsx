import { useState, useEffect } from 'react';
import api from '@/utils/api';
import { Plus, Trash2, Edit2, GraduationCap, School, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';


const EducationList = () => {
    const [educations, setEducations] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEducations = async () => {
        try {
            const res = await api.get('/education');
            setEducations(res.data.data || []);
        } catch (error) {
            console.error('Failed to fetch education:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEducations();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this education entry?')) return;
        try {
            await api.delete(`/education/${id}`);
            setEducations(educations.filter(edu => edu.id !== id));
        } catch (error) {
            console.error('Failed to delete education:', error);
            alert('Failed to delete education');
        }
    };

    if (loading) return <div className="text-center p-10">Loading...</div>;

    return (
        <section className="px-6 py-8 space-y-8 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        Education
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage your academic background and qualifications
                    </p>
                </div>
                <Button asChild size="sm" className="gap-2 shadow-sm">
                    <Link to="/crm/education/new">
                        <Plus size={16} /> Add Education
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {educations.map((edu) => (
                    <div key={edu.id}>
                        <Card className="hover:border-primary/30 transition-all shadow-sm relative group h-full rounded-md">
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <Button variant="outline" size="icon" asChild className="h-8 w-8 rounded-md bg-background">
                                    <Link to={`/crm/education/edit/${edu.id}`}>
                                        <Edit2 size={14} />
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleDelete(edu.id)}
                                    className="h-8 w-8 rounded-md text-red-500 hover:text-red-500 hover:bg-red-500/10 bg-background"
                                >
                                    <Trash2 size={14} />
                                </Button>
                            </div>

                            <CardHeader className="flex flex-row items-center gap-4 pb-4">
                                <div className="size-10 flex items-center justify-center bg-secondary/50 border border-border rounded-full text-secondary-foreground">
                                    {edu.icon === 'GraduationCap' ? <GraduationCap size={18} /> :
                                        edu.icon === 'School' ? <School size={18} /> : <BookOpen size={18} />}
                                </div>
                                <div className="space-y-1">
                                    <CardTitle className="text-base font-bold line-clamp-1">{edu.degree}</CardTitle>
                                    <p className="text-xs text-muted-foreground">{edu.institution}</p>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-2">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-muted-foreground">Year</span>
                                    <Badge variant="secondary" className="font-medium text-[10px] rounded-sm">
                                        {edu.startYear && edu.endYear ? `${edu.startYear} - ${edu.endYear}` : edu.year}
                                    </Badge>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-muted-foreground">Address</span>
                                    <span className="text-foreground font-medium">{edu.address}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs border-t border-border pt-2">
                                    <span className="text-muted-foreground">Grade</span>
                                    <span className="text-primary font-bold">{edu.grade}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default EducationList;
