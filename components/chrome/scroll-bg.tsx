"use client";

import { useEffect } from "react";

// Interpolate between two colors expressed as { r, g, b }
function lerpColor(
  a: { r: number; g: number; b: number },
  b: { r: number; g: number; b: number },
  t: number
) {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  };
}

function rgb({ r, g, b }: { r: number; g: number; b: number }) {
  return `rgb(${r}, ${g}, ${b})`;
}

// Cream → Carbon transition
const CREAM = { r: 237, g: 233, b: 226 }; // #EDE9E2
const CARBON = { r: 18, g: 18, b: 18 }; // ~ #121212

const INK = { r: 10, g: 10, b: 10 };
const CREAM_FG = { r: 237, g: 233, b: 226 };

export function ScrollBg() {
  useEffect(() => {
    let ticking = false;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, window.scrollY / max));

      // Hard hold cream until 62%, fast ramp to carbon by 72%, hold carbon.
      // Narrow ramp prevents mid-progress muddy text on grey backgrounds.
      let t = 0;
      if (progress < 0.62) t = 0;
      else if (progress > 0.72) t = 1;
      else t = (progress - 0.62) / 0.1;

      const bg = lerpColor(CREAM, CARBON, t);
      const fg = lerpColor(INK, CREAM_FG, t);

      document.body.style.backgroundColor = rgb(bg);
      document.body.style.color = rgb(fg);
      document.documentElement.style.setProperty("--page-bg", rgb(bg));
      document.documentElement.style.setProperty("--page-fg", rgb(fg));

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return null;
}
