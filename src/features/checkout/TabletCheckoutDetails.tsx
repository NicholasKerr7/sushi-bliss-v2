"use client";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { icons } from "@/features/home/visualHomeData";
import { formatDateTime } from "@/lib/dates";
import { calculateTipCents, formatMoney } from "@/lib/money";
import type { FulfillmentMode } from "@/types/common";
import type { CartLineItem } from "@/types/order";

import {
  TabletCheckoutAddressPanel,
  TabletCheckoutPaymentPanel,
} from "./TabletCheckoutPanels";
import { TabletCheckoutProgress } from "./TabletCheckoutProgress";
import { TabletCheckoutSelectLike } from "./TabletCheckoutSelectLike";
import { TabletCheckoutStepTitle } from "./TabletCheckoutStepTitle";
import { TabletCheckoutSummary } from "./TabletCheckoutSummary";
import type { TabletCheckoutState } from "./tabletCheckoutTypes";

interface TabletCheckoutDetailsProps {
  addressExpanded: boolean;
  checkout: TabletCheckoutState;
  instructions: string;
  itemCount: number;
  items: CartLineItem[];
  onAddressExpandedChange: (expanded: boolean) => void;
  onContinueToReview: () => void;
  onEditCart: () => void;
  onInstructionsChange: (value: string) => void;
  onPaymentsExpandedChange: (expanded: boolean) => void;
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  paymentsExpanded: boolean;
}

const fulfillmentOptions: Array<{
  description: string;
  icon: string | undefined;
  label: string;
  value: FulfillmentMode;
}> = [
  {
    description: "We'll deliver to your address",
    icon: icons.location,
    label: "Delivery",
    value: "delivery",
  },
  {
    description: "Pick up at our restaurant",
    icon: icons.bag,
    label: "Pickup",
    value: "pickup",
  },
];
const tipPercentOptions = [10, 15, 20] as const;

