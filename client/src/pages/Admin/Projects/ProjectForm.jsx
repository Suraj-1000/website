import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../utils/api';
import { useForm, useFieldArray } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Plus, X, Globe, Github } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Textarea } from '../../../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Label } from '../../../components/ui/label';

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
                    const res = await api.get('/projects');
                    const project = res.data.data.find(p => p.id === id);
                    if (project) {
                        setValue('title', project.title);
                        setValue('description', project.description);
                        setValue('repoLink', project.repoLink);
                        setValue('demoLink', project.demoLink);
                        setValue('imageUrl', project.imageUrl);

                        // Populate tech stack
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
            const formattedData = {
                ...data,
                techStack: data.techStack.map(item => item.value).filter(val => val.trim() !== '')
            };

            if (isEditing) {
                await api.put(`/projects/${id}`, formattedData);
            } else {
                await api.post('/projects', formattedData);
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
        <div className="max-w-3xl mx-auto pb-10">
            <Button
                variant="ghost"
                onClick={() => navigate('/admin/projects')}
                className="group mb-6 hover:bg-transparent -ml-2"
            >
                <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to List
            </Button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Card className="shadow-xl">
                    <CardHeader className="border-b bg-muted/20 pb-8">
                        <CardTitle className="text-3xl font-bold">
                            {isEditing ? 'Edit Project' : 'Add New Project'}
                        </CardTitle>
                        <p className="text-muted-foreground mt-2">
                            Fill details about your latest work to showcase it.
                        </p>
                    </CardHeader>

                    <CardContent className="p-8">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-base">Project Title</Label>
                                    <Input
                                        id="title"
                                        {...register('title', { required: 'Title is required' })}
                                        placeholder="e.g. Portfolio Website"
                                        className="h-11"
                                    />
                                    {errors.title && <p className="text-destructive text-sm font-medium">{errors.title.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-base">Description</Label>
                                    <Textarea
                                        id="description"
                                        {...register('description', { required: 'Description is required' })}
                                        className="min-h-[150px] resize-none"
                                        placeholder="Brief description of the project..."
                                    />
                                    {errors.description && <p className="text-destructive text-sm font-medium">{errors.description.message}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="repoLink" className="flex items-center gap-2 text-base">
                                            <Github size={16} /> Repository Link
                                        </Label>
                                        <Input
                                            id="repoLink"
                                            {...register('repoLink')}
                                            placeholder="https://github.com/..."
                                            className="h-11"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="demoLink" className="flex items-center gap-2 text-base">
                                            <Globe size={16} /> Demo Link
                                        </Label>
                                        <Input
                                            id="demoLink"
                                            {...register('demoLink')}
                                            placeholder="https://..."
                                            className="h-11"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Label className="text-base">Tech Stack</Label>
                                    <div className="space-y-3">
                                        {fields.map((field, index) => (
                                            <div key={field.id} className="flex gap-2">
                                                <Input
                                                    {...register(`techStack.${index}.value`)}
                                                    className="flex-1 h-11"
                                                    placeholder="e.g. React"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => remove(index)}
                                                    className="text-destructive hover:bg-destructive/10 h-11 w-11"
                                                >
                                                    <X size={20} />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => append({ value: '' })}
                                            className="gap-2"
                                        >
                                            <Plus size={16} /> Add Tech
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20"
                            >
                                {loading ? (
                                    'Saving...'
                                ) : (
                                    <>
                                        <Save size={20} className="mr-2" />
                                        {isEditing ? 'Update Project' : 'Save Project'}
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default ProjectForm;
