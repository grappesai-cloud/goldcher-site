"use client";

import { Reveal } from "@/components/motion/reveal";

const STATS = [
  { value: "18K+", label: "Instagram" },
  { value: "30K+", label: "TikTok" },
  { value: "30M+", label: "Streams" },
] as const;

export function Numbers() {
  return (
    <Reveal>
      <div className="w-full border-t border-b border-current/10 py-6 md:py-8">
        <div className="flex items-center justify-center gap-6 md:gap-12 flex-wrap">
          {STATS.map((stat, i) => (
            <span key={stat.label} className="flex items-baseline gap-2 md:gap-3">
              <span className="font-display font-extrabold text-xl md:text-3xl uppercase leading-none tracking-tight">
                {stat.value}
              </span>
              <span className="font-mono text-[9px] md:text-[11px] uppercase tracking-[0.15em] opacity-50">
                {stat.label}
              </span>
              {i < STATS.length - 1 && (
                <span className="ml-4 md:ml-8 opacity-20 text-lg">·</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
