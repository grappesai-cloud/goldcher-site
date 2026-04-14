"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

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
          style={{ backgroundColor: "#ffffff", color: "#1a1a1a" }}
        >
          <motion.div
            animate={{ opacity: progress > 10 ? 1 : 0, scale: progress > 10 ? 1 : 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src="/logos/goldcher-spray.png"
              alt="Goldcher"
              width={400}
              height={400}
              priority
              className="w-[clamp(120px,35vw,400px)] h-auto"
            />
          </motion.div>

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
