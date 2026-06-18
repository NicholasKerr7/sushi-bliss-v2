"use client";

import Image from "next/image";
import Link from "next/link";

import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDateTime } from "@/lib/dates";
import { formatMoney } from "@/lib/money";
import type { GiftConfirmation } from "@/types/gift";

import { MobileGiftPanel } from "./MobileGiftPrimitives";

interface MobileGiftConfirmationViewProps {
  confirmation: GiftConfirmation;
  onSendAnother: () => void;
}

/** Mobile gift receipt stored through the local gift history boundary. */
export function MobileGiftConfirmationView({
  confirmation,
  onSendAnother,
}: MobileGiftConfirmationViewProps) {
  return (
    <section className="mt-8">
      <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
        Gift confirmed
      </p>
      <h1 className="editorial-title mt-3 text-[37px] uppercase leading-[0.96] text-white min-[390px]:text-[40px]">
        Pass
        <span className="block text-[var(--sb-red-bright)]">Sent</span>
      </h1>
      <p className="mt-4 text-[16px] leading-6 text-white/62">
        {confirmation.giftTitle} is ready for {confirmation.recipient.name}.
      </p>

      <MobileGiftPanel className="mt-6 overflow-hidden">
        <div className="relative min-h-[282px] p-5">
          <Image
            alt={confirmation.giftImage.alt || confirmation.giftTitle}
            className="absolute inset-0 object-cover opacity-78"
            fill
            loading="eager"
            priority
            sizes="430px"
            src={confirmation.giftImage.publicUrl}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05)_0%,rgba(0,0,0,0.88)_100%)]" />
          <div className="relative z-10 flex min-h-[242px] flex-col justify-end">
            <StatusBadge tone="premium">{confirmation.status}</StatusBadge>
            <p className="mt-4 font-mono text-[28px] text-[var(--sb-gold-soft)]">
              {confirmation.confirmationCode}
            </p>
          </div>
        </div>
      </MobileGiftPanel>

      <MobileGiftPanel className="mt-4 p-5">
        <div className="grid gap-4">
          <ReceiptRow label="Recipient" value={confirmation.recipient.name} />
          <ReceiptRow label="Email" value={confirmation.recipient.email} />
          <ReceiptRow
            label="Delivery"
            value={formatDateTime(confirmation.deliveryDate)}
          />
          <ReceiptRow label="Payment" value={confirmation.paymentMethodLabel} />
          <ReceiptRow
            label="Total"
            value={formatMoney(confirmation.priceCents)}
          />
        </div>
        {confirmation.message ? (
          <p className="mt-5 rounded-[14px] border border-white/10 bg-black/28 p-4 text-[14px] leading-6 text-white/58">
            {confirmation.message}
          </p>
        ) : null}
      </MobileGiftPanel>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          className="min-h-[54px] rounded-[13px] border border-[var(--sb-border)] bg-black/28 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
          onClick={onSendAnother}
          type="button"
        >
          Another
        </button>
        <Link
          className="red-glow-button grid min-h-[54px] place-items-center rounded-[13px] border text-[12px]"
          href="/profile"
        >
          Profile
        </Link>
      </div>
    </section>
  );
}

function ReceiptRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
      <span className="text-[12px] uppercase tracking-[0.1em] text-white/42">
        {label}
      </span>
      <span className="max-w-[62%] text-right text-[14px] leading-5 text-white/72">
        {value}
      </span>
    </div>
  );
}
