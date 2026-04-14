"use client";

import { useEffect } from "react";

/**
 * Art Direction palette — light base throughout.
 * No scroll-based color transition; just enforce the cream bg + ink fg.
 */
export function ScrollBg() {
  useEffect(() => {
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.color = "#1a1a1a";
    document.documentElement.style.setProperty("--page-bg", "#ffffff");
    document.documentElement.style.setProperty("--page-fg", "#1a1a1a");
  }, []);

  return null;
}
