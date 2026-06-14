import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { CheckoutAddressSection } from "@/features/checkout/CheckoutAddressSection";
import { featuredAssets } from "@/features/home/visualHomeData";
import { formatDateTime } from "@/lib/dates";
import { formatMoney } from "@/lib/money";
import type { Order } from "@/types/order";

import { DesktopCartPanel } from "./DesktopCartPanel";
import {
  CheckoutStepTitle,
  DesktopAddressSummary,
  DesktopConfirmationOrderSummary,
  DesktopFulfillmentCards,
  DesktopOfferCode,
  DesktopPaymentSummary,
  DesktopReviewInfoCard,
  DesktopReviewTotals,
  DesktopTipButtons,
  ReviewTrustStrip,
  formatCheckoutDate,
  formatCheckoutTime,
  selectNextAddress,
  selectNextPaymentMethod,
} from "./DesktopCheckoutParts";
import type {
  DesktopCartItems as CartItems,
  DesktopCheckoutState as CheckoutState,
} from "./DesktopCheckoutParts";
import { DesktopBenefitStrip } from "./DesktopMenuChrome";
import { InfoCard } from "./DesktopMenuPrimitives";

export function DesktopCheckoutView({
  checkout,
  items,
  onBackToCart,
  onOpenReview,
  onRemoveItem,
  onUpdateQuantity,
}: {
  checkout: CheckoutState;
  items: CartItems;
  onBackToCart: () => void;
  onOpenReview: () => void;
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}) {
  return (
    <main className="mx-auto max-w-[1534px] px-7 pb-5 pt-6">
      <div className="grid grid-cols-[minmax(0,1fr)_412px] items-end gap-5">
        <div>
          <h1 className="editorial-title text-[46px] uppercase tracking-[0.06em]">
            Checkout
          </h1>
          <p className="mt-1 text-[16px] text-[var(--sb-gold-soft)]">
            Almost there. Complete your order.
          </p>
        </div>
        <p className="justify-self-end rounded-full border border-[var(--sb-gold)]/32 px-4 py-2 text-[12px] uppercase tracking-[0.14em] text-white/56">
          Secure order review
        </p>
      </div>

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_412px] gap-5">
        <section className="rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.42)]">
          <CheckoutStepTitle
            accessibleName="Fulfillment"
            number={1}
            title="Delivery or pickup"
          />
          <DesktopFulfillmentCards checkout={checkout} />

          <div className="mt-4 border-t border-white/10 pt-4">
            <CheckoutStepTitle
              action={
                checkout.mode === "delivery" ? (
                  <div className="flex gap-2">
                    <button
                      className="h-9 rounded-full border border-[var(--sb-gold)]/45 px-4 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                      onClick={checkout.startNewAddress}
                      type="button"
                    >
                      Add
                    </button>
                    <button
                      className="h-9 rounded-full border border-white/14 px-4 text-[12px] uppercase tracking-[0.08em] text-white/62 disabled:cursor-not-allowed disabled:opacity-45"
                      disabled={checkout.addresses.length < 2}
                      onClick={() => selectNextAddress(checkout)}
                      type="button"
                    >
                      Change
                    </button>
                  </div>
                ) : null
              }
              number={2}
              title={
                checkout.mode === "delivery"
                  ? "Delivery address"
                  : "Pickup location"
              }
            />
            <DesktopAddressSummary checkout={checkout} />
            {checkout.addressFormOpen ? (
              <div className="mt-3 rounded-[14px] border border-white/12 bg-black/22 p-4">
                <CheckoutAddressSection
                  addressDraft={checkout.addressDraft}
                  addressFormOpen={checkout.addressFormOpen}
                  addresses={checkout.addresses}
                  editingAddressId={checkout.editingAddressId}
                  mode={checkout.mode}
                  onCancelAddressForm={checkout.cancelAddressForm}
                  onSaveAddressDraft={checkout.saveAddressDraft}
                  onSelectAddress={checkout.setSelectedAddressId}
                  onStartEditSelectedAddress={checkout.startEditSelectedAddress}
                  onStartNewAddress={checkout.startNewAddress}
                  onUpdateAddressDraft={checkout.updateAddressDraft}
                  selectedAddressId={checkout.selectedAddressId}
                  validationMessage={checkout.validation.address}
                />
              </div>
            ) : checkout.validation.address ? (
              <p className="mt-2 text-xs text-[var(--sb-red-bright)]">
                {checkout.validation.address}
              </p>
            ) : null}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
            <section>
              <CheckoutStepTitle number={3} title="Date & time" />
              <div className="mt-3 grid grid-cols-2 overflow-hidden rounded-[12px] border border-white/12 bg-black/24">
                <div className="border-r border-white/10 px-4 py-3">
                  <p className="text-[12px] uppercase tracking-[0.1em] text-white/48">
                    Date
                  </p>
                  <p className="mt-2 text-[14px] text-white">
                    {formatCheckoutDate(checkout.selectedTime)}
                  </p>
                </div>
                <div className="px-4 py-3">
                  <p className="text-[12px] uppercase tracking-[0.1em] text-white/48">
                    Time
                  </p>
                  <Select
                    error={checkout.validation.time}
                    id="desktop-checkout-time"
                    label={
                      checkout.mode === "delivery"
                        ? "Delivery time"
                        : "Pickup time"
                    }
                    onChange={(event) =>
                      checkout.setSelectedTime(event.target.value)
                    }
                    options={checkout.timeSlots.map((slot) => ({
                      label: formatCheckoutTime(slot.value),
                      value: slot.value,
                    }))}
                    selectClassName="min-h-0 rounded-none border-0 bg-transparent px-0 py-0 text-[14px] text-white focus:ring-0"
                    value={checkout.selectedTime}
                    wrapperClassName="mt-2 space-y-0 [&_label]:sr-only"
                  />
                </div>
              </div>
            </section>

            <section>
              <CheckoutStepTitle number={4} title="Add a tip" />
              <DesktopTipButtons
                selectedTip={checkout.tipPercent}
                subtotalCents={checkout.reviewTotals.subtotalCents}
                onTipChange={checkout.setTipPercent}
              />
              <p className="mt-2 flex items-center justify-center gap-2 text-[12px] text-white/44">
                <AssetIcon size={14} src="/assets/icons/gift-icon.png" />
                100% of tips go to our team
              </p>
            </section>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
            <section>
              <CheckoutStepTitle
                action={
                  <button
                    className="text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] disabled:cursor-not-allowed disabled:opacity-45"
                    disabled={checkout.paymentMethods.length < 2}
                    onClick={() => selectNextPaymentMethod(checkout)}
                    type="button"
                  >
                    Change
                  </button>
                }
                number={5}
                title="Payment method"
              />
              <DesktopPaymentSummary checkout={checkout} />
            </section>
            <section>
              <CheckoutStepTitle number={6} title="Offer code" />
              <DesktopOfferCode checkout={checkout} />
            </section>
          </div>

          <div className="mt-4 grid grid-cols-[230px_1fr] gap-4 border-t border-white/10 pt-4">
            <button
              className="inline-flex h-[56px] items-center justify-center gap-3 rounded-[12px] border border-[var(--sb-border)] text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:border-[var(--sb-gold)]/54"
              onClick={onBackToCart}
              type="button"
            >
              <ChevronIcon direction="left" size={17} />
              Back to cart
            </button>
            <Button
              className="h-[56px] rounded-[12px] text-[15px] uppercase tracking-[0.08em]"
              onClick={onOpenReview}
            >
              Continue to review
              <span>{formatMoney(checkout.reviewTotals.totalCents)}</span>
            </Button>
          </div>
        </section>
        <DesktopCartPanel
          ctaLabel="Continue to review"
          items={items}
          totals={checkout.reviewTotals}
          onCheckout={onOpenReview}
          onRemove={onRemoveItem}
          onUpdateQuantity={onUpdateQuantity}
        />
      </div>
      <div className="mt-5">
        <DesktopBenefitStrip />
      </div>
    </main>
  );
}

