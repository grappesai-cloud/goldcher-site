import Image from "next/image";
import { connection } from "next/server";
import { getAlbums } from "@/lib/spotify";

export async function Spotify() {
  await connection();
  const albums = await getAlbums(10);

  return (
    <section id="work" className="relative w-full py-12 md:py-20">
      <div className="flex flex-wrap justify-center gap-2 md:gap-3 px-4 md:px-10 xl:px-16">
        {albums.map((album) => (
          <a
            key={album.id}
            href={album.external_urls.spotify}
            target="_blank"
            rel="noopener"
            className="group"
            data-cursor-hover
          >
            <div className="relative w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[160px] md:h-[160px] overflow-hidden">
              {album.images[0] ? (
                <Image
                  src={album.images[0].url}
                  alt={album.name}
                  fill
                  sizes="120px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
              ) : (
                <div className="absolute inset-0 bg-current/10" />
              )}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
