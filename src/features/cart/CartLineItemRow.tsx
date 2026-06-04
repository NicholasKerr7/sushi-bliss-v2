"use client";

import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { QuantityControl } from "@/components/ui/QuantityControl";
import {
  calculateCartLineSubtotal,
  calculateCartLineUnitPrice,
} from "@/lib/cart";
import { formatMoney } from "@/lib/money";
import type { CartLineItem } from "@/types/order";

interface CartLineItemRowProps {
  item: CartLineItem;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export function CartLineItemRow({
  item,
  onRemove,
  onUpdateQuantity,
}: CartLineItemRowProps) {
  const unitPriceCents = calculateCartLineUnitPrice(item.menuItem, item.addOns);
  const lineSubtotalCents = calculateCartLineSubtotal(item);

  return (
    <article className="grid grid-cols-[84px_1fr] gap-4 rounded-card border border-sb-line bg-sb-ink/45 p-3">
      <div className="relative aspect-square overflow-hidden rounded-card bg-sb-panel-soft">
        <Image
          alt={item.menuItem.image.alt || item.menuItem.name}
          className="object-cover"
          fill
          sizes="84px"
          src={item.menuItem.image.publicUrl}
        />
      </div>
      <div className="min-w-0 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-sb-rice">
              {item.menuItem.name}
            </h3>
            <p className="mt-1 font-mono text-xs text-sb-gold-soft">
              {formatMoney(unitPriceCents)} each
            </p>
          </div>
          <Button onClick={() => onRemove(item.id)} size="sm" variant="ghost">
            Remove
          </Button>
        </div>

        <div className="space-y-1 text-xs leading-5 text-sb-muted">
          <p>
            {item.customizations
              .map(
                (customization) =>
                  `${customization.groupLabel}: ${customization.optionLabel}`,
              )
              .join(" · ")}
          </p>
          {item.addOns.length > 0 ? (
            <p>
              Add-ons:{" "}
              {item.addOns
                .map(
                  (addOn) => `${addOn.label} ${formatMoney(addOn.priceCents)}`,
                )
                .join(", ")}
            </p>
          ) : null}
          {item.notes ? <p>Notes: {item.notes}</p> : null}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <QuantityControl
            max={99}
            min={0}
            onChange={(quantity) => onUpdateQuantity(item.id, quantity)}
            value={item.quantity}
          />
          <p className="font-mono text-sm font-semibold text-sb-rice">
            {formatMoney(lineSubtotalCents)}
          </p>
        </div>
      </div>
    </article>
  );
}
