import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Save, ArrowLeft, Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExperienceForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        role: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        description: ['']
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEdit);

    useEffect(() => {
        if (isEdit) {
            const fetchExperience = async () => {
                try {
                    const res = await axios.get(`http://localhost:5000/api/experience`); // Ideally fetch single by ID but my controller list all.
                    // Wait, usually we have GET /:id. I did create GET /, did I create GET /:id in routes?
                    // Let's check logic: router.route('/').get(getExperiences). POST...
                    // router.route('/:id').put... delete...
                    // I missed GET /:id in my route definition earlier! 
                    // I only did put and delete for /:id.
                    // I need to add GET /:id to backend controller and route or filter from list.
                    // For now I'll filter from list to save a round trip for "fix" but ideally I should fix backend.

                    const allExp = res.data.data;
                    const exp = allExp.find(e => e._id === id);
                    if (exp) {
                        setFormData({
                            role: exp.role,
                            company: exp.company,
                            location: exp.location,
                            startDate: exp.startDate,
                            endDate: exp.endDate,
                            description: exp.description || ['']
                        });
                    }
                } catch (error) {
                    console.error('Failed to fetch experience', error);
                } finally {
                    setFetching(false);
                }
            };
            fetchExperience();
        }
    }, [id, isEdit]);

    const handleDescriptionChange = (index, value) => {
        const newDesc = [...formData.description];
        newDesc[index] = value;
        setFormData({ ...formData, description: newDesc });
    };

    const addDescriptionPoint = () => {
        setFormData({ ...formData, description: [...formData.description, ''] });
    };

    const removeDescriptionPoint = (index) => {
        const newDesc = formData.description.filter((_, i) => i !== index);
        setFormData({ ...formData, description: newDesc });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEdit) {
                await axios.put(`http://localhost:5000/api/experience/${id}`, formData);
            } else {
                await axios.post('http://localhost:5000/api/experience', formData);
            }
            navigate('/admin/experience');
        } catch (error) {
            console.error('Failed to save experience', error);
            alert('Failed to save experience');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link to="/admin/experience" className="p-2 hover:bg-muted rounded-full transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-2xl font-bold">{isEdit ? 'Edit Experience' : 'Add New Experience'}</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border p-6 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Role / Job Title</label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Company</label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Start Date</label>
                        <input
                            type="text"
                            placeholder="e.g. Nov 2024"
                            required
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none"
                            value={formData.startDate}
                            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">End Date</label>
                        <input
                            type="text"
                            placeholder="e.g. Present"
                            required
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none"
                            value={formData.endDate}
                            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-sm font-medium block">Description Points</label>
                    {formData.description.map((desc, index) => (
                        <div key={index} className="flex gap-2">
                            <input
                                type="text"
                                className="flex-1 px-3 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none"
                                value={desc}
                                onChange={(e) => handleDescriptionChange(index, e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => removeDescriptionPoint(index)}
                                className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addDescriptionPoint}
                        className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                        <Plus size={16} /> Add Point
                    </button>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                    >
                        <Save size={20} />
                        {loading ? 'Saving...' : 'Save Experience'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ExperienceForm;
