"use client";

import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import stats from "@/data/stats.json";
import { useLocale } from "@/lib/i18n";

const ORDER = [
  "followers",
  "streams",
  "views",
  "playlists",
  "shazams",
  "countries",
] as const;

export function Numbers({ liveFollowers }: { liveFollowers?: number }) {
  const { t } = useLocale();
  return (
    <section className="relative w-full px-6 md:px-10 xl:px-16 py-24 md:py-32">
      <Reveal>
        <div className="flex items-baseline justify-between mb-16 md:mb-24 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] opacity-60">
          <span>§02 — {t("numbers.title")}</span>
          <span>Data · 04.2026</span>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-14 md:gap-y-28 gap-x-10 md:gap-x-20 xl:gap-x-32">
        {ORDER.map((key, i) => {
          const stat = stats[key];
          // If liveFollowers is available, override the followers display
          const isFollowers = key === "followers" && typeof liveFollowers === "number";
          const displayValue = isFollowers
            ? liveFollowers >= 1000
              ? `${Math.round(liveFollowers / 1000)}K`
              : `${liveFollowers}`
            : stat.display;
          const numValue = isFollowers ? liveFollowers : stat.value;

          return (
            <Reveal key={key} delay={i * 0.08}>
              <div className="flex flex-col min-w-0">
                <div className="font-display font-extrabold leading-[0.85] tracking-[-0.03em] text-[clamp(2.75rem,6.5vw,7rem)] tabular-nums">
                  <CountUp value={numValue} display={displayValue} />
                </div>
                <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] mt-3 md:mt-4 opacity-70">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.3}>
        <div className="mt-12 md:mt-16 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] opacity-50 max-w-md">
          // {t("numbers.caption")}
        </div>
      </Reveal>
    </section>
  );
}
