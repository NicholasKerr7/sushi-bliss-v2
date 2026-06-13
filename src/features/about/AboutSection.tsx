"use client";

import { useResponsiveMode } from "@/hooks/useResponsiveMode";

import { DesktopAboutSection } from "./DesktopAboutSection";
import { MobileAboutSection } from "./MobileAboutSection";
import { TabletAboutSection } from "./TabletAboutSection";

/** Switches the brand story between mobile-first and expanded editorial layouts. */
export function AboutSection() {
  const mode = useResponsiveMode();

  if (mode === "mobile") {
    return <MobileAboutSection />;
  }

  if (mode === "tablet") {
    return <TabletAboutSection />;
  }

  return <DesktopAboutSection />;
}
