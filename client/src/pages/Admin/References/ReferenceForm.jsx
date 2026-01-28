import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
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

    useEffect(() => {
        if (isEdit) {
            const fetchReference = async () => {
                try {
                    const res = await axios.get(`http://localhost:5000/api/references`);
                    const allRefs = res.data.data;
                    const ref = allRefs.find(r => r.id === id);
                    if (ref) {
                        setValue('name', ref.name);
                        setValue('position', ref.position);
                        setValue('company', ref.company);
                        setValue('email', ref.email);
                        setValue('phone', ref.phone);
                        setValue('relationship', ref.relationship);
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
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            if (isEdit) {
                await axios.patch(`http://localhost:5000/api/references/${id}`, data, config);
            } else {
                await axios.post('http://localhost:5000/api/references', data, config);
            }
            navigate('/admin/references');
        } catch (error) {
            console.error('Failed to save reference', error);
            alert('Failed to save reference');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link to="/admin/references" className="p-2 hover:bg-muted rounded-full transition-colors">
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
