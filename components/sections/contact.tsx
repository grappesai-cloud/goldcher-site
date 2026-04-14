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
        <h2 className="font-display font-extrabold text-[1.2rem] sm:text-[clamp(1.8rem,5vw,5.5rem)] leading-[0.88] tracking-[-0.03em] uppercase mb-6">
          {t("contact.title")}
        </h2>
      </Reveal>


      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
        <div className="md:col-span-7">
          <Reveal delay={0.18}>
            <div className="border-t border-current/20 pt-8">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-60 mb-2">
                // management
              </div>
              <div className="font-bold text-xl md:text-2xl uppercase tracking-tight">
                Avi Dahan
              </div>
              <div className="mt-3 flex flex-col gap-2">
                <a href="mailto:avi@funkshway.la" className="text-sm md:text-base opacity-80 hover:opacity-100 transition-opacity" data-cursor-hover>
                  avi@funkshway.la
                </a>
                <a href="tel:+12134474143" className="text-sm md:text-base opacity-80 hover:opacity-100 transition-opacity" data-cursor-hover>
                  +1 (213) 447-4143
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="border-t border-current/20 pt-8 mt-10">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-60 mb-2">
                // booking
              </div>
              <div className="font-bold text-xl md:text-2xl uppercase tracking-tight">
                Anceaux Alexandre
              </div>
              <div className="mt-3 flex flex-col gap-2">
                <a href="mailto:alex@ariamusic.fr" className="text-sm md:text-base opacity-80 hover:opacity-100 transition-opacity" data-cursor-hover>
                  alex@ariamusic.fr
                </a>
                <a href="tel:+33648728358" className="text-sm md:text-base opacity-80 hover:opacity-100 transition-opacity" data-cursor-hover>
                  +33 6 48 72 83 58
                </a>
              </div>
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
