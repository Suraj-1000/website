import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ExperienceList = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchExperiences = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/experiences'); // Use full URL or setup proxy
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

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Experience</h2>
                <Link
                    to="/admin/experience/new"
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                    <Plus size={20} />
                    Add New
                </Link>
            </div>

            <div className="grid gap-6">
                {experiences.map((exp) => (
                    <motion.div
                        key={exp.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-card border border-border p-6 rounded-xl flex flex-col md:flex-row justify-between gap-4"
                    >
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                            <p className="text-primary font-medium">{exp.company}</p>
                            <p className="text-sm text-muted-foreground">{exp.period || `${exp.startDate} - ${exp.endDate}`}</p>
                            <p className="text-sm text-muted-foreground">{exp.location}</p>
                        </div>

                        <div className="flex items-start gap-2">
                            <Link
                                to={`/admin/experience/edit/${exp.id}`}
                                className="p-2 bg-muted text-foreground rounded-lg hover:bg-primary/20 hover:text-primary transition-colors"
                            >
                                <Edit2 size={18} />
                            </Link>
                            <button
                                onClick={() => handleDelete(exp.id)}
                                className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </motion.div>
                ))}

                {experiences.length === 0 && (
                    <div className="text-center py-20 bg-card/50 rounded-xl border border-dashed border-border px-4">
                        <p className="text-muted-foreground">No experiences found. Add your first one!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExperienceList;
