"use client";

import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";
import { calculateTipCents, formatMoney } from "@/lib/money";
import type { CartLineItem } from "@/types/order";

import { AgeVerificationNotice } from "./AgeVerificationNotice";
import {
  BillingRow,
  MobileBackButton,
  OrderSummaryDisclosure,
  PaymentChoice,
  SectionTitle,
  SecureInlineCopy,
  StepHeading,
} from "./MobileCheckoutPrimitives";
import type { MobileCheckoutState } from "./mobileCheckoutTypes";

const tipPercentOptions = [10, 15, 20] as const;

export function PaymentStep({
  checkout,
  itemCount,
  items,
  onBack,
  onContinue,
}: {
  checkout: MobileCheckoutState;
  itemCount: number;
  items: CartLineItem[];
  onBack: () => void;
  onContinue: () => void;
}) {
  const billingAddress = checkout.selectedAddress || checkout.addresses[0];

  return (
    <main className="mt-8">
      <MobileBackButton onBack={onBack} />
      <StepHeading
        eyebrow="Checkout"
        subtitle="Choose how you'd like to pay"
        title="Payment method"
      />

      <section className="mt-6 grid gap-3">
        {checkout.paymentMethods.map((payment) => (
          <PaymentChoice
            active={payment.id === checkout.selectedPaymentMethodId}
            key={payment.id}
            onSelect={() => checkout.setSelectedPaymentMethodId(payment.id)}
            payment={payment}
          />
        ))}
        <button
          className="grid min-h-[82px] grid-cols-[72px_1fr_auto] items-center gap-4 rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025] px-4 text-left opacity-70"
          disabled
          title="New cards can be added from profile settings."
          type="button"
        >
          <span className="grid h-[50px] w-[64px] place-items-center rounded-[10px] border border-dashed border-[var(--sb-border-strong)] text-[30px] text-[var(--sb-gold-soft)]">
            +
          </span>
          <span>
            <span className="block text-[19px]">Add new card</span>
            <span className="mt-1 block text-[13px] text-white/50">
              Manage cards in profile settings
            </span>
          </span>
          <ChevronIcon
            className="text-[var(--sb-gold-soft)]"
            direction="right"
            size={20}
          />
        </button>
      </section>

      <section className="mt-7">
        <SectionTitle>Billing details</SectionTitle>
        <div className="mt-3 rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025]">
          <BillingRow
            icon={icons.profile}
            label="Name"
            value={checkout.customerName}
          />
          <BillingRow
            icon={icons.location}
            label="Billing address"
            value={
              billingAddress
                ? `${billingAddress.line1}, ${billingAddress.city}, ${billingAddress.postalCode}`
                : "Billing address on file"
            }
          />
        </div>
        {checkout.validation.payment ? (
          <p className="mt-3 text-[13px] text-[var(--sb-red-bright)]">
            {checkout.validation.payment}
          </p>
        ) : null}
      </section>

      <SecureInlineCopy>
        Your payment information is encrypted and secure.
      </SecureInlineCopy>
      <OrderSummaryDisclosure
        itemCount={itemCount}
        totals={checkout.reviewTotals}
      />
      <PromoAndTipPanel checkout={checkout} />
      <AgeVerificationNotice
        className="mt-4"
        items={items}
        onVerifiedChange={checkout.setAgeVerified}
        validationMessage={checkout.validation.ageVerification}
        verified={checkout.ageVerified}
      />

      <button
        className="red-glow-button mt-5 min-h-[66px] w-full rounded-[14px] text-[17px]"
        onClick={onContinue}
        type="button"
      >
        Continue to review
      </button>
    </main>
  );
}

function PromoAndTipPanel({ checkout }: { checkout: MobileCheckoutState }) {
  return (
    <section className="mt-5 rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025] p-4">
      <label className="block">
        <span className="text-[13px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
          Promo code
        </span>
        <div className="mt-3 grid grid-cols-[1fr_86px] gap-3">
          <input
            className="h-12 rounded-[12px] border border-white/10 bg-black/28 px-4 text-[15px] text-white outline-none placeholder:text-white/35 focus:border-[var(--sb-gold)]"
            onChange={(event) => checkout.setPromoCode(event.target.value)}
            placeholder="BLISS10"
            value={checkout.promoCode}
          />
          <button
            className="rounded-[12px] border border-[var(--sb-gold)]/45 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
            onClick={checkout.applyPromoCode}
            type="button"
          >
            Apply
          </button>
        </div>
      </label>
      {checkout.validation.promo ? (
        <p className="mt-2 text-[12px] text-[var(--sb-red-bright)]">
          {checkout.validation.promo}
        </p>
      ) : checkout.appliedPromo ? (
        <p className="mt-2 text-[12px] text-[var(--sb-wasabi)]">
          {checkout.appliedPromo.description}
        </p>
      ) : null}

      <div className="mt-5 border-t border-white/10 pt-4">
        <SectionTitle>Add a tip</SectionTitle>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {tipPercentOptions.map((option) => (
            <button
              aria-pressed={checkout.tipPercent === option}
              className={classNames(
                "min-h-[58px] rounded-[12px] border text-center",
                checkout.tipPercent === option
                  ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/20"
                  : "border-white/10 bg-black/22 text-white/70",
              )}
              key={option}
              onClick={() => checkout.setTipPercent(option)}
              type="button"
            >
              <span className="block text-[15px]">{option}%</span>
              <span className="mt-1 block font-mono text-[12px] text-white/50">
                {formatMoney(
                  calculateTipCents(
                    checkout.reviewTotals.subtotalCents,
                    option,
                  ),
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
