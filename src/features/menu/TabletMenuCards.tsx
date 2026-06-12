import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { icons } from "@/features/home/visualHomeData";
import { formatMoney } from "@/lib/money";
import type { MenuItem } from "@/types/menu";

interface TabletMenuCardProps {
  badge: string;
  isFavorite: boolean;
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  onToggleFavorite: (itemId: string) => void;
  onViewDetails: (item: MenuItem) => void;
}

interface TabletCompactMenuRowProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  onViewDetails: (item: MenuItem) => void;
}

export function TabletMenuCard({
  badge,
  isFavorite,
  item,
  onAddToCart,
  onToggleFavorite,
  onViewDetails,
}: TabletMenuCardProps) {
  return (
    <article className="relative overflow-hidden rounded-[9px] border border-[var(--sb-border)] bg-black/48">
      <span className="absolute left-0 top-0 z-10 rounded-br-[12px] bg-[var(--sb-red)]/86 px-2.5 py-1 text-[10px] uppercase text-white">
        {badge}
      </span>
      <button
        aria-label={`${isFavorite ? "Remove" : "Save"} ${item.name}`}
        className="absolute right-3 top-3 z-10 text-[var(--sb-gold)]"
        onClick={() => onToggleFavorite(item.id)}
        type="button"
      >
        <AssetIcon size={22} src={icons.star} />
      </button>
      <button
        className="block w-full text-left"
        onClick={() => onViewDetails(item)}
        type="button"
      >
        <div className="relative h-[124px]">
          <Image
            alt=""
            className="object-cover"
            fill
            sizes="250px"
            src={item.image.publicUrl}
          />
        </div>
        <div className="p-3.5">
          <h3 className="editorial-title line-clamp-1 text-[18px] text-white">
            {item.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 min-h-10 text-[14px] leading-5 text-white/72">
            {item.ingredients.slice(0, 3).join(", ")}
          </p>
          <p className="mt-3 text-[22px] text-[var(--sb-gold)]">
            {formatMoney(item.priceCents)}
          </p>
        </div>
      </button>
      <button
        aria-label={`Add ${item.name} to cart`}
        className="absolute bottom-3.5 right-3.5 grid h-9 w-9 place-items-center rounded-full border border-[var(--sb-border-strong)] bg-black/55"
        onClick={() => onAddToCart(item)}
        type="button"
      >
        <AssetIcon size={24} src={icons.plus} />
      </button>
    </article>
  );
}

export function TabletCompactMenuRow({
  item,
  onAddToCart,
  onViewDetails,
}: TabletCompactMenuRowProps) {
  return (
    <article className="grid grid-cols-[108px_minmax(0,1fr)_38px] items-center gap-3 rounded-[8px] border border-[var(--sb-border)] bg-black/34 p-1.5">
      <button
        className="relative h-[74px] overflow-hidden rounded-[6px]"
        onClick={() => onViewDetails(item)}
        type="button"
      >
        <Image
          alt=""
          className="object-cover"
          fill
          sizes="120px"
          src={item.image.publicUrl}
        />
      </button>
      <button
        className="min-w-0 text-left"
        onClick={() => onViewDetails(item)}
        type="button"
      >
        <h3 className="line-clamp-1 text-[16px] text-white">{item.name}</h3>
        <p className="mt-0.5 line-clamp-1 text-[13px] text-white/58">
          {item.description}
        </p>
        <p className="text-[16px] text-[var(--sb-gold)]">
          {formatMoney(item.priceCents)}
        </p>
      </button>
      <button
        aria-label={`Add ${item.name} to cart`}
        className="grid h-9 w-9 place-items-center rounded-full border border-[var(--sb-border)]"
        onClick={() => onAddToCart(item)}
        type="button"
      >
        <AssetIcon size={21} src={icons.plus} />
      </button>
    </article>
  );
}
