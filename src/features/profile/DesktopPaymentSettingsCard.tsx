import Link from "next/link";

import type { UserProfile } from "@/types/user";

import { SettingsCard } from "./DesktopProfileSettingsPrimitives";

export function DesktopPaymentSettingsCard({
  profile,
}: {
  profile: UserProfile;
}) {
  return (
    <SettingsCard
      title="Payment methods"
      icon="/assets/icons/credit-card-icon.png"
      id="desktop-profile-payments"
    >
      <div className="space-y-2">
        {profile.paymentMethods.map((method) => (
          <div
            className="grid grid-cols-[58px_1fr] items-center gap-3 rounded-[10px] border border-white/10 bg-black/24 p-2.5"
            key={method.id}
          >
            <span className="grid h-11 place-items-center rounded-[8px] border border-white/10 font-mono text-[12px] text-white">
              {method.brand === "Mastercard" ? "MC" : method.brand}
            </span>
            <p className="text-[13px] text-white">
              {method.brand} **** {method.last4}
              <span className="mt-1 block text-[12px] text-white/54">
                Expires {method.expiresAt}
              </span>
            </p>
          </div>
        ))}
      </div>
      <Link
        className="mt-3 flex h-9 items-center justify-center rounded-[9px] border border-[var(--sb-gold)]/32 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:border-[var(--sb-gold)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
        href="/menu"
      >
        Use in menu checkout
      </Link>
    </SettingsCard>
  );
}
