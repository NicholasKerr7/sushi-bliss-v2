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
    <aside className="overflow-hidden rounded-[20px] border border-[var(--sb-border)] bg-[radial-gradient(circle_at_18%_0%,rgba(239,47,37,0.16),transparent_30%),linear-gradient(145deg,rgba(255,255,255,0.055),rgba(7,9,9,0.94)_42%,rgba(4,5,5,0.98))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_28px_90px_rgba(0,0,0,0.5)] min-[1500px]:mt-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42">
            Order tray
          </p>
          <h2 className="editorial-title mt-1 text-[21px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            Your Cart
          </h2>
        </div>
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
        <div className="smooth-scroll-area mt-4 grid max-h-[430px] gap-3 overflow-y-auto pr-1 min-[1500px]:max-h-[320px]">
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
        <div className="mt-5 rounded-[16px] border border-dashed border-[var(--sb-gold)]/24 bg-black/24 p-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
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
        <label className="mt-4 grid h-11 grid-cols-[28px_1fr] items-center rounded-[12px] border border-white/10 bg-black/28 px-3 text-[12px] text-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] min-[1500px]:mt-3">
          <AssetIcon size={18} src="/assets/icons/gift-icon.png" />
          <span className="sr-only">Add a note</span>
          <input
            className="min-w-0 bg-transparent text-white outline-none placeholder:text-white/44"
            placeholder="Add a note (optional)"
            type="text"
          />
        </label>
      ) : null}

      <div className="mt-4 space-y-2 rounded-[16px] border border-white/10 bg-black/24 p-4 text-[14px] shadow-[inset_0_1px_0_rgba(255,255,255,0.045)] min-[1500px]:mt-3">
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

        <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
          <span className="editorial-title text-[19px] uppercase text-white/86">
            Total
          </span>
          <span className="font-mono text-[25px] text-[var(--sb-gold-soft)]">
            {formatMoney(totals.totalCents)}
          </span>
        </div>
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
    <article className="rounded-[16px] border border-white/10 bg-black/26 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.045)]">
      <div className="grid grid-cols-[68px_minmax(0,1fr)] gap-3">
        <div className="relative h-[72px] overflow-hidden rounded-[10px] border border-white/10 bg-black/40">
          <Image
            alt=""
            className="object-cover"
            fetchPriority="high"
            fill
            loading="eager"
            sizes="68px"
            src={item.menuItem.image.publicUrl}
          />
        </div>
        <div className="min-w-0">
          <div className="flex items-start justify-between gap-3">
            <h3 className="line-clamp-2 text-[14px] font-semibold leading-5 text-white">
              {item.menuItem.name}
            </h3>
            <p className="shrink-0 font-mono text-[13px] text-[var(--sb-gold-soft)]">
              {formatMoney(unitPrice)}
            </p>
          </div>
          <p className="mt-1 line-clamp-2 text-[12px] leading-4 text-white/52">
            {item.menuItem.ingredients.slice(0, 3).join(", ")}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        {onUpdateQuantity ? (
          <div className="grid h-9 grid-cols-[28px_34px_28px] overflow-hidden rounded-[11px] border border-[var(--sb-gold)]/24 bg-black/22">
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
          <p className="font-mono text-[13px] text-white/56">
            Qty {item.quantity}
          </p>
        )}
        <div className="flex min-w-0 items-center gap-3">
          {onRemove ? (
            <button
              aria-label={`Remove ${item.menuItem.name}`}
              className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/44 transition hover:text-[var(--sb-red-bright)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
              onClick={() => onRemove(item.id)}
              type="button"
            >
              Remove
            </button>
          ) : null}
          <p className="font-mono text-[14px] text-white">
            {formatMoney(calculateCartLineSubtotal(item))}
          </p>
        </div>
      </div>
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
