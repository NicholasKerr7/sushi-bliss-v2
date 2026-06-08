"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

import { defaultLoyaltyState } from "@/data/loyalty";
import { awardOrderPointsToState, redeemRewardFromState } from "@/lib/loyalty";
import {
  getLoyaltySnapshot,
  parseStoredLoyaltyState,
  readStoredLoyaltyState,
  subscribeToLoyalty,
  writeStoredLoyaltyState,
} from "@/lib/loyaltyStorage";
import type { LoyaltyState, Reward } from "@/types/loyalty";
import type { Order } from "@/types/order";

/** Encapsulates persisted loyalty point awarding and redemption guardrails. */
export function useLoyalty() {
  const snapshot = useSyncExternalStore(
    subscribeToLoyalty,
    getLoyaltySnapshot,
    () => JSON.stringify(defaultLoyaltyState),
  );
  const state = useMemo(() => parseStoredLoyaltyState(snapshot), [snapshot]);

  const updateLoyaltyState = useCallback(
    (updater: (state: LoyaltyState) => LoyaltyState) => {
      writeStoredLoyaltyState(updater(readStoredLoyaltyState()));
    },
    [],
  );

  const awardOrderPoints = useCallback((order: Order) => {
    const currentState = readStoredLoyaltyState();
    const nextState = awardOrderPointsToState(currentState, order);

    if (nextState === currentState) {
      return 0;
    }

    writeStoredLoyaltyState(nextState);

    const transaction = nextState.transactions.find(
      (item) => item.orderId === order.id && item.type === "earn",
    );

    return transaction?.points || 0;
  }, []);

  const redeemReward = useCallback((reward: Reward) => {
    const { result, state: nextState } = redeemRewardFromState(
      readStoredLoyaltyState(),
      reward,
    );

    if (result.success) {
      writeStoredLoyaltyState(nextState);
    }

    return result;
  }, []);

  return {
    account: state.account,
    awardOrderPoints,
    redeemReward,
    redeemedRewards: state.redeemedRewards,
    state,
    transactions: state.transactions,
    updateLoyaltyState,
  };
}
