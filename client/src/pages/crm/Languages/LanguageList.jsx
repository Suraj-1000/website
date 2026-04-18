import { useState, useEffect } from 'react';
import api from '@/utils/api';
import { Plus, Trash2, Edit2, Languages } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';


const LanguageList = () => {
    const [languages, setLanguages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLanguages = async () => {
        try {
            const res = await api.get('/languages');
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
        try {
            await api.delete(`/languages/${id}`);
            setLanguages(languages.filter(lang => lang.id !== id));
        } catch (error) {
            console.error('Failed to delete language:', error);
        }
    };

    if (loading) return <div className="text-center p-10">Loading...</div>;

    return (
        <section className="px-6 py-8 space-y-8 min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-3">
                        Languages
                    </h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage your linguistic proficiencies and communication skills
                    </p>
                </div>
                <Button asChild size="sm" className="gap-2 shadow-sm">
                    <Link to="/crm/languages/new">
                        <Plus size={16} /> Add Language
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {languages.map((lang) => (
                    <div key={lang.id}>
                        <Card className="hover:border-primary/30 transition-all shadow-sm relative group rounded-md">
                            <CardHeader className="flex flex-row items-center justify-between pb-6">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 flex items-center justify-center bg-secondary/50 border border-border rounded-full text-secondary-foreground">
                                        <Languages size={18} />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base font-bold">{lang.name}</CardTitle>
                                        <Badge variant="secondary" className="bg-secondary text-secondary-foreground font-medium text-[10px] rounded-sm mt-1">
                                            {lang.proficiency}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="outline" size="icon" asChild className="h-8 w-8 rounded-md">
                                        <Link to={`/crm/languages/edit/${lang.id}`}>
                                            <Edit2 size={14} />
                                        </Link>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => handleDelete(lang.id)}
                                        className="h-8 w-8 rounded-md text-red-500 hover:text-red-500 hover:bg-red-500/10"
                                    >
                                        <Trash2 size={14} />
                                    </Button>
                                </div>
                            </CardHeader>
                        </Card>
                    </div>
                ))}
                {languages.length === 0 && (
                    <div className="col-span-full text-center py-10 text-muted-foreground text-sm">
                        No languages found. Add some!
                    </div>
                )}
            </div>
        </section>
    );
};

export default LanguageList;
