"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { formatMoney } from "@/lib/money";
import type { MenuItem } from "@/types/menu";

import { icons } from "./visualHomeData";

interface HomeMenuCardProps {
  badge: string;
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  priority?: boolean;
}

export function HomeMenuCard({
  badge,
  item,
  onAddToCart,
  priority = false,
}: HomeMenuCardProps) {
  return (
    <article className="relative min-w-0 overflow-hidden rounded-[14px] border border-[var(--sb-border)] bg-black/62">
      <span className="absolute left-0 top-0 z-10 rounded-br-[12px] bg-[var(--sb-red)]/86 px-2 py-1 text-[10px] uppercase text-white">
        {badge}
      </span>
      <a className="block w-full text-left" href="#menu">
        <div className="relative h-[86px] md:h-[52px]">
          <Image
            alt=""
            className="pointer-events-none object-cover"
            fill
            priority={priority}
            sizes="180px"
            src={item.image.publicUrl}
          />
        </div>
        <div className="p-3 md:p-2">
          <h3 className="editorial-title line-clamp-2 min-h-[34px] text-[13px] leading-[17px] text-white md:min-h-[28px] md:text-[13px] md:leading-[14px] xl:text-[15px]">
            {item.name}
          </h3>
          <p className="mt-1 line-clamp-2 min-h-9 text-[11px] leading-[17px] text-white/68 md:min-h-7 md:text-[11px] md:leading-[14px]">
            {item.ingredients.slice(0, 3).join(", ")}
          </p>
          <p className="mt-1 text-[17px] text-[var(--sb-gold)] md:text-base">
            {formatMoney(item.priceCents)}
          </p>
        </div>
      </a>
      <button
        aria-label={`Add ${item.name} to cart`}
        className="absolute bottom-3 right-3 z-20 grid h-8 w-8 place-items-center rounded-full border border-[var(--sb-border-strong)] bg-black/50 transition active:scale-95 md:bottom-2 md:right-2 md:h-7 md:w-7"
        onClick={() => onAddToCart(item)}
        type="button"
      >
        <AssetIcon size={22} src={icons.plus} />
      </button>
    </article>
  );
}
