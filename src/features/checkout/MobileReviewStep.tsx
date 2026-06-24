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
  MobileCheckoutActionDock,
  MobileTotalsCard,
  ReviewInfoCard,
  ReviewLine,
  ReviewPromoTip,
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
    <main className="mt-6">
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
          <p className="text-[12px] uppercase tracking-[0.09em] text-[var(--sb-gold-soft)] min-[390px]:text-[13px] min-[390px]:tracking-[0.13em]">
            Delivery notes
          </p>
          <p className="mt-2 break-words text-[14px] leading-6 text-white/66 min-[390px]:text-[15px]">
            {instructions}
          </p>
        </div>
      ) : null}

      <MobileCheckoutActionDock
        disabled={items.length === 0}
        label="Place order"
        meta={`${itemCount} ${itemCount === 1 ? "item" : "items"} · secure checkout`}
        onClick={onPlaceOrder}
        value={formatMoney(checkout.reviewTotals.totalCents)}
      />
    </main>
  );
}
