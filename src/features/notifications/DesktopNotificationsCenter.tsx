"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { DesktopMenuHeader } from "@/features/menu/DesktopMenuChrome";
import { useCart } from "@/hooks/useCart";
import { useNotifications } from "@/hooks/useNotifications";
import { classNames } from "@/lib/classNames";
import {
  filterNotifications,
  notificationFilters,
  type NotificationFilter,
} from "@/lib/notifications";
import type {
  AppNotification,
  NotificationCategory,
} from "@/types/notification";

import { DesktopNotificationDetailPanel } from "./DesktopNotificationDetailPanel";

const categoryIcons: Record<NotificationCategory, string> = {
  offer: "/assets/icons/golden-ticket-icon.png",
  order: "/assets/icons/takeaway-bag-icon.png",
  reservation: "/assets/icons/calendar-icon.png",
  reward: "/assets/icons/gift-icon.png",
  support: "/assets/icons/headset-icon.png",
};

const preferenceRows = [
  [
    "Orders",
    "Updates on your orders and deliveries.",
    "/assets/icons/takeaway-bag-icon.png",
  ],
  [
    "Reservations",
    "Confirmations, reminders, and changes.",
    "/assets/icons/calendar-icon.png",
  ],
  [
    "Loyalty & Rewards",
    "Points updates and member perks.",
    "/assets/icons/gift-icon.png",
  ],
  [
    "Offers & Promotions",
    "Exclusive offers and special deals.",
    "/assets/icons/golden-ticket-icon.png",
  ],
  [
    "News & Events",
    "Latest news and upcoming events.",
    "/assets/icons/gold-alert-icon.png",
  ],
] as const;

const desktopFilters = notificationFilters.filter((filter) =>
  ["all", "order", "reservation", "reward", "offer"].includes(filter.id),
);

function getNotificationActionLabel(notification: AppNotification) {
  if (notification.category === "reservation") {
    return "Review reservation";
  }

  if (notification.category === "reward") {
    return "View rewards";
  }

  if (notification.category === "offer") {
    return "Redeem offer";
  }

  if (notification.category === "support") {
    return "Contact support";
  }

  if (notification.id === "notification-delivery-out") {
    return "Track order";
  }

  return "View order";
}

export function DesktopNotificationsCenter() {
  const { itemCount } = useCart();
  const { markAllRead, markRead, notifications, unreadCount } =
    useNotifications();
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>("all");
  const [selectedNotification, setSelectedNotification] =
    useState<AppNotification | null>(null);
  const [preferenceToggles, setPreferenceToggles] = useState([
    true,
    true,
    true,
    true,
    false,
  ]);
  const filteredNotifications = useMemo(
    () => filterNotifications(notifications, activeFilter),
    [activeFilter, notifications],
  );

  return (
    <section
      className="hidden min-h-dvh bg-[#040506] text-white xl:block"
      id="notifications"
    >
      <DesktopMenuHeader activeId="notifications" cartCount={itemCount} />
      <main className="mx-auto max-w-[1672px] px-7 pb-4 pt-4">
        <section className="rounded-[24px] border border-[var(--sb-border)] bg-[#07090a] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.54)] min-[1500px]:p-6">
          <div className="grid grid-cols-[minmax(0,1fr)_390px] gap-6 min-[1500px]:grid-cols-[minmax(0,1fr)_460px] min-[1500px]:gap-8">
            <div>
              <h1 className="editorial-title text-[46px] uppercase tracking-[0.08em]">
                Notifications
                <span className="text-[var(--sb-red-bright)]"> Center</span>
              </h1>
              <p className="mt-3 text-[17px] text-[var(--sb-gold-soft)]">
                Stay updated on your orders, reservations, rewards, and
                exclusive offers.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                {desktopFilters.map((filter) => {
                  const active = activeFilter === filter.id;
                  const count =
                    filter.id === "all"
                      ? notifications.length
                      : notifications.filter(
                          (notification) => notification.category === filter.id,
                        ).length;

                  return (
                    <button
                      aria-pressed={active}
                      className={classNames(
                        "min-h-12 min-w-[128px] rounded-[10px] border px-4 text-[13px] uppercase tracking-[0.08em]",
                        active
                          ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)] text-white shadow-[0_0_22px_rgba(238,43,36,0.34)]"
                          : "border-[var(--sb-border)] bg-white/[0.035] text-white/76",
                      )}
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      type="button"
                    >
                      {filter.label} ({count})
                    </button>
                  );
                })}
                <button
                  className="flex min-h-12 items-center justify-center gap-3 px-2 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] disabled:opacity-45"
                  disabled={unreadCount === 0}
                  onClick={markAllRead}
                  type="button"
                >
                  <AssetIcon size={18} src="/assets/icons/check-icon.png" />
                  Mark all as read
                </button>
              </div>

              <div className="mt-4 overflow-hidden rounded-[16px] border border-[var(--sb-border)] bg-black/36">
                {filteredNotifications.map((notification) => (
                  <DesktopNotificationRow
                    key={notification.id}
                    notification={notification}
                    onOpen={(selected) => {
                      markRead(selected.id);
                      setSelectedNotification(selected);
                    }}
                  />
                ))}
              </div>
            </div>

            {selectedNotification ? (
              <DesktopNotificationDetailPanel
                notification={selectedNotification}
                onBack={() => setSelectedNotification(null)}
              />
            ) : (
              <NotificationPreferencesPanel
                toggles={preferenceToggles}
                onToggle={(index) =>
                  setPreferenceToggles((current) =>
                    current.map((value, currentIndex) =>
                      currentIndex === index ? !value : value,
                    ),
                  )
                }
              />
            )}
          </div>
        </section>
      </main>
    </section>
  );
}

