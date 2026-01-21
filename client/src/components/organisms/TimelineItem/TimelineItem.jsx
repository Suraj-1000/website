import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

const TimelineItem = ({ education, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 md:pl-0"
        >
            {/* Desktop Center Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border/50 -translate-x-1/2" />

            <div className={`md:flex items-center justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Content */}
                <div className="md:w-[calc(50%-2rem)] bg-card/50 backdrop-blur-sm border border-border/50 p-6 rounded-2xl hover:border-primary/50 transition-colors duration-300">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3 className="text-xl font-bold">{education.degree}</h3>
                            <p className="text-primary font-medium">{education.fieldOfStudy}</p>
                        </div>
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <GraduationCap className="text-primary" size={20} />
                        </div>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <MapPin size={14} />
                            <span>{education.institution}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={14} />
                            <span>{education.graduationYear}</span>
                        </div>
                        {education.gpa && (
                            <div className="mt-2 inline-block px-2 py-1 bg-muted/50 rounded text-xs font-semibold text-foreground">
                                GPA: {education.gpa}
                            </div>
                        )}
                    </div>
                </div>

                {/* Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background -translate-x-1.5 md:-translate-x-1/2 mt-6 md:mt-0 z-10 shadow-[0_0_10px_rgba(124,58,237,0.5)]" />

                {/* Empty Space for Grid */}
                <div className="hidden md:block md:w-[calc(50%-2rem)]" />
            </div>
        </motion.div>
    );
};

export default TimelineItem;
