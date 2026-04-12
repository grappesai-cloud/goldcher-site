"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function Hero() {
  const { scrollYProgress } = useScroll();
  const videoScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.08]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.6]);
  const textY = useTransform(scrollYProgress, [0, 0.2], ["0%", "-30%"]);

  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Bucharest",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
      });
      setTime(formatter.format(now) + " CET");
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="intro"
      className="relative h-[100svh] w-full overflow-hidden"
      style={{ color: "#ede9e2" }}
    >
      {/* Video background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ scale: videoScale, opacity: videoOpacity }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.35) 30%, rgba(10,10,10,0.6) 85%, rgba(237,233,226,0.0) 100%)",
          }}
        />
      </motion.div>

      {/* Corner metadata */}
      <div className="absolute top-28 md:top-32 left-6 md:left-10 xl:left-16 z-10 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em]">
        <div className="opacity-60">01 — Intro</div>
      </div>

      <div className="absolute top-28 md:top-32 right-6 md:right-10 xl:right-16 z-10 font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-right">
        <div>{time}</div>
        <div className="opacity-60 mt-1">Bucharest — The World</div>
      </div>

      {/* Main mark — spray-painted GOLDCHER lockup */}
      <motion.div
        className="absolute inset-x-0 bottom-[14vh] md:bottom-[12vh] z-10 flex items-end px-6 md:px-10 xl:px-16"
        style={{ y: textY }}
      >
        <div className="relative w-full">
          <h1 className="sr-only">GOLDCHER</h1>
          <div className="relative w-full aspect-[8/1.4] max-h-[38vh]">
            <Image
              src="/logos/goldcher-spray.png"
              alt="GOLDCHER"
              fill
              priority
              sizes="100vw"
              className="object-contain object-left"
              style={{ filter: "invert(1)" }}
            />
          </div>
        </div>
      </motion.div>

      {/* Tagline — desktop only, left */}
      <div className="hidden md:block absolute bottom-8 left-10 xl:left-16 z-10 font-mono text-xs uppercase tracking-[0.25em] max-w-xs">
        <span className="opacity-80">— The cool is in the understatement</span>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] opacity-70">
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block h-6 w-px bg-current"
        />
      </div>

      {/* Since — desktop only, right */}
      <div className="hidden md:block absolute bottom-8 right-10 xl:right-16 z-10 font-mono text-xs uppercase tracking-[0.25em]">
        <span className="opacity-60">Since 20XX</span>
      </div>

      {/* Mobile footer row — compact */}
      <div className="md:hidden absolute bottom-16 left-6 right-6 z-10 flex items-baseline justify-between font-mono text-[9px] uppercase tracking-[0.25em] opacity-70">
        <span>— Understatement</span>
        <span>Since 20XX</span>
      </div>
    </section>
  );
}
