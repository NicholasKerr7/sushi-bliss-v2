"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { brand, icons } from "@/features/home/visualHomeData";
import {
  calculateCartLineSubtotal,
  calculateCartLineUnitPrice,
} from "@/lib/cart";
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
  const pointsEarned = Math.max(0, Math.floor(totals.totalCents / 100));

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

    document.body.classList.add("overflow-hidden");
    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.body.classList.remove("overflow-hidden");
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
      <div className="relative h-dvh overflow-y-auto px-5 pb-[126px] pt-6">
        <div className="pointer-events-none fixed inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(202,164,93,0.08),transparent_22%),radial-gradient(circle_at_100%_28%,rgba(172,20,19,0.12),transparent_26%),linear-gradient(180deg,#040404_0%,#080807_42%,#030303_100%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[430px]">
          <MobileCartHeader
            itemCount={itemCount}
            onClose={onClose}
            onClearCart={onClearCart}
            showClear={!isEmpty}
          />

          <main className="mt-9">
            <p className="editorial-title text-[38px] leading-none tracking-[0.18em]">
              Your <span className="text-[var(--sb-red-bright)]">Cart</span>
            </p>
            <p className="mt-3 text-[17px] text-[var(--sb-gold)]">
              Review your items and proceed to checkout.
            </p>

            {isEmpty ? (
              <MobileEmptyCart onClose={onClose} />
            ) : (
              <>
                <section aria-label="Cart items" className="mt-6 grid gap-4">
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

                <MobileCartSummary
                  itemCount={itemCount}
                  pointsEarned={pointsEarned}
                  totals={totals}
                />

                {suggestedItem ? (
                  <MobileSuggestedItem
                    item={suggestedItem}
                    onAddSuggestedItem={onAddSuggestedItem}
                  />
                ) : null}

                <button
                  aria-label="Checkout"
                  className="red-glow-button mt-5 min-h-[74px] w-full rounded-[14px] text-[18px] uppercase tracking-[0.08em]"
                  onClick={onOpenCheckout}
                  type="button"
                >
                  Proceed To Checkout
                </button>
              </>
            )}
          </main>
        </div>
      </div>

      <BottomNavigation activeId="orders" ariaLabel="Mobile cart navigation" />
    </div>
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
    <header className="flex items-center justify-between gap-4">
      <button
        aria-label="Back to menu"
        className="flex min-w-0 items-center gap-3 rounded-[14px] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
        onClick={onClose}
        type="button"
      >
        <AssetIcon
          alt=""
          className="rounded-full"
          loading="eager"
          size={46}
          src={brand.assets.floralEmblem.publicUrl}
        />
        <span className="editorial-title text-[16px] leading-[0.95] tracking-[0.34em]">
          Sushi
          <br />
          Bliss
        </span>
      </button>

      <div className="flex items-center gap-2">
        {showClear ? (
          <button
            className="h-[44px] rounded-full border border-[var(--sb-border)] bg-black/34 px-4 text-[11px] uppercase tracking-[0.08em] text-white/64"
            onClick={onClearCart}
            type="button"
          >
            Clear
          </button>
        ) : null}
        <div className="relative grid h-[54px] w-[54px] place-items-center rounded-full border border-[var(--sb-border)] bg-black/34">
          <AssetIcon loading="eager" size={28} src={icons.bell} />
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
  const unitPriceCents = calculateCartLineUnitPrice(item.menuItem, item.addOns);
  const lineSubtotalCents = calculateCartLineSubtotal(item);

  return (
    <article className="grid min-h-[126px] grid-cols-[112px_minmax(0,1fr)] gap-4 rounded-[15px] border border-[var(--sb-border)] bg-black/42 p-3">
      <div className="relative overflow-hidden rounded-[10px] border border-white/10 bg-black/40">
        <Image
          alt={item.menuItem.image.alt || item.menuItem.name}
          className="object-cover"
          fill
          sizes="112px"
          src={getTabletPresentationImage(item.menuItem)}
        />
      </div>

      <div className="min-w-0">
        <div className="grid grid-cols-[1fr_auto] gap-3">
          <div className="min-w-0">
            <h2 className="editorial-title line-clamp-2 text-[19px] leading-6">
              {item.menuItem.name}
            </h2>
            <p className="mt-1 line-clamp-2 text-[14px] leading-5 text-white/62">
              {item.menuItem.description}
            </p>
          </div>
          <p className="text-[19px] text-[var(--sb-gold)]">
            {formatMoney(lineSubtotalCents)}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <MobileCartQuantity
            onChange={(quantity) => onUpdateQuantity(item.id, quantity)}
            value={item.quantity}
          />
          <button
            aria-label={`Remove ${item.menuItem.name}`}
            className="grid h-10 w-10 place-items-center rounded-full text-[var(--sb-red-bright)] transition hover:bg-[var(--sb-red)]/14 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-red-bright)]"
            onClick={() => onRemove(item.id)}
            type="button"
          >
            <svg
              aria-hidden="true"
              className="h-6 w-6"
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

        <p className="mt-2 text-[12px] text-white/42">
          {formatMoney(unitPriceCents)} each
        </p>
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
    <div className="grid h-[42px] w-[134px] grid-cols-3 overflow-hidden rounded-full border border-[var(--sb-border)] bg-black/32 text-[20px]">
      <button
        aria-label="Decrease quantity"
        className="grid place-items-center text-[var(--sb-gold)] disabled:opacity-35"
        disabled={value <= 1}
        onClick={() => onChange(Math.max(1, value - 1))}
        type="button"
      >
        -
      </button>
      <output aria-label="Quantity" className="grid place-items-center">
        {value}
      </output>
      <button
        aria-label="Increase quantity"
        className="grid place-items-center text-[var(--sb-gold)]"
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
    <section className="mt-4 grid gap-3" aria-label="Cart options">
      <div className="rounded-[14px] border border-[var(--sb-border)] bg-black/36">
        <button
          aria-expanded={noteOpen}
          className="grid min-h-[64px] w-full grid-cols-[44px_1fr_auto] items-center gap-3 px-4 text-left"
          onClick={onToggleNote}
          type="button"
        >
          <AssetIcon size={27} src={icons.settings} />
          <span className="text-[16px] text-white/72">
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
        className="grid min-h-[64px] w-full grid-cols-[44px_1fr_auto] items-center gap-3 rounded-[14px] border border-[var(--sb-border)] bg-black/36 px-4 text-left opacity-70"
        disabled
        title="Promo codes are entered during checkout."
        type="button"
      >
        <AssetIcon size={27} src={icons.star} />
        <span className="text-[16px] text-white/72">
          Promo code available at checkout
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
  pointsEarned,
  totals,
}: {
  itemCount: number;
  pointsEarned: number;
  totals: OrderTotals;
}) {
  return (
    <section className="mt-4 rounded-[15px] border border-[var(--sb-border)] bg-black/42 p-4">
      <div className="space-y-3 text-[15px]">
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

      <div className="mt-4 border-t border-white/10 pt-4">
        <SummaryLine
          label="Total"
          large
          value={formatMoney(totals.totalCents)}
        />
        <p className="mt-3 flex items-center gap-2 text-[13px] text-[var(--sb-gold)]">
          <AssetIcon size={20} src={icons.flower} />
          You will earn {pointsEarned} Bliss Points with this order
        </p>
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
        "flex items-center justify-between gap-4",
        large ? "editorial-title text-[24px] text-[var(--sb-gold)]" : "",
      )}
    >
      <span className={large ? "text-white" : "text-white/68"}>{label}</span>
      <span className={large ? "" : "text-white/86"}>{value}</span>
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
    <section className="mt-4 grid grid-cols-[116px_1fr] gap-4 overflow-hidden rounded-[15px] border border-[var(--sb-border)] bg-black/42 p-3">
      <div className="relative min-h-[118px] overflow-hidden rounded-[10px] border border-white/10">
        <Image
          alt={item.image.alt || item.name}
          className="object-cover"
          fill
          sizes="116px"
          src={getTabletPresentationImage(item)}
        />
      </div>
      <div className="min-w-0 py-1">
        <p className="text-[12px] uppercase tracking-[0.12em] text-[var(--sb-gold)]">
          Complete your meal
        </p>
        <h2 className="editorial-title mt-2 text-[23px] leading-7">
          Add {item.name}
        </h2>
        <p className="mt-1 line-clamp-2 text-[14px] leading-5 text-white/62">
          {item.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-[20px] text-[var(--sb-gold)]">
            {formatMoney(item.priceCents)}
          </p>
          <button
            aria-label={`Add ${item.name} to cart`}
            className="h-[44px] rounded-full border border-[var(--sb-gold)]/55 px-6 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold)]"
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
