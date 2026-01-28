import { useState, useEffect } from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Briefcase, Code, FolderGit2, BookOpen, Plane, MessageSquare, LogOut, Menu, X, Award, Languages, Users, Sun, Moon } from 'lucide-react';

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

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-background text-foreground">Loading...</div>;

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
        <div className="flex h-screen bg-background text-foreground overflow-hidden">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 w-full bg-card border-b border-border p-4 flex justify-between items-center z-50">
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                    Admin Panel
                </h1>
                <div className="flex items-center gap-2">
                    <button onClick={toggleTheme} className="p-2 text-foreground">
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button onClick={toggleSidebar} className="text-foreground p-1">
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={closeSidebar}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed md:static top-0 left-0 h-full w-64 bg-card border-r border-border flex flex-col z-50 transition-transform duration-300
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}
            >
                <div className="p-6 border-b border-border hidden md:flex items-center justify-between">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        Admin Panel
                    </h1>
                    <button onClick={toggleTheme} className="p-2 text-foreground hover:bg-muted rounded-full transition-colors">
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {/* Mobile Header Placeholder in Sidebar (optional spacing fix) */}
                <div className="md:hidden h-16 border-b border-border flex items-center px-6">
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        Menu
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={closeSidebar}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname.startsWith(item.path)
                                ? 'bg-primary/20 text-primary font-medium'
                                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                                }`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-border">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-500 hover:bg-red-50/10 transition-colors"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-background/50 pt-16 md:pt-0">
                <div className="container mx-auto p-6 md:p-10">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
