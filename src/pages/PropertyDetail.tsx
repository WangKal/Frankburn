import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Check, ChevronLeft, ChevronRight, MapPin, Maximize, BedDouble, MessageCircle, Phone, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppFab from "@/components/WhatsAppFab";
import PropertyCard from "@/components/PropertyCard";
import ContactSection from "@/components/ContactSection";
import Reveal from "@/components/Reveal";
import { getProperty, properties } from "@/data/properties";
import { formatKsh } from "@/lib/format";
import { emailLink, telLink, whatsappLink } from "@/lib/contact";
import NotFound from "./NotFound";

const PropertyDetail = () => {
  const { slug = "" } = useParams();
  const p = getProperty(slug);
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => setIdx(0), [slug]);
  useEffect(() => {
    if (!open || !p) return;
    const n = p.images.length;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % n);
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + n) % n);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, p]);

  if (!p) return <NotFound />;
  const n = p.images.length;
  const go = (d: number) => setIdx((i) => (i + d + n) % n);
  const msg = `Hi Frankburn Properties, I'm interested in "${p.title}". Please share more details.`;
  const related = properties.filter((r) => r.slug !== p.slug && (r.type === p.type || r.county === p.county)).slice(0, 3);
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(p.mapQuery)}&z=15&output=embed`;

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-6 pt-28">
        <Link to="/properties" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" />All properties</Link>
        <Reveal className="mt-6">
          <p className="eyebrow text-gold">{p.badge ?? p.type}</p>
          <h1 className="mt-3 font-display text-4xl text-foreground md:text-6xl">{p.title}</h1>
          <p className="mt-3 flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4 text-gold" />{p.location}, {p.county}</p>
        </Reveal>

        {/* Gallery */}
        <div className="mt-8 grid gap-3 lg:grid-cols-[1fr_120px]">
          <div className="group relative aspect-[16/9] cursor-zoom-in overflow-hidden rounded-3xl bg-muted shadow-lift" onClick={() => setOpen(true)}>
            <AnimatePresence mode="wait">
              <motion.img key={idx} src={p.images[idx]?.src} alt={p.images[idx]?.caption ?? p.title} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute inset-0 h-full w-full object-cover" />
            </AnimatePresence>
            {n > 1 && (
              <>
                <button aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); go(-1); }} className="glass absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-3 text-primary-foreground"><ChevronLeft className="h-5 w-5" /></button>
                <button aria-label="Next photo" onClick={(e) => { e.stopPropagation(); go(1); }} className="glass absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-3 text-primary-foreground"><ChevronRight className="h-5 w-5" /></button>
              </>
            )}
            <span className="glass absolute bottom-4 left-4 rounded-full px-4 py-1.5 text-xs text-primary-foreground">{idx + 1} / {n}{p.images[idx]?.caption ? ` · ${p.images[idx].caption}` : ""}</span>
          </div>
          <div className="no-scrollbar flex gap-3 overflow-auto lg:max-h-[calc((min(100vw,80rem)-12rem)*9/16)] lg:flex-col">
            {p.images.map((im, i) => (
              <button key={i} onClick={() => setIdx(i)} className={`shrink-0 overflow-hidden rounded-xl border-2 transition-all ${i === idx ? "border-gold" : "border-transparent opacity-60 hover:opacity-100"}`}>
                <img src={im.src} alt="" loading="lazy" className="h-16 w-24 object-cover lg:h-20 lg:w-full" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1fr_380px]">
        <div>
          <Reveal>
            <div className="flex flex-wrap gap-6 border-b border-border pb-8 text-sm">
              <span className="flex items-center gap-2"><Maximize className="h-4 w-4 text-gold" />{p.size}</span>
              {p.bedrooms && <span className="flex items-center gap-2"><BedDouble className="h-4 w-4 text-gold" />{p.bedrooms}</span>}
            </div>
            <div className="mt-8 space-y-4 text-lg leading-relaxed text-foreground/85">
              {p.description.map((d, i) => <p key={i}>{d}</p>)}
            </div>
          </Reveal>

          {p.options && (
            <Reveal className="mt-12">
              <h2 className="font-display text-3xl text-foreground">Options</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {p.options.map((o) => (
                  <div key={o.name} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                    <p className="text-sm text-muted-foreground">{o.name}</p>
                    <p className="mt-1 font-display text-2xl text-primary">{o.price}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{o.detail}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          <Reveal className="mt-12">
            <h2 className="font-display text-3xl text-foreground">Key facts</h2>
            <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
              {p.facts.map((f) => (
                <div key={f.label} className="bg-card p-5">
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">{f.label}</dt>
                  <dd className="mt-1 font-medium text-foreground">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal className="mt-12">
            <h2 className="font-display text-3xl text-foreground">Features</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {p.features.map((f) => (
                <li key={f} className="flex gap-3"><Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" /><span>{f}</span></li>
              ))}
            </ul>
            {p.rentalIncome && <p className="mt-6 rounded-2xl bg-secondary p-5 text-foreground"><strong>Rental income:</strong> {p.rentalIncome}</p>}
            {p.notes?.map((nt) => <p key={nt} className="mt-3 text-sm text-muted-foreground">{nt}</p>)}
          </Reveal>

          <Reveal className="mt-12">
            <h2 className="font-display text-3xl text-foreground">Location</h2>
            <div className="mt-6 overflow-hidden rounded-3xl border border-border shadow-soft">
              <iframe title={`Map of ${p.title}`} src={mapSrc} className="h-[380px] w-full" loading="lazy" />
            </div>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.mapQuery)}`} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm text-primary link-underline">Open in Google Maps</a>
          </Reveal>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl bg-gradient-forest p-7 text-primary-foreground shadow-lift">
            <p className="text-sm text-primary-foreground/70">{p.priceLabel ?? "Price"}</p>
            <p className="mt-1 font-display text-4xl text-gold-light">{formatKsh(p.price)}</p>
            {p.priceNote && <p className="mt-2 text-sm text-primary-foreground/70">{p.priceNote}</p>}
            <div className="mt-6 space-y-3">
              <Button asChild size="lg" className="w-full rounded-full bg-whatsapp text-whatsapp-foreground hover:opacity-90">
                <a href={whatsappLink(msg)} target="_blank" rel="noopener noreferrer"><MessageCircle className="mr-2 h-4 w-4" />WhatsApp us</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <a href={telLink(0)}><Phone className="mr-2 h-4 w-4" />Call now</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                <a href={emailLink(`Enquiry: ${p.title}`, msg)}><Mail className="mr-2 h-4 w-4" />Email</a>
              </Button>
            </div>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section className="bg-secondary py-20">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="font-display text-4xl text-foreground">You may also like</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => <Reveal key={r.slug} delay={i * 0.1}><PropertyCard property={r} /></Reveal>)}
            </div>
          </div>
        </section>
      )}

      <ContactSection propertyTitle={p.title} />
      <SiteFooter />
      <WhatsAppFab message={msg} />

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-primary-dark/95 p-4" onClick={() => setOpen(false)}>
            <button aria-label="Close" className="absolute right-5 top-5 text-primary-foreground"><X className="h-7 w-7" /></button>
            <img src={p.images[idx]?.src} alt="" className="max-h-[85vh] max-w-full rounded-xl object-contain" onClick={(e) => e.stopPropagation()} />
            {n > 1 && (
              <>
                <button aria-label="Previous" onClick={(e) => { e.stopPropagation(); go(-1); }} className="glass absolute left-4 rounded-full p-3 text-primary-foreground"><ChevronLeft /></button>
                <button aria-label="Next" onClick={(e) => { e.stopPropagation(); go(1); }} className="glass absolute right-4 rounded-full p-3 text-primary-foreground"><ChevronRight /></button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default PropertyDetail;
