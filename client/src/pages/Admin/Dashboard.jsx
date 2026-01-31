import React from 'react';
import { motion } from 'framer-motion';
import {
    Briefcase, Code, FolderGit2, BookOpen, Plane,
    MessageSquare, Eye, TrendingUp, Calendar,
    ArrowUpRight, Plus, ExternalLink, Award, Users,
    BarChart3, PieChart, Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "../../components/ui/chart";
import {
    Bar, BarChart, ResponsiveContainer, XAxis, YAxis,
    CartesianGrid, Tooltip, Area, AreaChart, Pie, PieChart as RePieChart, Cell
} from "recharts";

const Dashboard = () => {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    const greeting = getGreeting();

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

    const skillsData = [
        { name: "Frontend", value: 40, color: "#3b82f6" },
        { name: "Backend", value: 30, color: "#10b981" },
        { name: "UI/UX", value: 20, color: "#f59e0b" },
        { name: "Others", value: 10, color: "#6366f1" },
    ];

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
                    <Button variant="outline" className="gap-2" asChild>
                        <Link to="/">
                            <Eye size={18} />
                            View Live
                        </Link>
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
                        <Card className="relative overflow-hidden group transition-all h-full border-primary/10">
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
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-3xl font-bold mt-1 text-foreground">{stat.count}</h3>
                                    <span className="text-xs text-muted-foreground font-normal">total</span>
                                </div>
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

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div variants={itemVariants}>
                    <Card className="border-primary/10">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <BarChart3 className="text-primary" size={20} />
                                <CardTitle>Project Views</CardTitle>
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
                    <Card className="border-primary/10">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <Activity className="text-emerald-500" size={20} />
                                <CardTitle>Message Trends</CardTitle>
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
                <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
                    <Card className="border-primary/10">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-xl">Recent Projects</CardTitle>
                                <CardDescription>Your most recently updated work</CardDescription>
                            </div>
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
                <motion.div variants={itemVariants} className="space-y-6">
                    <Card className="border-primary/10">
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
