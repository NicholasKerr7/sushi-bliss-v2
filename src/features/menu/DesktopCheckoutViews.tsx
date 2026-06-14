import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { CheckoutAddressSection } from "@/features/checkout/CheckoutAddressSection";
import { CheckoutModeSelector } from "@/features/checkout/CheckoutModeSelector";
import { CheckoutPaymentSection } from "@/features/checkout/CheckoutPaymentSection";
import { CheckoutPromoSection } from "@/features/checkout/CheckoutPromoSection";
import { CheckoutReview } from "@/features/checkout/CheckoutReview";
import { featuredAssets } from "@/features/home/visualHomeData";
import type { useCart } from "@/hooks/useCart";
import type { useCheckout } from "@/hooks/useCheckout";
import { formatDateTime } from "@/lib/dates";
import { formatMoney } from "@/lib/money";
import type { Order } from "@/types/order";

import { DesktopCartPanel } from "./DesktopCartPanel";
import { DesktopBenefitStrip } from "./DesktopMenuChrome";
import { InfoCard, TipSelector } from "./DesktopMenuPrimitives";

type CheckoutState = ReturnType<typeof useCheckout>;
type CartItems = ReturnType<typeof useCart>["items"];

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
    <main className="mx-auto max-w-[1534px] px-7 pb-6 pt-8">
      <h1 className="editorial-title text-[46px] uppercase tracking-[0.06em]">
        Checkout
      </h1>
      <p className="mt-1 text-[16px] text-[var(--sb-gold-soft)]">
        Almost there. Complete your order.
      </p>
      <div className="mt-5 grid grid-cols-[minmax(0,1fr)_412px] gap-5">
        <section className="space-y-6 rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-5">
          <CheckoutModeSelector
            mode={checkout.mode}
            onModeChange={checkout.setMode}
          />
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
          <div className="grid grid-cols-2 gap-4">
            <Select
              error={checkout.validation.time}
              id="desktop-checkout-time"
              label={
                checkout.mode === "delivery" ? "Delivery time" : "Pickup time"
              }
              onChange={(event) => checkout.setSelectedTime(event.target.value)}
              options={checkout.timeSlots.map((slot) => ({
                label: slot.label,
                value: slot.value,
              }))}
              value={checkout.selectedTime}
            />
            <TipSelector
              selectedTip={checkout.tipPercent}
              subtotalCents={checkout.reviewTotals.subtotalCents}
              onTipChange={checkout.setTipPercent}
            />
          </div>
          <CheckoutPaymentSection
            onSelectPaymentMethod={checkout.setSelectedPaymentMethodId}
            paymentMethods={checkout.paymentMethods}
            selectedPaymentMethodId={checkout.selectedPaymentMethodId}
            validationMessage={checkout.validation.payment}
          />
          <CheckoutPromoSection
            appliedPromo={checkout.appliedPromo}
            onApplyPromoCode={checkout.applyPromoCode}
            onClearPromoCode={checkout.clearPromoCode}
            onPromoCodeChange={checkout.setPromoCode}
            promoCode={checkout.promoCode}
            validationMessage={checkout.validation.promo}
          />
          <div className="grid grid-cols-[230px_1fr] gap-4 pt-2">
            <button
              className="h-[56px] rounded-[12px] border border-[var(--sb-border)] text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
              onClick={onBackToCart}
              type="button"
            >
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
    <main className="mx-auto max-w-[1470px] px-7 pb-6 pt-8">
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
        </div>
        <button
          className="h-11 w-[180px] rounded-[10px] border border-[var(--sb-border)] text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
          onClick={onBackToCheckout}
          type="button"
        >
          Back to cart
        </button>
      </div>
      <div className="mt-6 grid grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)] gap-5">
        <section className="space-y-4">
          <DesktopCartPanel
            ctaLabel="Edit items"
            disabled
            items={items}
            totals={checkout.reviewTotals}
            onRemove={onRemoveItem}
            onUpdateQuantity={onUpdateQuantity}
          />
          <div className="rounded-[16px] border border-[var(--sb-border)] bg-white/[0.035] p-5">
            <h2 className="editorial-title text-[18px] uppercase text-[var(--sb-gold-soft)]">
              Bliss rewards
            </h2>
            <p className="mt-2 text-[14px] text-white/64">
              You will earn {Math.floor(checkout.reviewTotals.totalCents / 100)}{" "}
              Bliss Points with this order.
            </p>
          </div>
        </section>
        <section className="space-y-4">
          <InfoCard title="Delivery information">
            {checkout.selectedAddress
              ? `${checkout.selectedAddress.line1}, ${checkout.selectedAddress.city}, ${checkout.selectedAddress.region}`
              : "Pickup at Sushi Bliss counter."}
            <span className="mt-2 block text-[var(--sb-red-bright)]">
              {checkout.selectedTime
                ? formatDateTime(checkout.selectedTime)
                : "Selected time"}
            </span>
          </InfoCard>
          <InfoCard title="Payment method">
            {checkout.selectedPaymentMethod
              ? `${checkout.selectedPaymentMethod.brand} **** ${checkout.selectedPaymentMethod.last4}`
              : "Select a payment method"}
          </InfoCard>
          <CheckoutReview
            fulfillmentAt={checkout.selectedTime}
            items={items}
            mode={checkout.mode}
            totals={checkout.reviewTotals}
          />
          <Button
            className="h-[64px] w-full rounded-[12px] text-[16px] uppercase tracking-[0.08em]"
            onClick={onPlaceOrder}
          >
            Place order
            <span>{formatMoney(checkout.reviewTotals.totalCents)}</span>
          </Button>
        </section>
      </div>
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
      <section className="rounded-[22px] border border-[var(--sb-border)] bg-[#07090a] p-8 shadow-[0_28px_90px_rgba(0,0,0,0.54)]">
        <div className="grid grid-cols-[0.52fr_0.48fr] gap-6">
          <div className="relative min-h-[260px] overflow-hidden rounded-[18px]">
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
            <div className="relative z-10 p-8">
              <h1 className="editorial-title text-[48px] uppercase leading-none">
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
        <div className="mt-5 grid grid-cols-[0.42fr_0.29fr_0.29fr] gap-4">
          <DesktopCartPanel
            ctaLabel="Track order"
            items={order.items}
            totals={order.totals}
            onCheckout={() => {
              window.location.href = "/orders";
            }}
          />
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
