import { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { Plus, Trash2, Edit2, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

const AwardList = () => {
    const [awards, setAwards] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this award?')) return;
        try {
            await api.delete(`/awards/${id}`);
            setAwards(awards.filter(award => award.id !== id));
        } catch (error) {
            console.error('Failed to delete award:', error);
            alert('Failed to delete award');
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {awards.map((award) => (
                    <div key={award.id}>
                        <Card className="hover:border-primary/30 transition-all shadow-sm relative group rounded-md">
                            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                <Button variant="outline" size="icon" asChild className="h-8 w-8 rounded-md bg-background">
                                    <Link to={`/crm/awards/edit/${award.id}`}>
                                        <Edit2 size={14} />
                                    </Link>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => handleDelete(award.id)}
                                    className="h-8 w-8 rounded-md text-red-500 hover:text-red-500 hover:bg-red-500/10 bg-background"
                                >
                                    <Trash2 size={14} />
                                </Button>
                            </div>

                            <CardHeader className="flex flex-row items-center gap-3 pb-4">
                                <div className="size-10 flex items-center justify-center bg-secondary/50 border border-border rounded-full text-secondary-foreground">
                                    <Award size={18} />
                                </div>
                                <div>
                                    <CardTitle className="text-base font-bold line-clamp-1">{award.title}</CardTitle>
                                    <p className="text-xs text-muted-foreground">{award.issuer}</p>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-2 text-xs text-muted-foreground">
                                <p>Date: <span className="text-foreground font-medium">{award.date}</span></p>
                            </CardContent>
                        </Card>
                    </div>
                ))}
                {awards.length === 0 && (
                    <div className="col-span-full text-center py-10 text-muted-foreground text-sm">
                        No awards found. Add some!
                    </div>
                )}
            </div>
        </section>
    );
};

export default AwardList;
