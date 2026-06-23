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
        <div className="space-y-4">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[18px] border border-[var(--sb-border)] bg-black/40 shadow-[0_18px_54px_rgba(0,0,0,0.36)]">
            <Image
              alt={offer.title}
              className="object-cover"
              fill
              sizes="(min-width: 768px) 32rem, 100vw"
              src={offer.imageUrl}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.54))]" />
            <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3">
              <p className="max-w-[18rem] text-[13px] leading-5 text-white/78">
                {offer.subtitle}
              </p>
              <span className="rounded-full border border-[var(--sb-gold)]/45 bg-black/58 px-3 py-1 font-mono text-[12px] text-[var(--sb-gold-soft)]">
                {offer.code}
              </span>
            </div>
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

          <section className="rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.016)),rgba(0,0,0,0.3)] p-4">
            <p className="text-sm leading-6 text-sb-muted">
              {offer.description}
            </p>
          </section>

          <section className="rounded-[18px] border border-[var(--sb-border)] bg-black/24 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
              Eligibility
            </h3>
            <p className="mt-2 text-sm leading-6 text-sb-muted">
              {offer.eligibility}
            </p>
          </section>

          <section className="rounded-[18px] border border-[var(--sb-border)] bg-black/24 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
              Terms
            </h3>
            <ul className="mt-2 space-y-2 text-sm leading-6 text-sb-muted">
              {offer.terms.map((term) => (
                <li className="grid grid-cols-[0.5rem_1fr] gap-3" key={term}>
                  <span
                    aria-hidden="true"
                    className="mt-[0.65rem] h-1.5 w-1.5 rounded-full bg-[var(--sb-red-bright)]"
                  />
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </section>

          {copyMessage ? (
            <p className="rounded-[16px] border border-[var(--sb-gold)]/36 bg-[var(--sb-gold)]/10 p-3 text-sm font-semibold text-sb-gold-soft">
              {copyMessage}
            </p>
          ) : null}
        </div>
      ) : null}
    </Modal>
  );
}
