"use client";

import { useResponsiveMode } from "@/hooks/useResponsiveMode";

import { DesktopSupportExperience } from "./DesktopSupportExperience";
import { MobileSupportCenter } from "./MobileSupportCenter";
import { TabletSupportCenter } from "./TabletSupportCenter";

export function SupportCenter() {
  const mode = useResponsiveMode();

  if (mode === "mobile") {
    return <MobileSupportCenter />;
  }

  if (mode === "tablet") {
    return <TabletSupportCenter />;
  }

  return <DesktopSupportExperience />;
}
