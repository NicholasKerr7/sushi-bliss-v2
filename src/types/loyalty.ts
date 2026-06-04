import type { ID } from "@/types/common";

export interface LoyaltyAccount {
  id: ID;
  userId: ID;
  points: number;
  tier: "jade" | "gold" | "omakase";
  nextTierPoints: number;
}

export interface Reward {
  id: ID;
  title: string;
  description: string;
  pointsCost: number;
  isAvailable: boolean;
}
