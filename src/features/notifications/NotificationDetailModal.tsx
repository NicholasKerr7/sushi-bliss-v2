"use client";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDateTime } from "@/lib/dates";
import { notificationCategoryLabels } from "@/lib/notifications";
import type { AppNotification } from "@/types/notification";

interface NotificationDetailModalProps {
  notification: AppNotification | null;
  onOpenChange: (open: boolean) => void;
}

export function NotificationDetailModal({
  notification,
  onOpenChange,
}: NotificationDetailModalProps) {
  return (
    <Modal
      description={
        notification
          ? `${formatDateTime(notification.createdAt)}${
              notification.relatedLabel ? ` - ${notification.relatedLabel}` : ""
            }`
          : undefined
      }
      footer={
        notification ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {notification.href ? (
              <Button
                href={notification.href}
                onClick={() => onOpenChange(false)}
              >
                Open related flow
              </Button>
            ) : null}
            <Button onClick={() => onOpenChange(false)} variant="ghost">
              Done
            </Button>
          </div>
        ) : null
      }
      onOpenChange={onOpenChange}
      open={Boolean(notification)}
      title={notification?.title || "Notification"}
    >
      {notification ? (
        <div className="space-y-4">
          <StatusBadge tone={notification.tone}>
            {notificationCategoryLabels[notification.category]}
          </StatusBadge>

          <section className="rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.016)),rgba(0,0,0,0.3)] p-4">
            <p className="text-sm leading-6 text-sb-muted">
              {notification.body}
            </p>
          </section>

          {notification.relatedLabel ? (
            <section className="rounded-[18px] border border-[var(--sb-border)] bg-black/24 p-4">
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
                Related
              </h3>
              <p className="mt-2 text-sm font-semibold text-sb-rice">
                {notification.relatedLabel}
              </p>
            </section>
          ) : null}
        </div>
      ) : null}
    </Modal>
  );
}
