"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDateTime } from "@/lib/dates";
import { notificationCategoryLabels } from "@/lib/notifications";
import type { AppNotification } from "@/types/notification";

interface NotificationCardProps {
  notification: AppNotification;
  onViewDetails: (notification: AppNotification) => void;
}

export function NotificationCard({
  notification,
  onViewDetails,
}: NotificationCardProps) {
  const unread = !notification.readAt;

  return (
    <Card className={unread ? "border-sb-gold/40 p-4" : "p-4"}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge tone={notification.tone}>
              {notificationCategoryLabels[notification.category]}
            </StatusBadge>
            {unread ? <StatusBadge tone="warning">Unread</StatusBadge> : null}
          </div>
          <h3 className="mt-3 text-base font-semibold text-sb-rice">
            {notification.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-sb-muted">
            {notification.body}
          </p>
        </div>
        <time
          className="shrink-0 text-right font-mono text-[0.68rem] uppercase text-sb-dim"
          dateTime={notification.createdAt}
        >
          {formatDateTime(notification.createdAt)}
        </time>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Button
          aria-label={`View notification: ${notification.title}`}
          onClick={() => onViewDetails(notification)}
          size="sm"
        >
          Details
        </Button>
        {notification.href ? (
          <Button
            aria-label={`Open related flow for ${notification.title}`}
            href={notification.href}
            size="sm"
            variant="ghost"
          >
            Open
          </Button>
        ) : null}
      </div>
    </Card>
  );
}
