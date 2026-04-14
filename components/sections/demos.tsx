"use client";

import { Reveal } from "@/components/motion/reveal";

export function Demos() {
  return (
    <section className="relative w-full py-24 md:py-40 text-center" style={{ backgroundColor: "#0a0a0a", color: "#ffffff" }}>
      <div className="px-6 md:px-10 xl:px-16">
        <Reveal>
          <div className="opacity-40 mb-4">——</div>
          <p className="text-xs uppercase tracking-widest opacity-50 mb-6">Demos</p>
          <h2 className="font-bold text-4xl md:text-7xl uppercase tracking-tight mb-6">
            Send<br />Demos
          </h2>
          <p className="text-xs uppercase tracking-widest opacity-50 mb-10">
            Producers · Submit your tracks
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <a
            href="#"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-3 border border-[#0000FF]/50 px-8 py-4 text-xs uppercase tracking-widest text-[#0000FF] hover:bg-[#0000FF]/10 transition-colors"
            data-cursor-hover
          >
            tstack.app/goldcher →
          </a>
        </Reveal>
      </div>
    </section>
  );
}
