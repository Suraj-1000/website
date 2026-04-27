import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api, { API_URL as API_BASE } from '@/utils/api';
import { useForm } from 'react-hook-form';
import { Save, ArrowLeft, Plane, MapPin, Calendar, Globe, Info, Upload, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const TravelForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEdit);

    // Image State
    const [existingImages, setExistingImages] = useState([]); // URLs from server
    const [newImages, setNewImages] = useState([]); // File objects
    const [newImagePreviews, setNewImagePreviews] = useState([]); // Preview URLs for new files

    useEffect(() => {
        if (isEdit) {
            const fetchTravel = async () => {
                try {
                    const res = await api.get(`/travel/${id}`);
                    const travel = res.data.data;

                    if (travel) {
                        setValue('title', travel.title);
                        setValue('location', travel.location);
                        setValue('visitDate', travel.visitDate ? travel.visitDate.split('T')[0] : '');
                        setValue('description', travel.description);

                        // Handle images
                        if (travel.images && Array.isArray(travel.images)) {
                            const completeUrls = travel.images.map(img =>
                                img.startsWith('http') ? img : `${API_BASE.replace('/api/v1', '')}${img}`
                            );
                            setExistingImages(completeUrls);
                        }
                    }
                } catch (error) {
                    console.error('Failed to fetch travel', error);
                } finally {
                    setFetching(false);
                }
            };
            fetchTravel();
        }
    }, [id, isEdit, setValue]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const validFiles = files.filter(file => file.type.startsWith('image/'));
        const filePreviews = validFiles.map(file => URL.createObjectURL(file));

        setNewImages([...newImages, ...validFiles]);
        setNewImagePreviews([...newImagePreviews, ...filePreviews]);
    };

    const removeExistingImage = (index) => {
        setExistingImages(existingImages.filter((_, i) => i !== index));
    };

    const removeNewImage = (index) => {
        const updatedNewImages = newImages.filter((_, i) => i !== index);
        const updatedPreviews = newImagePreviews.filter((_, i) => i !== index);
        URL.revokeObjectURL(newImagePreviews[index]);
        setNewImages(updatedNewImages);
        setNewImagePreviews(updatedPreviews);
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('location', data.location);
            formData.append('visitDate', data.visitDate);
            formData.append('description', data.description);

            // Append Existing Images
            existingImages.forEach(img => {
                const relativePath = img.replace(API_BASE.replace('/api/v1', ''), '');
                formData.append('existingImages', relativePath);
            });

            // Append New Images
            newImages.forEach(file => {
                formData.append('images', file);
            });

            if (isEdit) {
                await api.patch(`/travel/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            } else {
                await api.post('/travel', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            }
            navigate('/crm/travel');
        } catch (error) {
            console.error('Failed to save travel', error);
            alert('Failed to save travel');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="text-center p-10">Loading...</div>;

    return (
        <div className="w-full pb-10">
            <Button
                variant="ghost"
                onClick={() => navigate('/crm/travel')}
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
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-base font-semibold">Adventure Title</Label>
                                    <Input
                                        id="title"
                                        {...register('title', { required: 'Title is required' })}
                                        placeholder="e.g. Sunset at Phewa Lake"
                                        className="h-11"
                                    />
                                    {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location" className="text-base flex items-center gap-2 font-semibold">
                                        <MapPin size={16} /> Location
                                    </Label>
                                    <Input
                                        id="location"
                                        {...register('location', { required: 'Location is required' })}
                                        placeholder="e.g. Pokhara, Nepal"
                                        className="h-11"
                                    />
                                    {errors.location && <p className="text-red-500 text-xs">{errors.location.message}</p>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="visitDate" className="text-base flex items-center gap-2 font-semibold">
                                        <Calendar size={16} /> Date of Visit
                                    </Label>
                                    <Input
                                        id="visitDate"
                                        type="date"
                                        max={new Date().toISOString().split('T')[0]}
                                        {...register('visitDate', { required: 'Date is required' })}
                                        className="h-11"
                                    />
                                    {errors.visitDate && <p className="text-red-500 text-xs">{errors.visitDate.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-base flex items-center gap-2 font-semibold">
                                        <Globe size={16} /> Upload Photos
                                    </Label>
                                    <div className="flex items-center gap-4">
                                        <label className="flex-1 relative h-11 border border-input rounded-md flex items-center justify-center gap-2 hover:bg-muted/50 transition-colors cursor-pointer text-sm font-medium">
                                            <Upload size={18} />
                                            Select Images
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Image Previews */}
                            {(existingImages.length > 0 || newImagePreviews.length > 0) && (
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {existingImages.map((img, index) => (
                                        <div key={`existing-${index}`} className="relative aspect-square bg-muted rounded-lg overflow-hidden border border-border group">
                                            <img src={img} alt="Existing" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeExistingImage(index)}
                                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                    {newImagePreviews.map((img, index) => (
                                        <div key={`new-${index}`} className="relative aspect-square bg-muted rounded-lg overflow-hidden border border-border group">
                                            <img src={img} alt="New Preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeNewImage(index)}
                                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-base flex items-center gap-2 font-semibold">
                                    <Info size={16} /> Description
                                </Label>
                                <Textarea
                                    id="description"
                                    {...register('description', { required: 'Description is required' })}
                                    placeholder="Tell the story of your trip..."
                                    className="min-h-[150px] resize-none"
                                />
                                {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
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
