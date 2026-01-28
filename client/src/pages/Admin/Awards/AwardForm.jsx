import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Save, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AwardForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEdit);

    useEffect(() => {
        if (isEdit) {
            const fetchAward = async () => {
                try {
                    const res = await axios.get(`http://localhost:5000/api/awards`);
                    const allAwards = res.data.data;
                    const award = allAwards.find(a => a.id === id);
                    if (award) {
                        setValue('title', award.title);
                        setValue('issuer', award.issuer);
                        setValue('date', award.date);
                        setValue('description', award.description);
                        setValue('image', award.image);
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

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            if (isEdit) {
                await axios.patch(`http://localhost:5000/api/awards/${id}`, data, config);
            } else {
                await axios.post('http://localhost:5000/api/awards', data, config);
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

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link to="/admin/awards" className="p-2 hover:bg-muted rounded-full transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-2xl font-bold">{isEdit ? 'Edit Award' : 'Add New Award'}</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card border border-border p-6 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <input
                            type="text"
                            {...register('title', { required: 'Title is required' })}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none"
                        />
                        {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Issuer</label>
                        <input
                            type="text"
                            {...register('issuer', { required: 'Issuer is required' })}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none"
                        />
                        {errors.issuer && <p className="text-red-500 text-xs">{errors.issuer.message}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Date</label>
                    <input
                        type="date"
                        {...register('date', { required: 'Date is required' })}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none"
                    />
                    {errors.date && <p className="text-red-500 text-xs">{errors.date.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                        {...register('description')}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none min-h-[100px]"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Image URL (Optional)</label>
                    <input
                        type="text"
                        {...register('image')}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none"
                        placeholder="https://..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                    <Save size={20} />
                    {loading ? 'Saving...' : 'Save Award'}
                </button>
            </form>
        </div>
    );
};

export default AwardForm;
