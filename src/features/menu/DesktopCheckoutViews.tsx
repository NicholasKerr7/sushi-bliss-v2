import Image from "next/image";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { CheckoutAddressSection } from "@/features/checkout/CheckoutAddressSection";
import { AgeVerificationNotice } from "@/features/checkout/AgeVerificationNotice";
import { brand, icons } from "@/features/home/visualHomeData";
import { getTabletPresentationImage } from "@/lib/assets";
import { formatDateTime, formatTime } from "@/lib/dates";
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
    <main className="mx-auto max-w-[1534px] px-7 pb-4 pt-5">
      <div className="grid grid-cols-[minmax(0,1fr)_380px] items-end gap-5 min-[1500px]:grid-cols-[minmax(0,1fr)_412px]">
        <div>
          <h1 className="editorial-title text-[42px] uppercase tracking-[0.06em]">
            Checkout
          </h1>
          <p className="mt-1 text-[15px] text-[var(--sb-gold-soft)]">
            Almost there. Complete your order.
          </p>
        </div>
        <p className="justify-self-end rounded-full border border-[var(--sb-gold)]/32 px-4 py-2 text-[12px] uppercase tracking-[0.14em] text-white/56">
          Secure order review
        </p>
      </div>

      <div className="mt-3 grid grid-cols-[minmax(0,1fr)_380px] gap-5 min-[1500px]:grid-cols-[minmax(0,1fr)_412px]">
        <section className="rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-3.5 shadow-[0_24px_80px_rgba(0,0,0,0.42)]">
          <CheckoutStepTitle
            accessibleName="Fulfillment"
            number={1}
            title="Delivery or pickup"
          />
          <DesktopFulfillmentCards checkout={checkout} />

          <div className="mt-3 border-t border-white/10 pt-3">
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
              <div className="mt-2.5 rounded-[14px] border border-white/12 bg-black/22 p-3.5">
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

          <div className="mt-3 grid gap-3 border-t border-white/10 pt-3 min-[1380px]:grid-cols-2">
            <section>
              <CheckoutStepTitle number={3} title="Date & time" />
              <div className="mt-2.5 grid grid-cols-2 overflow-hidden rounded-[12px] border border-white/12 bg-black/24">
                <div className="border-r border-white/10 px-3.5 py-2.5">
                  <p className="text-[12px] uppercase tracking-[0.1em] text-white/48">
                    Date
                  </p>
                  <p className="mt-1.5 text-[13px] text-white">
                    {formatCheckoutDate(checkout.selectedTime)}
                  </p>
                </div>
                <div className="px-3.5 py-2.5">
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
                    selectClassName="min-h-0 rounded-none border-0 bg-transparent px-0 py-0 text-[13px] text-white focus:ring-0"
                    value={checkout.selectedTime}
                    wrapperClassName="mt-1.5 space-y-0 [&_label]:sr-only"
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
              <p className="mt-1.5 flex items-center justify-center gap-2 text-[12px] text-white/44">
                <AssetIcon size={14} src="/assets/icons/gift-icon.png" />
                100% of tips go to our team
              </p>
            </section>
          </div>

          <div className="mt-3 grid gap-3 border-t border-white/10 pt-3 min-[1380px]:grid-cols-2">
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

          <AgeVerificationNotice
            className="mt-3"
            items={items}
            onVerifiedChange={checkout.setAgeVerified}
            validationMessage={checkout.validation.ageVerification}
            verified={checkout.ageVerified}
          />

          <div className="mt-3 grid grid-cols-[190px_minmax(0,1fr)] gap-3 border-t border-white/10 pt-3 min-[1500px]:grid-cols-[218px_1fr]">
            <button
              className="inline-flex h-[52px] items-center justify-center gap-2 rounded-[12px] border border-[var(--sb-border)] text-[11px] uppercase tracking-[0.06em] text-[var(--sb-gold-soft)] transition hover:border-[var(--sb-gold)]/54 min-[1500px]:gap-3 min-[1500px]:text-[12px] min-[1500px]:tracking-[0.08em]"
              onClick={onBackToCart}
              type="button"
            >
              <ChevronIcon direction="left" size={17} />
              Back to cart
            </button>
            <Button
              className="h-[52px] rounded-[12px] px-3 text-[13px] uppercase tracking-[0.06em] min-[1500px]:text-[14px] min-[1500px]:tracking-[0.08em]"
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
      <div className="mt-4">
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
  const primaryItem = items[0]?.menuItem;
  const heroImage = primaryItem
    ? getTabletPresentationImage(primaryItem)
    : "/assets/menu/sushi/deluxe-toro-caviar-nigiri.webp";
  const destinationCopy = checkout.selectedAddress
    ? `${checkout.selectedAddress.line1}, ${checkout.selectedAddress.city}, ${checkout.selectedAddress.region}`
    : "Pickup at Sushi Bliss counter.";

  return (
    <main className="mx-auto max-w-[1470px] px-7 pb-5 pt-4">
      <section className="rounded-[22px] border border-[var(--sb-border)] bg-[#07090a] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.54)]">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-[13px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
              Review your order
            </p>
            <h1 className="editorial-title mt-1.5 text-[40px] uppercase leading-none">
              Almost there.
              <span className="block text-[var(--sb-red-bright)]">
                Let&apos;s make it perfect.
              </span>
            </h1>
            <p className="mt-2 text-[14px] text-[var(--sb-gold-soft)]">
              Confirm every detail before placing your order.
            </p>
          </div>
          <button
            className="inline-flex h-10 w-[190px] items-center justify-center gap-3 rounded-[10px] border border-[var(--sb-border)] text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:border-[var(--sb-gold)]/54"
            onClick={onBackToCheckout}
            type="button"
          >
            <ChevronIcon direction="left" size={17} />
            Back to checkout
          </button>
        </div>
        <section className="relative mt-4 min-h-[168px] overflow-hidden rounded-[18px] border border-white/10 bg-black">
          <Image
            alt={primaryItem?.image.alt || "Sushi Bliss checkout review"}
            className="object-cover"
            fill
            loading="eager"
            priority
            sizes="1430px"
            src={heroImage}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92),rgba(0,0,0,0.62)_55%,rgba(0,0,0,0.18)),radial-gradient(circle_at_20%_18%,rgba(239,47,37,0.24),transparent_32%)]" />
          <div className="relative z-10 grid min-h-[168px] grid-cols-[minmax(0,1fr)_auto] items-end gap-5 p-5">
            <div className="min-w-0 self-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-[var(--sb-red-bright)]/42 bg-[var(--sb-red)]/20 px-3 py-1 text-[11px] uppercase tracking-[0.1em] text-[var(--sb-red-bright)]">
                <AssetIcon size={16} src={icons.chef} />
                Final kitchen check
              </span>
              <p className="mt-4 max-w-[560px] text-[18px] leading-7 text-[var(--sb-gold-soft)]">
                Confirm handoff, payment, and timing before Sushi Bliss starts
                the chef counter ticket.
              </p>
            </div>
            <div className="grid w-[420px] grid-cols-2 gap-3">
              <DesktopReviewSignal
                label={checkout.mode === "delivery" ? "Handoff" : "Pickup"}
                value={destinationCopy}
              />
              <DesktopReviewSignal
                label="Scheduled"
                value={
                  checkout.selectedTime
                    ? formatDateTime(checkout.selectedTime)
                    : "Selected time"
                }
              />
            </div>
          </div>
        </section>
        <div className="mt-4 grid grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)] gap-4">
          <section className="space-y-3">
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
          <section className="space-y-3">
            <DesktopReviewInfoCard
              icon={icons.location}
              title={
                checkout.mode === "delivery"
                  ? "Delivery information"
                  : "Pickup information"
              }
            >
              {destinationCopy}
              <span className="mt-2 block text-[var(--sb-red-bright)]">
                {checkout.selectedTime
                  ? formatDateTime(checkout.selectedTime)
                  : "Selected time"}
              </span>
            </DesktopReviewInfoCard>
            <DesktopReviewInfoCard icon={icons.cart} title="Payment method">
              {checkout.selectedPaymentMethod
                ? `${checkout.selectedPaymentMethod.brand} **** ${checkout.selectedPaymentMethod.last4}`
                : "Select a payment method"}
            </DesktopReviewInfoCard>
            <AgeVerificationNotice
              items={items}
              onVerifiedChange={checkout.setAgeVerified}
              validationMessage={checkout.validation.ageVerification}
              verified={checkout.ageVerified}
            />
            <DesktopReviewTotals checkout={checkout} items={items} />
            <Button
              className="h-[58px] w-full rounded-[12px] text-[15px] uppercase tracking-[0.08em]"
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

