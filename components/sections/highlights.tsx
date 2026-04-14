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
        style={{ animation: `${direction} 30s linear infinite` }}
      >
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="ticker-item font-display font-bold uppercase mx-4"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              WebkitTextStroke: "1px currentColor",
              WebkitTextFillColor: "transparent",
              transition: "color 0.3s, -webkit-text-fill-color 0.3s",
            }}
          >
            {item}
            <span
              aria-hidden="true"
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: ["#0000FF", "#00FF00", "#FF00FF", "#FF0000"][i % 4],
                display: "inline-block",
                verticalAlign: "middle",
                margin: "0 1.5rem",
              }}
            />
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
        .ticker-item:hover {
          -webkit-text-fill-color: currentColor !important;
        }
      `}</style>


      <TickerRow />
    </section>
  );
}
