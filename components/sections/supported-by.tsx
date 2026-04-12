"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";
import { MuxVideo } from "@/components/media/mux-video";
import supportedData from "@/data/supported-by.json";
import { useLocale } from "@/lib/i18n";

type PlaybackKey =
  | "hero"
  | "tiesto"
  | "keinemusik"
  | "irina"
  | "untold"
  | "untold-b"
  | "intro"
  | "cyclic"
  | "cyclic-alt"
  | "matahale"
  | "gallery-1"
  | "gallery-2"
  | "gallery-3"
  | "gallery-4";

export function SupportedBy() {
  const { t } = useLocale();
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section className="relative w-full px-6 md:px-10 xl:px-16 py-24 md:py-32">
      <Reveal>
        <div className="flex items-baseline justify-between mb-16 md:mb-24 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] opacity-60">
          <span>06 — Supported By</span>
          <span>Industry</span>
        </div>
      </Reveal>

      <Reveal>
        <h2 className="font-display font-extrabold text-[clamp(2rem,5.5vw,6rem)] leading-[0.92] tracking-[-0.03em] uppercase mb-6 max-w-4xl">
          {t("supportedBy.title")}
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="max-w-2xl text-base md:text-lg opacity-80 mb-16 md:mb-24">
          {t("supportedBy.subtitle")}
        </p>
      </Reveal>

      {/* Video grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {supportedData.videos.map((v, i) => (
          <Reveal key={v.id} delay={i * 0.07}>
            <button
              onClick={() => setExpanded(v.id)}
              className="group block w-full text-left"
              data-cursor-hover
            >
              <div className="relative overflow-hidden aspect-[9/16] md:aspect-[4/5]">
                <MuxVideo
                  videoKey={v.videoKey as PlaybackKey}
                  autoPlay
                  loop
                  muted
                  className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                  <div>
                    <div className="font-display font-extrabold text-sm md:text-2xl tracking-tight uppercase">
                      {v.label}
                    </div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.25em] opacity-80">
                      {v.caption}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {/* Name ticker */}
      <Reveal delay={0.2}>
        <div className="mt-20 md:mt-32 border-t border-current/15 pt-8 grid grid-cols-2 md:flex md:flex-wrap gap-x-4 md:gap-x-10 gap-y-3 md:gap-y-4 font-mono text-[11px] md:text-sm uppercase tracking-[0.2em] opacity-80">
          {supportedData.names.map((name) => (
            <span key={name}>· {name}</span>
          ))}
        </div>
      </Reveal>

      {/* Lightbox */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9000] bg-black/95 flex items-center justify-center p-6"
            onClick={() => setExpanded(null)}
          >
            {(() => {
              const v = supportedData.videos.find((x) => x.id === expanded);
              if (!v) return null;
              return (
                <div className="w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream opacity-60 mb-3">
                    {v.label} · {v.caption}
                  </div>
                  <MuxVideo
                    videoKey={v.videoKey as PlaybackKey}
                    autoPlay
                    loop
                    muted={false}
                    className="w-full"
                  />
                </div>
              );
            })()}
            <button
              onClick={() => setExpanded(null)}
              className="absolute top-6 right-6 font-mono text-xs uppercase tracking-widest text-cream"
              data-cursor-hover
            >
              Close ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
