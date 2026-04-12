"use client";

import { PlanetMark } from "./planet-mark";
import { Reveal } from "@/components/motion/reveal";
import { useLocale } from "@/lib/i18n";

export function EklpsSection() {
  const { t } = useLocale();

  return (
    <section
      id="eklps"
      className="eklps-zone relative w-full py-24 md:py-40 overflow-hidden"
    >
      <div className="px-6 md:px-10 xl:px-16">
        {/* Section header */}
        <Reveal>
          <div className="flex items-baseline justify-between mb-12 md:mb-16 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] opacity-70">
            <span>08 — eklps</span>
            <span>{t("eklps.tagline")}</span>
          </div>
        </Reveal>

        {/* PlanetMark + tagline */}
        <div className="flex flex-col items-center text-center gap-4 mb-10">
          <PlanetMark size={80} className="text-cream" />
          <Reveal>
            <h2 className="font-mono text-2xl md:text-4xl lowercase tracking-tight">
              {t("eklps.tagline")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-mono text-xs md:text-sm leading-[1.8] opacity-75 max-w-lg">
              {t("eklps.subtitle")}
            </p>
          </Reveal>
        </div>

        {/* CTA */}
        <Reveal>
          <div className="flex justify-center pt-8 border-t border-cream/15">
            <a
              href="https://www.instagram.com/_eklps/"
              target="_blank"
              rel="noopener"
              className="group inline-flex items-baseline gap-4 font-mono text-lg md:text-2xl lowercase hover:opacity-70 transition-opacity"
              data-cursor-hover
            >
              _ {t("eklps.cta")}
              <span className="inline-block transition-transform group-hover:translate-x-2">
                →
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
