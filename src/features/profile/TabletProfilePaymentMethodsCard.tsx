import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";
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
  return (
    <article className="min-h-[218px] rounded-[14px] border border-white/10 bg-white/[0.035] p-4 min-[1080px]:min-h-[230px]">
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
      <div className="mt-4 grid gap-2 min-[1080px]:gap-3">
        {profile.paymentMethods.slice(0, 3).map((paymentMethod) => (
          <div
            className="flex h-[44px] items-center justify-between rounded-[10px] border border-white/10 px-3 min-[1080px]:h-[48px]"
            key={paymentMethod.id}
          >
            <div className="flex items-center gap-3">
              <TabletPaymentMark paymentMethod={paymentMethod} />
              <span className="text-[13px] text-white/82 min-[1080px]:text-[16px]">
                **** {paymentMethod.last4}
              </span>
              {paymentMethod.isDefault ? (
                <span className="rounded-[6px] border border-[var(--sb-gold)]/40 px-2 py-0.5 text-[10px] text-[var(--sb-gold-soft)]">
                  Default
                </span>
              ) : null}
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
        className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-[10px] border border-[var(--sb-gold)]/28 text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] min-[1080px]:text-[14px]"
        onClick={onOpenSettings}
        type="button"
      >
        + Add payment method
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
        "grid h-7 w-12 place-items-center rounded-[4px] text-[11px] font-black italic",
        getTabletPaymentCardClassName(paymentMethod),
      )}
    >
      {paymentMethod.brand === "Mastercard"
        ? ""
        : getTabletPaymentCardLabel(paymentMethod)}
    </span>
  );
}
