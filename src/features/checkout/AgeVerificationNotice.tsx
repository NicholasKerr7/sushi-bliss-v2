"use client";

import Link from "next/link";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { classNames } from "@/lib/classNames";
import { getCheckoutComplianceState } from "@/lib/checkoutCompliance";
import { drinksMenuHref } from "@/lib/menuLinks";
import { liquidOmakaseReservationHref } from "@/lib/menuAvailability";
import type { CartLineItem } from "@/types/order";

interface AgeVerificationNoticeProps {
  className?: string;
  items: CartLineItem[];
  onVerifiedChange: (verified: boolean) => void;
  validationMessage?: string;
  verified: boolean;
}

function formatItemNames(items: CartLineItem[]): string {
  return items.map((item) => item.menuItem.name).join(", ");
}

/** Shows checkout compliance status for restaurant-only and future age-gated drinks. */
export function AgeVerificationNotice({
  className,
  items,
  onVerifiedChange,
  validationMessage,
  verified,
}: AgeVerificationNoticeProps) {
  const compliance = getCheckoutComplianceState(items, verified);
  const blocked = compliance.unavailableItems.length > 0;
  const gatedItems = blocked
    ? compliance.unavailableItems
    : compliance.onlineAgeRestrictedItems;

  if (gatedItems.length === 0) {
    return null;
  }

  return (
    <section
      className={classNames(
        "rounded-[15px] border bg-[linear-gradient(180deg,rgba(15,16,15,0.92),rgba(5,6,7,0.96))] p-4 shadow-[0_18px_48px_rgba(0,0,0,0.28)]",
        blocked
          ? "border-[var(--sb-red-bright)]/45"
          : "border-[var(--sb-gold)]/34",
        className,
      )}
    >
      <div className="grid grid-cols-[42px_1fr] gap-3">
        <span
          className={classNames(
            "grid h-[42px] w-[42px] place-items-center rounded-full border bg-black/38",
            blocked
              ? "border-[var(--sb-red-bright)]/48 shadow-[0_0_22px_rgba(239,47,37,0.24)]"
              : "border-[var(--sb-gold)]/38 shadow-[0_0_22px_rgba(215,168,79,0.16)]",
          )}
        >
          <AssetIcon
            size={24}
            src={
              blocked
                ? "/assets/icons/gold-alert-icon.png"
                : "/assets/icons/check-icon.png"
            }
          />
        </span>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white">
              {blocked ? "Restaurant-only drinks" : "Age verification"}
            </h2>
            <span
              className={classNames(
                "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em]",
                blocked
                  ? "bg-[var(--sb-red-bright)]/16 text-[var(--sb-red-bright)]"
                  : "bg-[var(--sb-gold)]/18 text-[var(--sb-gold-soft)]",
              )}
            >
              {blocked ? "Reservation" : "ID required"}
            </span>
          </div>

          <p className="mt-2 text-[13px] leading-5 text-white/66">
            {blocked
              ? "Alcohol pairings stay in the dining room until online compliance and fulfillment are enabled."
              : "Regulated drinks require a recipient who is 21+ and can present valid ID at handoff."}
          </p>
          <p className="mt-2 text-[12px] leading-5 text-[var(--sb-gold-soft)]">
            {formatItemNames(gatedItems)}
          </p>

          {blocked ? (
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link
                className="red-glow-button grid min-h-11 place-items-center rounded-[11px] px-3 text-center text-[11px] uppercase tracking-[0.08em]"
                href={liquidOmakaseReservationHref}
              >
                Reserve Pairing
              </Link>
              <Link
                className="grid min-h-11 place-items-center rounded-[11px] border border-[var(--sb-gold)]/30 bg-black/24 px-3 text-center text-[11px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                href={drinksMenuHref}
              >
                View Drinks
              </Link>
            </div>
          ) : (
            <label className="mt-3 flex cursor-pointer items-start gap-3 rounded-[12px] border border-white/10 bg-black/28 p-3 text-[13px] leading-5 text-white/72 transition focus-within:border-[var(--sb-gold)]/60">
              <input
                checked={verified}
                className="mt-1 h-4 w-4 accent-[var(--sb-red-bright)]"
                onChange={(event) => onVerifiedChange(event.target.checked)}
                type="checkbox"
              />
              <span>
                I confirm the recipient is 21+ and will present valid ID at
                pickup or delivery handoff.
              </span>
            </label>
          )}

          {validationMessage ? (
            <p className="mt-2 text-[12px] leading-5 text-[var(--sb-red-bright)]">
              {validationMessage}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
