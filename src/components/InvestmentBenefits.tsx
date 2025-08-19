import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Shield, MapPin, Users, Crown, Calculator } from "lucide-react";
import investmentImage from "@/assets/Pic4.jpg";

const InvestmentBenefits = () => {
  const benefits = [
    {
      icon: <MapPin className="w-8 h-8 text-primary" />,
      title: "Prime Strategic Location",
      description: "2 km continuous frontage ensures excellent accessibility and premium positioning"
    },
    {
      icon: <Calculator className="w-8 h-8 text-accent" />,
      title: "Affordable Entry Point",
      description: "Premium coastal property at less than a quarter-acre price point"
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Residential & Rental Investment",
      description: "Layout supports high-demand housing concepts with excellent rental potential"
    },
    {
      icon: <Crown className="w-8 h-8 text-accent" />,
      title: "Planned Community Environment",
      description: "Organised road and sidewalk network adds long-term value and appeal"
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Secure Ownership",
      description: "Title deeds available for every plot with full legal documentation"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-accent" />,
      title: "High Appreciation Potential",
      description: "Prime location and quality subdivision planning ensure capital growth"
    }
  ];

  const keyStats = [
    { label: "Total Area", value: "18 Acres", description: "Prime beachfront land" },
    { label: "Quarter Acre", value: "849 m²", description: "0.21 acres each" },
    { label: "Price From", value: "Ksh. 4M", description: "Quarter acre plots" },
    { label: "Premium Plot", value: "Ksh. 60M", description: "1-acre oceanfront" }
  ];

  return (
    <section className="py-16 bg-gradient-beach">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl font-bold mb-4 text-gradient-ocean">
            Why Invest Here?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Compelling reasons that make this beachfront property an exceptional investment opportunity.
          </p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {keyStats.map((stat, index) => (
            <Card 
              key={index}
              className="card-hover bg-white/90 backdrop-blur-sm border-0 shadow-card animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-gradient-ocean mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Investment Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <Card 
              key={index}
              className="card-hover bg-white/80 backdrop-blur-sm border-0 shadow-card animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6">
                <div className="mb-4 p-2 bg-gradient-ocean rounded-full w-fit">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-bold mb-3 text-foreground">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Investment Highlight Section */}
        <div className="relative overflow-hidden rounded-2xl shadow-luxury animate-fade-in-up">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${investmentImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="absolute inset-0 bg-gradient-hero" />
          
          <div className="relative z-10 p-8 md:p-12 text-center text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Opportunities Like This Are <span className="text-gradient-sunset">Rare</span>
            </h3>
            <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
              Those who act quickly will secure a lifetime investment in Kenya's most prestigious coastal location.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">4M</div>
                <div className="text-sm">Quarter Acre (Ksh)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">60M</div>
                <div className="text-sm">Premium 1-Acre (Ksh)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">68</div>
                <div className="text-sm">Quarter-Acre Plots</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentBenefits;