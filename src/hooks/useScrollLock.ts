"use client";

import { useEffect } from "react";

const scrollLockClassName = "scroll-locked";
let activeScrollLocks = 0;

/** Locks document scrolling while overlays are open, including nested dialog handoffs. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) {
      return;
    }

    activeScrollLocks += 1;
    document.documentElement.classList.add(scrollLockClassName);
    document.body.classList.add(scrollLockClassName);

    return () => {
      activeScrollLocks = Math.max(0, activeScrollLocks - 1);

      if (activeScrollLocks === 0) {
        document.documentElement.classList.remove(scrollLockClassName);
        document.body.classList.remove(scrollLockClassName);
      }
    };
  }, [active]);
}
