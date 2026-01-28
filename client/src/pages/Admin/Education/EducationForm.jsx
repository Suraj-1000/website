import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, GraduationCap, School, BookOpen } from 'lucide-react';

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
                    const res = await axios.get('http://localhost:5000/api/education');
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
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            if (isEditing) {
                await axios.put(`http://localhost:5000/api/education/${id}`, data, config);
            } else {
                await axios.post('http://localhost:5000/api/education', data, config);
            }
            navigate('/admin/education');
        } catch (error) {
            console.error('Failed to save education', error);
            alert('Failed to save education');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <button
                onClick={() => navigate('/admin/education')}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
                <ArrowLeft size={20} /> Back to List
            </button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border/50 rounded-xl p-8 shadow-lg"
            >
                <h2 className="text-2xl font-bold mb-6">
                    {isEditing ? 'Edit Education' : 'Add New Education'}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Degree / Title</label>
                        <input
                            {...register('degree', { required: 'Degree is required' })}
                            className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/50 outline-none"
                            placeholder="e.g. BSc Hons Computer Science"
                        />
                        {errors.degree && <span className="text-red-500 text-sm">{errors.degree.message}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Level</label>
                        <select
                            {...register('level', { required: 'Level is required' })}
                            className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/50 outline-none"
                        >
                            <option value="">Select Level</option>
                            <option value="School">School Level (SLC/SEE)</option>
                            <option value="+2">High School (+2)</option>
                            <option value="Bachelors">Bachelors</option>
                            <option value="Masters">Masters</option>
                            <option value="PhD">PhD</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.level && <span className="text-red-500 text-sm">{errors.level.message}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Institution</label>
                        <input
                            {...register('institution', { required: 'Institution is required' })}
                            className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/50 outline-none"
                            placeholder="e.g. Herald College Kathmandu"
                        />
                        {errors.institution && <span className="text-red-500 text-sm">{errors.institution.message}</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Start Year</label>
                                <input
                                    type="number"
                                    min="1900"
                                    max="2099"
                                    {...register('startYear', {
                                        required: 'Start Year is required',
                                        min: { value: 1900, message: 'Year must be valid' },
                                        max: { value: 2099, message: 'Year must be valid' }
                                    })}
                                    className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/50 outline-none"
                                    placeholder="YYYY"
                                />
                                {errors.startYear && <span className="text-red-500 text-sm">{errors.startYear.message}</span>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">End Year</label>
                                <input
                                    type="number"
                                    min="1900"
                                    max="2099"
                                    {...register('endYear', {
                                        required: 'End Year is required',
                                        min: { value: 1900, message: 'Year must be valid' },
                                        max: { value: 2099, message: 'Year must be valid' }
                                    })}
                                    className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/50 outline-none"
                                    placeholder="YYYY"
                                />
                                {errors.endYear && <span className="text-red-500 text-sm">{errors.endYear.message}</span>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Address</label>
                            <input
                                {...register('address')}
                                className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/50 outline-none"
                                placeholder="e.g. Kathmandu, Nepal"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Grade / GPA</label>
                        <input
                            {...register('grade')}
                            className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/50 outline-none"
                            placeholder="e.g. 3.75 / 4.0"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Icon</label>
                        <select
                            {...register('icon')}
                            className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/50 outline-none"
                        >
                            <option value="School">School</option>
                            <option value="GraduationCap">Graduation Cap</option>
                            <option value="BookOpen">Book Open</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                    >
                        {loading ? 'Saving...' : <><Save size={20} /> Save Education</>}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default EducationForm;
