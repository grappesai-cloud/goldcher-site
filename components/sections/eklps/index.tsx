"use client";

import { useRef } from "react";
import { PlanetMark } from "./planet-mark";
import { Reveal } from "@/components/motion/reveal";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n";

export function EklpsSection() {
  const { t } = useLocale();
  const rootRef = useRef<HTMLElement>(null);

  return (
    <section
      id="eklps"
      ref={rootRef}
      className="eklps-zone relative w-full py-24 md:py-40 overflow-hidden"
    >
      {/* Intro — tagline + planet-mark */}
      <div className="px-6 md:px-10 xl:px-16">
        <Reveal>
          <div className="flex items-baseline justify-between mb-12 md:mb-16 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] opacity-70">
            <span>08 — eklps</span>
            <span>{t("eklps.tagline")}</span>
          </div>
        </Reveal>

        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10 mb-16 md:mb-24">
          <PlanetMark size={120} className="text-cream" />
          <div>
            <Reveal>
              <h2 className="font-mono text-[clamp(3rem,10vw,10rem)] leading-[0.9] tracking-tight lowercase">
                {t("eklps.tagline")}
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="font-mono text-sm md:text-base mt-4 opacity-70">
                {t("eklps.subtitle")}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Body copy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-5xl mb-32 md:mb-48">
          <Reveal>
            <p className="font-mono text-xs md:text-sm leading-[1.8] opacity-80">
              {t("eklps.body1")}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-mono text-xs md:text-sm leading-[1.8] opacity-80">
              {t("eklps.body2")} {t("eklps.body3")}
            </p>
          </Reveal>
        </div>

        {/* Visionaries */}
        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-70 mb-8">
            // {t("eklps.visionariesTitle")}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-32 md:mb-48">
          {VISIONARIES.map((v, i) => (
            <Reveal key={v.name} delay={i * 0.1}>
              <article className="border-t border-cream/20 pt-6">
                <div className="relative aspect-[3/4] w-full mb-6 overflow-hidden">
                  <Image
                    src={v.image}
                    alt={v.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-mono text-xl md:text-2xl lowercase">
                    {v.name}
                  </h3>
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] opacity-60">
                    · {v.role}
                  </span>
                </div>
                <p className="mt-4 font-mono text-xs leading-[1.7] opacity-70">
                  {v.bio}
                </p>
                {v.link && (
                  <a
                    href={v.link}
                    target="_blank"
                    rel="noopener"
                    className="mt-4 inline-block font-mono text-[10px] uppercase tracking-[0.25em] underline underline-offset-4 opacity-70 hover:opacity-100"
                    data-cursor-hover
                  >
                    {v.linkLabel} →
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        {/* The Clothing Brand */}
        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-70 mb-8">
            // {t("eklps.clothingTitle")}
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-32 md:mb-48">
          <Reveal className="md:col-span-5">
            <p className="font-mono text-sm leading-[1.8] opacity-85 max-w-md">
              One of the core expressions of this universe is our clothing
              line. Every EKLPS piece is a one-of-a-kind artifact — designed,
              printed, embroidered and finished together during live workshops.
              Not a product. A process.
            </p>
            <p className="font-mono text-xs leading-[1.7] opacity-70 mt-4 max-w-md">
              The garments are released through limited drops — time-bound and
              quantity-limited. Each piece becomes something you discover, not
              just buy.
            </p>
          </Reveal>
          <div className="md:col-span-7 grid grid-cols-3 gap-3 md:gap-4">
            {[
              { n: 1, src: "/gallery/dsc-1.jpg" },
              { n: 2, src: "/gallery/lifestyle-1.jpg" },
              { n: 3, src: "/gallery/dsc-4.jpg" },
            ].map(({ n, src }) => (
              <Reveal key={n} delay={n * 0.08}>
                <div className="relative aspect-[3/4] w-full overflow-hidden border border-cream/15">
                  <Image
                    src={src}
                    alt={`EKLPS piece ${n}`}
                    fill
                    sizes="(max-width: 768px) 33vw, 22vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/15" />
                  <div className="absolute bottom-2 left-2 font-mono text-[9px] uppercase tracking-[0.25em] opacity-80">
                    // piece · {n.toString().padStart(2, "0")}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* The Space */}
        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-70 mb-8">
            // {t("eklps.spaceTitle")}
          </div>
        </Reveal>
        <div className="max-w-4xl mb-32 md:mb-48">
          <Reveal>
            <h3 className="font-mono text-[clamp(2rem,6vw,6rem)] leading-[0.9] lowercase mb-8">
              part atelier, part stage, part lab
            </h3>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-mono text-sm md:text-base leading-[1.8] opacity-80 max-w-2xl">
              Building a physical home for it all: a hybrid studio, gallery,
              and workshop — a place where music is recorded, garments are
              made, visuals are created, and communities gather. More than a
              studio, this will be the EKLPS hub — where everything converges.
            </p>
          </Reveal>
        </div>

        {/* The Symbol */}
        <Reveal>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-70 mb-8">
            // {t("eklps.symbolTitle")}
          </div>
        </Reveal>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-24 py-8 md:py-24 mb-12 md:mb-24">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <PlanetMark size={260} className="text-cream" />
          </motion.div>
          <div className="max-w-md">
            <Reveal>
              <h3 className="font-mono text-2xl md:text-3xl lowercase mb-4">
                the universal symbol
              </h3>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-mono text-xs md:text-sm leading-[1.7] opacity-75">
                One symbol connects the entire universe. The planet mark
                transcends individual branches — music, records, events,
                clothing. The horizontal line passes through the circle, and
                the iconic eclipse moment is created.
              </p>
            </Reveal>
          </div>
        </div>

        {/* CTA */}
        <Reveal>
          <div className="flex justify-center pt-8 md:pt-24 border-t border-cream/15">
            <a
              href="https://www.instagram.com/_eklps/"
              target="_blank"
              rel="noopener"
              className="group inline-flex items-baseline gap-4 font-mono text-lg md:text-2xl lowercase hover:opacity-70 transition-opacity"
              data-cursor-hover
            >
              _ {t("eklps.cta")}
              <span className="inline-block transition-transform group-hover:translate-x-2">
                →
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const VISIONARIES = [
  {
    name: "goldcher",
    role: "sound",
    bio: "House, afro house, melodic house, french touch. Supported by Adriatique, Keinemusik, Tiësto and Pete Tong. Co-founder of EKLPS.",
    image: "/eklps/visionary-goldcher.jpg",
    placeholder: false,
    link: null,
    linkLabel: null,
  },
  {
    name: "irina rimes",
    role: "voice",
    bio: "Celebrated Romanian artist with her own distinct voice and global following. Co-founder of EKLPS.",
    image: "/eklps/visionary-irina.jpg",
    placeholder: false,
    link: "https://www.instagram.com/irinarimes/",
    linkLabel: "@irinarimes",
  },
  {
    name: "san",
    role: "vision",
    bio: "A background in directing, concept development and fashion design. SAN brings creative clarity and execution to EKLPS.",
    image: "/eklps/visionary-san.jpg",
    placeholder: false,
    link: null,
    linkLabel: null,
  },
];
