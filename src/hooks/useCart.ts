"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

import { menuItemById } from "@/data/menu";
import {
  calculateCartLineSubtotal,
  createStoredCartLineItem,
  resolveStoredCartLineItems,
} from "@/lib/cart";
import {
  getCartSnapshot,
  getEmptyCartSnapshot,
  parseStoredCartItems,
  readStoredCartItems,
  subscribeToCart,
  writeStoredCartItems,
} from "@/lib/cartStorage";
import { isMenuItemOnlineOrderable } from "@/lib/menuAvailability";
import { calculateOrderTotals } from "@/lib/money";
import type { CartItemDraft } from "@/types/order";

const MAX_CART_QUANTITY = 99;

/** Manages persistent local cart line items and derived totals. */
export function useCart() {
  const cartSnapshot = useSyncExternalStore(
    subscribeToCart,
    getCartSnapshot,
    getEmptyCartSnapshot,
  );
  const storedItems = useMemo(
    () => parseStoredCartItems(cartSnapshot),
    [cartSnapshot],
  );
  const items = useMemo(
    () => resolveStoredCartLineItems(storedItems, menuItemById),
    [storedItems],
  );
  const subtotalCents = useMemo(
    () =>
      items.reduce((total, item) => total + calculateCartLineSubtotal(item), 0),
    [items],
  );

  const addItem = useCallback((draft: CartItemDraft) => {
    if (!isMenuItemOnlineOrderable(draft.menuItem)) {
      return false;
    }

    const storedLineItem = createStoredCartLineItem({
      ...draft,
      quantity: Math.min(Math.max(Math.floor(draft.quantity), 1), 12),
    });
    const currentItems = readStoredCartItems();
    const existing = currentItems.find((item) => item.id === storedLineItem.id);

    if (!existing) {
      writeStoredCartItems([...currentItems, storedLineItem]);
      return true;
    }

    writeStoredCartItems(
      currentItems.map((item) =>
        item.id === storedLineItem.id
          ? {
              ...item,
              quantity: Math.min(
                item.quantity + storedLineItem.quantity,
                MAX_CART_QUANTITY,
              ),
            }
          : item,
      ),
    );

    return true;
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    const nextQuantity = Math.max(Math.floor(quantity), 0);
    const currentItems = readStoredCartItems();

    writeStoredCartItems(
      currentItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.min(nextQuantity, MAX_CART_QUANTITY),
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    writeStoredCartItems(
      readStoredCartItems().filter((item) => item.id !== id),
    );
  }, []);

  const clearCart = useCallback(() => {
    writeStoredCartItems([]);
  }, []);

  return {
    addItem,
    clearCart,
    isEmpty: items.length === 0,
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    items,
    removeItem,
    subtotalCents,
    totals: calculateOrderTotals(subtotalCents),
    uniqueItemCount: items.length,
    updateQuantity,
  };
}
