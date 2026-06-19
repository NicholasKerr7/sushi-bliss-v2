"use client";

import Image from "next/image";
import { useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import {
  getMenuItemOrderAction,
  isMenuItemOnlineOrderable,
} from "@/lib/menuAvailability";
import { formatMoney } from "@/lib/money";
import type { MenuItem } from "@/types/menu";

interface TabletFavoriteMenuCardProps {
  eagerImage: boolean;
  item: MenuItem;
  onAddToCart: (item: MenuItem, quantity: number) => void;
  onRemove: (id: string) => void;
  showQuantityControls: boolean;
}

export function TabletFavoriteMenuCard({
  eagerImage,
  item,
  onAddToCart,
  onRemove,
  showQuantityControls,
}: TabletFavoriteMenuCardProps) {
  const [quantity, setQuantity] = useState(1);
  const isOnlineOrderable = isMenuItemOnlineOrderable(item);
  const orderAction = getMenuItemOrderAction(item);
  const description =
    item.ingredients.length > 0
      ? item.ingredients.slice(0, 4).join(", ")
      : item.description;

  const updateQuantity = (delta: number) => {
    setQuantity((currentQuantity) => Math.max(1, currentQuantity + delta));
  };

  return (
    <article className="relative overflow-hidden rounded-[10px] border border-[var(--sb-border)] bg-[#090b0b] shadow-[0_18px_45px_rgb(0_0_0_/_0.24)]">
      <div className="relative h-[180px] bg-black/30">
        <Image
          alt={item.image.alt || item.name}
          className="object-cover"
          fill
          loading={eagerImage ? "eager" : "lazy"}
          priority={eagerImage}
          sizes="260px"
          src={item.image.publicUrl}
        />
        <button
          aria-label={`Remove ${item.name} from favorites`}
          className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-[var(--sb-red-bright)] drop-shadow-[0_0_10px_rgb(239_47_37_/_0.45)] transition hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
          onClick={() => onRemove(item.id)}
          type="button"
        >
          <AssetIcon
            loading="eager"
            size={25}
            src="/assets/icons/heart-icon.png"
          />
        </button>
      </div>
      <div className="p-4">
        <h2 className="truncate font-serif text-[20px] leading-tight text-white">
          {item.name}
        </h2>
        <p className="mt-2 line-clamp-2 min-h-[38px] text-[13px] leading-[19px] text-white/66">
          {description}
        </p>
        <p className="mt-4 font-mono text-[20px] text-[var(--sb-gold-soft)]">
          {formatMoney(item.priceCents)}
        </p>
        {item.itemType === "drink" ? (
          <span className="mt-1 block text-[10px] uppercase tracking-[0.1em] text-white/42">
            {orderAction.badge}
          </span>
        ) : null}
        <div className="mt-4 flex items-center gap-2">
          {showQuantityControls && isOnlineOrderable ? (
            <div
              aria-label={`${item.name} quantity`}
              className="flex h-9 shrink-0 items-center gap-1 text-[13px] text-white"
              role="group"
            >
              <button
                aria-label={`Decrease ${item.name} quantity`}
                className="grid h-[22px] w-[22px] place-items-center rounded-full border border-[var(--sb-gold)]/60 text-[var(--sb-gold-soft)] transition hover:bg-[var(--sb-gold)]/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
                onClick={() => updateQuantity(-1)}
                type="button"
              >
                -
              </button>
              <span className="min-w-3 text-center">{quantity}</span>
              <button
                aria-label={`Increase ${item.name} quantity`}
                className="grid h-[22px] w-[22px] place-items-center rounded-full border border-[var(--sb-gold)]/60 text-[var(--sb-gold-soft)] transition hover:bg-[var(--sb-gold)]/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
                onClick={() => updateQuantity(1)}
                type="button"
              >
                +
              </button>
            </div>
          ) : null}
          {isOnlineOrderable ? (
            <Button
              aria-label={`Add ${quantity} ${item.name} to cart`}
              className="red-glow-button h-[43px] min-h-0 min-w-[128px] flex-1 gap-1 whitespace-nowrap rounded-[7px] px-1.5 text-[10px] uppercase tracking-[0.01em]"
              onClick={() => onAddToCart(item, quantity)}
              size="sm"
            >
              Add to cart
              <AssetIcon size={14} src="/assets/icons/shopping-cart-icon.png" />
            </Button>
          ) : (
            <Button
              aria-label={`${orderAction.label} for ${item.name}`}
              className="red-glow-button h-[43px] min-h-0 min-w-[128px] flex-1 gap-1 whitespace-nowrap rounded-[7px] px-1.5 text-[10px] uppercase tracking-[0.01em]"
              href={orderAction.href || "/reservations"}
              size="sm"
            >
              {orderAction.shortLabel}
              <AssetIcon size={14} src={orderAction.icon} />
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
