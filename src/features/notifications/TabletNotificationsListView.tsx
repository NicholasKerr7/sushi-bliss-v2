"use client";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { classNames } from "@/lib/classNames";
import {
  notificationCategoryIcons,
  notificationFilters,
  type NotificationFilter,
} from "@/lib/notifications";
import type {
  AppNotification,
  NotificationCategory,
} from "@/types/notification";

import { TabletNotificationCard } from "./TabletNotificationCard";

interface TabletNotificationsListViewProps {
  activeFilter: NotificationFilter;
  allNotifications: AppNotification[];
  notifications: AppNotification[];
  unreadCount: number;
  onFilterChange: (filter: NotificationFilter) => void;
  onMarkAllRead: () => void;
  onViewNotification: (notification: AppNotification) => void;
}

export function TabletNotificationsListView({
  activeFilter,
  allNotifications,
  notifications,
  unreadCount,
  onFilterChange,
  onMarkAllRead,
  onViewNotification,
}: TabletNotificationsListViewProps) {
  return (
    <>
      <section className="grid grid-cols-[minmax(0,1fr)_198px] items-end gap-5 pb-7 pt-8">
        <div>
          <h1 className="editorial-title text-[40px] uppercase leading-none tracking-[0.06em] text-white min-[1080px]:text-[48px]">
            Notifications Center
          </h1>
          <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.24em] text-[var(--sb-gold-soft)]">
            Stay updated with your orders, reservations & more
          </p>
        </div>
        <button
          className="h-[54px] rounded-[8px] border border-[var(--sb-border)] bg-white/[0.04] text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--sb-gold-soft)] transition hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
          disabled={unreadCount === 0}
          onClick={onMarkAllRead}
          type="button"
        >
          Mark all read
        </button>
      </section>

      <section className="grid grid-cols-5 gap-3 min-[1080px]:gap-4">
        {notificationFilters
          .filter((filter) => filter.id !== "unread" && filter.id !== "support")
          .map((filter) => {
            const count =
              filter.id === "all"
                ? unreadCount
                : allNotifications.filter(
                    (notification) =>
                      notification.category === filter.id &&
                      !notification.readAt,
                  ).length;
            const active = activeFilter === filter.id;
            const icon =
              filter.id === "all"
                ? "/assets/icons/notification-bell-icon.png"
                : notificationCategoryIcons[filter.id as NotificationCategory];

            return (
              <button
                aria-pressed={active}
                className={classNames(
                  "grid min-h-[50px] grid-cols-[22px_minmax(0,1fr)_24px] items-center gap-1.5 rounded-[14px] border px-2 text-left transition disabled:cursor-not-allowed disabled:opacity-45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold min-[1080px]:min-h-[52px]",
                  active
                    ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/24 text-white"
                    : "border-white/10 bg-white/[0.035] text-white/64 hover:bg-white/[0.06]",
                )}
                disabled={count === 0}
                key={filter.id}
                onClick={() => onFilterChange(filter.id)}
                type="button"
              >
                <AssetIcon size={22} src={icon} />
                <span className="truncate text-[11px] font-semibold uppercase tracking-[0.02em]">
                  {filter.id === "reservation" ? "Reservations" : filter.label}
                </span>
                <span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--sb-red)] text-[11px] font-bold text-white">
                  {count}
                </span>
              </button>
            );
          })}
      </section>

      <section className="mt-5 grid gap-2 min-[1080px]:gap-3">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <TabletNotificationCard
              key={notification.id}
              notification={notification}
              onViewNotification={onViewNotification}
            />
          ))
        ) : (
          <div className="rounded-[16px] border border-white/10 bg-white/[0.04] p-8 text-center">
            <AssetIcon
              className="mx-auto"
              size={54}
              src="/assets/icons/headset-icon.png"
            />
            <h2 className="mt-4 text-[22px] font-semibold text-white">
              No notices here
            </h2>
            <p className="mt-2 text-[15px] text-white/54">
              Try another filter after your next order, booking, reward, offer,
              or support update.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
