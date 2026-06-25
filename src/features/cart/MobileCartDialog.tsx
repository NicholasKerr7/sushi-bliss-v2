"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { brand, icons } from "@/features/home/homeDashboardData";
import { useScrollLock } from "@/hooks/useScrollLock";
import { calculateCartLineSubtotal } from "@/lib/cart";
import { getTabletPresentationImage } from "@/lib/assets";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type { MenuItem } from "@/types/menu";
import type { CartLineItem, OrderTotals } from "@/types/order";

interface MobileCartDialogProps {
  itemCount: number;
  items: CartLineItem[];
  onAddSuggestedItem: () => void;
  onClearCart: () => void;
  onClose: () => void;
  onOpenCheckout: () => void;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  open: boolean;
  suggestedItem?: MenuItem;
  totals: OrderTotals;
}

/** Full-screen mobile cart view modeled after the reference cart screen. */
export function MobileCartDialog({
  itemCount,
  items,
  onAddSuggestedItem,
  onClearCart,
  onClose,
  onOpenCheckout,
  onRemove,
  onUpdateQuantity,
  open,
  suggestedItem,
  totals,
}: MobileCartDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const [noteOpen, setNoteOpen] = useState(false);
  const [orderNote, setOrderNote] = useState("");
  const isEmpty = items.length === 0;

  useScrollLock(open);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previouslyFocused = document.activeElement;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div
      aria-label="Cart"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black text-white md:hidden"
      ref={dialogRef}
      role="dialog"
      tabIndex={-1}
    >
      <div className="smooth-scroll-area relative h-dvh overflow-x-hidden overflow-y-auto px-4 pb-[calc(8.75rem+var(--sb-safe-bottom))] pt-4 min-[390px]:px-5">
        <div className="pointer-events-none fixed inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(202,164,93,0.08),transparent_22%),radial-gradient(circle_at_100%_28%,rgba(172,20,19,0.12),transparent_26%),linear-gradient(180deg,#040404_0%,#080807_42%,#030303_100%)]" />
        </div>

        <div className="mobile-frame relative z-10">
          <MobileCartHeader
            itemCount={itemCount}
            onClose={onClose}
            onClearCart={onClearCart}
            showClear={!isEmpty}
          />

          <main className="mt-4">
            <p className="editorial-title text-[29px] leading-none tracking-[0.12em] min-[390px]:text-[32px] min-[390px]:tracking-[0.16em]">
              Your <span className="text-[var(--sb-red-bright)]">Cart</span>
            </p>
            <p className="mt-2 text-[14px] leading-5 text-[var(--sb-gold)] min-[390px]:text-[16px]">
              Review your items and proceed to checkout.
            </p>

            {isEmpty ? (
              <MobileEmptyCart onClose={onClose} />
            ) : (
              <>
                <section
                  aria-label="Cart items"
                  className="mt-2.5 grid gap-2.5"
                >
                  {items.map((item) => (
                    <MobileCartLine
                      item={item}
                      key={item.id}
                      onRemove={onRemove}
                      onUpdateQuantity={onUpdateQuantity}
                    />
                  ))}
                </section>

                <MobileCartActionPanels
                  noteOpen={noteOpen}
                  orderNote={orderNote}
                  onNoteChange={setOrderNote}
                  onToggleNote={() => setNoteOpen((current) => !current)}
                />

                <MobileCartSummary itemCount={itemCount} totals={totals} />

                {suggestedItem ? (
                  <MobileSuggestedItem
                    item={suggestedItem}
                    onAddSuggestedItem={onAddSuggestedItem}
                  />
                ) : null}

                <SecureCartNote />
              </>
            )}
          </main>
        </div>
      </div>

      {!isEmpty ? (
        <MobileCartCheckoutDock
          itemCount={itemCount}
          onOpenCheckout={onOpenCheckout}
          totalCents={totals.totalCents}
        />
      ) : null}
    </div>
  );
}

