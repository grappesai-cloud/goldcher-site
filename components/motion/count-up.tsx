"use client";

import { useEffect, useRef, useState } from "react";

export function CountUp({
  value,
  display,
  duration = 1800,
  className,
}: {
  value: number;
  display: string;
  duration?: number;
  className?: string;
}) {
  const [current, setCurrent] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          const start = performance.now();
          const step = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            // easeOutExpo
            const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
            setCurrent(value * eased);
            if (t < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration, started]);

  // Format progressively matching the target display unit
  const formatProgressive = (val: number, target: string) => {
    if (target.endsWith("M")) {
      const num = val / 1_000_000;
      const decimals = target.includes(".") ? 1 : 0;
      return `${num.toFixed(decimals)}M`;
    }
    if (target.endsWith("K")) {
      return `${Math.floor(val / 1_000)}K`;
    }
    return Math.floor(val).toString();
  };

  return (
    <span ref={ref} className={className}>
      {started ? formatProgressive(current, display) : display.replace(/\d/g, "0")}
    </span>
  );
}
