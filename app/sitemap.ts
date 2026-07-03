import type { MetadataRoute } from "next";

// Single-page site — the homepage is the only indexable URL.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://goldchermusic.com",
      lastModified: new Date("2026-07-03"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
