"use client";

import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { icons } from "@/features/home/visualHomeData";
import { formatMoney } from "@/lib/money";
import type { MenuItem } from "@/types/menu";

export function MobileMenuGridCard({
  badge,
  eagerImage = false,
  item,
  onAddToCart,
  onViewDetails,
}: {
  badge?: string;
  eagerImage?: boolean;
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  onViewDetails: (item: MenuItem) => void;
}) {
  return (
    <article className="relative grid min-h-[96px] grid-cols-[44%_1fr] overflow-hidden rounded-[13px] border border-[var(--sb-border)] bg-black/48">
      {badge ? (
        <span className="absolute left-0 top-0 z-10 rounded-br-[10px] bg-[var(--sb-red)] px-2.5 py-1 text-[10px] uppercase text-white">
          {badge}
        </span>
      ) : null}
      <button
        aria-label={`View details for ${item.name}`}
        className="relative min-h-[96px]"
        onClick={() => onViewDetails(item)}
        type="button"
      >
        <Image
          alt=""
          className="object-cover"
          fill
          loading={eagerImage ? "eager" : "lazy"}
          priority={eagerImage}
          sizes="90px"
          src={item.image.publicUrl}
        />
      </button>
      <button
        className="min-w-0 px-3 py-3 text-left"
        onClick={() => onViewDetails(item)}
        type="button"
      >
        <h3 className="line-clamp-3 min-h-[54px] text-[15px] leading-[18px] text-white">
          {item.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-[11px] leading-[14px] text-white/64">
          {item.description}
        </p>
        <p className="mt-2 text-[16px] text-[var(--sb-gold)]">
          {formatMoney(item.priceCents)}
        </p>
      </button>
      <button
        aria-label={`Add ${item.name} to cart`}
        className="absolute bottom-2 right-2 grid h-8 w-8 place-items-center rounded-full border border-[var(--sb-border-strong)] bg-black/62"
        onClick={() => onAddToCart(item)}
        type="button"
      >
        <AssetIcon size={21} src={icons.plus} />
      </button>
    </article>
  );
}

export function MobileMenuListCard({
  badge,
  eagerImage = false,
  item,
  onAddToCart,
  onViewDetails,
}: {
  badge?: string;
  eagerImage?: boolean;
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  onViewDetails: (item: MenuItem) => void;
}) {
  return (
    <article className="relative grid min-h-[116px] grid-cols-[42%_1fr_42px] overflow-hidden rounded-[15px] border border-white/14 bg-white/[0.035] min-[390px]:min-h-[132px] min-[390px]:grid-cols-[45%_1fr_48px] min-[390px]:rounded-[16px]">
      {badge ? (
        <span className="absolute left-3 top-3 z-10 rounded-[8px] bg-[var(--sb-red)] px-2.5 py-1 text-[10px] uppercase text-white">
          {badge}
        </span>
      ) : null}
      <button
        aria-label={`View details for ${item.name}`}
        className="relative h-[116px] min-[390px]:h-[132px]"
        onClick={() => onViewDetails(item)}
        type="button"
      >
        <Image
          alt=""
          className="object-cover"
          fill
          loading={eagerImage ? "eager" : "lazy"}
          priority={eagerImage}
          sizes="190px"
          src={item.image.publicUrl}
        />
      </button>
      <button
        className="min-w-0 px-3 py-3 text-left min-[390px]:px-4 min-[390px]:py-4"
        onClick={() => onViewDetails(item)}
        type="button"
      >
        <h3 className="line-clamp-2 text-[18px] leading-5 text-white min-[390px]:text-[21px] min-[390px]:leading-6">
          {item.name}
        </h3>
        <p className="mt-2 line-clamp-1 text-[13px] text-white/66 min-[390px]:text-[15px]">
          {item.description}
        </p>
        <p className="mt-3 text-[19px] text-[var(--sb-gold)] min-[390px]:mt-4 min-[390px]:text-[22px]">
          {formatMoney(item.priceCents)}
        </p>
      </button>
      <button
        aria-label={`Add ${item.name} to cart`}
        className="mr-2 self-center justify-self-end rounded-full border border-[var(--sb-border-strong)] bg-black/58 p-1.5 min-[390px]:mr-3 min-[390px]:p-2"
        onClick={() => onAddToCart(item)}
        type="button"
      >
        <AssetIcon size={21} src={icons.plus} />
      </button>
    </article>
  );
}

export function MobileSearchResultRow({
  badge,
  eagerImage = false,
  item,
  onAddToCart,
  onViewDetails,
}: {
  badge?: string;
  eagerImage?: boolean;
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  onViewDetails: (item: MenuItem) => void;
}) {
  return (
    <article className="relative grid min-h-[118px] grid-cols-[38%_1fr_46px] overflow-hidden rounded-[16px] border border-white/14 bg-white/[0.035]">
      {badge ? (
        <span className="absolute left-2 top-2 z-10 rounded-[8px] bg-[var(--sb-red)] px-2 py-1 text-[9px] uppercase text-white">
          {badge}
        </span>
      ) : null}
      <button
        aria-label={`View details for ${item.name}`}
        className="relative h-[118px]"
        onClick={() => onViewDetails(item)}
        type="button"
      >
        <Image
          alt=""
          className="object-cover"
          fill
          loading={eagerImage ? "eager" : "lazy"}
          priority={eagerImage}
          sizes="160px"
          src={item.image.publicUrl}
        />
      </button>
      <button
        className="min-w-0 px-3 py-3 text-left"
        onClick={() => onViewDetails(item)}
        type="button"
      >
        <h3 className="line-clamp-1 text-[18px] leading-6 text-white">
          {item.name}
        </h3>
        <p className="mt-1 line-clamp-1 text-[14px] text-white/72">
          {item.description}
        </p>
        <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-white/58">
          {item.chefNote}
        </p>
        <p className="mt-2 text-[19px] text-[var(--sb-gold)]">
          {formatMoney(item.priceCents)}
        </p>
      </button>
      <button
        aria-label={`Add ${item.name} to cart`}
        className="mr-2 self-center justify-self-end rounded-full border border-[var(--sb-border-strong)] bg-black/58 p-2"
        onClick={() => onAddToCart(item)}
        type="button"
      >
        <AssetIcon size={24} src={icons.plus} />
      </button>
    </article>
  );
}

export function getPopularMobileItems(items: MenuItem[]) {
  const preferredIds = [
    "otoro-nigiri",
    "salmon-nigiri",
    "spicy-tuna-roll",
    "dragon-roll",
    "uni-nigiri",
    "hamachi-nigiri",
    "salmon-sashimi",
    "miso-soup",
  ];
  const preferred = preferredIds
    .map((id) => items.find((item) => item.id === id))
    .filter((item): item is MenuItem => Boolean(item));
  const rest = items.filter(
    (item) => !preferred.some((preferredItem) => preferredItem.id === item.id),
  );

  return [...preferred, ...rest];
}
