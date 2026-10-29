import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/contact";

const WhatsAppFab = ({ message }: { message?: string }) => (
  <motion.a
    href={whatsappLink(message)}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with us on WhatsApp"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 18 }}
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.95 }}
    className="group fixed bottom-6 right-6 z-40 flex items-center gap-3"
  >
    <span className="pointer-events-none hidden translate-x-2 rounded-full bg-card px-4 py-2 text-sm font-semibold text-foreground opacity-0 shadow-soft transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
      Chat on WhatsApp
    </span>
    <span className="relative grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lift">
      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-whatsapp" />
      <MessageCircle className="relative h-6 w-6" />
    </span>
  </motion.a>
);

export default WhatsAppFab;
