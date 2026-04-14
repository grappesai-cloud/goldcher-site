"use client";

import { Reveal } from "@/components/motion/reveal";

const DOWNLOADS = [
  { href: "/downloads/goldcher-press-kit.pdf" },
  { href: "/downloads/goldcher-logos.zip" },
  { href: "/downloads/goldcher-photos.zip" },
];

function downloadAll() {
  DOWNLOADS.forEach((d) => {
    const a = document.createElement("a");
    a.href = d.href;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
}

export function Press() {
  return (
    <section id="press" className="relative w-full px-6 md:px-10 xl:px-16 py-24 md:py-32 text-center">
      <Reveal>
        <div className="opacity-40 mb-4">——</div>
        <p className="text-xs uppercase tracking-widest opacity-50 mb-4">Press Kit</p>
        <h2 className="font-bold text-3xl md:text-5xl uppercase tracking-tight mb-6">
          Press Kit 2026
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <button
          onClick={downloadAll}
          className="inline-flex items-center gap-3 border border-current/30 px-8 py-4 text-xs uppercase tracking-widest hover:bg-current/5 transition-colors"
          data-cursor-hover
        >
          ↓ Download All
        </button>
      </Reveal>
    </section>
  );
}
