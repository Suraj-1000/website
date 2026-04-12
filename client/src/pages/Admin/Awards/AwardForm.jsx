import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api, { API_URL as API_BASE } from '../../../utils/api';
import { useForm } from 'react-hook-form';
import { Save, ArrowLeft, Upload, X } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const AwardForm = () => {
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

    // Rich Text State
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (isEdit) {
            const fetchAward = async () => {
                try {
                    const res = await api.get(`/awards`);
                    const allAwards = res.data.data;
                    const award = allAwards.find(a => a.id === id);
                    if (award) {
                        setValue('title', award.title);
                        setValue('issuer', award.issuer);
                        setValue('date', award.date);
                        setDescription(award.description || '');

                        // Handle images (backward compatibility with 'image' field if needed, but per new model use 'images')
                        let imgs = [];
                        if (award.images && Array.isArray(award.images)) {
                            imgs = award.images;
                        } else if (award.image) {
                            imgs = [award.image];
                        }

                        // Ensure URLs are complete
                        const completeUrls = imgs.map(img =>
                            img.startsWith('http') ? img : `${API_BASE.replace('/api', '')}${img}`
                        );
                        setExistingImages(completeUrls);
                    }
                } catch (error) {
                    console.error('Failed to fetch award', error);
                } finally {
                    setFetching(false);
                }
            };
            fetchAward();
        }
    }, [id, isEdit, setValue]);

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const totalImages = existingImages.length + newImages.length + files.length;

        if (totalImages > 2) {
            alert('You can only upload a maximum of 2 images.');
            return;
        }

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

        // Revoke URL to avoid memory leak
        URL.revokeObjectURL(newImagePreviews[index]);

        setNewImages(updatedNewImages);
        setNewImagePreviews(updatedPreviews);
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const formData = new FormData();

            formData.append('title', data.title);
            formData.append('issuer', data.issuer);
            formData.append('date', data.date);
            formData.append('description', description); // Use state for Rich Text

            // Append Existing Images (as URLs, backend will handle keeping them)
            // Note: Controller expects existingImages to be the RELATIVE paths if possible, or full URLs.
            // Our controller logic handled req.body.existingImages.
            // We should send the path relative to server if possible, or handle full URL stripping in backend.
            // However, the backend logic: currentImages = Array.isArray(req.body.existingImages) ? ...
            // If we send full URL, backend saves that.
            // It's better to strip the domain if we want clean DB paths, but for now sending what we have is okay
            // providing backend doesn't double-prefix.
            // Let's rely on what we have. Ideally we strip the base URL before sending.

            existingImages.forEach(img => {
                const relativePath = img.replace(API_BASE.replace('/api', ''), '');
                formData.append('existingImages', relativePath);
            });

            // Append New Images
            newImages.forEach(file => {
                formData.append('images', file);
            });

            if (isEdit) {
                await api.patch(`/awards/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            } else {
                await api.post('/awards', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            }
            navigate('/admin/awards');
        } catch (error) {
            console.error('Failed to save award', error);
            alert('Failed to save award');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div>Loading...</div>;

    const totalCount = existingImages.length + newImages.length;

    return (
        <section className="px-6 py-8 space-y-8 min-h-screen">
            <div className="max-w-3xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <Link to="/admin/awards" className="p-2 hover:bg-muted rounded-full transition-colors">
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{isEdit ? 'Edit Award' : 'Add New Award'}</h1>
                        <p className="text-sm text-muted-foreground mt-1">Add your honors and certifications</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-background border border-border p-8 rounded-md shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Title</label>
                        <input
                            type="text"
                            {...register('title', { required: 'Title is required' })}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                        {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Issuer</label>
                        <input
                            type="text"
                            {...register('issuer', { required: 'Issuer is required' })}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                        {errors.issuer && <p className="text-red-500 text-xs">{errors.issuer.message}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold">Date</label>
                    <input
                        type="date"
                        {...register('date', { required: 'Date is required' })}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                    {errors.date && <p className="text-red-500 text-xs">{errors.date.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-semibold">Description</label>
                    <div className="bg-background border border-border rounded-md overflow-hidden">
                        <ReactQuill
                            theme="snow"
                            value={description}
                            onChange={setDescription}
                            className="h-48 mb-10 text-foreground"
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-sm font-semibold block">Award Images (Max 2)</label>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Existing Images */}
                        {existingImages.map((img, index) => (
                            <div key={`existing-${index}`} className="relative h-40 bg-muted rounded-lg overflow-hidden border border-border group">
                                <img src={img} alt="Existing" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeExistingImage(index)}
                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ))}

                        {/* New Images */}
                        {newImagePreviews.map((img, index) => (
                            <div key={`new-${index}`} className="relative h-40 bg-muted rounded-lg overflow-hidden border border-border group">
                                <img src={img} alt="New Preview" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeNewImage(index)}
                                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ))}

                        {/* Upload Button */}
                        {totalCount < 2 && (
                            <label className="relative h-40 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:bg-muted/50 transition-colors cursor-pointer">
                                <Upload size={24} className="text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">Upload Image</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    // Make sure it doesn't allow more than remaining slot
                                    // But handleFileChange checks total anyway.
                                    multiple={totalCount === 0} // Allow multiple only if 0 images so far, simplistic logic. Better to just allow always and slice in handler.
                                />
                            </label>
                        )}
                    </div>
                </div>

                    <div className="pt-4 border-t border-border flex justify-end gap-3">
                        <Button variant="outline" asChild className="rounded-md">
                            <Link to="/admin/awards">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={loading} className="gap-2 rounded-md px-8 shadow-sm">
                            <Save size={18} />
                            {loading ? 'Saving...' : 'Save Award'}
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AwardForm;
