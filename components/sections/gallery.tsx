"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import galleryData from "@/data/gallery.json";
import { Reveal } from "@/components/motion/reveal";
import { useLocale } from "@/lib/i18n";

export function Gallery() {
  const { t } = useLocale();

  return (
    <section className="relative w-full py-24 md:py-32 overflow-visible">
      <div className="px-6 md:px-10 xl:px-16">
        <Reveal>
          <div className="flex items-baseline justify-between mb-12 md:mb-16 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] opacity-60">
            <span>07 — {t("gallery.title")}</span>
            <span>{t("gallery.subtitle")}</span>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="font-display font-extrabold text-[clamp(1.8rem,4vw,4.5rem)] leading-[0.92] tracking-[-0.03em] uppercase mb-12 md:mb-16">
            {t("gallery.title")}
          </h2>
        </Reveal>

        {/* Desktop: scattered canvas — hand-placed positions guarantee no clipping */}
        <div className="hidden md:block relative mx-auto max-w-[1600px]">
          <div
            className="relative w-full"
            style={{ aspectRatio: "14 / 11" }}
          >
            {galleryData.map((img, i) => {
              const aspectRatio = `${img.w} / ${img.h}`;
              return (
                <motion.div
                  key={img.src}
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 1,
                    delay: (i % 5) * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    rotate: 0,
                    scale: 1.05,
                    zIndex: 50,
                    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                  }}
                  className="absolute shadow-2xl hover:shadow-[0_30px_80px_rgba(0,0,0,0.4)]"
                  style={{
                    left: `${img.x}%`,
                    top: `${img.y}%`,
                    width: `${img.widthPercent}%`,
                    rotate: `${img.rotation}deg`,
                    transformOrigin: "center center",
                  }}
                  data-cursor-hover
                >
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ aspectRatio }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="30vw"
                      className="object-cover pointer-events-none select-none"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile: 2-column masonry */}
        <div className="md:hidden columns-2 gap-3 space-y-0">
          {galleryData.map((img, i) => (
            <Reveal key={img.src} delay={(i % 4) * 0.08}>
              <div className="mb-3 break-inside-avoid overflow-hidden shadow-xl">
                <div
                  className="relative w-full"
                  style={{ aspectRatio: `${img.w} / ${img.h}` }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
