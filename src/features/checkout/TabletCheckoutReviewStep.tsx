"use client";

import type { ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { pickupLocation } from "@/data/checkout";
import { icons } from "@/features/home/visualHomeData";
import { formatDateTime } from "@/lib/dates";
import { formatMoney } from "@/lib/money";
import type { CartLineItem } from "@/types/order";

import { TabletCheckoutSummary } from "./TabletCheckoutSummary";
import type { TabletCheckoutState } from "./tabletCheckoutTypes";

interface TabletCheckoutReviewStepProps {
  checkout: TabletCheckoutState;
  instructions: string;
  itemCount: number;
  items: CartLineItem[];
  onBackToDetails: () => void;
  onEditCart: () => void;
  onPlaceOrder: () => void;
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export function TabletCheckoutReviewStep({
  checkout,
  instructions,
  itemCount,
  items,
  onBackToDetails,
  onEditCart,
  onPlaceOrder,
  onRemoveItem,
  onUpdateQuantity,
}: TabletCheckoutReviewStepProps) {
  const address = checkout.selectedAddress;
  const payment = checkout.selectedPaymentMethod;

  return (
    <section className="mt-5 rounded-[22px] border border-white/10 bg-white/[0.035] p-8">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-[15px] uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
            Checkout
          </p>
          <h1
            className="editorial-title mt-3 whitespace-nowrap text-[42px] uppercase leading-none tracking-[0.08em] lg:text-[46px]"
            id="tablet-checkout-title"
          >
            Review & Confirm
          </h1>
          <p className="mt-3 text-[17px] text-[var(--sb-gold-soft)]">
            Almost there! Please review your order details.
          </p>
        </div>
        <Button
          className="shrink-0 whitespace-nowrap"
          onClick={onBackToDetails}
          variant="secondary"
        >
          Back to checkout
        </Button>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_390px]">
        <div className="space-y-4">
          <ReviewCard
            action={onBackToDetails}
            icon={icons.location}
            number={1}
            title={
              checkout.mode === "delivery"
                ? "Delivery address"
                : "Pickup location"
            }
          >
            {checkout.mode === "delivery" && address ? (
              <>
                <p>{address.line1}</p>
                <p>
                  {address.city}, {address.region} {address.postalCode}
                </p>
              </>
            ) : (
              <>
                <p>{pickupLocation.label}</p>
                <p>
                  {pickupLocation.line1}, {pickupLocation.city},{" "}
                  {pickupLocation.region} {pickupLocation.postalCode}
                </p>
              </>
            )}
          </ReviewCard>
          <ReviewCard
            action={onBackToDetails}
            icon={icons.clock}
            number={2}
            title="Fulfillment time"
          >
            <p className="text-[var(--sb-red-bright)]">
              {formatDateTime(checkout.selectedTime)}
            </p>
            <p>
              Estimated {checkout.mode === "delivery" ? "delivery" : "pickup"}{" "}
              time
            </p>
          </ReviewCard>
          <ReviewCard
            action={onBackToDetails}
            icon={icons.cart}
            number={3}
            title="Payment method"
          >
            {payment ? (
              <p>
                {payment.brand} ending {payment.last4}
              </p>
            ) : (
              <p>No payment method selected</p>
            )}
            <p>Secure and encrypted payment</p>
          </ReviewCard>
          <ReviewCard
            action={onBackToDetails}
            icon={icons.settings}
            number={4}
            title="Order notes"
          >
            <p>{instructions || "No special instructions added."}</p>
          </ReviewCard>
          {checkout.appliedPromo ? (
            <ReviewCard
              action={onBackToDetails}
              icon={icons.star}
              number={5}
              title="Promo code"
            >
              <p className="text-[var(--sb-wasabi)]">
                {checkout.appliedPromo.code}:{" "}
                {checkout.appliedPromo.description}
              </p>
            </ReviewCard>
          ) : null}
        </div>

        <div className="space-y-4">
          <TabletCheckoutSummary
            itemCount={itemCount}
            items={items}
            onEditCart={onEditCart}
            onRemoveItem={onRemoveItem}
            onUpdateQuantity={onUpdateQuantity}
            totals={checkout.reviewTotals}
          />
          <div className="rounded-[16px] border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-[16px] font-semibold uppercase tracking-[0.08em] text-white/72">
              SSL encrypted checkout
            </h2>
            <p className="mt-2 text-[14px] leading-6 text-white/54">
              Your payment information is secure and encrypted.
            </p>
          </div>
        </div>
      </div>

      <Button
        className="red-glow-button mt-6 h-[64px] w-full rounded-[12px] text-[18px] uppercase tracking-[0.08em]"
        disabled={items.length === 0}
        onClick={onPlaceOrder}
      >
        Place order - {formatMoney(checkout.reviewTotals.totalCents)}
      </Button>
    </section>
  );
}

function ReviewCard({
  action,
  children,
  icon,
  number,
  title,
}: {
  action: () => void;
  children: ReactNode;
  icon?: string;
  number: number;
  title: string;
}) {
  return (
    <article className="rounded-[16px] border border-white/10 bg-black/22 p-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-3 text-[18px] font-semibold uppercase tracking-[0.08em]">
          <span className="grid h-7 w-7 place-items-center rounded-full border border-[var(--sb-gold)]/50 text-[var(--sb-gold-soft)]">
            {number}
          </span>
          {title}
        </h2>
        <button
          className="text-[13px] text-[var(--sb-gold-soft)]"
          onClick={action}
          type="button"
        >
          Change
        </button>
      </div>
      <div className="mt-4 flex gap-4 text-[15px] leading-7 text-white/68">
        <AssetIcon size={28} src={icon} />
        <div>{children}</div>
      </div>
    </article>
  );
}
