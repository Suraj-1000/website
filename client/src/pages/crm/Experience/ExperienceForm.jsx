import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '@/utils/api';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { Save, ArrowLeft, Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';


const ExperienceForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm({
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
                    const res = await api.get(`/experiences`);
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
                await api.patch(`/experiences/${id}`, formattedData);
            } else {
                await api.post('/experiences', formattedData);
            }
            navigate('/crm/experience');
        } catch (error) {
            console.error('Failed to save experience', error);
            alert('Failed to save experience');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div>Loading...</div>;

    return (
        <section className="px-6 py-8 space-y-8 min-h-screen">
            <div className="max-w-3xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <Link to="/crm/experience" className="p-2 hover:bg-muted rounded-full transition-colors">
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{isEdit ? 'Edit Experience' : 'Add New Experience'}</h1>
                        <p className="text-sm text-muted-foreground mt-1">Fill in the details about your professional role</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-background border border-border p-8 rounded-md shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Role / Job Title</label>
                            <input
                                type="text"
                                {...register('role', { required: 'Role is required' })}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="e.g. Senior Software Engineer"
                            />
                            {errors.role && <p className="text-red-500 text-xs font-medium">{errors.role.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Company</label>
                            <input
                                type="text"
                                {...register('company', { required: 'Company is required' })}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="e.g. Google"
                            />
                            {errors.company && <p className="text-red-500 text-xs font-medium">{errors.company.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Location</label>
                            <input
                                type="text"
                                {...register('location', { required: 'Location is required' })}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="e.g. New York, NY"
                            />
                            {errors.location && <p className="text-red-500 text-xs font-medium">{errors.location.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Start Date</label>
                            <input
                                type="month"
                                {...register('startDate', { required: 'Start date is required' })}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            {errors.startDate && <p className="text-red-500 text-xs font-medium">{errors.startDate.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">End Date</label>
                            <div className="space-y-3">
                                <input
                                    type="month"
                                    disabled={isPresent}
                                    {...register('endDate', { required: !isPresent && 'End date is required' })}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="isPresent"
                                        {...register('isPresent')}
                                        className="size-4 border-input rounded focus:ring-primary text-primary"
                                    />
                                    <label htmlFor="isPresent" className="text-sm font-medium cursor-pointer select-none">Currently working here</label>
                                </div>
                            </div>
                            {errors.endDate && <p className="text-red-500 text-xs font-medium">{errors.endDate.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-sm font-semibold block">Key Responsibilities & Achievements</label>
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex gap-2">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        {...register(`description.${index}.value`, { required: 'Point cannot be empty' })}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="e.g. Developed a full-stack real estate application..."
                                    />
                                    {errors.description?.[index]?.value && (
                                        <p className="text-red-500 text-xs mt-1">{errors.description[index].value.message}</p>
                                    )}
                                </div>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => remove(index)}
                                    className="h-10 w-10 text-red-500 hover:bg-red-500/10 hover:text-red-500"
                                >
                                    <X size={18} />
                                </Button>
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => append({ value: '' })}
                            className="flex items-center gap-2 text-primary border-primary/20 hover:bg-primary/5 rounded-md"
                        >
                            <Plus size={14} /> Add Achievement
                        </Button>
                    </div>

                    <div className="pt-4 border-t border-border flex justify-end gap-3">
                        <Button variant="outline" asChild className="rounded-md">
                            <Link to="/crm/experience">Cancel</Link>
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="gap-2 rounded-md px-8 shadow-sm"
                        >
                            <Save size={18} />
                            {loading ? 'Saving...' : 'Save Experience'}
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ExperienceForm;
