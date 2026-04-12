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

export default async function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-x-clip">
      <Hero />
      <Numbers />
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
