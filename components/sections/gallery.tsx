"use client";

import Image from "next/image";
import galleryData from "@/data/gallery.json";
import { Reveal } from "@/components/motion/reveal";
import { useLocale } from "@/lib/i18n";

export function Gallery() {
  const { t } = useLocale();

  return (
    <section className="relative w-full py-24 md:py-32">
      <div className="px-6 md:px-10 xl:px-16">
        <Reveal>
          <h2 className="font-display font-extrabold text-[clamp(1.8rem,4vw,4.5rem)] leading-[0.92] tracking-[-0.03em] uppercase mb-12 md:mb-16">
            {t("gallery.title")}
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 auto-rows-[250px] md:auto-rows-[300px]">
          {galleryData.map((img, i) => (
            <Reveal key={img.src} delay={(i % 4) * 0.06}>
              <div className="relative overflow-hidden h-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover object-center"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
