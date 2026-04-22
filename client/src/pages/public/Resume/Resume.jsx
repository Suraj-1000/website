import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '@/utils/api';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Download, Printer, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Resume = () => {
    const [data, setData] = useState({
        profile: null,
        experiences: [],
        education: [],
        skills: [],
        projects: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResumeData = async () => {
            try {
                const [profile, experiences, education, skills, projects] = await Promise.all([
                    api.get('/profile'),
                    api.get('/experiences'),
                    api.get('/education'),
                    api.get('/skills'),
                    api.get('/projects')
                ]);

                setData({
                    profile: profile.data.data,
                    experiences: experiences.data.data,
                    education: education.data.data,
                    skills: skills.data.data,
                    projects: projects.data.data
                });
            } catch (error) {
                console.error('Failed to fetch resume data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchResumeData();
    }, []);

    const handlePrint = () => {
        window.print();
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    const { profile, experiences, education, skills, projects } = data;

    if (!profile) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6 text-center">
                <h1 className="text-2xl font-bold mb-4">No Profile Data Found</h1>
                <p className="text-muted-foreground mb-6">Please set up your resume profile in the CRM first.</p>
                <Link to="/">
                    <Button variant="outline" className="gap-2">
                        <ArrowLeft size={18} /> Back to Portfolio
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
            {/* Action Bar - Hidden on Print */}
            <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center print:hidden">
                <Link to="/">
                    <Button variant="ghost" className="gap-2">
                        <ArrowLeft size={18} /> Portfolio
                    </Button>
                </Link>
                <div className="flex gap-3">
                    <Button onClick={handlePrint} className="gap-2">
                        <Printer size={18} /> Print / Save as PDF
                    </Button>
                </div>
            </div>

            {/* Resume Sheet */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 shadow-2xl dark:shadow-none border border-zinc-200 dark:border-zinc-800 p-8 md:p-12 print:shadow-none print:border-none print:p-0 print:m-0 print:text-black dark:print:text-black"
            >
                {/* Header */}
                <header className="border-b-2 border-primary pb-8 mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 mb-2">
                            {profile.fullName}
                        </h1>
                        <p className="text-xl text-primary font-medium">Software Engineer & Full Stack Developer</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <div className="flex items-center gap-2">
                            <Mail size={14} className="text-primary" />
                            <span>{profile.email}</span>
                        </div>
                        {profile.phone && (
                            <div className="flex items-center gap-2">
                                <Phone size={14} className="text-primary" />
                                <span>{profile.phone}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-primary" />
                            <span>{profile.location || 'Nepal'}</span>
                        </div>
                        {profile.portfolio && (
                            <div className="flex items-center gap-2">
                                <Globe size={14} className="text-primary" />
                                <span>{profile.portfolio.replace(/^https?:\/\//, '')}</span>
                            </div>
                        )}
                    </div>
                </header>

                {/* Summary */}
                {profile.summary && (
                    <section className="mb-10">
                        <h2 className="text-lg font-bold uppercase tracking-widest text-primary mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-1">Professional Summary</h2>
                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                            {profile.summary}
                        </p>
                    </section>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Left Column - Experience, Projects, Education */}
                    <div className="md:col-span-2 space-y-10">
                        {/* Experience */}
                        <section>
                            <h2 className="text-lg font-bold uppercase tracking-widest text-primary mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-1">Work Experience</h2>
                            <div className="space-y-8">
                                {experiences.map((exp) => (
                                    <div key={exp.id} className="relative pl-4 border-l-2 border-zinc-100 dark:border-zinc-800">
                                        <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary ring-4 ring-white dark:ring-zinc-900" />
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-bold text-zinc-900 dark:text-zinc-100">{exp.role}</h3>
                                                <p className="text-zinc-600 dark:text-zinc-400 font-medium">{exp.company}</p>
                                            </div>
                                            <span className="text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded text-zinc-600 dark:text-zinc-400 font-mono whitespace-nowrap">
                                                {exp.startDate} - {exp.endDate}
                                            </span>
                                        </div>
                                        <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1 list-disc ml-4">
                                            {exp.description.map((point, idx) => (
                                                <li key={idx}>{point}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Selected Projects */}
                        <section>
                            <h2 className="text-lg font-bold uppercase tracking-widest text-primary mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-1">Key Projects</h2>
                            <div className="space-y-6">
                                {projects.filter(p => !p.repoLink?.includes('test')).slice(0, 4).map((project) => (
                                    <div key={project.id}>
                                        <div className="flex justify-between items-center mb-1">
                                            <h3 className="font-bold text-zinc-900 dark:text-zinc-100">{project.title}</h3>
                                            {project.demoLink && <span className="text-[10px] text-zinc-400 font-mono">{project.demoLink.replace(/^https?:\/\//, '')}</span>}
                                        </div>
                                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">{project.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.techStack?.map((tech, idx) => (
                                                <span key={idx} className="text-[10px] px-2 py-0.5 bg-primary/5 text-primary border border-primary/20 rounded">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column - Skills, Education, Socials */}
                    <div className="space-y-10">
                        {/* Skills */}
                        <section>
                            <h2 className="text-lg font-bold uppercase tracking-widest text-primary mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-1">Skills</h2>
                            <div className="space-y-6">
                                {skills.map((category) => (
                                    <div key={category.id}>
                                        <h3 className="text-xs font-bold text-zinc-400 uppercase mb-3">{category.category}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {category.items.map((skill, idx) => (
                                                <span key={idx} className="text-xs font-medium px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded border border-zinc-200 dark:border-zinc-700">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Education */}
                        <section>
                            <h2 className="text-lg font-bold uppercase tracking-widest text-primary mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-1">Education</h2>
                            <div className="space-y-6">
                                {education.map((edu) => (
                                    <div key={edu.id}>
                                        <h3 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm leading-tight">{edu.degree}</h3>
                                        <p className="text-xs text-primary font-medium mt-1">{edu.institution}</p>
                                        <p className="text-[10px] text-zinc-500 mt-1">{edu.startYear} - {edu.endYear} | {edu.address}</p>
                                        {edu.grade && <p className="text-[10px] font-bold text-zinc-400 mt-1">Grade: {edu.grade}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Social Presence */}
                        <section className="print:hidden">
                            <h2 className="text-lg font-bold uppercase tracking-widest text-primary mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-1">Online Presence</h2>
                            <div className="space-y-3">
                                {profile.linkedin && (
                                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400 hover:text-primary transition-colors">
                                        <Linkedin size={16} /> LinkedIn
                                    </a>
                                )}
                                {profile.github && (
                                    <a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400 hover:text-primary transition-colors">
                                        <Github size={16} /> GitHub
                                    </a>
                                )}
                                {profile.portfolio && (
                                    <a href={profile.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400 hover:text-primary transition-colors">
                                        <Globe size={16} /> Portfolio
                                    </a>
                                )}
                            </div>
                        </section>
                    </div>
                </div>

                {/* Print Footer */}
                <footer className="hidden print:block mt-20 pt-8 border-t border-zinc-100 text-center text-[10px] text-zinc-400">
                    Generated from {profile.portfolio || 'my portfolio website'}
                </footer>
            </motion.div>

            {/* Custom Print Styles */}
            <style dangerouslySetInnerHTML={{ __html: `
                @media print {
                    @page {
                        margin: 20mm;
                    }
                    body {
                        background: white !important;
                        color: black !important;
                    }
                    .bg-background, .bg-zinc-50, .bg-zinc-950 {
                        background: white !important;
                    }
                    .text-zinc-50, .text-zinc-100, .text-zinc-300, .dark\\:text-zinc-50, .dark\\:text-zinc-300 {
                        color: black !important;
                    }
                    .text-zinc-400, .text-zinc-500, .text-muted-foreground {
                        color: #666 !important;
                    }
                    .text-primary {
                        color: #7c3aed !important;
                        -webkit-print-color-adjust: exact;
                    }
                    .bg-primary {
                        background-color: #7c3aed !important;
                        -webkit-print-color-adjust: exact;
                    }
                    .bg-primary\\/5 {
                        background-color: #f5f3ff !important;
                        -webkit-print-color-adjust: exact;
                    }
                    .border-primary {
                        border-color: #7c3aed !important;
                        -webkit-print-color-adjust: exact;
                    }
                    .rounded-full, .rounded, .rounded-md, .rounded-xl {
                        border-radius: 4px !important;
                    }
                    .shadow-2xl, .shadow-none {
                        box-shadow: none !important;
                    }
                    nav, button, div.print\\:hidden, .print\\:hidden {
                        display: none !important;
                    }
                }
            `}} />
        </div>
    );
};

export default Resume;
