import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, BedDouble, MapPin, Maximize, TrendingUp } from "lucide-react";
import type { Property } from "@/data/properties";
import { formatKshShort } from "@/lib/format";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  className?: string;
  size?: "default" | "large";
}

const PropertyCard = ({ property, className, size = "default" }: PropertyCardProps) => {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const images = property.images.slice(0, 5);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-5, 5]), { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mx.set(x);
    my.set(y);
    setActive(Math.min(images.length - 1, Math.max(0, Math.floor(x * images.length))));
  };

  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
    setActive(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={cn("group relative", className)}
    >
      <Link
        to={`/properties/${property.slug}`}
        className="block overflow-hidden rounded-[1.5rem] bg-card shadow-soft transition-shadow duration-500 hover:shadow-lift"
      >
        <div className={cn("relative overflow-hidden", size === "large" ? "aspect-[4/3.4]" : "aspect-[4/3]")}>
          {images.map((img, i) => (
            <img
              key={img.src + i}
              src={img.src}
              alt={img.caption ?? property.title}
              loading="lazy"
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-105",
                i === active ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-card opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-card/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary backdrop-blur">
              {property.type}
            </span>
            {property.badge && (
              <span className="rounded-full bg-gradient-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent-foreground">
                {property.badge}
              </span>
            )}
          </div>

          <span className="absolute right-4 top-4 grid h-10 w-10 -translate-y-2 place-items-center rounded-full bg-card text-primary opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-5 w-5" />
          </span>

          {images.length > 1 && (
            <div className="absolute inset-x-4 bottom-[4.75rem] flex gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {images.map((_, i) => (
                <span
                  key={i}
                  className={cn("h-0.5 flex-1 rounded-full transition-colors", i === active ? "bg-primary-foreground" : "bg-primary-foreground/35")}
                />
              ))}
            </div>
          )}

          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-primary-foreground">
            <div>
              {property.priceLabel && <p className="text-[11px] uppercase tracking-widest text-primary-foreground/70">{property.priceLabel}</p>}
              <p className="font-display text-2xl font-semibold leading-none">{formatKshShort(property.price)}</p>
            </div>
            {property.priceNote && (
              <span className="rounded-full border border-primary-foreground/30 px-2.5 py-0.5 text-[11px] text-primary-foreground/85">
                {property.priceNote}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-3 p-5">
          <h3 className="line-clamp-2 font-display text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
            {property.title}
          </h3>
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0 text-gold" />
            <span className="line-clamp-1">{property.location}</span>
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-3 text-xs font-medium text-muted-foreground">
            <span className="flex items-center gap-1.5"><Maximize className="h-3.5 w-3.5" />{property.size.split("·")[0].trim()}</span>
            {property.bedrooms && <span className="flex items-center gap-1.5"><BedDouble className="h-3.5 w-3.5" />{property.bedrooms} bed</span>}
            {property.rentalIncome && <span className="flex items-center gap-1.5 text-primary"><TrendingUp className="h-3.5 w-3.5" />{property.rentalIncome}</span>}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;
