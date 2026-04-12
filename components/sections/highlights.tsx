"use client";

import { Reveal } from "@/components/motion/reveal";
import { useLocale } from "@/lib/i18n";

const TICKER_ITEMS = [
  "BBC RADIO 1",
  "FEAT WITH TIESTO",
  "+50 SHOWS IN 2025",
  "12 COUNTRIES",
  "UNTOLD MAIN STAGE",
  "KEINEMUSIK SUPPORT",
  "BOHO MIAMI",
  "BAROOF TAHITI",
  "EKLPS CREATOR",
];

function TickerRow({ reverse = false }: { reverse?: boolean }) {
  const direction = reverse ? "ticker-reverse" : "ticker";
  // Duplicate items enough times for seamless loop
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div
        className="inline-flex"
        style={{ animation: `${direction} 40s linear infinite` }}
      >
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="ticker-item font-display font-bold uppercase mx-4"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              WebkitTextStroke: "1px currentColor",
              WebkitTextFillColor: "transparent",
            }}
          >
            {item}
            <span className="mx-4 opacity-40" aria-hidden="true">
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Highlights() {
  const { t } = useLocale();

  return (
    <section className="relative w-full py-16 md:py-24">
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes ticker-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <Reveal>
        <div className="px-6 md:px-10 xl:px-16 flex items-baseline justify-between mb-6 md:mb-8 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] opacity-60">
          <span>05 — {t("highlights.title")}</span>
          <span>{t("highlights.subtitle")}</span>
        </div>
      </Reveal>

      <TickerRow />
    </section>
  );
}
