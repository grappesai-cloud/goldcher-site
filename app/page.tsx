import { Suspense } from "react";
import { Hero } from "@/components/sections/hero";
import { Numbers } from "@/components/sections/numbers";
import { Spotify } from "@/components/sections/spotify";
import { Bio } from "@/components/sections/bio";
import { Highlights } from "@/components/sections/highlights";
import { SupportedBy } from "@/components/sections/supported-by";
import { Gallery } from "@/components/sections/gallery";
import { EklpsSection } from "@/components/sections/eklps";
import { Press } from "@/components/sections/press";
import { Demos } from "@/components/sections/demos";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/chrome/footer";
import { getArtist } from "@/lib/spotify";

export default async function Home() {
  // Live follower count (cached 1h via Spotify lib)
  const artistPromise = getLiveArtist();

  return (
    <main className="relative flex min-h-screen flex-col overflow-x-clip">
      <Hero />
      <Suspense fallback={null}>
        <NumbersLive artistPromise={artistPromise} />
      </Suspense>
      <Suspense fallback={null}>
        <Spotify />
      </Suspense>
      <Bio />
      <Highlights />
      <SupportedBy />
      <Gallery />
      <EklpsSection />
      <Press />
      <Demos />
      <Contact />
      <Footer />
    </main>
  );
}

async function getLiveArtist() {
  "use cache";
  return getArtist();
}

async function NumbersLive({
  artistPromise,
}: {
  artistPromise: Promise<Awaited<ReturnType<typeof getArtist>>>;
}) {
  const artist = await artistPromise;
  return <Numbers liveFollowers={artist?.followers?.total} />;
}
