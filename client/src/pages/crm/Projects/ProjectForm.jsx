import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api, { API_URL as API_BASE } from '@/utils/api';
import { useForm, useFieldArray } from 'react-hook-form';
import { Save, ArrowLeft, Plus, X, Globe, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';


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
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    useEffect(() => {
        if (isEditing) {
            const fetchProject = async () => {
                try {
                    const res = await api.get(`/projects/${id}`);
                    const project = res.data.data;
                    if (project) {
                        setValue('title', project.title);
                        setValue('description', project.description);
                        setValue('repoLink', project.repoLink);
                        setValue('demoLink', project.demoLink);
                        setValue('demoLink', project.demoLink);
                        if (project.imageUrl) {
                            const fullUrl = project.imageUrl.startsWith('http') ? project.imageUrl : `${API_BASE.replace('/api/v1', '')}${project.imageUrl}`;
                            setPreviewUrl(fullUrl);
                        }

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
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            if (data.repoLink) formData.append('repoLink', data.repoLink);
            if (data.demoLink) formData.append('demoLink', data.demoLink);

            const techStack = data.techStack.map(item => item.value).filter(val => val.trim() !== '');
            techStack.forEach(tech => formData.append('techStack[]', tech));

            if (imageFile) {
                formData.append('imageUrl', imageFile);
            }

            if (isEditing) {
                await api.put(`/projects/${id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await api.post('/projects', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            navigate('/crm/projects');
        } catch (error) {
            console.error('Failed to save project', error);
            alert('Failed to save project');
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

    return (
        <section className="px-6 py-8 space-y-8 min-h-screen">
            <div className="w-full space-y-6">
                <div className="flex items-center gap-4">
                    <Link to="/crm/projects" className="p-2 hover:bg-muted rounded-full transition-colors">
                        <ArrowLeft size={18} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            {isEditing ? 'Edit Project' : 'Add New Project'}
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1">
                            Fill details about your latest work to showcase it.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 bg-background border border-border p-8 rounded-md shadow-sm">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-sm font-semibold">Project Title</Label>
                            <Input
                                id="title"
                                {...register('title', { required: 'Title is required' })}
                                placeholder="e.g. Portfolio Website"
                                className="h-10"
                            />
                            {errors.title && <p className="text-red-500 text-xs font-medium">{errors.title.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-sm font-semibold">Description</Label>
                            <Textarea
                                id="description"
                                {...register('description', { required: 'Description is required' })}
                                className="min-h-[120px] resize-none"
                                placeholder="Brief description of the project..."
                            />
                            {errors.description && <p className="text-red-500 text-xs font-medium">{errors.description.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="repoLink" className="flex items-center gap-2 text-sm font-semibold">
                                    <Github size={14} /> Repository Link
                                </Label>
                                <Input
                                    id="repoLink"
                                    {...register('repoLink')}
                                    placeholder="https://github.com/..."
                                    className="h-10"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="demoLink" className="flex items-center gap-2 text-sm font-semibold">
                                    <Globe size={14} /> Demo Link
                                </Label>
                                <Input
                                    id="demoLink"
                                    {...register('demoLink')}
                                    placeholder="https://..."
                                    className="h-10"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-sm font-semibold">Project Image</Label>
                            <div className="flex flex-col gap-4">
                                {previewUrl && (
                                    <div className="relative w-full aspect-video md:w-64 rounded-lg overflow-hidden border border-border">
                                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2 h-6 w-6 rounded-full"
                                            onClick={() => {
                                                setPreviewUrl('');
                                                setImageFile(null);
                                            }}
                                        >
                                            <X size={12} />
                                        </Button>
                                    </div>
                                )}
                                <div className="flex items-center gap-4">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="h-10 text-xs flex-1"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label className="text-sm font-semibold">Tech Stack</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="flex gap-2">
                                        <Input
                                            {...register(`techStack.${index}.value`)}
                                            className="flex-1 h-10"
                                            placeholder="e.g. React"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => remove(index)}
                                            className="text-red-500 hover:bg-red-500/10 hover:text-red-500 h-10 w-10"
                                        >
                                            <X size={18} />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => append({ value: '' })}
                                className="gap-2 text-primary border-primary/20 hover:bg-primary/5 rounded-md"
                            >
                                <Plus size={14} /> Add Tech
                            </Button>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-border flex justify-end gap-3">
                        <Button variant="outline" asChild className="rounded-md">
                            <Link to="/crm/projects">Cancel</Link>
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="gap-2 rounded-md px-8 shadow-sm"
                        >
                            <Save size={18} />
                            {loading ? 'Saving...' : (isEditing ? 'Update Project' : 'Save Project')}
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ProjectForm;
