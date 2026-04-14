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
        <h2 className="font-display font-extrabold text-[clamp(2rem,5.5vw,6rem)] leading-[0.92] tracking-[-0.03em] uppercase mb-16 md:mb-24 max-w-4xl">
          {t("supportedBy.title")}
        </h2>
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
                  </div>
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>


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
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-60 mb-3">
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
              className="absolute top-6 right-6 font-mono text-xs uppercase tracking-widest"
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
