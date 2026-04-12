import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../utils/api';
import { useForm } from 'react-hook-form';
import { Save, ArrowLeft, GraduationCap, School, BookOpen } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Link } from 'react-router-dom';

const EducationForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditing) {
            const fetchEducation = async () => {
                try {
                    const res = await api.get('/education');
                    // Since get all returns array, find locally or implement getById backend
                    // My backend does NOT have getById public route, only protected Update.
                    // Actually, I didn't verify if GET /:id exists in route file I made.
                    // I checked controller: updateEducation uses req.params.id.
                    // But I need to fetch data to populate form.
                    // The route file I wrote: router.get('/', educationController.getEducations);
                    // It does NOT have router.get('/:id').
                    // So I must filter from the list or fix backend.
                    // For now, I'll filter from list to avoid more backend context switches, assume list is small.
                    // Wait, that's inefficient but acceptable for admin panel of portfolio.
                    const edu = res.data.find(e => e.id === id);
                    if (edu) {
                        setValue('degree', edu.degree);
                        setValue('level', edu.level);
                        setValue('institution', edu.institution);
                        setValue('address', edu.address);
                        setValue('year', edu.year);
                        setValue('startYear', edu.startYear);
                        setValue('endYear', edu.endYear);
                        setValue('grade', edu.grade);
                        setValue('icon', edu.icon);
                        setValue('color', edu.color);
                    }
                } catch (error) {
                    console.error('Failed to fetch education details', error);
                }
            };
            fetchEducation();
        }
    }, [id, isEditing, setValue]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            if (isEditing) {
                await api.put(`/education/${id}`, data);
            } else {
                await api.post('/education', data);
            }
            navigate('/admin/education');
        } catch (error) {
            console.error('Failed to save education', error);
            alert('Failed to save education');
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    return (
        <section className="px-6 py-8 space-y-8 min-h-screen">
            <div className="max-w-3xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <Link to="/admin/education" className="p-2 hover:bg-muted rounded-full transition-colors">
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            {isEditing ? 'Edit Education' : 'Add New Education'}
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">Add your academic qualifications</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-background border border-border p-8 rounded-md shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Degree / Title</label>
                            <input
                                {...register('degree', { required: 'Degree is required' })}
                                className={inputClass}
                                placeholder="e.g. BSc Hons Computer Science"
                            />
                            {errors.degree && <span className="text-red-500 text-xs font-medium">{errors.degree.message}</span>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Level</label>
                            <select {...register('level', { required: 'Level is required' })} className={inputClass}>
                                <option value="">Select Level</option>
                                <option value="School">School Level (SLC/SEE)</option>
                                <option value="+2">High School (+2)</option>
                                <option value="Bachelors">Bachelors</option>
                                <option value="Masters">Masters</option>
                                <option value="PhD">PhD</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.level && <span className="text-red-500 text-xs font-medium">{errors.level.message}</span>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold">Institution</label>
                        <input
                            {...register('institution', { required: 'Institution is required' })}
                            className={inputClass}
                            placeholder="e.g. Herald College Kathmandu"
                        />
                        {errors.institution && <span className="text-red-500 text-xs font-medium">{errors.institution.message}</span>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Start Year</label>
                            <input type="number" min="1900" max="2099"
                                {...register('startYear', { required: 'Start Year is required', min: { value: 1900, message: 'Year must be valid' }, max: { value: 2099, message: 'Year must be valid' } })}
                                className={inputClass} placeholder="YYYY"
                            />
                            {errors.startYear && <span className="text-red-500 text-xs font-medium">{errors.startYear.message}</span>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">End Year</label>
                            <input type="number" min="1900" max="2099"
                                {...register('endYear', { required: 'End Year is required', min: { value: 1900, message: 'Year must be valid' }, max: { value: 2099, message: 'Year must be valid' } })}
                                className={inputClass} placeholder="YYYY"
                            />
                            {errors.endYear && <span className="text-red-500 text-xs font-medium">{errors.endYear.message}</span>}
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Address</label>
                            <input {...register('address')} className={inputClass} placeholder="e.g. Kathmandu, Nepal" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Grade / GPA</label>
                            <input {...register('grade')} className={inputClass} placeholder="e.g. 3.75 / 4.0" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold">Icon</label>
                            <select {...register('icon')} className={inputClass}>
                                <option value="School">School</option>
                                <option value="GraduationCap">Graduation Cap</option>
                                <option value="BookOpen">Book Open</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-border flex justify-end gap-3">
                        <Button variant="outline" asChild className="rounded-md">
                            <Link to="/admin/education">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={loading} className="gap-2 rounded-md px-8 shadow-sm">
                            <Save size={18} />
                            {loading ? 'Saving...' : 'Save Education'}
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default EducationForm;
