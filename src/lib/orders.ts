import { calculateCartLineSubtotal } from "@/lib/cart";
import { formatDateTime } from "@/lib/dates";
import { formatMoney } from "@/lib/money";
import type { StatusTone } from "@/types/common";
import type {
  CartItemDraft,
  Order,
  OrderStatus,
  OrderTimelineStep,
} from "@/types/order";

const statusOrder: OrderStatus[] = [
  "confirmed",
  "preparing",
  "ready",
  "out-for-delivery",
  "completed",
];

const statusLabels: Record<OrderStatus, string> = {
  cancelled: "Cancelled",
  completed: "Completed",
  confirmed: "Confirmed",
  draft: "Draft",
  "out-for-delivery": "Out for delivery",
  preparing: "Preparing",
  ready: "Ready",
};

const statusTones: Record<OrderStatus, StatusTone> = {
  cancelled: "danger",
  completed: "success",
  confirmed: "premium",
  draft: "neutral",
  "out-for-delivery": "warning",
  preparing: "warning",
  ready: "success",
};

export function getOrderStatusLabel(status: OrderStatus): string {
  return statusLabels[status];
}

export function getOrderStatusTone(status: OrderStatus): StatusTone {
  return statusTones[status];
}

/** Builds display-ready order timeline steps from the current order status. */
export function getOrderTimeline(order: Order): OrderTimelineStep[] {
  const currentIndex = statusOrder.indexOf(order.status);
  const activeIndex = currentIndex >= 0 ? currentIndex : 0;
  const stepDescriptions: Record<OrderStatus, string> = {
    cancelled: "This order was cancelled.",
    completed: "Order completed and archived.",
    confirmed: "The kitchen received the order.",
    draft: "Order is still being reviewed.",
    "out-for-delivery": "Courier is carrying the order.",
    preparing: "Chefs are preparing the selection.",
    ready:
      order.mode === "delivery"
        ? "Order is packed for courier pickup."
        : "Order is ready at the counter.",
  };

  return statusOrder.map((status, index) => ({
    completed: order.status === "cancelled" ? false : index <= activeIndex,
    description: stepDescriptions[status],
    id: status,
    label: getOrderStatusLabel(status),
    timestamp:
      index <= activeIndex
        ? formatDateTime(
            new Date(new Date(order.createdAt).getTime() + index * 8 * 60000),
          )
        : undefined,
  }));
}

/** Converts an order's line items into cart drafts for the reorder flow. */
export function getReorderDrafts(order: Order): CartItemDraft[] {
  return order.items.map((item) => ({
    addOns: item.addOns,
    customizations: item.customizations,
    menuItem: item.menuItem,
    notes: item.notes,
    quantity: item.quantity,
  }));
}

export function getOrderItemCount(order: Order): number {
  return order.items.reduce((total, item) => total + item.quantity, 0);
}

export function getOrderSummary(order: Order): string {
  const firstItem = order.items[0]?.menuItem.name || "Sushi Bliss order";
  const remainingCount = Math.max(order.items.length - 1, 0);

  return remainingCount > 0
    ? `${firstItem} + ${remainingCount} more`
    : firstItem;
}

export function getOrderReceiptLines(order: Order) {
  return order.items.map((item) => ({
    id: item.id,
    label: `${item.quantity} x ${item.menuItem.name}`,
    value: formatMoney(calculateCartLineSubtotal(item)),
  }));
}
