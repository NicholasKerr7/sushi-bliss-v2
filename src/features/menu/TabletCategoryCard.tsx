import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { icons } from "@/features/home/visualHomeData";
import { getTabletPresentationImage } from "@/lib/assets";
import { getMenuItemOrderAction } from "@/lib/menuAvailability";
import { formatMoney } from "@/lib/money";
import type { MenuItem } from "@/types/menu";

export function TabletCategoryCard({
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
  const isDrinkItem = item.itemType === "drink";
  const orderAction = getMenuItemOrderAction(item);

  return (
    <article className="relative overflow-hidden rounded-[10px] border border-[var(--sb-border)] bg-black/42">
      {badge ? (
        <span className="absolute left-2 top-2 z-10 rounded-[8px] bg-[var(--sb-red)] px-3 py-1 text-[11px] uppercase text-white">
          {badge}
        </span>
      ) : null}
      <button
        className="block w-full text-left"
        onClick={() => onViewDetails(item)}
        type="button"
      >
        <div className="relative h-[98px] min-[1080px]:h-[128px]">
          <Image
            alt=""
            className="object-cover"
            fetchPriority={eagerImage ? "high" : "auto"}
            fill
            loading={eagerImage ? "eager" : "lazy"}
            sizes="320px"
            src={getTabletPresentationImage(item)}
          />
        </div>
        <div className="p-3 min-[1080px]:p-4">
          <h2 className="text-[19px] text-white">{item.name}</h2>
          <p className="mt-2 line-clamp-2 text-sm leading-5 text-white/68">
            {item.description}
          </p>
          {isDrinkItem ? (
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-[var(--sb-gold)]/30 bg-[var(--sb-gold)]/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                {item.serving}
              </span>
              {item.abv ? (
                <span className="rounded-full border border-white/12 bg-white/[0.035] px-2.5 py-1 text-[11px] uppercase tracking-[0.08em] text-white/62">
                  {item.abv}% ABV
                </span>
              ) : null}
            </div>
          ) : null}
          <p className="mt-4 text-[22px] text-[var(--sb-gold)]">
            {formatMoney(item.priceCents)}
          </p>
          {isDrinkItem ? (
            <span className="mt-1 block text-[10px] uppercase tracking-[0.1em] text-white/42">
              {orderAction.badge}
            </span>
          ) : null}
        </div>
      </button>
      {orderAction.kind === "reservation" ? (
        <Link
          aria-label={`${orderAction.label} for ${item.name}`}
          className="absolute bottom-4 right-4 flex h-10 min-w-[96px] items-center justify-center gap-2 rounded-full border border-[var(--sb-gold)]/48 bg-[linear-gradient(180deg,rgba(215,168,79,0.18),rgba(7,8,8,0.86))] px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] shadow-[0_0_20px_rgba(215,168,79,0.16)]"
          href={orderAction.href || "/reservations"}
        >
          <AssetIcon size={19} src={orderAction.icon} />
          <span>{orderAction.shortLabel}</span>
        </Link>
      ) : (
        <button
          aria-label={`Add ${item.name} to cart`}
          className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full border border-[var(--sb-border-strong)] bg-black/55 text-[var(--sb-gold)]"
          onClick={() => onAddToCart(item)}
          type="button"
        >
          <AssetIcon size={24} src={icons.plus} />
        </button>
      )}
    </article>
  );
}
