import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
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
  showCta?: boolean;
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
  showCta = true,
  totals,
}: DesktopCartPanelProps) {
  const itemCount = items.length;

  return (
    <aside className="rounded-[18px] border border-[var(--sb-border)] bg-[#070909]/92 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.48)] min-[1500px]:mt-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="editorial-title text-[21px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
          Your Cart
        </h2>
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-[var(--sb-gold)]/36 px-3 py-1 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </span>
          {onClearCart && items.length > 0 ? (
            <button
              className="inline-flex min-h-10 items-center rounded-full px-3 text-[12px] text-[var(--sb-red-bright)] transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold disabled:cursor-not-allowed disabled:opacity-40 min-[1500px]:hidden"
              onClick={onClearCart}
              type="button"
            >
              Clear cart
            </button>
          ) : null}
        </div>
      </div>

      {items.length > 0 ? (
        <div className="mt-4 grid min-[1500px]:mt-0">
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

      {items.length > 0 ? (
        <label className="mt-4 grid h-9 grid-cols-[28px_1fr] items-center rounded-[9px] border border-white/10 bg-black/28 px-3 text-[12px] text-white/50 min-[1500px]:mt-3">
          <AssetIcon size={18} src="/assets/icons/gift-icon.png" />
          <span className="sr-only">Add a note</span>
          <input
            className="min-w-0 bg-transparent text-white outline-none placeholder:text-white/44"
            placeholder="Add a note (optional)"
            type="text"
          />
        </label>
      ) : null}

      <div className="mt-4 space-y-2 border-t border-white/10 pt-4 text-[14px] min-[1500px]:mt-3 min-[1500px]:pt-3">
        <TotalRow label="Subtotal" value={formatMoney(totals.subtotalCents)} />
        <TotalRow
          label="Delivery Fee"
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

      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 min-[1500px]:mt-3 min-[1500px]:pt-3">
        <span className="editorial-title text-[19px] uppercase text-white/86">
          Total
        </span>
        <span className="font-mono text-[25px] text-[var(--sb-gold-soft)]">
          {formatMoney(totals.totalCents)}
        </span>
      </div>

      {showCta ? (
        <button
          className="red-glow-button mt-5 h-[64px] w-full rounded-[12px] text-[15px] uppercase tracking-[0.08em] disabled:cursor-not-allowed disabled:opacity-45 min-[1500px]:mt-4 min-[1500px]:h-[56px]"
          disabled={disabled || items.length === 0}
          onClick={onCheckout}
          type="button"
        >
          {items.length === 0 ? "Select items to checkout" : ctaLabel}
          <span className="ml-4" aria-hidden="true">
            <ChevronIcon direction="right" size={18} />
          </span>
        </button>
      ) : null}

      {items.length > 0 ? (
        <div className="mt-4 hidden rounded-[12px] border border-[var(--sb-border)] bg-black/28 p-4 min-[1500px]:grid min-[1500px]:grid-cols-[1fr_auto] min-[1500px]:items-center min-[1500px]:gap-4">
          <div className="flex items-start gap-3">
            <AssetIcon size={22} src="/assets/icons/gold-alert-icon.png" />
            <span>
              <span className="block text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                Est. delivery
              </span>
              <span className="mt-2 block text-[12px] text-white/52">
                123 Kai Street, Tokyo
              </span>
            </span>
          </div>
          <div className="text-right">
            <p className="text-[13px] uppercase text-[var(--sb-gold-soft)]">
              30-45 min
            </p>
            <button
              className="mt-2 text-[12px] text-[var(--sb-red-bright)] underline-offset-2 hover:underline disabled:cursor-not-allowed disabled:opacity-45"
              disabled={disabled}
              onClick={onCheckout}
              type="button"
            >
              Change
            </button>
          </div>
        </div>
      ) : null}

      <p className="mt-4 flex items-center justify-center gap-2 text-[12px] text-white/42 min-[1500px]:hidden">
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
    <article className="relative grid min-h-[114px] grid-cols-[64px_minmax(0,1fr)_72px_52px] items-center gap-2 border-b border-white/10 py-3 last:border-b-0 min-[1500px]:min-h-[72px] min-[1500px]:py-1">
      <div className="relative h-[68px] overflow-hidden rounded-[8px] border border-white/10 bg-black/40 min-[1500px]:h-14">
        <Image
          alt=""
          className="object-cover"
          fetchPriority="high"
          fill
          loading="eager"
          sizes="64px"
          src={item.menuItem.image.publicUrl}
        />
      </div>
      <div className="min-w-0">
        <h3 className="truncate text-[14px] font-semibold text-white">
          {item.menuItem.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-[12px] leading-4 text-white/50">
          {item.menuItem.ingredients.slice(0, 3).join(", ")}
        </p>
        <p className="mt-1 font-mono text-[14px] text-[var(--sb-gold-soft)]">
          {formatMoney(unitPrice)}
        </p>
      </div>
      {onUpdateQuantity ? (
        <div className="grid h-8 grid-cols-[22px_28px_22px] overflow-hidden rounded-[10px] border border-[var(--sb-gold)]/22">
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
        <p className="text-center text-[13px] text-white/56">
          x {item.quantity}
        </p>
      )}
      <p className="self-center text-right font-mono text-[13px] text-white">
        {formatMoney(calculateCartLineSubtotal(item))}
      </p>
      {onRemove ? (
        <button
          aria-label={`Remove ${item.menuItem.name}`}
          className="absolute right-0 top-4 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/18 text-white/58 transition hover:border-[var(--sb-red-bright)]/60 hover:text-[var(--sb-red-bright)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
          onClick={() => onRemove(item.id)}
          type="button"
        >
          <ChevronIcon direction="x" size={15} />
        </button>
      ) : null}
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
