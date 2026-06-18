"use client";

import { useState } from "react";

import { useLoyalty } from "@/hooks/useLoyalty";
import { useNotifications } from "@/hooks/useNotifications";
import { useResponsiveMode } from "@/hooks/useResponsiveMode";
import { useResponsiveReady } from "@/hooks/useResponsiveReady";
import type { Reward } from "@/types/loyalty";

import { DesktopLoyaltyDashboard } from "./DesktopLoyaltyDashboard";
import { MobileLoyaltyDashboard } from "./MobileLoyaltyDashboard";
import { TabletLoyaltyDashboard } from "./TabletLoyaltyDashboard";

export function LoyaltyDashboard() {
  const { account, redeemReward, redeemedRewards, transactions } = useLoyalty();
  const { unreadCount } = useNotifications();
  const mode = useResponsiveMode();
  const responsiveReady = useResponsiveReady();
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [redemptionMessage, setRedemptionMessage] = useState("");

  const handleRedeemReward = (reward: Reward) => {
    const result = redeemReward(reward);

    setRedemptionMessage(
      result.redemption
        ? `${result.message} Code ${result.redemption.confirmationCode}.`
        : result.message,
    );

    return result;
  };

  if (!responsiveReady) {
    return <section className="min-h-dvh bg-[#050607]" aria-hidden="true" />;
  }

  if (mode === "mobile") {
    return (
      <MobileLoyaltyDashboard
        account={account}
        memberPoints={account.points}
        onRedeemReward={handleRedeemReward}
        redeemedRewards={redeemedRewards}
        redemptionMessage={redemptionMessage}
        selectedReward={selectedReward}
        setRedemptionMessage={setRedemptionMessage}
        setSelectedReward={setSelectedReward}
        transactions={transactions}
        unreadNotificationCount={unreadCount}
      />
    );
  }

  if (mode === "tablet") {
    return (
      <TabletLoyaltyDashboard
        account={account}
        memberPoints={account.points}
        onRedeemReward={handleRedeemReward}
        redeemedRewards={redeemedRewards}
        redemptionMessage={redemptionMessage}
        selectedReward={selectedReward}
        setRedemptionMessage={setRedemptionMessage}
        setSelectedReward={setSelectedReward}
        transactions={transactions}
      />
    );
  }

  if (mode === "desktop") {
    return (
      <DesktopLoyaltyDashboard
        account={account}
        memberPoints={account.points}
        onRedeemReward={handleRedeemReward}
        redemptionMessage={redemptionMessage}
        selectedReward={selectedReward}
        setRedemptionMessage={setRedemptionMessage}
        setSelectedReward={setSelectedReward}
        transactions={transactions}
      />
    );
  }

  return null;
}
