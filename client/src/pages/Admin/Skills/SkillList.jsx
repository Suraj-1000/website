import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Code, Database, Layout, Terminal, Bot, Settings, Globe, Users, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mapping string icon names to components
const IconMap = {
    Code, Database, Layout, Terminal, Bot, Settings, Globe, Users, Brain
};

const SkillList = () => {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSkills = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/skills');
            setSkills(res.data.data);
        } catch (error) {
            console.error('Failed to fetch skills', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await axios.delete(`http://localhost:5000/api/skills/${id}`);
                setSkills(skills.filter(s => s._id !== id));
            } catch (error) {
                console.error('Failed to delete skill category', error);
                alert('Failed to delete skill category');
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Skills</h2>
                <Link
                    to="/admin/skills/new"
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                    <Plus size={20} />
                    Add New Category
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill) => {
                    const IconComponent = IconMap[skill.icon] || Code;

                    return (
                        <motion.div
                            key={skill._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-card border border-border p-6 rounded-xl group relative"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 bg-muted/50 rounded-lg text-primary">
                                        <IconComponent size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground">{skill.category}</h3>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link
                                        to={`/admin/skills/edit/${skill._id}`}
                                        className="p-2 hover:bg-primary/20 hover:text-primary rounded-lg transition-colors"
                                    >
                                        <Edit2 size={16} />
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(skill._id)}
                                        className="p-2 hover:bg-red-500/20 hover:text-red-500 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {skill.items.map((item, idx) => (
                                    <span
                                        key={idx}
                                        className="px-2 py-1 bg-background border border-border rounded text-xs text-muted-foreground"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default SkillList;
