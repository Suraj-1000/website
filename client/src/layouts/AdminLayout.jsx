import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Briefcase, Code, FolderGit2, BookOpen, Plane, MessageSquare, LogOut } from 'lucide-react';

const AdminLayout = () => {
    const { isAuthenticated, loading, logout } = useAuth();
    const location = useLocation();

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-background text-foreground">Loading...</div>;

    if (!isAuthenticated) return <Navigate to="/admin/login" />;

    const navItems = [
        { path: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/admin/experience', icon: <Briefcase size={20} />, label: 'Experience' },
        { path: '/admin/skills', icon: <Code size={20} />, label: 'Skills' },
        { path: '/admin/projects', icon: <FolderGit2 size={20} />, label: 'Projects' },
        { path: '/admin/education', icon: <BookOpen size={20} />, label: 'Education' },
        { path: '/admin/travel', icon: <Plane size={20} />, label: 'Travel' },
        { path: '/admin/messages', icon: <MessageSquare size={20} />, label: 'Messages' },
    ];

    return (
        <div className="flex h-screen bg-background text-foreground">
            {/* Sidebar */}
            <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
                <div className="p-6 border-b border-border">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        Admin Panel
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
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

            {/* Mobile Header (TODO: Add toggle for mobile sidebar) */}

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-background/50">
                <div className="container mx-auto p-6 md:p-10">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
