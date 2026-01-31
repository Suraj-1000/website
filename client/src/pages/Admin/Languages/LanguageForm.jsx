import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../utils/api';
import { useForm } from 'react-hook-form';
import { Save, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const LanguageForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEdit);

    useEffect(() => {
        if (isEdit) {
            const fetchLanguage = async () => {
                try {
                    const res = await api.get(`/languages`);
                    const allLangs = res.data.data;
                    const lang = allLangs.find(l => l.id === id);
                    if (lang) {
                        setValue('name', lang.name);
                        setValue('proficiency', lang.proficiency);
                    }
                } catch (error) {
                    console.error('Failed to fetch language', error);
                } finally {
                    setFetching(false);
                }
            };
            fetchLanguage();
        }
    }, [id, isEdit, setValue]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            if (isEdit) {
                await api.patch(`/languages/${id}`, data);
            } else {
                await api.post('/languages', data);
            }
            navigate('/admin/languages');
        } catch (error) {
            console.error('Failed to save language', error);
            alert('Failed to save language');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link to="/admin/languages" className="p-2 hover:bg-muted rounded-full transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-2xl font-bold">{isEdit ? 'Edit Language' : 'Add New Language'}</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card border border-border p-6 rounded-xl">
                <div className="space-y-2">
                    <label className="text-sm font-medium">Language Name</label>
                    <input
                        type="text"
                        {...register('name', { required: 'Language name is required' })}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none"
                    />
                    {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Proficiency</label>
                    <select
                        {...register('proficiency', { required: 'Proficiency is required' })}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none"
                    >
                        <option value="">Select Proficiency</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Fluent">Fluent</option>
                        <option value="Native">Native</option>
                    </select>
                    {errors.proficiency && <p className="text-red-500 text-xs">{errors.proficiency.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                    <Save size={20} />
                    {loading ? 'Saving...' : 'Save Language'}
                </button>
            </form>
        </div>
    );
};

export default LanguageForm;
