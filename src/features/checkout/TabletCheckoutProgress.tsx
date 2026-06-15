"use client";

import { Fragment } from "react";

import { classNames } from "@/lib/classNames";

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
    <ol className="mt-3 grid grid-cols-[1fr_72px_1fr_72px_1fr] items-center gap-2 text-[12px] text-white/54">
      {checkoutSteps.map((step, index) => {
        const isActive = step.id <= activeStep;
        const isCurrent = step.id === activeStep;

        return (
          <Fragment key={step.id}>
            <li
              aria-current={isCurrent ? "step" : undefined}
              className={classNames(
                "flex min-w-0 items-center gap-3 rounded-[14px] border px-3 py-2",
                isActive
                  ? "border-[var(--sb-red-bright)]/42 bg-[radial-gradient(circle_at_14%_50%,rgba(238,43,36,0.18),transparent_52%),rgba(255,255,255,0.035)]"
                  : "border-white/10 bg-black/20",
              )}
            >
              <span
                className={classNames(
                  "relative grid h-8 w-8 shrink-0 place-items-center rounded-full border text-[14px]",
                  isActive
                    ? "border-[var(--sb-red-bright)] bg-black/54 text-[var(--sb-gold-soft)] shadow-[0_0_18px_var(--sb-red-glow)]"
                    : "border-white/14 bg-black/42 text-white/42",
                )}
              >
                {step.id}
                {isCurrent ? (
                  <span className="absolute -bottom-1 h-1 w-6 rounded-full bg-[var(--sb-red-bright)] shadow-[0_0_14px_rgba(238,43,36,0.72)]" />
                ) : null}
              </span>
              <span
                className={
                  isActive
                    ? "truncate text-white"
                    : "hidden truncate text-white/54 lg:inline"
                }
              >
                {step.label}
              </span>
            </li>
            {index < checkoutSteps.length - 1 ? (
              <li
                aria-hidden="true"
                className={classNames(
                  "relative h-[7px] overflow-hidden rounded-full border border-white/[0.045] bg-black/54 shadow-[inset_0_0_10px_rgba(0,0,0,0.72)]",
                  step.id < activeStep
                    ? "before:absolute before:inset-y-[1px] before:left-0 before:right-0 before:rounded-full before:bg-[linear-gradient(90deg,var(--sb-red-bright),var(--sb-gold-soft))] before:shadow-[0_0_16px_rgba(238,43,36,0.64)] before:content-[''] after:absolute after:inset-y-[2px] after:left-2 after:right-2 after:rounded-full after:bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.36)_0_7px,transparent_7px_14px)] after:opacity-45 after:content-['']"
                    : "before:absolute before:inset-y-[2px] before:left-2 before:right-2 before:rounded-full before:bg-white/10 before:content-['']",
                )}
              />
            ) : null}
          </Fragment>
        );
      })}
    </ol>
  );
}
