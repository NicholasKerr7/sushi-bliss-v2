import type { ID, StatusTone } from "@/types/common";

export type NotificationCategory =
  | "order"
  | "reservation"
  | "reward"
  | "offer"
  | "support";

export interface AppNotification {
  body: string;
  category: NotificationCategory;
  createdAt: string;
  href?: string;
  id: ID;
  relatedLabel?: string;
  readAt?: string;
  title: string;
  tone: StatusTone;
}
