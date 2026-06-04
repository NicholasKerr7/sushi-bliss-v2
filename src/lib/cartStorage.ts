import { readStorageValue, writeStorageValue } from "@/lib/storage";
import type {
  CartCustomization,
  CartSelectedAddOn,
  StoredCartLineItem,
} from "@/types/order";

const CART_STORAGE_KEY = "sushi-bliss:cart";
const CART_CHANGED_EVENT = "sushi-bliss:cart-changed";
const MAX_CART_QUANTITY = 99;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseSelectedAddOns(value: unknown): CartSelectedAddOn[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is CartSelectedAddOn => {
    if (!isRecord(item)) {
      return false;
    }

    return (
      typeof item.id === "string" &&
      typeof item.label === "string" &&
      typeof item.priceCents === "number"
    );
  });
}

function parseCustomizations(value: unknown): CartCustomization[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is CartCustomization => {
    if (!isRecord(item)) {
      return false;
    }

    return (
      typeof item.groupId === "string" &&
      typeof item.groupLabel === "string" &&
      typeof item.optionId === "string" &&
      typeof item.optionLabel === "string"
    );
  });
}

function parseStoredLineItem(value: unknown): StoredCartLineItem | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  if (
    typeof value.id !== "string" ||
    typeof value.menuItemId !== "string" ||
    typeof value.quantity !== "number"
  ) {
    return undefined;
  }

  const quantity = Math.min(
    Math.max(Math.floor(value.quantity), 1),
    MAX_CART_QUANTITY,
  );

  return {
    addOns: parseSelectedAddOns(value.addOns),
    customizations: parseCustomizations(value.customizations),
    id: value.id,
    menuItemId: value.menuItemId,
    notes: typeof value.notes === "string" ? value.notes : undefined,
    quantity,
  };
}

/** Validates unknown cart storage data before it is resolved into menu items. */
export function parseStoredCartItems(
  value: string | null,
): StoredCartLineItem[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map(parseStoredLineItem)
      .filter((item): item is StoredCartLineItem => Boolean(item));
  } catch {
    return [];
  }
}

export function getCartSnapshot(): string {
  return readStorageValue(CART_STORAGE_KEY) || "[]";
}

export function getEmptyCartSnapshot(): string {
  return "[]";
}

function notifyCartChanged() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(CART_CHANGED_EVENT));
}

/** Subscribes to same-tab and cross-tab cart changes for React state reads. */
export function subscribeToCart(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === CART_STORAGE_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(CART_CHANGED_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(CART_CHANGED_EVENT, onStoreChange);
  };
}

export function readStoredCartItems(): StoredCartLineItem[] {
  return parseStoredCartItems(getCartSnapshot());
}

export function writeStoredCartItems(items: StoredCartLineItem[]) {
  writeStorageValue(CART_STORAGE_KEY, JSON.stringify(items));
  notifyCartChanged();
}
