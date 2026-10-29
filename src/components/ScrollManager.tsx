import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scrolls to top on page change, or to the #section when the link has a hash. */
const ScrollManager = () => {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const t = window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 120);
      return () => window.clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash, key]);

  return null;
};

export default ScrollManager;
