"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { ReferralProgress } from "@/types/loyalty";

interface ReferralPanelProps {
  progress: ReferralProgress;
}

export function ReferralPanel({ progress }: ReferralPanelProps) {
  const [copyMessage, setCopyMessage] = useState("");

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(progress.code);
      setCopyMessage("Referral code copied.");
    } catch {
      setCopyMessage("Referral code ready to share.");
    }
  };

  return (
    <Card className="p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-sb-rice">Referrals</h3>
          <p className="mt-2 text-sm leading-6 text-sb-muted">
            Invite guests and earn points after completed checkout orders.
          </p>
        </div>
        <StatusBadge tone="success">
          {progress.completedInvites}/{progress.invitedGuests} complete
        </StatusBadge>
      </div>

      <div className="mt-5 rounded-card border border-sb-gold/30 bg-sb-gold/10 p-4">
        <p className="text-xs font-semibold uppercase text-sb-dim">
          Referral code
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-2xl font-semibold text-sb-gold-soft">
            {progress.code}
          </p>
          <Button onClick={handleCopyCode} size="sm" variant="secondary">
            Copy code
          </Button>
        </div>
        {copyMessage ? (
          <p className="mt-3 text-sm font-semibold text-sb-wasabi">
            {copyMessage}
          </p>
        ) : null}
      </div>

      <div className="mt-5 grid gap-3">
        {progress.milestones.map((milestone) => (
          <div
            className="flex items-start justify-between gap-4 rounded-card border border-sb-line bg-sb-ink/50 p-4"
            key={milestone.label}
          >
            <div>
              <p className="text-sm font-semibold text-sb-rice">
                {milestone.label}
              </p>
              <p className="mt-1 text-xs leading-5 text-sb-muted">
                {milestone.count} completed guest{" "}
                {milestone.count === 1 ? "order" : "orders"}
              </p>
            </div>
            <StatusBadge tone={milestone.completed ? "success" : "neutral"}>
              {milestone.completed ? "Done" : "Open"}
            </StatusBadge>
          </div>
        ))}
      </div>

      <p className="mt-4 text-sm leading-6 text-sb-muted">
        Next milestone reward: {progress.rewardPoints} points.
      </p>
    </Card>
  );
}
