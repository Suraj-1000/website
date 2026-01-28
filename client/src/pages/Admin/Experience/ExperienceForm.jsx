import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { Save, ArrowLeft, Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExperienceForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        defaultValues: {
            role: '',
            company: '', // company -> company
            location: '',
            startDate: '',
            endDate: '',
            isPresent: false,
            description: [{ value: '' }]
        }
    });

    const isPresent = useWatch({ control, name: 'isPresent' });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'description'
    });

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEdit);

    useEffect(() => {
        if (isEdit) {
            const fetchExperience = async () => {
                try {
                    const res = await axios.get(`http://localhost:5000/api/experiences`);
                    const allExp = res.data.data;
                    const exp = allExp.find(e => e.id === id); // Fix: use .id instead of ._id
                    if (exp) {
                        setValue('role', exp.role);
                        setValue('company', exp.company);
                        setValue('location', exp.location);
                        // Convert full date to YYYY-MM for month input
                        setValue('startDate', exp.startDate ? exp.startDate.substring(0, 7) : '');

                        if (exp.endDate === 'Present') {
                            setValue('isPresent', true);
                            setValue('endDate', '');
                        } else {
                            setValue('isPresent', false);
                            setValue('endDate', exp.endDate ? exp.endDate.substring(0, 7) : '');
                        }

                        // Handle description array
                        const descArray = exp.description && exp.description.length > 0
                            ? exp.description.map(d => ({ value: d }))
                            : [{ value: '' }];
                        setValue('description', descArray);
                    }
                } catch (error) {
                    console.error('Failed to fetch experience', error);
                } finally {
                    setFetching(false);
                }
            };
            fetchExperience();
        }
    }, [id, isEdit, setValue]);

    const onSubmit = async (data) => {
        setLoading(true);
        // Flatten description objects to array of strings
        const formattedData = {
            ...data,
            endDate: data.isPresent ? 'Present' : data.endDate,
            description: data.description.map(d => d.value).filter(val => val.trim() !== '')
        };

        // Remove helper field
        delete formattedData.isPresent;

        try {
            if (isEdit) {
                await axios.patch(`http://localhost:5000/api/experiences/${id}`, formattedData);
            } else {
                await axios.post('http://localhost:5000/api/experiences', formattedData);
            }
            navigate('/admin/experience');
        } catch (error) {
            console.error('Failed to save experience', error);
            alert('Failed to save experience');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link to="/admin/experience" className="p-2 hover:bg-muted rounded-full transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-2xl font-bold">{isEdit ? 'Edit Experience' : 'Add New Experience'}</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card border border-border p-6 rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Role / Job Title</label>
                        <input
                            type="text"
                            {...register('role', { required: 'Role is required' })}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none"
                        />
                        {errors.role && <p className="text-red-500 text-xs">{errors.role.message}</p>}
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
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Location</label>
                        <input
                            type="text"
                            {...register('location', { required: 'Location is required' })}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none"
                        />
                        {errors.location && <p className="text-red-500 text-xs">{errors.location.message}</p>}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Start Date (Month/Year)</label>
                        <input
                            type="month"
                            {...register('startDate', { required: 'Start date is required' })}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none"
                        />
                        {errors.startDate && <p className="text-red-500 text-xs">{errors.startDate.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">End Date (Month/Year)</label>
                        <div className="space-y-2">
                            <input
                                type="month"
                                disabled={isPresent}
                                {...register('endDate', { required: !isPresent && 'End date is required' })}
                                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none disabled:opacity-50"
                            />
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isPresent"
                                    {...register('isPresent')}
                                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
                                />
                                <label htmlFor="isPresent" className="text-sm cursor-pointer select-none">Currently working here</label>
                            </div>
                        </div>
                        {errors.endDate && <p className="text-red-500 text-xs">{errors.endDate.message}</p>}
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-sm font-medium block">Description Points</label>
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-2">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    {...register(`description.${index}.value`, { required: 'Description point cannot be empty' })}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-1 focus:ring-primary outline-none"
                                />
                                {errors.description?.[index]?.value && (
                                    <p className="text-red-500 text-xs">{errors.description[index].value.message}</p>
                                )}
                            </div>
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => append({ value: '' })}
                        className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                        <Plus size={16} /> Add Point
                    </button>
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                    >
                        <Save size={20} />
                        {loading ? 'Saving...' : 'Save Experience'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ExperienceForm;