function MobileCartCheckoutDock({
  itemCount,
  onOpenCheckout,
  totalCents,
}: {
  itemCount: number;
  onOpenCheckout: () => void;
  totalCents: number;
}) {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--sb-border)] bg-[linear-gradient(180deg,rgba(9,8,7,0.88),rgba(0,0,0,0.98))] px-3 pb-[calc(0.72rem+var(--sb-safe-bottom))] pt-3 shadow-[0_-22px_54px_rgba(0,0,0,0.66)] backdrop-blur-xl">
      <div className="mobile-frame">
        <div className="mb-2 flex min-w-0 items-center justify-between gap-3 px-1 text-[11px] uppercase tracking-[0.06em] text-white/50">
          <span className="min-w-0 truncate">
            {itemCount} {itemCount === 1 ? "item" : "items"} ready
          </span>
          <span className="shrink-0 font-mono text-[13px] tracking-normal text-[var(--sb-gold-soft)]">
            {formatMoney(totalCents)}
          </span>
        </div>
        <button
          aria-label="Checkout"
          className="red-glow-button grid h-[52px] w-full place-items-center rounded-[13px] px-3 text-[12px] uppercase tracking-[0.06em] min-[390px]:h-[56px] min-[390px]:text-[13px] min-[390px]:tracking-[0.07em]"
          onClick={onOpenCheckout}
          type="button"
        >
          Proceed To Checkout
        </button>
      </div>
    </footer>
  );
}

function SecureCartNote() {
  return (
    <p className="mt-3 text-center text-[11px] leading-5 text-white/42">
      Taxes and fulfillment timing are finalized during checkout.
    </p>
  );
}

function MobileCartHeader({
  itemCount,
  onClearCart,
  onClose,
  showClear,
}: {
  itemCount: number;
  onClearCart: () => void;
  onClose: () => void;
  showClear: boolean;
}) {
  return (
    <header className="flex items-center justify-between gap-3 min-[390px]:gap-4">
      <button
        aria-label="Back to menu"
        className="flex min-w-0 items-center gap-2.5 rounded-[14px] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)] min-[390px]:gap-3"
        onClick={onClose}
        type="button"
      >
        <AssetIcon
          alt=""
          className="h-[40px] w-[40px] rounded-full min-[390px]:h-[46px] min-[390px]:w-[46px]"
          loading="eager"
          size={46}
          src={brand.assets.floralEmblem.publicUrl}
        />
        <span className="editorial-title text-[13px] leading-[0.95] tracking-[0.24em] min-[390px]:text-[16px] min-[390px]:tracking-[0.34em]">
          Sushi
          <br />
          Bliss
        </span>
      </button>

      <div className="flex items-center gap-2">
        {showClear ? (
          <button
            className="h-[40px] rounded-full border border-[var(--sb-border)] bg-black/34 px-3 text-[10px] uppercase tracking-[0.06em] text-white/64 min-[390px]:h-[44px] min-[390px]:px-4 min-[390px]:text-[11px] min-[390px]:tracking-[0.08em]"
            onClick={onClearCart}
            type="button"
          >
            Clear
          </button>
        ) : null}
        <div className="relative grid h-[46px] w-[46px] place-items-center rounded-full border border-[var(--sb-border)] bg-black/34 min-[390px]:h-[54px] min-[390px]:w-[54px]">
          <AssetIcon loading="eager" size={25} src={icons.cart} />
          {itemCount > 0 ? (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[10px] font-bold">
              {itemCount}
            </span>
          ) : null}
        </div>
      </div>
    </header>
  );
}

function MobileEmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <section className="mt-8 rounded-[18px] border border-[var(--sb-border)] bg-black/44 p-6 text-center">
      <AssetIcon className="mx-auto" size={56} src={icons.bag} />
      <h2 className="editorial-title mt-5 text-[24px]">Your cart is empty</h2>
      <p className="mt-3 text-[15px] leading-6 text-white/60">
        Add a chef selection from the menu to start your Sushi Bliss order.
      </p>
      <button
        className="red-glow-button mt-6 min-h-[58px] w-full rounded-[14px] text-[15px] uppercase tracking-[0.08em]"
        onClick={onClose}
        type="button"
      >
        Browse Menu
      </button>
    </section>
  );
}

