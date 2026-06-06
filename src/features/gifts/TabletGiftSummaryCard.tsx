"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { formatMoney } from "@/lib/money";
import type { GiftExperience } from "@/types/gift";

import { getTabletGiftTotals } from "./tabletGiftMath";

interface TabletGiftSummaryCardProps {
  gift: GiftExperience;
  compact?: boolean;
}

export function TabletGiftSummaryCard({
  gift,
  compact = false,
}: TabletGiftSummaryCardProps) {
  const totals = getTabletGiftTotals(gift);

  return (
    <aside className="rounded-[14px] border border-[var(--sb-gold)]/22 bg-white/[0.035] p-4 min-[1080px]:p-5">
      <h2 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
        Gift summary
      </h2>
      <div className="mt-4 grid grid-cols-[120px_minmax(0,1fr)] gap-4">
        <div className="relative h-[84px] overflow-hidden rounded-[10px] border border-white/10">
          <Image
            alt=""
            className="object-cover"
            fill
            sizes="120px"
            src={gift.image.publicUrl}
          />
        </div>
        <div>
          <h3 className="text-[16px] font-semibold text-white">{gift.title}</h3>
          <p className="mt-1 text-[13px] leading-5 text-white/58">
            {gift.description}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 border-t border-white/10 pt-4 text-[14px]">
        <div className="flex justify-between text-white/62">
          <span>Price per person</span>
          <span>{formatMoney(gift.priceCents)}</span>
        </div>
        <div className="flex justify-between text-white/62">
          <span>Quantity</span>
          <span>{totals.quantity} People</span>
        </div>
        <div className="flex justify-between border-t border-white/10 pt-3 text-white/62">
          <span>Subtotal</span>
          <span>{formatMoney(totals.subtotalCents)}</span>
        </div>
        <div className="flex justify-between text-white/62">
          <span>Service Fee</span>
          <span>{formatMoney(totals.serviceFeeCents)}</span>
        </div>
        <div className="flex justify-between text-white/62">
          <span>Tax</span>
          <span>{formatMoney(totals.taxCents)}</span>
        </div>
        <div className="flex justify-between border-t border-white/10 pt-3">
          <span className="text-[var(--sb-gold-soft)]">Total</span>
          <span className="font-mono text-[26px] text-[var(--sb-gold-soft)]">
            {formatMoney(totals.totalCents)}
          </span>
        </div>
      </div>

      {compact ? null : (
        <div className="mt-5 grid gap-2">
          {[
            ["Valid for 1 year from purchase", "/assets/icons/check-icon.png"],
            ["Fully transferable", "/assets/icons/gift-icon.png"],
            ["Easy online redemption", "/assets/icons/floral-emblem-icon.png"],
            ["Personalized digital gift card", "/assets/icons/email-icon.png"],
          ].map(([label, icon]) => (
            <div
              className="flex min-h-[38px] items-center gap-3 rounded-[9px] border border-white/10 bg-black/20 px-3 text-[12px] text-white/60"
              key={label}
            >
              <AssetIcon size={18} src={icon} />
              {label}
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}
