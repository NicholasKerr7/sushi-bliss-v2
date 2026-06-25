import { pickupLocation } from "@/data/checkout";
import { icons } from "@/features/home/homeDashboardData";
import type { Order } from "@/types/order";

export const tabletConfirmationBenefits = [
  { active: true, icon: icons.star, label: "Confirmed", value: "Received" },
  {
    active: false,
    icon: icons.crown,
    label: "Kitchen",
    value: "Preparing",
  },
  {
    active: false,
    icon: icons.chef,
    label: "Track",
    value: "Live updates",
  },
  {
    active: false,
    icon: icons.bag,
    label: "Rewards",
    value: "Points added",
  },
] as const;

export function getTabletOrderDestinationLines(order: Order): string[] {
  if (order.mode === "delivery" && order.deliveryAddress) {
    return [
      order.deliveryAddress.line1,
      order.deliveryAddress.line2,
      `${order.deliveryAddress.city}, ${order.deliveryAddress.region} ${order.deliveryAddress.postalCode}`,
      order.customer.phone,
    ].filter((line): line is string => Boolean(line));
  }

  return [
    pickupLocation.label,
    pickupLocation.line1,
    `${pickupLocation.city}, ${pickupLocation.region} ${pickupLocation.postalCode}`,
    order.customer.phone,
  ];
}
