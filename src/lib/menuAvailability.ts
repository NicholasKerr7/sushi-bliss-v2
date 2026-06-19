import type { MenuItem, MenuOrderMode } from "@/types/menu";

export type MenuOrderActionKind = "cart" | "reservation";

export interface MenuOrderAction {
  badge: string;
  href?: string;
  icon: string;
  intent: "cart" | "liquid-omakase" | "table-service";
  kind: MenuOrderActionKind;
  label: string;
  note: string;
  shortLabel: string;
  title: string;
}

const reservationHref = "/reservations";
export const liquidOmakaseReservationHref =
  "/reservations?intent=liquid-omakase&experience=chef-omakase";

function getOrderMode(item: MenuItem): MenuOrderMode {
  return item.orderMode || "online";
}

function createReservationHref(
  item: MenuItem,
  intent: MenuOrderAction["intent"],
) {
  const params = new URLSearchParams({
    experience: intent === "liquid-omakase" ? "chef-omakase" : "sushi-counter",
    intent,
    item: item.id,
  });

  return `${reservationHref}?${params.toString()}`;
}

function getReservationAction(item: MenuItem): MenuOrderAction {
  const isTableService = getOrderMode(item) === "dine-in";
  const intent = isTableService ? "table-service" : "liquid-omakase";

  return {
    badge: isTableService ? "Table Service" : "Liquid Omakase",
    href: createReservationHref(item, intent),
    icon: isTableService
      ? "/assets/icons/dining-setting-icon.png"
      : "/assets/icons/golden-ticket-icon.png",
    intent,
    kind: "reservation",
    label: isTableService ? "Reserve Table" : "Reserve Pairing",
    note: isTableService
      ? `${item.name} is prepared as a table-side service and is not available for delivery.`
      : `${item.name} is reserved for guided dining-room pairings with paced service and ID-checked handoff.`,
    shortLabel: "Reserve",
    title: isTableService ? "Served at the table" : "Reserve as a pairing",
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
      intent: "cart",
      kind: "cart",
      label: "Add Drink",
      note: "Available for pickup or delivery as a zero-proof or tea selection.",
      shortLabel: "Add",
      title: "Available online",
    };
  }

  return {
    badge: "Online Order",
    icon: "/assets/icons/shopping-cart-icon.png",
    intent: "cart",
    kind: "cart",
    label: "Add to Cart",
    note: "Available for pickup or delivery.",
    shortLabel: "Add",
    title: "Available online",
  };
}
