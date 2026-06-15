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
  {
    code: "SAVOR20",
    description: "20% off qualifying menu orders over $60",
    discountType: "percent",
    value: 20,
  },
  {
    code: "LUNCH10",
    description: "10% off chef-selected lunch orders",
    discountType: "percent",
    value: 10,
  },
  {
    code: "TUNAROLL",
    description: "Complimentary spicy tuna roll credit",
    discountType: "fixed",
    value: 1800,
  },
  {
    code: "BIRTHDAY",
    description: "Complimentary birthday dessert credit",
    discountType: "fixed",
    value: 1200,
  },
  {
    code: "WEEKEND15",
    description: "15% off weekend pickup and delivery orders",
    discountType: "percent",
    value: 15,
  },
];

export const pickupLocation = {
  label: "Sushi Bliss",
  line1: "88 Kintsugi Lane",
  city: "New York",
  region: "NY",
  postalCode: "10013",
};
