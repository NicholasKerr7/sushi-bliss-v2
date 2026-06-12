"use client";

import { useResponsiveMode } from "@/hooks/useResponsiveMode";

import { DesktopOmakaseExperience } from "./DesktopOmakaseExperience";
import { MobileOmakaseExperience } from "./MobileOmakaseExperience";
import { TabletOmakaseExperience } from "./TabletOmakaseExperience";

/** Routes omakase experiences to mobile, tablet, or expanded desktop flows. */
export function OmakaseExperienceSection() {
  const mode = useResponsiveMode();

  if (mode === "mobile") {
    return <MobileOmakaseExperience />;
  }

  if (mode === "tablet") {
    return <TabletOmakaseExperience />;
  }

  return <DesktopOmakaseExperience />;
}
