import { checkoutPromos } from "@/data/checkout";
import { formatDateTime } from "@/lib/dates";
import type { CheckoutOrderInput } from "@/types/checkout";
import type { FulfillmentMode } from "@/types/common";
import type { CartLineItem, Order } from "@/types/order";

const PICKUP_LEAD_MINUTES = 25;
const DELIVERY_LEAD_MINUTES = 50;
const SLOT_INTERVAL_MINUTES = 15;
const SLOT_COUNT = 8;

/** Builds near-term fulfillment windows for pickup and delivery checkout. */
export function getCheckoutTimeSlots(mode: FulfillmentMode, now = new Date()) {
  const leadMinutes =
    mode === "delivery" ? DELIVERY_LEAD_MINUTES : PICKUP_LEAD_MINUTES;
  const firstSlot = new Date(now);
  firstSlot.setMinutes(
    Math.ceil((firstSlot.getMinutes() + leadMinutes) / SLOT_INTERVAL_MINUTES) *
      SLOT_INTERVAL_MINUTES,
    0,
    0,
  );

  return Array.from({ length: SLOT_COUNT }, (_, index) => {
    const slot = new Date(firstSlot);
    slot.setMinutes(firstSlot.getMinutes() + index * SLOT_INTERVAL_MINUTES);

    return {
      id: `slot-${slot.getTime()}`,
      label: formatDateTime(slot),
      value: slot.toISOString(),
    };
  });
}

/** Normalizes a promo code and returns a configured mock promo when valid. */
export function findCheckoutPromo(code: string) {
  const normalizedCode = code.trim().toUpperCase();

  return checkoutPromos.find((promo) => promo.code === normalizedCode);
}

/** Converts an applied promo into an integer-cent discount. */
export function calculatePromoDiscount(
  subtotalCents: number,
  code: string,
): number {
  const promo = findCheckoutPromo(code);

  if (!promo) {
    return 0;
  }

  if (promo.discountType === "percent") {
    return Math.round(subtotalCents * (promo.value / 100));
  }

  return Math.min(promo.value, subtotalCents);
}

/** Generates a readable confirmation code for mock orders. */
export function createConfirmationCode(date = new Date()): string {
  const datePart = date
    .toISOString()
    .slice(2, 10)
    .replaceAll("-", "")
    .toUpperCase();
  const randomPart = Math.random().toString(36).slice(2, 6).toUpperCase();

  return `SB-${datePart}-${randomPart}`;
}

/** Creates the confirmed order payload that later order-tracking screens can read. */
export function createOrderFromCheckout(
  items: CartLineItem[],
  input: CheckoutOrderInput,
): Order {
  const createdAt = new Date();

  return {
    confirmationCode: createConfirmationCode(createdAt),
    createdAt: createdAt.toISOString(),
    customer: {
      email: input.customerEmail,
      name: input.customerName,
      phone: input.customerPhone,
    },
    ageVerification: input.ageVerification,
    deliveryAddress: input.mode === "delivery" ? input.address : undefined,
    fulfillmentAt: input.fulfillmentAt,
    id: `order-${createdAt.getTime()}`,
    items,
    mode: input.mode,
    paymentMethod: input.paymentMethod,
    promoCode: input.promo?.code,
    status: "confirmed",
    totals: input.totals,
  };
}
