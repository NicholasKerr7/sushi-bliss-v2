"use client";

import Link from "next/link";

import { classNames } from "@/lib/classNames";
import {
  notificationCategoryLabels,
  notificationFilters,
  type NotificationFilter,
} from "@/lib/notifications";
import type {
  AppNotification,
  NotificationCategory,
} from "@/types/notification";

import { MobileNotificationCard } from "./MobileNotificationCard";
import {
  getNotificationActionLabel,
  getNoticeCountLabel,
  mobileNotificationCategoryOrder,
} from "./mobileNotificationContent";
import {
  MobileNotificationIcon,
  MobileNotificationsPanel,
} from "./MobileNotificationsPrimitives";

interface MobileNotificationsListViewProps {
  activeFilter: NotificationFilter;
  allNotifications: AppNotification[];
  notifications: AppNotification[];
  unreadCount: number;
  onFilterChange: (filter: NotificationFilter) => void;
  onMarkAllRead: () => void;
  onViewNotification: (notification: AppNotification) => void;
}

export function MobileNotificationsListView({
  activeFilter,
  allNotifications,
  notifications,
  unreadCount,
  onFilterChange,
  onMarkAllRead,
  onViewNotification,
}: MobileNotificationsListViewProps) {
  const priorityNotification =
    allNotifications.find((notification) => !notification.readAt) ||
    allNotifications[0] ||
    null;
  const categoryCounts = mobileNotificationCategoryOrder.map((category) => ({
    category,
    count: allNotifications.filter(
      (notification) => notification.category === category,
    ).length,
  }));

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
        <div className="relative min-h-[236px] p-5">
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
            {priorityNotification ? (
              <button
                className="mt-4 rounded-[14px] border border-white/12 bg-black/38 p-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
                onClick={() => onViewNotification(priorityNotification)}
                type="button"
              >
                <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
                  {priorityNotification.readAt
                    ? "Latest notice"
                    : "Next priority"}
                </span>
                <span className="mt-1 block text-[16px] font-semibold leading-5 text-white">
                  {priorityNotification.title}
                </span>
                <span className="mt-2 block text-[12px] uppercase tracking-[0.08em] text-[var(--sb-red-bright)]">
                  {getNotificationActionLabel(priorityNotification)}
                </span>
              </button>
            ) : null}
          </div>
        </div>
      </MobileNotificationsPanel>

      <section className="mt-4" aria-labelledby="notification-category-title">
        <div className="flex items-center justify-between gap-3">
          <h2
            className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]"
            id="notification-category-title"
          >
            Categories
          </h2>
          <p className="text-[12px] text-white/42">
            {getNoticeCountLabel(allNotifications.length)}
          </p>
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {categoryCounts.map(({ category, count }) => (
            <NotificationCategoryButton
              active={activeFilter === category}
              category={category}
              count={count}
              key={category}
              onClick={() => onFilterChange(category)}
            />
          ))}
        </div>
      </section>

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
            notifications.map((notification, index) => (
              <MobileNotificationCard
                key={notification.id}
                notification={notification}
                position={index + 1}
                total={notifications.length}
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

function NotificationCategoryButton({
  active,
  category,
  count,
  onClick,
}: {
  active: boolean;
  category: NotificationCategory;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      aria-pressed={active}
      className={classNames(
        "grid min-h-[102px] min-w-[112px] place-items-center rounded-[16px] border bg-black/30 px-3 py-3 text-center transition disabled:cursor-not-allowed disabled:opacity-45",
        active
          ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/16 text-[var(--sb-red-bright)]"
          : "border-white/12 text-white/62",
      )}
      disabled={count === 0}
      onClick={onClick}
      type="button"
    >
      <MobileNotificationIcon category={category} className="h-11 w-11" />
      <span className="mt-2 text-[11px] uppercase tracking-[0.08em]">
        {notificationCategoryLabels[category]}
      </span>
      <span className="mt-1 font-mono text-[20px] leading-none">{count}</span>
    </button>
  );
}
