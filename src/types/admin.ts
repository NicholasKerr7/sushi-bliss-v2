import type { ID, StatusTone } from "@/types/common";

export interface AdminNavigationItem {
  badge?: string;
  group?: "main" | "system";
  href: string;
  iconUrl: string;
  id: ID;
  label: string;
}

export interface AdminMetric {
  detail: string;
  iconUrl: string;
  id: ID;
  label: string;
  tone: StatusTone;
  value: string;
}

export interface AdminCustomerSummary {
  email: string;
  id: ID;
  lifetimeOrders: number;
  name: string;
  openReservations: number;
  points: number;
  tier: string;
}

export interface AdminActionState {
  label: string;
  tone: StatusTone;
}
