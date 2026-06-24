"use client";

import type { ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { pickupLocation } from "@/data/checkout";
import { icons } from "@/features/home/visualHomeData";
import { formatDateTime } from "@/lib/dates";
import { formatMoney } from "@/lib/money";
import type { CartLineItem } from "@/types/order";

import { AgeVerificationNotice } from "./AgeVerificationNotice";
import { TabletCheckoutProgress } from "./TabletCheckoutProgress";
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
    <section className="mt-3 rounded-[20px] border border-white/10 bg-white/[0.035] p-4 min-[900px]:p-5">
      <div className="grid gap-4 min-[900px]:grid-cols-[minmax(0,1fr)_auto] min-[900px]:items-start min-[900px]:gap-5">
        <div className="min-w-0">
          <p className="text-[14px] uppercase tracking-[0.18em] text-[var(--sb-gold-soft)]">
            Checkout
          </p>
          <h1
            className="editorial-title mt-1.5 text-[32px] uppercase leading-none tracking-[0.06em] min-[900px]:text-[36px] min-[900px]:tracking-[0.08em] lg:text-[40px]"
            id="tablet-checkout-title"
          >
            Review & Confirm
          </h1>
          <p className="mt-1 text-[15px] text-[var(--sb-gold-soft)]">
            Almost there! Please review your order details.
          </p>
        </div>
        <Button
          className="min-h-10 w-max shrink-0 whitespace-nowrap px-5 py-2 text-[13px]"
          onClick={onEditCart}
          variant="secondary"
        >
          Back to cart
        </Button>
      </div>

      <TabletCheckoutProgress activeStep={3} />

      <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_360px] min-[1080px]:grid-cols-[minmax(0,1fr)_390px]">
        <div className="space-y-2.5">
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

        <div className="space-y-2.5">
          <TabletCheckoutSummary
            itemCount={itemCount}
            items={items}
            onEditCart={onEditCart}
            onRemoveItem={onRemoveItem}
            onUpdateQuantity={onUpdateQuantity}
            totals={checkout.reviewTotals}
          />
          <AgeVerificationNotice
            items={items}
            onVerifiedChange={checkout.setAgeVerified}
            validationMessage={checkout.validation.ageVerification}
            verified={checkout.ageVerified}
          />
          <div className="rounded-[14px] border border-white/10 bg-white/[0.04] p-3">
            <h2 className="text-[14px] font-semibold uppercase tracking-[0.08em] text-white/72">
              SSL encrypted checkout
            </h2>
            <p className="mt-1 text-[13px] leading-5 text-white/54">
              Your payment information is secure and encrypted.
            </p>
          </div>
        </div>
      </div>

      <Button
        className="red-glow-button mt-3 h-[52px] w-full rounded-[12px] text-[16px] uppercase tracking-[0.08em]"
        disabled={items.length === 0}
        onClick={onPlaceOrder}
      >
        Place order • {formatMoney(checkout.reviewTotals.totalCents)}
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
    <article className="rounded-[14px] border border-white/10 bg-black/22 p-3">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <h2 className="flex min-w-0 items-center gap-2.5 text-[14px] font-semibold uppercase tracking-[0.06em] min-[900px]:text-[15px] min-[900px]:tracking-[0.08em]">
          <span className="grid h-6 w-6 place-items-center rounded-full border border-[var(--sb-gold)]/50 text-[var(--sb-gold-soft)]">
            {number}
          </span>
          <span className="min-w-0 truncate">{title}</span>
        </h2>
        <button
          className="text-[12px] uppercase tracking-[0.06em] text-[var(--sb-gold-soft)] min-[900px]:text-[13px]"
          onClick={action}
          type="button"
        >
          Change
        </button>
      </div>
      <div className="mt-2 grid grid-cols-[21px_minmax(0,1fr)] gap-2.5 text-[13px] leading-5 text-white/68">
        <AssetIcon size={21} src={icon} />
        <div className="min-w-0 break-words">{children}</div>
      </div>
    </article>
  );
}
