import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GOLDCHER — Electronic Music Producer & DJ",
    short_name: "GOLDCHER",
    description:
      "Goldcher — house, afro house, melodic house, french touch. Producer & DJ.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/icon.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}
