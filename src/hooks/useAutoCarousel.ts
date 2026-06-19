"use client";

import { useEffect, useRef } from "react";

interface UseAutoCarouselOptions {
  count: number;
  enabled?: boolean;
  intervalMs?: number;
  onAdvance: () => void;
  resetKey?: unknown;
}

const DEFAULT_AUTO_CAROUSEL_INTERVAL_MS = 6500;

/** Advances controlled carousel state without running during reduced motion or hidden tabs. */
export function useAutoCarousel({
  count,
  enabled = true,
  intervalMs = DEFAULT_AUTO_CAROUSEL_INTERVAL_MS,
  onAdvance,
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

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (reducedMotionQuery.matches) {
      return;
    }

    const intervalId = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        latestOnAdvance.current();
      }
    }, intervalMs);

    return () => window.clearInterval(intervalId);
  }, [count, enabled, intervalMs, resetKey]);
}
