"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";
import { MuxVideo } from "@/components/media/mux-video";
import highlightsData from "@/data/highlights.json";
import { useLocale } from "@/lib/i18n";

type PlaybackKey =
  | "hero" | "tiesto" | "keinemusik" | "irina" | "untold" | "untold-b"
  | "intro" | "cyclic" | "cyclic-alt" | "matahale"
  | "gallery-1" | "gallery-2" | "gallery-3" | "gallery-4";

export function Highlights() {
  const { t } = useLocale();
  const outerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  // Count how many media items need to load
  const mediaCount = highlightsData.filter((h) => h.videoKey || h.image).length;
  const loadedRef = useRef(0);

  const onMediaReady = () => {
    loadedRef.current += 1;
    if (loadedRef.current >= mediaCount) {
      setReady(true);
    }
  };

  // Fallback: show after 4s even if not all media loaded
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  // Tie horizontal translation to the user's scroll through the outer container
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  // Total horizontal travel (width of track minus viewport).
  // We compute as a negative X % based on card count.
  // 10 cards, each 30vw + gaps. Track width ≈ 10 * 32vw + padding = 320vw
  // We need to move about -220vw (i.e. 220% of a viewport)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-78%"]);

  return (
    <section
      ref={outerRef}
      className="relative w-full"
      // Outer container is tall so we get scroll runway to drive the pinned inner
      style={{ height: "350vh" }}
    >
      {/* Sticky pinned viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
        <div className="px-6 md:px-10 xl:px-16 flex items-baseline justify-between mb-6 md:mb-8 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] opacity-60">
          <span>05 — {t("highlights.title")}</span>
          <span>{t("highlights.subtitle")}</span>
        </div>

        <h2 className="px-6 md:px-10 xl:px-16 font-display font-extrabold text-[clamp(2rem,4.5vw,5rem)] leading-[0.92] tracking-[-0.03em] uppercase mb-6 md:mb-10">
          {t("highlights.title")}
        </h2>

        <motion.div
          style={{ x: ready ? x : "0%" }}
          className={`flex gap-6 md:gap-8 pl-6 md:pl-10 xl:pl-16 will-change-transform items-stretch transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
        >
          {highlightsData.map((h) => (
            <article
              key={h.id}
              className="shrink-0 w-[72vw] md:w-[38vw] xl:w-[28vw] border-t border-current/20 pt-4 flex flex-col"
              data-cursor-hover
            >
              <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.25em] opacity-60 mb-4">
                <span>Highlight · {h.index}</span>
              </div>

              {h.videoKey ? (
                <div className="relative w-full aspect-[4/5] mb-4 overflow-hidden bg-carbon">
                  <MuxVideo
                    videoKey={h.videoKey as PlaybackKey}
                    autoPlay
                    loop
                    muted
                    className="h-full w-full object-cover"
                    aspect="4/5"
                    onLoadedData={onMediaReady}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              ) : h.image ? (
                <div className="relative w-full aspect-[4/5] mb-4 overflow-hidden bg-carbon">
                  <Image
                    src={h.image}
                    alt={h.title}
                    fill
                    sizes="(max-width: 768px) 72vw, 30vw"
                    className="object-cover"
                    onLoad={onMediaReady}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              ) : (
                <div className="flex-1 min-h-[10rem]" />
              )}

              <h3 className="font-display font-extrabold text-2xl md:text-4xl leading-[0.95] tracking-[-0.02em] uppercase">
                {h.title}
              </h3>
              <div className="mt-3 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] opacity-70">
                {h.subtitle}
              </div>
            </article>
          ))}
          <div className="shrink-0 w-[20vw]" />
        </motion.div>

        <div className="px-6 md:px-10 xl:px-16 mt-6 md:mt-8 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.25em] opacity-50">
          <span>scroll</span>
          <motion.div
            className="h-px flex-1 max-w-[200px] origin-left"
            style={{
              backgroundColor: "currentColor",
              scaleX: scrollYProgress,
            }}
          />
          <span>{highlightsData.length.toString().padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}
