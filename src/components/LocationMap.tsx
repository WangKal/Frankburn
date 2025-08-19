import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, Building2, GraduationCap } from "lucide-react";


const LocationMap = () => {
  const coordinates = { lat: -3.199055, lng: 40.117246 };

  const nearbyPlaces = [
    {
      icon: <GraduationCap className="w-6 h-6 text-primary" />,
      name: "Sand Pipper International School",
      position: "Directly Opposite",
      distance: "0km"
    },
    {
      icon: <Building2 className="w-6 h-6 text-accent" />,
      name: "Seaview Resort & Lawfords Hotel",
      position: "Right Side Neighbor",
      distance: "0.2km"
    },
    {
      icon: <Building2 className="w-6 h-6 text-accent" />,
      name: "Ocean Beach Resort",
      position: "Left Side Neighbor",
      distance: "0.3km"
    }
  ];

  return (
    <section className="py-24 bg-gradient-beach">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl font-bold mb-6 text-gradient-ocean">
            Prime Location & Surroundings
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Perfectly positioned in one of Malindi's most sought-after coastal zones, 
            surrounded by luxury resorts and premium amenities.This enviable location places you within walking distance to Naivas Suppermarket, Malindi complex (that host KPLC, KRA and others), Banks (KCB, NCBA, Equity Bank, and many other banks,), Police Station, luxury resorts, white sandy beaches, and the vibrant Malindi lifestyle
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Google Maps Card */}
          <div className="animate-fade-in-left">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-luxury overflow-hidden">
              <CardContent className="p-0">
                <a
                  href={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-96 bg-gradient-ocean flex items-center justify-center hover:opacity-90 transition"
                >
                  <div className="text-white text-center">
                    <MapPin className="w-16 h-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">View on Google Maps</h3>
                    <p>Click to open interactive map</p>
                  </div>
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Location Details */}
          <div className="animate-fade-in-right">
            <h3 className="text-3xl font-bold mb-8 text-gradient-sunset">
              Strategic Location Benefits
            </h3>

            <div className="space-y-6 mb-12">
              {nearbyPlaces.map((place, index) => (
                <Card 
                  key={index}
                  className="card-hover bg-white/80 backdrop-blur-sm border-0 shadow-card"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-beach rounded-full">
                        {place.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-foreground mb-1">
                          {place.name}
                        </h4>
                        <p className="text-muted-foreground">
                          {place.position} • {place.distance}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Coordinates */}
        <div className="mt-16 text-center animate-fade-in-up">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-card inline-block">
            <h3 className="text-2xl font-bold mb-4 text-gradient-ocean">Property Coordinates</h3>
            <div className="flex items-center justify-center gap-4 text-lg">
              <MapPin className="w-6 h-6 text-primary" />
              <span className="font-mono text-foreground">
                {coordinates.lat}, {coordinates.lng}
              </span>
            </div>
            <p className="text-muted-foreground mt-2">SandPiper, Malindi, Kenya</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