function DesktopReviewSignal({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-[14px] border border-white/10 bg-black/54 p-3 backdrop-blur">
      <p className="text-[11px] uppercase tracking-[0.12em] text-white/44">
        {label}
      </p>
      <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-white/74">
        {value}
      </p>
    </div>
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

  const primaryItem = order.items[0]?.menuItem;
  const heroImage = primaryItem
    ? getTabletPresentationImage(primaryItem)
    : "/assets/menu/sushi/deluxe-toro-caviar-nigiri.webp";
  const fulfillmentCopy =
    order.mode === "delivery" ? "Estimated delivery" : "Ready for pickup";
  const destinationCopy =
    order.mode === "delivery" && order.deliveryAddress
      ? `${order.deliveryAddress.line1}, ${order.deliveryAddress.city}, ${order.deliveryAddress.region} ${order.deliveryAddress.postalCode}`
      : "Pickup at Sushi Bliss counter.";
  const isDelivery = order.mode === "delivery";
  const handoffMap = isDelivery
    ? "/assets/maps/tokyo-delivery-route-tracker.webp"
    : "/assets/maps/tokyo-city-map-with-sushi-markers.webp";
  const handoffTitle = isDelivery ? "Live delivery handoff" : "Pickup handoff";
  const handoffCopy = isDelivery
    ? order.courier
      ? `${order.courier.name} is assigned for a sealed delivery handoff.`
      : "Courier assignment starts once the kitchen seals your order."
    : "Your order will be held under your profile name at the pickup counter.";
  const etaCopy = isDelivery
    ? order.courier
      ? `${order.courier.etaMinutes} min`
      : "Live"
    : formatTime(order.fulfillmentAt);
  const itemCount = order.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <main className="mx-auto max-w-[1530px] px-7 pb-6 pt-4">
      <section className="rounded-[22px] border border-[var(--sb-border)] bg-[#07090a] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.54)]">
        <div className="grid grid-cols-[0.52fr_0.48fr] gap-5">
          <div className="relative min-h-[256px] overflow-hidden rounded-[18px] border border-white/10">
            <Image
              alt={primaryItem?.image.alt || "Sushi Bliss confirmed order"}
              className="object-cover"
              fill
              loading="eager"
              priority
              sizes="760px"
              src={heroImage}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.9),rgba(0,0,0,0.58)_50%,rgba(0,0,0,0.08))]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(239,47,37,0.22),transparent_30%),radial-gradient(circle_at_82%_22%,rgba(215,168,79,0.16),transparent_34%)]" />
            <div className="relative z-10 flex h-full flex-col justify-between p-6">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--sb-red-bright)]/42 bg-[var(--sb-red)]/20 px-3 py-1 text-[11px] uppercase tracking-[0.1em] text-[var(--sb-red-bright)]">
                  <AssetIcon size={16} src={icons.chef} />
                  Kitchen ticket sent
                </span>
                <h1 className="editorial-title mt-4 text-[43px] uppercase leading-none">
                  Thank you!
                  <span className="block text-[var(--sb-red-bright)]">
                    Your order is confirmed
                  </span>
                </h1>
                <p className="mt-4 max-w-[430px] text-[16px] leading-7 text-[var(--sb-gold-soft)]">
                  {primaryItem
                    ? `${primaryItem.name} is queued with the chef counter.`
                    : "Your order is queued with the chef counter."}
                </p>
              </div>
              <DesktopConfirmationStatusStrip mode={order.mode} />
            </div>
          </div>
          <div className="grid place-items-center rounded-[18px] border border-[var(--sb-border)] bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.018)_58%,rgba(0,0,0,0.28))] p-7 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <span className="relative grid h-[88px] w-[88px] place-items-center rounded-full border border-[var(--sb-gold)]/62 bg-black/44 shadow-[0_0_34px_rgba(215,168,79,0.22)]">
              <AssetIcon
                className="rounded-full"
                loading="eager"
                size={58}
                src={brand.assets.floralEmblem.publicUrl}
              />
              <span className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full border border-[var(--sb-red-bright)] bg-black shadow-[0_0_18px_rgba(239,47,37,0.56)]">
                <AssetIcon size={18} src="/assets/icons/check-icon.png" />
              </span>
            </span>
            <p className="mt-5 text-[18px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
              Order confirmation
            </p>
            <p className="mt-4 font-mono text-[42px] text-white">
              {order.confirmationCode}
            </p>
            <p className="mt-3 text-[15px] text-white/58">
              {formatDateTime(order.createdAt)}
            </p>
            <div className="mt-6 grid w-full grid-cols-3 gap-3">
              <DesktopConfirmationMetric
                label="Items"
                value={itemCount.toString()}
              />
              <DesktopConfirmationMetric
                label={isDelivery ? "ETA" : "Pickup"}
                value={etaCopy}
              />
              <DesktopConfirmationMetric
                label="Total"
                value={formatMoney(order.totals.totalCents)}
              />
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-[0.42fr_0.27fr_0.31fr] items-start gap-4">
          <DesktopConfirmationOrderSummary order={order} />
          <div className="grid gap-4">
            <InfoCard title={fulfillmentCopy}>
              {formatDateTime(order.fulfillmentAt)}
            </InfoCard>
            <InfoCard
              title={order.mode === "delivery" ? "Delivery to" : "Pickup at"}
            >
              {destinationCopy}
            </InfoCard>
            <InfoCard title="Payment method">
              {order.paymentMethod.brand} **** {order.paymentMethod.last4}
            </InfoCard>
          </div>
          <div className="grid gap-4">
            <DesktopConfirmationHandoffPanel
              copy={handoffCopy}
              destination={destinationCopy}
              eta={etaCopy}
              image={handoffMap}
              title={handoffTitle}
            />
            <InfoCard title="Loyalty points earned">
              +{pointsAwarded} points
            </InfoCard>
            <Button
              className="red-glow-button h-[58px] rounded-[12px] text-[14px] uppercase tracking-[0.08em]"
              href="/orders"
            >
              Track order
              <ChevronIcon direction="right" size={18} />
            </Button>
            <Button
              className="h-[52px] rounded-[12px] border-[var(--sb-border)] text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
              onClick={onBackToMenu}
              variant="secondary"
            >
              Back to menu
            </Button>
          </div>
        </div>
        <div className="mt-5">
          <DesktopBenefitStrip />
        </div>
      </section>
    </main>
  );
}

function DesktopConfirmationMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <p className="min-w-0 rounded-[12px] border border-white/10 bg-black/26 px-2.5 py-3">
      <span className="block truncate text-[10px] uppercase tracking-[0.12em] text-white/42">
        {label}
      </span>
      <span className="mt-1 block truncate font-mono text-[15px] text-[var(--sb-gold-soft)]">
        {value}
      </span>
    </p>
  );
}

function DesktopConfirmationHandoffPanel({
  copy,
  destination,
  eta,
  image,
  title,
}: {
  copy: string;
  destination: string;
  eta: string;
  image: string;
  title: string;
}) {
  return (
    <section className="relative min-h-[214px] overflow-hidden rounded-[16px] border border-[var(--sb-border)] bg-black">
      <Image
        alt=""
        className="object-cover opacity-82"
        fill
        sizes="460px"
        src={image}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.22),rgba(0,0,0,0.82)),radial-gradient(circle_at_74%_22%,rgba(239,47,37,0.26),transparent_34%)]" />
      <div className="relative z-10 flex min-h-[214px] flex-col justify-between p-4">
        <div className="flex items-start justify-between gap-3">
          <p className="min-w-0">
            <span className="block text-[12px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
              {title}
            </span>
            <span className="mt-2 block line-clamp-2 text-[14px] leading-5 text-white/74">
              {copy}
            </span>
          </p>
          <span className="shrink-0 rounded-[12px] border border-[var(--sb-red-bright)]/42 bg-black/72 px-3 py-2 text-center font-mono text-[14px] text-[var(--sb-red-bright)] shadow-[0_0_18px_rgba(239,47,37,0.3)]">
            {eta}
          </span>
        </div>
        <div className="grid grid-cols-[38px_minmax(0,1fr)] items-center gap-3 rounded-[13px] border border-white/10 bg-black/62 p-3 backdrop-blur">
          <span className="grid h-[38px] w-[38px] place-items-center rounded-full border border-[var(--sb-gold)]/28 bg-[var(--sb-gold)]/10">
            <AssetIcon size={22} src={icons.location} />
          </span>
          <p className="min-w-0">
            <span className="block text-[10px] uppercase tracking-[0.12em] text-white/42">
              Destination
            </span>
            <span className="mt-1 block truncate text-[13px] text-white/72">
              {destination}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

