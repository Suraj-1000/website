import { useState, useEffect } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard, Briefcase, Code, FolderGit2,
    BookOpen, Plane, MessageSquare, LogOut,
    Menu, X, Award, Languages, Users,
    Sun, Moon, ChevronRight
} from 'lucide-react';
import { Button } from '../components/ui/button';

const AdminLayout = () => {
    const { isAuthenticated, loading, logout } = useAuth();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Theme Logic
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>;

    if (!isAuthenticated) return <Navigate to="/admin/login" />;

    const navItems = [
        { path: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/admin/experience', icon: <Briefcase size={20} />, label: 'Experience' },
        { path: '/admin/skills', icon: <Code size={20} />, label: 'Skills' },
        { path: '/admin/projects', icon: <FolderGit2 size={20} />, label: 'Projects' },
        { path: '/admin/education', icon: <BookOpen size={20} />, label: 'Education' },
        { path: '/admin/travel', icon: <Plane size={20} />, label: 'Travel' },
        { path: '/admin/awards', icon: <Award size={20} />, label: 'Awards' },
        { path: '/admin/languages', icon: <Languages size={20} />, label: 'Languages' },
        { path: '/admin/references', icon: <Users size={20} />, label: 'References' },
        { path: '/admin/messages', icon: <MessageSquare size={20} />, label: 'Messages' },
    ];

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 w-full bg-card/80 backdrop-blur-md border-b border-border p-4 flex justify-between items-center z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold shadow-lg shadow-primary/20">S</div>
                    <h1 className="text-xl font-bold tracking-tight">Admin</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={toggleSidebar} className="rounded-full">
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </Button>
                </div>
            </div>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed md:static top-0 left-0 h-full w-72 bg-card border-r border-border flex flex-col z-50 transition-all duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}
                `}
            >
                <div className="p-8 border-b border-border hidden md:flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg shadow-primary/20">S</div>
                        <h1 className="text-2xl font-bold tracking-tighter">SURADJ</h1>
                    </div>
                    <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-muted-foreground hover:text-foreground rounded-xl">
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </Button>
                </div>

                <nav className="flex-1 p-6 space-y-1 overflow-y-auto custom-scrollbar">
                    <p className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Main Menu</p>
                    {navItems.map((item) => {
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={closeSidebar}
                                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${isActive
                                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 font-medium'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={isActive ? 'text-primary-foreground' : 'group-hover:text-primary transition-colors'}>
                                        {item.icon}
                                    </span>
                                    <span>{item.label}</span>
                                </div>
                                {isActive && <ChevronRight size={16} />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-border mt-auto">
                    <Button
                        variant="ghost"
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-6 w-full rounded-xl text-red-500 hover:bg-red-500/10 hover:text-red-500 transition-all font-semibold group justify-start h-auto"
                    >
                        <div className="p-2 rounded-lg bg-red-500/10 group-hover:bg-red-500 group-hover:text-white transition-all">
                            <LogOut size={20} />
                        </div>
                        <span>Logout Session</span>
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-background/30 backdrop-blur-[2px] transition-all relative">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

                <div className="container mx-auto p-6 md:p-12 max-w-7xl pt-24 md:pt-12">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
