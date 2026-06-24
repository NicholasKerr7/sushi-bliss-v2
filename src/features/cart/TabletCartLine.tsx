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
  const selectedAddOns = item.addOns.map((addOn) => addOn.label).join(" · ");

  return (
    <article className="grid grid-cols-[104px_minmax(0,1fr)] gap-4 border-b border-white/10 py-4 first:pt-0 last:border-b-0 last:pb-0 min-[900px]:grid-cols-[126px_minmax(0,1fr)] min-[1080px]:grid-cols-[138px_minmax(0,1fr)] min-[1080px]:gap-5">
      <div className="relative h-[98px] overflow-hidden rounded-[12px] bg-white/[0.04] min-[900px]:h-[110px] min-[1080px]:h-[118px]">
        <Image
          alt={item.menuItem.image.alt || item.menuItem.name}
          className="object-cover"
          fill
          loading="eager"
          sizes="138px"
          src={getTabletPresentationImage(item.menuItem)}
        />
      </div>
      <div className="min-w-0">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
          {item.menuItem.categoryLabel}
        </p>
        <h2 className="mt-2 line-clamp-2 text-[18px] font-semibold uppercase leading-6 tracking-[0.04em] min-[1080px]:mt-3 min-[1080px]:text-[21px]">
          {item.menuItem.name}
        </h2>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-5 text-white/56 min-[1080px]:mt-2 min-[1080px]:text-[14px]">
          {item.menuItem.description}
        </p>
        {selectedAddOns ? (
          <p className="mt-2 line-clamp-2 text-[12px] leading-5 text-white/48">
            Extras: {selectedAddOns}
          </p>
        ) : null}
        <p className="mt-2 font-mono text-[18px] text-[var(--sb-gold-soft)]">
          {formatMoney(unitPriceCents)}
        </p>
        <div className="mt-3 grid gap-3 min-[900px]:mt-4 min-[900px]:grid-cols-[auto_minmax(0,1fr)] min-[900px]:items-center">
          <QuantityControl
            className="rounded-[12px] border-[var(--sb-gold)]/28"
            max={99}
            min={0}
            onChange={(quantity) => onUpdateQuantity(item.id, quantity)}
            value={item.quantity}
          />
          <div className="flex min-w-0 items-center justify-between gap-3 min-[900px]:justify-end min-[900px]:text-right">
            <p className="font-mono text-[17px] text-white">
              {formatMoney(lineSubtotalCents)}
            </p>
            <button
              className="text-[13px] text-[var(--sb-red-bright)] underline underline-offset-4"
              onClick={() => onRemove(item.id)}
              type="button"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
