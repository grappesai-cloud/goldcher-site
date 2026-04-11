import type { Metadata, Viewport } from "next";
import { Syne, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/chrome/smooth-scroll";
import { Cursor } from "@/components/chrome/cursor";
import { Nav } from "@/components/chrome/nav";
import { ScrollBg } from "@/components/chrome/scroll-bg";
import { Loader } from "@/components/chrome/loader";
import { LocaleProvider } from "@/lib/i18n";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
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
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#ede9e2",
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
      className={`${syne.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="grain">
        <LocaleProvider>
          <Loader />
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
