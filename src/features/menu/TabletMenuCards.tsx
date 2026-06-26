import Image from "next/image";
import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { icons } from "@/features/home/homeDashboardData";
import { getMenuItemOrderAction } from "@/lib/menuAvailability";
import { formatMoney } from "@/lib/money";
import type { MenuItem } from "@/types/menu";

interface TabletMenuCardProps {
  badge: string;
  eagerImage?: boolean;
  isFavorite: boolean;
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  onToggleFavorite: (itemId: string) => void;
  onViewDetails: (item: MenuItem) => void;
}

interface TabletCompactMenuRowProps {
  eagerImage?: boolean;
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  onViewDetails: (item: MenuItem) => void;
}

export function TabletMenuCard({
  badge,
  eagerImage = false,
  isFavorite,
  item,
  onAddToCart,
  onToggleFavorite,
  onViewDetails,
}: TabletMenuCardProps) {
  const orderAction = getMenuItemOrderAction(item);

  return (
    <article className="relative overflow-hidden rounded-[9px] border border-[var(--sb-border)] bg-black/48">
      <span className="absolute left-0 top-0 z-10 rounded-br-[12px] bg-[var(--sb-red)]/86 px-2.5 py-1 text-[10px] uppercase text-white">
        {badge}
      </span>
      <button
        aria-label={`${isFavorite ? "Remove" : "Save"} ${item.name}`}
        className="absolute right-1.5 top-1.5 z-10 grid h-10 w-10 place-items-center rounded-full text-[var(--sb-gold)] transition hover:bg-black/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
        onClick={() => onToggleFavorite(item.id)}
        type="button"
      >
        <AssetIcon size={22} src={icons.star} />
      </button>
      <button
        aria-label={`${item.name} ${item.ingredients.slice(0, 3).join(", ")}`}
        className="block w-full text-left"
        onClick={() => onViewDetails(item)}
        type="button"
      >
        <div className="relative h-[124px]">
          <Image
            alt=""
            className="object-cover"
            fetchPriority={eagerImage ? "high" : "auto"}
            fill
            loading={eagerImage ? "eager" : "lazy"}
            priority={eagerImage}
            sizes="250px"
            src={item.image.publicUrl}
          />
        </div>
        <div className="p-3.5">
          <h3 className="editorial-title line-clamp-2 min-h-[54px] text-[18px] leading-[27px] text-white">
            {item.name}
          </h3>
          <p className="mt-1.5 line-clamp-2 min-h-10 text-[14px] leading-5 text-white/72">
            {item.ingredients.slice(0, 3).join(", ")}
          </p>
          <p className="mt-3 text-[22px] text-[var(--sb-gold)]">
            {formatMoney(item.priceCents)}
          </p>
          {item.itemType === "drink" ? (
            <span className="mt-1 block text-[10px] uppercase tracking-[0.1em] text-white/42">
              {orderAction.badge}
            </span>
          ) : null}
        </div>
      </button>
      <TabletQuickOrderAction
        className="absolute bottom-2.5 right-2.5"
        item={item}
        onAddToCart={onAddToCart}
      />
    </article>
  );
}

export function TabletCompactMenuRow({
  eagerImage = false,
  item,
  onAddToCart,
  onViewDetails,
}: TabletCompactMenuRowProps) {
  const orderAction = getMenuItemOrderAction(item);

  return (
    <article className="grid grid-cols-[108px_minmax(0,1fr)_42px] items-center gap-3 rounded-[8px] border border-[var(--sb-border)] bg-black/34 p-1.5">
      <button
        aria-label={`View ${item.name} image`}
        className="relative h-[74px] overflow-hidden rounded-[6px]"
        onClick={() => onViewDetails(item)}
        type="button"
      >
        <Image
          alt=""
          className="object-cover"
          fetchPriority={eagerImage ? "high" : "auto"}
          fill
          loading={eagerImage ? "eager" : "lazy"}
          priority={eagerImage}
          sizes="120px"
          src={item.image.publicUrl}
        />
      </button>
      <button
        className="min-w-0 text-left"
        onClick={() => onViewDetails(item)}
        type="button"
      >
        <h3 className="line-clamp-2 min-h-10 text-[16px] leading-5 text-white">
          {item.name}
        </h3>
        <p className="mt-0.5 line-clamp-1 text-[13px] text-white/58">
          {item.description}
        </p>
        <p className="text-[16px] text-[var(--sb-gold)]">
          {formatMoney(item.priceCents)}
        </p>
        {item.itemType === "drink" ? (
          <span className="text-[10px] uppercase tracking-[0.1em] text-white/42">
            {orderAction.badge}
          </span>
        ) : null}
      </button>
      <TabletQuickOrderAction item={item} onAddToCart={onAddToCart} />
    </article>
  );
}

function TabletQuickOrderAction({
  className,
  item,
  onAddToCart,
}: {
  className?: string;
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}) {
  const orderAction = getMenuItemOrderAction(item);
  const elevatedReservation = Boolean(className?.includes("absolute"));
  const actionClassName = [
    elevatedReservation
      ? "grid h-10 w-[92px] place-items-center rounded-full"
      : "grid h-10 w-10 place-items-center rounded-full",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");
  const icon = orderAction.kind === "cart" ? icons.plus : orderAction.icon;

  if (orderAction.kind === "reservation") {
    return (
      <Link
        aria-label={`${orderAction.label} for ${item.name}`}
        className={actionClassName}
        href={orderAction.href || "/reservations"}
      >
        <span
          className={
            elevatedReservation
              ? "flex h-9 min-w-[88px] items-center justify-center gap-2 rounded-full border border-[var(--sb-gold)]/48 bg-[linear-gradient(180deg,rgba(215,168,79,0.18),rgba(7,8,8,0.86))] px-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] shadow-[0_0_20px_rgba(215,168,79,0.16)]"
              : "grid h-9 w-9 place-items-center rounded-full border border-[var(--sb-gold)]/48 bg-[linear-gradient(180deg,rgba(215,168,79,0.18),rgba(7,8,8,0.86))] shadow-[0_0_20px_rgba(215,168,79,0.16)]"
          }
        >
          <AssetIcon size={20} src={icon} />
          {elevatedReservation ? <span>{orderAction.shortLabel}</span> : null}
        </span>
      </Link>
    );
  }

  return (
    <button
      aria-label={`Add ${item.name} to cart`}
      className={actionClassName}
      onClick={() => onAddToCart(item)}
      type="button"
    >
      <span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--sb-border-strong)] bg-black/55">
        <AssetIcon size={21} src={icon} />
      </span>
    </button>
  );
}
