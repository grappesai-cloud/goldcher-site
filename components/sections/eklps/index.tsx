"use client";

import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";

export function EklpsSection() {
  return (
    <section
      id="eklps"
      className="eklps-zone relative w-full py-24 md:py-40 overflow-hidden"
    >
      <div className="px-6 md:px-10 xl:px-16">
        {/* Logo */}
        <Reveal>
          <div className="flex justify-center mb-16 md:mb-24">
            <Image
              src="/logos/eklps-logo-2.png"
              alt="EKLPS logo"
              width={300}
              height={100}
              className="w-[200px] md:w-[300px] h-auto object-contain"
            />
          </div>
        </Reveal>

        {/* Description */}
        <Reveal delay={0.1}>
          <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
            <p className="text-base md:text-lg leading-[1.8] opacity-90 mb-6">
              EKLPS is a platform combining a clothing brand, a party concept, and a music label.
            </p>
            <p className="text-base md:text-lg leading-[1.8] opacity-90 mb-6">
              Built around a strong visual and sonic identity, it brings together style, sound, and community into one cohesive experience.
            </p>
            <p className="text-base md:text-lg leading-[1.8] opacity-90">
              From what you wear to what you hear and where you go, EKLPS creates moments that are immersive, emotional, and designed to stay with you.
            </p>
          </div>
        </Reveal>

        {/* Video — old hero intro */}
        <Reveal>
          <div className="relative w-full max-w-3xl mx-auto aspect-video mb-16 md:mb-24 overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="h-full w-full object-cover"
            >
              <source src="/videos/eklps-intro.mp4" type="video/mp4" />
            </video>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal>
          <div className="flex justify-center pt-12 border-t border-white/15">
            <a
              href="https://www.instagram.com/_eklps/"
              target="_blank"
              rel="noopener"
              className="group inline-flex items-baseline gap-4 font-mono text-lg md:text-2xl lowercase hover:opacity-70 transition-opacity"
              data-cursor-hover
            >
              _ enter the eklps world
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