function DesktopConfirmationStatusStrip({ mode }: { mode: Order["mode"] }) {
  const steps = [
    { active: true, icon: icons.star, label: "Confirmed" },
    { active: false, icon: icons.chef, label: "Preparing" },
    {
      active: false,
      icon: mode === "delivery" ? icons.location : icons.bag,
      label: mode === "delivery" ? "Handoff" : "Pickup",
    },
  ] as const;

  return (
    <ol className="relative isolate grid max-w-[520px] grid-cols-3 rounded-[14px] border border-white/10 bg-black/34 p-3 backdrop-blur">
      <span
        aria-hidden="true"
        className="absolute left-[16.666%] right-[16.666%] top-[34px] h-[6px] overflow-hidden rounded-full border border-white/[0.05] bg-black/62 shadow-[inset_0_0_10px_rgba(0,0,0,0.72)]"
      >
        <span className="absolute inset-y-[2px] left-2 right-2 rounded-full bg-white/10" />
        <span className="absolute inset-y-[1px] left-0 w-[18%] rounded-full bg-[var(--sb-red-bright)] shadow-[0_0_16px_rgba(239,47,37,0.62)]" />
      </span>
      {steps.map((step) => (
        <li
          aria-current={step.active ? "step" : undefined}
          className="relative z-10 flex flex-col items-center gap-2 text-center"
          key={step.label}
        >
          <span
            className={`grid h-11 w-11 place-items-center rounded-full border bg-black/72 ${
              step.active
                ? "border-[var(--sb-red-bright)] shadow-[0_0_18px_rgba(239,47,37,0.38)]"
                : "border-white/16"
            }`}
          >
            <AssetIcon size={22} src={step.icon} />
          </span>
          <span
            className={`text-[11px] uppercase tracking-[0.08em] ${
              step.active ? "text-[var(--sb-red-bright)]" : "text-white/50"
            }`}
          >
            {step.label}
          </span>
        </li>
      ))}
    </ol>
  );
}
