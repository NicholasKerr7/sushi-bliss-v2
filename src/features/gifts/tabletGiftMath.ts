import type { GiftExperience } from "@/types/gift";

export const TABLET_GIFT_QUANTITY = 2;
export const TABLET_GIFT_SERVICE_FEE_CENTS = 1080;
export const TABLET_GIFT_TAX_RATE = 0.08;

export function getTabletGiftTotals(gift: GiftExperience) {
  const subtotalCents = gift.priceCents * TABLET_GIFT_QUANTITY;
  const taxCents = Math.round(
    (subtotalCents + TABLET_GIFT_SERVICE_FEE_CENTS) * TABLET_GIFT_TAX_RATE,
  );

  return {
    quantity: TABLET_GIFT_QUANTITY,
    serviceFeeCents: TABLET_GIFT_SERVICE_FEE_CENTS,
    subtotalCents,
    taxCents,
    totalCents: subtotalCents + TABLET_GIFT_SERVICE_FEE_CENTS + taxCents,
  };
}
