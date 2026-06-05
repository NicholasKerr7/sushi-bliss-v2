"use client";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDateTime } from "@/lib/dates";
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
        <div className="space-y-5">
          <StatusBadge tone={notification.tone}>
            {notification.category}
          </StatusBadge>

          <p className="text-sm leading-6 text-sb-muted">{notification.body}</p>

          {notification.relatedLabel ? (
            <div className="rounded-card border border-sb-line bg-sb-ink/50 p-4">
              <p className="text-xs font-semibold uppercase text-sb-dim">
                Related
              </p>
              <p className="mt-2 text-sm font-semibold text-sb-rice">
                {notification.relatedLabel}
              </p>
            </div>
          ) : null}
        </div>
      ) : null}
    </Modal>
  );
}
