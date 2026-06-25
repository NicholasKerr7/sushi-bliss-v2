"use client";

import { useEffect, useRef, useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { Button } from "@/components/ui/Button";
import { SegmentedProgressMeter } from "@/components/ui/SegmentedProgressMeter";
import { icons } from "@/features/home/homeDashboardData";
import { useScrollLock } from "@/hooks/useScrollLock";
import {
  TabletMenuBottomNav,
  TabletMenuHeader,
} from "@/features/menu/TabletMenuChrome";
import {
  calculateOrderTotals,
  calculateTipCents,
  formatMoney,
  parseMoneyInputToCents,
} from "@/lib/money";
import type { CartLineItem, OrderTotals } from "@/types/order";

import { TabletCartLine } from "./TabletCartLine";

interface TabletCartDialogProps {
  customTipCents: number;
  itemCount: number;
  items: CartLineItem[];
  onClearCart: () => void;
  onClose: () => void;
  onCustomTipChange: (tipCents: number) => void;
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
  customTipCents,
  itemCount,
  items,
  onClearCart,
  onClose,
  onCustomTipChange,
  onOpenCheckout,
  onRemove,
  onTipPercentChange,
  onUpdateQuantity,
  open,
  tipPercent,
  totals,
}: TabletCartDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [customTipValue, setCustomTipValue] = useState(
    customTipCents > 0 ? (customTipCents / 100).toFixed(2) : "",
  );
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
  const tipCents =
    customTipCents > 0
      ? customTipCents
      : calculateTipCents(totals.subtotalCents, tipPercent);
  const previewTotals = calculateOrderTotals(
    totals.subtotalCents,
    totals.discountCents,
    tipCents,
  );

  useScrollLock(open);

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

    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();

    return () => {
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

  const handlePresetTipChange = (nextTipPercent: number) => {
    setCustomTipValue("");
    onTipPercentChange(nextTipPercent);
  };

  const handleCustomTipChange = (value: string) => {
    setCustomTipValue(value);
    onCustomTipChange(parseMoneyInputToCents(value));
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
      className="fixed inset-0 z-50 hidden overflow-y-auto bg-[#050607] px-4 pb-4 pt-3 text-white md:block min-[900px]:px-[26px] xl:hidden"
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

      <main className="mx-auto max-w-[1034px] rounded-[24px] border border-white/10 bg-[#090b0b] px-4 pb-6 pt-8 shadow-[0_26px_90px_rgb(0_0_0_/_0.5)] min-[900px]:rounded-[26px] min-[900px]:px-6 min-[1080px]:px-8 min-[1080px]:pt-10">
        <div className="grid gap-4 min-[900px]:grid-cols-[minmax(0,1fr)_auto] min-[900px]:items-end min-[900px]:gap-5">
          <div className="min-w-0">
            <div className="flex min-w-0 flex-wrap items-center gap-3 min-[900px]:gap-5">
              <h1
                className="editorial-title text-[34px] uppercase leading-none tracking-[0.06em] min-[900px]:text-[42px] min-[900px]:tracking-[0.08em]"
                id="tablet-cart-title"
              >
                Your Cart
              </h1>
              <span className="rounded-[12px] border border-[var(--sb-gold)]/36 bg-[var(--sb-gold)]/10 px-3 py-1.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--sb-gold-soft)] min-[900px]:rounded-[14px] min-[900px]:px-4 min-[900px]:py-2 min-[900px]:text-[14px] min-[900px]:tracking-[0.14em]">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
            </div>
            <p className="mt-3 text-[15px] leading-6 text-white/72 min-[900px]:mt-4 min-[900px]:text-[17px]">
              {remainingForFreeDelivery > 0
                ? `Add ${formatMoney(remainingForFreeDelivery)} more to unlock free delivery.`
                : "Free delivery unlocked for this order."}
            </p>
          </div>
          <Button
            className="min-h-10 rounded-[10px] px-4 text-[12px] uppercase tracking-[0.08em]"
            onClick={onClearCart}
            variant="ghost"
          >
            Clear cart
          </Button>
        </div>

        <div className="mt-6 grid gap-5 min-[980px]:grid-cols-[minmax(0,1fr)_340px] min-[1080px]:grid-cols-[minmax(0,1fr)_360px] min-[1080px]:gap-6">
          <section>
            <SegmentedProgressMeter
              ariaLabel="Free delivery progress"
              className="mb-5 rounded-[16px] border border-white/10 bg-black/22 p-4"
              label="Free delivery"
              max={100}
              tone={remainingForFreeDelivery > 0 ? "redGold" : "gold"}
              value={progressPercent}
              valueLabel={
                remainingForFreeDelivery > 0
                  ? `${Math.round(progressPercent)}% unlocked`
                  : "Unlocked"
              }
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

          <aside className="space-y-4 min-[1080px]:space-y-5">
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
                    label={
                      customTipCents > 0
                        ? "Tip (custom)"
                        : `Tip (${tipPercent}%)`
                    }
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
                <div className="mt-3 grid grid-cols-[minmax(0,1fr)_78px] gap-2 min-[1080px]:grid-cols-[minmax(0,1fr)_86px] min-[1080px]:gap-3">
                  <input
                    className="h-11 min-w-0 rounded-[12px] border border-white/10 bg-black/24 px-3 text-[14px] text-white outline-none placeholder:text-white/36 focus:border-[var(--sb-gold)] focus:ring-2 focus:ring-[var(--sb-gold)]/20 min-[1080px]:px-4"
                    id="tablet-cart-promo"
                    onChange={(event) => setPromoCode(event.target.value)}
                    placeholder="Enter code"
                    value={promoCode}
                  />
                  <button
                    className="rounded-[12px] border border-[var(--sb-gold)]/36 bg-[var(--sb-gold)]/10 text-[12px] font-semibold uppercase text-[var(--sb-gold-soft)] min-[1080px]:text-[13px]"
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
                      aria-pressed={
                        customTipCents === 0 && tipPercent === option
                      }
                      className={`rounded-[12px] border px-2 py-3 text-center transition min-[1080px]:px-3 ${
                        customTipCents === 0 && tipPercent === option
                          ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/24 text-white shadow-[0_0_22px_var(--sb-red-glow)]"
                          : "border-white/10 bg-black/20 text-white/74"
                      }`}
                      key={option}
                      onClick={() => handlePresetTipChange(option)}
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
                <label
                  className={`mt-3 grid min-h-12 grid-cols-[auto_1fr_auto] items-center gap-3 rounded-[12px] border bg-black/20 px-4 transition ${
                    customTipCents > 0
                      ? "border-[var(--sb-red-bright)] text-white shadow-[0_0_18px_var(--sb-red-glow)]"
                      : "border-white/12 text-white/70 focus-within:border-[var(--sb-gold)]"
                  }`}
                  htmlFor="tablet-cart-custom-tip"
                >
                  <span className="text-[13px] uppercase tracking-[0.08em]">
                    Custom
                  </span>
                  <span className="font-mono text-[15px] text-[var(--sb-gold-soft)]">
                    $
                  </span>
                  <input
                    className="min-w-0 bg-transparent text-right font-mono text-[16px] text-white outline-none placeholder:text-white/34"
                    id="tablet-cart-custom-tip"
                    inputMode="decimal"
                    maxLength={7}
                    onChange={(event) =>
                      handleCustomTipChange(event.target.value)
                    }
                    placeholder="0.00"
                    value={customTipValue}
                  />
                </label>
              </div>
            </section>

            <section className="rounded-[18px] border border-white/10 bg-white/[0.04] p-5">
              <div className="grid gap-3 min-[1080px]:grid-cols-[minmax(0,1fr)_auto] min-[1080px]:items-center min-[1080px]:gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <AssetIcon size={38} src={icons.flower} />
                  <div className="min-w-0">
                    <h2 className="text-[16px] font-semibold text-[var(--sb-gold-soft)]">
                      Bliss Rewards
                    </h2>
                    <p className="text-[13px] text-white/56">
                      Apply points in checkout.
                    </p>
                  </div>
                </div>
                <Button
                  className="justify-self-start min-[1080px]:justify-self-end"
                  href="/loyalty"
                  size="sm"
                  variant="ghost"
                >
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
              <ChevronIcon direction="right" size={18} />
            </Button>
            <p className="text-center text-[13px] text-white/48">
              Secure checkout powered by SSL encryption
            </p>
          </aside>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-y-4 rounded-[16px] border border-white/10 bg-white/[0.035] p-4 min-[980px]:grid-cols-4 min-[980px]:gap-y-0">
          {benefitItems.map((benefit) => (
            <div
              className="flex min-w-0 items-center gap-3 px-2 min-[980px]:border-r min-[980px]:border-white/10 min-[980px]:px-5 min-[980px]:last:border-r-0"
              key={benefit.label}
            >
              <AssetIcon size={30} src={benefit.icon} />
              <p className="min-w-0">
                <span className="block line-clamp-1 text-[11px] uppercase tracking-[0.06em] text-white/62 min-[980px]:text-[12px] min-[980px]:tracking-[0.08em]">
                  {benefit.label}
                </span>
                <span className="mt-1 block line-clamp-1 text-[12px] text-white/48 min-[980px]:text-[13px]">
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
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
      <span
        className={large ? "text-[20px] uppercase" : "min-w-0 text-white/72"}
      >
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
