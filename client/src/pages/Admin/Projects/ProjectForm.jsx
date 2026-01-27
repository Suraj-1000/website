import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useForm, useFieldArray } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Plus, X } from 'lucide-react';

const ProjectForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;
    const { register, control, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            techStack: [{ value: '' }]
        }
    });

    // Manage dynamic tech stack fields
    const { fields, append, remove } = useFieldArray({
        control,
        name: "techStack"
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEditing) {
            const fetchProject = async () => {
                try {
                    const res = await axios.get('http://localhost:5000/api/projects');
                    const project = res.data.data.find(p => p.id === id);
                    if (project) {
                        setValue('title', project.title);
                        setValue('description', project.description);
                        setValue('repoLink', project.repoLink);
                        setValue('demoLink', project.demoLink);
                        setValue('imageUrl', project.imageUrl);

                        // Populate tech stack
                        // Backend stores array of strings ["React", "Node"]
                        // Form expects array of objects [{value: "React"}, {value: "Node"}]
                        if (project.techStack && project.techStack.length > 0) {
                            setValue('techStack', project.techStack.map(t => ({ value: t })));
                        }
                    }
                } catch (error) {
                    console.error('Failed to fetch project details', error);
                }
            };
            fetchProject();
        }
    }, [id, isEditing, setValue]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            // Convert techStack from [{value: 'React'}] back to ['React']
            const formattedData = {
                ...data,
                techStack: data.techStack.map(item => item.value).filter(val => val.trim() !== '')
            };

            if (isEditing) {
                await axios.put(`http://localhost:5000/api/projects/${id}`, formattedData, config);
            } else {
                await axios.post('http://localhost:5000/api/projects', formattedData, config);
            }
            navigate('/admin/projects');
        } catch (error) {
            console.error('Failed to save project', error);
            alert('Failed to save project');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <button
                onClick={() => navigate('/admin/projects')}
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
                    {isEditing ? 'Edit Project' : 'Add New Project'}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Project Title</label>
                        <input
                            {...register('title', { required: 'Title is required' })}
                            className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/50 outline-none"
                            placeholder="e.g. Portfolio Website"
                        />
                        {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                            {...register('description', { required: 'Description is required' })}
                            className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/50 outline-none h-32"
                            placeholder="Brief description of the project..."
                        />
                        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Repository Link</label>
                            <input
                                {...register('repoLink')}
                                className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/50 outline-none"
                                placeholder="https://github.com/..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Demo Link</label>
                            <input
                                {...register('demoLink')}
                                className="w-full bg-background border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/50 outline-none"
                                placeholder="https://..."
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Tech Stack</label>
                        <div className="space-y-3">
                            {fields.map((field, index) => (
                                <div key={field.id} className="flex gap-2">
                                    <input
                                        {...register(`techStack.${index}.value`)}
                                        className="flex-1 bg-background border border-border rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary/50 outline-none"
                                        placeholder="e.g. React"
                                    />
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
                                className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
                            >
                                <Plus size={16} /> Add Tech
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                    >
                        {loading ? 'Saving...' : <><Save size={20} /> Save Project</>}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default ProjectForm;
