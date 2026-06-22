import { icons } from "@/features/home/visualHomeData";
import type { PaymentMethod, UserProfile } from "@/types/user";

export const tabletProfileQuickActions = [
  {
    href: "/reservations",
    icon: icons.calendar,
    label: "Make a reservation",
    primary: true,
  },
  { href: "/menu", icon: icons.bag, label: "Order online", primary: false },
  { href: "/loyalty", icon: icons.star, label: "View loyalty", primary: false },
  {
    href: "/loyalty",
    icon: "/assets/icons/qr-code-icon.png",
    label: "Scan to earn",
    primary: false,
  },
  {
    href: "/gifts",
    icon: "/assets/icons/gift-icon.png",
    label: "Gift cards",
    primary: false,
  },
] as const;

export const tabletProfileActivityItems = [
  {
    amount: "+350 pts",
    icon: "/assets/icons/crossed-knives-icon.png",
    label: "Sushi Bliss Downtown",
    meta: "Dinner for 2 - May 20, 2024",
    tone: "positive",
  },
  {
    amount: "-1,000 pts",
    icon: "/assets/icons/gift-icon.png",
    label: "Reward Redeemed",
    meta: "Spicy Tuna Roll",
    tone: "negative",
  },
  {
    amount: "+250 pts",
    icon: "/assets/icons/crossed-knives-icon.png",
    label: "Lunch at Sushi Bliss",
    meta: "May 15, 2024",
    tone: "positive",
  },
  {
    amount: "+500 pts",
    icon: icons.star,
    label: "Bonus Points",
    meta: "Birthday Reward",
    tone: "positive",
  },
] as const;

export const tabletProfileSettingsLinks = [
  {
    description: "Manage your personal details",
    icon: icons.profile,
    label: "Account Information",
  },
  {
    description: "Manage your privacy settings",
    icon: "/assets/icons/chef-crest-icon.png",
    label: "Privacy & Security",
  },
  {
    description: "Customize how we reach you",
    icon: icons.bell,
    label: "Notifications",
  },
  {
    description: "View billing history and manage payments",
    icon: icons.cart,
    label: "Payment & Billing",
  },
] as const;

export function formatTabletProfileAddress(
  address: UserProfile["addresses"][number],
) {
  return [
    address.line1,
    address.line2,
    address.city,
    `${address.region} ${address.postalCode}`,
  ]
    .filter(Boolean)
    .join(", ");
}

export function getTabletPaymentCardLabel(paymentMethod: PaymentMethod) {
  if (paymentMethod.brand === "American Express") {
    return "AMEX";
  }

  return paymentMethod.brand;
}

export function getTabletPaymentCardClassName(paymentMethod: PaymentMethod) {
  if (paymentMethod.brand === "Visa") {
    return "bg-[#123fb4] text-white";
  }

  if (paymentMethod.brand === "Mastercard") {
    return "bg-[linear-gradient(90deg,#e2181d_0_48%,#f59b22_52%_100%)] text-transparent";
  }

  return "bg-[#1478c8] text-white";
}

export function getTabletProfileProgressCells(progress: number) {
  const filledCells = Math.max(0, Math.min(Math.round(progress / 10), 10));

  return Array.from({ length: 10 }, (_, index) => index < filledCells);
}

/** Builds the compact reservation date labels used by the tablet profile card. */
export function getTabletReservationDateSummary(startsAt?: string) {
  const date = startsAt ? new Date(startsAt) : null;

  if (!date || Number.isNaN(date.getTime())) {
    return {
      day: "--",
      month: "TBD",
      time: "Time TBD",
      weekday: "--",
    };
  }

  return {
    day: new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat("en-US", { month: "short" }).format(date),
    time: new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
    }).format(date),
    weekday: new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
      date,
    ),
  };
}
