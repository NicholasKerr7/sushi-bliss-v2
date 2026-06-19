import type { MenuItem, MenuOrderMode } from "@/types/menu";

export type MenuOrderActionKind = "cart" | "reservation";

export interface MenuOrderAction {
  badge: string;
  href?: string;
  icon: string;
  kind: MenuOrderActionKind;
  label: string;
  note: string;
  shortLabel: string;
}

const reservationHref = "/reservations";

function getOrderMode(item: MenuItem): MenuOrderMode {
  return item.orderMode || "online";
}

function getReservationAction(item: MenuItem): MenuOrderAction {
  const isTableService = getOrderMode(item) === "dine-in";

  return {
    badge: isTableService ? "Dine-In Only" : "Restaurant Exclusive",
    href: reservationHref,
    icon: "/assets/icons/calendar-icon.png",
    kind: "reservation",
    label: isTableService ? "Reserve Table" : "Reserve Pairing",
    note: isTableService
      ? `${item.name} is prepared as a table-side service and is not available for delivery.`
      : `${item.name} is reserved for dine-in pairings until age verification and alcohol fulfillment are available online.`,
    shortLabel: isTableService ? "Reserve" : "Pairing",
  };
}

/** Returns whether the item may be placed in the online cart today. */
export function isMenuItemOnlineOrderable(item: MenuItem): boolean {
  return getOrderMode(item) === "online";
}

/** Centralizes cart/reservation CTA copy so every menu surface stays consistent. */
export function getMenuItemOrderAction(item: MenuItem): MenuOrderAction {
  if (!isMenuItemOnlineOrderable(item)) {
    return getReservationAction(item);
  }

  if (item.itemType === "drink") {
    return {
      badge: "Online Drink",
      icon: "/assets/icons/shopping-cart-icon.png",
      kind: "cart",
      label: "Add Drink",
      note: "Available for pickup or delivery as a zero-proof or tea selection.",
      shortLabel: "Add",
    };
  }

  return {
    badge: "Online Order",
    icon: "/assets/icons/shopping-cart-icon.png",
    kind: "cart",
    label: "Add to Cart",
    note: "Available for pickup or delivery.",
    shortLabel: "Add",
  };
}
