"use client";

import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { icons } from "@/features/home/visualHomeData";
import { formatMoney } from "@/lib/money";
import type { MenuItem } from "@/types/menu";

interface MobileFavoriteCardProps {
  eagerImage: boolean;
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  onRemove: (itemId: string) => void;
}

/** Mobile saved dish row with quick add and remove controls. */
export function MobileFavoriteCard({
  eagerImage,
  item,
  onAddToCart,
  onRemove,
}: MobileFavoriteCardProps) {
  return (
    <article className="grid min-h-[144px] grid-cols-[112px_minmax(0,1fr)] gap-4 rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.02))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_22px_60px_rgba(0,0,0,0.42)] backdrop-blur-xl">
      <Link
        className="relative min-h-[120px] overflow-hidden rounded-[14px] border border-white/10 bg-black/34"
        href="/menu"
      >
        <Image
          alt={item.image.alt || item.name}
          className="object-cover"
          fill
          loading={eagerImage ? "eager" : "lazy"}
          sizes="112px"
          src={item.image.publicUrl}
        />
      </Link>
      <div className="min-w-0 py-1">
        <StatusBadge tone="premium">{item.categoryLabel}</StatusBadge>
        <h2 className="mt-3 line-clamp-2 text-[19px] font-semibold leading-6 text-white">
          {item.name}
        </h2>
        <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-white/52">
          {item.description}
        </p>
        <div className="mt-4 grid grid-cols-[1fr_42px] gap-2">
          <button
            className="red-glow-button min-h-[42px] rounded-[12px] border text-[11px]"
            onClick={() => onAddToCart(item)}
            type="button"
          >
            Add {formatMoney(item.priceCents)}
          </button>
          <button
            aria-label={`Remove ${item.name} from favorites`}
            className="grid min-h-[42px] place-items-center rounded-[12px] border border-[var(--sb-border)] bg-black/28"
            onClick={() => onRemove(item.id)}
            type="button"
          >
            <AssetIcon size={20} src={icons.x} />
          </button>
        </div>
      </div>
    </article>
  );
}
