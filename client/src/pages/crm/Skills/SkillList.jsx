import { useState, useEffect } from 'react';
import api from '../../../utils/api';
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
            const res = await api.get('/skills');
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
                await api.delete(`/skills/${id}`);
                setSkills(skills.filter(s => s._id !== id));
            } catch (error) {
                console.error('Failed to delete skill category', error);
                alert('Failed to delete skill category');
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <section className="px-6 py-8 space-y-8 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
                        Skills
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Organize and manage your technical stack and competencies
                    </p>
                </div>
                <Button asChild size="sm" className="gap-2 shadow-sm">
                    <Link to="/crm/skills/new">
                        <Plus size={16} /> Add Category
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((skill) => {
                    const IconComponent = IconMap[skill.icon] || Code;

                    return (
                        <div key={skill._id}>
                            <Card className="hover:border-primary/30 transition-all shadow-sm relative group rounded-md">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 flex items-center justify-center bg-secondary/50 border border-border rounded-full text-secondary-foreground">
                                            <IconComponent size={18} />
                                        </div>
                                        <CardTitle className="text-lg font-bold">{skill.category}</CardTitle>
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="outline" size="icon" asChild className="h-8 w-8 rounded-md">
                                            <Link to={`/crm/skills/edit/${skill._id}`}>
                                                <Edit2 size={14} />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => handleDelete(skill._id)}
                                            className="h-8 w-8 rounded-md text-red-500 hover:text-red-500 hover:bg-red-500/10"
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
                                                variant="secondary"
                                                className="bg-muted text-muted-foreground px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-sm"
                                            >
                                                {item}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default SkillList;
