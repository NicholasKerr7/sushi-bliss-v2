"use client";

import type { LoyaltyAccount } from "@/types/loyalty";

import {
  MobileLoyaltyIconCircle,
  MobileLoyaltyPanel,
  MobileQrGrid,
} from "./MobileLoyaltyPrimitives";

interface MobileLoyaltyPassViewProps {
  account: LoyaltyAccount;
  tierLabel: string;
}

export function MobileLoyaltyPassView({
  account,
  tierLabel,
}: MobileLoyaltyPassViewProps) {
  return (
    <div className="grid gap-4">
      <MobileLoyaltyPanel className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[12px] uppercase tracking-[0.16em] text-[var(--sb-gold-soft)]">
              Member pass
            </p>
            <h2 className="editorial-title mt-3 text-[29px] uppercase leading-none text-white min-[390px]:text-[34px]">
              {tierLabel}
            </h2>
            <p className="mt-3 font-mono text-[16px] text-[var(--sb-gold-soft)]">
              {account.memberCode}
            </p>
          </div>
          <MobileQrGrid memberCode={account.memberCode} />
        </div>
        <p className="mt-5 text-[14px] leading-6 text-white/58">
          Present this pass for dine-in rewards, concierge notes, and referral
          credit.
        </p>
      </MobileLoyaltyPanel>

      <MobileLoyaltyPanel className="overflow-hidden">
        {[
          "Priority pickup windows",
          "Chef counter waitlist",
          "Monthly sake pairing",
        ].map((benefit) => (
          <div
            className="flex items-center gap-3 border-b border-white/10 px-4 py-4 last:border-b-0"
            key={benefit}
          >
            <MobileLoyaltyIconCircle
              className="h-11 w-11"
              icon="/assets/icons/star-icon.png"
              size={22}
            />
            <p className="text-[15px] text-white/70">{benefit}</p>
          </div>
        ))}
      </MobileLoyaltyPanel>
    </div>
  );
}
