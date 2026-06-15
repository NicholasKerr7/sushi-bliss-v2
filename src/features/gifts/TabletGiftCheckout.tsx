"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { Button } from "@/components/ui/Button";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type { GiftCheckoutDraft, GiftExperience } from "@/types/gift";
import type { PaymentMethod } from "@/types/user";

import { getTabletGiftTotals } from "./tabletGiftMath";

interface TabletGiftCheckoutProps {
  draft: GiftCheckoutDraft;
  gift: GiftExperience;
  paymentMethods: PaymentMethod[];
  validationMessage: string;
  onBack: () => void;
  onCompletePayment: () => void;
  onUpdateDraft: (field: keyof GiftCheckoutDraft, value: string) => void;
}

function TabletCheckoutInput({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-[0.08em] text-white/54">
        {label}
      </span>
      <input
        className="mt-2 h-[40px] w-full rounded-[9px] border border-white/10 bg-black/24 px-3 text-[14px] text-white outline-none focus:border-[var(--sb-gold)]/60"
        onChange={(event) => onChange(event.target.value)}
        type={type}
        value={value}
      />
    </label>
  );
}

export function TabletGiftCheckout({
  draft,
  gift,
  paymentMethods,
  validationMessage,
  onBack,
  onCompletePayment,
  onUpdateDraft,
}: TabletGiftCheckoutProps) {
  const totals = getTabletGiftTotals(gift);
  const selectedPayment =
    paymentMethods.find((method) => method.id === draft.paymentMethodId) ||
    paymentMethods[0];

  return (
    <main className="mx-auto w-full max-w-[1034px] pb-[136px]">
      <section className="relative min-h-[214px] overflow-hidden rounded-b-[18px] border-x border-b border-white/10">
        <Image
          alt=""
          className="object-cover object-[70%_52%] opacity-82"
          fill
          loading="eager"
          priority
          sizes="1034px"
          src="/assets/editorial/hero-otoro-nigiri-no-red-moon.webp"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,0.98)_0%,rgba(5,6,7,0.82)_38%,rgba(5,6,7,0.16)_100%)]" />
        <div className="relative z-10 p-6">
          <button
            className="flex items-center gap-4 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
            onClick={onBack}
            type="button"
          >
            <ChevronIcon direction="left" size={17} />
            Gift checkout
          </button>
          <h1 className="editorial-title mt-5 text-[48px] uppercase leading-[0.92] text-white min-[1080px]:text-[56px]">
            Give the gift of
            <span className="block text-[var(--sb-red-bright)]">
              Exceptional.
            </span>
          </h1>
          <p className="mt-3 max-w-[320px] text-[14px] leading-6 text-[var(--sb-gold-soft)]">
            You&apos;re just a few steps away from creating an unforgettable
            experience.
          </p>
        </div>
      </section>

      <section className="mt-3 grid grid-cols-[1fr_360px] gap-3 min-[1080px]:gap-4">
        <div className="grid gap-3">
          <article className="grid grid-cols-[224px_minmax(0,1fr)] gap-4 rounded-[14px] border border-white/10 bg-white/[0.035] p-3">
            <div className="relative min-h-[118px] overflow-hidden rounded-[10px] border border-white/10">
              <Image
                alt=""
                className="object-cover"
                fill
                sizes="280px"
                src="/assets/food/luxury-sushi-platter-on-marble-surface.webp"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                1. Gift details
              </p>
              <h2 className="mt-2 text-[21px] font-semibold text-white">
                Chef&apos;s Omakase Experience
              </h2>
              <p className="mt-1 text-[14px] text-[var(--sb-gold-soft)]">
                {totals.quantity} Guests
              </p>
              <p className="mt-2 max-w-[320px] text-[12px] leading-5 text-white/60">
                An immersive multi-course journey crafted by our master chefs.
              </p>
              <p className="mt-3 font-mono text-[21px] text-[var(--sb-gold-soft)]">
                {formatMoney(totals.subtotalCents)}
              </p>
            </div>
          </article>

          <article className="rounded-[14px] border border-white/10 bg-white/[0.035] p-3">
            <h2 className="text-[16px] uppercase tracking-[0.08em] text-white">
              2. Recipient information
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <TabletCheckoutInput
                label="Recipient name"
                value={draft.recipientName}
                onChange={(value) => onUpdateDraft("recipientName", value)}
              />
              <TabletCheckoutInput
                label="Recipient email"
                type="email"
                value={draft.recipientEmail}
                onChange={(value) => onUpdateDraft("recipientEmail", value)}
              />
              <label className="col-span-2">
                <span className="text-[11px] uppercase tracking-[0.08em] text-white/54">
                  Personal message
                </span>
                <textarea
                  className="mt-2 min-h-[58px] w-full resize-none rounded-[9px] border border-white/10 bg-black/24 px-3 py-2 text-[14px] leading-5 text-white outline-none focus:border-[var(--sb-gold)]/60"
                  maxLength={200}
                  onChange={(event) =>
                    onUpdateDraft("message", event.target.value)
                  }
                  value={draft.message}
                />
              </label>
            </div>
          </article>

          <article className="rounded-[14px] border border-white/10 bg-white/[0.035] p-3">
            <h2 className="text-[16px] uppercase tracking-[0.08em] text-white">
              3. Delivery method
            </h2>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {[
                [
                  "send-now",
                  "Email gift",
                  "Send the gift instantly via email.",
                ],
                ["scheduled", "Scheduled email", "Choose a date and time."],
              ].map(([value, label, description]) => {
                const selected = draft.deliveryTiming === value;

                return (
                  <button
                    aria-pressed={selected}
                    className={classNames(
                      "grid min-h-[62px] grid-cols-[34px_minmax(0,1fr)_18px] items-center gap-3 rounded-[10px] border px-3 text-left",
                      selected
                        ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/14"
                        : "border-white/10 bg-black/22",
                    )}
                    key={value}
                    onClick={() =>
                      onUpdateDraft(
                        "deliveryTiming",
                        value as GiftCheckoutDraft["deliveryTiming"],
                      )
                    }
                    type="button"
                  >
                    <AssetIcon
                      size={26}
                      src={
                        value === "send-now"
                          ? "/assets/icons/email-icon.png"
                          : "/assets/icons/calendar-icon.png"
                      }
                    />
                    <span>
                      <span className="block text-[13px] uppercase text-white">
                        {label}
                      </span>
                      <span className="mt-1 block text-[11px] leading-4 text-white/56">
                        {description}
                      </span>
                    </span>
                    <span
                      className={classNames(
                        "h-5 w-5 rounded-full border",
                        selected
                          ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]"
                          : "border-[var(--sb-gold)]/60",
                      )}
                    />
                  </button>
                );
              })}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <TabletCheckoutInput
                label="Send date"
                type="date"
                value={draft.deliveryDate}
                onChange={(value) => onUpdateDraft("deliveryDate", value)}
              />
              <button
                className="grid h-[42px] grid-cols-[28px_minmax(0,1fr)_18px] items-center gap-3 self-end rounded-[9px] border border-white/10 bg-black/24 px-3 text-left text-white"
                type="button"
              >
                <AssetIcon size={22} src="/assets/icons/clock-icon.png" />
                10:00 AM
                <ChevronIcon
                  className="text-[var(--sb-gold-soft)]"
                  direction="down"
                  size={18}
                />
              </button>
            </div>
          </article>

          <div className="grid grid-cols-2 gap-3">
            <article className="rounded-[14px] border border-white/10 bg-white/[0.035] p-3">
              <h2 className="text-[15px] uppercase tracking-[0.08em] text-white">
                4. Payment method
              </h2>
              {selectedPayment ? (
                <div className="mt-3 grid min-h-[50px] grid-cols-[58px_minmax(0,1fr)] items-center gap-3 rounded-[10px] border border-white/10 bg-black/24 px-3">
                  <span className="rounded-[4px] bg-[#123fb4] px-2 py-1 text-[13px] font-black italic text-white">
                    Visa
                  </span>
                  <span className="text-[13px] text-white/72">
                    {selectedPayment.brand} ending {selectedPayment.last4}
                    <span className="mt-1 block text-[11px] text-white/42">
                      Default · Expires {selectedPayment.expiresAt}
                    </span>
                  </span>
                </div>
              ) : null}
              <button
                className="mt-2 flex items-center gap-2 text-[12px] text-[var(--sb-gold-soft)]"
                onClick={() =>
                  onUpdateDraft("paymentMethodId", paymentMethods[0]?.id || "")
                }
                type="button"
              >
                + Add a new payment method
              </button>
            </article>

            <article className="rounded-[14px] border border-white/10 bg-white/[0.035] p-3">
              <h2 className="text-[15px] uppercase tracking-[0.08em] text-white">
                5. Promo code
              </h2>
              <div className="mt-3 grid grid-cols-[minmax(0,1fr)_78px] gap-3">
                <input
                  className="h-[40px] rounded-[9px] border border-white/10 bg-black/24 px-3 text-[13px] text-white outline-none"
                  placeholder="Enter promo code"
                />
                <button
                  className="rounded-[9px] border border-[var(--sb-gold)]/30 text-[var(--sb-gold-soft)]"
                  type="button"
                >
                  Apply
                </button>
              </div>
              {validationMessage ? (
                <p className="mt-2 rounded-[9px] border border-[var(--sb-red)]/30 bg-[var(--sb-red)]/10 p-2 text-[12px] font-semibold text-[var(--sb-red-bright)]">
                  {validationMessage}
                </p>
              ) : null}
            </article>
          </div>
        </div>

        <aside className="rounded-[14px] border border-white/10 bg-white/[0.035] p-4">
          <h2 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            Gift summary
          </h2>
          <div className="mt-3 grid grid-cols-[86px_minmax(0,1fr)] gap-4">
            <div className="relative h-[72px] overflow-hidden rounded-[10px]">
              <Image
                alt=""
                className="object-cover"
                fill
                sizes="96px"
                src="/assets/food/sushi-rolls-with-warm-cinematic-glow.webp"
              />
            </div>
            <div>
              <h3 className="text-[16px] font-semibold text-white">
                Chef&apos;s Omakase Experience
              </h3>
              <p className="mt-1 text-[13px] text-white/58">
                {totals.quantity} Guests
              </p>
              <p className="mt-1 text-right font-mono text-[14px] text-[var(--sb-gold-soft)]">
                {formatMoney(totals.subtotalCents)}
              </p>
            </div>
          </div>
          <div className="mt-4 grid gap-3 border-y border-white/10 py-4 text-[14px] text-white/62">
            <div className="flex justify-between">
              <span>Gift Experience</span>
              <span>{formatMoney(totals.subtotalCents)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between">
              <span>Service Fee</span>
              <span>{formatMoney(totals.serviceFeeCents)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>{formatMoney(totals.taxCents)}</span>
            </div>
          </div>
          <div className="mt-3 flex justify-between">
            <span className="text-[18px] uppercase text-white">Total</span>
            <span className="font-mono text-[25px] text-[var(--sb-gold-soft)]">
              {formatMoney(totals.totalCents)}
            </span>
          </div>

          <div className="mt-4 rounded-[12px] border border-[var(--sb-gold)]/24 p-3">
            <h3 className="flex items-center gap-3 text-[13px] uppercase text-[var(--sb-gold-soft)]">
              <AssetIcon size={28} src="/assets/icons/gift-icon.png" />
              This is a gift
            </h3>
            <p className="mt-2 text-[12px] leading-5 text-white/58">
              The recipient will be notified via email with your personal
              message.
            </p>
          </div>

          <div className="mt-4 rounded-[12px] border border-white/10 p-3 text-center">
            <AssetIcon
              className="mx-auto rounded-full"
              size={46}
              src="/assets/brand/sushi-bliss-floral-emblem-icon.png"
            />
            <p className="mt-2 text-[var(--sb-gold-soft)]">
              You&apos;ve received a gift!
            </p>
            <p className="mt-1 text-[13px] text-white/68">
              Chef&apos;s Omakase Experience for {totals.quantity} Guests
            </p>
            <button
              className="mt-3 h-9 w-full rounded-[9px] border border-[var(--sb-gold)]/30 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
              type="button"
            >
              View sample email
            </button>
          </div>
        </aside>
      </section>

      <section className="mt-3 grid grid-cols-[1fr_1fr_304px] items-center gap-3 rounded-[14px] border border-white/10 bg-white/[0.035] p-3">
        <div className="flex items-center gap-4">
          <AssetIcon size={40} src="/assets/icons/chef-crest-icon.png" />
          <span>
            <span className="block text-[13px] uppercase text-[var(--sb-gold-soft)]">
              Satisfaction guaranteed
            </span>
            <span className="mt-1 block text-[12px] text-white/56">
              If plans change, the recipient can reschedule.
            </span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <AssetIcon size={38} src="/assets/icons/headset-icon.png" />
          <span>
            <span className="block text-[13px] uppercase text-[var(--sb-gold-soft)]">
              Need help?
            </span>
            <span className="mt-1 block text-[12px] text-white/56">
              +81 3-1234-5678
            </span>
          </span>
        </div>
        <Button
          className="red-glow-button h-[50px] rounded-[10px] uppercase tracking-[0.08em]"
          onClick={onCompletePayment}
        >
          Complete payment {formatMoney(totals.totalCents)}
        </Button>
      </section>
    </main>
  );
}
