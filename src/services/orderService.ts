import { mockOrders } from "@/data/orders";
import {
  serviceFailure,
  serviceSuccess,
  type ServiceResponse,
} from "@/services/contracts";
import type { Order } from "@/types/order";

/** Lists local orders through the same boundary future Supabase reads will use. */
export async function listOrders(): Promise<ServiceResponse<Order[]>> {
  return serviceSuccess(mockOrders);
}

/** Resolves one order by id without coupling UI code to seed data modules. */
export async function getOrder(id: string): Promise<ServiceResponse<Order>> {
  const order = mockOrders.find((candidate) => candidate.id === id);

  return order
    ? serviceSuccess(order)
    : serviceFailure("order_not_found", "Order was not found.");
}
