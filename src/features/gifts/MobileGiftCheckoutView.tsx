"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";
import { GIFT_DELIVERY_TIME_OPTIONS } from "@/lib/gifts";
import { formatMoney } from "@/lib/money";
import type { GiftCheckoutDraft, GiftExperience } from "@/types/gift";
import type { PaymentMethod } from "@/types/user";

import {
  MobileGiftBackButton,
  MobileGiftChoice,
  MobileGiftPanel,
  MobileGiftTextField,
} from "./MobileGiftPrimitives";

interface MobileGiftCheckoutViewProps {
  draft: GiftCheckoutDraft;
  gift: GiftExperience;
  minDeliveryDate: string;
  paymentMethods: PaymentMethod[];
  validationMessage: string;
  onBack: () => void;
  onSubmit: () => void;
  onUpdateDraft: (field: keyof GiftCheckoutDraft, value: string) => void;
}

/** Mobile gift checkout with recipient, delivery, payment, and review controls. */
export function MobileGiftCheckoutView({
  draft,
  gift,
  minDeliveryDate,
  paymentMethods,
  validationMessage,
  onBack,
  onSubmit,
  onUpdateDraft,
}: MobileGiftCheckoutViewProps) {
  return (
    <section className="mt-6">
      <div className="flex items-center justify-between gap-4">
        <MobileGiftBackButton label="Back to gift selection" onClick={onBack} />
        <StatusBadge tone="premium">Gift checkout</StatusBadge>
      </div>

      <MobileGiftPanel className="mt-5 overflow-hidden">
        <div className="grid grid-cols-[96px_minmax(0,1fr)] gap-3 p-3 min-[390px]:grid-cols-[110px_minmax(0,1fr)] min-[390px]:gap-4">
          <div className="relative min-h-[128px] overflow-hidden rounded-[14px] border border-white/10 bg-black/34 min-[390px]:min-h-[136px]">
            <Image
              alt={gift.image.alt || gift.title}
              className="object-cover"
              fill
              loading="eager"
              sizes="110px"
              src={gift.image.publicUrl}
            />
          </div>
          <div className="min-w-0 py-1">
            <StatusBadge tone="premium">{gift.category}</StatusBadge>
            <h1 className="editorial-title mt-3 max-w-full break-words text-[22px] leading-[25px] text-white min-[390px]:text-[24px] min-[390px]:leading-7">
              {gift.title}
            </h1>
            <p className="mt-2 text-[13px] leading-5 text-white/56">
              {gift.description}
            </p>
            <p className="mt-3 font-mono text-[19px] text-[var(--sb-gold-soft)]">
              {formatMoney(gift.priceCents)}
            </p>
          </div>
        </div>
      </MobileGiftPanel>

      <MobileGiftPanel className="mt-4 p-5">
        <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
          Recipient
        </p>
        <div className="mt-4 grid gap-4">
          <MobileGiftTextField
            label="Recipient name"
            onChange={(value) => onUpdateDraft("recipientName", value)}
            placeholder="Emma Johnson"
            value={draft.recipientName}
          />
          <MobileGiftTextField
            label="Recipient email"
            onChange={(value) => onUpdateDraft("recipientEmail", value)}
            placeholder="recipient@example.com"
            type="email"
            value={draft.recipientEmail}
          />
          <MobileGiftTextField
            label="Sender name"
            onChange={(value) => onUpdateDraft("senderName", value)}
            placeholder="Your name"
            value={draft.senderName}
          />
          <MobileGiftTextField
            label="Sender email"
            onChange={(value) => onUpdateDraft("senderEmail", value)}
            placeholder="you@example.com"
            type="email"
            value={draft.senderEmail}
          />
          <label className="block">
            <span className="text-[12px] uppercase tracking-[0.1em] text-white/46">
              Gift message
            </span>
            <textarea
              className="mt-2 min-h-[104px] w-full resize-y rounded-[12px] border border-white/10 bg-black/28 px-4 py-3 text-[15px] leading-6 text-white outline-none placeholder:text-white/35 focus:border-[var(--sb-gold)]"
              onChange={(event) => onUpdateDraft("message", event.target.value)}
              placeholder="Write a short occasion note."
              value={draft.message}
            />
          </label>
        </div>
      </MobileGiftPanel>

      <MobileGiftPanel className="mt-4 p-5">
        <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
          Delivery
        </p>
        <div className="mt-4 grid gap-3">
          <MobileGiftChoice
            active={draft.deliveryTiming === "send-now"}
            label="Send now"
            onClick={() => onUpdateDraft("deliveryTiming", "send-now")}
          >
            Email the gift pass immediately.
          </MobileGiftChoice>
          <MobileGiftChoice
            active={draft.deliveryTiming === "scheduled"}
            label="Schedule"
            onClick={() => onUpdateDraft("deliveryTiming", "scheduled")}
          >
            Send on a future celebration date.
          </MobileGiftChoice>
          <label
            className={classNames(
              "block",
              draft.deliveryTiming !== "scheduled" && "opacity-45",
            )}
          >
            <span className="text-[12px] uppercase tracking-[0.1em] text-white/46">
              Delivery date
            </span>
            <input
              className="mt-2 h-12 w-full rounded-[12px] border border-white/10 bg-black/28 px-4 text-[15px] text-white outline-none focus:border-[var(--sb-gold)] disabled:cursor-not-allowed"
              disabled={draft.deliveryTiming !== "scheduled"}
              min={minDeliveryDate}
              onChange={(event) =>
                onUpdateDraft("deliveryDate", event.target.value)
              }
              type="date"
              value={draft.deliveryDate}
            />
          </label>
          <label
            className={classNames(
              "block",
              draft.deliveryTiming !== "scheduled" && "opacity-45",
            )}
          >
            <span className="text-[12px] uppercase tracking-[0.1em] text-white/46">
              Send time
            </span>
            <select
              className="mt-2 h-12 w-full rounded-[12px] border border-white/10 bg-black/28 px-4 text-[15px] text-white outline-none focus:border-[var(--sb-gold)] disabled:cursor-not-allowed"
              disabled={draft.deliveryTiming !== "scheduled"}
              onChange={(event) =>
                onUpdateDraft("deliveryTime", event.target.value)
              }
              value={draft.deliveryTime}
            >
              {GIFT_DELIVERY_TIME_OPTIONS.map((option) => (
                <option
                  className="bg-[#050607] text-white"
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </MobileGiftPanel>

      <MobileGiftPanel className="mt-4 p-5">
        <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
          Payment
        </p>
        <div className="mt-4 grid gap-3">
          {paymentMethods.map((paymentMethod) => (
            <button
              aria-pressed={draft.paymentMethodId === paymentMethod.id}
              className={classNames(
                "grid min-h-[76px] w-full grid-cols-[64px_1fr_26px] items-center gap-4 rounded-[14px] border px-4 text-left",
                draft.paymentMethodId === paymentMethod.id
                  ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/12"
                  : "border-[var(--sb-border)] bg-black/26",
              )}
              key={paymentMethod.id}
              onClick={() => onUpdateDraft("paymentMethodId", paymentMethod.id)}
              type="button"
            >
              <span className="grid h-[46px] w-[58px] place-items-center rounded-[10px] border border-white/10 bg-black/34 text-[15px] font-black uppercase">
                {paymentMethod.brand.slice(0, 4)}
              </span>
              <span>
                <span className="block text-[15px] text-white">
                  {paymentMethod.brand} ending {paymentMethod.last4}
                </span>
                <span className="mt-1 block text-[12px] text-white/48">
                  Expires {paymentMethod.expiresAt}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="grid h-[26px] w-[26px] place-items-center rounded-full border border-[var(--sb-red-bright)]/70"
              >
                {draft.paymentMethodId === paymentMethod.id ? (
                  <span className="h-[12px] w-[12px] rounded-full bg-[var(--sb-red-bright)]" />
                ) : null}
              </span>
            </button>
          ))}
        </div>
      </MobileGiftPanel>

      {validationMessage ? (
        <p className="mt-4 rounded-[14px] border border-[var(--sb-red-bright)]/40 bg-[var(--sb-red)]/10 p-4 text-[13px] leading-5 text-white">
          {validationMessage}
        </p>
      ) : null}

      <button
        className="red-glow-button mt-5 min-h-[64px] w-full rounded-[14px] border text-[13px]"
        onClick={onSubmit}
        type="button"
      >
        Send gift
        <span className="ml-2 font-mono">{formatMoney(gift.priceCents)}</span>
      </button>

      <div className="mt-4 grid min-h-[66px] grid-cols-[42px_1fr] items-center gap-3 rounded-[14px] border border-[var(--sb-border)] bg-black/28 px-4">
        <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--sb-border)]">
          <AssetIcon size={24} src={icons.star} />
        </span>
        <p className="text-[13px] leading-5 text-white/54">
          Gift confirmations are stored locally in profile history until backend
          order history is connected.
        </p>
      </div>
    </section>
  );
}
