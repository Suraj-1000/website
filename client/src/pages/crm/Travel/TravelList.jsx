import { useState, useEffect } from 'react';
import api, { API_URL as API_BASE } from '@/utils/api';
import { Plus, Edit2, Trash2, Plane, MapPin, Calendar, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DeleteConfirmModal } from '@/components/ui/DeleteConfirmModal';


const TravelList = () => {
    const [travels, setTravels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState(null);

    const fetchTravels = async () => {
        try {
            const res = await api.get('/travel');
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

    const confirmDelete = async () => {
        if (!deleteId) return;
        try {
            await api.delete(`/travel/${deleteId}`);
            setTravels(travels.filter(t => t.id !== deleteId));
        } catch (error) {
            console.error('Failed to delete travel', error);
        } finally {
            setDeleteId(null);
        }
    };

    if (loading) return <div className="text-center p-10">Loading...</div>;

    return (
        <section className="px-6 py-8 space-y-8 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
                        Travel Adventures
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Explore and manage your global journeys and experiences
                    </p>
                </div>
                <Button asChild size="sm" className="gap-2 shadow-sm">
                    <Link to="/crm/travel/new">
                        <Plus size={16} /> Add Adventure
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {travels.map((travel) => (
                    <div key={travel.id}>
                        <Card className="hover:border-primary/30 transition-all shadow-sm relative group overflow-hidden h-full flex flex-col rounded-md">
                            {travel.images && travel.images.length > 0 && (
                                <div className="h-40 overflow-hidden relative">
                                    <img
                                        src={travel.images[0].startsWith('http') ? travel.images[0] : `${API_BASE.replace('/api/v1', '')}${travel.images[0]}`}
                                        alt={travel.title}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://placehold.co/600x400?text=No+Image';
                                        }}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <Badge className="bg-black/40 backdrop-blur-md border-none flex items-center gap-1.5 text-[10px] py-0 px-2 rounded-sm">
                                            <ImageIcon size={10} /> {travel.images.length}
                                        </Badge>
                                    </div>
                                </div>
                            )}

                            <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <Button variant="outline" size="icon" asChild className="h-8 w-8 rounded-md bg-background/80 backdrop-blur-sm border-border/50">
                                    <Link to={`/crm/travel/edit/${travel.id}`}>
                                        <Edit2 size={14} />
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setDeleteId(travel.id)}
                                    className="h-8 w-8 rounded-md text-red-500 hover:text-red-500 hover:bg-red-500/10 bg-background/80 backdrop-blur-sm border-border/50"
                                >
                                    <Trash2 size={14} />
                                </Button>
                            </div>

                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg font-bold line-clamp-1 pr-16">{travel.title}</CardTitle>
                                <div className="flex items-center gap-1.5 text-primary text-xs font-semibold mt-1">
                                    <MapPin size={12} />
                                    {travel.location}
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4 pt-0 flex-grow">
                                <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] font-medium border-b border-border/50 pb-2 uppercase tracking-wider">
                                    <Calendar size={12} />
                                    {new Date(travel.visitDate).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </div>
                                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                    {travel.description}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                ))}

                {travels.length === 0 && (
                    <Card className="col-span-full flex flex-col items-center justify-center py-20 border-dashed bg-muted/20 rounded-md">
                        <p className="text-muted-foreground font-medium text-sm">No travel entries found.</p>
                        <Button asChild variant="link" className="mt-2 text-primary">
                            <Link to="/crm/travel/new">Add your first adventure</Link>
                        </Button>
                    </Card>
                )}
            </div>

            <DeleteConfirmModal 
                isOpen={!!deleteId} 
                onClose={() => setDeleteId(null)} 
                onConfirm={confirmDelete}
                title="Delete Travel Adventure"
                description="Are you sure you want to delete this travel entry? This action cannot be undone."
            />
        </section>
    );
};

export default TravelList;
