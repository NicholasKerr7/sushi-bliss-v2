import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import {
  calculateCartLineSubtotal,
  calculateCartLineUnitPrice,
} from "@/lib/cart";
import { formatMoney } from "@/lib/money";
import type { CartLineItem, OrderTotals } from "@/types/order";

interface DesktopCartPanelProps {
  ctaLabel?: string;
  disabled?: boolean;
  items: CartLineItem[];
  onClearCart?: () => void;
  onCheckout?: () => void;
  onRemove?: (id: string) => void;
  onUpdateQuantity?: (id: string, quantity: number) => void;
  totals: OrderTotals;
}

export function DesktopCartPanel({
  ctaLabel = "View cart & checkout",
  disabled = false,
  items,
  onClearCart,
  onCheckout,
  onRemove,
  onUpdateQuantity,
  totals,
}: DesktopCartPanelProps) {
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <aside className="rounded-[18px] border border-[var(--sb-border)] bg-[#070909]/92 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.48)]">
      <div className="flex items-center justify-between gap-4">
        <h2 className="editorial-title text-[21px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
          Your Cart
        </h2>
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-[var(--sb-gold)]/36 px-3 py-1 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
          {onClearCart ? (
            <button
              className="text-[12px] text-[var(--sb-red-bright)] disabled:cursor-not-allowed disabled:opacity-40"
              disabled={items.length === 0}
              onClick={onClearCart}
              type="button"
            >
              Clear cart
            </button>
          ) : null}
        </div>
      </div>

      {items.length > 0 ? (
        <div className="mt-5 grid gap-4">
          {items.map((item) => (
            <DesktopCartLine
              item={item}
              key={item.id}
              onRemove={onRemove}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-[14px] border border-dashed border-white/14 bg-white/[0.025] p-5 text-center">
          <AssetIcon
            className="mx-auto opacity-80"
            size={42}
            src="/assets/icons/sushi-menu-icon.png"
          />
          <p className="mt-3 text-[15px] font-semibold text-white">
            Your cart is empty
          </p>
          <p className="mt-2 text-[13px] leading-5 text-white/52">
            Add a sushi selection to start checkout.
          </p>
        </div>
      )}

      <div className="mt-5 space-y-2 border-t border-white/10 pt-4 text-[14px]">
        <TotalRow label="Subtotal" value={formatMoney(totals.subtotalCents)} />
        <TotalRow
          label="Service Fee"
          value={formatMoney(totals.serviceFeeCents)}
        />
        <TotalRow label="Tax & Fees" value={formatMoney(totals.taxCents)} />
        {totals.discountCents > 0 ? (
          <TotalRow
            label="Discount"
            value={`-${formatMoney(totals.discountCents)}`}
          />
        ) : null}
        {totals.tipCents > 0 ? (
          <TotalRow label="Tip" value={formatMoney(totals.tipCents)} />
        ) : null}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="editorial-title text-[19px] uppercase text-white/86">
          Total
        </span>
        <span className="font-mono text-[25px] text-[var(--sb-gold-soft)]">
          {formatMoney(totals.totalCents)}
        </span>
      </div>

      <button
        className="red-glow-button mt-5 h-[64px] w-full rounded-[12px] text-[15px] uppercase tracking-[0.08em] disabled:cursor-not-allowed disabled:opacity-45"
        disabled={disabled || items.length === 0}
        onClick={onCheckout}
        type="button"
      >
        {ctaLabel}
        <span className="ml-4" aria-hidden="true">
          &gt;
        </span>
      </button>

      <p className="mt-4 flex items-center justify-center gap-2 text-[12px] text-white/42">
        <AssetIcon size={15} src="/assets/icons/chef-crest-icon.png" />
        Secure checkout powered by SSL encryption
      </p>
    </aside>
  );
}

function DesktopCartLine({
  item,
  onRemove,
  onUpdateQuantity,
}: {
  item: CartLineItem;
  onRemove?: (id: string) => void;
  onUpdateQuantity?: (id: string, quantity: number) => void;
}) {
  const unitPrice = calculateCartLineUnitPrice(item.menuItem, item.addOns);

  return (
    <article className="grid grid-cols-[88px_minmax(0,1fr)_74px] gap-4 border-b border-white/10 pb-4 last:border-b-0 last:pb-0">
      <div className="relative h-[72px] overflow-hidden rounded-[8px] border border-white/10 bg-black/40">
        <Image
          alt=""
          className="object-cover"
          fill
          sizes="88px"
          src={item.menuItem.image.publicUrl}
        />
      </div>
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-semibold text-white">
              {item.menuItem.name}
            </h3>
            <p className="mt-1 line-clamp-2 text-[12px] leading-5 text-white/50">
              {item.menuItem.ingredients.slice(0, 3).join(", ")}
            </p>
            <p className="mt-1 font-mono text-[14px] text-[var(--sb-gold-soft)]">
              {formatMoney(unitPrice)}
            </p>
          </div>
          {onRemove ? (
            <button
              aria-label={`Remove ${item.menuItem.name}`}
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/18 text-white/58"
              onClick={() => onRemove(item.id)}
              type="button"
            >
              x
            </button>
          ) : null}
        </div>
        {onUpdateQuantity ? (
          <div className="mt-2 inline-grid h-8 grid-cols-[32px_36px_32px] overflow-hidden rounded-[10px] border border-[var(--sb-gold)]/22">
            <button
              aria-label={`Decrease ${item.menuItem.name} quantity`}
              className="text-[var(--sb-gold-soft)] disabled:opacity-35"
              disabled={item.quantity <= 1}
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              type="button"
            >
              -
            </button>
            <span className="grid place-items-center border-x border-white/10 font-mono text-[13px] text-white">
              {item.quantity}
            </span>
            <button
              aria-label={`Increase ${item.menuItem.name} quantity`}
              className="text-[var(--sb-gold-soft)]"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              type="button"
            >
              +
            </button>
          </div>
        ) : (
          <p className="mt-2 text-[13px] text-white/56">x {item.quantity}</p>
        )}
      </div>
      <p className="self-center text-right font-mono text-[14px] text-white">
        {formatMoney(calculateCartLineSubtotal(item))}
      </p>
    </article>
  );
}

function TotalRow({ label, value }: { label: string; value: string }) {
  return (
    <p className="flex items-center justify-between gap-4 text-white/72">
      <span>{label}</span>
      <span className="font-mono text-white">{value}</span>
    </p>
  );
}
