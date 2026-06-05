import { defaultLoyaltyState } from "@/data/loyalty";
import { readStorageValue, writeStorageValue } from "@/lib/storage";
import type {
  LoyaltyAccount,
  LoyaltyState,
  LoyaltyTransaction,
  RedeemedReward,
} from "@/types/loyalty";

const LOYALTY_STORAGE_KEY = "sushi-bliss:loyalty";
const LOYALTY_CHANGED_EVENT = "sushi-bliss:loyalty-changed";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseAccount(value: unknown): LoyaltyAccount | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  if (
    typeof value.id !== "string" ||
    typeof value.userId !== "string" ||
    typeof value.points !== "number" ||
    typeof value.tier !== "string" ||
    typeof value.nextTierPoints !== "number"
  ) {
    return undefined;
  }

  const tier =
    value.tier === "jade" || value.tier === "gold" || value.tier === "omakase"
      ? value.tier
      : defaultLoyaltyState.account.tier;

  return {
    id: value.id,
    lifetimePoints:
      typeof value.lifetimePoints === "number"
        ? value.lifetimePoints
        : value.points,
    memberCode:
      typeof value.memberCode === "string"
        ? value.memberCode
        : defaultLoyaltyState.account.memberCode,
    nextTierPoints: value.nextTierPoints,
    points: Math.max(Math.floor(value.points), 0),
    tier,
    userId: value.userId,
  };
}

function parseTransaction(value: unknown): LoyaltyTransaction | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  if (
    typeof value.id !== "string" ||
    typeof value.label !== "string" ||
    typeof value.points !== "number" ||
    typeof value.createdAt !== "string" ||
    (value.type !== "earn" && value.type !== "redeem")
  ) {
    return undefined;
  }

  return {
    createdAt: value.createdAt,
    id: value.id,
    label: value.label,
    orderId: typeof value.orderId === "string" ? value.orderId : undefined,
    points: Math.floor(value.points),
    rewardId: typeof value.rewardId === "string" ? value.rewardId : undefined,
    type: value.type,
  };
}

function parseRedemption(value: unknown): RedeemedReward | undefined {
  if (!isRecord(value)) {
    return undefined;
  }

  if (
    typeof value.id !== "string" ||
    typeof value.rewardId !== "string" ||
    typeof value.title !== "string" ||
    typeof value.pointsCost !== "number" ||
    typeof value.redeemedAt !== "string" ||
    typeof value.confirmationCode !== "string"
  ) {
    return undefined;
  }

  return {
    confirmationCode: value.confirmationCode,
    id: value.id,
    pointsCost: value.pointsCost,
    redeemedAt: value.redeemedAt,
    rewardId: value.rewardId,
    title: value.title,
  };
}

/** Validates stored loyalty data before hydrating reward state. */
export function parseStoredLoyaltyState(value: string | null): LoyaltyState {
  if (!value) {
    return defaultLoyaltyState;
  }

  try {
    const parsed = JSON.parse(value);

    if (!isRecord(parsed)) {
      return defaultLoyaltyState;
    }

    const account = parseAccount(parsed.account);
    const transactions = Array.isArray(parsed.transactions)
      ? parsed.transactions
          .map(parseTransaction)
          .filter((transaction): transaction is LoyaltyTransaction =>
            Boolean(transaction),
          )
      : defaultLoyaltyState.transactions;
    const redeemedRewards = Array.isArray(parsed.redeemedRewards)
      ? parsed.redeemedRewards
          .map(parseRedemption)
          .filter((redemption): redemption is RedeemedReward =>
            Boolean(redemption),
          )
      : defaultLoyaltyState.redeemedRewards;

    return {
      account: account || defaultLoyaltyState.account,
      redeemedRewards,
      transactions,
    };
  } catch {
    return defaultLoyaltyState;
  }
}

export function getLoyaltySnapshot(): string {
  return (
    readStorageValue(LOYALTY_STORAGE_KEY) || JSON.stringify(defaultLoyaltyState)
  );
}

function notifyLoyaltyChanged() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(LOYALTY_CHANGED_EVENT));
}

/** Subscribes loyalty consumers to same-tab and cross-tab point changes. */
export function subscribeToLoyalty(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === LOYALTY_STORAGE_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(LOYALTY_CHANGED_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(LOYALTY_CHANGED_EVENT, onStoreChange);
  };
}

export function readStoredLoyaltyState(): LoyaltyState {
  return parseStoredLoyaltyState(getLoyaltySnapshot());
}

export function writeStoredLoyaltyState(state: LoyaltyState) {
  writeStorageValue(LOYALTY_STORAGE_KEY, JSON.stringify(state));
  notifyLoyaltyChanged();
}
