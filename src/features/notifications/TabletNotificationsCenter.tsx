"use client";

import { useMemo, useState } from "react";

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
import { TabletNotificationsBottomNav } from "./TabletNotificationsBottomNav";
import { TabletNotificationsHeader } from "./TabletNotificationsHeader";
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
      className="flex min-h-dvh flex-col bg-[#050607] pb-[92px] text-white"
      id="notifications"
    >
      <TabletNotificationsHeader
        cartCount={itemCount}
        unreadCount={unreadCount}
        onOpenCart={() => setCartOpen(true)}
      />

      <main className="mx-auto w-full max-w-[974px]">
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

      <TabletNotificationsBottomNav unreadCount={unreadCount} />
      <CartDrawer onOpenChange={setCartOpen} open={cartOpen} />
    </section>
  );
}
