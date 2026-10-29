import { useState } from "react";
import { Mail, MessageCircle, Phone, Send, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Reveal from "@/components/Reveal";
import { CONTACT, emailLink, telLink, whatsappLink } from "@/lib/contact";

interface ContactSectionProps {
  propertyTitle?: string;
}

const ContactSection = ({ propertyTitle }: ContactSectionProps) => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: propertyTitle ? `I'm interested in "${propertyTitle}". Please share more details and viewing arrangements.` : "",
  });

  const enquiry = propertyTitle
    ? `Hi Frankburn Properties, I'm interested in "${propertyTitle}". Please share more details.`
    : undefined;

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(CONTACT.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...form, property: propertyTitle ?? "General enquiry" }),
      });
      if (!res.ok) throw new Error("failed");
      toast({ title: "Message sent", description: "Thank you — we'll get back to you within 24 hours." });
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast({ title: "Message not sent", description: "Please try again, or reach us on WhatsApp.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const methods = [
    { icon: MessageCircle, label: "WhatsApp", value: CONTACT.whatsapp.display, href: whatsappLink(enquiry), external: true, accent: "bg-whatsapp text-whatsapp-foreground" },
    { icon: Phone, label: "Call", value: CONTACT.phones.map((p) => p.display).join(" · "), href: telLink(0), accent: "bg-gradient-gold text-accent-foreground" },
    { icon: Mail, label: "Email", value: CONTACT.email, href: emailLink(propertyTitle ? `Enquiry: ${propertyTitle}` : "Property enquiry"), accent: "bg-primary-foreground text-primary" },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-gradient-forest py-24 text-primary-foreground grain">
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-gold/20 blur-3xl animate-float" />
      <div className="container relative grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <Reveal>
            <span className="eyebrow text-gold-light">Get in touch</span>
            <h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              {propertyTitle ? "Arrange a viewing" : "Let's find your next property"}
            </h2>
            <p className="mt-5 max-w-lg text-lg text-primary-foreground/75">
              Message us on WhatsApp for the fastest reply, call to speak to our team, or send the form and we'll respond within 24 hours.
            </p>
          </Reveal>

          <div className="mt-10 space-y-4">
            {methods.map((m, i) => (
              <Reveal key={m.label} delay={0.1 * i} x={-30} y={0}>
                <a
                  href={m.href}
                  target={m.external ? "_blank" : undefined}
                  rel={m.external ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-5 rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-4 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40 hover:bg-primary-foreground/10"
                >
                  <span className={`grid h-14 w-14 shrink-0 place-items-center rounded-xl ${m.accent} transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110`}>
                    <m.icon className="h-6 w-6" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">{m.label}</span>
                    <span className="block break-all font-display text-xl">{m.value}</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.2}>
          <form onSubmit={onSubmit} className="space-y-5 rounded-[2rem] bg-card p-8 text-card-foreground shadow-lift md:p-10">
            <h3 className="font-display text-2xl font-semibold text-primary">Send us a message</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold">Full name *</label>
                <Input id="name" name="name" required value={form.name} onChange={onChange} placeholder="Your name" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-semibold">Phone *</label>
                <Input id="phone" name="phone" type="tel" required value={form.phone} onChange={onChange} placeholder="+254 7XX XXX XXX" className="h-12 rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold">Email *</label>
              <Input id="email" name="email" type="email" required value={form.email} onChange={onChange} placeholder="you@example.com" className="h-12 rounded-xl" />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-semibold">Message *</label>
              <Textarea id="message" name="message" required value={form.message} onChange={onChange} placeholder="Tell us what you're looking for — location, budget, type of property…" className="min-h-32 resize-none rounded-xl" />
            </div>
            <Button type="submit" disabled={submitting} className="h-14 w-full rounded-xl text-base font-semibold">
              {submitting ? (
                <span className="flex items-center gap-2"><span className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />Sending…</span>
              ) : (
                <span className="flex items-center gap-2"><Send className="h-5 w-5" />Send message</span>
              )}
            </Button>
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-primary" /> We reply to every enquiry within 24 hours.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;
