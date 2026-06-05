import type { ID } from "@/types/common";

export type LoyaltyTier = "jade" | "gold" | "omakase";

export interface LoyaltyAccount {
  id: ID;
  userId: ID;
  points: number;
  tier: LoyaltyTier;
  nextTierPoints: number;
  lifetimePoints: number;
  memberCode: string;
}

export interface Reward {
  id: ID;
  title: string;
  description: string;
  pointsCost: number;
  isAvailable: boolean;
  category: "dining" | "experience" | "upgrade";
  imageUrl: string;
  terms: string;
}

export interface RedeemedReward {
  id: ID;
  rewardId: ID;
  title: string;
  pointsCost: number;
  redeemedAt: string;
  confirmationCode: string;
}

export interface LoyaltyTransaction {
  id: ID;
  label: string;
  points: number;
  createdAt: string;
  type: "earn" | "redeem";
  orderId?: ID;
  rewardId?: ID;
}

export interface LoyaltyState {
  account: LoyaltyAccount;
  redeemedRewards: RedeemedReward[];
  transactions: LoyaltyTransaction[];
}

export interface LoyaltyTierDefinition {
  benefits: string[];
  id: LoyaltyTier;
  label: string;
  minimumPoints: number;
}

export interface ReferralMilestone {
  completed: boolean;
  count: number;
  label: string;
}

export interface ReferralProgress {
  code: string;
  completedInvites: number;
  invitedGuests: number;
  milestones: ReferralMilestone[];
  rewardPoints: number;
}
