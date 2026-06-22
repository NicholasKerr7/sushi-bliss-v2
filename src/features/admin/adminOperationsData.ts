import {
  adminAnalyticsSummary,
  adminLocationRows,
  adminMenuRows,
  adminOfferRows,
  adminRecentOrders,
  adminReservationQueue,
} from "@/data/admin";

export type AdminWorkspaceId =
  | "activity"
  | "analytics"
  | "customers"
  | "locations"
  | "menu"
  | "offers"
  | "orders"
  | "reservations"
  | "settings"
  | "users";

export interface WorkspaceRow {
  detail: string;
  id: string;
  label: string;
  meta: string;
  status: string;
  value: string;
}

export interface WorkspaceSection {
  accent: string;
  description: string;
  hash: string;
  iconUrl: string;
  id: AdminWorkspaceId;
  rows: WorkspaceRow[];
  title: string;
}

const userRows: WorkspaceRow[] = [
  {
    detail: "Full permissions across menu, orders, and analytics.",
    id: "user-hiroshi",
    label: "Hiroshi Tanaka",
    meta: "Super Admin",
    status: "Active",
    value: "All access",
  },
  {
    detail: "Can edit menu items, pricing, and seasonal availability.",
    id: "user-aiko",
    label: "Aiko Nakamura",
    meta: "Menu Manager",
    status: "Active",
    value: "Menu",
  },
  {
    detail: "Handles reservations, seating notes, and guest occasions.",
    id: "user-yuki",
    label: "Yuki Tanaka",
    meta: "Hospitality Lead",
    status: "Active",
    value: "Reservations",
  },
  {
    detail: "Read-only reporting access for weekly revenue reviews.",
    id: "user-finance",
    label: "Finance Review",
    meta: "Analyst",
    status: "Pending",
    value: "Read only",
  },
];

const settingsRows: WorkspaceRow[] = [
  {
    detail: "Online pickup prep time shown to guests at checkout.",
    id: "setting-pickup",
    label: "Pickup lead time",
    meta: "15 minutes",
    status: "Active",
    value: "Service",
  },
  {
    detail: "Delivery ordering blocks restaurant-only beverages.",
    id: "setting-drinks",
    label: "Restaurant-only drinks",
    meta: "Protected",
    status: "Active",
    value: "Compliance",
  },
  {
    detail: "Rewards are issued only after confirmed checkout.",
    id: "setting-loyalty",
    label: "Loyalty awarding",
    meta: "Order complete",
    status: "Active",
    value: "Rewards",
  },
  {
    detail: "Supabase and Stripe remain environment-gated placeholders.",
    id: "setting-backend",
    label: "Backend readiness",
    meta: "Mock mode",
    status: "Scheduled",
    value: "Services",
  },
];

const activityRows: WorkspaceRow[] = [
  {
    detail: "Alex Johnson's dine-in order was closed from the kitchen queue.",
    id: "activity-order",
    label: "#SB-2481 marked completed",
    meta: "10:24 AM",
    status: "Completed",
    value: "Orders",
  },
  {
    detail: "Sashimi Night was prepared for the weekend offer window.",
    id: "activity-offer",
    label: "Offer scheduled",
    meta: "10:18 AM",
    status: "Scheduled",
    value: "Offers",
  },
  {
    detail: "VIP1 table note was updated for a six-guest omakase party.",
    id: "activity-reservation",
    label: "Reservation note updated",
    meta: "9:58 AM",
    status: "Pending",
    value: "Reservations",
  },
  {
    detail: "Osaka branch was flagged for limited operations.",
    id: "activity-location",
    label: "Location maintenance logged",
    meta: "9:32 AM",
    status: "Maintenance",
    value: "Locations",
  },
];

