"use client";

import { useCallback, useState } from "react";

import { mockLoyaltyAccount } from "@/data/mockUser";
import type { LoyaltyAccount } from "@/types/loyalty";

/** Encapsulates loyalty point awarding and redemption guardrails. */
export function useLoyalty(
  initialAccount: LoyaltyAccount = mockLoyaltyAccount,
) {
  const [account, setAccount] = useState<LoyaltyAccount>(initialAccount);

  const awardPoints = useCallback((points: number) => {
    setAccount((current) => ({
      ...current,
      points: current.points + Math.max(points, 0),
    }));
  }, []);

  const redeemPoints = useCallback((points: number) => {
    setAccount((current) => {
      if (points <= 0 || current.points < points) {
        return current;
      }

      return {
        ...current,
        points: current.points - points,
      };
    });
  }, []);

  return {
    account,
    awardPoints,
    redeemPoints,
  };
}
