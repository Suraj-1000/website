const Footer = () => {
    return (
        <footer className="py-8 border-t border-white/10 bg-background/50 backdrop-blur-sm mt-auto">
            <div className="container mx-auto px-6 text-center text-muted-foreground text-sm">
                <p>&copy; {new Date().getFullYear()} Suraj Kanwar. All rights reserved.</p>
                <div className="flex justify-center gap-6 mt-4">
                    <a href="#" className="hover:text-primary transition-colors">GitHub</a>
                    <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
                    <a href="#" className="hover:text-primary transition-colors">Twitter</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
