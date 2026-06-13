"use client";

import { useResponsiveMode } from "@/hooks/useResponsiveMode";

import { DesktopNotificationsCenter } from "./DesktopNotificationsCenter";
import { MobileNotificationsCenter } from "./MobileNotificationsCenter";
import { TabletNotificationsCenter } from "./TabletNotificationsCenter";

export function NotificationsCenter() {
  const mode = useResponsiveMode();

  if (mode === "mobile") {
    return <MobileNotificationsCenter />;
  }

  if (mode === "tablet") {
    return <TabletNotificationsCenter />;
  }

  return <DesktopNotificationsCenter />;
}
