"use client";

import Image from "next/image";

import { QuantityControl } from "@/components/ui/QuantityControl";
import { getTabletPresentationImage } from "@/lib/assets";
import {
  calculateCartLineSubtotal,
  calculateCartLineUnitPrice,
} from "@/lib/cart";
import { formatMoney } from "@/lib/money";
import type { CartLineItem } from "@/types/order";

interface TabletCartLineProps {
  item: CartLineItem;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export function TabletCartLine({
  item,
  onRemove,
  onUpdateQuantity,
}: TabletCartLineProps) {
  const unitPriceCents = calculateCartLineUnitPrice(item.menuItem, item.addOns);
  const lineSubtotalCents = calculateCartLineSubtotal(item);

  return (
    <article className="grid grid-cols-[160px_1fr_126px_82px] items-center gap-5 border-b border-white/10 py-4 first:pt-0 last:border-b-0 last:pb-0">
      <div className="relative h-[96px] overflow-hidden rounded-[12px] bg-white/[0.04]">
        <Image
          alt={item.menuItem.image.alt || item.menuItem.name}
          className="object-cover"
          fill
          loading="eager"
          sizes="160px"
          src={getTabletPresentationImage(item.menuItem)}
        />
      </div>
      <div className="min-w-0">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
          {item.menuItem.categoryLabel}
        </p>
        <h2 className="mt-3 text-[21px] font-semibold uppercase tracking-[0.04em]">
          {item.menuItem.name}
        </h2>
        <p className="mt-2 line-clamp-2 text-[14px] leading-5 text-white/56">
          {item.menuItem.description}
        </p>
        <p className="mt-2 font-mono text-[18px] text-[var(--sb-gold-soft)]">
          {formatMoney(unitPriceCents)}
        </p>
      </div>
      <QuantityControl
        className="rounded-[12px] border-[var(--sb-gold)]/28"
        max={99}
        min={0}
        onChange={(quantity) => onUpdateQuantity(item.id, quantity)}
        value={item.quantity}
      />
      <div className="text-right">
        <p className="font-mono text-[17px] text-white">
          {formatMoney(lineSubtotalCents)}
        </p>
        <button
          className="mt-3 text-[13px] text-[var(--sb-red-bright)] underline underline-offset-4"
          onClick={() => onRemove(item.id)}
          type="button"
        >
          Remove
        </button>
      </div>
    </article>
  );
}
