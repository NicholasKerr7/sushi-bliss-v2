"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { classNames } from "@/lib/classNames";
import { getTierLabel } from "@/lib/loyalty";
import type { LoyaltyAccount } from "@/types/loyalty";

interface MemberPassProps {
  account: LoyaltyAccount;
}

export function getQrCells(memberCode: string): boolean[] {
  const source = memberCode.replace(/[^A-Z0-9]/gi, "");

  return Array.from({ length: 49 }, (_, index) => {
    const charCode = source.charCodeAt(index % source.length) || index;

    return (charCode + index) % 3 !== 0;
  });
}

export function MemberPass({ account }: MemberPassProps) {
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
        <div
          aria-label={`Mock QR code for ${account.memberCode}`}
          className="grid h-28 w-28 shrink-0 grid-cols-7 gap-1 rounded-card border border-sb-gold/30 bg-sb-ink p-3"
          role="img"
        >
          {getQrCells(account.memberCode).map((active, index) => (
            <span
              className={classNames(
                "rounded-[2px]",
                active ? "bg-sb-gold-soft" : "bg-sb-panel-soft",
              )}
              key={`${account.memberCode}-${index}`}
            />
          ))}
        </div>
      </div>
      <p className="mt-5 text-sm leading-6 text-sb-muted">
        Present your member pass for dine-in rewards, concierge notes, and
        referral credit.
      </p>
    </Card>
  );
}
