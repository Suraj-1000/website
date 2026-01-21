const StatsSection = () => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border/50 pt-8 max-w-3xl mx-auto mb-20 relative z-10">
            {[
                { label: "Years Experience", value: "2+" },
                { label: "Projects Completed", value: "10+" },
                { label: "Lines of Code", value: "50k+" },
                { label: "Coffee Consumed", value: "∞" }
            ].map((stat, i) => (
                <div key={i} className="text-center">
                    <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
            ))}
        </div>
    );
};

export default StatsSection;
