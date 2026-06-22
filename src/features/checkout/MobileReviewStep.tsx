"use client";

import { pickupLocation } from "@/data/checkout";
import { icons } from "@/features/home/visualHomeData";
import { formatDateTime } from "@/lib/dates";
import { formatMoney } from "@/lib/money";
import type { CartLineItem } from "@/types/order";

import { AgeVerificationNotice } from "./AgeVerificationNotice";
import {
  MemberBenefitsCard,
  MobileBackButton,
  MobileTotalsCard,
  ReviewInfoCard,
  ReviewLine,
  ReviewPromoTip,
  SecureCheckoutNote,
  StepHeading,
} from "./MobileCheckoutPrimitives";
import type { MobileCheckoutState } from "./mobileCheckoutTypes";

export function ReviewStep({
  checkout,
  instructions,
  itemCount,
  items,
  onBack,
  onEditAddress,
  onEditPayment,
  onEditSchedule,
  onPlaceOrder,
  onRemoveItem,
}: {
  checkout: MobileCheckoutState;
  instructions: string;
  itemCount: number;
  items: CartLineItem[];
  onBack: () => void;
  onEditAddress: () => void;
  onEditPayment: () => void;
  onEditSchedule: () => void;
  onPlaceOrder: () => void;
  onRemoveItem: (id: string) => void;
}) {
  const address = checkout.selectedAddress;
  const payment = checkout.selectedPaymentMethod;

  return (
    <main className="mt-8">
      <MobileBackButton onBack={onBack} />
      <StepHeading
        subtitle="Almost there! Please review your order details."
        title="Review your order"
      />

      <div className="mt-5 grid gap-3">
        <ReviewInfoCard
          icon={checkout.mode === "delivery" ? icons.location : icons.bag}
          label={
            checkout.mode === "delivery"
              ? "Delivery address"
              : "Pickup location"
          }
          onEdit={onEditAddress}
          title={
            checkout.mode === "delivery"
              ? address?.label || "Delivery address"
              : pickupLocation.label
          }
        >
          {checkout.mode === "delivery" && address ? (
            <>
              <p>
                {address.line1}
                {address.line2 ? `, ${address.line2}` : ""}
              </p>
              <p>
                {address.city}, {address.region} {address.postalCode}
              </p>
            </>
          ) : (
            <p>
              {pickupLocation.line1}, {pickupLocation.city},{" "}
              {pickupLocation.region} {pickupLocation.postalCode}
            </p>
          )}
        </ReviewInfoCard>
        <ReviewInfoCard
          icon={icons.clock}
          label="Scheduled time"
          onEdit={onEditSchedule}
          title={formatDateTime(checkout.selectedTime)}
        />
        <ReviewInfoCard
          icon={icons.cart}
          label="Payment method"
          onEdit={onEditPayment}
          title={
            payment
              ? `${payment.brand} .... ${payment.last4}`
              : "No payment selected"
          }
        />
      </div>

      <section className="mt-4 rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025] p-3">
        <div className="divide-y divide-white/10">
          {items.map((item) => (
            <ReviewLine item={item} key={item.id} onRemoveItem={onRemoveItem} />
          ))}
        </div>
      </section>

      <MobileTotalsCard
        className="mt-4"
        itemCount={itemCount}
        totals={checkout.reviewTotals}
      />
      <MemberBenefitsCard className="mt-4" totals={checkout.reviewTotals} />
      <ReviewPromoTip checkout={checkout} />
      <AgeVerificationNotice
        className="mt-4"
        items={items}
        onVerifiedChange={checkout.setAgeVerified}
        validationMessage={checkout.validation.ageVerification}
        verified={checkout.ageVerified}
      />

      {instructions ? (
        <div className="mt-4 rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025] p-4">
          <p className="text-[13px] uppercase tracking-[0.13em] text-[var(--sb-gold-soft)]">
            Delivery notes
          </p>
          <p className="mt-2 text-[15px] leading-6 text-white/66">
            {instructions}
          </p>
        </div>
      ) : null}

      <button
        className="red-glow-button mt-5 min-h-[66px] w-full rounded-[14px] text-[16px]"
        disabled={items.length === 0}
        onClick={onPlaceOrder}
        type="button"
      >
        Place order - {formatMoney(checkout.reviewTotals.totalCents)}
      </button>
      <SecureCheckoutNote />
    </main>
  );
}
