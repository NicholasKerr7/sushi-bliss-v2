"use client";

import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDateTime } from "@/lib/dates";
import { getSupportTopicLabel } from "@/lib/support";
import type { SupportMessage } from "@/types/support";

interface RecentSupportRequestsProps {
  messages: SupportMessage[];
}

export function RecentSupportRequests({
  messages,
}: RecentSupportRequestsProps) {
  return (
    <Card className="p-5 md:p-6">
      <h3 className="text-xl font-semibold text-sb-rice">Recent requests</h3>
      <div className="mt-4 grid gap-3">
        {messages.length > 0 ? (
          messages.slice(0, 3).map((message) => (
            <div
              className="rounded-card border border-sb-line bg-sb-ink/50 p-4"
              key={message.id}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-sb-rice">
                    {getSupportTopicLabel(message.topicId)}
                  </p>
                  <p className="mt-1 text-xs text-sb-muted">
                    {formatDateTime(message.createdAt)}
                  </p>
                </div>
                <StatusBadge tone="success">Received</StatusBadge>
              </div>
              <p className="mt-3 line-clamp-2 text-sm leading-6 text-sb-muted">
                {message.message}
              </p>
            </div>
          ))
        ) : (
          <p className="rounded-card border border-sb-line bg-sb-ink/50 p-4 text-sm leading-6 text-sb-muted">
            Submitted concierge requests will appear here after the form
            validates.
          </p>
        )}
      </div>
    </Card>
  );
}
