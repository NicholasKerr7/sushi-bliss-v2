"use client";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { pickupLocation } from "@/data/checkout";
import { icons } from "@/features/home/homeDashboardData";
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

      <section className="mt-5 grid grid-cols-[44px_minmax(0,1fr)] gap-3 rounded-[18px] border border-[var(--sb-border)] bg-[radial-gradient(circle_at_18%_0%,rgba(239,47,37,0.2),transparent_34%),linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.018))] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_18px_42px_rgba(0,0,0,0.26)] min-[390px]:grid-cols-[54px_1fr] min-[390px]:gap-4 min-[390px]:p-4">
        <span className="grid h-11 w-11 place-items-center rounded-[14px] border border-[var(--sb-red-bright)]/42 bg-[var(--sb-red)]/20 min-[390px]:h-[54px] min-[390px]:w-[54px]">
          <AssetIcon size={28} src={icons.chef} />
        </span>
        <p className="min-w-0">
          <span className="block text-[11px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)] min-[390px]:text-[12px]">
            Final kitchen check
          </span>
          <span className="mt-1 block text-[14px] leading-5 text-white/74 min-[390px]:text-[16px] min-[390px]:leading-6">
            Confirm handoff, payment, and timing before the chef counter starts
            your order.
          </span>
        </p>
      </section>

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

      <section className="mt-4 rounded-[16px] border border-[var(--sb-border)] bg-white/[0.025] p-2.5 min-[390px]:p-3">
        <div className="grid gap-2.5">
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
