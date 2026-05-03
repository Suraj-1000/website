import React from 'react';
import { motion } from 'framer-motion';
import {
    Briefcase, Code, FolderGit2, BookOpen, Plane,
    MessageSquare, Eye, TrendingUp, Calendar,
    ArrowUpRight, Plus, ExternalLink, Award, Users,
    BarChart3, PieChart, Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

import {
    Bar, BarChart, ResponsiveContainer, XAxis, YAxis,
    CartesianGrid, Tooltip, Area, AreaChart, Pie, PieChart as RePieChart, Cell
} from "recharts";
import api from '@/utils/api';

const Dashboard = () => {
    const [counts, setCounts] = React.useState({
        experiences: 0,
        skills: 0,
        projects: 0,
        travel: 0
    });

    // Mock data for charts
    const projectViewsData = [
        { month: "Jan", views: 450 },
        { month: "Feb", views: 320 },
        { month: "Mar", views: 600 },
        { month: "Apr", views: 480 },
        { month: "May", views: 750 },
        { month: "Jun", views: 900 },
    ];

    const messageTrendsData = [
        { month: "Jan", messages: 12 },
        { month: "Feb", messages: 18 },
        { month: "Mar", messages: 15 },
        { month: "Apr", messages: 25 },
        { month: "May", messages: 20 },
        { month: "Jun", messages: 32 },
    ];

    React.useEffect(() => {
        const fetchStats = async () => {
            try {
                const [expRes, skillRes, projRes, travelRes] = await Promise.all([
                    api.get('/experiences'),
                    api.get('/skills'),
                    api.get('/projects'),
                    api.get('/travel')
                ]);

                setCounts({
                    experiences: expRes.data.data.length,
                    skills: skillRes.data.data.length,
                    projects: projRes.data.data.length,
                    travel: travelRes.data.data.length
                });
            } catch (error) {
                console.error('Failed to fetch dashboard stats', error);
            }
        };
        fetchStats();
    }, []);

    const chartConfig = {
        views: {
            label: "Views",
            color: "hsl(var(--primary))",
        },
        messages: {
            label: "Messages",
            color: "hsl(var(--secondary))",
        },
    };

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
        { label: 'Experiences', count: counts.experiences, icon: <Briefcase size={20} />, path: '/crm/experience', color: 'from-blue-500 to-cyan-500' },
        { label: 'Skills', count: counts.skills, icon: <Code size={20} />, path: '/crm/skills', color: 'from-purple-500 to-pink-500' },
        { label: 'Projects', count: counts.projects, icon: <FolderGit2 size={20} />, path: '/crm/projects', color: 'from-emerald-500 to-teal-500' },
        { label: 'Travel', count: counts.travel, icon: <Plane size={20} />, path: '/crm/travel', color: 'from-orange-500 to-yellow-500' },
    ];

    const quickActions = [
        { label: 'Add New Project', icon: <Plus size={18} />, path: '/crm/projects/new', bg: 'bg-blue-500' },
        { label: 'New Experience', icon: <Briefcase size={18} />, path: '/crm/experience/new', bg: 'bg-purple-500' },
        { label: 'Check Messages', icon: <MessageSquare size={18} />, path: '/crm/messages', bg: 'bg-emerald-500' },
        { label: 'View Portfolio', icon: <ExternalLink size={18} />, path: '/', bg: 'bg-slate-700' },
    ];

    return (
        <React.Fragment>
            <motion.section 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="px-6 py-8 space-y-8 min-h-screen"
            >
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
                            Dashboard Overview
                        </h1>
                        <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                            <Calendar size={14} />
                            Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" size="sm" className="gap-2 h-9" asChild>
                            <Link to="/">
                                <Eye size={16} />
                                View Live
                            </Link>
                        </Button>
                        <Button size="sm" asChild className="gap-2 h-9 shadow-sm">
                            <Link to="/crm/projects/new">
                                <Plus size={16} />
                                Create New
                            </Link>
                        </Button>
                    </div>
                </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="h-full">
                        <Card className="relative overflow-hidden group transition-all h-full border-border bg-background rounded-md shadow-sm">
                            <CardContent className="p-6 space-y-4">
                                <div className="flex flex-row gap-4 items-center">
                                    <div className="size-10 border border-border bg-secondary/50 rounded-full flex items-center justify-center text-primary">
                                        {React.cloneElement(stat.icon, { size: 18 })}
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-xl font-bold text-foreground leading-tight">
                                            {stat.count}
                                        </p>
                                        <h6 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                            {stat.label}
                                        </h6>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-row items-center justify-between">
                                        <p className="text-xs font-medium text-muted-foreground">
                                            Progress
                                        </p>
                                        <p className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
                                            <TrendingUp size={12} />
                                            +12%
                                        </p>
                                    </div>
                                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                                        <div className="h-full bg-primary rounded-full" style={{ width: '65%' }}></div>
                                    </div>
                                </div>
                                <Link
                                    to={stat.path}
                                    className="absolute top-4 right-4 text-muted-foreground/30 hover:text-primary transition-colors"
                                >
                                    <ArrowUpRight size={18} />
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div variants={itemVariants}>
                    <Card className="border-border">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <BarChart3 className="text-primary" size={18} />
                                <CardTitle className="text-sm font-semibold">Project Views</CardTitle>
                            </div>
                            <CardDescription>Monthly traffic to your project showcases</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] w-full">
                                <ChartContainer config={chartConfig}>
                                    <BarChart data={projectViewsData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                        <XAxis
                                            dataKey="month"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                            dy={10}
                                        />
                                        <YAxis hide />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Bar
                                            dataKey="views"
                                            fill="hsl(var(--primary))"
                                            radius={[4, 4, 0, 0]}
                                            barSize={30}
                                        />
                                    </BarChart>
                                </ChartContainer>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Card className="border-border">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Activity className="text-emerald-500" size={18} />
                                <CardTitle className="text-sm font-semibold">Message Trends</CardTitle>
                            </div>
                            <CardDescription>Inbound inquiries over the last 6 months</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[300px] w-full">
                                <ChartContainer config={chartConfig}>
                                    <AreaChart data={messageTrendsData}>
                                        <defs>
                                            <linearGradient id="colorMessages" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                                        <XAxis
                                            dataKey="month"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                            dy={10}
                                        />
                                        <YAxis hide />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Area
                                            type="monotone"
                                            dataKey="messages"
                                            stroke="#10b981"
                                            fillOpacity={1}
                                            fill="url(#colorMessages)"
                                            strokeWidth={2}
                                        />
                                    </AreaChart>
                                </ChartContainer>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity / Content Sections */}
                <motion.div className="lg:col-span-2 space-y-6" variants={itemVariants}>
                    <Card className="border-border">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-lg font-semibold">Recent Projects</CardTitle>
                                <CardDescription className="text-xs">Your most recently updated work</CardDescription>
                            </div>
                            <Link to="/crm/projects" className="text-sm text-primary hover:underline">View all</Link>
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
                                    <div className="flex gap-2 lg:opacity-0 group-hover:opacity-100 transition-opacity">
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
                <motion.div className="space-y-6" variants={itemVariants}>
                    <Card className="border-border">
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

                    <div className="bg-white dark:bg-zinc-900 border border-border rounded-md p-6 relative overflow-hidden shadow-sm">
                        <div className="relative z-10">
                            <h3 className="text-base font-bold text-foreground">Portfolio Tip</h3>
                            <p className="text-sm text-muted-foreground mt-2">
                                Keeping your projects up to date increases engagement from recruiters by 40%.
                            </p>
                            <Button variant="link" className="px-0 text-xs font-bold text-primary uppercase tracking-widest h-auto mt-4">
                                Learn More
                            </Button>
                        </div>
                        <Award className="absolute -bottom-4 -right-4 size-20 text-primary/5 -rotate-12" />
                    </div>
                    </motion.div>
                </div>
            </motion.section>
        </React.Fragment>
    );
};

export default Dashboard;
