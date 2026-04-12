"use client";

import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { useLocale } from "@/lib/i18n";

const TILES = [
  {
    key: "press.pressKit",
    format: "PDF · 946 KB",
    href: "/downloads/goldcher-press-kit.pdf",
  },
  {
    key: "press.logoPack",
    format: "ZIP · incl. AI, SVG, PNG",
    href: "/downloads/goldcher-logos.zip",
  },
  {
    key: "press.photoPack",
    format: "ZIP · 10 hi-res JPEGs",
    href: "/downloads/goldcher-photos.zip",
  },
];

export function Press() {
  const { t } = useLocale();
  return (
    <section id="press" className="relative w-full px-6 md:px-10 xl:px-16 py-24 md:py-32">
      <Reveal>
        <div className="flex items-baseline justify-between mb-16 md:mb-24 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] opacity-60">
          <span>09 — {t("press.title")}</span>
          <span>For press, promoters, labels</span>
        </div>
      </Reveal>

      <Reveal>
        <h2 className="font-display font-extrabold text-[clamp(1.3rem,3.5vw,4.5rem)] leading-[0.92] tracking-[-0.03em] uppercase mb-8 max-w-4xl">
          {t("press.title")}
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="max-w-xl text-base md:text-lg opacity-80 mb-16 md:mb-24">
          {t("press.subtitle")}
        </p>
      </Reveal>

      <div className="flex flex-col gap-3 md:grid md:grid-cols-3 md:gap-8">
        {TILES.map((tile, i) => (
          <Reveal key={tile.key} delay={i * 0.08}>
            <Magnetic strength={0.15}>
              <a
                href={tile.href}
                download
                className="border border-current/20 hover:border-current/50 px-5 py-4 md:p-10 transition-colors md:min-h-[280px] flex items-center justify-between md:flex-col md:items-stretch md:justify-between"
                data-cursor-hover
              >
                <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-0">
                  <h3 className="font-display font-extrabold text-base md:text-4xl leading-none tracking-tight uppercase">
                    {t(tile.key)}
                  </h3>
                  <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.25em] opacity-60 hidden md:block">
                    {tile.format}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em]">
                  <span className="hidden md:inline">{t("press.download")}</span>
                  <span>↓</span>
                </div>
              </a>
            </Magnetic>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
