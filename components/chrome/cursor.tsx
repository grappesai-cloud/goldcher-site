"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 28, stiffness: 260, mass: 0.4 });
  const sy = useSpring(y, { damping: 28, stiffness: 260, mass: 0.4 });

  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setHovering(
        !!target.closest("a, button, [data-cursor-hover]")
      );
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseleave", leave);
    };
  }, [x, y, visible]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[10000] mix-blend-difference hidden md:block"
      style={{
        x: sx,
        y: sy,
        opacity: visible ? 1 : 0,
      }}
    >
      <motion.div
        className="select-none"
        animate={{
          scale: hovering ? 1.5 : 1,
          x: -20,
          y: -20,
        }}
        transition={{ type: "spring", damping: 22, stiffness: 300 }}
        style={{ fontSize: "40px", lineHeight: 1, color: "#FF0000" }}
      >
        ツ
      </motion.div>
    </motion.div>
  );
}
