"use client";

import { Fragment } from "react";

interface TabletCheckoutProgressProps {
  activeStep: 1 | 2 | 3;
}

const checkoutSteps = [
  { id: 1, label: "Delivery / Pickup" },
  { id: 2, label: "Payment" },
  { id: 3, label: "Review" },
] as const;

export function TabletCheckoutProgress({
  activeStep,
}: TabletCheckoutProgressProps) {
  return (
    <ol className="mt-3 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 text-[12px] text-white/54">
      {checkoutSteps.map((step, index) => {
        const isActive = step.id <= activeStep;

        return (
          <Fragment key={step.id}>
            <li className="flex items-center gap-3">
              <span
                className={`grid h-7 w-7 place-items-center rounded-full border text-[14px] ${
                  isActive
                    ? "border-[var(--sb-red-bright)] text-[var(--sb-gold-soft)] shadow-[0_0_18px_var(--sb-red-glow)]"
                    : "border-[var(--sb-border)] text-[var(--sb-gold)]"
                }`}
              >
                {step.id}
              </span>
              <span
                className={
                  isActive ? "text-white" : "hidden text-white/54 lg:inline"
                }
              >
                {step.label}
              </span>
            </li>
            {index < checkoutSteps.length - 1 ? (
              <li
                aria-hidden="true"
                className={`h-px w-full ${
                  step.id < activeStep
                    ? "bg-[var(--sb-red-bright)]"
                    : "bg-white/12"
                }`}
              />
            ) : null}
          </Fragment>
        );
      })}
    </ol>
  );
}
