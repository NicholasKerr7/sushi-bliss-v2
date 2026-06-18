"use client";

import Link from "next/link";

import { StatusBadge } from "@/components/ui/StatusBadge";
import { classNames } from "@/lib/classNames";
import { formatDateTime } from "@/lib/dates";
import { notificationCategoryLabels } from "@/lib/notifications";
import type { AppNotification } from "@/types/notification";

import { getNotificationActionLabel } from "./mobileNotificationContent";
import {
  MobileNotificationIcon,
  MobileNotificationsPanel,
} from "./MobileNotificationsPrimitives";

interface MobileNotificationCardProps {
  notification: AppNotification;
  position: number;
  total: number;
  onViewNotification: (notification: AppNotification) => void;
}

/** Renders one mobile notification row with category-aware actions. */
export function MobileNotificationCard({
  notification,
  position,
  total,
  onViewNotification,
}: MobileNotificationCardProps) {
  const unread = !notification.readAt;

  return (
    <MobileNotificationsPanel
      className={classNames(
        "overflow-hidden",
        unread &&
          "border-[var(--sb-gold)]/42 shadow-[0_0_28px_rgba(215,168,79,0.12),inset_0_1px_0_rgba(255,255,255,0.08)]",
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
            <StatusBadge tone="neutral">
              {position} of {total}
            </StatusBadge>
          </div>
          <button
            className="mt-2 flex min-h-10 w-full items-center text-left text-[17px] font-semibold leading-5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
            onClick={() => onViewNotification(notification)}
            type="button"
          >
            {notification.title}
          </button>
          <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-white/56">
            {notification.body}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[12px] text-white/42">
            <span>{formatDateTime(notification.createdAt)}</span>
            {notification.relatedLabel ? (
              <>
                <span aria-hidden="true">/</span>
                <span>{notification.relatedLabel}</span>
              </>
            ) : null}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              className="min-h-[42px] rounded-[11px] border border-[var(--sb-border)] text-[12px] uppercase tracking-[0.06em] text-[var(--sb-gold-soft)]"
              onClick={() => onViewNotification(notification)}
              type="button"
            >
              Details
            </button>
            {notification.href ? (
              <Link
                className="grid min-h-[42px] place-items-center rounded-[11px] border border-[var(--sb-red-bright)]/45 text-center text-[12px] uppercase tracking-[0.06em] text-[var(--sb-red-bright)]"
                href={notification.href}
              >
                {getNotificationActionLabel(notification)}
              </Link>
            ) : (
              <button
                className="min-h-[42px] rounded-[11px] border border-white/12 text-[12px] uppercase tracking-[0.06em] text-white/34"
                disabled
                type="button"
              >
                No action
              </button>
            )}
          </div>
        </div>
      </div>
    </MobileNotificationsPanel>
  );
}
