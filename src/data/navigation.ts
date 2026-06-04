import type { NavigationItem } from "@/types/common";

export const primaryNavigation: NavigationItem[] = [
  {
    id: "home",
    label: "Home",
    href: "#home",
    iconUrl: "/assets/icons/home-icon.png",
  },
  {
    id: "menu",
    label: "Menu",
    href: "#menu",
    iconUrl: "/assets/icons/sushi-menu-icon.png",
  },
  {
    id: "reservations",
    label: "Reserve",
    href: "#reservations",
    iconUrl: "/assets/icons/calendar-icon.png",
  },
  {
    id: "orders",
    label: "Orders",
    href: "#orders",
    iconUrl: "/assets/icons/takeaway-bag-icon.png",
  },
  {
    id: "profile",
    label: "Profile",
    href: "#profile-preview",
    iconUrl: "/assets/icons/user-icon.png",
  },
];

export const desktopNavigation: NavigationItem[] = [
  ...primaryNavigation,
  {
    id: "support",
    label: "Support",
    href: "#support-preview",
    iconUrl: "/assets/icons/headset-icon.png",
  },
];
