import type { AdminNavigationItem } from "@/types/admin";

export const adminNavigation: AdminNavigationItem[] = [
  {
    href: "#overview",
    iconUrl: "/assets/icons/floral-emblem-icon.png",
    id: "overview",
    label: "Overview",
  },
  {
    href: "#menu-admin",
    iconUrl: "/assets/icons/sushi-menu-icon.png",
    id: "menu",
    label: "Menu",
  },
  {
    href: "#orders-admin",
    iconUrl: "/assets/icons/takeaway-bag-icon.png",
    id: "orders",
    label: "Orders",
  },
  {
    href: "#reservations-admin",
    iconUrl: "/assets/icons/calendar-icon.png",
    id: "reservations",
    label: "Reservations",
  },
  {
    href: "#offers-admin",
    iconUrl: "/assets/icons/golden-ticket-icon.png",
    id: "offers",
    label: "Offers",
  },
  {
    href: "#locations-admin",
    iconUrl: "/assets/icons/map-pin-icon.png",
    id: "locations",
    label: "Locations",
  },
  {
    href: "#customers-admin",
    iconUrl: "/assets/icons/group-icon.png",
    id: "customers",
    label: "Customers",
  },
  {
    href: "#analytics-admin",
    iconUrl: "/assets/icons/gold-alert-icon.png",
    id: "analytics",
    label: "Analytics",
  },
];
