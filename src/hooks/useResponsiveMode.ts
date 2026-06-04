"use client";

import { useEffect, useState } from "react";

export type ResponsiveMode = "mobile" | "tablet" | "desktop";

/** Maps viewport width to the app's layout mode breakpoints. */
function getResponsiveMode(width: number): ResponsiveMode {
  if (width >= 1024) {
    return "desktop";
  }

  if (width >= 768) {
    return "tablet";
  }

  return "mobile";
}

/** Tracks the current responsive layout mode on the client. */
export function useResponsiveMode(): ResponsiveMode {
  const [mode, setMode] = useState<ResponsiveMode>("mobile");

  useEffect(() => {
    const syncMode = () => setMode(getResponsiveMode(window.innerWidth));

    syncMode();
    window.addEventListener("resize", syncMode);

    return () => window.removeEventListener("resize", syncMode);
  }, []);

  return mode;
}
