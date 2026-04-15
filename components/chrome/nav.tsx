"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
  const { t } = useLocale();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
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
          className="relative h-6 md:h-7 w-[120px] md:w-[140px]"
        >
          <Image
            src="/logos/goldcher-spray.png"
            alt="Goldcher"
            fill
            sizes="140px"
            className="object-contain object-left"
            priority
          />
        </a>

        <ul className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em]">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={l.href}
                onClick={handleClick(l.href)}
                className="hover:text-[#0000FF] transition-colors"
              >
                {t(l.key)}
              </a>
            </li>
          ))}
        </ul>

      </nav>
    </>
  );
}
