import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT, telLink, whatsappLink } from "@/lib/contact";
import { cn } from "@/lib/utils";
import { EASE } from "@/components/Reveal";

const links = [
  { label: "Home", to: "/" },
  { label: "Properties", to: "/properties" },
  { label: "Beachfront Plots", to: "/properties/frankburn-beachfront-plots" },
  { label: "How it works", to: "/#how" },
  { label: "Contact", to: "/#contact" },
];

export const Logo = ({ light }: { light?: boolean }) => (
  <Link to="/" className="group flex items-center gap-3" aria-label="Frankburn Properties home">
    <span className="relative grid h-10 w-10 place-items-center rounded-full bg-gradient-gold shadow-gold transition-transform duration-500 group-hover:rotate-[360deg]">
      <span className="font-display text-lg font-bold text-accent-foreground">F</span>
    </span>
    <span className="leading-none">
      <span className={cn("block font-display text-lg font-semibold tracking-tight", light ? "text-primary-foreground" : "text-primary")}>
        Frankburn
      </span>
      <span className={cn("block text-[10px] font-semibold uppercase tracking-[0.35em]", light ? "text-gold-light" : "text-gold")}>
        Properties
      </span>
    </span>
  </Link>
);

const SiteHeader = ({ overlay = false }: { overlay?: boolean }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname, location.hash]);

  const light = overlay && !scrolled;

  const isActive = (to: string) =>
    to === "/" ? location.pathname === "/" && !location.hash : !to.includes("#") && location.pathname === to;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          light ? "bg-transparent" : "border-b border-border/60 bg-background/85 shadow-soft backdrop-blur-xl",
        )}
      >
        <div className="container flex h-20 items-center justify-between gap-6">
          <Logo light={light} />

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  light ? "text-primary-foreground/85 hover:text-primary-foreground" : "text-foreground/75 hover:text-primary",
                )}
              >
                {isActive(l.to) && (
                  <motion.span
                    layoutId="nav-pill"
                    className={cn("absolute inset-0 rounded-full", light ? "bg-primary-foreground/15" : "bg-secondary")}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={telLink(0)}
              className={cn(
                "hidden items-center gap-2 text-sm font-semibold xl:flex",
                light ? "text-primary-foreground" : "text-primary",
              )}
            >
              <Phone className="h-4 w-4" /> {CONTACT.phones[0].display}
            </a>
            <Button asChild className="hidden rounded-full bg-gradient-gold px-5 text-accent-foreground shadow-gold hover:opacity-90 sm:inline-flex">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" /> Enquire
              </a>
            </Button>
            <button
              onClick={() => setOpen((o) => !o)}
              className={cn(
                "grid h-11 w-11 place-items-center rounded-full lg:hidden",
                light ? "text-primary-foreground hover:bg-primary-foreground/10" : "text-foreground hover:bg-secondary",
              )}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 95% 4%)" }}
            animate={{ clipPath: "circle(150% at 95% 4%)" }}
            exit={{ clipPath: "circle(0% at 95% 4%)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col bg-gradient-forest px-6 pb-10 pt-28 lg:hidden"
          >
            <nav className="flex flex-col gap-2">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.6, ease: EASE }}
                >
                  <Link to={l.to} className="block py-2 font-display text-4xl text-primary-foreground hover:text-gold-light">
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto space-y-3 text-primary-foreground/80">
              {CONTACT.phones.map((p, i) => (
                <a key={p.tel} href={telLink(i)} className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gold-light" /> {p.display}
                </a>
              ))}
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4 text-gold-light" /> WhatsApp {CONTACT.whatsapp.display}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SiteHeader;