function DesktopNotificationRow({
  notification,
  onOpen,
}: {
  notification: AppNotification;
  onOpen: (notification: AppNotification) => void;
}) {
  const isUnread = !notification.readAt;
  const timeLabel = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(notification.createdAt));

  return (
    <article className="grid min-h-[78px] grid-cols-[18px_54px_minmax(0,1fr)_118px_150px] items-center gap-4 border-b border-white/10 px-5 last:border-b-0 min-[1500px]:grid-cols-[28px_68px_minmax(0,1fr)_170px_190px] min-[1500px]:gap-5 min-[1500px]:px-6">
      <span
        className={classNames(
          "h-2.5 w-2.5 rounded-full",
          isUnread ? "bg-[var(--sb-red-bright)]" : "bg-white/24",
        )}
      />
      <span className="grid h-11 w-11 place-items-center rounded-full border border-[var(--sb-gold)]/30 bg-black/38 min-[1500px]:h-12 min-[1500px]:w-12">
        <AssetIcon size={26} src={categoryIcons[notification.category]} />
      </span>
      <div className="min-w-0">
        <h2 className="line-clamp-1 text-[18px] text-white min-[1500px]:text-[19px]">
          {notification.title}
        </h2>
        <p className="mt-1 line-clamp-1 text-[14px] text-white/62">
          {notification.body}
        </p>
      </div>
      <p className="text-[13px] leading-5 text-white/58 min-[1500px]:text-[14px]">
        {timeLabel}
      </p>
      <button
        className={classNames(
          "grid min-h-[46px] place-items-center rounded-[10px] border px-2 text-center text-[11px] uppercase tracking-[0.08em] min-[1500px]:min-h-12 min-[1500px]:text-[12px]",
          isUnread
            ? "border-[var(--sb-red-bright)]/48 text-[var(--sb-red-bright)]"
            : "border-white/14 text-white/54",
        )}
        onClick={() => onOpen(notification)}
        type="button"
      >
        {getNotificationActionLabel(notification)}
      </button>
    </article>
  );
}

function NotificationPreferencesPanel({
  toggles,
  onToggle,
}: {
  toggles: boolean[];
  onToggle: (index: number) => void;
}) {
  return (
    <aside className="rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-6">
      <h2 className="flex items-center gap-4 text-[18px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
        <AssetIcon size={30} src="/assets/icons/notification-bell-icon.png" />
        Notification preferences
      </h2>
      <p className="mt-3 text-[15px] text-white/62">
        Choose what you&apos;d like to hear about.
      </p>
      <div className="mt-5">
        {preferenceRows.map(([label, copy, icon], index) => (
          <button
            className="grid min-h-[66px] w-full grid-cols-[42px_1fr_58px] items-center gap-4 border-b border-white/10 text-left last:border-b-0"
            key={label}
            onClick={() => onToggle(index)}
            type="button"
          >
            <AssetIcon size={28} src={icon} />
            <span>
              <span className="block text-[16px] text-white">{label}</span>
              <span className="mt-1 block text-[14px] text-white/54">
                {copy}
              </span>
            </span>
            <SwitchPill checked={toggles[index] || false} />
          </button>
        ))}
      </div>
      <div className="mt-5 border-t border-white/10 pt-4">
        <button
          className="grid min-h-[56px] w-full grid-cols-[42px_1fr_58px] items-center gap-4 text-left"
          onClick={() => onToggle(0)}
          type="button"
        >
          <AssetIcon size={28} src="/assets/icons/email-icon.png" />
          <span>
            <span className="block text-[16px] text-white">
              Email notifications
            </span>
            <span className="mt-1 block text-[14px] text-white/54">
              hiroshi.tanaka@sushibliss.jp
            </span>
          </span>
          <SwitchPill checked />
        </button>
        <button
          className="grid min-h-[56px] w-full grid-cols-[42px_1fr_58px] items-center gap-4 border-t border-white/10 text-left"
          onClick={() => onToggle(1)}
          type="button"
        >
          <AssetIcon size={28} src="/assets/icons/phone-icon.png" />
          <span>
            <span className="block text-[16px] text-white">
              Push notifications
            </span>
            <span className="mt-1 block text-[14px] text-white/54">
              Receive alerts on this device
            </span>
          </span>
          <SwitchPill checked />
        </button>
      </div>
      <Link
        className="mx-auto mt-6 flex min-h-10 items-center gap-3 rounded-full px-3 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
        href="/profile"
      >
        <AssetIcon size={18} src="/assets/icons/user-settings-icon.png" />
        Manage preferences
      </Link>
    </aside>
  );
}

function SwitchPill({ checked }: { checked: boolean }) {
  return (
    <span
      className={classNames(
        "relative block h-[28px] w-[52px] rounded-full transition",
        checked ? "bg-[var(--sb-red)]" : "bg-white/18",
      )}
    >
      <span
        className={classNames(
          "absolute top-[4px] h-5 w-5 rounded-full bg-white transition",
          checked ? "left-[27px]" : "left-[5px]",
        )}
      />
    </span>
  );
}
