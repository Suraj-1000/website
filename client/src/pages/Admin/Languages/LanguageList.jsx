import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Edit2, Languages } from 'lucide-react';
import { Link } from 'react-router-dom';

const LanguageList = () => {
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLanguages = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/languages');
            setLanguages(res.data.data);
        } catch (error) {
            console.error('Failed to fetch languages:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLanguages();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this language?')) return;
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.delete(`http://localhost:5000/api/languages/${id}`, config);
            setLanguages(languages.filter(lang => lang.id !== id));
        } catch (error) {
            console.error('Failed to delete language:', error);
            alert('Failed to delete language');
        }
    };

    if (loading) return <div className="text-center p-10">Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Manage Languages
                </h1>
                <Link
                    to="/admin/languages/new"
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                    <Plus size={20} /> Add New
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence>
                    {languages.map((lang) => (
                        <motion.div
                            key={lang.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            layout
                            className="bg-card border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative group"
                        >
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Link
                                    to={`/admin/languages/edit/${lang.id}`}
                                    className="p-2 bg-secondary/10 text-secondary rounded-full hover:bg-secondary/20 transition-colors"
                                >
                                    <Edit2 size={16} />
                                </Link>
                                <button
                                    onClick={() => handleDelete(lang.id)}
                                    className="p-2 bg-red-500/10 text-red-500 rounded-full hover:bg-red-500/20 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                    <Languages size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{lang.name}</h3>
                                    <p className="text-sm text-muted-foreground">{lang.proficiency}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {languages.length === 0 && (
                    <div className="col-span-full text-center py-10 text-muted-foreground">
                        No languages found. Add some!
                    </div>
                )}
            </div>
        </div>
    );
};

export default LanguageList;
