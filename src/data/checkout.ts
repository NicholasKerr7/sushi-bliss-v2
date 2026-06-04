import type { CheckoutPromo } from "@/types/checkout";

export const checkoutPromos: CheckoutPromo[] = [
  {
    code: "BLISS10",
    description: "10% off today's order",
    discountType: "percent",
    value: 10,
  },
  {
    code: "OMAKASE15",
    description: "$15 off premium tasting orders",
    discountType: "fixed",
    value: 1500,
  },
];

export const pickupLocation = {
  label: "Sushi Bliss",
  line1: "88 Kintsugi Lane",
  city: "New York",
  region: "NY",
  postalCode: "10013",
};
