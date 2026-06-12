"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type { GiftCheckoutDraft, GiftExperience } from "@/types/gift";

import { TabletGiftSummaryCard } from "./TabletGiftSummaryCard";
import { TABLET_GIFT_QUANTITY } from "./tabletGiftMath";

interface TabletGiftSelectionProps {
  draft: GiftCheckoutDraft;
  giftExperiences: GiftExperience[];
  selectedGift: GiftExperience;
  onContinue: () => void;
  onSelectGift: (giftId: string) => void;
  onUpdateDraft: (field: keyof GiftCheckoutDraft, value: string) => void;
}

function TabletGiftField({
  icon,
  label,
  value,
  onChange,
}: {
  icon: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const inputId = `tablet-gift-${label.toLowerCase().replaceAll(" ", "-")}`;

  return (
    <label className="grid h-[52px] grid-cols-[34px_minmax(0,1fr)] items-center gap-3 rounded-[10px] border border-[var(--sb-gold)]/18 bg-black/20 px-4">
      <AssetIcon size={22} src={icon} />
      <span>
        <span className="block text-[10px] uppercase tracking-[0.08em] text-white/44">
          {label}
        </span>
        <input
          className="mt-1 w-full bg-transparent text-[14px] text-white outline-none"
          id={inputId}
          onChange={(event) => onChange(event.target.value)}
          value={value}
        />
      </span>
    </label>
  );
}

export function TabletGiftSelection({
  draft,
  giftExperiences,
  selectedGift,
  onContinue,
  onSelectGift,
  onUpdateDraft,
}: TabletGiftSelectionProps) {
  return (
    <main className="mx-auto w-full max-w-[1034px] pb-[136px]">
      <section className="relative min-h-[196px] overflow-hidden rounded-b-[18px] border-x border-b border-white/10">
        <Image
          alt=""
          className="object-cover object-[72%_50%] opacity-82"
          fill
          priority
          sizes="1034px"
          src="/assets/editorial/hero-otoro-nigiri-no-red-moon.webp"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,7,0.98)_0%,rgba(5,6,7,0.82)_35%,rgba(5,6,7,0.18)_78%,rgba(5,6,7,0.06)_100%)]" />
        <div className="relative z-10 p-6">
          <Link
            className="flex items-center gap-4 text-[13px] uppercase tracking-[0.08em] text-white/72"
            href="/home"
          >
            <span aria-hidden="true">&lt;</span>
            Back to home
          </Link>
          <h1 className="editorial-title mt-4 text-[48px] uppercase leading-[0.94] text-white min-[1080px]:text-[54px]">
            Gift an
            <span className="block text-[var(--sb-red-bright)]">
              Experience
            </span>
          </h1>
          <p className="mt-3 max-w-[360px] text-[15px] leading-6 text-[var(--sb-gold-soft)]">
            Give the gift of unforgettable moments. Sushi Bliss omakase and
            dining experiences crafted with care.
          </p>
        </div>
      </section>

      <section className="mt-3 grid grid-cols-[1fr_296px] gap-3 min-[1080px]:mt-4 min-[1080px]:grid-cols-[1fr_300px] min-[1080px]:gap-5">
        <div className="grid gap-3 min-[1080px]:gap-4">
          <article className="rounded-[14px] border border-white/10 bg-white/[0.035] p-4">
            <h2 className="text-[18px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
              1. Choose gift experience
            </h2>
            <div className="mt-4 grid grid-cols-[1.45fr_1fr_0.8fr] gap-3">
              {giftExperiences.map((gift) => {
                const selected = selectedGift.id === gift.id;

                return (
                  <button
                    aria-pressed={selected}
                    className={classNames(
                      "relative min-h-[172px] overflow-hidden rounded-[12px] border bg-black/30 p-3 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
                      selected
                        ? "border-[var(--sb-red-bright)] shadow-[0_0_22px_rgba(226,23,29,0.25)]"
                        : "border-[var(--sb-gold)]/20 hover:border-[var(--sb-gold)]/45",
                    )}
                    key={gift.id}
                    onClick={() => onSelectGift(gift.id)}
                    type="button"
                  >
                    <Image
                      alt=""
                      className="object-cover opacity-72"
                      fill
                      loading="eager"
                      sizes="280px"
                      src={gift.image.publicUrl}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,6,7,0.94)_0%,rgba(5,6,7,0.34)_100%)]" />
                    <span
                      className={classNames(
                        "absolute right-3 top-3 h-7 w-7 rounded-full border",
                        selected
                          ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]"
                          : "border-[var(--sb-gold)]/70",
                      )}
                    />
                    <div className="relative z-10 flex min-h-[146px] flex-col justify-end">
                      <h3 className="text-[15px] uppercase text-white min-[1080px]:text-[17px]">
                        {gift.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-[12px] leading-5 text-white/64">
                        {gift.description}
                      </p>
                      <p className="mt-3 text-[16px] text-[var(--sb-gold-soft)]">
                        {formatMoney(gift.priceCents)}{" "}
                        <span className="text-[11px] text-white/58">
                          / person
                        </span>
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
            <p className="mt-3 flex items-center gap-2 text-[12px] text-white/52">
              <AssetIcon size={18} src="/assets/icons/calendar-icon.png" />
              Digital gift card will be sent to the recipient via email.
            </p>
          </article>

          <article className="rounded-[14px] border border-white/10 bg-white/[0.035] p-4">
            <h2 className="text-[18px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
              2. Recipient details
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <TabletGiftField
                icon="/assets/icons/user-icon.png"
                label="Recipient Name"
                value={draft.recipientName}
                onChange={(value) => onUpdateDraft("recipientName", value)}
              />
              <TabletGiftField
                icon="/assets/icons/email-icon.png"
                label="Recipient Email"
                value={draft.recipientEmail}
                onChange={(value) => onUpdateDraft("recipientEmail", value)}
              />
            </div>
          </article>

          <article className="rounded-[14px] border border-white/10 bg-white/[0.035] p-4">
            <h2 className="text-[18px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
              3. Sender details
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <TabletGiftField
                icon="/assets/icons/user-icon.png"
                label="Your Name"
                value={draft.senderName}
                onChange={(value) => onUpdateDraft("senderName", value)}
              />
              <TabletGiftField
                icon="/assets/icons/email-icon.png"
                label="Your Email"
                value={draft.senderEmail}
                onChange={(value) => onUpdateDraft("senderEmail", value)}
              />
            </div>
          </article>

          <article className="rounded-[14px] border border-white/10 bg-white/[0.035] p-4">
            <h2 className="text-[18px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
              4. Select date
            </h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <label className="grid h-[52px] grid-cols-[34px_minmax(0,1fr)] items-center gap-3 rounded-[10px] border border-[var(--sb-gold)]/18 bg-black/20 px-4">
                <AssetIcon size={22} src="/assets/icons/calendar-icon.png" />
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.08em] text-white/44">
                    Preferred date
                  </span>
                  <input
                    className="mt-1 w-full bg-transparent text-[14px] text-white outline-none"
                    onChange={(event) =>
                      onUpdateDraft("deliveryDate", event.target.value)
                    }
                    type="date"
                    value={draft.deliveryDate}
                  />
                </span>
              </label>
              <button
                className="grid h-[52px] grid-cols-[34px_minmax(0,1fr)_18px] items-center gap-3 rounded-[10px] border border-[var(--sb-gold)]/18 bg-black/20 px-4 text-left"
                onClick={() =>
                  onUpdateDraft(
                    "deliveryTiming",
                    draft.deliveryTiming === "send-now"
                      ? "scheduled"
                      : "send-now",
                  )
                }
                type="button"
              >
                <AssetIcon size={22} src="/assets/icons/clock-icon.png" />
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.08em] text-white/44">
                    Time preference
                  </span>
                  <span className="mt-1 block text-[14px] text-white">
                    {draft.deliveryTiming === "scheduled"
                      ? "Scheduled email"
                      : "Dinner (6:00 PM - 9:00 PM)"}
                  </span>
                </span>
                <span className="text-[var(--sb-gold-soft)]">v</span>
              </button>
            </div>
          </article>

          <article className="rounded-[14px] border border-white/10 bg-white/[0.035] p-4">
            <h2 className="text-[18px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
              5. Add a personal message
            </h2>
            <label className="mt-4 block rounded-[10px] border border-[var(--sb-gold)]/18 bg-black/20 p-4">
              <span className="sr-only">Personal message</span>
              <textarea
                className="min-h-[86px] w-full resize-none bg-transparent text-[14px] leading-6 text-white outline-none placeholder:text-white/38"
                maxLength={250}
                onChange={(event) =>
                  onUpdateDraft("message", event.target.value)
                }
                value={draft.message}
              />
              <span className="block text-right text-[11px] text-white/46">
                {draft.message.length} / 250
              </span>
            </label>
          </article>
        </div>

        <TabletGiftSummaryCard gift={selectedGift} />
      </section>

      <Button
        className="red-glow-button mt-3 h-[50px] w-full rounded-[10px] text-[17px] uppercase tracking-[0.08em]"
        onClick={onContinue}
      >
        <AssetIcon size={26} src="/assets/icons/gift-icon.png" />
        Continue to review →
      </Button>
      <p className="mt-3 text-center text-[12px] text-white/42">
        Secure checkout powered by SSL encryption · {TABLET_GIFT_QUANTITY} guest
        experience
      </p>
    </main>
  );
}