function MobileCartLine({
  item,
  onRemove,
  onUpdateQuantity,
}: {
  item: CartLineItem;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}) {
  const lineSubtotalCents = calculateCartLineSubtotal(item);

  return (
    <article className="grid min-h-[86px] grid-cols-[82px_minmax(0,1fr)] gap-2.5 rounded-[15px] border border-[var(--sb-border)] bg-black/42 p-2 min-[390px]:min-h-[88px] min-[390px]:grid-cols-[98px_minmax(0,1fr)] min-[390px]:gap-3">
      <div className="relative h-[70px] overflow-hidden rounded-[10px] border border-white/10 bg-black/40 min-[390px]:h-[72px]">
        <Image
          alt={item.menuItem.image.alt || item.menuItem.name}
          className="object-cover"
          fill
          sizes="98px"
          src={getTabletPresentationImage(item.menuItem)}
        />
      </div>

      <div className="min-w-0">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2 min-[390px]:gap-3">
          <div className="min-w-0">
            <h2 className="editorial-title line-clamp-1 text-[14px] leading-5 min-[390px]:text-[16px]">
              {item.menuItem.name}
            </h2>
            <p className="mt-0.5 line-clamp-1 text-[11px] leading-4 text-white/62 min-[390px]:text-[12px]">
              {item.menuItem.description}
            </p>
          </div>
          <p className="shrink-0 whitespace-nowrap text-[14px] text-[var(--sb-gold)] min-[390px]:text-[16px]">
            {formatMoney(lineSubtotalCents)}
          </p>
        </div>

        <div className="mt-1.5 flex items-center justify-between gap-2">
          <MobileCartQuantity
            onChange={(quantity) => onUpdateQuantity(item.id, quantity)}
            value={item.quantity}
          />
          <button
            aria-label={`Remove ${item.menuItem.name}`}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-[var(--sb-red-bright)] transition hover:bg-[var(--sb-red)]/14 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-red-bright)] min-[390px]:h-10 min-[390px]:w-10"
            onClick={() => onRemove(item.id)}
            type="button"
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4 min-[390px]:h-5 min-[390px]:w-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                d="M7 8h10m-9 0 .6 11h6.8L16 8M10 11v5m4-5v5M9.5 5.5h5L15.5 8h-7z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.7"
              />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

function MobileCartQuantity({
  onChange,
  value,
}: {
  onChange: (value: number) => void;
  value: number;
}) {
  return (
    <div className="flex min-h-8 shrink-0 items-center gap-1.5 text-[15px] min-[390px]:min-h-10 min-[390px]:gap-2 min-[390px]:text-[17px]">
      <button
        aria-label="Decrease quantity"
        className="grid h-8 w-8 place-items-center rounded-full border border-[var(--sb-border)] text-[var(--sb-gold)] disabled:opacity-35 min-[390px]:h-10 min-[390px]:w-10"
        disabled={value <= 1}
        onClick={() => onChange(Math.max(1, value - 1))}
        type="button"
      >
        -
      </button>
      <output
        aria-label="Quantity"
        className="grid min-w-5 place-items-center min-[390px]:min-w-6"
      >
        {value}
      </output>
      <button
        aria-label="Increase quantity"
        className="grid h-8 w-8 place-items-center rounded-full border border-[var(--sb-border)] text-[var(--sb-gold)] min-[390px]:h-10 min-[390px]:w-10"
        onClick={() => onChange(Math.min(99, value + 1))}
        type="button"
      >
        +
      </button>
    </div>
  );
}

function MobileCartActionPanels({
  noteOpen,
  orderNote,
  onNoteChange,
  onToggleNote,
}: {
  noteOpen: boolean;
  orderNote: string;
  onNoteChange: (value: string) => void;
  onToggleNote: () => void;
}) {
  return (
    <section className="mt-2 grid gap-2" aria-label="Cart options">
      <div className="rounded-[14px] border border-[var(--sb-border)] bg-black/36">
        <button
          aria-expanded={noteOpen}
          className="grid min-h-11 w-full grid-cols-[26px_minmax(0,1fr)_24px] items-center gap-2.5 px-3 py-1 text-left min-[390px]:grid-cols-[28px_1fr_auto] min-[390px]:gap-3 min-[390px]:px-4"
          onClick={onToggleNote}
          type="button"
        >
          <AssetIcon size={20} src={icons.settings} />
          <span className="text-[13px] leading-5 text-white/72 min-[390px]:text-[14px]">
            {orderNote ? "Edit order note" : "Add a note for your order"}
          </span>
          <span aria-hidden="true" className="text-[var(--sb-gold)]">
            <ChevronIcon direction="right" size={18} />
          </span>
        </button>
        {noteOpen ? (
          <div className="border-t border-white/10 p-4">
            <label className="sr-only" htmlFor="mobile-cart-order-note">
              Order note
            </label>
            <textarea
              className="min-h-[90px] w-full resize-none rounded-[12px] border border-white/10 bg-black/40 px-4 py-3 text-[14px] text-white outline-none placeholder:text-white/36 focus:border-[var(--sb-gold)]"
              id="mobile-cart-order-note"
              maxLength={160}
              onChange={(event) => onNoteChange(event.target.value)}
              placeholder="E.g. extra ginger, birthday note, or arrival instructions."
              value={orderNote}
            />
            <p className="mt-2 text-right text-[12px] text-white/42">
              {orderNote.length}/160
            </p>
          </div>
        ) : null}
      </div>

      <button
        aria-label="Promo code entry is unavailable in cart"
        className="grid min-h-11 w-full grid-cols-[26px_minmax(0,1fr)_24px] items-center gap-2.5 rounded-[14px] border border-[var(--sb-border)] bg-black/36 px-3 py-1 text-left opacity-70 min-[390px]:grid-cols-[28px_1fr_auto] min-[390px]:gap-3 min-[390px]:px-4"
        disabled
        title="Promo codes are entered during checkout."
        type="button"
      >
        <AssetIcon size={20} src={icons.star} />
        <span className="text-[13px] text-white/72 min-[390px]:text-[14px]">
          Add a promo code
        </span>
        <span aria-hidden="true" className="text-[var(--sb-gold)]">
          <ChevronIcon direction="right" size={18} />
        </span>
      </button>
    </section>
  );
}

