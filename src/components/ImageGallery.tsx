import { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import heroImage from "@/assets/M.JPG";
import heroImage1 from "@/assets/M1.JPG";
import heroImage3 from "@/assets/P2.JPG";
import heroImage4 from "@/assets/P3.JPG";
import heroImage5 from "@/assets/P4.JPG";
import heroImage6 from "@/assets/P5.jpg";
import plotImage from "@/assets/P6.jpg";
import plotImage1 from "@/assets/P7.jpg";
import plotImage2 from "@/assets/P8.jpg";
import investmentImage from "@/assets/P9.jpg";
import investmentImage1 from "@/assets/P10.png";
import investmentImage3 from "@/assets/P12.png";

import oheroImage from "@/assets/im1.jpeg";
import oheroImage1 from "@/assets/im3.jpeg";
import oheroImage2 from "@/assets/im2.jpeg";
import oheroImage3 from "@/assets/Fp12.png";
import oheroImage4 from "@/assets/im4.jpeg";
import oheroImage5 from "@/assets/im5.jpeg";
import oheroImage6 from "@/assets/im6.jpeg";
import oplotImage from "@/assets/FS.JPG";
import oplotImage1 from "@/assets/FS3.JPG";
import oplotImage2 from "@/assets/G2.png";
import oinvestmentImage from "@/assets/FS2.JPG";
import oinvestmentImage1 from "@/assets/G1.png";
const ImageGallery = () => {
  const [currentImage, setCurrentImage] = useState(0);
  
  // Placeholder for the 17 images mentioned by user - using our generated images as examples
  const images = [
    { src: heroImage, title: "Aerial View of Beachfront Property", description: "Stunning 18-acre beachfront land with crystal clear waters" },
    { src: heroImage1, title: "Ocean Frontage", description: "Direct access to pristine Indian Ocean waters" },
    { src: heroImage3, title: "Ocean Frontage", description: "Direct access to pristine Indian Ocean waters" },
    { src: heroImage4, title: "Ocean Frontage", description: "Direct access to pristine Indian Ocean waters" },
    { src: heroImage5, title: "Ocean Frontage", description: "Direct access to pristine Indian Ocean waters" },
    { src: heroImage6, title: "Ocean Frontage", description: "Direct access to pristine Indian Ocean waters" },
    

    { src: plotImage, title: "Plot Subdivision Layout", description: "Well-planned 72-plot subdivision with organized access roads" },
    { src: plotImage1, title: "Development Infrastructure", description: "5m wide driveways with 2m pedestrian sidewalks" },
    { src: plotImage2, title: "Development Infrastructure", description: "5m wide driveways with 2m pedestrian sidewalks" },
    
    { src: investmentImage, title: "Investment Opportunity", description: "Prime coastal investment with excellent growth potential" },
    { src: investmentImage1, title: "Sunset Views", description: "Breathtaking sunset views from your future property" },
    { src: investmentImage3, title: "Sunset Views", description: "Breathtaking sunset views from your future property" },
    

    { src: oheroImage, title: "Aerial View of Beachfront Property", description: "Stunning 18-acre beachfront land with crystal clear waters" },
    { src: oheroImage1, title: "Ocean Frontage", description: "Direct access to pristine Indian Ocean waters" },
    { src: oheroImage2, title: "Ocean Frontage", description: "Direct access to pristine Indian Ocean waters" },
    { src: oheroImage3, title: "Ocean Frontage", description: "Direct access to pristine Indian Ocean waters" },
    { src: oheroImage4, title: "Ocean Frontage", description: "Direct access to pristine Indian Ocean waters" },
    { src: oheroImage5, title: "Ocean Frontage", description: "Direct access to pristine Indian Ocean waters" },
    { src: oheroImage6, title: "Ocean Frontage", description: "Direct access to pristine Indian Ocean waters" },
    

    { src: oplotImage, title: "Plot Subdivision Layout", description: "Well-planned 72-plot subdivision with organized access roads" },
    { src: oplotImage1, title: "Development Infrastructure", description: "5m wide driveways with 2m pedestrian sidewalks" },
    { src: oplotImage2, title: "Development Infrastructure", description: "5m wide driveways with 2m pedestrian sidewalks" },
    
    { src: oinvestmentImage, title: "Investment Opportunity", description: "Prime coastal investment with excellent growth potential" },
    { src: oinvestmentImage1, title: "Sunset Views", description: "Breathtaking sunset views from your future property" },
    

  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-5xl font-bold mb-6 text-gradient-ocean">
            Property Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore stunning views of this exceptional beachfront property through our comprehensive image gallery
          </p>
        </div>

        {/* Main Gallery Viewer */}
        <div className="relative max-w-6xl mx-auto mb-12">
          <div className="relative h-96 md:h-[600px] overflow-hidden rounded-2xl shadow-luxury">
            <img
              src={images[currentImage].src}
              alt={images[currentImage].title}
              className="w-full h-full object-cover transition-all duration-500"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            {/* Image Info */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{images[currentImage].title}</h3>
              <p className="text-white/80 text-lg">{images[currentImage].description}</p>
            </div>

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 border-white/30 hover:bg-white/30 backdrop-blur-sm"
              onClick={prevImage}
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 border-white/30 hover:bg-white/30 backdrop-blur-sm"
              onClick={nextImage}
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </Button>

            {/* Fullscreen Button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-4 right-4 bg-white/20 border-white/30 hover:bg-white/30 backdrop-blur-sm"
                >
                  <Maximize2 className="w-5 h-5 text-white" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-7xl w-full h-full max-h-[90vh] p-0">
                <img
                  src={images[currentImage].src}
                  alt={images[currentImage].title}
                  className="w-full h-full object-contain"
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Thumbnail Navigation */}
        <div className="flex gap-4 overflow-x-auto pb-4 justify-center">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden transition-all duration-300 ${
                currentImage === index 
                  ? 'ring-4 ring-primary shadow-ocean scale-110' 
                  : 'opacity-70 hover:opacity-100 hover:scale-105'
              }`}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Image Counter */}
        <div className="text-center mt-8">
          <span className="text-muted-foreground text-lg">
            {currentImage + 1} of {images.length}
          </span>
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;