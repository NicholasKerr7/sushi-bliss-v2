"use client";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDateTime } from "@/lib/dates";
import {
  notificationCategoryIcons,
  notificationCategoryLabels,
} from "@/lib/notifications";
import type { AppNotification } from "@/types/notification";

interface TabletNotificationCardProps {
  notification: AppNotification;
  onViewNotification: (notification: AppNotification) => void;
}

export function TabletNotificationCard({
  notification,
  onViewNotification,
}: TabletNotificationCardProps) {
  const unread = !notification.readAt;

  return (
    <article className="grid min-h-[112px] grid-cols-[14px_78px_minmax(0,1fr)_136px] items-center gap-4 rounded-[16px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))] px-5 py-4 min-[1080px]:min-h-[132px]">
      <span
        aria-hidden="true"
        className={
          unread
            ? "h-4 w-4 rounded-full bg-[var(--sb-red-bright)] shadow-[0_0_14px_rgba(239,47,37,0.82)]"
            : "h-4 w-4 rounded-full bg-white/18"
        }
      />
      <span className="grid h-[66px] w-[66px] place-items-center rounded-full border border-[var(--sb-red-bright)]/70 bg-black/32">
        <AssetIcon
          size={38}
          src={notificationCategoryIcons[notification.category]}
        />
      </span>
      <div className="min-w-0">
        <h2 className="text-[20px] font-semibold text-white min-[1080px]:text-[23px]">
          {notification.title}
        </h2>
        <p className="mt-2 line-clamp-1 text-[14px] text-white/56 min-[1080px]:text-[16px]">
          {notification.body}
        </p>
        <div className="mt-3 flex items-center gap-2">
          <StatusBadge tone={notification.tone}>
            {notificationCategoryLabels[notification.category]}
          </StatusBadge>
          {notification.relatedLabel ? (
            <span className="truncate text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
              {notification.relatedLabel}
            </span>
          ) : null}
        </div>
      </div>
      <div className="grid justify-items-end gap-3">
        <time
          className="font-mono text-[12px] text-white/42"
          dateTime={notification.createdAt}
        >
          {formatDateTime(notification.createdAt)}
        </time>
        <button
          className={
            unread
              ? "red-glow-button h-10 w-[98px] rounded-[10px] text-[11px] uppercase tracking-[0.08em]"
              : "h-10 w-[98px] rounded-[10px] border border-[var(--sb-border)] text-[11px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
          }
          onClick={() => onViewNotification(notification)}
          type="button"
        >
          View
        </button>
      </div>
    </article>
  );
}
