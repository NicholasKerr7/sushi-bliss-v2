import type { ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type { OrderTotals } from "@/types/order";
import type { Address, PaymentMethod } from "@/types/user";

export function MobileSelectionCard({
  active = false,
  children,
  icon,
  label,
  onClick,
  title,
}: {
  active?: boolean;
  children: ReactNode;
  icon?: string;
  label: string;
  onClick?: () => void;
  title: string;
}) {
  const content = (
    <>
      <AssetIcon size={34} src={icon} />
      <div>
        <span className="block text-[13px] uppercase tracking-[0.13em] text-[var(--sb-gold-soft)]">
          {label}
        </span>
        <span className="mt-2 block text-[20px] text-white">{title}</span>
        <div className="mt-1 text-[15px] leading-6 text-white/58">
          {children}
        </div>
      </div>
      <span
        aria-hidden="true"
        className={classNames(
          "ml-auto grid h-[28px] w-[28px] place-items-center rounded-full border",
          active
            ? "border-[var(--sb-red-bright)]"
            : "border-[var(--sb-border-strong)]",
        )}
      >
        {active ? (
          <span className="h-[13px] w-[13px] rounded-full bg-[var(--sb-red-bright)]" />
        ) : null}
      </span>
    </>
  );

  if (!onClick) {
    return (
      <div className="mt-4 grid min-h-[116px] grid-cols-[38px_1fr_32px] items-center gap-4 rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025] px-4">
        {content}
      </div>
    );
  }

  return (
    <button
      aria-pressed={active}
      className="mt-4 grid min-h-[116px] w-full grid-cols-[38px_1fr_32px] items-center gap-4 rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025] px-4 text-left"
      onClick={onClick}
      type="button"
    >
      {content}
    </button>
  );
}

export function AddressChoice({
  active = false,
  address,
  label = "Saved address",
  onSelect,
}: {
  active?: boolean;
  address: Address;
  label?: string;
  onSelect: () => void;
}) {
  return (
    <MobileSelectionCard
      active={active}
      icon={icons.location}
      label={label}
      onClick={onSelect}
      title={address.label}
    >
      <p>
        {address.line1}
        {address.line2 ? `, ${address.line2}` : ""}
      </p>
      <p>
        {address.city}, {address.region} {address.postalCode}
      </p>
    </MobileSelectionCard>
  );
}

export function MobileTextInput({
  label,
  onChange,
  placeholder,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  value: string;
}) {
  return (
    <label className="block">
      <span className="text-[12px] uppercase tracking-[0.1em] text-white/46">
        {label}
      </span>
      <input
        className="mt-2 h-12 w-full rounded-[12px] border border-white/10 bg-black/28 px-4 text-[15px] text-white outline-none placeholder:text-white/35 focus:border-[var(--sb-gold)]"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        value={value}
      />
    </label>
  );
}

export function PaymentChoice({
  active,
  onSelect,
  payment,
}: {
  active: boolean;
  onSelect: () => void;
  payment: PaymentMethod;
}) {
  return (
    <button
      aria-pressed={active}
      className={classNames(
        "grid min-h-[82px] w-full grid-cols-[72px_1fr_32px] items-center gap-4 rounded-[15px] border px-4 text-left",
        active
          ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/10 shadow-[0_0_24px_rgb(239_47_37_/_0.2)]"
          : "border-[var(--sb-border)] bg-white/[0.025]",
      )}
      onClick={onSelect}
      type="button"
    >
      <span className="grid h-[50px] w-[64px] place-items-center rounded-[10px] border border-white/10 bg-black/34 text-[18px] font-black uppercase">
        {payment.brand.slice(0, 4)}
      </span>
      <span>
        <span className="block text-[19px]">
          {payment.brand} .... {payment.last4}
        </span>
        <span className="mt-1 block text-[13px] text-white/50">
          Expires {payment.expiresAt}
        </span>
      </span>
      <span
        aria-hidden="true"
        className={classNames(
          "grid h-[28px] w-[28px] place-items-center rounded-full border",
          active
            ? "border-[var(--sb-red-bright)]"
            : "border-[var(--sb-border-strong)]",
        )}
      >
        {active ? (
          <span className="h-[13px] w-[13px] rounded-full bg-[var(--sb-red-bright)]" />
        ) : null}
      </span>
    </button>
  );
}

export function BillingRow({
  icon,
  label,
  value,
}: {
  icon?: string;
  label: string;
  value: string;
}) {
  return (
    <div className="grid min-h-[72px] grid-cols-[42px_1fr] items-center gap-4 border-b border-white/10 px-4 last:border-b-0">
      <AssetIcon size={30} src={icon} />
      <p>
        <span className="block text-[12px] text-[var(--sb-gold-soft)]">
          {label}
        </span>
        <span className="mt-1 block text-[16px] leading-6 text-white/72">
          {value}
        </span>
      </p>
    </div>
  );
}

export function OrderSummaryDisclosure({
  itemCount,
  totals,
}: {
  itemCount: number;
  totals: OrderTotals;
}) {
  return (
    <div className="mt-5 grid min-h-[70px] grid-cols-[50px_1fr_auto] items-center gap-4 rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025] px-4">
      <span className="grid h-11 w-11 place-items-center rounded-full border border-[var(--sb-red-bright)]/70">
        <AssetIcon size={25} src={icons.bag} />
      </span>
      <p>
        <span className="block text-[15px] uppercase tracking-[0.08em] text-white/70">
          Order summary
        </span>
        <span className="mt-1 block text-[14px] text-white/50">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </span>
      </p>
      <span className="font-mono text-[22px] text-[var(--sb-gold-soft)]">
        {formatMoney(totals.totalCents)}
      </span>
    </div>
  );
}
