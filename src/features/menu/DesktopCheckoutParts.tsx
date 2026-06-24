import Image from "next/image";
import type { ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { Button } from "@/components/ui/Button";
import { pickupLocation } from "@/data/checkout";
import type { useCart } from "@/hooks/useCart";
import type { useCheckout } from "@/hooks/useCheckout";
import { calculateCartLineSubtotal } from "@/lib/cart";
import { classNames } from "@/lib/classNames";
import { formatDateTime } from "@/lib/dates";
import { formatMoney } from "@/lib/money";
import { isPaymentMethodUsable } from "@/lib/profile";
import type { Order } from "@/types/order";

export type DesktopCheckoutState = ReturnType<typeof useCheckout>;
export type DesktopCartItems = ReturnType<typeof useCart>["items"];

export function CheckoutStepTitle({
  accessibleName,
  action,
  number,
  title,
}: {
  accessibleName?: string;
  action?: ReactNode;
  number: number;
  title: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h2
        aria-label={accessibleName}
        className="editorial-title flex min-w-0 items-center gap-2.5 text-[16px] uppercase leading-none tracking-[0.08em] text-white/88"
      >
        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[var(--sb-gold)]/54 text-[12px] text-[var(--sb-gold-soft)]">
          {number}
        </span>
        {title}
      </h2>
      {action}
    </div>
  );
}

export function DesktopFulfillmentCards({
  checkout,
}: {
  checkout: DesktopCheckoutState;
}) {
  const options = [
    {
      copy: "We'll deliver to your address",
      icon: "/assets/icons/delivery-scooter-icon.png",
      label: "Delivery",
      value: "delivery",
    },
    {
      copy: "Pick up at our restaurant",
      icon: "/assets/icons/takeaway-bag-icon.png",
      label: "Pickup",
      value: "pickup",
    },
  ] as const;

  return (
    <div className="mt-2.5 grid grid-cols-2 gap-3">
      {options.map((option) => {
        const selected = checkout.mode === option.value;

        return (
          <button
            aria-pressed={selected}
            className={classNames(
              "grid min-h-[58px] grid-cols-[38px_1fr] items-center gap-3 rounded-[12px] border px-3.5 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
              selected
                ? "border-[var(--sb-red-bright)] bg-[linear-gradient(180deg,rgba(154,16,13,0.78),rgba(84,9,8,0.92))] shadow-[0_0_24px_rgba(255,35,22,0.22)]"
                : "border-white/12 bg-black/24 hover:border-[var(--sb-gold)]/45",
            )}
            key={option.value}
            onClick={() => checkout.setMode(option.value)}
            type="button"
          >
            <AssetIcon size={30} src={option.icon} />
            <span className="min-w-0">
              <span className="block text-[14px] font-semibold uppercase tracking-[0.06em] text-white">
                {option.label}
              </span>
              <span className="mt-1 block text-[12px] text-white/58">
                {option.copy}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function DesktopAddressSummary({
  checkout,
}: {
  checkout: DesktopCheckoutState;
}) {
  const isDelivery = checkout.mode === "delivery";
  const address = checkout.selectedAddress;

  if (!isDelivery) {
    return (
      <div className="mt-2.5 grid min-h-[68px] grid-cols-[36px_1fr] items-center gap-3 rounded-[12px] border border-white/12 bg-black/24 px-3.5">
        <AssetIcon size={28} src="/assets/icons/map-pin-icon.png" />
        <p className="min-w-0">
          <span className="block text-[14px] font-semibold text-white">
            {pickupLocation.label}
          </span>
          <span className="mt-1 block text-[12px] leading-4 text-white/56">
            {pickupLocation.line1}, {pickupLocation.city},{" "}
            {pickupLocation.region} {pickupLocation.postalCode}
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="mt-2.5 grid min-h-[68px] grid-cols-[36px_1fr] items-center gap-3 rounded-[12px] border border-white/12 bg-black/24 px-3.5">
      <AssetIcon size={28} src="/assets/icons/map-pin-icon.png" />
      {address ? (
        <p className="min-w-0">
          <span className="block text-[14px] font-semibold text-white">
            {address.line1}
          </span>
          <span className="mt-1 block text-[12px] leading-4 text-white/56">
            {address.line2 ? `${address.line2}, ` : ""}
            {address.city}, {address.region} {address.postalCode}
          </span>
          <span className="mt-1 block text-[12px] text-white/46">
            {checkout.customerPhone}
          </span>
        </p>
      ) : (
        <p className="text-[13px] text-white/58">
          Choose or add a delivery address.
        </p>
      )}
    </div>
  );
}

export function DesktopPaymentSummary({
  checkout,
}: {
  checkout: DesktopCheckoutState;
}) {
  const payment = checkout.selectedPaymentMethod;

  return (
    <div className="mt-2.5 grid min-h-[68px] grid-cols-[36px_1fr] items-center gap-3 rounded-[12px] border border-white/12 bg-black/24 px-3.5">
      <AssetIcon size={28} src="/assets/icons/credit-card-icon.png" />
      {payment ? (
        <p className="min-w-0">
          <span className="block text-[14px] font-semibold text-white">
            {payment.brand} **** {payment.last4}
          </span>
          <span className="mt-1 block text-[12px] text-white/50">
            Expires {payment.expiresAt}
          </span>
        </p>
      ) : (
        <p className="text-[13px] text-white/58">
          Select a payment method before review.
        </p>
      )}
      {checkout.validation.payment ? (
        <p className="col-span-2 pb-3 text-xs text-[var(--sb-red-bright)]">
          {checkout.validation.payment}
        </p>
      ) : null}
    </div>
  );
}

export function DesktopTipButtons({
  selectedTip,
  subtotalCents,
  onTipChange,
}: {
  selectedTip: number;
  subtotalCents: number;
  onTipChange: (tip: number) => void;
}) {
  return (
    <div className="mt-2.5 grid grid-cols-4 overflow-hidden rounded-[12px] border border-white/12 bg-black/24">
      {[10, 15, 20, 0].map((tip) => {
        const selected = selectedTip === tip;

        return (
          <button
            aria-pressed={selected}
            className={classNames(
              "min-h-[46px] border-l border-white/10 px-2 text-[13px] transition first:border-l-0",
              selected
                ? "bg-[var(--sb-red)]/32 text-white"
                : "text-white/62 hover:bg-white/[0.035]",
            )}
            key={tip}
            onClick={() => onTipChange(tip)}
            type="button"
          >
            {tip === 0 ? "No tip" : `${tip}%`}
            {tip > 0 ? (
              <span className="block font-mono text-[11px] text-white/66">
                {formatMoney(Math.round(subtotalCents * (tip / 100)))}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

export function DesktopOfferCode({
  checkout,
}: {
  checkout: DesktopCheckoutState;
}) {
  return (
    <div className="mt-2.5 rounded-[12px] border border-white/12 bg-black/22 p-2.5">
      <div className="grid grid-cols-[minmax(0,1fr)_76px] items-center gap-2.5 min-[1500px]:grid-cols-[minmax(0,1fr)_86px]">
        <label className="sr-only" htmlFor="desktop-checkout-promo">
          Promo code
        </label>
        <input
          className="h-10 min-w-0 rounded-[10px] border border-white/12 bg-black/30 px-3 text-[13px] text-white outline-none placeholder:text-white/36 focus:border-[var(--sb-gold)] focus:ring-2 focus:ring-[var(--sb-gold)]/20 min-[1500px]:px-3.5"
          id="desktop-checkout-promo"
          onChange={(event) => checkout.setPromoCode(event.target.value)}
          placeholder="BLISS10"
          value={checkout.promoCode}
        />
        <Button
          className="h-10 rounded-[10px] px-2 text-[11px] min-[1500px]:text-[12px]"
          onClick={checkout.applyPromoCode}
          variant="secondary"
        >
          Apply
        </Button>
      </div>
      {checkout.validation.promo ? (
        <p className="mt-2 text-xs text-[var(--sb-red-bright)]">
          {checkout.validation.promo}
        </p>
      ) : (
        <p className="mt-2 text-xs text-white/42">Try BLISS10 or OMAKASE15.</p>
      )}
      {checkout.appliedPromo ? (
        <div className="mt-2 flex items-center justify-between gap-3 rounded-[10px] border border-sb-wasabi/30 bg-sb-wasabi/10 px-3 py-2">
          <p className="text-xs leading-5 text-sb-wasabi">
            {checkout.appliedPromo.code}: {checkout.appliedPromo.description}
          </p>
          <button
            className="text-[12px] uppercase tracking-[0.08em] text-white/64"
            onClick={checkout.clearPromoCode}
            type="button"
          >
            Remove
          </button>
        </div>
      ) : null}
    </div>
  );
}

/** Cycles through saved delivery addresses without opening the full address form. */
export function selectNextAddress(checkout: DesktopCheckoutState) {
  const addresses = checkout.addresses;

  if (addresses.length < 2) {
    return;
  }

  const currentIndex = Math.max(
    addresses.findIndex((address) => address.id === checkout.selectedAddressId),
    0,
  );
  const nextAddress = addresses[(currentIndex + 1) % addresses.length];

  checkout.setSelectedAddressId(nextAddress.id);
}

/** Cycles through usable saved payment methods for the compact desktop checkout UI. */
export function selectNextPaymentMethod(checkout: DesktopCheckoutState) {
  const paymentMethods = checkout.paymentMethods.filter(isPaymentMethodUsable);

  if (paymentMethods.length < 2) {
    return;
  }

  const currentIndex = Math.max(
    paymentMethods.findIndex(
      (paymentMethod) => paymentMethod.id === checkout.selectedPaymentMethodId,
    ),
    0,
  );
  const nextPaymentMethod =
    paymentMethods[(currentIndex + 1) % paymentMethods.length];

  checkout.setSelectedPaymentMethodId(nextPaymentMethod.id);
}

/** Formats the selected fulfillment timestamp as the compact desktop checkout date. */
export function formatCheckoutDate(value: string) {
  if (!value) {
    return "Select date";
  }

  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    weekday: "short",
  }).format(new Date(value));
}

/** Formats the selected fulfillment timestamp as the compact desktop checkout time. */
export function formatCheckoutTime(value: string) {
  if (!value) {
    return "Select time";
  }

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function ReviewTrustStrip({ totalCents }: { totalCents: number }) {
  const items = [
    ["chef-crest-icon.png", "SSL encrypted", "Secure checkout"],
    ["lotus-icon.png", "Fresh & quality", "Premium ingredients"],
    ["star-icon.png", "Satisfaction", "100% guaranteed"],
  ] as const;

  return (
    <div className="grid grid-cols-2 gap-y-3 rounded-[16px] border border-[var(--sb-border)] bg-white/[0.035] p-3 min-[1380px]:grid-cols-[1fr_1fr_1fr_128px] min-[1380px]:items-center min-[1380px]:gap-y-0">
      {items.map(([icon, label, value]) => (
        <div
          className="flex min-w-0 items-center gap-2.5 px-2.5 min-[1380px]:border-r min-[1380px]:border-white/10 min-[1380px]:last:border-r-0"
          key={label}
        >
          <AssetIcon size={24} src={`/assets/icons/${icon}`} />
          <p className="min-w-0">
            <span className="block line-clamp-1 text-[12px] uppercase tracking-[0.08em] text-white/74">
              {label}
            </span>
            <span className="mt-1 block line-clamp-1 text-[12px] text-white/48">
              {value}
            </span>
          </p>
        </div>
      ))}
      <div className="pl-2 text-right min-[1380px]:pl-4">
        <span className="block text-[12px] uppercase tracking-[0.08em] text-white/58">
          Total
        </span>
        <span className="mt-1 block font-mono text-[22px] text-[var(--sb-gold-soft)]">
          {formatMoney(totalCents)}
        </span>
      </div>
    </div>
  );
}

export function DesktopReviewInfoCard({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <article className="min-h-[88px] rounded-[16px] border border-[var(--sb-border)] bg-white/[0.035] p-3.5">
      <h2 className="editorial-title text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
        {title}
      </h2>
      <p className="mt-2 text-[13px] leading-5 text-white/64">{children}</p>
    </article>
  );
}

export function DesktopReviewTotals({
  checkout,
  items,
}: {
  checkout: DesktopCheckoutState;
  items: DesktopCartItems;
}) {
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const points = Math.floor(checkout.reviewTotals.totalCents / 100);

  return (
    <article className="rounded-[16px] border border-[var(--sb-border)] bg-white/[0.035] p-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="editorial-title text-[17px] uppercase text-[var(--sb-gold-soft)]">
          Order summary
        </h2>
        <span className="rounded-full border border-[var(--sb-gold)]/34 px-3 py-1 text-[12px] uppercase tracking-[0.08em] text-white/58">
          {itemCount} items
        </span>
      </div>
      <div className="mt-3 space-y-1.5 border-b border-white/10 pb-3 text-[13px]">
        <SummaryLine
          label="Subtotal"
          value={formatMoney(checkout.reviewTotals.subtotalCents)}
        />
        <SummaryLine
          label="Delivery fee"
          value={formatMoney(checkout.reviewTotals.serviceFeeCents)}
        />
        <SummaryLine
          label="Tax & fees"
          value={formatMoney(checkout.reviewTotals.taxCents)}
        />
        {checkout.reviewTotals.discountCents > 0 ? (
          <SummaryLine
            label="Discount"
            value={`-${formatMoney(checkout.reviewTotals.discountCents)}`}
          />
        ) : null}
        <SummaryLine
          label="Tip"
          value={formatMoney(checkout.reviewTotals.tipCents)}
        />
      </div>
      <div className="mt-3 grid gap-3 min-[1500px]:grid-cols-[minmax(0,1fr)_auto] min-[1500px]:items-end min-[1500px]:gap-5">
        <div className="min-w-0">
          <p className="text-[12px] uppercase tracking-[0.1em] text-white/48">
            {checkout.mode === "delivery" ? "Delivery" : "Pickup"} window
          </p>
          <p className="mt-1.5 text-[13px] text-white">
            {checkout.selectedTime
              ? formatDateTime(checkout.selectedTime)
              : "Selected time"}
          </p>
          <p className="mt-2.5 flex items-center gap-2 text-[12px] text-[var(--sb-gold-soft)]">
            <AssetIcon size={18} src="/assets/icons/floral-emblem-icon.png" />+
            {points} Bliss Points pending
          </p>
        </div>
        <p className="text-left min-[1500px]:text-right">
          <span className="block text-[12px] uppercase tracking-[0.1em] text-white/48">
            Total
          </span>
          <span className="mt-1 block font-mono text-[29px] text-[var(--sb-gold-soft)]">
            {formatMoney(checkout.reviewTotals.totalCents)}
          </span>
        </p>
      </div>
    </article>
  );
}

function SummaryLine({ label, value }: { label: string; value: string }) {
  return (
    <p className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 text-white/66">
      <span className="min-w-0">{label}</span>
      <span className="shrink-0 font-mono text-white">{value}</span>
    </p>
  );
}

export function DesktopConfirmationOrderSummary({ order }: { order: Order }) {
  const visibleItems = order.items.slice(0, 3);
  const remainingItemCount = order.items.length - visibleItems.length;

  return (
    <article className="rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="editorial-title text-[20px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
          Order summary
        </h2>
        <span className="rounded-full border border-[var(--sb-gold)]/36 px-3 py-1 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
          {order.items.length} items
        </span>
      </div>
      <div className="mt-3 grid gap-2">
        {visibleItems.map((item) => (
          <div
            className="grid grid-cols-[50px_1fr_42px_72px] items-center gap-3 border-b border-white/10 pb-2 last:border-b-0 last:pb-0"
            key={item.id}
          >
            <div className="relative h-12 overflow-hidden rounded-[8px] border border-white/10 bg-black/34">
              <Image
                alt=""
                className="object-cover"
                fill
                sizes="50px"
                src={item.menuItem.image.publicUrl}
              />
            </div>
            <p className="min-w-0">
              <span className="block truncate text-[14px] font-semibold text-white">
                {item.menuItem.name}
              </span>
              <span className="mt-1 block line-clamp-1 text-[12px] text-white/48">
                {item.menuItem.ingredients.slice(0, 3).join(", ")}
              </span>
            </p>
            <span className="text-center text-[13px] text-white/50">
              x {item.quantity}
            </span>
            <span className="text-right font-mono text-[13px] text-white">
              {formatMoney(calculateCartLineSubtotal(item))}
            </span>
          </div>
        ))}
        {remainingItemCount > 0 ? (
          <p className="rounded-[10px] border border-white/10 bg-black/20 px-3 py-2 text-[12px] text-white/48">
            +{remainingItemCount} more{" "}
            {remainingItemCount === 1 ? "item" : "items"} included in this order
          </p>
        ) : null}
      </div>
      <div className="mt-3 space-y-1.5 border-t border-white/10 pt-3 text-[14px]">
        <SummaryLine
          label="Subtotal"
          value={formatMoney(order.totals.subtotalCents)}
        />
        <SummaryLine
          label="Delivery fee"
          value={formatMoney(order.totals.serviceFeeCents)}
        />
        <SummaryLine label="Tax" value={formatMoney(order.totals.taxCents)} />
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="editorial-title text-[19px] uppercase text-white/86">
          Total
        </span>
        <span className="font-mono text-[25px] text-[var(--sb-gold-soft)]">
          {formatMoney(order.totals.totalCents)}
        </span>
      </div>
      <button
        className="red-glow-button mt-3 h-[52px] w-full rounded-[12px] text-[15px] uppercase tracking-[0.08em]"
        onClick={() => {
          window.location.href = "/orders";
        }}
        type="button"
      >
        Track order
        <span className="ml-4" aria-hidden="true">
          <ChevronIcon direction="right" size={18} />
        </span>
      </button>
    </article>
  );
}
