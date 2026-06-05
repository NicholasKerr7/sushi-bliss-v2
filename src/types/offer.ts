import type { ID } from "@/types/common";

export interface Offer {
  id: ID;
  title: string;
  subtitle: string;
  description: string;
  code: string;
  accent: "neutral" | "premium";
  imageUrl: string;
  expiresAt: string;
  eligibility: string;
  terms: string[];
}
