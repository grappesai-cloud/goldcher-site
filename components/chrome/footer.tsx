"use client";

import { useLocale } from "@/lib/i18n";

export function Footer() {
  const { t } = useLocale();
  const scrollTop = () => {
    if (typeof window === "undefined") return;
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      className="relative w-full overflow-x-clip"
      style={{ backgroundColor: "var(--carbon)", color: "var(--cream)" }}
    >
      <div className="px-6 md:px-10 xl:px-16 pt-24 pb-8">
        <h2 className="font-display font-extrabold text-[clamp(1.8rem,4.7vw,5.5rem)] leading-[0.85] tracking-tight select-none">
          GOLDCHERMUSIC.COM
        </h2>

        <div className="mt-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 font-mono text-[11px] uppercase tracking-widest">
          <div className="flex flex-col gap-1">
            <span>{t("footer.copyright")}</span>
            <span className="opacity-60">{t("footer.builtIn")}</span>
          </div>
          <button onClick={scrollTop} className="hover:opacity-60 transition-opacity">
            {t("footer.returnTop")} ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
