"use client";

import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDateTime } from "@/lib/dates";
import { formatMoney } from "@/lib/money";
import type { GiftConfirmation } from "@/types/gift";

interface GiftConfirmationModalProps {
  confirmation: GiftConfirmation | null;
  onClose: () => void;
}

export function GiftConfirmationModal({
  confirmation,
  onClose,
}: GiftConfirmationModalProps) {
  return (
    <Modal
      description="Gift experience confirmation"
      footer={
        <div className="grid gap-3 sm:grid-cols-2">
          <Button href="/profile" onClick={onClose} variant="secondary">
            View profile
          </Button>
          <Button onClick={onClose}>Done</Button>
        </div>
      }
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
      open={Boolean(confirmation)}
      title="Gift sent"
    >
      {confirmation ? (
        <div className="space-y-5">
          <div className="grid grid-cols-[6rem_1fr] gap-4 rounded-card border border-sb-line bg-sb-ink/45 p-3">
            <div className="relative aspect-square overflow-hidden rounded-card bg-sb-panel-soft">
              <Image
                alt={confirmation.giftImage.alt || confirmation.giftTitle}
                className="object-cover"
                fill
                sizes="6rem"
                src={confirmation.giftImage.publicUrl}
              />
            </div>
            <div>
              <StatusBadge
                tone={confirmation.status === "sent" ? "success" : "warning"}
              >
                {confirmation.status}
              </StatusBadge>
              <h3 className="mt-3 text-lg font-semibold text-sb-rice">
                {confirmation.giftTitle}
              </h3>
              <p className="mt-1 font-mono text-sm text-sb-gold-soft">
                {confirmation.confirmationCode}
              </p>
            </div>
          </div>

          <dl className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-card border border-sb-line bg-sb-ink/45 p-3">
              <dt className="text-xs font-semibold uppercase text-sb-dim">
                Recipient
              </dt>
              <dd className="mt-2 text-sm text-sb-rice">
                {confirmation.recipient.name}
              </dd>
              <dd className="mt-1 text-xs text-sb-muted">
                {confirmation.recipient.email}
              </dd>
            </div>
            <div className="rounded-card border border-sb-line bg-sb-ink/45 p-3">
              <dt className="text-xs font-semibold uppercase text-sb-dim">
                Delivery
              </dt>
              <dd className="mt-2 text-sm text-sb-rice">
                {formatDateTime(confirmation.deliveryDate)}
              </dd>
              <dd className="mt-1 text-xs text-sb-muted">
                {confirmation.paymentMethodLabel}
              </dd>
            </div>
          </dl>

          {confirmation.message ? (
            <p className="rounded-card border border-sb-gold/30 bg-sb-gold/10 p-4 text-sm leading-6 text-sb-gold-soft">
              {confirmation.message}
            </p>
          ) : null}

          <div className="flex justify-between rounded-card border border-sb-line bg-sb-ink/45 p-4 text-sm">
            <span className="text-sb-muted">Gift total</span>
            <span className="font-mono text-sb-rice">
              {formatMoney(confirmation.priceCents)}
            </span>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
