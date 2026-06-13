"use client";

import { useResponsiveMode } from "@/hooks/useResponsiveMode";

import { DesktopOffersDashboard } from "./DesktopOffersDashboard";
import { MobileOffersDashboard } from "./MobileOffersDashboard";
import { TabletOffersDashboard } from "./TabletOffersDashboard";

export function OffersDashboard() {
  const mode = useResponsiveMode();

  if (mode === "mobile") {
    return <MobileOffersDashboard />;
  }

  if (mode === "tablet") {
    return <TabletOffersDashboard />;
  }

  return <DesktopOffersDashboard />;
}
