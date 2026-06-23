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
    <article className="grid min-h-[76px] grid-cols-[34px_minmax(0,1fr)_auto] items-center gap-3 rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025] px-3 py-3 min-[390px]:min-h-[78px] min-[390px]:grid-cols-[42px_1fr_auto] min-[390px]:gap-4 min-[390px]:px-4">
      <AssetIcon size={27} src={icon} />
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-[0.09em] text-[var(--sb-gold-soft)] min-[390px]:text-[12px] min-[390px]:tracking-[0.13em]">
          {label}
        </p>
        <p className="mt-1 break-words text-[15px] leading-5 text-white min-[390px]:text-[17px] min-[390px]:leading-6">
          {title}
        </p>
        {children ? (
          <div className="mt-1 text-[12px] leading-5 text-white/52 min-[390px]:text-[13px]">
            {children}
          </div>
        ) : null}
      </div>
      <button
        className="text-[11px] uppercase tracking-[0.06em] text-[var(--sb-gold-soft)] min-[390px]:text-[12px] min-[390px]:tracking-[0.08em]"
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
    <article className="grid grid-cols-[62px_30px_minmax(0,1fr)] items-center gap-2.5 py-3 first:pt-0 last:pb-0 min-[390px]:grid-cols-[78px_42px_1fr_auto] min-[390px]:gap-3">
      <div className="relative h-[58px] overflow-hidden rounded-[10px] border border-white/10 bg-black/30 min-[390px]:h-[66px]">
        <Image
          alt={item.menuItem.image.alt || item.menuItem.name}
          className="object-cover"
          fill
          sizes="78px"
          src={item.menuItem.image.publicUrl}
        />
      </div>
      <span className="grid h-7 w-7 place-items-center rounded-full border border-[var(--sb-border-strong)] text-[12px] text-[var(--sb-gold-soft)] min-[390px]:h-8 min-[390px]:w-8 min-[390px]:text-base">
        {item.quantity}
      </span>
      <div className="min-w-0">
        <h2 className="line-clamp-1 text-[15px] leading-5 min-[390px]:text-[17px] min-[390px]:leading-6">
          {item.menuItem.name}
        </h2>
        <p className="line-clamp-2 text-[12px] leading-[18px] text-white/50 min-[390px]:text-[13px] min-[390px]:leading-5">
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
      <p className="col-start-3 justify-self-start font-mono text-[13px] text-[var(--sb-gold-soft)] min-[390px]:col-start-auto min-[390px]:justify-self-auto min-[390px]:text-[16px]">
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
      <div className="border-r border-white/10 p-3 min-[390px]:p-4">
        <p className="text-[12px] text-white/68 min-[390px]:text-[13px]">
          Promo Code
        </p>
        <p
          className={classNames(
            "mt-1 break-words text-[12px] min-[390px]:text-[13px]",
            checkout.appliedPromo ? "text-[var(--sb-wasabi)]" : "text-white/42",
          )}
        >
          {checkout.appliedPromo?.code || "None applied"}
        </p>
      </div>
      <div className="p-3 text-right min-[390px]:p-4">
        <p className="text-[12px] text-white/68 min-[390px]:text-[13px]">Tip</p>
        <p className="mt-1 text-[12px] text-[var(--sb-gold-soft)] min-[390px]:text-[13px]">
          {checkout.tipPercent}% · {formatMoney(checkout.reviewTotals.tipCents)}
        </p>
      </div>
    </section>
  );
}
