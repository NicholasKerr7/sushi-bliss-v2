"use client";

import { useEffect, useRef } from "react";

interface UseAutoCarouselOptions {
  count: number;
  enabled?: boolean;
  intervalMs?: number;
  onAdvance: () => void;
  respectReducedMotion?: boolean;
  resetKey?: unknown;
}

const DEFAULT_AUTO_CAROUSEL_INTERVAL_MS = 5200;

/** Advances controlled carousel state while avoiding hidden tabs and stale callbacks. */
export function useAutoCarousel({
  count,
  enabled = true,
  intervalMs = DEFAULT_AUTO_CAROUSEL_INTERVAL_MS,
  onAdvance,
  respectReducedMotion = false,
  resetKey,
}: UseAutoCarouselOptions) {
  const latestOnAdvance = useRef(onAdvance);

  useEffect(() => {
    latestOnAdvance.current = onAdvance;
  }, [onAdvance]);

  useEffect(() => {
    if (!enabled || count <= 1 || intervalMs <= 0) {
      return;
    }

    if (respectReducedMotion) {
      const reducedMotionQuery = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );

      if (reducedMotionQuery.matches) {
        return;
      }
    }

    const intervalId = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        latestOnAdvance.current();
      }
    }, intervalMs);

    return () => window.clearInterval(intervalId);
  }, [count, enabled, intervalMs, respectReducedMotion, resetKey]);
}
