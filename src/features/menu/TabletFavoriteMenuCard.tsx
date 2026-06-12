"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { formatMoney } from "@/lib/money";
import type { MenuItem } from "@/types/menu";

interface TabletFavoriteMenuCardProps {
  eagerImage: boolean;
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  onRemove: (id: string) => void;
}

export function TabletFavoriteMenuCard({
  eagerImage,
  item,
  onAddToCart,
  onRemove,
}: TabletFavoriteMenuCardProps) {
  return (
    <article className="relative overflow-hidden rounded-[14px] border border-white/10 bg-white/[0.035]">
      <div className="relative h-[174px] bg-black/30 min-[1080px]:h-[204px]">
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
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/42 text-[var(--sb-red-bright)]"
          onClick={() => onRemove(item.id)}
          type="button"
        >
          <AssetIcon size={22} src="/assets/icons/heart-icon.png" />
        </button>
      </div>
      <div className="p-4">
        <h2 className="truncate text-[18px] font-semibold text-white">
          {item.name}
        </h2>
        <p className="mt-1 line-clamp-2 min-h-[40px] text-[13px] leading-5 text-white/58">
          {item.description}
        </p>
        <p className="mt-3 font-mono text-[20px] text-[var(--sb-gold-soft)]">
          {formatMoney(item.priceCents)}
        </p>
        <Button
          className="red-glow-button mt-4 h-10 w-full rounded-[10px] text-[11px] uppercase tracking-[0.08em]"
          onClick={() => onAddToCart(item)}
          size="sm"
        >
          Add to cart
          <AssetIcon size={18} src="/assets/icons/shopping-cart-icon.png" />
        </Button>
      </div>
    </article>
  );
}
