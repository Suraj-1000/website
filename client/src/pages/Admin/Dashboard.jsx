import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Briefcase, Code, FolderGit2, BookOpen, Plane,
    MessageSquare, Eye, TrendingUp, Calendar,
    ArrowUpRight, Plus, ExternalLink, Award, Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

const Dashboard = () => {
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    const stats = [
        { label: 'Experiences', count: '12', icon: <Briefcase size={20} />, path: '/admin/experience', color: 'from-blue-500 to-cyan-500' },
        { label: 'Skills', count: '24', icon: <Code size={20} />, path: '/admin/skills', color: 'from-purple-500 to-pink-500' },
        { label: 'Projects', count: '18', icon: <FolderGit2 size={20} />, path: '/admin/projects', color: 'from-emerald-500 to-teal-500' },
        { label: 'Travel', count: '8', icon: <Plane size={20} />, path: '/admin/travel', color: 'from-orange-500 to-yellow-500' },
    ];

    const quickActions = [
        { label: 'Add New Project', icon: <Plus size={18} />, path: '/admin/projects/new', bg: 'bg-blue-500' },
        { label: 'New Experience', icon: <Briefcase size={18} />, path: '/admin/experience/new', bg: 'bg-purple-500' },
        { label: 'Check Messages', icon: <MessageSquare size={18} />, path: '/admin/messages', bg: 'bg-emerald-500' },
        { label: 'View Portfolio', icon: <ExternalLink size={18} />, path: '/', bg: 'bg-slate-700' },
    ];

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 pb-10"
        >
            {/* Header Section */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
                        {greeting}, <span className="text-primary">Suraj</span>
                    </h1>
                    <p className="text-muted-foreground mt-1 flex items-center gap-2">
                        <Calendar size={16} />
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                        <Eye size={18} />
                        View Live
                    </Button>
                    <Button asChild className="gap-2 shadow-lg shadow-primary/20">
                        <Link to="/admin/projects/new">
                            <Plus size={18} />
                            Create New
                        </Link>
                    </Button>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ y: -5 }}
                    >
                        <Card className="relative overflow-hidden group transition-all">
                            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-[0.03] rounded-bl-full group-hover:opacity-[0.08] transition-opacity`}></div>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg shadow-current/10`}>
                                    {stat.icon}
                                </div>
                                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-none">
                                    <TrendingUp size={12} className="mr-1" />
                                    +12%
                                </Badge>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                                <h3 className="text-3xl font-bold mt-1 text-foreground">{stat.count}</h3>
                                <Link
                                    to={stat.path}
                                    className="absolute bottom-4 right-4 text-muted-foreground group-hover:text-primary transition-colors"
                                >
                                    <ArrowUpRight size={20} />
                                </Link>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity / Content Sections */}
                <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-xl">Recent Projects</CardTitle>
                            <Link to="/admin/projects" className="text-sm text-primary hover:underline">View all</Link>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border hover:bg-muted/50 transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                            <FolderGit2 size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground">Real Estate App</h4>
                                            <p className="text-xs text-muted-foreground">Updated 2 hours ago</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="icon">
                                            <ExternalLink size={16} />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Quick Actions Sidebar */}
                <motion.div variants={itemVariants} className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 gap-3">
                            {quickActions.map((action, index) => (
                                <Link
                                    key={index}
                                    to={action.path}
                                    className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/20 hover:bg-muted/50 transition-all hover:translate-x-1"
                                >
                                    <div className={`p-2 rounded-lg ${action.bg} text-white`}>
                                        {action.icon}
                                    </div>
                                    <span className="text-sm font-medium text-foreground">{action.label}</span>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>

                    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-6 relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-lg font-bold text-foreground">Portfolio Tip</h3>
                            <p className="text-sm text-muted-foreground mt-2">
                                Keeping your projects up to date increases engagement from recruiters by 40%.
                            </p>
                            <Button variant="link" className="px-0 text-xs font-bold text-primary uppercase tracking-widest h-auto mt-4">
                                Learn More
                            </Button>
                        </div>
                        <Award className="absolute -bottom-4 -right-4 w-24 h-24 text-primary/5 -rotate-12" />
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Dashboard;
