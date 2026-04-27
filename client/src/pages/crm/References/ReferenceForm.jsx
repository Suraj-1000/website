import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api, { API_URL as API_BASE } from '@/utils/api';

import { useForm } from 'react-hook-form';
import { Save, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ReferenceForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEdit);
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    useEffect(() => {
        if (isEdit) {
            const fetchReference = async () => {
                try {
                    const res = await api.get(`/references/${id}`);
                    const ref = res.data.data;
                    if (ref) {
                        setValue('name', ref.name);
                        setValue('position', ref.position);
                        setValue('company', ref.company);
                        setValue('email', ref.email);
                        setValue('phone', ref.phone);
                        setValue('relationship', ref.relationship);
                        if (ref.imageUrl) {
                            const fullUrl = ref.imageUrl.startsWith('http') ? ref.imageUrl : `${API_BASE.replace('/api/v1', '')}${ref.imageUrl}`;
                            setPreviewUrl(fullUrl);
                        }
                    }
                } catch (error) {
                    console.error('Failed to fetch reference', error);
                } finally {
                    setFetching(false);
                }
            };
            fetchReference();
        }
    }, [id, isEdit, setValue]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('position', data.position);
            formData.append('company', data.company);
            if (data.email) formData.append('email', data.email);
            if (data.phone) formData.append('phone', data.phone);
            if (data.relationship) formData.append('relationship', data.relationship);

            if (imageFile) {
                formData.append('imageUrl', imageFile);
            }

            if (isEdit) {
                await api.patch(`/references/${id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await api.post('/references', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            navigate('/crm/references');
        } catch (error) {
            console.error('Failed to save reference', error);
            alert('Failed to save reference');
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    if (fetching) return <div>Loading...</div>;

    return (
        <div className="w-full space-y-6">
            <div className="flex items-center gap-4">
                <Link to="/crm/references" className="p-2 hover:bg-muted rounded-full transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-2xl font-bold">{isEdit ? 'Edit Reference' : 'Add New Reference'}</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card border border-border p-6 rounded-xl">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <input
                        type="text"
                        {...register('name', { required: 'Name is required' })}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none"
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Position</label>
                        <input
                            type="text"
                            {...register('position', { required: 'Position is required' })}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none"
                        />
                        {errors.position && <p className="text-red-500 text-xs">{errors.position.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Company</label>
                        <input
                            type="text"
                            {...register('company', { required: 'Company is required' })}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none"
                        />
                        {errors.company && <p className="text-red-500 text-xs">{errors.company.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <input
                            type="email"
                            {...register('email')}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Phone</label>
                        <input
                            type="text"
                            {...register('phone')}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Relationship (e.g. Manager)</label>
                    <input
                        type="text"
                        {...register('relationship')}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Profile Image</label>
                    <div className="flex flex-col gap-4">
                        {previewUrl && (
                            <div className="relative size-24 rounded-full overflow-hidden border border-border">
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setPreviewUrl('');
                                        setImageFile(null);
                                    }}
                                    className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                                >
                                    <span className="text-xs font-bold">Remove</span>
                                </button>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="text-xs text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                    <Save size={20} />
                    {loading ? 'Saving...' : 'Save Reference'}
                </button>
            </form>
        </div>
    );
};

export default ReferenceForm;
