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
        <div className="space-y-4">
          <div className="grid gap-4 overflow-hidden rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.016)),rgba(0,0,0,0.3)] p-3 shadow-[0_18px_54px_rgba(0,0,0,0.34)] sm:grid-cols-[8rem_1fr]">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] bg-black/36 sm:aspect-square">
              <Image
                alt={confirmation.giftImage.alt || confirmation.giftTitle}
                className="object-cover"
                fill
                sizes="8rem"
                src={confirmation.giftImage.publicUrl}
              />
            </div>
            <div className="min-w-0 self-center">
              <StatusBadge
                tone={confirmation.status === "sent" ? "success" : "warning"}
              >
                {confirmation.status}
              </StatusBadge>
              <h3 className="editorial-title mt-3 text-[22px] leading-tight text-sb-rice">
                {confirmation.giftTitle}
              </h3>
              <p className="mt-2 font-mono text-sm text-sb-gold-soft">
                {confirmation.confirmationCode}
              </p>
            </div>
          </div>

          <dl className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[18px] border border-[var(--sb-border)] bg-black/24 p-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
                Recipient
              </dt>
              <dd className="mt-2 text-sm text-sb-rice">
                {confirmation.recipient.name}
              </dd>
              <dd className="mt-1 text-xs text-sb-muted">
                {confirmation.recipient.email}
              </dd>
            </div>
            <div className="rounded-[18px] border border-[var(--sb-border)] bg-black/24 p-4">
              <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
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
            <p className="rounded-[16px] border border-[var(--sb-gold)]/36 bg-[var(--sb-gold)]/10 p-4 text-sm leading-6 text-sb-gold-soft">
              {confirmation.message}
            </p>
          ) : null}

          <div className="flex items-center justify-between rounded-[18px] border border-[var(--sb-border)] bg-black/30 p-4 text-sm">
            <span className="text-sb-muted">Gift total</span>
            <span className="font-mono text-[18px] text-sb-rice">
              {formatMoney(confirmation.priceCents)}
            </span>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
