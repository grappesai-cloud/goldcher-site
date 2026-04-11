"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { useLocale } from "@/lib/i18n";

export function Bio() {
  const { t } = useLocale();
  return (
    <section className="relative w-full px-6 md:px-10 xl:px-16 py-24 md:py-32">
      <Reveal>
        <div className="flex items-baseline justify-between mb-16 md:mb-24 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] opacity-60">
          <span>§04 — Biography</span>
          <span>The Artist</span>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        {/* Portrait */}
        <div className="md:col-span-4 md:sticky md:top-32 h-fit">
          <Reveal>
            <div className="relative aspect-[3/4] w-full max-w-sm overflow-hidden">
              <Image
                src="/images/bio-portrait.jpg"
                alt="Goldcher portrait"
                fill
                sizes="(max-width: 768px) 100vw, 380px"
                className="object-cover grayscale hover:grayscale-0 transition-all duration-[1.2s]"
              />
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-50 mt-4">
              // Bucharest · Editorial
            </div>
          </Reveal>
        </div>

        {/* Bio copy */}
        <div className="md:col-span-7 md:col-start-6 flex flex-col gap-8 md:gap-10">
          <Reveal>
            <h2 className="font-display font-extrabold text-[clamp(2rem,4.5vw,4.5rem)] leading-[0.9] tracking-[-0.03em] uppercase mb-4">
              {t("bio.title")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg md:text-xl lg:text-2xl leading-[1.55] max-w-2xl">
              {t("bio.p1")}
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="text-base md:text-lg leading-[1.7] opacity-85 max-w-2xl">
              {t("bio.p2")}
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <p className="text-base md:text-lg leading-[1.7] opacity-85 max-w-2xl">
              {t("bio.p3")}
            </p>
          </Reveal>
          <Reveal delay={0.34}>
            <p className="text-base md:text-lg leading-[1.7] opacity-85 max-w-2xl">
              {t("bio.p4")}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
