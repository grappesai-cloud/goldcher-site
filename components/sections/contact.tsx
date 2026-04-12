"use client";

import { Reveal } from "@/components/motion/reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { useLocale } from "@/lib/i18n";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/goldchermusic/" },
  { label: "TikTok", href: "https://www.tiktok.com/@goldchermusic" },
  { label: "YouTube", href: "https://www.youtube.com/@Goldchermusic" },
  {
    label: "Spotify",
    href: "https://open.spotify.com/artist/1n9K41Jye8s8F0z1hb1Qhz",
  },
  {
    label: "Beatport",
    href: "https://www.beatport.com/artist/goldcher/1211919",
  },
  { label: "SoundCloud", href: "https://soundcloud.com/goldcher" },
];

export function Contact() {
  const { t } = useLocale();
  return (
    <section
      id="contact"
      className="relative w-full px-6 md:px-10 xl:px-16 py-24 md:py-32"
    >
      <Reveal>
        <div className="flex items-baseline justify-between mb-16 md:mb-24 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] opacity-60">
          <span>11 — Contact</span>
          <span>{t("contact.title")}</span>
        </div>
      </Reveal>

      <Reveal>
        <h2 className="font-display font-extrabold text-[1.6rem] sm:text-[clamp(2.5rem,7vw,8rem)] leading-[0.88] tracking-[-0.03em] uppercase mb-6">
          {t("contact.title")}
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="text-base md:text-lg opacity-80 max-w-xl mb-16 md:mb-24">
          {t("contact.subtitle")}
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        <div className="md:col-span-7">
          <Reveal delay={0.18}>
            <div className="border-t border-current/20 pt-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-60 mb-2">
                // {t("contact.manager").toLowerCase()}
              </div>
              <div className="font-display text-2xl md:text-3xl font-bold">
                {t("contact.manager")}
              </div>
              <div className="font-mono text-xs uppercase tracking-[0.2em] opacity-70 mt-1">
                {t("contact.agency")}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10 flex flex-col gap-6">
              <Magnetic strength={0.2}>
                <a
                  href="mailto:office@theentbureau.com"
                  className="inline-block font-display font-extrabold text-xs sm:text-base md:text-xl xl:text-2xl uppercase tracking-tight border-b-2 border-current pb-1 hover:opacity-60 transition-opacity break-all sm:break-normal"
                  data-cursor-hover
                >
                  office@theentbureau.com
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a
                  href="tel:+40765546095"
                  className="inline-block font-display font-extrabold text-base sm:text-lg md:text-2xl uppercase tracking-tight hover:opacity-60 transition-opacity"
                  data-cursor-hover
                >
                  +40 765 546 095
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-5">
          <Reveal>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-60 mb-6 border-t border-current/20 pt-8">
              // {t("contact.follow").toLowerCase()}
            </div>
          </Reveal>
          <ul className="flex flex-col gap-4">
            {SOCIALS.map((s, i) => (
              <Reveal key={s.label} delay={0.1 + i * 0.05}>
                <li>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener"
                    className="group flex items-baseline justify-between border-b border-current/20 pb-2 hover:opacity-60 transition-opacity"
                    data-cursor-hover
                  >
                    <span className="font-display font-bold text-lg md:text-xl uppercase tracking-tight">
                      {s.label}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-50 group-hover:opacity-100 transition-opacity">
                      →
                    </span>
                  </a>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
