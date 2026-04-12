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
    const { isAuthenticated, user, loading, logout } = useAuth();
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

    if (!isAuthenticated || user?.role !== 'admin') return <Navigate to="/admin/login" />;

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
        <div className="flex h-screen bg-gray-100 dark:bg-zinc-950 text-foreground overflow-hidden font-sans">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 w-full bg-background border-b border-border p-4 flex justify-between items-center z-50">
                <div className="flex items-center gap-2">
                    <div className="size-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold">S</div>
                    <h1 className="text-lg font-semibold tracking-tight">Admin</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full h-8 w-8">
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={toggleSidebar} className="rounded-full h-8 w-8">
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
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
                    fixed md:static top-0 left-0 h-full w-64 bg-background border-r border-border flex flex-col z-50 transition-all duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}
                `}
            >
                <div className="h-16 border-b border-border hidden md:flex items-center px-6">
                    <div className="flex items-center gap-3">
                        <div className="size-9 bg-primary rounded-md flex items-center justify-center text-primary-foreground font-bold text-lg">S</div>
                        <h1 className="text-lg font-bold tracking-tight">PORTFOLIO</h1>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
                    <p className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Main Menu</p>
                    {navItems.map((item) => {
                        const isActive = location.pathname.startsWith(item.path);
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={closeSidebar}
                                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all text-sm group ${isActive
                                    ? 'bg-secondary text-secondary-foreground font-medium'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                    }`}
                            >
                                <span className={isActive ? 'text-primary' : 'group-hover:text-primary transition-colors'}>
                                    {isActive ? <div className="p-0.5">{item.icon}</div> : item.icon}
                                </span>
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-border mt-auto">
                    <Button
                        variant="ghost"
                        onClick={logout}
                        className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-red-500 hover:bg-red-500/10 hover:text-red-500 transition-all text-sm group justify-start h-auto"
                    >
                        <div className="p-1.5 rounded-md bg-red-500/10 group-hover:bg-red-500 group-hover:text-white transition-all">
                            <LogOut size={16} />
                        </div>
                        <span className="font-medium">Logout Session</span>
                    </Button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Desktop Header */}
                <header className="hidden md:flex h-16 bg-background border-b border-border px-8 items-center justify-between sticky top-0 z-30">
                    <h2 className="text-sm font-medium text-muted-foreground">Admin / <span className="text-foreground capitalize">{location.pathname.split('/').pop()}</span></h2>
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" onClick={toggleTheme} className="rounded-full h-9 w-9 border-border bg-background">
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </Button>
                        <div className="flex items-center gap-3 pl-4 border-l border-border">
                            <div className="flex flex-col items-end">
                                <span className="text-xs font-semibold">{user?.name || 'Admin'}</span>
                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{user?.role}</span>
                            </div>
                            <div className="size-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold">
                                {user?.name?.charAt(0) || 'A'}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto relative">
                    {/* Decorative background elements (To be removed in next commit, but simplified for now) */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/2 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
                    
                    <div className="p-6 md:p-8 max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
