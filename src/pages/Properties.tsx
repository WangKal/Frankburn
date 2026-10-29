import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppFab from "@/components/WhatsAppFab";
import PropertyCard from "@/components/PropertyCard";
import Reveal from "@/components/Reveal";
import { properties, PROPERTY_TYPES, counties } from "@/data/properties";
import { cn } from "@/lib/utils";

const sorts = { featured: "Featured", low: "Price: low to high", high: "Price: high to low" } as const;

const Properties = () => {
  const [params, setParams] = useSearchParams();
  const type = params.get("type") ?? "All";
  const [county, setCounty] = useState("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<keyof typeof sorts>("featured");

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    const r = properties.filter(
      (p) =>
        (type === "All" || p.type === type) &&
        (county === "All" || p.county === county) &&
        (!term || `${p.title} ${p.location} ${p.summary}`.toLowerCase().includes(term)),
    );
    if (sort === "low") return [...r].sort((a, b) => a.price - b.price);
    if (sort === "high") return [...r].sort((a, b) => b.price - a.price);
    return [...r].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  }, [type, county, q, sort]);

  const pill = (active: boolean) =>
    cn("rounded-full border px-4 py-2 text-sm transition-all", active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground hover:border-gold");

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <section className="bg-gradient-forest pb-16 pt-36 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal>
            <p className="eyebrow text-gold-light">Our portfolio</p>
            <h1 className="mt-4 font-display text-5xl md:text-6xl">All properties</h1>
            <p className="mt-4 max-w-xl text-primary-foreground/80">Residential, commercial, land and hospitality opportunities across Kenya.</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-5">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or location" className="h-12 rounded-full pl-11" />
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", ...PROPERTY_TYPES].map((t) => (
              <button key={t} className={pill(type === t)} onClick={() => setParams(t === "All" ? {} : { type: t })}>{t}</button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {["All", ...counties].map((c) => (
              <button key={c} className={pill(county === c)} onClick={() => setCounty(c)}>{c === "All" ? "All counties" : c}</button>
            ))}
            <select value={sort} onChange={(e) => setSort(e.target.value as keyof typeof sorts)} className="ml-auto h-10 rounded-full border border-border bg-card px-4 text-sm">
              {Object.entries(sorts).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </select>
          </div>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">{list.length} propert{list.length === 1 ? "y" : "ies"}</p>
        <motion.div layout className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.div key={p.slug} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }}>
                <PropertyCard property={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {list.length === 0 && <p className="py-20 text-center text-muted-foreground">No properties match your filters.</p>}
      </section>
      <SiteFooter />
      <WhatsAppFab />
    </main>
  );
};

export default Properties;
