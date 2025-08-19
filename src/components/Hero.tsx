import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import heroImage from "@/assets/Fp12.png";
import { MapPin, Star, TrendingUp } from "lucide-react";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    setIsLoaded(true);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
 {/* Dynamic Background with Parallax */}
      <div 
        className="absolute inset-0 parallax transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px) scale(1.1)`
        }}
      />
      
      {/* Animated Ocean Wave Overlay */}
      {/*<div className="absolute inset-0 wave-animation opacity-90" />*/}
      
      {/* Multiple Gradient Overlays for Depth 
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-primary-dark/30" />
      */}
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-2 h-2 bg-accent rounded-full opacity-60"></div>
      </div>
      <div className="absolute top-32 right-20 animate-float animation-delay-300">
        <div className="w-3 h-3 bg-gold-light rounded-full opacity-40"></div>
      </div>
      <div className="absolute bottom-40 left-20 animate-float animation-delay-600">
        <div className="w-4 h-4 bg-primary-light rounded-full opacity-50"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        {/* Premium Badges */}
        <div className={`flex justify-center mb-8 transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <MapPin className="w-4 h-4 text-accent mr-2" />
              <span className="text-white text-sm font-medium">Prime Beachfront</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <Star className="w-4 h-4 text-gold mr-2" />
              <span className="text-white text-sm font-medium">18 Acres Available</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
              <TrendingUp className="w-4 h-4 text-primary-light mr-2" />
              <span className="text-white text-sm font-medium">High ROI Potential</span>
            </div>
          </div>
        </div>

        {/* Main Title with Enhanced Animation */}
        <div className={`transition-all duration-1200 delay-300 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white leading-tight">
            <span className="text-gradient-ocean animate-pulse">Frankburn</span>
            <br />
            <span className="text-gradient-sunset">Beach Front Plots</span>
          </h1>
          <p className="text-2xl md:text-3xl lg:text-4xl mb-4 text-white/90 font-light">
            Exclusive Ocean Paradise
          </p>
          <p className="text-xl md:text-2xl mb-8 text-accent font-semibold">
            Sand Pipper International School, Malindi • From Ksh. 4M per acre
          </p>
        </div>
        
        {/* Description with Stagger Effect */}
        <div className={`transition-all duration-1000 delay-600 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className="text-lg md:text-xl mb-12 text-white/80 max-w-3xl mx-auto leading-relaxed">
            A rare coastal investment opportunity fronting the breathtaking Indian Ocean — prime gated community subdivided plots directly touching the sea in one of Malindi’s most sought-after locations.
          </p>
        </div>
        
        {/* Enhanced Call-to-Action Buttons */}
        <div className={`flex flex-col sm:flex-row gap-6 justify-center transition-all duration-1000 delay-900 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Button 
            size="lg" 
            className="btn-ocean text-white border-0 px-10 py-6 text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-2xl"
            onClick={scrollToContact}
          >
            Secure Your Plot Today
            <TrendingUp className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-white border-2 border-white/40 hover:bg-white/20 px-10 py-6 text-lg font-semibold backdrop-blur-md transform hover:scale-105 transition-all duration-300"
            onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Explore Gallery
            <Star className="ml-2 w-5 h-5" />
          </Button>
        </div>

        {/* Value Proposition */}
        <div className={`mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto transition-all duration-1000 delay-1200 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-2">68+1 Plots</h3>
            <p className="text-white/80 text-sm">Premium acre + quarter-acre plots</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-2">From Ksh. 4M</h3>
            <p className="text-white/80 text-sm">Quarter-acre beachfront plots</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-2">Ksh. 60M</h3>
            <p className="text-white/80 text-sm">1-acre premium oceanfront</p>
          </div>
        </div>
      </div>
      
      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center cursor-pointer hover:border-white transition-colors"
             onClick={() => document.getElementById('overview')?.scrollIntoView({ behavior: 'smooth' })}>
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
        <p className="text-white/60 text-xs mt-2">Scroll to explore</p>
      </div>
    </section>
  );
};

export default Hero;