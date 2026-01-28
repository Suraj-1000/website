import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
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
                    const res = await axios.get(`http://localhost:5000/api/skills`);
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
                await axios.put(`http://localhost:5000/api/skills/${id}`, formData);
            } else {
                await axios.post('http://localhost:5000/api/skills', formData);
            }
            navigate('/admin/skills');
        } catch (error) {
            console.error('Failed to save skill', error);
            alert('Failed to save skill');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link to="/admin/skills" className="p-2 hover:bg-muted rounded-full transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-2xl font-bold">{isEdit ? 'Edit Category' : 'Add New Category'}</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border p-6 rounded-xl">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Category Name</label>
                    <input
                        type="text"
                        required
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium block">Icon</label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                        {icons.map((item) => (
                            <button
                                key={item.name}
                                type="button"
                                onClick={() => setFormData({ ...formData, icon: item.name })}
                                className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${formData.icon === item.name
                                    ? 'border-primary bg-primary/10 text-primary'
                                    : 'border-border hover:bg-muted'
                                    }`}
                            >
                                <item.icon size={24} />
                                <span className="text-xs">{item.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-sm font-medium block">Skills</label>
                    {formData.items.map((item, index) => (
                        <div key={index} className="flex gap-2">
                            <input
                                type="text"
                                className="flex-1 px-3 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none"
                                value={item}
                                onChange={(e) => handleItemChange(index, e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => removeItem(index)}
                                className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addItem}
                        className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                        <Plus size={16} /> Add Skill
                    </button>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                    >
                        <Save size={20} />
                        {loading ? 'Saving...' : 'Save Category'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SkillForm;
