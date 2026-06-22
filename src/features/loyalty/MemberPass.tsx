"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getTierLabel } from "@/lib/loyalty";
import type { LoyaltyAccount } from "@/types/loyalty";

import { MemberQrCode } from "./MemberQrCode";

export function MemberPass({ account }: { account: LoyaltyAccount }) {
  return (
    <Card className="overflow-hidden p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Badge tone="premium">Member pass</Badge>
          <h3 className="mt-4 text-xl font-semibold text-sb-rice">
            {getTierLabel(account.tier)}
          </h3>
          <p className="mt-2 font-mono text-sm text-sb-gold-soft">
            {account.memberCode}
          </p>
        </div>
        <MemberQrCode
          className="h-28 w-28 rounded-card border-sb-gold/30 bg-sb-ink"
          memberCode={account.memberCode}
          sizes="112px"
        />
      </div>
      <p className="mt-5 text-sm leading-6 text-sb-muted">
        Present your member pass for dine-in rewards, concierge notes, and
        referral credit.
      </p>
    </Card>
  );
}
