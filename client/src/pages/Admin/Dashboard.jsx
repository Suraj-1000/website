import { motion } from 'framer-motion';
import { Briefcase, Code, FolderGit2, BookOpen, Plane, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const stats = [
        { label: 'Experiences', value: 'Manage', icon: <Briefcase size={24} />, path: '/admin/experience', color: 'text-blue-500' },
        { label: 'Skills', value: 'Manage', icon: <Code size={24} />, path: '/admin/skills', color: 'text-purple-500' },
        { label: 'Projects', value: 'Manage', icon: <FolderGit2 size={24} />, path: '/admin/projects', color: 'text-green-500' },
        { label: 'Education', value: 'Manage', icon: <BookOpen size={24} />, path: '/admin/education', color: 'text-yellow-500' },
        { label: 'Travel', value: 'Manage', icon: <Plane size={24} />, path: '/admin/travel', color: 'text-pink-500' },
        // { label: 'Messages', value: 'View', icon: <MessageSquare size={24} />, path: '/admin/messages', color: 'text-indigo-500' },
    ];

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                <p className="text-muted-foreground">Welcome to your portfolio control center.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link
                            to={stat.path}
                            className="block bg-card border border-border p-6 rounded-xl hover:bg-card/80 hover:border-primary/50 transition-all group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-lg bg-muted/50 group-hover:bg-primary/20 transition-colors ${stat.color}`}>
                                    {stat.icon}
                                </div>
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-1">{stat.label}</h3>
                            <p className="text-sm text-muted-foreground">{stat.value}</p>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
