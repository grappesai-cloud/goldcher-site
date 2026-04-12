"use client";

import { Reveal } from "@/components/motion/reveal";
import statsData from "@/data/stats.json";

const STATS = [
  { value: statsData.followers.display + "+", label: statsData.followers.label },
  { value: statsData.streams.display + "+", label: statsData.streams.label },
  { value: statsData.views.display + "+", label: statsData.views.label },
  { value: statsData.playlists.display + "+", label: statsData.playlists.label },
  { value: statsData.shazams.display + "+", label: statsData.shazams.label },
  { value: statsData.countries.display, label: statsData.countries.label },
];

export function Numbers() {
  return (
    <Reveal>
      <div className="w-full border-t border-b border-current/10 py-5 md:py-7">
        <div className="flex items-center justify-center gap-4 md:gap-10 flex-wrap px-4 md:px-10">
          {STATS.map((stat, i) => (
            <span key={stat.label} className="flex items-baseline gap-1.5 md:gap-2">
              <span className="font-display font-extrabold text-base md:text-2xl uppercase leading-none tracking-tight">
                {stat.value}
              </span>
              <span className="font-mono text-[7px] md:text-[10px] uppercase tracking-[0.1em] opacity-50">
                {stat.label}
              </span>
              {i < STATS.length - 1 && (
                <span className="ml-2 md:ml-6 opacity-20 text-sm">·</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
