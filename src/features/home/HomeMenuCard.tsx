"use client";

import Image from "next/image";
import Link from "next/link";

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
      <Link className="block w-full text-left" href="/menu">
        <div className="relative h-[86px] md:h-[52px]">
          <Image
            alt=""
            className="pointer-events-none object-cover"
            fill
            loading={priority ? "eager" : "lazy"}
            priority={priority}
            sizes="180px"
            src={item.image.publicUrl}
          />
        </div>
        <div className="px-3 pb-12 pt-3 md:p-2 md:pr-11 xl:pr-12">
          <h3 className="editorial-title line-clamp-3 min-h-[51px] text-[13px] leading-[17px] text-white md:line-clamp-2 md:min-h-[34px] md:text-[13px] md:leading-[17px] xl:text-[15px]">
            {item.name}
          </h3>
          <p className="mt-1 line-clamp-2 min-h-9 text-[11px] leading-[17px] text-white/68 md:min-h-7 md:text-[11px] md:leading-[14px]">
            {item.ingredients.slice(0, 3).join(", ")}
          </p>
          <p className="mt-1 pr-7 text-[17px] text-[var(--sb-gold)] md:pr-0 md:text-base">
            {formatMoney(item.priceCents)}
          </p>
        </div>
      </Link>
      <button
        aria-label={`Add ${item.name} to cart`}
        className="absolute bottom-2 right-2 z-20 grid h-10 w-10 place-items-center rounded-full transition active:scale-95"
        onClick={() => onAddToCart(item)}
        type="button"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full border border-[var(--sb-border-strong)] bg-black/50 md:h-9 md:w-9">
          <AssetIcon size={22} src={icons.plus} />
        </span>
      </button>
    </article>
  );
}
