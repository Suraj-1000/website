import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '@/utils/api';

import { Save, ArrowLeft, Plus, X, Code, Database, Layout, Terminal, Bot, Settings, Globe, Users, Brain, Server, Cloud, Smartphone, PenTool, Cpu, Shield, GitBranch, Package, Monitor, Tablet, HardDrive, Wifi, Zap, BarChart, Layers, Command } from 'lucide-react';
import { Link } from 'react-router-dom';

const icons = [
    { name: 'Code', icon: Code },
    { name: 'Globe', icon: Globe },
    { name: 'Database', icon: Database },
    { name: 'Layout', icon: Layout },
    { name: 'Terminal', icon: Terminal },
    { name: 'Bot', icon: Bot },
    { name: 'Settings', icon: Settings },
    { name: 'Users', icon: Users },
    { name: 'Brain', icon: Brain },
    { name: 'Server', icon: Server },
    { name: 'Cloud', icon: Cloud },
    { name: 'Smartphone', icon: Smartphone },
    { name: 'PenTool', icon: PenTool },
    { name: 'Cpu', icon: Cpu },
    { name: 'Shield', icon: Shield },
    { name: 'GitBranch', icon: GitBranch },
    { name: 'Package', icon: Package },
    { name: 'Monitor', icon: Monitor },
    { name: 'Tablet', icon: Tablet },
    { name: 'HardDrive', icon: HardDrive },
    { name: 'Wifi', icon: Wifi },
    { name: 'Zap', icon: Zap },
    { name: 'BarChart', icon: BarChart },
    { name: 'Layers', icon: Layers },
    { name: 'Command', icon: Command },
];

const SkillForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        category: '',
        icon: 'Code',
        items: ['']
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEdit);

    useEffect(() => {
        if (isEdit) {
            const fetchSkill = async () => {
                try {
                    const res = await api.get(`/skills`);
                    const allSkills = res.data.data;
                    const skill = allSkills.find(s => s._id === id);
                    if (skill) {
                        setFormData({
                            category: skill.category,
                            icon: skill.icon,
                            items: skill.items || ['']
                        });
                    }
                } catch (error) {
                    console.error('Failed to fetch skill', error);
                } finally {
                    setFetching(false);
                }
            };
            fetchSkill();
        }
    }, [id, isEdit]);

    const handleItemChange = (index, value) => {
        const newItems = [...formData.items];
        newItems[index] = value;
        setFormData({ ...formData, items: newItems });
    };

    const addItem = () => {
        setFormData({ ...formData, items: [...formData.items, ''] });
    };

    const removeItem = (index) => {
        const newItems = formData.items.filter((_, i) => i !== index);
        setFormData({ ...formData, items: newItems });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEdit) {
                await api.put(`/skills/${id}`, formData);
            } else {
                await api.post('/skills', formData);
            }
            navigate('/crm/skills');
        } catch (error) {
            console.error('Failed to save skill', error);
            alert('Failed to save skill');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div>Loading...</div>;

    return (
        <section className="px-6 py-8 space-y-8 min-h-screen">
            <div className="max-w-3xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <Link to="/crm/skills" className="p-2 hover:bg-muted rounded-full transition-colors">
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{isEdit ? 'Edit Category' : 'Add New Category'}</h1>
                        <p className="text-sm text-muted-foreground mt-1">Configure your skill categories and stack</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8 bg-background border border-border p-8 rounded-md shadow-sm">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Category Name</label>
                        <input
                            type="text"
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="e.g. Frontend Development"
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-semibold block">Category Icon</label>
                        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                            {icons.map((item) => (
                                <button
                                    key={item.name}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, icon: item.name })}
                                    className={`flex flex-col items-center justify-center p-2 rounded-md border transition-all aspect-square ${formData.icon === item.name
                                        ? 'border-primary bg-primary/5 text-primary'
                                        : 'border-border hover:bg-muted text-muted-foreground'
                                        }`}
                                    title={item.name}
                                >
                                    <item.icon size={20} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-sm font-semibold block">Skill Items</label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {formData.items.map((item, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="e.g. React.js"
                                        value={item}
                                        onChange={(e) => handleItemChange(index, e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeItem(index)}
                                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={addItem}
                            className="flex items-center gap-2 text-sm font-medium text-primary hover:underline transition-colors"
                        >
                            <Plus size={16} /> Add Skill Item
                        </button>
                    </div>

                    <div className="pt-6 border-t border-border flex justify-end gap-3">
                        <Button variant="outline" asChild className="rounded-md">
                            <Link to="/crm/skills">Cancel</Link>
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="gap-2 rounded-md px-8 shadow-sm"
                        >
                            <Save size={18} />
                            {loading ? 'Saving...' : 'Save Category'}
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default SkillForm;