export const workspaceSections: WorkspaceSection[] = [
  {
    accent: "60 items",
    description:
      "Edit catalog health, pricing, category coverage, and item status.",
    hash: "#menu-admin",
    iconUrl: "/assets/icons/sushi-menu-icon.png",
    id: "menu",
    rows: adminMenuRows.map(([label, category, price, status]) => ({
      detail: `${category} item currently listed at ${price}.`,
      id: `menu-${label.toLowerCase().replaceAll(" ", "-")}`,
      label,
      meta: category,
      status,
      value: price,
    })),
    title: "Menu Management",
  },
  {
    accent: "18 active",
    description:
      "Monitor live order status, fulfillment type, and service timing.",
    hash: "#orders-admin",
    iconUrl: "/assets/icons/takeaway-bag-icon.png",
    id: "orders",
    rows: adminRecentOrders.map(
      ([orderId, customer, type, amount, status, time]) => ({
        detail: `${customer} placed a ${type.toLowerCase()} order at ${time}.`,
        id: `order-${orderId.replace("#", "").toLowerCase()}`,
        label: orderId,
        meta: customer,
        status,
        value: amount,
      }),
    ),
    title: "Order Management",
  },
  {
    accent: "42 today",
    description: "Review seating queue, table assignment, and pending parties.",
    hash: "#reservations-admin",
    iconUrl: "/assets/icons/calendar-icon.png",
    id: "reservations",
    rows: adminReservationQueue.map(
      ([time, customer, party, table, status]) => ({
        detail: `${party} guests assigned to table ${table}.`,
        id: `reservation-${time.replaceAll(" ", "-").replace(":", "")}`,
        label: customer,
        meta: time,
        status,
        value: `Table ${table}`,
      }),
    ),
    title: "Reservation Management",
  },
  {
    accent: "12 offers",
    description: "Track active, scheduled, and expired promotions.",
    hash: "#offers-admin",
    iconUrl: "/assets/icons/golden-ticket-icon.png",
    id: "offers",
    rows: adminOfferRows.map(([offer, type, discount, status, validUntil]) => ({
      detail: `${type} discount valid until ${validUntil}.`,
      id: `offer-${offer.toLowerCase().replaceAll(" ", "-")}`,
      label: offer,
      meta: discount,
      status,
      value: validUntil,
    })),
    title: "Offers Management",
  },
  {
    accent: "4 locations",
    description: "Check branch health, order volume, and manager ownership.",
    hash: "#locations-admin",
    iconUrl: "/assets/icons/map-pin-icon.png",
    id: "locations",
    rows: adminLocationRows.map(([location, manager, status, orders]) => ({
      detail: `${manager} manages today's service at this branch.`,
      id: `location-${location.toLowerCase().replaceAll(" ", "-")}`,
      label: location,
      meta: manager,
      status,
      value: `${orders} orders`,
    })),
    title: "Locations Management",
  },
  {
    accent: "5,248 guests",
    description: "Review loyalty health, guest cohorts, and account momentum.",
    hash: "#customers-admin",
    iconUrl: "/assets/icons/group-icon.png",
    id: "customers",
    rows: [
      {
        detail: "Highest lifetime spend and strongest reservation cadence.",
        id: "customer-alex",
        label: "Alex Johnson",
        meta: "Platinum",
        status: "Active",
        value: "$1,248.50",
      },
      {
        detail: "Delivery-first guest with strong loyalty redemption history.",
        id: "customer-emma",
        label: "Emma Williams",
        meta: "Gold",
        status: "Active",
        value: "$892.40",
      },
      {
        detail: "New customer added through a referral code this week.",
        id: "customer-michael",
        label: "Michael Chen",
        meta: "New",
        status: "Pending",
        value: "$45.30",
      },
      {
        detail: "High-value dine-in guest with upcoming omakase interest.",
        id: "customer-sophia",
        label: "Sophia Martinez",
        meta: "Gold",
        status: "Active",
        value: "$1,020.00",
      },
    ],
    title: "Customer Overview",
  },
  {
    accent: "+12.4%",
    description:
      "Scan revenue, conversion, satisfaction, and item performance.",
    hash: "#analytics-admin",
    iconUrl: "/assets/icons/gold-alert-icon.png",
    id: "analytics",
    rows: adminAnalyticsSummary.map((item) => ({
      detail: item.delta,
      id: `analytics-${item.label.toLowerCase().replaceAll(" ", "-")}`,
      label: item.label,
      meta: "This week",
      status: item.delta.includes("+") ? "Active" : "Tracked",
      value: item.value,
    })),
    title: "Analytics Summary",
  },
  {
    accent: "4 users",
    description: "Manage admin access levels and operational ownership.",
    hash: "#users-admin",
    iconUrl: "/assets/icons/user-icon.png",
    id: "users",
    rows: userRows,
    title: "Users & Roles",
  },
  {
    accent: "Mock mode",
    description:
      "Review service toggles prepared for Supabase and Stripe wiring.",
    hash: "#settings-admin",
    iconUrl: "/assets/icons/user-settings-icon.png",
    id: "settings",
    rows: settingsRows,
    title: "System Settings",
  },
  {
    accent: "Live log",
    description:
      "Audit recent operations across orders, offers, and locations.",
    hash: "#activity-admin",
    iconUrl: "/assets/icons/gold-alert-icon.png",
    id: "activity",
    rows: activityRows,
    title: "Activity Logs",
  },
];

export const defaultWorkspaceId: AdminWorkspaceId = "orders";

export function getWorkspaceFromHash(hash: string): AdminWorkspaceId {
  const match = workspaceSections.find((section) => section.hash === hash);

  return match?.id ?? defaultWorkspaceId;
}

export function getWorkspaceSection(id: AdminWorkspaceId) {
  return (
    workspaceSections.find((section) => section.id === id) ??
    workspaceSections[0]
  );
}
