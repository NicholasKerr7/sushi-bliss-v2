"use client";

import { useEffect, useMemo, useState } from "react";

import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { CartDrawer } from "@/features/cart/CartDrawer";
import { useCart } from "@/hooks/useCart";
import { useNotifications } from "@/hooks/useNotifications";
import {
  filterNotifications,
  sortNotificationsByRecency,
  type NotificationFilter,
} from "@/lib/notifications";
import type { AppNotification } from "@/types/notification";

import { MobileNotificationDetailView } from "./MobileNotificationDetailView";
import { MobileNotificationsListView } from "./MobileNotificationsListView";
import { MobileNotificationsHeader } from "./MobileNotificationsPrimitives";

/** Coordinates mobile notification filters, read state, detail, and cart access. */
export function MobileNotificationsCenter() {
  const { markAllRead, markRead, notifications, unreadCount } =
    useNotifications();
  const { itemCount } = useCart();
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

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, [selectedNotification?.id]);

  const handleViewNotification = (notification: AppNotification) => {
    markRead(notification.id);
    setSelectedNotification({
      ...notification,
      readAt: notification.readAt || new Date().toISOString(),
    });
  };

  return (
    <section
      className="relative min-h-dvh overflow-hidden bg-[#050607] px-4 pb-[236px] pt-5 text-white md:hidden"
      id="notifications"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_14%,rgba(239,47,37,0.18),transparent_30%),radial-gradient(circle_at_100%_8%,rgba(215,168,79,0.16),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0)_0%,#050607_78%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[430px] bg-[url('/assets/ambience/elegant-sushi-bar-ambience-at-night.webp')] bg-cover bg-center opacity-24"
      />

      <div className="mobile-frame relative z-10">
        <MobileNotificationsHeader
          cartCount={itemCount}
          onOpenCart={() => setCartOpen(true)}
        />

        {selectedNotification ? (
          <MobileNotificationDetailView
            notification={selectedNotification}
            onBack={() => setSelectedNotification(null)}
          />
        ) : (
          <MobileNotificationsListView
            activeFilter={activeFilter}
            allNotifications={sortedNotifications}
            notifications={filteredNotifications}
            unreadCount={unreadCount}
            onFilterChange={setActiveFilter}
            onMarkAllRead={markAllRead}
            onViewNotification={handleViewNotification}
          />
        )}
      </div>

      <BottomNavigation
        activeId="profile"
        ariaLabel="Mobile notifications navigation"
      />
      <CartDrawer onOpenChange={setCartOpen} open={cartOpen} />
    </section>
  );
}
