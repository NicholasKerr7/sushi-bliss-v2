"use client";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type { FulfillmentMode } from "@/types/common";
import type { CartLineItem } from "@/types/order";

import { AgeVerificationNotice } from "./AgeVerificationNotice";
import {
  MemberBenefitsCard,
  MobileCheckoutActionDock,
  MobileTotalsCard,
  StepHeading,
} from "./MobileCheckoutPrimitives";
import type { MobileCheckoutState } from "./mobileCheckoutTypes";

const fulfillmentOptions: Array<{
  description: string;
  icon: string | undefined;
  label: string;
  value: FulfillmentMode;
}> = [
  {
    description: "We'll bring your sushi straight to your door.",
    icon: icons.location,
    label: "Delivery",
    value: "delivery",
  },
  {
    description: "Pick up your order from Sushi Bliss.",
    icon: icons.bag,
    label: "Pickup",
    value: "pickup",
  },
];

export function FulfillmentStep({
  checkout,
  itemCount,
  items,
  onContinue,
  onSummaryOpenChange,
  summaryOpen,
}: {
  checkout: MobileCheckoutState;
  itemCount: number;
  items: CartLineItem[];
  onContinue: () => void;
  onSummaryOpenChange: (open: boolean) => void;
  summaryOpen: boolean;
}) {
  return (
    <main className="mt-6 min-[390px]:mt-8">
      <StepHeading
        subtitle="How would you like to receive your order?"
        title="Checkout"
      />

      <AgeVerificationNotice
        className="mt-5"
        items={items}
        onVerifiedChange={checkout.setAgeVerified}
        validationMessage={checkout.validation.ageVerification}
        verified={checkout.ageVerified}
      />

      <section className="mt-5 grid gap-3" aria-label="Fulfillment method">
        {fulfillmentOptions.map((option) => (
          <button
            aria-pressed={checkout.mode === option.value}
            className={classNames(
              "grid min-h-[84px] grid-cols-[46px_minmax(0,1fr)_24px] items-center gap-2.5 rounded-[16px] border px-3 text-left transition min-[390px]:min-h-[94px] min-[390px]:grid-cols-[54px_minmax(0,1fr)_28px] min-[390px]:gap-3 min-[390px]:px-4",
              checkout.mode === option.value
                ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/10 shadow-[0_0_26px_rgb(239_47_37_/_0.22)]"
                : "border-[var(--sb-border-strong)] bg-white/[0.025]",
            )}
            key={option.value}
            onClick={() => checkout.setMode(option.value)}
            type="button"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full border border-[var(--sb-border-strong)] bg-black/22 min-[390px]:h-[50px] min-[390px]:w-[50px]">
              <AssetIcon
                className="h-6 w-6 min-[390px]:h-7 min-[390px]:w-7"
                size={32}
                src={option.icon}
              />
            </span>
            <span className="min-w-0">
              <span className="editorial-title block text-[18px] leading-none min-[390px]:text-[21px]">
                {option.label}
              </span>
              <span className="mt-2 block text-[12px] leading-5 text-white/62 min-[390px]:text-[13px]">
                {option.description}
              </span>
            </span>
            <SelectionDot active={checkout.mode === option.value} />
          </button>
        ))}
      </section>

      <section className="mt-4 grid gap-3">
        <label className="grid min-h-[64px] grid-cols-[34px_minmax(0,1fr)] items-center gap-3 rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025] px-3 transition focus-within:border-[var(--sb-gold)]/58 focus-within:shadow-[0_0_24px_rgba(215,168,79,0.12)] min-[390px]:min-h-[68px] min-[390px]:grid-cols-[40px_1fr] min-[390px]:px-4">
          <AssetIcon size={25} src={icons.clock} />
          <span className="relative block min-w-0">
            <span className="block text-[10px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] min-[390px]:text-[11px] min-[390px]:tracking-[0.1em]">
              Scheduled time
            </span>
            <select
              aria-label="Scheduled time"
              className="mt-1 h-8 w-full appearance-none bg-transparent pr-8 text-[14px] font-semibold text-white outline-none min-[390px]:h-9 min-[390px]:text-[16px]"
              onChange={(event) => checkout.setSelectedTime(event.target.value)}
              value={checkout.selectedTime}
            >
              {checkout.timeSlots.map((slot) => (
                <option
                  className="bg-[#050607] text-white"
                  key={slot.id}
                  value={slot.value}
                >
                  {slot.label}
                </option>
              ))}
            </select>
            <ChevronIcon
              className="pointer-events-none absolute bottom-1 right-0 text-[var(--sb-gold)] drop-shadow-[0_0_10px_rgba(215,168,79,0.32)]"
              direction="down"
              size={20}
            />
          </span>
        </label>

        <button
          aria-expanded={summaryOpen}
          className="grid min-h-[64px] grid-cols-[34px_minmax(0,1fr)_22px] items-center gap-3 rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025] px-3 text-left min-[390px]:min-h-[68px] min-[390px]:grid-cols-[40px_1fr_auto] min-[390px]:px-4"
          onClick={() => onSummaryOpenChange(!summaryOpen)}
          type="button"
        >
          <AssetIcon size={25} src={icons.bag} />
          <span className="min-w-0">
            <span className="block text-[10px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] min-[390px]:text-[11px] min-[390px]:tracking-[0.1em]">
              View order summary
            </span>
            <span className="mt-1 block text-[13px] text-white/72 min-[390px]:text-[15px]">
              {itemCount} {itemCount === 1 ? "item" : "items"} -{" "}
              {formatMoney(checkout.reviewTotals.totalCents)}
            </span>
          </span>
          <ChevronIcon
            className="text-[var(--sb-gold-soft)]"
            direction={summaryOpen ? "up" : "down"}
            size={20}
          />
        </button>
      </section>

      {summaryOpen ? (
        <MobileTotalsCard className="mt-4" totals={checkout.reviewTotals} />
      ) : null}

      <MemberBenefitsCard className="mt-4" totals={checkout.reviewTotals} />

      <MobileCheckoutActionDock
        label="Continue"
        meta={`${itemCount} ${itemCount === 1 ? "item" : "items"}`}
        onClick={onContinue}
        value={formatMoney(checkout.reviewTotals.totalCents)}
      />
    </main>
  );
}

function SelectionDot({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={classNames(
        "grid h-5 w-5 place-items-center rounded-full border min-[390px]:h-6 min-[390px]:w-6",
        active
          ? "border-[var(--sb-red-bright)]"
          : "border-[var(--sb-border-strong)]",
      )}
    >
      {active ? (
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--sb-red-bright)] min-[390px]:h-3 min-[390px]:w-3" />
      ) : null}
    </span>
  );
}
