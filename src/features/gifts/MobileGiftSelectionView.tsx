"use client";

import Image from "next/image";

import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDateTime } from "@/lib/dates";
import { formatMoney } from "@/lib/money";
import type { GiftConfirmation, GiftExperience } from "@/types/gift";

import { MobileGiftCommandCenter } from "./MobileGiftCommandCenter";
import { MobileGiftPanel } from "./MobileGiftPrimitives";

interface MobileGiftSelectionViewProps {
  confirmations: GiftConfirmation[];
  giftExperiences: GiftExperience[];
  onContinue: () => void;
  onSelectGift: (giftId: string) => void;
  selectedGift: GiftExperience;
}

/** Mobile gift selection view with package cards and recent gift history. */
export function MobileGiftSelectionView({
  confirmations,
  giftExperiences,
  onContinue,
  onSelectGift,
  selectedGift,
}: MobileGiftSelectionViewProps) {
  return (
    <>
      <section className="mt-8">
        <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
          Gift experiences
        </p>
        <h1 className="editorial-title mt-3 text-[37px] uppercase leading-[0.96] text-white min-[390px]:text-[40px]">
          Send
          <span className="block text-[var(--sb-red-bright)]">Bliss</span>
        </h1>
        <p className="mt-4 text-[16px] leading-6 text-white/62">
          Share omakase, private dining, and chef-led experiences with real
          recipient and payment validation.
        </p>
      </section>

      <MobileGiftPanel className="mt-6 overflow-hidden">
        <div className="relative min-h-[322px] p-5">
          <Image
            alt={selectedGift.image.alt || selectedGift.title}
            className="absolute inset-0 object-cover opacity-78"
            fill
            loading="eager"
            priority
            sizes="430px"
            src={selectedGift.image.publicUrl}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.86)_100%)]" />
          <div className="relative z-10 flex min-h-[282px] flex-col justify-end">
            <StatusBadge tone="premium">{selectedGift.category}</StatusBadge>
            <h2 className="editorial-title mt-4 text-[29px] uppercase leading-none text-white min-[390px]:text-[32px]">
              {selectedGift.title}
            </h2>
            <p className="mt-3 text-[15px] leading-6 text-white/62">
              {selectedGift.description}
            </p>
            <button
              className="red-glow-button mt-5 min-h-[54px] rounded-[13px] border text-[12px]"
              onClick={onContinue}
              type="button"
            >
              Continue {formatMoney(selectedGift.priceCents)}
            </button>
          </div>
        </div>
      </MobileGiftPanel>

      <MobileGiftCommandCenter
        confirmations={confirmations}
        onContinue={onContinue}
        selectedGift={selectedGift}
      />

      <div className="mt-5 grid gap-3">
        {giftExperiences.map((gift) => (
          <MobileGiftPackageCard
            gift={gift}
            isSelected={gift.id === selectedGift.id}
            key={gift.id}
            onSelectGift={onSelectGift}
          />
        ))}
      </div>

      <MobileGiftPanel className="mt-5 p-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
              Gift history
            </p>
            <h2 className="mt-2 text-[20px] font-semibold text-white">
              Recent passes
            </h2>
          </div>
          <span className="font-mono text-[22px] text-[var(--sb-gold-soft)]">
            {confirmations.length}
          </span>
        </div>
        {confirmations.length > 0 ? (
          <div className="mt-4 grid gap-3">
            {confirmations.slice(0, 2).map((confirmation) => (
              <div
                className="rounded-[14px] border border-white/10 bg-black/28 p-4"
                key={confirmation.id}
              >
                <p className="text-[15px] font-semibold text-white">
                  {confirmation.giftTitle}
                </p>
                <p className="mt-1 text-[13px] text-white/50">
                  {confirmation.recipient.name} ·{" "}
                  {formatDateTime(confirmation.deliveryDate)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-[14px] leading-6 text-white/56">
            Sent gifts will appear here after checkout.
          </p>
        )}
      </MobileGiftPanel>
    </>
  );
}

function MobileGiftPackageCard({
  gift,
  isSelected,
  onSelectGift,
}: {
  gift: GiftExperience;
  isSelected: boolean;
  onSelectGift: (giftId: string) => void;
}) {
  return (
    <button
      aria-pressed={isSelected}
      className="grid min-h-[112px] w-full grid-cols-[76px_minmax(0,1fr)_22px] gap-3 rounded-[16px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.02))] p-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_22px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl min-[390px]:min-h-[126px] min-[390px]:grid-cols-[92px_minmax(0,1fr)_26px] min-[390px]:gap-4 min-[390px]:rounded-[18px]"
      onClick={() => onSelectGift(gift.id)}
      type="button"
    >
      <span className="relative min-h-[88px] overflow-hidden rounded-[12px] border border-white/10 bg-black/34 min-[390px]:min-h-[102px] min-[390px]:rounded-[14px]">
        <Image
          alt={gift.image.alt || gift.title}
          className="object-cover"
          fill
          loading={isSelected ? "eager" : "lazy"}
          sizes="92px"
          src={gift.image.publicUrl}
        />
      </span>
      <span className="min-w-0 py-1">
        <span className="text-[11px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
          {gift.category}
        </span>
        <span className="mt-2 block text-[16px] font-semibold leading-5 text-white min-[390px]:text-[18px] min-[390px]:leading-6">
          {gift.title}
        </span>
        <span className="mt-1 block text-[13px] leading-5 text-white/52">
          {gift.deliveryNote}
        </span>
        <span className="mt-2 block font-mono text-[15px] text-[var(--sb-gold-soft)]">
          {formatMoney(gift.priceCents)}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="mt-2 grid h-[26px] w-[26px] place-items-center rounded-full border border-[var(--sb-red-bright)]/70"
      >
        {isSelected ? (
          <span className="h-[12px] w-[12px] rounded-full bg-[var(--sb-red-bright)]" />
        ) : null}
      </span>
    </button>
  );
}
