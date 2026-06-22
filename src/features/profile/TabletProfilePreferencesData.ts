import { locations } from "@/data/locations";
import { icons } from "@/features/home/visualHomeData";
import type { PaymentMethod, UserPreferences } from "@/types/user";

export const tabletDietaryOptions = [
  "No Preference",
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Dairy-Free",
  "Nut Allergy",
  "Pescatarian",
  "Keto",
  "Other",
] as const;

export const tabletDiningRows = [
  {
    detail: "2 Guests",
    icon: "/assets/icons/group-icon.png",
    label: "Default Party Size",
  },
  {
    detail: locations[2]?.name || "Sushi Bliss Downtown",
    icon: icons.location,
    label: "Preferred Location",
  },
  {
    detail: "Counter Seating",
    icon: "/assets/icons/dining-setting-icon.png",
    label: "Preferred Seating",
  },
  {
    detail: "Birthdays, Anniversaries",
    icon: "/assets/icons/gift-icon.png",
    label: "Special Occasions",
  },
] as const;

export const tabletSupportRows = [
  {
    description: "Browse FAQs and guides",
    href: "/support",
    icon: "/assets/icons/headset-icon.png",
    label: "Help Center",
  },
  {
    description: "Get help from our team",
    href: "/support",
    icon: "/assets/icons/phone-icon.png",
    label: "Contact Support",
  },
  {
    description: "Help us improve your experience",
    href: "/support",
    icon: "/assets/icons/email-icon.png",
    label: "Send Feedback",
  },
  {
    description: "Let us know if something is wrong",
    href: "/support",
    icon: "/assets/icons/gold-alert-icon.png",
    label: "Report an Issue",
  },
] as const;

export const tabletNotificationRows: Array<{
  description: string;
  key: keyof UserPreferences["notifications"];
  label: string;
}> = [
  {
    description: "Receive updates about your orders",
    key: "orderUpdates",
    label: "Order Confirmations",
  },
  {
    description: "Get reminders for upcoming reservations",
    key: "reservationReminders",
    label: "Reservation Reminders",
  },
  {
    description: "Receive exclusive offers and updates",
    key: "offerAlerts",
    label: "Special Offers & Promotions",
  },
  {
    description: "Be the first to know about new arrivals",
    key: "conciergeMessages",
    label: "New Menu Items",
  },
  {
    description: "Points balance and reward alerts",
    key: "rewardAlerts",
    label: "Bliss Rewards Updates",
  },
];

export const tabletPrivacyRows = [
  ["Profile Visibility", "Manage what others see", "Private"],
  ["Data & Privacy", "Manage your data and permissions", ""],
  ["Marketing Preferences", "Manage how we use your data", ""],
] as const;

export const tabletAccountManagementRows = [
  ["Change Password", "Password reset request prepared."],
  ["Download My Data", "Account export prepared for download."],
] as const;

export function getTabletCardLabel(paymentMethod: PaymentMethod) {
  if (paymentMethod.brand === "American Express") {
    return "AMEX";
  }

  return paymentMethod.brand;
}

export function getTabletCardClassName(paymentMethod: PaymentMethod) {
  if (paymentMethod.brand === "Visa") {
    return "text-white";
  }

  if (paymentMethod.brand === "Mastercard") {
    return "text-[#f3a425]";
  }

  return "text-[#3aa6ff]";
}

export function formatTabletExpiryDate(value: string) {
  const [year, month] = value.split("-");

  if (!year || !month) {
    return value;
  }

  return `${month}/${year.slice(-2)}`;
}
