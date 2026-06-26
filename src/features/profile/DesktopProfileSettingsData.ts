import type { UserPreferences } from "@/types/user";

export const desktopProfileSidebarItems = [
  {
    id: "overview",
    label: "Account Overview",
    icon: "/assets/icons/user-icon.png",
    action: "back",
  },
  {
    id: "personal",
    label: "Personal Information",
    icon: "/assets/icons/user-icon.png",
    target: "desktop-profile-personal",
  },
  {
    id: "dietary",
    label: "Dietary Preferences",
    icon: "/assets/icons/vegetarian-sushi-icon.webp",
    target: "desktop-profile-dietary",
  },
  {
    id: "privacy",
    label: "Privacy & Security",
    icon: "/assets/icons/chef-crest-icon.png",
    target: "desktop-profile-privacy",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: "/assets/icons/notification-bell-icon.png",
    target: "desktop-profile-notifications",
  },
  {
    id: "payments",
    label: "Payment Methods",
    icon: "/assets/icons/credit-card-icon.png",
    target: "desktop-profile-payments",
  },
  {
    id: "loyalty",
    label: "Loyalty & Rewards",
    icon: "/assets/icons/floral-emblem-icon.png",
    href: "/loyalty",
  },
  {
    id: "orders",
    label: "Order History",
    icon: "/assets/icons/clock-icon.png",
    href: "/orders",
  },
  {
    id: "settings",
    label: "Settings",
    icon: "/assets/icons/user-settings-icon.png",
    target: "desktop-profile-shortcuts",
  },
] as const;

export const desktopProfileDietaryOptions = [
  "No Shellfish",
  "No Pork",
  "No Dairy",
  "Gluten Sensitive",
] as const;

export const desktopProfilePrivacyRows: Array<{
  key: keyof UserPreferences["privacy"];
  label: string;
  description: string;
}> = [
  {
    description: "Receive an alert when a new device signs in.",
    key: "loginAlerts",
    label: "Login alerts",
  },
  {
    description: "Extra sign-in protection for account changes.",
    key: "twoFactorEnabled",
    label: "Two-factor authentication",
  },
  {
    description: "Use dining history to tailor recommendations.",
    key: "personalizedRecommendations",
    label: "Personalized recommendations",
  },
  {
    description: "Let concierge support view dining history when helping you.",
    key: "shareDiningHistory",
    label: "Share dining history",
  },
] as const;

/** Maps loyalty progress into stable Tailwind width classes for the desktop profile meter. */
export function getDesktopProfileProgressWidthClass(progress: number) {
  if (progress >= 90) {
    return "w-[90%]";
  }

  if (progress >= 75) {
    return "w-[75%]";
  }

  if (progress >= 60) {
    return "w-[60%]";
  }

  if (progress >= 45) {
    return "w-[45%]";
  }

  if (progress >= 30) {
    return "w-[30%]";
  }

  return "w-[15%]";
}
