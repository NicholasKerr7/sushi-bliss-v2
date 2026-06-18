"use client";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { pickupLocation } from "@/data/checkout";
import { icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";
import { formatDateTime } from "@/lib/dates";
import { calculateTipCents, formatMoney } from "@/lib/money";
import type { FulfillmentMode } from "@/types/common";
import type { CartLineItem } from "@/types/order";

import {
  AddressChoice,
  BillingRow,
  MemberBenefitsCard,
  MobileBackButton,
  MobileSelectionCard,
  MobileTextInput,
  MobileTotalsCard,
  OrderSummaryDisclosure,
  PaymentChoice,
  ReviewInfoCard,
  ReviewLine,
  ReviewPromoTip,
  SectionTitle,
  SecureCheckoutNote,
  SecureInlineCopy,
  StepHeading,
} from "./MobileCheckoutPrimitives";
import type { MobileCheckoutState } from "./mobileCheckoutTypes";

const fulfillmentOptions: Array<{
  description: string;
  icon: string | undefined;
  label: string;
  value: FulfillmentMode;
}> = [
  {
    description: "We'll bring your sushi straight to your door.",
    icon: icons.location,
    label: "Delivery",
    value: "delivery",
  },
  {
    description: "Pick up your order from Sushi Bliss.",
    icon: icons.bag,
    label: "Pickup",
    value: "pickup",
  },
];

const tipPercentOptions = [10, 15, 20] as const;

export function FulfillmentStep({
  checkout,
  itemCount,
  onContinue,
  onSummaryOpenChange,
  summaryOpen,
}: {
  checkout: MobileCheckoutState;
  itemCount: number;
  onContinue: () => void;
  onSummaryOpenChange: (open: boolean) => void;
  summaryOpen: boolean;
}) {
  return (
    <main className="mt-12">
      <StepHeading
        subtitle="How would you like to receive your order?"
        title="Checkout"
      />

      <section className="mt-6 grid gap-4" aria-label="Fulfillment method">
        {fulfillmentOptions.map((option) => (
          <button
            aria-pressed={checkout.mode === option.value}
            className={classNames(
              "grid min-h-[118px] grid-cols-[90px_1fr_38px] items-center gap-4 rounded-[17px] border px-4 text-left transition",
              checkout.mode === option.value
                ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/10 shadow-[0_0_26px_rgb(239_47_37_/_0.22)]"
                : "border-[var(--sb-border-strong)] bg-white/[0.025]",
            )}
            key={option.value}
            onClick={() => checkout.setMode(option.value)}
            type="button"
          >
            <span className="grid h-[78px] w-[78px] place-items-center rounded-full border border-[var(--sb-border-strong)] bg-black/22">
              <AssetIcon size={42} src={option.icon} />
            </span>
            <span>
              <span className="editorial-title block text-[27px] leading-none">
                {option.label}
              </span>
              <span className="mt-3 block text-[17px] leading-7 text-white/62">
                {option.description}
              </span>
            </span>
            <SelectionDot active={checkout.mode === option.value} />
          </button>
        ))}
      </section>

      <section className="mt-5 grid gap-3">
        <label className="grid min-h-[74px] grid-cols-[48px_1fr] items-center gap-4 rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025] px-4 transition focus-within:border-[var(--sb-gold)]/58 focus-within:shadow-[0_0_24px_rgba(215,168,79,0.12)]">
          <AssetIcon size={32} src={icons.clock} />
          <span className="relative block min-w-0">
            <span className="block text-[13px] uppercase tracking-[0.13em] text-[var(--sb-gold-soft)]">
              Scheduled time
            </span>
            <select
              aria-label="Scheduled time"
              className="mt-1 h-10 w-full appearance-none bg-transparent pr-8 text-[18px] font-semibold text-white outline-none"
              onChange={(event) => checkout.setSelectedTime(event.target.value)}
              value={checkout.selectedTime}
            >
              {checkout.timeSlots.map((slot) => (
                <option
                  className="bg-[#050607] text-white"
                  key={slot.id}
                  value={slot.value}
                >
                  {slot.label}
                </option>
              ))}
            </select>
            <ChevronIcon
              className="pointer-events-none absolute bottom-1 right-0 text-[var(--sb-gold)] drop-shadow-[0_0_10px_rgba(215,168,79,0.32)]"
              direction="down"
              size={20}
            />
          </span>
        </label>

        <button
          aria-expanded={summaryOpen}
          className="grid min-h-[74px] grid-cols-[48px_1fr_auto] items-center gap-4 rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025] px-4 text-left"
          onClick={() => onSummaryOpenChange(!summaryOpen)}
          type="button"
        >
          <AssetIcon size={32} src={icons.bag} />
          <span>
            <span className="block text-[13px] uppercase tracking-[0.13em] text-[var(--sb-gold-soft)]">
              View order summary
            </span>
            <span className="mt-1 block text-[18px] text-white/72">
              {itemCount} {itemCount === 1 ? "item" : "items"} -{" "}
              {formatMoney(checkout.reviewTotals.totalCents)}
            </span>
          </span>
          <ChevronIcon
            className="text-[var(--sb-gold-soft)]"
            direction={summaryOpen ? "up" : "down"}
            size={20}
          />
        </button>
      </section>

      {summaryOpen ? (
        <MobileTotalsCard className="mt-4" totals={checkout.reviewTotals} />
      ) : null}

      <MemberBenefitsCard className="mt-5" totals={checkout.reviewTotals} />

      <button
        className="red-glow-button mt-7 min-h-[66px] w-full rounded-[14px] text-[17px]"
        onClick={onContinue}
        type="button"
      >
        Continue
      </button>
      <SecureCheckoutNote />
    </main>
  );
}

export function AddressStep({
  checkout,
  instructions,
  onBack,
  onContinue,
  onInstructionsChange,
}: {
  checkout: MobileCheckoutState;
  instructions: string;
  onBack: () => void;
  onContinue: () => void;
  onInstructionsChange: (value: string) => void;
}) {
  const selectedAddress = checkout.selectedAddress;

  return (
    <main className="mt-8">
      <MobileBackButton onBack={onBack} />
      <StepHeading eyebrow="Checkout" title="Delivery address" />

      {checkout.mode === "pickup" ? (
        <MobileSelectionCard
          active
          icon={icons.bag}
          label="Pickup location"
          title={pickupLocation.label}
        >
          <p>
            {pickupLocation.line1}, {pickupLocation.city},{" "}
            {pickupLocation.region} {pickupLocation.postalCode}
          </p>
        </MobileSelectionCard>
      ) : (
        <>
          {selectedAddress ? (
            <AddressChoice
              active
              address={selectedAddress}
              label="Default address"
              onSelect={() => checkout.setSelectedAddressId(selectedAddress.id)}
            />
          ) : null}

          <button
            className="mt-4 flex min-h-[62px] w-full items-center justify-center gap-4 rounded-[15px] border border-[var(--sb-border-strong)] bg-white/[0.025] text-[15px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]"
            onClick={checkout.startNewAddress}
            type="button"
          >
            <span className="text-[30px] leading-none">+</span>
            Add new address
          </button>

          {checkout.addressFormOpen ? (
            <MobileAddressForm checkout={checkout} />
          ) : null}
        </>
      )}

      <section className="mt-7">
        <SectionTitle>Delivery instructions</SectionTitle>
        <label className="mt-3 block rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025] p-4">
          <span className="sr-only">Delivery instructions</span>
          <textarea
            className="min-h-[108px] w-full resize-none bg-transparent text-[16px] leading-6 text-white outline-none placeholder:text-white/40"
            maxLength={120}
            onChange={(event) => onInstructionsChange(event.target.value)}
            placeholder="e.g., Leave at the door, call upon arrival, etc."
            value={instructions}
          />
          <span className="block text-right text-[13px] text-white/46">
            {instructions.length}/120
          </span>
        </label>
      </section>

      {checkout.mode === "delivery" ? (
        <section className="mt-7">
          <div className="flex items-center justify-between gap-4">
            <SectionTitle>Saved addresses</SectionTitle>
            <span className="text-[14px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]">
              View all
            </span>
          </div>
          <div className="mt-3 grid gap-3">
            {checkout.addresses
              .filter((address) => address.id !== checkout.selectedAddressId)
              .slice(0, 2)
              .map((address) => (
                <AddressChoice
                  address={address}
                  key={address.id}
                  onSelect={() => checkout.setSelectedAddressId(address.id)}
                />
              ))}
          </div>
          {checkout.validation.address ? (
            <p className="mt-3 text-[13px] text-[var(--sb-red-bright)]">
              {checkout.validation.address}
            </p>
          ) : null}
        </section>
      ) : null}

      <SecureInlineCopy>All addresses are securely saved</SecureInlineCopy>
      <button
        className="red-glow-button mt-7 min-h-[66px] w-full rounded-[14px] text-[17px]"
        onClick={onContinue}
        type="button"
      >
        Continue to payment
      </button>
    </main>
  );
}

export function PaymentStep({
  checkout,
  itemCount,
  onBack,
  onContinue,
}: {
  checkout: MobileCheckoutState;
  itemCount: number;
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

function MobileAddressForm({ checkout }: { checkout: MobileCheckoutState }) {
  return (
    <section className="mt-4 rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025] p-4">
      <h2 className="text-[15px] font-semibold uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]">
        Add address
      </h2>
      <div className="mt-4 grid gap-3">
        <MobileTextInput
          label="Label"
          onChange={(value) => checkout.updateAddressDraft("label", value)}
          placeholder="Home"
          value={checkout.addressDraft.label}
        />
        <MobileTextInput
          label="Street"
          onChange={(value) => checkout.updateAddressDraft("line1", value)}
          placeholder="120 Sakura Street"
          value={checkout.addressDraft.line1}
        />
        <MobileTextInput
          label="City"
          onChange={(value) => checkout.updateAddressDraft("city", value)}
          placeholder="Tokyo"
          value={checkout.addressDraft.city}
        />
        <div className="grid grid-cols-2 gap-3">
          <MobileTextInput
            label="State"
            onChange={(value) => checkout.updateAddressDraft("region", value)}
            placeholder="NY"
            value={checkout.addressDraft.region}
          />
          <MobileTextInput
            label="Postal"
            onChange={(value) =>
              checkout.updateAddressDraft("postalCode", value)
            }
            placeholder="10013"
            value={checkout.addressDraft.postalCode}
          />
        </div>
      </div>
      {checkout.validation.address ? (
        <p className="mt-3 text-[13px] text-[var(--sb-red-bright)]">
          {checkout.validation.address}
        </p>
      ) : null}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          className="h-11 rounded-[12px] border border-[var(--sb-gold)]/45 text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
          onClick={() => checkout.saveAddressDraft()}
          type="button"
        >
          Save
        </button>
        <button
          className="h-11 rounded-[12px] border border-white/12 text-[13px] uppercase tracking-[0.08em] text-white/64"
          onClick={checkout.cancelAddressForm}
          type="button"
        >
          Cancel
        </button>
      </div>
    </section>
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

function SelectionDot({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={classNames(
        "grid h-[30px] w-[30px] place-items-center rounded-full border",
        active
          ? "border-[var(--sb-red-bright)]"
          : "border-[var(--sb-border-strong)]",
      )}
    >
      {active ? (
        <span className="h-[15px] w-[15px] rounded-full bg-[var(--sb-red-bright)]" />
      ) : null}
    </span>
  );
}
