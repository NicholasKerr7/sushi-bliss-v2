import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { icons } from "@/features/home/homeDashboardData";
import { classNames } from "@/lib/classNames";
import { isPaymentMethodUsable } from "@/lib/profile";
import type { PaymentMethod, UserProfile } from "@/types/user";

import {
  getTabletPaymentCardClassName,
  getTabletPaymentCardLabel,
} from "./TabletProfileDashboardData";

export function TabletProfilePaymentMethodsCard({
  profile,
  onOpenSettings,
}: {
  profile: UserProfile;
  onOpenSettings: () => void;
}) {
  const visiblePaymentMethods = profile.paymentMethods.slice(0, 3);

  return (
    <article className="relative min-h-[218px] overflow-hidden rounded-[14px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.065),rgba(255,255,255,0.018))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] min-[1080px]:min-h-[230px]">
      <span
        aria-hidden="true"
        className="absolute -left-14 -top-16 h-36 w-36 rounded-full bg-[var(--sb-red-bright)]/7 blur-2xl"
      />
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-3 text-[14px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] min-[1080px]:text-[16px]">
          <AssetIcon size={22} src={icons.cart} />
          Payment methods
        </h2>
        <button
          className="inline-flex min-h-10 items-center gap-1 rounded-full px-2 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
          onClick={onOpenSettings}
          type="button"
        >
          View all <ChevronIcon direction="right" size={18} />
        </button>
      </div>
      <div className="relative mt-4 grid gap-2 min-[1080px]:gap-3">
        {visiblePaymentMethods.map((paymentMethod) => (
          <div
            className="grid min-h-[48px] grid-cols-[56px_minmax(0,1fr)_34px] items-center gap-3 rounded-[12px] border border-white/10 bg-black/28 px-3 py-2 shadow-[0_12px_26px_rgba(0,0,0,0.18)] min-[1080px]:min-h-[54px] min-[1080px]:grid-cols-[64px_minmax(0,1fr)_38px]"
            key={paymentMethod.id}
          >
            <TabletPaymentMark paymentMethod={paymentMethod} />
            <div className="min-w-0">
              <div className="flex min-w-0 items-center gap-2">
                <span className="truncate text-[13px] text-white/86 min-[1080px]:text-[15px]">
                  {paymentMethod.brand} **** {paymentMethod.last4}
                </span>
                <span className="shrink-0 rounded-[6px] border border-white/10 bg-black/32 px-2 py-0.5 text-[9px] uppercase tracking-[0.06em] text-white/46">
                  {paymentMethod.isDefault
                    ? "Default"
                    : isPaymentMethodUsable(paymentMethod)
                      ? "Ready"
                      : "Expired"}
                </span>
              </div>
              <p className="mt-1 truncate text-[11px] text-white/42">
                Expires {paymentMethod.expiresAt}
              </p>
            </div>
            <button
              aria-label={`Manage ${paymentMethod.brand} ending ${paymentMethod.last4}`}
              className="-mr-2 grid h-10 w-11 place-items-center rounded-full text-[var(--sb-gold-soft)] transition hover:bg-white/6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
              onClick={onOpenSettings}
              type="button"
            >
              <ChevronIcon direction="right" size={18} />
            </button>
          </div>
        ))}
      </div>
      <button
        className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-[10px] border border-[var(--sb-gold)]/28 bg-black/18 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] transition hover:bg-[var(--sb-gold)]/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold min-[1080px]:text-[14px]"
        onClick={onOpenSettings}
        type="button"
      >
        <AssetIcon size={15} src="/assets/icons/plus-icon.png" />
        Add payment method
      </button>
    </article>
  );
}

function TabletPaymentMark({
  paymentMethod,
}: {
  paymentMethod: PaymentMethod;
}) {
  return (
    <span
      aria-label={paymentMethod.brand}
      className={classNames(
        "grid h-8 w-14 place-items-center rounded-[8px] text-[10px] font-black italic shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] min-[1080px]:h-9 min-[1080px]:w-16 min-[1080px]:text-[11px]",
        getTabletPaymentCardClassName(paymentMethod),
      )}
    >
      {paymentMethod.brand === "Mastercard"
        ? ""
        : getTabletPaymentCardLabel(paymentMethod)}
    </span>
  );
}
