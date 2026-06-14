"use client";

import { useResponsiveMode } from "@/hooks/useResponsiveMode";

import { DesktopRecentlyViewedPage } from "./DesktopRecentlyViewedPage";
import { MobileRecentlyViewedPage } from "./MobileRecentlyViewedPage";
import { TabletRecentlyViewedPage } from "./TabletRecentlyViewedPage";

/** Routes recent-history views to mobile, tablet, or desktop compositions. */
export function RecentlyViewedPage() {
  const mode = useResponsiveMode();

  if (mode === "desktop") {
    return <DesktopRecentlyViewedPage />;
  }

  if (mode === "tablet") {
    return <TabletRecentlyViewedPage />;
  }

  return <MobileRecentlyViewedPage />;
}
