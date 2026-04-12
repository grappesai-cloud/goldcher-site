import Image from "next/image";
import { connection } from "next/server";
import { getAlbums, getSpotifyOEmbed } from "@/lib/spotify";
import { Reveal } from "@/components/motion/reveal";

export async function Spotify() {
  await connection();

  const [albums, oembed] = await Promise.all([
    getAlbums(10),
    getSpotifyOEmbed(),
  ]);

  const latest = albums[0] ?? null;
  const rest = albums.slice(1);

  return (
    <section
      id="work"
      className="relative w-full px-6 md:px-10 xl:px-16 py-24 md:py-32"
    >
      <Reveal>
        <div className="flex items-baseline justify-between mb-16 md:mb-24 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] opacity-60">
          <span>03 — Now Playing</span>
          <a
            href="https://open.spotify.com/artist/1n9K41Jye8s8F0z1hb1Qhz"
            target="_blank"
            rel="noopener"
            className="hover:opacity-100"
          >
            Listen on Spotify →
          </a>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16">
        {/* Latest release — 3 columns */}
        <div className="md:col-span-3">
          <Reveal>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-60 mb-6">
              Latest Release
            </div>
          </Reveal>
          {latest ? (
            <Reveal delay={0.1}>
              <a
                href={latest.external_urls.spotify}
                target="_blank"
                rel="noopener"
                className="block group"
                data-cursor-hover
              >
                <div className="relative aspect-square w-full max-w-[520px] overflow-hidden">
                  {latest.images[0] ? (
                    <Image
                      src={latest.images[0].url}
                      alt={latest.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 520px"
                      className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-carbon" />
                  )}
                </div>
                <h3 className="font-display font-extrabold text-3xl md:text-5xl mt-6 tracking-tight uppercase">
                  {latest.name}
                </h3>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-60 mt-2">
                  {latest.album_type} · {latest.release_date}
                </div>
              </a>
            </Reveal>
          ) : oembed ? (
            <Reveal delay={0.1}>
              <a
                href={`https://open.spotify.com/artist/1n9K41Jye8s8F0z1hb1Qhz`}
                target="_blank"
                rel="noopener"
                className="block group"
                data-cursor-hover
              >
                <div className="relative aspect-square w-full max-w-[520px] overflow-hidden">
                  <Image
                    src={oembed.thumbnail_url}
                    alt={oembed.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 520px"
                    className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]"
                    unoptimized
                  />
                </div>
                <h3 className="font-display font-extrabold text-3xl md:text-5xl mt-6 tracking-tight uppercase">
                  {oembed.title}
                </h3>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-60 mt-2">
                  Artist profile · Spotify
                </div>
              </a>
            </Reveal>
          ) : (
            <Reveal delay={0.1}>
              <div className="relative aspect-square w-full max-w-[520px] overflow-hidden border border-current/15">
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 30%, rgba(0,0,0,0.08), transparent 60%), radial-gradient(circle, currentColor 0.4px, transparent 1px)",
                    backgroundSize: "100% 100%, 14px 14px",
                    opacity: 0.25,
                  }}
                />
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-60 flex justify-between">
                    <span>_ release · pending</span>
                    <span>2026</span>
                  </div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-50">
                    // awaiting spotify
                  </div>
                </div>
              </div>
              <h3 className="font-display font-extrabold text-3xl md:text-5xl mt-6 tracking-tight uppercase">
                New release
              </h3>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-60 mt-2">
                To be announced
              </div>
            </Reveal>
          )}
        </div>

        {/* Releases — 2 columns */}
        <div className="md:col-span-2">
          <Reveal delay={0.15}>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-60 mb-6">
              Releases
            </div>
          </Reveal>
          <ol className="flex flex-col">
            {rest.length === 0 &&
              [1, 2, 3, 4, 5].map((i) => (
                <li
                  key={i}
                  className="border-t border-current/15 last:border-b py-4 flex items-center gap-4 opacity-50"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] w-6 tabular-nums">
                    {i.toString().padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-bold text-sm md:text-base uppercase truncate tracking-tight">
                      Release · {i.toString().padStart(2, "0")}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] truncate">
                      // placeholder
                    </div>
                  </div>
                </li>
              ))}
            {rest.map((album, i) => (
              <Reveal key={album.id} delay={0.2 + i * 0.04}>
                <li className="border-t border-current/15 last:border-b py-3 group">
                  <a
                    href={album.external_urls.spotify}
                    target="_blank"
                    rel="noopener"
                    className="flex items-center gap-4 hover:opacity-100 transition-opacity"
                    data-cursor-hover
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-50 w-6 tabular-nums shrink-0">
                      {(i + 2).toString().padStart(2, "0")}
                    </span>
                    {album.images[0] ? (
                      <div className="relative w-12 h-12 shrink-0 overflow-hidden">
                        <Image
                          src={album.images[album.images.length - 1].url}
                          alt={album.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    ) : null}
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-bold text-sm md:text-base uppercase truncate tracking-tight">
                        {album.name}
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-50 truncate">
                        {album.album_type} · {album.release_date}
                      </div>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-40 group-hover:opacity-100 transition-opacity shrink-0">
                      →
                    </span>
                  </a>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
