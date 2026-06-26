import { readStorageValue, writeStorageValue } from "@/lib/storage";
import type { Order } from "@/types/order";

const ORDERS_STORAGE_KEY = "sushi-bliss:orders";
const ORDERS_CHANGED_EVENT = "sushi-bliss:orders-changed";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isStoredOrder(value: unknown): value is Order {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === "string" &&
    typeof value.confirmationCode === "string" &&
    typeof value.createdAt === "string" &&
    typeof value.fulfillmentAt === "string" &&
    Array.isArray(value.items) &&
    isRecord(value.totals)
  );
}

/** Validates stored local orders enough to prevent corrupt localStorage reads. */
export function parseStoredOrders(value: string | null): Order[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isStoredOrder);
  } catch {
    return [];
  }
}

export function getOrdersSnapshot(): string {
  return readStorageValue(ORDERS_STORAGE_KEY) || "[]";
}

export function getEmptyOrdersSnapshot(): string {
  return "[]";
}

function notifyOrdersChanged() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(ORDERS_CHANGED_EVENT));
}

/** Subscribes to same-tab and cross-tab order changes for React state reads. */
export function subscribeToOrders(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === ORDERS_STORAGE_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(ORDERS_CHANGED_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(ORDERS_CHANGED_EVENT, onStoreChange);
  };
}

export function readStoredOrders(): Order[] {
  return parseStoredOrders(getOrdersSnapshot());
}

export function writeStoredOrders(orders: Order[]) {
  writeStorageValue(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  notifyOrdersChanged();
}

export function addStoredOrder(order: Order) {
  writeStoredOrders([order, ...readStoredOrders()]);
}
