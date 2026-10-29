import { Link } from "react-router-dom";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { Logo } from "@/components/SiteHeader";
import { CONTACT, emailLink, telLink, whatsappLink } from "@/lib/contact";
import { PROPERTY_TYPES } from "@/data/properties";

const SiteFooter = () => (
  <footer className="relative overflow-hidden bg-primary-dark text-primary-foreground">
    <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
    <div className="container relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
      <div className="space-y-4">
        <Logo light />
        <p className="max-w-xs text-sm text-primary-foreground/65">
          Residential, commercial, land and hospitality opportunities across Kenya — from the Malindi coast to the Nairobi CBD.
        </p>
      </div>

      <div>
        <h4 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-gold-light">Browse</h4>
        <ul className="space-y-2 text-sm text-primary-foreground/75">
          <li><Link to="/properties" className="link-underline">All properties</Link></li>
          {PROPERTY_TYPES.map((t) => (
            <li key={t}>
              <Link to={`/properties?type=${t}`} className="link-underline">{t}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-gold-light">Featured</h4>
        <ul className="space-y-2 text-sm text-primary-foreground/75">
          <li><Link to="/properties/frankburn-beachfront-plots" className="link-underline">Frankburn Beachfront Plots</Link></li>
          <li><Link to="/properties/breeze-point-resort" className="link-underline">Breeze Point Resort</Link></li>
          <li><Link to="/properties/thome-estate-maisonette" className="link-underline">Thome Estate Maisonette</Link></li>
          <li><Link to="/properties/kibokoni-50-acre-oceanfront" className="link-underline">50 Acres at Sabaki</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-gold-light">Talk to us</h4>
        <ul className="space-y-3 text-sm text-primary-foreground/75">
          {CONTACT.phones.map((p, i) => (
            <li key={p.tel}>
              <a href={telLink(i)} className="flex items-center gap-2 hover:text-primary-foreground"><Phone className="h-4 w-4 text-gold-light" />{p.display}</a>
            </li>
          ))}
          <li>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary-foreground">
              <MessageCircle className="h-4 w-4 text-gold-light" />WhatsApp {CONTACT.whatsapp.display}
            </a>
          </li>
          <li>
            <a href={emailLink()} className="flex items-center gap-2 break-all hover:text-primary-foreground"><Mail className="h-4 w-4 shrink-0 text-gold-light" />{CONTACT.email}</a>
          </li>
        </ul>
      </div>
    </div>
    <div className="border-t border-primary-foreground/10">
      <div className="container flex flex-col gap-2 py-6 text-xs text-primary-foreground/50 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Frankburn Properties. All rights reserved.</p>
        <p>Please confirm availability, prices, tenure, approvals and all details directly before purchase.</p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
