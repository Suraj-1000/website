import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const AwardList = () => {
    const [awards, setAwards] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAwards = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/awards');
            setAwards(res.data.data);
        } catch (error) {
            console.error('Failed to fetch awards:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAwards();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this award?')) return;
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.delete(`http://localhost:5000/api/awards/${id}`, config);
            setAwards(awards.filter(award => award.id !== id));
        } catch (error) {
            console.error('Failed to delete award:', error);
            alert('Failed to delete award');
        }
    };

    if (loading) return <div className="text-center p-10">Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Manage Awards
                </h1>
                <Link
                    to="/admin/awards/new"
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                    <Plus size={20} /> Add New
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {awards.map((award) => (
                        <motion.div
                            key={award.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            layout
                            className="bg-card border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative group"
                        >
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Link
                                    to={`/admin/awards/edit/${award.id}`}
                                    className="p-2 bg-secondary/10 text-secondary rounded-full hover:bg-secondary/20 transition-colors"
                                >
                                    <Edit2 size={16} />
                                </Link>
                                <button
                                    onClick={() => handleDelete(award.id)}
                                    className="p-2 bg-red-500/10 text-red-500 rounded-full hover:bg-red-500/20 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <Award size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg line-clamp-1">{award.title}</h3>
                                    <p className="text-sm text-muted-foreground">{award.issuer}</p>
                                </div>
                            </div>

                            <div className="space-y-2 text-sm text-muted-foreground">
                                <p>Date: <span className="text-foreground">{award.date}</span></p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {awards.length === 0 && (
                    <div className="col-span-full text-center py-10 text-muted-foreground">
                        No awards found. Add some!
                    </div>
                )}
            </div>
        </div>
    );
};

export default AwardList;
