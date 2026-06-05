import type { Metadata } from "next";

import { NotificationsCenter } from "@/features/notifications/NotificationsCenter";

export const metadata: Metadata = {
  title: "Notifications",
};

export default function NotificationsPage() {
  return <NotificationsCenter />;
}
