"use client";

import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDateTime } from "@/lib/dates";
import {
  getOfferStatusLabel,
  getOfferTone,
  isOfferExpired,
} from "@/lib/offers";
import type { Offer } from "@/types/offer";

interface OfferDetailModalProps {
  currentTime: number;
  offer: Offer | null;
  onOpenChange: (open: boolean) => void;
}

export function OfferDetailModal({
  currentTime,
  offer,
  onOpenChange,
}: OfferDetailModalProps) {
  const [copyMessage, setCopyMessage] = useState("");
  const expired = offer ? isOfferExpired(offer, currentTime) : false;

  const handleCopyCode = async () => {
    if (!offer || expired) {
      return;
    }

    try {
      await navigator.clipboard.writeText(offer.code);
      setCopyMessage("Offer code copied.");
    } catch {
      setCopyMessage("Offer code ready for checkout.");
    }
  };

  return (
    <Modal
      description={offer?.subtitle}
      onOpenChange={(open) => {
        if (!open) {
          setCopyMessage("");
        }

        onOpenChange(open);
      }}
      open={Boolean(offer)}
      title={offer?.title || "Offer"}
      footer={
        offer ? (
          <Button
            className="w-full"
            disabled={expired}
            onClick={handleCopyCode}
          >
            {expired ? "Offer expired" : `Copy ${offer.code}`}
          </Button>
        ) : null
      }
    >
      {offer ? (
        <div className="space-y-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-sb-panel-soft">
            <Image
              alt={offer.title}
              className="object-cover"
              fill
              sizes="(min-width: 768px) 32rem, 100vw"
              src={offer.imageUrl}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge tone={getOfferTone(offer, currentTime)}>
              {getOfferStatusLabel(offer, currentTime)}
            </StatusBadge>
            <StatusBadge
              tone={offer.accent === "premium" ? "premium" : "neutral"}
            >
              {offer.code}
            </StatusBadge>
            <StatusBadge tone="warning">
              Ends {formatDateTime(offer.expiresAt)}
            </StatusBadge>
          </div>

          <p className="text-sm leading-6 text-sb-muted">{offer.description}</p>

          <div className="rounded-card border border-sb-line bg-sb-ink/50 p-4">
            <p className="text-xs font-semibold uppercase text-sb-dim">
              Eligibility
            </p>
            <p className="mt-2 text-sm leading-6 text-sb-muted">
              {offer.eligibility}
            </p>
          </div>

          <div className="rounded-card border border-sb-line bg-sb-ink/50 p-4">
            <p className="text-xs font-semibold uppercase text-sb-dim">Terms</p>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-sb-muted">
              {offer.terms.map((term) => (
                <li key={term}>{term}</li>
              ))}
            </ul>
          </div>

          {copyMessage ? (
            <p className="rounded-card border border-sb-gold/30 bg-sb-gold/10 p-3 text-sm font-semibold text-sb-gold-soft">
              {copyMessage}
            </p>
          ) : null}
        </div>
      ) : null}
    </Modal>
  );
}
