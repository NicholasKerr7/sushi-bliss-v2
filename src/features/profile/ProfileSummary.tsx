"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { pluralize } from "@/lib/format";
import { getNextTier } from "@/lib/loyalty";
import type { LoyaltyAccount } from "@/types/loyalty";
import type { UserProfile } from "@/types/user";

interface ProfileSummaryProps {
  activeOrderCount: number;
  loyaltyAccount: LoyaltyAccount;
  profile: UserProfile;
  upcomingReservationCount: number;
}

export function ProfileSummary({
  activeOrderCount,
  loyaltyAccount,
  profile,
  upcomingReservationCount,
}: ProfileSummaryProps) {
  const nextTier = getNextTier(loyaltyAccount.lifetimePoints);
  const remainingPoints = nextTier
    ? Math.max(nextTier.minimumPoints - loyaltyAccount.lifetimePoints, 0)
    : 0;

  return (
    <Card className="p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Badge tone="premium">Member profile</Badge>
          <h3 className="mt-4 text-2xl font-semibold text-sb-rice">
            {profile.name}
          </h3>
          <p className="mt-2 text-sm leading-6 text-sb-muted">
            {profile.email} · {profile.phone}
          </p>
        </div>
        <StatusBadge tone="premium">{profile.tier}</StatusBadge>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <div className="rounded-card border border-sb-line bg-sb-ink/50 p-4">
          <p className="text-xs font-semibold uppercase text-sb-dim">Loyalty</p>
          <p className="mt-2 font-mono text-2xl text-sb-gold-soft">
            {loyaltyAccount.points}
          </p>
          <p className="mt-1 text-xs leading-5 text-sb-muted">
            {remainingPoints > 0
              ? `${remainingPoints} points to next tier`
              : "Top tier unlocked"}
          </p>
        </div>
        <div className="rounded-card border border-sb-line bg-sb-ink/50 p-4">
          <p className="text-xs font-semibold uppercase text-sb-dim">Orders</p>
          <p className="mt-2 font-mono text-2xl text-sb-rice">
            {activeOrderCount}
          </p>
          <p className="mt-1 text-xs leading-5 text-sb-muted">
            {pluralize(activeOrderCount, "active order")}
          </p>
        </div>
        <div className="rounded-card border border-sb-line bg-sb-ink/50 p-4">
          <p className="text-xs font-semibold uppercase text-sb-dim">
            Reservations
          </p>
          <p className="mt-2 font-mono text-2xl text-sb-rice">
            {upcomingReservationCount}
          </p>
          <p className="mt-1 text-xs leading-5 text-sb-muted">
            {pluralize(upcomingReservationCount, "upcoming booking")}
          </p>
        </div>
      </div>
    </Card>
  );
}
