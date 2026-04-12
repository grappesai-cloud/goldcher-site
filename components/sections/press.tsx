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
        <h2 className="font-display font-extrabold text-[clamp(2.5rem,6vw,6.5rem)] leading-[0.92] tracking-[-0.03em] uppercase mb-8 max-w-4xl">
          {t("press.title")}
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="max-w-xl text-base md:text-lg opacity-80 mb-16 md:mb-24">
          {t("press.subtitle")}
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {TILES.map((tile, i) => (
          <Reveal key={tile.key} delay={i * 0.08}>
            <Magnetic strength={0.15}>
              <a
                href={tile.href}
                download
                className="block border border-current/20 hover:border-current/50 p-8 md:p-10 transition-colors min-h-[280px] flex flex-col justify-between"
                data-cursor-hover
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-60">
                  {tile.format}
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-3xl md:text-4xl leading-none tracking-tight uppercase">
                    {t(tile.key)}
                  </h3>
                  <div className="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em]">
                    <span>{t("press.download")}</span>
                    <span>↓</span>
                  </div>
                </div>
              </a>
            </Magnetic>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
