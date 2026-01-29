import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Plane, MapPin, Calendar, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';

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

    if (loading) return <div className="text-center p-10">Loading...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
                    <Plane className="text-primary" /> Manage Travels
                </h1>
                <Button asChild className="gap-2 shadow-lg shadow-primary/20">
                    <Link to="/admin/travel/new">
                        <Plus size={20} /> Add New
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {travels.map((travel) => (
                    <motion.div
                        key={travel.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Card className="hover:border-primary/50 transition-all shadow-sm relative group overflow-hidden h-full flex flex-col">
                            {travel.images && travel.images.length > 0 && (
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={travel.images[0]}
                                        alt={travel.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <Badge className="bg-black/60 backdrop-blur-md border-none flex items-center gap-1.5">
                                            <ImageIcon size={12} /> {travel.images.length}
                                        </Badge>
                                    </div>
                                </div>
                            )}

                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-xl font-bold line-clamp-1">{travel.title}</CardTitle>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                                            <Link to={`/admin/travel/edit/${travel.id}`}>
                                                <Edit2 size={14} />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(travel.id)}
                                            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                                        >
                                            <Trash2 size={14} />
                                        </Button>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 text-primary text-sm font-medium">
                                    <MapPin size={14} />
                                    {travel.location}
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4 pt-0">
                                <div className="flex items-center gap-1.5 text-muted-foreground text-xs border-b border-border/50 pb-2">
                                    <Calendar size={14} />
                                    {new Date(travel.visitDate).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                                    {travel.description}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}

                {travels.length === 0 && (
                    <Card className="col-span-full flex flex-col items-center justify-center py-20 border-dashed bg-muted/20">
                        <Plane size={48} className="text-muted-foreground mb-4 opacity-50" />
                        <p className="text-muted-foreground font-medium text-lg">No travel entries found.</p>
                        <Button asChild variant="link" className="mt-2">
                            <Link to="/admin/travel/new">Add your first adventure</Link>
                        </Button>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default TravelList;
