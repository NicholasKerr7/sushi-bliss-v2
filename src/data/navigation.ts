import type { NavigationItem } from "@/types/common";

export const primaryNavigation: NavigationItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/home",
    iconUrl: "/assets/icons/home-icon.png",
  },
  {
    id: "menu",
    label: "Menu",
    href: "/menu",
    iconUrl: "/assets/icons/sushi-menu-icon.png",
  },
  {
    id: "reservations",
    label: "Reservations",
    href: "/reservations",
    iconUrl: "/assets/icons/calendar-icon.png",
  },
  {
    id: "orders",
    label: "Orders",
    href: "/orders",
    iconUrl: "/assets/icons/takeaway-bag-icon.png",
  },
  {
    id: "profile",
    label: "Profile",
    href: "/profile",
    iconUrl: "/assets/icons/user-icon.png",
  },
];

export const primaryNavigationActivePositionClasses: Record<string, string> = {
  home: "left-[10%]",
  menu: "left-[30%]",
  reservations: "left-[50%]",
  orders: "left-[70%]",
  profile: "left-[90%]",
};

export const desktopNavigation: NavigationItem[] = [
  ...primaryNavigation,
  {
    id: "loyalty",
    label: "Loyalty",
    href: "/loyalty",
    iconUrl: "/assets/icons/floral-emblem-icon.png",
  },
  {
    id: "omakase",
    label: "Omakase",
    href: "/omakase",
    iconUrl: "/assets/icons/sushi-menu-icon.png",
  },
  {
    id: "gifts",
    label: "Gifts",
    href: "/gifts",
    iconUrl: "/assets/icons/gift-icon.png",
  },
  {
    id: "offers",
    label: "Offers",
    href: "/offers",
    iconUrl: "/assets/icons/gift-icon.png",
  },
  {
    id: "support",
    label: "Support",
    href: "/support",
    iconUrl: "/assets/icons/headset-icon.png",
  },
  {
    id: "notifications",
    label: "Alerts",
    href: "/notifications",
    iconUrl: "/assets/icons/notification-bell-icon.png",
  },
  {
    id: "about",
    label: "About",
    href: "/about",
    iconUrl: "/assets/icons/lotus-icon.png",
  },
  {
    id: "chefs",
    label: "Chefs",
    href: "/chefs",
    iconUrl: "/assets/icons/chef-hat-icon.png",
  },
];
