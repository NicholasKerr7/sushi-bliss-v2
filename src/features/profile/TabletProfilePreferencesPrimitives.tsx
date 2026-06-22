"use client";

import { classNames } from "@/lib/classNames";
import type { PaymentMethod } from "@/types/user";

import {
  getTabletCardClassName,
  getTabletCardLabel,
} from "./TabletProfilePreferencesData";

export function TabletSwitch({
  checked,
  id,
  label,
  onCheckedChange,
}: {
  checked: boolean;
  id: string;
  label: string;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <button
      aria-checked={checked}
      aria-label={label}
      className={classNames(
        "relative h-[30px] w-[54px] rounded-full border border-white/10 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
        checked ? "bg-[var(--sb-red)]" : "bg-white/18",
      )}
      id={id}
      onClick={() => onCheckedChange(!checked)}
      role="switch"
      type="button"
    >
      <span
        className={classNames(
          "absolute top-1 grid h-[22px] w-[22px] place-items-center rounded-full bg-white transition",
          checked ? "left-[26px]" : "left-1",
        )}
      />
    </button>
  );
}

export function TabletPaymentMark({
  paymentMethod,
}: {
  paymentMethod: PaymentMethod;
}) {
  return (
    <span
      className={classNames(
        "w-[82px] text-[18px] font-black italic tracking-tight",
        getTabletCardClassName(paymentMethod),
      )}
    >
      {getTabletCardLabel(paymentMethod)}
    </span>
  );
}
