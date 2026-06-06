"use client";

import { useEffect, useRef, useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { icons } from "@/features/home/visualHomeData";
import {
  TabletMenuBottomNav,
  TabletMenuHeader,
} from "@/features/menu/TabletMenuChrome";
import {
  calculateOrderTotals,
  calculateTipCents,
  formatMoney,
} from "@/lib/money";
import type { CartLineItem, OrderTotals } from "@/types/order";

import { TabletCartLine } from "./TabletCartLine";

interface TabletCartDialogProps {
  itemCount: number;
  items: CartLineItem[];
  onClearCart: () => void;
  onClose: () => void;
  onOpenCheckout: () => void;
  onRemove: (id: string) => void;
  onTipPercentChange: (tipPercent: number) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  open: boolean;
  tipPercent: number;
  totals: OrderTotals;
}

const FREE_DELIVERY_THRESHOLD_CENTS = 7500;
const tipPercentOptions = [10, 15, 20] as const;
const benefitItems = [
  { icon: icons.flower, label: "Premium ingredients", value: "Sourced Daily" },
  {
    icon: icons.crown,
    label: "Expert craftsmanship",
    value: "By Master Chefs",
  },
  {
    icon: icons.chef,
    label: "Authentic experience",
    value: "Traditional. Refined.",
  },
  {
    icon: icons.bag,
    label: "Exclusive reservations",
    value: "Priority for Members",
  },
] as const;

/** Tablet-only full cart view built from the live local cart state. */
export function TabletCartDialog({
  itemCount,
  items,
  onClearCart,
  onClose,
  onOpenCheckout,
  onRemove,
  onTipPercentChange,
  onUpdateQuantity,
  open,
  tipPercent,
  totals,
}: TabletCartDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const remainingForFreeDelivery = Math.max(
    FREE_DELIVERY_THRESHOLD_CENTS - totals.subtotalCents,
    0,
  );
  const progressPercent = Math.min(
    (totals.subtotalCents / FREE_DELIVERY_THRESHOLD_CENTS) * 100,
    100,
  );
  const tipCents = calculateTipCents(totals.subtotalCents, tipPercent);
  const previewTotals = calculateOrderTotals(
    totals.subtotalCents,
    totals.discountCents,
    tipCents,
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    const previouslyFocused = document.activeElement;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
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
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  const handleApplyPromo = () => {
    const normalizedCode = promoCode.trim().toUpperCase();

    if (!normalizedCode) {
      setPromoMessage("Enter a promo code.");
      return;
    }

    setPromoMessage(`${normalizedCode} will be validated during checkout.`);
  };

  const handleSubmitSearch = (nextQuery: string) => {
    if (nextQuery.trim()) {
      window.location.assign("/menu");
    }
  };

  return (
    <div
      aria-labelledby="tablet-cart-title"
      aria-modal="true"
      className="fixed inset-0 z-50 hidden overflow-y-auto bg-[#050607] px-[26px] pb-4 pt-3 text-white md:block xl:hidden"
      ref={dialogRef}
      role="dialog"
      tabIndex={-1}
    >
      <TabletMenuHeader
        cartCount={itemCount}
        query={query}
        onClearQuery={() => setQuery("")}
        onOpenCart={() => dialogRef.current?.scrollTo({ top: 0 })}
        onQueryChange={setQuery}
        onSubmitQuery={handleSubmitSearch}
      />

      <main className="mx-auto max-w-[1034px] rounded-[26px] border border-white/10 bg-[#090b0b] px-8 pb-6 pt-10 shadow-[0_26px_90px_rgb(0_0_0_/_0.5)]">
        <div className="flex items-end justify-between gap-5">
          <div>
            <div className="flex items-center gap-5">
              <h1
                className="editorial-title text-[42px] uppercase leading-none tracking-[0.08em]"
                id="tablet-cart-title"
              >
                Your Cart
              </h1>
              <span className="rounded-[14px] border border-[var(--sb-gold)]/36 bg-[var(--sb-gold)]/10 px-4 py-2 text-[14px] font-semibold uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            </div>
            <p className="mt-4 text-[17px] text-white/72">
              {remainingForFreeDelivery > 0
                ? `Add ${formatMoney(remainingForFreeDelivery)} more to unlock free delivery.`
                : "Free delivery unlocked for this order."}
            </p>
          </div>
          <Button onClick={onClearCart} variant="ghost">
            Clear cart
          </Button>
        </div>

        <div className="mt-6 grid grid-cols-[minmax(0,1fr)_360px] gap-6">
          <section>
            <progress
              aria-label="Free delivery progress"
              className="mb-5 h-2 w-full"
              max={100}
              value={progressPercent}
            />
            {items.length > 0 ? (
              <div className="rounded-[18px] border border-white/10 bg-black/22 p-4">
                {items.map((item) => (
                  <TabletCartLine
                    item={item}
                    key={item.id}
                    onRemove={onRemove}
                    onUpdateQuantity={onUpdateQuantity}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-[18px] border border-white/10 bg-black/22 p-8 text-center">
                <h2 className="text-[24px] font-semibold">
                  Your cart is empty
                </h2>
                <p className="mx-auto mt-3 max-w-sm text-[15px] leading-6 text-white/58">
                  Browse the menu and add chef selections before checkout.
                </p>
              </div>
            )}
            <Button
              className="mt-4 h-[44px] rounded-[14px]"
              onClick={onClose}
              variant="secondary"
            >
              Continue ordering
            </Button>
          </section>

          <aside className="space-y-5">
            <section className="rounded-[18px] border border-white/10 bg-white/[0.04] p-5">
              <h2 className="text-[20px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                Order Summary
              </h2>
              <div className="mt-5 space-y-4 text-[15px]">
                <SummaryRow
                  label={`Subtotal (${itemCount} items)`}
                  value={formatMoney(previewTotals.subtotalCents)}
                />
                <SummaryRow
                  label="Delivery fee"
                  value={formatMoney(previewTotals.serviceFeeCents)}
                />
                <SummaryRow
                  label="Estimated tax"
                  value={formatMoney(previewTotals.taxCents)}
                />
                {previewTotals.tipCents > 0 ? (
                  <SummaryRow
                    label={`Tip (${tipPercent}%)`}
                    value={formatMoney(previewTotals.tipCents)}
                  />
                ) : null}
              </div>
              <div className="mt-6 border-t border-white/10 pt-5">
                <SummaryRow
                  label="Total"
                  value={formatMoney(previewTotals.totalCents)}
                  large
                />
              </div>
              <p className="mt-5 text-[14px] font-semibold text-[var(--sb-gold-soft)]">
                You&apos;ll earn {Math.floor(previewTotals.totalCents / 100)}{" "}
                Bliss Points on this order
              </p>
              <div className="mt-5 border-t border-white/10 pt-5">
                <label
                  className="text-[15px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                  htmlFor="tablet-cart-promo"
                >
                  Promo code
                </label>
                <div className="mt-3 grid grid-cols-[1fr_86px] gap-3">
                  <input
                    className="h-11 rounded-[12px] border border-white/10 bg-black/24 px-4 text-[14px] text-white outline-none placeholder:text-white/36 focus:border-[var(--sb-gold)] focus:ring-2 focus:ring-[var(--sb-gold)]/20"
                    id="tablet-cart-promo"
                    onChange={(event) => setPromoCode(event.target.value)}
                    placeholder="Enter code"
                    value={promoCode}
                  />
                  <button
                    className="rounded-[12px] border border-[var(--sb-gold)]/36 bg-[var(--sb-gold)]/10 text-[13px] font-semibold uppercase text-[var(--sb-gold-soft)]"
                    onClick={handleApplyPromo}
                    type="button"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage ? (
                  <p className="mt-2 text-[12px] text-white/52">
                    {promoMessage}
                  </p>
                ) : null}
              </div>
              <div className="mt-5 border-t border-white/10 pt-5">
                <h3 className="text-[15px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                  Add a tip
                </h3>
                <p className="mt-1 text-[12px] text-white/58">
                  100% of tips go to our team.
                </p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {tipPercentOptions.map((option) => (
                    <button
                      aria-pressed={tipPercent === option}
                      className={`rounded-[12px] border px-3 py-3 text-center transition ${
                        tipPercent === option
                          ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/24 text-white shadow-[0_0_22px_var(--sb-red-glow)]"
                          : "border-white/10 bg-black/20 text-white/74"
                      }`}
                      key={option}
                      onClick={() => onTipPercentChange(option)}
                      type="button"
                    >
                      <span className="block text-[16px]">{option}%</span>
                      <span className="mt-1 block font-mono text-[12px] text-white/54">
                        {formatMoney(
                          calculateTipCents(totals.subtotalCents, option),
                        )}
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  className="mt-3 h-11 w-full rounded-[12px] border border-white/12 bg-black/20 text-[13px] uppercase text-white/42"
                  disabled
                  title="Custom tip coming soon"
                  type="button"
                >
                  Custom
                </button>
              </div>
            </section>

            <section className="rounded-[18px] border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <AssetIcon size={38} src={icons.flower} />
                  <div>
                    <h2 className="text-[16px] font-semibold text-[var(--sb-gold-soft)]">
                      Bliss Rewards
                    </h2>
                    <p className="text-[13px] text-white/56">
                      Apply points in checkout.
                    </p>
                  </div>
                </div>
                <Button href="/loyalty" size="sm" variant="ghost">
                  Rewards
                </Button>
              </div>
            </section>

            <Button
              className="red-glow-button h-[70px] w-full rounded-[14px] text-[18px] uppercase tracking-[0.08em]"
              disabled={items.length === 0}
              onClick={onOpenCheckout}
            >
              Proceed to checkout
            </Button>
            <p className="text-center text-[13px] text-white/48">
              Secure checkout powered by SSL encryption
            </p>
          </aside>
        </div>

        <div className="mt-6 grid grid-cols-4 rounded-[16px] border border-white/10 bg-white/[0.035] p-4">
          {benefitItems.map((benefit) => (
            <div
              className="flex items-center gap-4 border-r border-white/10 px-5 last:border-r-0"
              key={benefit.label}
            >
              <AssetIcon size={34} src={benefit.icon} />
              <p>
                <span className="block text-[12px] uppercase tracking-[0.08em] text-white/62">
                  {benefit.label}
                </span>
                <span className="mt-1 block text-[13px] text-white/48">
                  {benefit.value}
                </span>
              </p>
            </div>
          ))}
        </div>
      </main>

      <TabletMenuBottomNav activeIndex={4} />
    </div>
  );
}

function SummaryRow({
  label,
  large,
  value,
}: {
  label: string;
  large?: boolean;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={large ? "text-[20px] uppercase" : "text-white/72"}>
        {label}
      </span>
      <span
        className={
          large
            ? "font-mono text-[30px] text-[var(--sb-gold-soft)]"
            : "font-mono text-white"
        }
      >
        {value}
      </span>
    </div>
  );
}
