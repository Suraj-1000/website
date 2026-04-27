import { useState, useEffect } from 'react';
import api, { API_URL as API_BASE } from '@/utils/api';
import { Plus, Trash2, Edit2, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DeleteConfirmModal } from '@/components/ui/DeleteConfirmModal';


const AwardList = () => {
    const [awards, setAwards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState(null);

    const fetchAwards = async () => {
        try {
            const res = await api.get('/awards');
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

    const confirmDelete = async () => {
        if (!deleteId) return;
        try {
            await api.delete(`/awards/${deleteId}`);
            setAwards(awards.filter(award => award.id !== deleteId));
        } catch (error) {
            console.error('Failed to delete award:', error);
        } finally {
            setDeleteId(null);
        }
    };

    if (loading) return <div className="text-center p-10">Loading...</div>;

    return (
        <section className="px-6 py-8 space-y-8 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        Awards
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage your honors, certifications, and recognitions
                    </p>
                </div>
                <Button asChild size="sm" className="gap-2 shadow-sm">
                    <Link to="/crm/awards/new">
                        <Plus size={16} /> Add Award
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {awards.map((award) => (
                    <div key={award.id}>
                        <Card className="hover:border-primary/30 transition-all shadow-sm relative group rounded-xl overflow-hidden bg-card/50">
                            {/* Image Section */}
                            {award.images && award.images.length > 0 && (
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={award.images[0].startsWith('http') ? award.images[0] : `${API_BASE.replace('/api/v1', '')}${award.images[0]}`}
                                        alt={award.title}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://placehold.co/600x400?text=Award+Image';
                                        }}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                </div>
                            )}

                            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <Button variant="outline" size="icon" asChild className="h-8 w-8 rounded-md bg-background/80 backdrop-blur-sm border-border/50">
                                    <Link to={`/crm/awards/edit/${award.id}`}>
                                        <Edit2 size={14} />
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => setDeleteId(award.id)}
                                    className="h-8 w-8 rounded-md text-red-500 hover:text-red-500 hover:bg-red-500/10 bg-background/80 backdrop-blur-sm border-border/50"
                                >
                                    <Trash2 size={14} />
                                </Button>
                            </div>

                            <CardHeader className="flex flex-row items-center gap-3 pb-4">
                                <div className="size-10 shrink-0 flex items-center justify-center bg-primary/10 border border-primary/20 rounded-xl text-primary shadow-sm">
                                    <Award size={18} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <CardTitle className="text-base font-bold line-clamp-1 pr-16">{award.title}</CardTitle>
                                    <p className="text-xs text-muted-foreground font-medium">{award.issuer}</p>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-3 pb-6">
                                <div className="flex items-center justify-between text-xs border-t border-border/50 pt-4">
                                    <span className="text-muted-foreground">Issue Date</span>
                                    <span className="text-foreground font-semibold">{award.date}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
                {awards.length === 0 && (
                    <div className="col-span-full text-center py-20 bg-muted/20 rounded-xl border border-dashed border-border/50">
                        <Award size={40} className="mx-auto mb-4 text-muted-foreground/30" />
                        <p className="text-muted-foreground text-sm">No awards found. Add some!</p>
                    </div>
                )}
            </div>

            <DeleteConfirmModal 
                isOpen={!!deleteId} 
                onClose={() => setDeleteId(null)} 
                onConfirm={confirmDelete}
                title="Delete Award"
                description="Are you sure you want to delete this award? This action cannot be undone."
            />
        </section>
    );
};

export default AwardList;
