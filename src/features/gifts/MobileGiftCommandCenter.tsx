"use client";

import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { formatMoney } from "@/lib/money";
import type { GiftConfirmation, GiftExperience } from "@/types/gift";

import { MobileGiftPanel } from "./MobileGiftPrimitives";

const giftIcon = "/assets/icons/gift-icon.png";

interface MobileGiftCommandCenterProps {
  confirmations: GiftConfirmation[];
  selectedGift: GiftExperience;
  onContinue: () => void;
}

/** Summarizes selected gift experience and the next valid checkout action. */
export function MobileGiftCommandCenter({
  confirmations,
  selectedGift,
  onContinue,
}: MobileGiftCommandCenterProps) {
  const latestConfirmation = confirmations[0];

  return (
    <MobileGiftPanel className="mt-5 overflow-hidden p-4">
      <div className="grid grid-cols-[50px_1fr] gap-3 min-[390px]:grid-cols-[58px_1fr] min-[390px]:gap-4">
        <span className="grid h-[50px] w-[50px] place-items-center rounded-full border border-[var(--sb-gold)]/44 bg-black/34 min-[390px]:h-[58px] min-[390px]:w-[58px]">
          <AssetIcon size={25} src={giftIcon} />
        </span>
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.16em] text-white/48">
            Gift Command
          </p>
          <h2 className="editorial-title mt-2 text-[21px] leading-[1.04] text-white min-[390px]:text-[24px] min-[390px]:leading-[1.02]">
            {selectedGift.title}
          </h2>
          <p className="mt-2 text-[14px] leading-5 text-white/58">
            {latestConfirmation
              ? `${latestConfirmation.confirmationCode} was sent most recently.`
              : selectedGift.deliveryNote}
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 divide-x divide-white/10 rounded-[14px] border border-white/10 bg-black/30">
        <CommandMetric
          label="Price"
          value={formatMoney(selectedGift.priceCents)}
        />
        <CommandMetric label="History" value={String(confirmations.length)} />
        <CommandMetric
          label="Includes"
          value={String(selectedGift.inclusions.length)}
        />
      </div>

      <div className="mt-4 grid grid-cols-[1.15fr_0.85fr] gap-3">
        <button
          className="red-glow-button flex min-h-[50px] items-center justify-center gap-2.5 rounded-[12px] text-[11px] uppercase tracking-[0.07em] min-[390px]:min-h-[56px] min-[390px]:gap-3 min-[390px]:rounded-[13px] min-[390px]:text-[12px] min-[390px]:tracking-[0.08em]"
          onClick={onContinue}
          type="button"
        >
          <AssetIcon size={21} src={giftIcon} />
          Continue
        </button>
        <Link
          className="grid min-h-[50px] place-items-center rounded-[12px] border border-[var(--sb-border)] bg-black/34 text-[11px] uppercase tracking-[0.07em] text-[var(--sb-gold-soft)] transition hover:bg-[var(--sb-gold)]/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)] min-[390px]:min-h-[56px] min-[390px]:rounded-[13px] min-[390px]:text-[12px] min-[390px]:tracking-[0.08em]"
          href="/omakase"
        >
          Omakase
        </Link>
      </div>
    </MobileGiftPanel>
  );
}

function CommandMetric({ label, value }: { label: string; value: string }) {
  return (
    <p className="min-w-0 px-2 py-3 text-center">
      <span className="block truncate font-mono text-[16px] text-[var(--sb-gold-soft)]">
        {value}
      </span>
      <span className="mt-1 block text-[10px] uppercase tracking-[0.1em] text-white/44">
        {label}
      </span>
    </p>
  );
}
