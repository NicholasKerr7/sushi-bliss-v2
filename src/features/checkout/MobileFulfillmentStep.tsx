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
  MobileTotalsCard,
  SecureCheckoutNote,
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
    <main className="mt-12">
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

      <section className="mt-6 grid gap-4" aria-label="Fulfillment method">
        {fulfillmentOptions.map((option) => (
          <button
            aria-pressed={checkout.mode === option.value}
            className={classNames(
              "grid min-h-[110px] grid-cols-[62px_minmax(0,1fr)_30px] items-center gap-3 rounded-[17px] border px-3 text-left transition min-[390px]:min-h-[118px] min-[390px]:grid-cols-[90px_minmax(0,1fr)_38px] min-[390px]:gap-4 min-[390px]:px-4",
              checkout.mode === option.value
                ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/10 shadow-[0_0_26px_rgb(239_47_37_/_0.22)]"
                : "border-[var(--sb-border-strong)] bg-white/[0.025]",
            )}
            key={option.value}
            onClick={() => checkout.setMode(option.value)}
            type="button"
          >
            <span className="grid h-[58px] w-[58px] place-items-center rounded-full border border-[var(--sb-border-strong)] bg-black/22 min-[390px]:h-[78px] min-[390px]:w-[78px]">
              <AssetIcon
                className="h-8 w-8 min-[390px]:h-[42px] min-[390px]:w-[42px]"
                size={32}
                src={option.icon}
              />
            </span>
            <span className="min-w-0">
              <span className="editorial-title block text-[23px] leading-none min-[390px]:text-[27px]">
                {option.label}
              </span>
              <span className="mt-2 block text-[15px] leading-6 text-white/62 min-[390px]:mt-3 min-[390px]:text-[17px] min-[390px]:leading-7">
                {option.description}
              </span>
            </span>
            <SelectionDot active={checkout.mode === option.value} />
          </button>
        ))}
      </section>

      <section className="mt-5 grid gap-3">
        <label className="grid min-h-[74px] grid-cols-[48px_1fr] items-center gap-4 rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025] px-4 transition focus-within:border-[var(--sb-gold)]/58 focus-within:shadow-[0_0_24px_rgba(215,168,79,0.12)]">
          <AssetIcon size={32} src={icons.clock} />
          <span className="relative block min-w-0">
            <span className="block text-[13px] uppercase tracking-[0.13em] text-[var(--sb-gold-soft)]">
              Scheduled time
            </span>
            <select
              aria-label="Scheduled time"
              className="mt-1 h-10 w-full appearance-none bg-transparent pr-8 text-[18px] font-semibold text-white outline-none"
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
          className="grid min-h-[74px] grid-cols-[48px_1fr_auto] items-center gap-4 rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025] px-4 text-left"
          onClick={() => onSummaryOpenChange(!summaryOpen)}
          type="button"
        >
          <AssetIcon size={32} src={icons.bag} />
          <span>
            <span className="block text-[13px] uppercase tracking-[0.13em] text-[var(--sb-gold-soft)]">
              View order summary
            </span>
            <span className="mt-1 block text-[18px] text-white/72">
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

      <MemberBenefitsCard className="mt-5" totals={checkout.reviewTotals} />

      <button
        className="red-glow-button mt-7 min-h-[66px] w-full rounded-[14px] text-[17px]"
        onClick={onContinue}
        type="button"
      >
        Continue
      </button>
      <SecureCheckoutNote />
    </main>
  );
}

function SelectionDot({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={classNames(
        "grid h-[30px] w-[30px] place-items-center rounded-full border",
        active
          ? "border-[var(--sb-red-bright)]"
          : "border-[var(--sb-border-strong)]",
      )}
    >
      {active ? (
        <span className="h-[15px] w-[15px] rounded-full bg-[var(--sb-red-bright)]" />
      ) : null}
    </span>
  );
}
