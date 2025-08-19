import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, MapPin, Phone, Mail } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'Overview', id: 'overview' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Investment', id: 'investment' },
    { label: 'Plot Details', id: 'plots' },
    { label: 'Location', id: 'location' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-ocean border-b border-primary/10' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <MapPin className={`h-6 w-6 ${isScrolled ? 'text-primary' : 'text-white'}`} />
              <span className={`text-xl font-bold ${
                isScrolled ? 'text-primary' : 'text-white'
              }`}>
                Frankburn Plots
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    isScrolled ? 'text-foreground' : 'text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Contact Info & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden lg:flex items-center space-x-4">
                <a href="tel:+254728221665" className={`flex items-center space-x-1 text-sm ${
                  isScrolled ? 'text-foreground' : 'text-white'
                }`}>
                  <Phone className="h-4 w-4" />
                  <span>Call Now</span>
                </a>
                <a href="mailto:Idimemalindi@gmail.com" className={`flex items-center space-x-1 text-sm ${
                  isScrolled ? 'text-foreground' : 'text-white'
                }`}>
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </a>
              </div>
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 rounded-md ${
                  isScrolled ? 'text-foreground' : 'text-white'
                }`}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-primary/10">
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-2 text-foreground hover:bg-primary/5 rounded-md transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="border-t border-primary/10 pt-3 space-y-2">
                <a href="tel:+254" className="flex items-center space-x-2 px-4 py-2 text-foreground">
                  <Phone className="h-4 w-4" />
                  <span>Call Now</span>
                </a>
                <a href="mailto:info@samwokur.com" className="flex items-center space-x-2 px-4 py-2 text-foreground">
                  <Mail className="h-4 w-4" />
                  <span>Email Us</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;