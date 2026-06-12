"use client";

import Link from "next/link";

import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDateTime } from "@/lib/dates";
import { notificationCategoryLabels } from "@/lib/notifications";
import type { AppNotification } from "@/types/notification";

import {
  MobileNotificationIcon,
  MobileNotificationsBackButton,
  MobileNotificationsPanel,
} from "./MobileNotificationsPrimitives";

interface MobileNotificationDetailViewProps {
  notification: AppNotification;
  onBack: () => void;
}

export function MobileNotificationDetailView({
  notification,
  onBack,
}: MobileNotificationDetailViewProps) {
  return (
    <>
      <div className="mt-6 flex items-center justify-between gap-4">
        <MobileNotificationsBackButton
          label="Back to notifications"
          onClick={onBack}
        />
        <StatusBadge tone={notification.readAt ? "neutral" : "warning"}>
          {notification.readAt ? "Read" : "Unread"}
        </StatusBadge>
      </div>

      <MobileNotificationsPanel className="mt-5 p-5">
        <div className="flex items-start gap-4">
          <MobileNotificationIcon category={notification.category} />
          <div className="min-w-0">
            <StatusBadge tone={notification.tone}>
              {notificationCategoryLabels[notification.category]}
            </StatusBadge>
            <h1 className="mt-4 text-[27px] font-semibold leading-[1.05] text-white">
              {notification.title}
            </h1>
            <p className="mt-3 text-[13px] text-white/46">
              {formatDateTime(notification.createdAt)}
            </p>
          </div>
        </div>

        <p className="mt-6 text-[16px] leading-7 text-white/64">
          {notification.body}
        </p>

        {notification.relatedLabel ? (
          <div className="mt-5 rounded-[14px] border border-white/10 bg-black/26 p-4">
            <p className="text-[11px] uppercase tracking-[0.14em] text-white/42">
              Related
            </p>
            <p className="mt-2 text-[16px] font-semibold text-white">
              {notification.relatedLabel}
            </p>
          </div>
        ) : null}

        <div className="mt-5 grid grid-cols-2 gap-3">
          {notification.href ? (
            <Link
              className="red-glow-button grid min-h-[54px] place-items-center rounded-[13px] border text-[12px]"
              href={notification.href}
            >
              Open
            </Link>
          ) : (
            <button
              className="grid min-h-[54px] place-items-center rounded-[13px] border border-white/12 text-[12px] uppercase tracking-[0.08em] text-white/34"
              disabled
              type="button"
            >
              No link
            </button>
          )}
          <button
            className="min-h-[54px] rounded-[13px] border border-[var(--sb-border)] bg-black/28 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
            onClick={onBack}
            type="button"
          >
            Done
          </button>
        </div>
      </MobileNotificationsPanel>

      <MobileNotificationsPanel className="mt-4 p-5">
        <h2 className="text-[16px] font-semibold uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
          Connected flow
        </h2>
        <p className="mt-3 text-[14px] leading-6 text-white/56">
          The related order, reservation, reward, offer, or support thread stays
          attached for quick follow-up.
        </p>
      </MobileNotificationsPanel>
    </>
  );
}