export function DesktopReviewView({
  checkout,
  items,
  onBackToCheckout,
  onPlaceOrder,
  onRemoveItem,
  onUpdateQuantity,
}: {
  checkout: CheckoutState;
  items: CartItems;
  onBackToCheckout: () => void;
  onPlaceOrder: () => void;
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}) {
  return (
    <main className="mx-auto max-w-[1470px] px-7 pb-6 pt-5">
      <section className="rounded-[22px] border border-[var(--sb-border)] bg-[#07090a] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.54)]">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-[14px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
              Review your order
            </p>
            <h1 className="editorial-title mt-2 text-[44px] uppercase leading-none">
              Almost there.
              <span className="block text-[var(--sb-red-bright)]">
                Let&apos;s make it perfect.
              </span>
            </h1>
            <p className="mt-3 text-[15px] text-[var(--sb-gold-soft)]">
              Confirm every detail before placing your order.
            </p>
          </div>
          <button
            className="inline-flex h-11 w-[180px] items-center justify-center gap-3 rounded-[10px] border border-[var(--sb-border)] text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:border-[var(--sb-gold)]/54"
            onClick={onBackToCheckout}
            type="button"
          >
            <ChevronIcon direction="left" size={17} />
            Back to cart
          </button>
        </div>
        <div className="mt-5 grid grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)] gap-5">
          <section className="space-y-4">
            <DesktopCartPanel
              ctaLabel="Edit items"
              items={items}
              showCta={false}
              totals={checkout.reviewTotals}
              onCheckout={onBackToCheckout}
              onRemove={onRemoveItem}
              onUpdateQuantity={onUpdateQuantity}
            />
            <ReviewTrustStrip totalCents={checkout.reviewTotals.totalCents} />
          </section>
          <section className="space-y-4">
            <DesktopReviewInfoCard title="Delivery information">
              {checkout.selectedAddress
                ? `${checkout.selectedAddress.line1}, ${checkout.selectedAddress.city}, ${checkout.selectedAddress.region}`
                : "Pickup at Sushi Bliss counter."}
              <span className="mt-2 block text-[var(--sb-red-bright)]">
                {checkout.selectedTime
                  ? formatDateTime(checkout.selectedTime)
                  : "Selected time"}
              </span>
            </DesktopReviewInfoCard>
            <DesktopReviewInfoCard title="Payment method">
              {checkout.selectedPaymentMethod
                ? `${checkout.selectedPaymentMethod.brand} **** ${checkout.selectedPaymentMethod.last4}`
                : "Select a payment method"}
            </DesktopReviewInfoCard>
            <DesktopReviewTotals checkout={checkout} items={items} />
            <Button
              className="h-[64px] w-full rounded-[12px] text-[16px] uppercase tracking-[0.08em]"
              onClick={onPlaceOrder}
            >
              Place order
              <span>{formatMoney(checkout.reviewTotals.totalCents)}</span>
            </Button>
          </section>
        </div>
      </section>
    </main>
  );
}

export function DesktopConfirmationView({
  order,
  pointsAwarded,
  onBackToMenu,
}: {
  order: Order | null;
  pointsAwarded: number;
  onBackToMenu: () => void;
}) {
  if (!order) {
    return null;
  }

  return (
    <main className="mx-auto max-w-[1530px] px-7 pb-6 pt-4">
      <section className="rounded-[22px] border border-[var(--sb-border)] bg-[#07090a] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.54)]">
        <div className="grid grid-cols-[0.52fr_0.48fr] gap-5">
          <div className="relative min-h-[220px] overflow-hidden rounded-[18px]">
            <Image
              alt=""
              className="object-cover"
              fill
              loading="eager"
              priority
              sizes="760px"
              src={featuredAssets.heroSushi.publicUrl}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.78),rgba(0,0,0,0.12))]" />
            <div className="relative z-10 p-6">
              <h1 className="editorial-title text-[43px] uppercase leading-none">
                Thank you!
                <span className="block text-[var(--sb-red-bright)]">
                  Your order is confirmed
                </span>
              </h1>
              <p className="mt-4 max-w-[360px] text-[16px] leading-7 text-[var(--sb-gold-soft)]">
                We appreciate your order and cannot wait to serve you an
                unforgettable experience.
              </p>
            </div>
          </div>
          <div className="grid place-items-center rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-7 text-center">
            <AssetIcon size={58} src="/assets/icons/check-icon.png" />
            <p className="mt-5 text-[18px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
              Order confirmation
            </p>
            <p className="mt-4 font-mono text-[42px] text-white">
              {order.confirmationCode}
            </p>
            <p className="mt-3 text-[15px] text-white/58">
              {formatDateTime(order.createdAt)}
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-[0.42fr_0.29fr_0.29fr] items-start gap-4">
          <DesktopConfirmationOrderSummary order={order} />
          <div className="grid gap-4">
            <InfoCard title="Estimated delivery">30 - 40 min</InfoCard>
            <InfoCard title="Delivery to">
              {order.deliveryAddress
                ? `${order.deliveryAddress.line1}, ${order.deliveryAddress.city}`
                : "Pickup at Sushi Bliss counter."}
            </InfoCard>
            <InfoCard title="Payment method">
              {order.paymentMethod.brand} **** {order.paymentMethod.last4}
            </InfoCard>
          </div>
          <div className="grid gap-4">
            <InfoCard title="Loyalty points earned">
              +{pointsAwarded} points
            </InfoCard>
            <InfoCard title="Enjoy exclusive perks">
              View membership benefits from your profile.
            </InfoCard>
            <button
              className="h-[58px] rounded-[12px] border border-[var(--sb-border)] text-[14px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
              onClick={onBackToMenu}
              type="button"
            >
              Back to menu
            </button>
          </div>
        </div>
        <div className="mt-5">
          <DesktopBenefitStrip />
        </div>
      </section>
    </main>
  );
}
