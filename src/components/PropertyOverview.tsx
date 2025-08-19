import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Waves, TreePine, Building } from "lucide-react";

const PropertyOverview = () => {
  const highlights = [
    {
      icon: <Waves className="w-8 h-8 text-primary" />,
      title: "Beachfront Access",
      description: "Direct access to pristine Indian Ocean waters"
    },
    {
      icon: <MapPin className="w-8 h-8 text-primary" />,
      title: "Prime Location",
      description: "Opposite Sand Pipper International School, near luxury resorts"
    },
    {
      icon: <TreePine className="w-8 h-8 text-accent" />,
      title: "18 Acres",
      description: "Spacious development with natural landscape"
    },
    {
      icon: <Building className="w-8 h-8 text-accent" />,
      title: "68 Quarter-Acre + 1 Acre",
      description: "Premium 1-acre plot + 68 quarter-acre plots"
    }
  ];

  return (
    <section className="py-16 bg-gradient-beach">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl font-bold mb-4 text-gradient-ocean">
            A Rare Coastal Investment Opportunity
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            18-acre prime beachfront land fronting the Indian Ocean in prestigious Malindi location.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {highlights.map((highlight, index) => (
            <Card 
              key={index} 
              className="card-hover bg-white/80 backdrop-blur-sm border-0 shadow-card animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6 text-center">
                <div className="mb-3 flex justify-center">
                  {highlight.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-foreground">
                  {highlight.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {highlight.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-luxury animate-scale-in">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gradient-ocean">
                Location & Surroundings
              </h3>
              <div className="space-y-3 text-base">
                <p className="flex items-start gap-2">
                  <span className="text-primary font-semibold">Right:</span>
                  <span>Seaview Resort & Lawfords Hotel</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-primary font-semibold">Left:</span>
                  <span>Ocean Beach Resort</span>
                </p>
                <p className="text-muted-foreground text-sm mt-4">
                  Walking distance to luxury resorts, pristine beaches, and Malindi's vibrant scene.
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gradient-sunset">
                Plot Description
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-primary/20">
                  <span className="font-semibold text-foreground">Size:</span>
                  <span className="text-primary font-bold">18 Acres</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-primary/20">
                  <span className="font-semibold text-foreground">Soil:</span>
                  <span className="text-muted-foreground">Sandy loam over coral</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-foreground">Frontage:</span>
                  <span className="text-accent font-bold">Direct Ocean Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyOverview;