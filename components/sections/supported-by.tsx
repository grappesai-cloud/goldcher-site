"use client";

import { Reveal } from "@/components/motion/reveal";
import supportedData from "@/data/supported-by.json";
import { useLocale } from "@/lib/i18n";

export function SupportedBy() {
  const { t } = useLocale();

  return (
    <section className="relative w-full px-6 md:px-10 xl:px-16 py-24 md:py-32">
      <Reveal>
        <div className="flex items-baseline justify-between mb-16 md:mb-24 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] opacity-60">
          <span>06 — Supported By</span>
          <span>Industry</span>
        </div>
      </Reveal>

      <Reveal>
        <h2 className="font-display font-extrabold text-[clamp(2rem,5.5vw,6rem)] leading-[0.92] tracking-[-0.03em] uppercase mb-6 max-w-4xl">
          {t("supportedBy.title")}
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="max-w-2xl text-base md:text-lg opacity-80 mb-16 md:mb-24">
          {t("supportedBy.subtitle")}
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          {supportedData.names.map((name, i) => (
            <span key={name} className="font-display font-extrabold text-2xl md:text-4xl uppercase tracking-tight">
              {i > 0 && <span className="mr-4 opacity-40"> · </span>}
              {name}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