export function TabletCheckoutDetails({
  addressExpanded,
  checkout,
  instructions,
  itemCount,
  items,
  onAddressExpandedChange,
  onContinueToReview,
  onEditCart,
  onInstructionsChange,
  onPaymentsExpandedChange,
  onRemoveItem,
  onUpdateQuantity,
  paymentsExpanded,
}: TabletCheckoutDetailsProps) {
  return (
    <>
      <div className="mt-5 flex items-center gap-7">
        <h1
          className="editorial-title text-[44px] uppercase leading-none tracking-[0.08em]"
          id="tablet-checkout-title"
        >
          Checkout
        </h1>
        <p className="text-[16px] text-[var(--sb-gold-soft)]">
          Almost there! Complete your order.
        </p>
      </div>

      <TabletCheckoutProgress activeStep={1} />

      <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_390px]">
        <section className="rounded-[18px] border border-white/10 bg-white/[0.04] p-4">
          <TabletCheckoutStepTitle number={1} title="Delivery or pickup" />
          <div className="mt-4 grid grid-cols-2 gap-3">
            {fulfillmentOptions.map((option) => (
              <button
                aria-pressed={checkout.mode === option.value}
                className={`flex min-h-[70px] items-center gap-4 rounded-[12px] border px-5 text-left transition ${
                  checkout.mode === option.value
                    ? "red-glow-button border-[var(--sb-red-bright)]"
                    : "border-white/12 bg-black/20"
                }`}
                key={option.value}
                onClick={() => checkout.setMode(option.value)}
                type="button"
              >
                <AssetIcon size={30} src={option.icon} />
                <span>
                  <span className="block text-[18px] font-semibold uppercase">
                    {option.label}
                  </span>
                  <span className="mt-1 block text-[13px] text-white/62">
                    {option.description}
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div className="mt-4 border-t border-white/10 pt-4">
            <TabletCheckoutStepTitle
              action={
                checkout.mode === "delivery" ? (
                  <button
                    className="text-[13px] uppercase text-[var(--sb-gold-soft)]"
                    onClick={() => onAddressExpandedChange(!addressExpanded)}
                    type="button"
                  >
                    Change
                  </button>
                ) : null
              }
              number={2}
              title={
                checkout.mode === "delivery"
                  ? "Delivery address"
                  : "Pickup location"
              }
            />
            <TabletCheckoutAddressPanel
              checkout={checkout}
              expanded={addressExpanded}
              onExpandedChange={onAddressExpandedChange}
            />
          </div>

          <div className="mt-4 border-t border-white/10 pt-4">
            <TabletCheckoutStepTitle number={3} title="Date & time" />
            <div className="mt-3 grid grid-cols-2 gap-3">
              <TabletCheckoutSelectLike
                label="Date"
                value={
                  formatDateTime(checkout.selectedTime).split(",")[0] || "Today"
                }
              />
              <label className="block rounded-[12px] border border-white/10 bg-black/22 px-4 py-3">
                <span className="block text-[12px] uppercase tracking-[0.12em] text-white/46">
                  Time
                </span>
                <select
                  className="mt-2 w-full appearance-none bg-transparent text-[16px] text-white outline-none"
                  onChange={(event) =>
                    checkout.setSelectedTime(event.target.value)
                  }
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
              </label>
            </div>
            {checkout.validation.time ? (
              <p className="mt-2 text-[12px] text-[var(--sb-red-bright)]">
                {checkout.validation.time}
              </p>
            ) : null}
          </div>

          <div className="mt-4 border-t border-white/10 pt-4">
            <label
              className="text-[18px] font-semibold uppercase tracking-[0.08em]"
              htmlFor="tablet-checkout-instructions"
            >
              Special instructions
            </label>
            <textarea
              className="mt-3 min-h-[64px] w-full resize-none rounded-[12px] border border-white/10 bg-black/22 px-4 py-3 text-[15px] text-white outline-none placeholder:text-white/36 focus:border-[var(--sb-gold)] focus:ring-2 focus:ring-[var(--sb-gold)]/20"
              id="tablet-checkout-instructions"
              maxLength={250}
              onChange={(event) => onInstructionsChange(event.target.value)}
              placeholder="Please include soy sauce, wasabi, or delivery notes."
              value={instructions}
            />
            <p className="mt-1 text-right text-[12px] text-white/42">
              {instructions.length}/250
            </p>
          </div>

          <div className="mt-4 border-t border-white/10 pt-4">
            <TabletCheckoutStepTitle number={5} title="Add a tip" />
            <p className="mt-2 text-[13px] text-white/56">
              100% of tips go to our team.
            </p>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {tipPercentOptions.map((option) => (
                <button
                  aria-pressed={checkout.tipPercent === option}
                  className={`min-h-[58px] rounded-[12px] border text-center transition ${
                    checkout.tipPercent === option
                      ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/24 text-white shadow-[0_0_22px_var(--sb-red-glow)]"
                      : "border-white/10 bg-black/22 text-white/72"
                  }`}
                  key={option}
                  onClick={() => checkout.setTipPercent(option)}
                  type="button"
                >
                  <span className="block text-[16px]">{option}%</span>
                  <span className="mt-1 block font-mono text-[12px] text-white/54">
                    {formatMoney(
                      calculateTipCents(
                        checkout.reviewTotals.subtotalCents,
                        option,
                      ),
                    )}
                  </span>
                </button>
              ))}
              <button
                className="min-h-[58px] rounded-[12px] border border-white/10 bg-black/22 text-[13px] uppercase text-white/42"
                disabled
                title="Custom tip coming soon"
                type="button"
              >
                Custom
              </button>
            </div>
          </div>

          <div className="mt-4 border-t border-white/10 pt-4">
            <TabletCheckoutStepTitle
              action={
                <button
                  className="text-[13px] uppercase text-[var(--sb-gold-soft)]"
                  onClick={() => onPaymentsExpandedChange(!paymentsExpanded)}
                  type="button"
                >
                  Change
                </button>
              }
              number={6}
              title="Payment method"
            />
            <TabletCheckoutPaymentPanel
              checkout={checkout}
              expanded={paymentsExpanded}
              onExpandedChange={onPaymentsExpandedChange}
            />
          </div>

          <Button
            className="red-glow-button mt-4 h-[58px] w-full rounded-[12px] text-[17px] uppercase tracking-[0.08em]"
            disabled={items.length === 0}
            onClick={onContinueToReview}
          >
            Continue to review - {formatMoney(checkout.reviewTotals.totalCents)}
          </Button>
        </section>

        <TabletCheckoutSummary
          itemCount={itemCount}
          items={items}
          onEditCart={onEditCart}
          onRemoveItem={onRemoveItem}
          onUpdateQuantity={onUpdateQuantity}
          totals={checkout.reviewTotals}
        />
      </div>
    </>
  );
}
