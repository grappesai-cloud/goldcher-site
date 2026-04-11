"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLocale } from "@/lib/i18n";

const LINKS = [
  { id: "intro", key: "nav.intro", href: "#intro" },
  { id: "work", key: "nav.work", href: "#work" },
  { id: "eklps", key: "nav.eklps", href: "#eklps" },
  { id: "press", key: "nav.press", href: "#press" },
  { id: "contact", key: "nav.contact", href: "#contact" },
];

function scrollTo(target: string) {
  if (typeof window === "undefined") return;
  const el = document.querySelector(target) as HTMLElement | null;
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: 0, duration: 1.6 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { locale, setLocale, t } = useLocale();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    scrollTo(href);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-6 md:px-10 xl:px-16 transition-[padding,background-color] duration-500 mix-blend-difference text-white",
          scrolled ? "py-4" : "py-6"
        )}
      >
        <a
          href="#intro"
          onClick={handleClick("#intro")}
          className="font-display text-lg md:text-xl font-extrabold tracking-tight"
        >
          GOLDCHER
        </a>

        <ul className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em]">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={l.href}
                onClick={handleClick(l.href)}
                className="hover:opacity-60 transition-opacity"
              >
                {t(l.key)}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={() => setLocale(locale === "en" ? "ro" : "en")}
              className="font-mono text-[10px] tracking-widest border border-current px-2 py-1 hover:opacity-60 transition-opacity uppercase"
              data-cursor-hover
            >
              {locale === "en" ? "EN / ro" : "en / RO"}
            </button>
          </li>
        </ul>

        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden font-mono text-xs uppercase tracking-widest"
          aria-label="Menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[999] bg-cream md:hidden flex flex-col justify-between p-8 pt-24"
            style={{ backgroundColor: "var(--cream)" }}
          >
            <ul className="flex flex-col gap-6">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                >
                  <a
                    href={l.href}
                    onClick={handleClick(l.href)}
                    className="font-display text-5xl font-extrabold uppercase tracking-tight"
                  >
                    {t(l.key)}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="font-mono text-xs uppercase tracking-widest flex items-center justify-between">
              <span>goldchermusic.com</span>
              <button
                onClick={() => setLocale(locale === "en" ? "ro" : "en")}
                className="border border-current px-3 py-1 uppercase"
              >
                {locale}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
