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
  viewHref?: string;
}

export function HomeMenuCard({
  badge,
  item,
  onAddToCart,
  priority = false,
  viewHref = "/menu",
}: HomeMenuCardProps) {
  return (
    <article className="relative min-w-0 overflow-hidden rounded-[14px] border border-[var(--sb-border)] bg-black/62">
      <span className="absolute left-0 top-0 z-10 rounded-br-[12px] bg-[var(--sb-red)]/86 px-2 py-1 text-[10px] uppercase text-white">
        {badge}
      </span>
      <Link
        className="grid min-h-[166px] w-full grid-cols-[42%_1fr] text-left min-[390px]:block min-[390px]:min-h-0"
        href={viewHref}
      >
        <div className="relative min-h-[166px] min-[390px]:h-[86px] min-[390px]:min-h-0 md:h-[52px]">
          <Image
            alt=""
            className="pointer-events-none object-cover"
            fill
            loading={priority ? "eager" : "lazy"}
            priority={priority}
            sizes="(max-width: 389px) 42vw, 180px"
            src={item.image.publicUrl}
          />
        </div>
        <div className="px-3 pb-12 pt-3 min-[390px]:px-3 min-[390px]:pb-12 min-[390px]:pt-3 md:p-2 md:pr-11 xl:pr-12">
          <h3 className="editorial-title line-clamp-2 min-h-10 text-[16px] leading-5 text-white min-[390px]:line-clamp-3 min-[390px]:min-h-[51px] min-[390px]:text-[13px] min-[390px]:leading-[17px] md:line-clamp-2 md:min-h-[34px] md:text-[13px] md:leading-[17px] xl:text-[15px]">
            {item.name}
          </h3>
          <p className="mt-1 line-clamp-2 min-h-8 text-[11px] leading-4 text-white/68 min-[390px]:min-h-9 min-[390px]:leading-[17px] md:min-h-7 md:text-[11px] md:leading-[14px]">
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
