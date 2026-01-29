import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, GraduationCap, School, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';

const EducationList = () => {
    const [educations, setEducations] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchEducations = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/education');
            setEducations(res.data);
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
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.delete(`http://localhost:5000/api/education/${id}`, config);
            setEducations(educations.filter(edu => edu.id !== id));
        } catch (error) {
            console.error('Failed to delete education:', error);
            alert('Failed to delete education');
        }
    };

    if (loading) return <div className="text-center p-10">Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
                    <GraduationCap className="text-primary" /> Manage Education
                </h1>
                <Button asChild className="gap-2 shadow-lg shadow-primary/20">
                    <Link to="/admin/education/new">
                        <Plus size={20} /> Add New
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {educations.map((edu) => (
                        <motion.div
                            key={edu.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            layout
                        >
                            <Card className="hover:border-primary/50 transition-all shadow-sm relative group h-full">
                                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                    <Button variant="secondary" size="icon" asChild className="h-8 w-8 rounded-full">
                                        <Link to={`/admin/education/edit/${edu.id}`}>
                                            <Edit2 size={14} />
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        onClick={() => handleDelete(edu.id)}
                                        className="h-8 w-8 rounded-full"
                                    >
                                        <Trash2 size={14} />
                                    </Button>
                                </div>

                                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                                    <div className="p-3 bg-primary/10 rounded-xl text-primary shadow-inner">
                                        {edu.icon === 'GraduationCap' ? <GraduationCap size={24} /> :
                                            edu.icon === 'School' ? <School size={24} /> : <BookOpen size={24} />}
                                    </div>
                                    <div className="space-y-1">
                                        <CardTitle className="text-lg font-bold line-clamp-1">{edu.degree}</CardTitle>
                                        <p className="text-sm text-muted-foreground">{edu.institution}</p>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">Year</span>
                                        <Badge variant="secondary" className="font-semibold uppercase tracking-wider text-[10px]">
                                            {edu.startYear && edu.endYear ? `${edu.startYear} - ${edu.endYear}` : edu.year}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground">Address</span>
                                        <span className="text-foreground font-medium">{edu.address}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm border-t border-border/50 pt-2">
                                        <span className="text-muted-foreground">Grade</span>
                                        <span className="text-primary font-bold">{edu.grade}</span>
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

export default EducationList;
