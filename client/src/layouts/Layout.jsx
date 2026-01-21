import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/molecules/Navbar';
import Footer from '../components/molecules/Footer';

// Lazy load the heavy 3D background
const ThreeBackground = lazy(() => import('../components/organisms/ThreeBackground/ThreeBackground'));

const Layout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary selection:text-white relative z-0">
            <Suspense fallback={<div className="fixed inset-0 bg-background z-[-1]" />}>
                <ThreeBackground />
            </Suspense>

            <Navbar />
            <main className="flex-grow pt-20 relative z-10">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
