import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import api from '../../utils/api';
import { Send, Mail, MapPin, Linkedin, Github, Twitter, Instagram } from 'lucide-react';

const Contact = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
    const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

    const onSubmit = async (data) => {
        try {
            await api.post('/contacts', data);
            setSubmitStatus('success');
            reset();
            setTimeout(() => setSubmitStatus(null), 5000); // Clear message after 5 seconds
        } catch (error) {
            console.error("Failed to send message", error);
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus(null), 5000);
        }
    };

    const contactInfo = [
        { icon: <Mail size={20} />, label: "Email", value: "suraj@example.com", href: "mailto:suraj@example.com" },
        { icon: <MapPin size={20} />, label: "Location", value: "Kathmandu, Nepal", href: "#" },
    ];

    const socialLinks = [
        { icon: <Linkedin size={20} />, href: "#", label: "LinkedIn" },
        { icon: <Github size={20} />, href: "#", label: "GitHub" },
        { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
        { icon: <Instagram size={20} />, href: "#", label: "Instagram" },
    ];

    return (
        <div className="container mx-auto px-6 py-20 min-h-screen">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Get In Touch</h2>
                    <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
                        Have a project in mind or just want to say hi? I'd love to hear from you.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Info Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="bg-card/40 border border-border/50 p-8 rounded-2xl backdrop-blur-sm">
                            <h3 className="text-2xl font-bold mb-6 text-foreground">Contact Information</h3>
                            <div className="space-y-6">
                                {contactInfo.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.href}
                                        className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group"
                                    >
                                        <div className="p-3 bg-muted/50 rounded-lg group-hover:bg-primary/10 transition-colors">
                                            {item.icon}
                                        </div>
                                        <span className="text-lg">{item.value}</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="bg-card/40 border border-border/50 p-8 rounded-2xl backdrop-blur-sm">
                            <h3 className="text-2xl font-bold mb-6 text-foreground">Follow Me</h3>
                            <div className="flex gap-4">
                                {socialLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-muted/50 rounded-lg text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-110"
                                        aria-label={link.label}
                                    >
                                        {link.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card/40 border border-border/50 p-8 rounded-2xl backdrop-blur-sm">
                            <div className="space-y-2">
                                <label className="text-sm font-medium ml-1 text-foreground">Name</label>
                                <input
                                    {...register("name", { required: "Name is required" })}
                                    type="text"
                                    className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
                                    placeholder="Your Name"
                                />
                                {errors.name && <span className="text-red-400 text-sm ml-1">{errors.name.message}</span>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium ml-1 text-foreground">Email</label>
                                <input
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                    type="email"
                                    className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
                                    placeholder="your@email.com"
                                />
                                {errors.email && <span className="text-red-400 text-sm ml-1">{errors.email.message}</span>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium ml-1 text-foreground">Phone (Optional)</label>
                                <input
                                    {...register("phone")}
                                    type="tel"
                                    className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
                                    placeholder="+1 (234) 567-890"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium ml-1 text-foreground">Subject</label>
                                <input
                                    {...register("subject", { required: "Subject is required" })}
                                    type="text"
                                    className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors"
                                    placeholder="Project Inquiry"
                                />
                                {errors.subject && <span className="text-red-400 text-sm ml-1">{errors.subject.message}</span>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium ml-1 text-foreground">Message</label>
                                <textarea
                                    {...register("message", { required: "Message is required" })}
                                    rows={4}
                                    className="w-full bg-muted/50 border border-border/50 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-colors resize-none"
                                    placeholder="How can I help you?"
                                />
                                {errors.message && <span className="text-red-400 text-sm ml-1">{errors.message.message}</span>}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold py-4 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? "Sending..." : (
                                    <>
                                        Send Message <Send size={18} />
                                    </>
                                )}
                            </button>

                            {submitStatus === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-green-500/10 border border-green-500/20 text-green-500 rounded-xl text-center font-medium"
                                >
                                    Message sent successfully! I'll get back to you soon.
                                </motion.div>
                            )}

                            {submitStatus === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-center font-medium"
                                >
                                    Failed to send message. Please try again later.
                                </motion.div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
