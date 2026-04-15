"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export function Hero() {
  const { scrollYProgress } = useScroll();
  const videoScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.08]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.6]);
  const textY = useTransform(scrollYProgress, [0, 0.2], ["0%", "-30%"]);


  return (
    <section
      id="intro"
      className="relative h-[100svh] w-full overflow-hidden"
      style={{ color: "#ffffff" }}
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
          preload="metadata"
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


      {/* Main mark — spray-painted GOLDCHER lockup */}
      <motion.div
        className="absolute inset-x-0 bottom-[14vh] md:bottom-[12vh] z-10 flex items-end px-6 md:px-10 xl:px-16"
        style={{ y: textY }}
      >
        <div className="relative w-full text-center">
          <h1 className="sr-only">GOLDCHER</h1>
          <div className="relative w-3/5 mx-auto aspect-[8/1.4] max-h-[25vh]">
            <Image
              src="/logos/goldcher-spray.png"
              alt="GOLDCHER"
              fill
              priority
              sizes="100vw"
              className="object-contain object-center"
              style={{ filter: "invert(1)" }}
            />
          </div>
        </div>
      </motion.div>


      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] opacity-70">
        <span>Scroll</span>
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block h-6 w-px bg-current"
        />
      </div>

    </section>
  );
}
