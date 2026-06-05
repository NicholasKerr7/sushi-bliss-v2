export const customerRoutes = [
  { id: "about", label: "About" },
  { id: "chefs", label: "Chefs" },
  { id: "favorites", label: "Favorites" },
  { id: "gifts", label: "Gifts" },
  { id: "home", label: "Home" },
  { id: "locations", label: "Locations" },
  { id: "loyalty", label: "Loyalty" },
  { id: "menu", label: "Menu" },
  { id: "notifications", label: "Notifications" },
  { id: "offers", label: "Offers" },
  { id: "omakase", label: "Omakase" },
  { id: "orders", label: "Orders" },
  { id: "profile", label: "Profile" },
  { id: "reservations", label: "Reservations" },
  { id: "support", label: "Support" },
] as const;

export type CustomerRouteId = (typeof customerRoutes)[number]["id"];

const customerRouteLabels = Object.fromEntries(
  customerRoutes.map((route) => [route.id, route.label]),
) as Record<CustomerRouteId, string>;

export const customerRouteIds = customerRoutes.map((route) => route.id);

/** Narrows arbitrary route params to the supported customer screen set. */
export function isCustomerRouteId(value: string): value is CustomerRouteId {
  return value in customerRouteLabels;
}

export function getCustomerRouteLabel(routeId: CustomerRouteId) {
  return customerRouteLabels[routeId];
}

export function getCustomerRoutePath(routeId: CustomerRouteId) {
  return `/${routeId}`;
}
