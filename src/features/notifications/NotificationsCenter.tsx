"use client";

import { useMemo, useState } from "react";

import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useNotifications } from "@/hooks/useNotifications";
import { useResponsiveMode } from "@/hooks/useResponsiveMode";
import { classNames } from "@/lib/classNames";
import {
  filterNotifications,
  notificationFilters,
  type NotificationFilter,
} from "@/lib/notifications";
import type { AppNotification } from "@/types/notification";

import { MobileNotificationsCenter } from "./MobileNotificationsCenter";
import { NotificationCard } from "./NotificationCard";
import { NotificationDetailModal } from "./NotificationDetailModal";
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

function DesktopNotificationsCenter() {
  const { markAllRead, markRead, notifications, unreadCount } =
    useNotifications();
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>("all");
  const [selectedNotification, setSelectedNotification] =
    useState<AppNotification | null>(null);

  const filteredNotifications = useMemo(
    () => filterNotifications(notifications, activeFilter),
    [activeFilter, notifications],
  );

  const handleViewDetails = (notification: AppNotification) => {
    markRead(notification.id);
    setSelectedNotification(notification);
  };

  return (
    <section
      className="border-b border-sb-line bg-sb-ink py-12 md:py-16"
      id="notifications"
    >
      <PageContainer>
        <SectionHeader
          actions={
            <Button
              disabled={unreadCount === 0}
              onClick={markAllRead}
              size="sm"
              variant="secondary"
            >
              Mark all read
            </Button>
          }
          eyebrow={<Badge tone="premium">Notifications</Badge>}
          subtitle="Order updates, reservation reminders, reward alerts, offer notices, and concierge messages in one local center."
          title={`${unreadCount} unread ${unreadCount === 1 ? "notice" : "notices"}`}
        />

        <div
          aria-label="Notification filters"
          className="mt-6 flex gap-2 overflow-x-auto pb-2"
          role="toolbar"
        >
          {notificationFilters.map((option) => (
            <button
              aria-pressed={activeFilter === option.id}
              className={classNames(
                "shrink-0 rounded-control border px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
                activeFilter === option.id
                  ? "border-sb-gold bg-sb-gold/15 text-sb-gold-soft"
                  : "border-sb-line bg-sb-panel/70 text-sb-muted hover:bg-sb-rice/5",
              )}
              key={option.id}
              onClick={() => setActiveFilter(option.id)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onViewDetails={handleViewDetails}
              />
            ))
          ) : (
            <EmptyState
              className="lg:col-span-2"
              message="Try a different filter or mark a new order, reservation, reward, offer, or support event as active."
              title="No notifications here"
            />
          )}
        </div>
      </PageContainer>

      <NotificationDetailModal
        notification={selectedNotification}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedNotification(null);
          }
        }}
      />
    </section>
  );
}
