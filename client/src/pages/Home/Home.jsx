import HeroSection from '../../components/organisms/HeroSection/HeroSection';
import StatsSection from '../../components/organisms/StatsSection/StatsSection';
import ExpertiseSection from '../../components/organisms/ExpertiseSection/ExpertiseSection';
import FeaturedProjectsSection from '../../components/organisms/FeaturedProjectsSection/FeaturedProjectsSection';
import CtaSection from '../../components/organisms/CtaSection/CtaSection';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="relative">
                <HeroSection />
                <div className="mt-[-80px] md:mt-[-100px] relative z-20">
                    <StatsSection />
                </div>
            </div>
            <ExpertiseSection />
            <FeaturedProjectsSection />
            <CtaSection />
        </div>
    );
};

export default Home;
