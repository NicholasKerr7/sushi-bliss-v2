import type { ID } from "@/types/common";

export interface GiftExperience {
  id: ID;
  title: string;
  description: string;
  priceCents: number;
}

export interface GiftRecipient {
  name: string;
  email: string;
  message?: string;
}
