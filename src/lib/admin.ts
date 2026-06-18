import { locations } from "@/data/locations";
import { mockLoyaltyAccount, mockUser } from "@/data/mockUser";
import { mockOrders } from "@/data/orders";
import { getMockReservations } from "@/data/reservations";
import { formatMoney } from "@/lib/money";
import type { AdminCustomerSummary, AdminMetric } from "@/types/admin";
import type { Order } from "@/types/order";
import type { Reservation } from "@/types/reservation";

/** Builds deterministic admin metrics from the current mock data layer. */
export function getAdminMetrics(): AdminMetric[] {
  const reservations = getMockReservations();
  const revenueCents = mockOrders.reduce(
    (total, order) => total + order.totals.totalCents,
    0,
  );
  const activeOrders = mockOrders.filter(
    (order) => order.status !== "completed" && order.status !== "cancelled",
  );
  const upcomingReservations = reservations.filter(
    (reservation) => reservation.status !== "cancelled",
  );

  return [
    {
      detail: "Mock order revenue",
      iconUrl: "/assets/icons/golden-ticket-icon.png",
      id: "revenue",
      label: "Revenue",
      tone: "premium",
      value: formatMoney(revenueCents),
    },
    {
      detail: "Needs kitchen or courier attention",
      iconUrl: "/assets/icons/takeaway-bag-icon.png",
      id: "active-orders",
      label: "Active orders",
      tone: activeOrders.length > 0 ? "warning" : "success",
      value: String(activeOrders.length),
    },
    {
      detail: "Confirmed or modified bookings",
      iconUrl: "/assets/icons/calendar-icon.png",
      id: "reservations",
      label: "Reservations",
      tone: "success",
      value: String(upcomingReservations.length),
    },
    {
      detail: "Dining rooms in the directory",
      iconUrl: "/assets/icons/map-pin-icon.png",
      id: "locations",
      label: "Locations",
      tone: "neutral",
      value: String(locations.length),
    },
  ];
}

/** Groups mock orders by status for simple operational summaries. */
export function getOrderStatusCounts(orders: Order[] = mockOrders) {
  return orders.reduce<Record<Order["status"], number>>(
    (counts, order) => ({
      ...counts,
      [order.status]: counts[order.status] + 1,
    }),
    {
      cancelled: 0,
      completed: 0,
      confirmed: 0,
      draft: 0,
      "out-for-delivery": 0,
      preparing: 0,
      ready: 0,
    },
  );
}

/** Groups mock reservations by status for admin dashboard readouts. */
export function getReservationStatusCounts(
  reservations: Reservation[] = getMockReservations(),
) {
  return reservations.reduce<Record<Reservation["status"], number>>(
    (counts, reservation) => ({
      ...counts,
      [reservation.status]: counts[reservation.status] + 1,
    }),
    {
      cancelled: 0,
      confirmed: 0,
      modified: 0,
    },
  );
}

/** Creates the current customer overview row from mock profile and loyalty data. */
export function getAdminCustomerSummaries(): AdminCustomerSummary[] {
  const reservations = getMockReservations();

  return [
    {
      email: mockUser.email,
      id: mockUser.id,
      lifetimeOrders: mockOrders.length,
      name: mockUser.name,
      openReservations: reservations.filter(
        (reservation) => reservation.status !== "cancelled",
      ).length,
      points: mockLoyaltyAccount.points,
      tier: mockUser.tier,
    },
  ];
}
