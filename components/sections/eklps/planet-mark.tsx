"use client";

import { motion } from "framer-motion";

/**
 * The EKLPS planet-mark — a circle with a horizontal line passing through it,
 * representing the "eclipse moment". Animates in on scroll.
 */
export function PlanetMark({
  size = 80,
  lineColor = "currentColor",
  circleColor = "currentColor",
  className,
}: {
  size?: number;
  lineColor?: string;
  circleColor?: string;
  className?: string;
}) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      <motion.circle
        cx="50"
        cy="50"
        r="16"
        fill="none"
        stroke={circleColor}
        strokeWidth="1.5"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
          },
        }}
      />
      <motion.line
        x1="5"
        y1="50"
        x2="95"
        y2="50"
        stroke={lineColor}
        strokeWidth="1.2"
        variants={{
          hidden: { pathLength: 0 },
          visible: {
            pathLength: 1,
            transition: { duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
          },
        }}
      />
    </motion.svg>
  );
}
