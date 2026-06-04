"use client";

import { useCallback, useMemo, useState } from "react";

import { calculateOrderTotals } from "@/lib/money";
import type { CartLineItem } from "@/types/order";

/** Manages local cart line items and derived totals until backend persistence exists. */
export function useCart() {
  const [items, setItems] = useState<CartLineItem[]>([]);

  const subtotalCents = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.menuItem.priceCents * item.quantity,
        0,
      ),
    [items],
  );

  const addItem = useCallback((item: CartLineItem) => {
    setItems((current) => {
      const existing = current.find((lineItem) => lineItem.id === item.id);

      if (!existing) {
        return [...current, item];
      }

      return current.map((lineItem) =>
        lineItem.id === item.id
          ? { ...lineItem, quantity: lineItem.quantity + item.quantity }
          : lineItem,
      );
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems((current) =>
      current
        .map((item) => ({
          ...item,
          quantity: item.id === id ? Math.max(quantity, 0) : item.quantity,
        }))
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  return {
    addItem,
    clearCart,
    isEmpty: items.length === 0,
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    items,
    removeItem,
    subtotalCents,
    totals: calculateOrderTotals(subtotalCents),
    updateQuantity,
  };
}
