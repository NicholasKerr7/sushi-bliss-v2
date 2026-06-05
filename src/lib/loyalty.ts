import { loyaltyTiers } from "@/data/loyalty";
import type {
  LoyaltyAccount,
  LoyaltyState,
  LoyaltyTier,
  LoyaltyTransaction,
  RedeemedReward,
  Reward,
} from "@/types/loyalty";
import type { Order } from "@/types/order";

const POINTS_PER_DOLLAR = 1;

export interface RewardRedemptionResult {
  message: string;
  redemption?: RedeemedReward;
  success: boolean;
}

/** Calculates loyalty points from actual checkout spend after discounts. */
export function calculateOrderLoyaltyPoints(order: Order): number {
  const eligibleCents = Math.max(
    order.totals.subtotalCents - order.totals.discountCents,
    0,
  );

  return Math.floor((eligibleCents / 100) * POINTS_PER_DOLLAR);
}

export function getTierProgress(account: LoyaltyAccount): number {
  const currentTier = getCurrentTier(account.lifetimePoints);
  const nextTier = getNextTier(account.lifetimePoints);

  if (!nextTier) {
    return 100;
  }

  const tierSpan = nextTier.minimumPoints - currentTier.minimumPoints;
  const earnedWithinTier = account.lifetimePoints - currentTier.minimumPoints;

  return Math.min(Math.max((earnedWithinTier / tierSpan) * 100, 0), 100);
}

export function getCurrentTier(points: number) {
  return (
    [...loyaltyTiers].reverse().find((tier) => points >= tier.minimumPoints) ||
    loyaltyTiers[0]
  );
}

export function getNextTier(points: number) {
  return loyaltyTiers.find((tier) => points < tier.minimumPoints) || null;
}

export function getTierLabel(tier: LoyaltyTier): string {
  return loyaltyTiers.find((item) => item.id === tier)?.label || "Jade";
}

export function createLoyaltyConfirmationCode(date = new Date()): string {
  const datePart = date.toISOString().slice(2, 10).replaceAll("-", "");
  const randomPart = Math.random().toString(36).slice(2, 6).toUpperCase();

  return `RW-${datePart}-${randomPart}`;
}

/** Awards checkout points once per order id, never from cart mutations. */
export function awardOrderPointsToState(
  state: LoyaltyState,
  order: Order,
): LoyaltyState {
  const alreadyAwarded = state.transactions.some(
    (transaction) =>
      transaction.type === "earn" && transaction.orderId === order.id,
  );
  const earnedPoints = calculateOrderLoyaltyPoints(order);

  if (alreadyAwarded || earnedPoints <= 0) {
    return state;
  }

  const nextLifetimePoints = state.account.lifetimePoints + earnedPoints;
  const nextTier = getCurrentTier(nextLifetimePoints);
  const nextTierTarget = getNextTier(nextLifetimePoints)?.minimumPoints || 0;
  const transaction: LoyaltyTransaction = {
    createdAt: new Date().toISOString(),
    id: `earn-${order.id}`,
    label: `Order ${order.confirmationCode}`,
    orderId: order.id,
    points: earnedPoints,
    type: "earn",
  };

  return {
    ...state,
    account: {
      ...state.account,
      lifetimePoints: nextLifetimePoints,
      nextTierPoints: nextTierTarget,
      points: state.account.points + earnedPoints,
      tier: nextTier.id,
    },
    transactions: [transaction, ...state.transactions],
  };
}

/** Applies reward redemption only after availability, cost, and balance checks. */
export function redeemRewardFromState(
  state: LoyaltyState,
  reward: Reward,
): { result: RewardRedemptionResult; state: LoyaltyState } {
  if (!reward.isAvailable) {
    return {
      result: {
        message: "This reward is not available right now.",
        success: false,
      },
      state,
    };
  }

  if (reward.pointsCost <= 0) {
    return {
      result: {
        message: "This reward cannot be redeemed.",
        success: false,
      },
      state,
    };
  }

  if (state.account.points < reward.pointsCost) {
    return {
      result: {
        message: "Not enough points for this reward.",
        success: false,
      },
      state,
    };
  }

  const redeemedAt = new Date().toISOString();
  const redemption: RedeemedReward = {
    confirmationCode: createLoyaltyConfirmationCode(),
    id: `redeemed-${reward.id}-${Date.now()}`,
    pointsCost: reward.pointsCost,
    redeemedAt,
    rewardId: reward.id,
    title: reward.title,
  };
  const transaction: LoyaltyTransaction = {
    createdAt: redeemedAt,
    id: `redeem-${redemption.id}`,
    label: reward.title,
    points: -reward.pointsCost,
    rewardId: reward.id,
    type: "redeem",
  };

  return {
    result: {
      message: `${reward.title} redeemed.`,
      redemption,
      success: true,
    },
    state: {
      ...state,
      account: {
        ...state.account,
        points: state.account.points - reward.pointsCost,
      },
      redeemedRewards: [redemption, ...state.redeemedRewards],
      transactions: [transaction, ...state.transactions],
    },
  };
}
