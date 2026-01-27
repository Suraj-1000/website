import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, GraduationCap, School, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

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
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Manage Education
                </h1>
                <Link
                    to="/admin/education/new"
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                    <Plus size={20} /> Add New
                </Link>
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
                            className="bg-card border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative group"
                        >
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Link
                                    to={`/admin/education/edit/${edu.id}`}
                                    className="p-2 bg-secondary/10 text-secondary rounded-full hover:bg-secondary/20 transition-colors"
                                >
                                    <Edit2 size={16} />
                                </Link>
                                <button
                                    onClick={() => handleDelete(edu.id)}
                                    className="p-2 bg-red-500/10 text-red-500 rounded-full hover:bg-red-500/20 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-2 rounded-lg bg-primary/10 text-primary`}>
                                    {edu.icon === 'GraduationCap' ? <GraduationCap size={24} /> :
                                        edu.icon === 'School' ? <School size={24} /> : <BookOpen size={24} />}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg line-clamp-1">{edu.degree}</h3>
                                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                                </div>
                            </div>

                            <div className="space-y-2 text-sm text-muted-foreground">
                                <p>Year: <span className="text-foreground">{edu.year}</span></p>
                                <p>Address: <span className="text-foreground">{edu.address}</span></p>
                                <p>Grade: <span className="text-foreground">{edu.grade}</span></p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default EducationList;
