import type { ID, StatusTone } from "@/types/common";

export interface AppNotification {
  id: ID;
  title: string;
  body: string;
  tone: StatusTone;
  createdAt: string;
  readAt?: string;
}