function MobileCartSummary({
  itemCount,
  totals,
}: {
  itemCount: number;
  totals: OrderTotals;
}) {
  return (
    <section className="mt-2 rounded-[15px] border border-[var(--sb-border)] bg-black/42 p-2.5">
      <div className="space-y-0.5 text-[13px]">
        <SummaryLine
          label={`Subtotal (${itemCount} ${itemCount === 1 ? "item" : "items"})`}
          value={formatMoney(totals.subtotalCents)}
        />
        <SummaryLine
          label="Service fee"
          value={formatMoney(totals.serviceFeeCents)}
        />
        <SummaryLine
          label="Estimated tax"
          value={formatMoney(totals.taxCents)}
        />
      </div>

      <div className="mt-1 border-t border-white/10 pt-1">
        <SummaryLine
          label="Total"
          large
          value={formatMoney(totals.totalCents)}
        />
      </div>
    </section>
  );
}

function SummaryLine({
  label,
  large = false,
  value,
}: {
  label: string;
  large?: boolean;
  value: string;
}) {
  return (
    <p
      className={classNames(
        "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3",
        large
          ? "editorial-title text-[20px] text-[var(--sb-gold)] min-[390px]:text-[24px]"
          : "",
      )}
    >
      <span
        className={classNames(
          "min-w-0 break-words",
          large ? "text-white" : "text-white/68",
        )}
      >
        {label}
      </span>
      <span
        className={classNames(
          "shrink-0 text-right",
          large ? "" : "text-white/86",
        )}
      >
        {value}
      </span>
    </p>
  );
}

function MobileSuggestedItem({
  item,
  onAddSuggestedItem,
}: {
  item: MenuItem;
  onAddSuggestedItem: () => void;
}) {
  return (
    <section className="mt-3 grid grid-cols-[74px_minmax(0,1fr)] gap-2.5 overflow-hidden rounded-[15px] border border-[var(--sb-border)] bg-black/42 p-2.5 min-[390px]:grid-cols-[84px_1fr] min-[390px]:gap-3">
      <div className="relative min-h-[78px] overflow-hidden rounded-[10px] border border-white/10 min-[390px]:min-h-[84px]">
        <Image
          alt={item.image.alt || item.name}
          className="object-cover"
          fill
          sizes="84px"
          src={getTabletPresentationImage(item)}
        />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--sb-gold)]">
          Complete your meal
        </p>
        <h2 className="editorial-title mt-0.5 line-clamp-1 text-[16px] leading-5 min-[390px]:text-[18px]">
          Add {item.name}
        </h2>
        <p className="mt-0.5 line-clamp-1 text-[12px] leading-4 text-white/62">
          {item.description}
        </p>
        <div className="mt-1.5 flex items-center justify-between gap-3">
          <p className="text-[16px] text-[var(--sb-gold)]">
            {formatMoney(item.priceCents)}
          </p>
          <button
            aria-label={`Add ${item.name} to cart`}
            className="h-9 rounded-full border border-[var(--sb-gold)]/55 px-3 text-[10px] uppercase tracking-[0.07em] text-[var(--sb-gold)] min-[390px]:h-10 min-[390px]:px-4 min-[390px]:text-[11px] min-[390px]:tracking-[0.08em]"
            onClick={onAddSuggestedItem}
            type="button"
          >
            Add
          </button>
        </div>
      </div>
    </section>
  );
}
