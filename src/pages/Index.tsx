import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import PropertyOverview from "@/components/PropertyOverview";
import ImageGallery from "@/components/ImageGallery";
import InvestmentBenefits from "@/components/InvestmentBenefits";
import PlotDetails from "@/components/PlotDetails";
import LocationMap from "@/components/LocationMap";
import Contact from "@/components/Contact";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const AnimatedSection = ({ children, className = "", id }: { 
  children: React.ReactNode; 
  className?: string;
  id?: string;
}) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  
  return (
    <section 
      ref={ref}
      id={id}
      className={`transition-all duration-1000 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-16'
      } ${className}`}
    >
      {children}
    </section>
  );
};

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      
      <AnimatedSection id="overview" className="py-12">
        <PropertyOverview />
      </AnimatedSection>
      
      <AnimatedSection id="gallery" className="py-12">
        <ImageGallery />
      </AnimatedSection>
      
      <AnimatedSection id="investment" className="py-12">
        <InvestmentBenefits />
      </AnimatedSection>
      
      <AnimatedSection id="plots" className="py-12">
        <PlotDetails />
      </AnimatedSection>
      
      <AnimatedSection id="location" className="py-12">
        <LocationMap />
      </AnimatedSection>
      
      <AnimatedSection id="contact" className="py-12">
        <Contact />
      </AnimatedSection>
    </main>
  );
};

export default Index;
