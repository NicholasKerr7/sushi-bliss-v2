import Image from "next/image";

import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDateTime } from "@/lib/dates";
import { formatMoney } from "@/lib/money";
import type { GiftConfirmation } from "@/types/gift";

interface GiftHistoryPanelProps {
  confirmations: GiftConfirmation[];
}

export function GiftHistoryPanel({ confirmations }: GiftHistoryPanelProps) {
  return (
    <Card className="p-5 md:p-6">
      <div>
        <h3 className="text-xl font-semibold text-sb-rice">Gift experiences</h3>
        <p className="mt-2 text-sm leading-6 text-sb-muted">
          Sent gifts are stored locally with confirmation details.
        </p>
      </div>

      {confirmations.length > 0 ? (
        <div className="mt-5 grid gap-3">
          {confirmations.slice(0, 3).map((confirmation) => (
            <div
              className="grid grid-cols-[4.5rem_1fr] gap-3 rounded-card border border-sb-line bg-sb-ink/45 p-3"
              key={confirmation.id}
            >
              <div className="relative aspect-square overflow-hidden rounded-card bg-sb-panel-soft">
                <Image
                  alt={confirmation.giftImage.alt || confirmation.giftTitle}
                  className="object-cover"
                  fill
                  sizes="4.5rem"
                  src={confirmation.giftImage.publicUrl}
                />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-sm font-semibold text-sb-rice">
                    {confirmation.giftTitle}
                  </h4>
                  <StatusBadge
                    tone={
                      confirmation.status === "sent" ? "success" : "warning"
                    }
                  >
                    {confirmation.status}
                  </StatusBadge>
                </div>
                <p className="mt-1 text-xs leading-5 text-sb-muted">
                  {confirmation.recipient.name} -{" "}
                  {formatDateTime(confirmation.deliveryDate)}
                </p>
                <p className="mt-2 font-mono text-xs text-sb-gold-soft">
                  {confirmation.confirmationCode} -{" "}
                  {formatMoney(confirmation.priceCents)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          className="mt-5"
          message="Gift confirmations will appear after sending an experience."
          title="No gifts sent"
        />
      )}
    </Card>
  );
}
