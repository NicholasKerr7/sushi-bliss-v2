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

export const customerRouteIds = customerRoutes.map((route) => route.id);

export function getCustomerRoutePath(routeId: CustomerRouteId) {
  return `/${routeId}`;
}
