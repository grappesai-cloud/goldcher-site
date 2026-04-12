"use client";

import { Reveal } from "@/components/motion/reveal";
import { useLocale } from "@/lib/i18n";

const STATS = [
  { value: "18K+", label: "Instagram" },
  { value: "30K+", label: "TikTok" },
  { value: "30M+", label: "Streams" },
] as const;

export function Numbers() {
  const { t } = useLocale();
  return (
    <section className="relative w-full px-6 md:px-10 xl:px-16 py-16 md:py-24">
      <Reveal>
        <div className="flex items-baseline justify-between mb-16 md:mb-24 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] opacity-60">
          <span>02 — {t("numbers.title")}</span>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="border-t border-b border-current/10 py-8 md:py-12">
        <div className="flex justify-evenly items-start">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex-1 flex flex-col items-center text-center${
                i < STATS.length - 1 ? " border-r border-current/15" : ""
              }`}
            >
              <span className="font-display font-extrabold text-[clamp(2rem,5vw,5rem)] uppercase leading-none">
                {stat.value}
              </span>
              <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest opacity-60 mt-2">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
        </div>
      </Reveal>
    </section>
  );
}
