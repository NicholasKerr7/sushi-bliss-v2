"use client";

import { useMemo, useState } from "react";

import { TabletBottomNavigation } from "@/components/layout/TabletBottomNavigation";
import { TabletExperienceHeader } from "@/components/layout/TabletExperienceHeader";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { useCart } from "@/hooks/useCart";
import { useNotifications } from "@/hooks/useNotifications";
import {
  filterNotifications,
  sortNotificationsByRecency,
  type NotificationFilter,
} from "@/lib/notifications";
import type { AppNotification } from "@/types/notification";

import { TabletNotificationDetailView } from "./TabletNotificationDetailView";
import { TabletNotificationsListView } from "./TabletNotificationsListView";

/** Coordinates tablet notification list, filtering, mark-read state, detail, and cart access. */
export function TabletNotificationsCenter() {
  const { itemCount } = useCart();
  const { markAllRead, markRead, notifications, unreadCount } =
    useNotifications();
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>("all");
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<AppNotification | null>(null);

  const sortedNotifications = useMemo(
    () => sortNotificationsByRecency(notifications),
    [notifications],
  );
  const filteredNotifications = useMemo(
    () => filterNotifications(sortedNotifications, activeFilter),
    [activeFilter, sortedNotifications],
  );

  const handleViewNotification = (notification: AppNotification) => {
    markRead(notification.id);
    setSelectedNotification({
      ...notification,
      readAt: notification.readAt || new Date().toISOString(),
    });
  };

  return (
    <section
      className="flex min-h-dvh flex-col bg-[#050607] px-[18px] pb-3 pt-2 text-white min-[1080px]:px-[26px] min-[1080px]:pb-4 min-[1080px]:pt-3"
      id="notifications"
    >
      <TabletExperienceHeader
        cartCount={itemCount}
        onOpenCart={() => setCartOpen(true)}
        title="Notifications"
      />

      <main className="mx-auto w-full max-w-[1034px]">
        {selectedNotification ? (
          <TabletNotificationDetailView
            notification={selectedNotification}
            onBack={() => setSelectedNotification(null)}
          />
        ) : (
          <TabletNotificationsListView
            activeFilter={activeFilter}
            allNotifications={sortedNotifications}
            notifications={filteredNotifications}
            unreadCount={unreadCount}
            onFilterChange={setActiveFilter}
            onMarkAllRead={markAllRead}
            onViewNotification={handleViewNotification}
          />
        )}
      </main>

      <TabletBottomNavigation
        activeId="profile"
        ariaLabel="Tablet notifications navigation"
        fixed={false}
      />
      <CartDrawer onOpenChange={setCartOpen} open={cartOpen} />
    </section>
  );
}
