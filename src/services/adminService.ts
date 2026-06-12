import {
  getAdminCustomerSummaries,
  getAdminMetrics,
  getOrderStatusCounts,
  getReservationStatusCounts,
} from "@/lib/admin";
import { serviceSuccess, type ServiceResponse } from "@/services/contracts";
import type { AdminCustomerSummary, AdminMetric } from "@/types/admin";
import type { OrderStatus } from "@/types/order";
import type { ReservationStatus } from "@/types/reservation";

export interface AdminDashboardSnapshot {
  customers: AdminCustomerSummary[];
  metrics: AdminMetric[];
  orderStatusCounts: Record<OrderStatus, number>;
  reservationStatusCounts: Record<ReservationStatus, number>;
}

/** Provides admin dashboard data through a future service-role-only boundary. */
export async function getAdminDashboardSnapshot(): Promise<
  ServiceResponse<AdminDashboardSnapshot>
> {
  return serviceSuccess(
    {
      customers: getAdminCustomerSummaries(),
      metrics: getAdminMetrics(),
      orderStatusCounts: getOrderStatusCounts(),
      reservationStatusCounts: getReservationStatusCounts(),
    },
    "mock",
  );
}
