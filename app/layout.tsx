import type { Metadata, Viewport } from "next";
import { Courier_Prime } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/chrome/smooth-scroll";
import { Cursor } from "@/components/chrome/cursor";
import { Nav } from "@/components/chrome/nav";
import { ScrollBg } from "@/components/chrome/scroll-bg";
import { Loader } from "@/components/chrome/loader";
import { Noise } from "@/components/chrome/noise";
import { LocaleProvider } from "@/lib/i18n";

const courier = Courier_Prime({
  variable: "--font-courier",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://goldchermusic.com"),
  title: {
    default: "GOLDCHER — Electronic Music Producer & DJ",
    template: "%s · GOLDCHER",
  },
  description:
    "Goldcher — house, afro house, melodic house, french touch. Over 30M streams, supported by Adriatique, Keinemusik, Tiësto, Pete Tong and more.",
  keywords: [
    "Goldcher",
    "DJ",
    "electronic music",
    "afro house",
    "melodic house",
    "french touch",
    "EKLPS",
  ],
  openGraph: {
    type: "website",
    title: "GOLDCHER",
    description:
      "Romanian-born, internationally supported electronic music producer and DJ.",
    url: "https://goldchermusic.com",
    siteName: "GOLDCHER",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "GOLDCHER",
    description:
      "Romanian-born, internationally supported electronic music producer and DJ.",
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.png",
  },
};

// Structured data — helps Google identify Goldcher as a music act and surface
// the knowledge panel / profiles for "goldcher", "goldcher music", "goldcher dj".
const SAME_AS = [
  "https://www.instagram.com/goldchermusic/",
  "https://www.tiktok.com/@goldchermusic",
  "https://www.youtube.com/@Goldchermusic",
  "https://open.spotify.com/artist/1n9K41Jye8s8F0z1hb1Qhz",
  "https://www.beatport.com/artist/goldcher/1211919",
  "https://soundcloud.com/goldcher",
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MusicGroup",
      "@id": "https://goldchermusic.com/#artist",
      name: "Goldcher",
      alternateName: ["Goldcher Music", "Goldcher DJ"],
      description:
        "Goldcher — electronic music producer and DJ. House, afro house, melodic house, french touch.",
      genre: ["House", "Afro House", "Melodic House", "French Touch"],
      url: "https://goldchermusic.com",
      image: "https://goldchermusic.com/opengraph-image",
      sameAs: SAME_AS,
    },
    {
      "@type": "WebSite",
      "@id": "https://goldchermusic.com/#website",
      name: "GOLDCHER",
      alternateName: ["Goldcher", "Goldcher Music"],
      url: "https://goldchermusic.com",
      inLanguage: "en",
      publisher: { "@id": "https://goldchermusic.com/#artist" },
    },
  ],
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={courier.variable}
    >
      <body className="grain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <LocaleProvider>
          <Loader />
          <Noise />
          <SmoothScroll>
            <ScrollBg />
            <Cursor />
            <Nav />
            {children}
          </SmoothScroll>
        </LocaleProvider>
      </body>
    </html>
  );
}
