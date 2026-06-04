"use client";

import { useCallback, useState } from "react";

import type { Order } from "@/types/order";

export function useOrders(initialOrders: Order[] = []) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const addOrder = useCallback((order: Order) => {
    setOrders((current) => [order, ...current]);
  }, []);

  return {
    activeOrders: orders.filter((order) => order.status !== "completed"),
    addOrder,
    orders,
    pastOrders: orders.filter((order) => order.status === "completed"),
  };
}
