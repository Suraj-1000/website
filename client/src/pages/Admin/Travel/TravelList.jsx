import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const TravelList = () => {
    const [travels, setTravels] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTravels = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/travel');
            setTravels(res.data.data);
        } catch (error) {
            console.error('Failed to fetch travels', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTravels();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this travel entry?')) {
            try {
                await axios.delete(`http://localhost:5000/api/travel/${id}`);
                setTravels(travels.filter(t => t.id !== id));
            } catch (error) {
                console.error('Failed to delete travel', error);
                alert('Failed to delete travel');
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Travel</h2>
                <Link
                    to="/admin/travel/new"
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                    <Plus size={20} />
                    Add New
                </Link>
            </div>

            <div className="grid gap-6">
                {travels.map((travel) => (
                    <motion.div
                        key={travel.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-card border border-border p-6 rounded-xl flex flex-col md:flex-row justify-between gap-4"
                    >
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-foreground">{travel.title}</h3>
                            <p className="text-primary font-medium">{travel.location}</p>
                            <p className="text-sm text-muted-foreground">{new Date(travel.visitDate).toLocaleDateString()}</p>
                            <p className="text-sm text-muted-foreground line-clamp-2">{travel.description}</p>
                        </div>

                        <div className="flex items-start gap-2">
                            <Link
                                to={`/admin/travel/edit/${travel.id}`}
                                className="p-2 bg-muted text-foreground rounded-lg hover:bg-primary/20 hover:text-primary transition-colors"
                            >
                                <Edit2 size={18} />
                            </Link>
                            <button
                                onClick={() => handleDelete(travel.id)}
                                className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </motion.div>
                ))}

                {travels.length === 0 && (
                    <div className="text-center py-20 bg-card/50 rounded-xl border border-dashed border-border px-4">
                        <p className="text-muted-foreground">No travel entries found. Add your first one!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TravelList;
