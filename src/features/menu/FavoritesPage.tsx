"use client";

import { useResponsiveMode } from "@/hooks/useResponsiveMode";

import { DesktopFavoritesPage } from "./DesktopFavoritesPage";
import { MobileFavoritesPage } from "./MobileFavoritesPage";
import { TabletFavoritesPage } from "./TabletFavoritesPage";

/** Routes favorites to a mobile-first reorder flow or expanded desktop layout. */
export function FavoritesPage() {
  const mode = useResponsiveMode();

  if (mode === "mobile") {
    return <MobileFavoritesPage />;
  }

  if (mode === "tablet") {
    return <TabletFavoritesPage />;
  }

  return <DesktopFavoritesPage />;
}
