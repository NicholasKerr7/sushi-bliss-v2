import type { FulfillmentMode, ID } from "@/types/common";
import type { MenuItem } from "@/types/menu";

export type OrderStatus =
  | "draft"
  | "confirmed"
  | "preparing"
  | "ready"
  | "out-for-delivery"
  | "completed"
  | "cancelled";

export interface CartLineItem {
  id: ID;
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
  addOns?: string[];
}

export interface OrderTotals {
  subtotalCents: number;
  taxCents: number;
  serviceFeeCents: number;
  discountCents: number;
  totalCents: number;
}

export interface Order {
  id: ID;
  status: OrderStatus;
  mode: FulfillmentMode;
  items: CartLineItem[];
  totals: OrderTotals;
  createdAt: string;
}
