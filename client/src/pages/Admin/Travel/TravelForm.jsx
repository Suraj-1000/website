import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Save, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TravelForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        title: '',
        location: '',
        visitDate: '',
        description: '',
        images: '' // Comma separated for simplicity for now
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEdit);

    useEffect(() => {
        if (isEdit) {
            const fetchTravel = async () => {
                try {
                    const res = await axios.get('http://localhost:5000/api/travel');
                    const allTravels = res.data.data;
                    const travel = allTravels.find(t => t.id === id);

                    if (travel) {
                        setFormData({
                            title: travel.title,
                            location: travel.location,
                            visitDate: travel.visitDate ? travel.visitDate.split('T')[0] : '',
                            description: travel.description,
                            images: travel.images ? travel.images.join(', ') : ''
                        });
                    }
                } catch (error) {
                    console.error('Failed to fetch travel', error);
                } finally {
                    setFetching(false);
                }
            };
            fetchTravel();
        }
    }, [id, isEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const dataToSend = {
            ...formData,
            images: formData.images.split(',').map(url => url.trim()).filter(url => url)
        };

        try {
            if (isEdit) {
                await axios.put(`http://localhost:5000/api/travel/${id}`, dataToSend);
            } else {
                await axios.post('http://localhost:5000/api/travel', dataToSend);
            }
            navigate('/admin/travel');
        } catch (error) {
            console.error('Failed to save travel', error);
            alert('Failed to save travel');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link to="/admin/travel" className="p-2 hover:bg-muted rounded-full transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-2xl font-bold">{isEdit ? 'Edit Travel' : 'Add New Travel'}</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-card border border-border p-6 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <input
                            type="text"
                            required
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
                        <label className="text-sm font-medium">Visit Date</label>
                        <input
                            type="date"
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none"
                            value={formData.visitDate}
                            onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Images (Comma separated URLs)</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none"
                            placeholder="http://example.com/img1.jpg, http://example.com/img2.jpg"
                            value={formData.images}
                            onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                        required
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none min-h-[150px]"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                    >
                        <Save size={20} />
                        {loading ? 'Saving...' : 'Save Travel'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TravelForm;
