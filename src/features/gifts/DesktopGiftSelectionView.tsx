"use client";

import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { GIFT_DELIVERY_TIME_OPTIONS } from "@/lib/gifts";
import type { GiftCheckoutDraft, GiftExperience } from "@/types/gift";

import { getDefaultDeliveryDate } from "./DesktopGiftData";
import {
  DesktopGiftHero,
  GiftPackageCard,
  GiftReviewRail,
} from "./DesktopGiftPrimitives";

export function DesktopGiftSelection({
  draft,
  giftExperiences,
  selectedGift,
  onContinue,
  onSelectGift,
  onUpdateDraft,
}: {
  draft: GiftCheckoutDraft;
  giftExperiences: GiftExperience[];
  selectedGift: GiftExperience;
  onContinue: () => void;
  onSelectGift: (giftId: string) => void;
  onUpdateDraft: (field: keyof GiftCheckoutDraft, value: string) => void;
}) {
  return (
    <>
      <DesktopGiftHero
        copy="Send an omakase reservation, private dining night, or hands-on class with concierge support."
        title="Gift an Experience"
      />
      <div className="grid grid-cols-[minmax(0,1fr)_372px] gap-4 px-9 py-4">
        <div className="grid gap-4">
          <section className="rounded-[18px] border border-[var(--sb-border)] bg-[#07090a]/88 p-5">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-[13px] uppercase tracking-[0.12em] text-white/42">
                  Step 1
                </p>
                <h2 className="mt-1 text-[20px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                  Choose your gift experience
                </h2>
              </div>
              <p className="max-w-[360px] text-right text-[13px] leading-6 text-white/54">
                Each gift includes recipient booking support, printable passes,
                and personalized delivery.
              </p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {giftExperiences.map((gift, index) => (
                <GiftPackageCard
                  gift={gift}
                  isSelected={gift.id === selectedGift.id}
                  key={gift.id}
                  priority={index < 3}
                  onSelectGift={onSelectGift}
                />
              ))}
            </div>
          </section>

          <section className="grid grid-cols-[minmax(0,1fr)_306px] gap-4 rounded-[18px] border border-[var(--sb-border)] bg-[#07090a]/88 p-5">
            <div>
              <p className="text-[13px] uppercase tracking-[0.12em] text-white/42">
                Step 2
              </p>
              <h2 className="mt-1 text-[20px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                Recipient details
              </h2>
              <div className="mt-4 grid gap-4 min-[1500px]:grid-cols-2">
                <Input
                  id="desktop-gift-recipient-name"
                  label="Recipient name"
                  value={draft.recipientName}
                  onChange={(event) =>
                    onUpdateDraft("recipientName", event.target.value)
                  }
                />
                <Input
                  id="desktop-gift-recipient-email"
                  label="Recipient email"
                  type="email"
                  value={draft.recipientEmail}
                  onChange={(event) =>
                    onUpdateDraft("recipientEmail", event.target.value)
                  }
                />
              </div>
              <label
                className="mt-4 block text-sm font-semibold text-sb-rice"
                htmlFor="desktop-gift-message"
              >
                Gift message
              </label>
              <textarea
                className="mt-2 min-h-[92px] w-full resize-none rounded-card border border-sb-line bg-sb-ink/70 px-4 py-3 text-sm text-sb-rice outline-none transition placeholder:text-sb-dim focus:border-sb-gold/70 focus:ring-2 focus:ring-sb-gold/25"
                id="desktop-gift-message"
                value={draft.message}
                onChange={(event) =>
                  onUpdateDraft("message", event.target.value)
                }
              />
            </div>
            <div className="rounded-[16px] border border-white/10 bg-black/28 p-4">
              <h3 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                Delivery options
              </h3>
              <div className="mt-3 grid gap-2.5">
                {[
                  ["send-now", "Send instantly", "Email after purchase"],
                  ["scheduled", "Schedule delivery", "Pick a future date"],
                ].map(([timing, label, copy]) => (
                  <button
                    aria-pressed={draft.deliveryTiming === timing}
                    className={
                      draft.deliveryTiming === timing
                        ? "rounded-[12px] border border-[var(--sb-gold)]/42 bg-[var(--sb-gold)]/10 p-3 text-left"
                        : "rounded-[12px] border border-white/10 bg-white/[0.035] p-3 text-left"
                    }
                    key={timing}
                    onClick={() =>
                      onUpdateDraft(
                        "deliveryTiming",
                        timing as GiftCheckoutDraft["deliveryTiming"],
                      )
                    }
                    type="button"
                  >
                    <span className="block text-[14px] font-semibold text-white">
                      {label}
                    </span>
                    <span className="mt-1 block text-[12px] text-white/50">
                      {copy}
                    </span>
                  </button>
                ))}
              </div>
              <Input
                disabled={draft.deliveryTiming !== "scheduled"}
                id="desktop-gift-delivery-date"
                inputClassName="mt-1"
                label="Delivery date"
                min={getDefaultDeliveryDate()}
                type="date"
                value={draft.deliveryDate}
                wrapperClassName="mt-3"
                onChange={(event) =>
                  onUpdateDraft("deliveryDate", event.target.value)
                }
              />
              <Select
                disabled={draft.deliveryTiming !== "scheduled"}
                id="desktop-gift-delivery-time"
                label="Send time"
                options={GIFT_DELIVERY_TIME_OPTIONS.map((option) => ({
                  label: option.label,
                  value: option.value,
                }))}
                value={draft.deliveryTime}
                wrapperClassName="mt-3"
                onChange={(event) =>
                  onUpdateDraft("deliveryTime", event.target.value)
                }
              />
            </div>
          </section>
        </div>

        <GiftReviewRail
          buttonLabel="Continue to review"
          gift={selectedGift}
          onAction={onContinue}
        />
      </div>
    </>
  );
}
