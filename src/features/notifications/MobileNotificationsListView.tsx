"use client";

import Link from "next/link";

import { StatusBadge } from "@/components/ui/StatusBadge";
import { classNames } from "@/lib/classNames";
import { formatDateTime } from "@/lib/dates";
import {
  notificationCategoryLabels,
  notificationFilters,
  type NotificationFilter,
} from "@/lib/notifications";
import type { AppNotification } from "@/types/notification";

import {
  MobileNotificationIcon,
  MobileNotificationsPanel,
} from "./MobileNotificationsPrimitives";

interface MobileNotificationsListViewProps {
  activeFilter: NotificationFilter;
  notifications: AppNotification[];
  unreadCount: number;
  onFilterChange: (filter: NotificationFilter) => void;
  onMarkAllRead: () => void;
  onViewNotification: (notification: AppNotification) => void;
}

export function MobileNotificationsListView({
  activeFilter,
  notifications,
  unreadCount,
  onFilterChange,
  onMarkAllRead,
  onViewNotification,
}: MobileNotificationsListViewProps) {
  return (
    <>
      <section className="mt-8">
        <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
          Notification center
        </p>
        <h1 className="editorial-title mt-3 text-[43px] uppercase leading-[0.96] text-white">
          Alerts
          <span className="block text-[var(--sb-red-bright)]">& Updates</span>
        </h1>
        <p className="mt-4 text-[16px] leading-6 text-white/62">
          Track orders, reservations, rewards, offers, and concierge messages.
        </p>
      </section>

      <MobileNotificationsPanel className="mt-6 overflow-hidden">
        <div className="relative min-h-[184px] p-5">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[url('/assets/editorial/hero-otoro-nigiri-no-red-moon.webp')] bg-cover bg-center opacity-42"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.90)_100%)]" />
          <div className="relative z-10 flex min-h-[144px] flex-col justify-between">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[12px] uppercase tracking-[0.14em] text-white/54">
                  Unread notices
                </p>
                <p className="mt-2 font-mono text-[46px] leading-none text-[var(--sb-gold-soft)]">
                  {unreadCount}
                </p>
              </div>
              <button
                className="rounded-full border border-[var(--sb-gold)]/36 bg-black/36 px-4 py-2 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] disabled:border-white/10 disabled:text-white/34"
                disabled={unreadCount === 0}
                onClick={onMarkAllRead}
                type="button"
              >
                Mark all read
              </button>
            </div>
            <p className="text-[14px] leading-6 text-white/62">
              Every update stays grouped by dining activity, membership, and
              concierge care.
            </p>
          </div>
        </div>
      </MobileNotificationsPanel>

      <div
        aria-label="Notification filters"
        className="mt-4 flex gap-2 overflow-x-auto pb-1"
        role="toolbar"
      >
        {notificationFilters.map((filter) => (
          <button
            aria-pressed={activeFilter === filter.id}
            className={classNames(
              "min-h-[42px] shrink-0 rounded-full border px-4 text-[12px] uppercase tracking-[0.08em]",
              activeFilter === filter.id
                ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/22 text-[var(--sb-red-bright)]"
                : "border-white/12 bg-black/24 text-white/56",
            )}
            key={filter.id}
            onClick={() => onFilterChange(filter.id)}
            type="button"
          >
            {filter.label}
          </button>
        ))}
      </div>

      <section className="mt-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
              Inbox
            </p>
            <p className="mt-1 text-[13px] text-white/46">
              {notifications.length} notice
              {notifications.length === 1 ? "" : "s"}
            </p>
          </div>
          <Link
            className="rounded-full border border-[var(--sb-border)] px-4 py-2 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
            href="/support"
          >
            Support
          </Link>
        </div>

        <div className="mt-3 grid gap-3">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <MobileNotificationCard
                key={notification.id}
                notification={notification}
                onViewNotification={onViewNotification}
              />
            ))
          ) : (
            <MobileNotificationsPanel className="p-5 text-center">
              <MobileNotificationIcon category="support" className="mx-auto" />
              <h2 className="mt-4 text-[18px] font-semibold text-white">
                No notices here
              </h2>
              <p className="mt-2 text-[14px] leading-6 text-white/54">
                Try another filter or check back after your next order, booking,
                reward, or support update.
              </p>
            </MobileNotificationsPanel>
          )}
        </div>
      </section>
    </>
  );
}

function MobileNotificationCard({
  notification,
  onViewNotification,
}: {
  notification: AppNotification;
  onViewNotification: (notification: AppNotification) => void;
}) {
  const unread = !notification.readAt;

  return (
    <MobileNotificationsPanel
      className={classNames(
        "overflow-hidden",
        unread && "border-[var(--sb-gold)]/38",
      )}
    >
      <div className="grid grid-cols-[58px_minmax(0,1fr)] gap-4 p-4">
        <MobileNotificationIcon category={notification.category} />
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            <StatusBadge tone={notification.tone}>
              {notificationCategoryLabels[notification.category]}
            </StatusBadge>
            {unread ? <StatusBadge tone="warning">Unread</StatusBadge> : null}
          </div>
          <button
            className="mt-3 block text-left text-[17px] font-semibold leading-5 text-white"
            onClick={() => onViewNotification(notification)}
            type="button"
          >
            {notification.title}
          </button>
          <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-white/56">
            {notification.body}
          </p>
          <p className="mt-2 text-[12px] text-white/42">
            {formatDateTime(notification.createdAt)}
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              className="min-h-[40px] rounded-[11px] border border-[var(--sb-border)] text-[12px] uppercase tracking-[0.06em] text-[var(--sb-gold-soft)]"
              onClick={() => onViewNotification(notification)}
              type="button"
            >
              Details
            </button>
            {notification.href ? (
              <Link
                className="grid min-h-[40px] place-items-center rounded-[11px] border border-[var(--sb-red-bright)]/45 text-[12px] uppercase tracking-[0.06em] text-[var(--sb-red-bright)]"
                href={notification.href}
              >
                Open
              </Link>
            ) : (
              <button
                className="min-h-[40px] rounded-[11px] border border-white/12 text-[12px] uppercase tracking-[0.06em] text-white/34"
                disabled
                type="button"
              >
                No link
              </button>
            )}
          </div>
        </div>
      </div>
    </MobileNotificationsPanel>
  );
}
