"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORD = "GOLDCHER".split("");

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let start = performance.now();
    const min = 1500; // min display
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / min) * 100);
      setProgress(Math.floor(pct));
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        // wait for window load if not yet
        if (document.readyState === "complete") {
          setTimeout(() => setDone(true), 300);
        } else {
          window.addEventListener(
            "load",
            () => setTimeout(() => setDone(true), 300),
            { once: true }
          );
        }
      }
    };
    raf = requestAnimationFrame(tick);

    // Lock scroll during load
    document.documentElement.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) {
      document.documentElement.style.overflow = "";
    }
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[20000] flex items-center justify-center"
          style={{ backgroundColor: "var(--cream)", color: "var(--ink)" }}
        >
          <div className="flex items-baseline gap-[0.02em]">
            {WORD.map((c, i) => {
              const revealAt = (i / WORD.length) * 100;
              const visible = progress >= revealAt;
              return (
                <motion.span
                  key={i}
                  className="font-display font-extrabold text-[clamp(3rem,12vw,10rem)] leading-none tracking-tight"
                  animate={{
                    opacity: visible ? 1 : 0.08,
                    y: visible ? 0 : 8,
                  }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  {c}
                </motion.span>
              );
            })}
          </div>

          <div className="absolute bottom-8 right-8 font-mono text-xs uppercase tracking-widest tabular-nums">
            {progress.toString().padStart(3, "0")} / 100
          </div>
          <div className="absolute bottom-8 left-8 font-mono text-xs uppercase tracking-widest">
            goldchermusic.com
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
