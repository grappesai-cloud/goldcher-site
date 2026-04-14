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

function StatRow() {
  return (
    <>
      {STATS.map((stat, i) => (
        <span key={stat.label} className="flex items-baseline gap-1.5 md:gap-2 shrink-0">
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
    </>
  );
}

export function Numbers() {
  return (
    <Reveal>
      <div className="w-full border-t border-b border-current/10 py-5 md:py-7 overflow-hidden">
        {/* Desktop: centered static row */}
        <div className="hidden md:flex items-center justify-center gap-10 px-10">
          <StatRow />
        </div>

        {/* Mobile: marquee animation right-to-left */}
        <div className="flex md:hidden">
          <div className="flex items-center gap-4 animate-marquee-stats whitespace-nowrap">
            <StatRow />
            <span className="ml-2 opacity-20 text-sm">·</span>
            <StatRow />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
