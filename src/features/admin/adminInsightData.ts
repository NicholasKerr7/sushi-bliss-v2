import {
  adminAnalyticsSummary,
  adminCustomerSegments,
  adminLocationRows,
  adminMenuRows,
  adminOfferRows,
  adminRecentOrders,
  adminReservationQueue,
  adminTopMenuItems,
} from "@/data/admin";

export type AdminInsightId =
  | "analytics"
  | "customers"
  | "locations"
  | "menu"
  | "offers"
  | "orders"
  | "reservations";

export interface AdminInsightRecord {
  detail: string;
  id: string;
  imageUrl?: string;
  label: string;
  meta: string;
  status: string;
  value: string;
}

export interface AdminInsightSection {
  accent: string;
  description: string;
  iconUrl: string;
  id: AdminInsightId;
  records: AdminInsightRecord[];
  title: string;
}

export const adminInsightSections: AdminInsightSection[] = [
  {
    accent: "18 active",
    description: "Live fulfillment, guest communication, and timing pressure.",
    iconUrl: "/assets/icons/takeaway-bag-icon.png",
    id: "orders",
    records: adminRecentOrders.map(
      ([orderId, customer, type, amount, status, time]) => ({
        detail: `${type} order placed by ${customer}. Last service update at ${time}.`,
        id: `insight-order-${orderId.replace("#", "").toLowerCase()}`,
        label: orderId,
        meta: customer,
        status,
        value: amount,
      }),
    ),
    title: "Live Orders",
  },
  {
    accent: "5 queue",
    description: "Upcoming parties, seating status, and table readiness.",
    iconUrl: "/assets/icons/calendar-icon.png",
    id: "reservations",
    records: adminReservationQueue.map(
      ([time, customer, partySize, table, status]) => ({
        detail: `${partySize} guests scheduled at ${time}. Table ${table} is assigned.`,
        id: `insight-reservation-${time.replaceAll(" ", "-").replace(":", "")}`,
        label: customer,
        meta: time,
        status,
        value: `Table ${table}`,
      }),
    ),
    title: "Reservation Queue",
  },
  {
    accent: "5 items",
    description: "Menu status, pricing health, and kitchen visibility.",
    iconUrl: "/assets/icons/sushi-menu-icon.png",
    id: "menu",
    records: adminMenuRows.map(([label, category, price, status]) => ({
      detail: `${label} is listed under ${category} at ${price}.`,
      id: `insight-menu-${label.toLowerCase().replaceAll(" ", "-")}`,
      imageUrl:
        adminTopMenuItems.find((item) => item.item === label)?.imageUrl ??
        "/assets/menu/sushi/otoro-nigiri.webp",
      label,
      meta: category,
      status,
      value: price,
    })),
    title: "Menu Control",
  },
  {
    accent: "12 offers",
    description: "Promotion lifecycle, discounts, and upcoming expirations.",
    iconUrl: "/assets/icons/golden-ticket-icon.png",
    id: "offers",
    records: adminOfferRows.map(([offer, type, discount, status, valid]) => ({
      detail: `${type} promotion configured at ${discount}. Valid until ${valid}.`,
      id: `insight-offer-${offer.toLowerCase().replaceAll(" ", "-")}`,
      label: offer,
      meta: discount,
      status,
      value: valid,
    })),
    title: "Offer Control",
  },
  {
    accent: "4 branches",
    description: "Location status, manager coverage, and daily volume.",
    iconUrl: "/assets/icons/map-pin-icon.png",
    id: "locations",
    records: adminLocationRows.map(([location, manager, status, orders]) => ({
      detail: `${manager} owns service execution for this branch today.`,
      id: `insight-location-${location.toLowerCase().replaceAll(" ", "-")}`,
      label: location,
      meta: manager,
      status,
      value: `${orders} orders`,
    })),
    title: "Location Health",
  },
  {
    accent: "5,248 guests",
    description: "Guest segments, loyalty movement, and hospitality focus.",
    iconUrl: "/assets/icons/group-icon.png",
    id: "customers",
    records: [
      {
        detail: "Highest value guest with a strong dine-in cadence.",
        id: "insight-customer-top",
        label: "Alex Johnson",
        meta: "Top customer",
        status: "Active",
        value: "$1,248.50",
      },
      ...adminCustomerSegments.map((segment) => ({
        detail: `${segment.percent} of the customer base is currently in this segment.`,
        id: `insight-customer-${segment.label.toLowerCase().replaceAll(" ", "-")}`,
        label: segment.label,
        meta: segment.percent,
        status: "Tracked",
        value: segment.value,
      })),
    ],
    title: "Customer Signals",
  },
  {
    accent: "+12.4%",
    description: "Performance indicators for revenue, demand, and satisfaction.",
    iconUrl: "/assets/icons/gold-alert-icon.png",
    id: "analytics",
    records: adminAnalyticsSummary.map((item) => ({
      detail: item.delta,
      id: `insight-analytics-${item.label.toLowerCase().replaceAll(" ", "-")}`,
      label: item.label,
      meta: "Current period",
      status: item.delta.includes("+") ? "Active" : "Tracked",
      value: item.value,
    })),
    title: "Analytics Signals",
  },
];

export const defaultInsightId: AdminInsightId = "orders";

export function getInsightSection(id: AdminInsightId) {
  return (
    adminInsightSections.find((section) => section.id === id) ??
    adminInsightSections[0]
  );
}
