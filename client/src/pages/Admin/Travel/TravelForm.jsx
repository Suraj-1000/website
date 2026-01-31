import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../utils/api';
import { Save, ArrowLeft, Plane, MapPin, Calendar, Globe, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Label } from '../../../components/ui/label';

const TravelForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        title: '',
        location: '',
        visitDate: '',
        description: '',
        images: ''
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEdit);

    useEffect(() => {
        if (isEdit) {
            const fetchTravel = async () => {
                try {
                    const res = await api.get('/travel');
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
                await api.put(`/travel/${id}`, dataToSend);
            } else {
                await api.post('/travel', dataToSend);
            }
            navigate('/admin/travel');
        } catch (error) {
            console.error('Failed to save travel', error);
            alert('Failed to save travel');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="text-center p-10">Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto pb-10">
            <Button
                variant="ghost"
                onClick={() => navigate('/admin/travel')}
                className="group mb-6 hover:bg-transparent -ml-2"
            >
                <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to List
            </Button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Card className="shadow-xl">
                    <CardHeader className="border-b bg-muted/20 pb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <Plane size={24} />
                            </div>
                            <CardTitle className="text-3xl font-bold">
                                {isEdit ? 'Edit Adventure' : 'Add New Adventure'}
                            </CardTitle>
                        </div>
                        <p className="text-muted-foreground">
                            Share your travel experiences and memories with the world.
                        </p>
                    </CardHeader>

                    <CardContent className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-base">Adventure Title</Label>
                                    <Input
                                        id="title"
                                        required
                                        placeholder="e.g. Sunset at Phewa Lake"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="h-11"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location" className="text-base flex items-center gap-2">
                                        <MapPin size={16} /> Location
                                    </Label>
                                    <Input
                                        id="location"
                                        required
                                        placeholder="e.g. Pokhara, Nepal"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="h-11"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="visitDate" className="text-base flex items-center gap-2">
                                        <Calendar size={16} /> Date of Visit
                                    </Label>
                                    <Input
                                        id="visitDate"
                                        type="date"
                                        value={formData.visitDate}
                                        onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                                        className="h-11"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="images" className="text-base flex items-center gap-2">
                                        <Globe size={16} /> Images (Comma URLs)
                                    </Label>
                                    <Input
                                        id="images"
                                        placeholder="URL1, URL2, ..."
                                        value={formData.images}
                                        onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                                        className="h-11"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-base flex items-center gap-2">
                                    <Info size={16} /> Description
                                </Label>
                                <Textarea
                                    id="description"
                                    required
                                    placeholder="Tell the story of your trip..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="min-h-[150px] resize-none"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20"
                            >
                                {loading ? (
                                    'Saving...'
                                ) : (
                                    <>
                                        <Save size={20} className="mr-2" />
                                        {isEdit ? 'Update Adventure' : 'Save Adventure'}
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default TravelForm;
