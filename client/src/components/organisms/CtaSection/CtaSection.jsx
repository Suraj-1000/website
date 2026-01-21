import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const CtaSection = () => {
    return (
        <section className="py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10" />
            <div className="container mx-auto px-6 relative z-10 text-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to start a project?</h2>
                <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Whether you need a full-stack application, an AI integration, or just want to say hi, I'm always open to new ideas.
                </p>
                <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-transform shadow-2xl"
                >
                    Let's Talk <Mail size={20} />
                </Link>
            </div>
        </section>
    );
};

export default CtaSection;
