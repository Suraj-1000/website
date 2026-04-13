import { useState, useEffect } from 'react';
import api from '../../../utils/api';
import { Plus, Trash2, Edit2, Users, Mail, Phone, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

const ReferenceList = () => {
    const [references, setReferences] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReferences = async () => {
        try {
            const res = await api.get('/references');
            setReferences(res.data.data);
        } catch (error) {
            console.error('Failed to fetch references:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReferences();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this reference?')) return;
        try {
            await api.delete(`/references/${id}`);
            setReferences(references.filter(ref => ref.id !== id));
        } catch (error) {
            console.error('Failed to delete reference:', error);
            alert('Failed to delete reference');
        }
    };

    if (loading) return <div className="text-center p-10">Loading...</div>;

    return (
        <section className="px-6 py-8 space-y-8 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
                        Professional References
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage your network of professional and academic references
                    </p>
                </div>
                <Button asChild size="sm" className="gap-2 shadow-sm">
                    <Link to="/admin/references/new">
                        <Plus size={16} /> Add Reference
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {references.map((ref) => (
                    <div key={ref.id}>
                        <Card className="hover:border-primary/30 transition-all shadow-sm relative group rounded-md h-full flex flex-col">
                            <CardHeader className="flex flex-row items-center justify-between pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 flex items-center justify-center bg-secondary/50 border border-border rounded-full text-secondary-foreground">
                                        <Users size={18} />
                                    </div>
                                    <CardTitle className="text-base font-bold">{ref.name}</CardTitle>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="outline" size="icon" asChild className="h-8 w-8 rounded-md">
                                        <Link to={`/admin/references/edit/${ref.id}`}>
                                            <Edit2 size={14} />
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleDelete(ref.id)}
                                        className="h-8 w-8 rounded-md text-red-500 hover:text-red-500 hover:bg-red-500/10"
                                    >
                                        <Trash2 size={14} />
                                    </Button>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4 pt-0">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                                        <Building2 size={12} />
                                        {ref.position} @ {ref.company}
                                    </div>
                                    <div className="flex flex-col gap-1.5 pt-2 border-t border-border/50">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                                            <Mail size={12} />
                                            {ref.email}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Phone size={12} />
                                            {ref.phone}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/50 pt-2">
                                    Relation: {ref.relationship}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ))}
                {references.length === 0 && (
                    <div className="col-span-full text-center py-10 text-muted-foreground text-sm">
                        No references found. Add some!
                    </div>
                )}
            </div>
        </section>
    );
};

export default ReferenceList;
