import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Building2, Home, Landmark, Hotel, ShieldCheck, Search, Handshake, KeyRound, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppFab from "@/components/WhatsAppFab";
import PropertyCard from "@/components/PropertyCard";
import ContactSection from "@/components/ContactSection";
import Reveal, { EASE } from "@/components/Reveal";
import heroImg from "@/assets/hero-coast.jpg";
import { properties, featuredProperties, countByType, getProperty, coverOf, PROPERTY_TYPES, type PropertyType } from "@/data/properties";

const typeIcon: Record<PropertyType, typeof Home> = { Residential: Home, Commercial: Building2, Land: Landmark, Hospitality: Hotel };

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const flagship = getProperty("frankburn-beachfront-plots")!;
  const featured = featuredProperties.filter((p) => p.slug !== flagship.slug);

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section ref={heroRef} className="relative h-[100svh] min-h-[600px] overflow-hidden grain">
        <motion.img src={heroImg} alt="Kenyan coastline" style={{ y, scale }} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <motion.div style={{ opacity: fade }} className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-20 md:pb-28">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} className="eyebrow text-gold-light">
            Frankburn Properties · Kenya
          </motion.p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] text-primary-foreground md:text-7xl lg:text-8xl">
            {["Homes, land &", "investments", "worth owning."].map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.15 + i * 0.12, ease: EASE }} className={i === 1 ? "block italic text-gradient-gold" : "block"}>
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 1 }} className="mt-6 max-w-xl text-lg text-primary-foreground/85">
            {properties.length} hand-picked properties across Malindi, Mtwapa, Mombasa and Nairobi — from beachfront plots to resorts and city buildings.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8, ease: EASE }} className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full bg-gradient-gold text-accent-foreground shadow-gold hover:opacity-90">
              <Link to="/properties"><Search className="mr-2 h-4 w-4" />Browse properties</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <Link to={`/properties/${flagship.slug}`}><Waves className="mr-2 h-4 w-4" />Beachfront plots</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {PROPERTY_TYPES.map((t, i) => {
            const Icon = typeIcon[t];
            return (
              <Reveal key={t} delay={i * 0.08}>
                <Link to={`/properties?type=${t}`} className="group block rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-gold hover:shadow-lift">
                  <Icon className="h-8 w-8 text-gold transition-transform duration-500 group-hover:scale-110" />
                  <p className="mt-6 font-display text-2xl text-foreground">{t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{countByType(t)} listing{countByType(t) === 1 ? "" : "s"}</p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Flagship */}
      <section className="bg-gradient-forest py-24 text-primary-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <Reveal x={-40} y={0}>
            <div className="relative overflow-hidden rounded-3xl shadow-lift">
              <img src={coverOf(flagship)} alt={flagship.title} className="aspect-[4/3] w-full object-cover transition-transform duration-1000 hover:scale-105" loading="lazy" />
              <span className="absolute left-5 top-5 rounded-full bg-gradient-gold px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent-foreground">{flagship.badge}</span>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="eyebrow text-gold-light">Flagship development</p>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">18 acres on the Indian Ocean, Malindi</h2>
            <p className="mt-5 text-primary-foreground/80">{flagship.summary}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {flagship.options?.map((o) => (
                <div key={o.name} className="glass rounded-2xl p-5">
                  <p className="text-sm text-primary-foreground/70">{o.name}</p>
                  <p className="mt-1 font-display text-2xl text-gold-light">{o.price}</p>
                  <p className="mt-2 text-xs text-primary-foreground/70">{o.detail}</p>
                </div>
              ))}
            </div>
            <Button asChild size="lg" className="mt-8 rounded-full bg-gradient-gold text-accent-foreground shadow-gold hover:opacity-90">
              <Link to={`/properties/${flagship.slug}`}>Explore the plots<ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-gold">Featured</p>
            <h2 className="mt-3 font-display text-4xl text-foreground md:text-5xl">Standout listings</h2>
          </div>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/properties">View all {properties.length}<ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.1}>
              <PropertyCard property={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="text-center">
            <p className="eyebrow justify-center text-gold">How it works</p>
            <h2 className="mt-3 font-display text-4xl text-foreground md:text-5xl">From enquiry to keys</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {[
              { icon: Search, t: "Browse", d: "Explore listings with photos, prices and locations." },
              { icon: Handshake, t: "Enquire", d: "Message us on WhatsApp, call or email — we reply fast." },
              { icon: ShieldCheck, t: "Verify", d: "View the property and inspect title documents." },
              { icon: KeyRound, t: "Own", d: "Complete the purchase and receive your title." },
            ].map((s, i) => (
              <Reveal key={s.t} delay={i * 0.1}>
                <div className="h-full rounded-2xl bg-card p-7 shadow-soft">
                  <span className="font-display text-5xl text-gold/40">0{i + 1}</span>
                  <s.icon className="mt-4 h-7 w-7 text-primary" />
                  <p className="mt-4 font-display text-2xl text-foreground">{s.t}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
      <SiteFooter />
      <WhatsAppFab />
    </main>
  );
};

export default Index;
