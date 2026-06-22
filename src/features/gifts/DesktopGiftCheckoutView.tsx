"use client";

import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { formatMoney } from "@/lib/money";
import type { GiftCheckoutDraft, GiftExperience } from "@/types/gift";
import type { PaymentMethod } from "@/types/user";

import { getDeliveryTimeLabel } from "./DesktopGiftData";
import {
  CheckoutPanel,
  DesktopGiftHero,
  ReviewRow,
  SummaryLine,
} from "./DesktopGiftPrimitives";

export function DesktopGiftCheckout({
  draft,
  gift,
  paymentMethods,
  validationMessage,
  onBack,
  onPurchase,
  onUpdateDraft,
}: {
  draft: GiftCheckoutDraft;
  gift: GiftExperience;
  paymentMethods: PaymentMethod[];
  validationMessage: string;
  onBack: () => void;
  onPurchase: () => void;
  onUpdateDraft: (field: keyof GiftCheckoutDraft, value: string) => void;
}) {
  return (
    <>
      <DesktopGiftHero
        copy="Review recipient, delivery, and payment details before sending your Sushi Bliss gift."
        title="Gift Checkout"
      />
      <div className="grid grid-cols-[minmax(0,1fr)_396px] gap-5 px-9 py-5">
        <div className="grid grid-cols-3 gap-4">
          <CheckoutPanel title="Selected gift">
            <div className="relative h-[158px] overflow-hidden rounded-[12px]">
              <Image
                alt=""
                className="object-cover"
                fill
                sizes="320px"
                src={gift.image.publicUrl}
              />
            </div>
            <h2 className="mt-4 text-[20px] font-semibold text-white">
              {gift.title}
            </h2>
            <p className="mt-2 text-[13px] leading-6 text-white/56">
              {gift.description}
            </p>
            <p className="mt-4 font-mono text-[28px] text-white">
              {formatMoney(gift.priceCents)}
            </p>
          </CheckoutPanel>

          <CheckoutPanel title="Recipient">
            <ReviewRow label="Name" value={draft.recipientName} />
            <ReviewRow label="Email" value={draft.recipientEmail} />
            <ReviewRow
              label="Delivery"
              value={
                draft.deliveryTiming === "scheduled"
                  ? `Scheduled ${draft.deliveryDate} at ${getDeliveryTimeLabel(
                      draft.deliveryTime,
                    )}`
                  : "Send instantly"
              }
            />
            <div className="mt-4 rounded-[12px] border border-white/10 bg-black/24 p-4">
              <p className="text-[12px] uppercase tracking-[0.1em] text-white/42">
                Message
              </p>
              <p className="mt-2 text-[13px] leading-6 text-white/64">
                {draft.message || "No message included."}
              </p>
            </div>
          </CheckoutPanel>

          <CheckoutPanel title="Payment">
            <div className="grid gap-3">
              {paymentMethods.map((method) => (
                <button
                  aria-pressed={draft.paymentMethodId === method.id}
                  className={
                    draft.paymentMethodId === method.id
                      ? "rounded-[12px] border border-[var(--sb-gold)]/42 bg-[var(--sb-gold)]/10 p-4 text-left"
                      : "rounded-[12px] border border-white/10 bg-black/24 p-4 text-left"
                  }
                  key={method.id}
                  onClick={() => onUpdateDraft("paymentMethodId", method.id)}
                  type="button"
                >
                  <span className="block text-[14px] font-semibold text-white">
                    {method.brand} ending {method.last4}
                  </span>
                  <span className="mt-1 block text-[12px] text-white/48">
                    Expires {method.expiresAt}
                  </span>
                </button>
              ))}
            </div>
          </CheckoutPanel>
        </div>

        <aside className="rounded-[18px] border border-[var(--sb-border)] bg-[#07090a]/88 p-6">
          <h2 className="text-[20px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            Order summary
          </h2>
          <div className="mt-5 divide-y divide-white/10 rounded-[12px] border border-white/10">
            <SummaryLine
              label={gift.title}
              value={formatMoney(gift.priceCents)}
            />
            <SummaryLine label="Digital delivery" value="Included" />
            <SummaryLine label="Concierge support" value="Included" />
          </div>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-[13px] uppercase tracking-[0.1em] text-white/46">
              Total due
            </span>
            <span className="font-mono text-[38px] text-white">
              {formatMoney(gift.priceCents)}
            </span>
          </div>
          {validationMessage ? (
            <p className="mt-4 rounded-[10px] border border-[var(--sb-red)]/36 bg-[var(--sb-red)]/10 px-4 py-3 text-[13px] text-[var(--sb-red-bright)]">
              {validationMessage}
            </p>
          ) : null}
          <Button className="mt-6 w-full" onClick={onPurchase}>
            Purchase gift
          </Button>
          <Button className="mt-3 w-full" onClick={onBack} variant="secondary">
            Back to gift details
          </Button>
          <p className="mt-5 text-[12px] leading-5 text-white/46">
            Your recipient receives concierge scheduling support and a digital
            pass after purchase.
          </p>
        </aside>
      </div>
    </>
  );
}
