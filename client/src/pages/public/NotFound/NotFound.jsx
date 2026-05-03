import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Ghost } from 'lucide-react';
import { Button } from '@/components/ui/button';
const INITIAL_STARS = [...Array(20)].map(() => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    width: `${Math.random() * 3}px`,
    height: `${Math.random() * 3}px`,
    delay: `${Math.random() * 5}s`,
    duration: `${2 + Math.random() * 3}s`
}));

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-6">
            <div className="max-w-2xl w-full text-center space-y-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                >
                    <div className="absolute inset-0 flex items-center justify-center blur-3xl opacity-20 bg-primary/30 rounded-full" />
                    <Ghost className="mx-auto text-primary animate-bounce mb-4" size={120} />
                    <h1 className="text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-primary to-secondary">
                        404
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                >
                    <h2 className="text-4xl font-bold tracking-tight">Lost in Space?</h2>
                    <p className="text-xl text-muted-foreground max-w-md mx-auto">
                        The page you're looking for has vanished into the digital void.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
                >
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => navigate(-1)}
                        className="w-full sm:w-auto gap-2 rounded-full px-8 h-12 text-lg hover:bg-primary/5 border-primary/20"
                    >
                        <ArrowLeft size={20} />
                        Go Back
                    </Button>
                    <Button
                        asChild
                        size="lg"
                        className="w-full sm:w-auto gap-2 rounded-full px-8 h-12 text-lg shadow-lg shadow-primary/20"
                    >
                        <Link to="/">
                            <Home size={20} />
                            Back to Home
                        </Link>
                    </Button>
                </motion.div>

                {/* Stars Background effect */}
                <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden opacity-30">
                    {INITIAL_STARS.map((star, i) => (
                        <div
                            key={i}
                            className="absolute bg-foreground rounded-full animate-pulse"
                            style={{
                                top: star.top,
                                left: star.left,
                                width: star.width,
                                height: star.height,
                                animationDelay: star.delay,
                                animationDuration: star.duration
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NotFound;
