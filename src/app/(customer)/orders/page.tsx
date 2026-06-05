import type { Metadata } from "next";

import { OrdersDashboard } from "@/features/orders/OrdersDashboard";

export const metadata: Metadata = {
  title: "Orders",
};

export default function OrdersPage() {
  return <OrdersDashboard />;
}
