import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Code, Database, Layout, Terminal, Bot, Settings, Globe, Users, Brain, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';

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
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
                    <Wrench className="text-primary" /> Manage Skills
                </h1>
                <Button asChild className="gap-2 shadow-lg shadow-primary/20">
                    <Link to="/admin/skills/new">
                        <Plus size={20} /> Add New Category
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill) => {
                    const IconComponent = IconMap[skill.icon] || Code;

                    return (
                        <motion.div
                            key={skill._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <Card className="hover:border-primary/50 transition-all shadow-sm relative group">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 bg-primary/10 rounded-xl text-primary shadow-inner">
                                            <IconComponent size={24} />
                                        </div>
                                        <CardTitle className="text-xl font-bold">{skill.category}</CardTitle>
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                                            <Link to={`/admin/skills/edit/${skill._id}`}>
                                                <Edit2 size={14} />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(skill._id)}
                                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                        >
                                            <Trash2 size={14} />
                                        </Button>
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {skill.items.map((item, idx) => (
                                            <Badge
                                                key={idx}
                                                variant="outline"
                                                className="bg-muted/30 border-muted-foreground/20 text-muted-foreground/80 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider"
                                            >
                                                {item}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default SkillList;
