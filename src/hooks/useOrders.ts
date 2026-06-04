"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

import {
  addStoredOrder,
  getOrdersSnapshot,
  parseStoredOrders,
  subscribeToOrders,
} from "@/lib/orderStorage";
import type { Order } from "@/types/order";

/** Stores active and past mock orders for the local ordering flow. */
export function useOrders(initialOrders: Order[] = []) {
  const ordersSnapshot = useSyncExternalStore(
    subscribeToOrders,
    getOrdersSnapshot,
    () => JSON.stringify(initialOrders),
  );
  const persistedOrders = useMemo(
    () => parseStoredOrders(ordersSnapshot),
    [ordersSnapshot],
  );
  const orders = persistedOrders.length > 0 ? persistedOrders : initialOrders;

  const addOrder = useCallback((order: Order) => {
    addStoredOrder(order);
  }, []);

  return {
    activeOrders: orders.filter((order) => order.status !== "completed"),
    addOrder,
    orders,
    pastOrders: orders.filter((order) => order.status === "completed"),
  };
}
