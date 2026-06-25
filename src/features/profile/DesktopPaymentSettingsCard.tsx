import Link from "next/link";

import { classNames } from "@/lib/classNames";
import { isPaymentMethodUsable } from "@/lib/profile";
import type { PaymentMethod, UserProfile } from "@/types/user";

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
          <DesktopPaymentMethodRow key={method.id} method={method} />
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

function DesktopPaymentMethodRow({ method }: { method: PaymentMethod }) {
  const usable = isPaymentMethodUsable(method);

  return (
    <div className="grid grid-cols-[66px_minmax(0,1fr)_82px] items-center gap-3 rounded-[12px] border border-white/10 bg-black/24 p-2.5">
      <span
        className={classNames(
          "relative grid h-12 place-items-center overflow-hidden rounded-[9px] border font-mono text-[11px] font-black italic shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
          method.brand === "Visa"
            ? "border-blue-300/24 bg-blue-500/12 text-blue-100"
            : method.brand === "Mastercard"
              ? "border-red-300/22 bg-red-500/12 text-red-100"
              : "border-white/10 bg-white/8 text-white",
        )}
      >
        <span
          aria-hidden="true"
          className="absolute -right-5 -top-6 h-12 w-12 rounded-full bg-white/10"
        />
        <span className="relative z-10">
          {method.brand === "Mastercard" ? "MC" : method.brand}
        </span>
      </span>
      <p className="min-w-0 text-[13px] text-white">
        <span className="block truncate">
          {method.brand} **** {method.last4}
        </span>
        <span className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-white/54">
          <span>Expires {method.expiresAt}</span>
          {method.billingPostalCode ? (
            <span>ZIP {method.billingPostalCode}</span>
          ) : null}
        </span>
      </p>
      <span
        className={classNames(
          "rounded-full border px-2 py-1 text-center text-[9px] uppercase tracking-[0.06em]",
          method.isDefault
            ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/18 text-[var(--sb-red-bright)]"
            : usable
              ? "border-[var(--sb-gold)]/30 bg-[var(--sb-gold)]/10 text-[var(--sb-gold-soft)]"
              : "border-white/10 bg-white/5 text-white/38",
        )}
      >
        {method.isDefault ? "Default" : usable ? "Ready" : "Expired"}
      </span>
    </div>
  );
}
