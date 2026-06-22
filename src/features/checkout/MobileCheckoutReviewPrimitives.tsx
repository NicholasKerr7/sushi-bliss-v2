import Image from "next/image";
import type { ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { calculateCartLineSubtotal } from "@/lib/cart";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type { CartLineItem } from "@/types/order";

import type { MobileCheckoutState } from "./mobileCheckoutTypes";

export function ReviewInfoCard({
  children,
  icon,
  label,
  onEdit,
  title,
}: {
  children?: ReactNode;
  icon?: string;
  label: string;
  onEdit: () => void;
  title: string;
}) {
  return (
    <article className="grid min-h-[78px] grid-cols-[42px_1fr_auto] items-center gap-4 rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025] px-4 py-3">
      <AssetIcon size={31} src={icon} />
      <div>
        <p className="text-[12px] uppercase tracking-[0.13em] text-[var(--sb-gold-soft)]">
          {label}
        </p>
        <p className="mt-1 text-[17px] leading-6 text-white">{title}</p>
        {children ? (
          <div className="mt-1 text-[13px] leading-5 text-white/52">
            {children}
          </div>
        ) : null}
      </div>
      <button
        className="text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
        onClick={onEdit}
        type="button"
      >
        Edit
      </button>
    </article>
  );
}

export function ReviewLine({
  item,
  onRemoveItem,
}: {
  item: CartLineItem;
  onRemoveItem: (id: string) => void;
}) {
  return (
    <article className="grid grid-cols-[78px_42px_1fr_auto] items-center gap-3 py-3 first:pt-0 last:pb-0">
      <div className="relative h-[66px] overflow-hidden rounded-[10px] border border-white/10 bg-black/30">
        <Image
          alt={item.menuItem.image.alt || item.menuItem.name}
          className="object-cover"
          fill
          sizes="78px"
          src={item.menuItem.image.publicUrl}
        />
      </div>
      <span className="grid h-8 w-8 place-items-center rounded-full border border-[var(--sb-border-strong)] text-[var(--sb-gold-soft)]">
        {item.quantity}
      </span>
      <div className="min-w-0">
        <h2 className="text-[17px] leading-6">{item.menuItem.name}</h2>
        <p className="line-clamp-2 text-[13px] leading-5 text-white/50">
          {item.menuItem.description}
        </p>
        <button
          className="mt-1 text-[12px] text-[var(--sb-red-bright)]"
          onClick={() => onRemoveItem(item.id)}
          type="button"
        >
          Remove
        </button>
      </div>
      <p className="font-mono text-[16px] text-[var(--sb-gold-soft)]">
        {formatMoney(calculateCartLineSubtotal(item))}
      </p>
    </article>
  );
}

export function ReviewPromoTip({
  checkout,
}: {
  checkout: MobileCheckoutState;
}) {
  return (
    <section className="mt-4 grid grid-cols-2 overflow-hidden rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025]">
      <div className="border-r border-white/10 p-4">
        <p className="text-[13px] text-white/68">Promo Code</p>
        <p
          className={classNames(
            "mt-1 text-[13px]",
            checkout.appliedPromo ? "text-[var(--sb-wasabi)]" : "text-white/42",
          )}
        >
          {checkout.appliedPromo?.code || "None applied"}
        </p>
      </div>
      <div className="p-4 text-right">
        <p className="text-[13px] text-white/68">Tip</p>
        <p className="mt-1 text-[13px] text-[var(--sb-gold-soft)]">
          {checkout.tipPercent}% · {formatMoney(checkout.reviewTotals.tipCents)}
        </p>
      </div>
    </section>
  );
}
