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
      <AssetIcon size={28} src={icon} />
      <div className="min-w-0">
        <span className="block text-[11px] uppercase tracking-[0.09em] text-[var(--sb-gold-soft)] min-[390px]:text-[13px] min-[390px]:tracking-[0.13em]">
          {label}
        </span>
        <span className="mt-1.5 block break-words text-[17px] leading-6 text-white min-[390px]:mt-2 min-[390px]:text-[20px]">
          {title}
        </span>
        <div className="mt-1 text-[13px] leading-5 text-white/58 min-[390px]:text-[15px] min-[390px]:leading-6">
          {children}
        </div>
      </div>
      <span
        aria-hidden="true"
        className={classNames(
          "ml-auto grid h-6 w-6 place-items-center rounded-full border min-[390px]:h-[28px] min-[390px]:w-[28px]",
          active
            ? "border-[var(--sb-red-bright)]"
            : "border-[var(--sb-border-strong)]",
        )}
      >
        {active ? (
          <span className="h-3 w-3 rounded-full bg-[var(--sb-red-bright)] min-[390px]:h-[13px] min-[390px]:w-[13px]" />
        ) : null}
      </span>
    </>
  );

  if (!onClick) {
    return (
      <div className="mt-4 grid min-h-[104px] grid-cols-[32px_minmax(0,1fr)_28px] items-center gap-2.5 rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025] px-3 min-[390px]:min-h-[116px] min-[390px]:grid-cols-[38px_1fr_32px] min-[390px]:gap-4 min-[390px]:px-4">
        {content}
      </div>
    );
  }

  return (
    <button
      aria-pressed={active}
      className="mt-4 grid min-h-[104px] w-full grid-cols-[32px_minmax(0,1fr)_28px] items-center gap-2.5 rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025] px-3 text-left min-[390px]:min-h-[116px] min-[390px]:grid-cols-[38px_1fr_32px] min-[390px]:gap-4 min-[390px]:px-4"
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
        "grid min-h-[78px] w-full grid-cols-[58px_minmax(0,1fr)_28px] items-center gap-2.5 rounded-[15px] border px-3 text-left min-[390px]:min-h-[82px] min-[390px]:grid-cols-[72px_1fr_32px] min-[390px]:gap-4 min-[390px]:px-4",
        active
          ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/10 shadow-[0_0_24px_rgb(239_47_37_/_0.2)]"
          : "border-[var(--sb-border)] bg-white/[0.025]",
      )}
      onClick={onSelect}
      type="button"
    >
      <span className="grid h-[46px] w-[54px] place-items-center rounded-[10px] border border-white/10 bg-black/34 text-[14px] font-black uppercase min-[390px]:h-[50px] min-[390px]:w-[64px] min-[390px]:text-[18px]">
        {payment.brand.slice(0, 4)}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-[16px] min-[390px]:text-[19px]">
          {payment.brand} .... {payment.last4}
        </span>
        <span className="mt-1 block text-[13px] text-white/50">
          Expires {payment.expiresAt}
        </span>
      </span>
      <span
        aria-hidden="true"
        className={classNames(
          "grid h-6 w-6 place-items-center rounded-full border min-[390px]:h-[28px] min-[390px]:w-[28px]",
          active
            ? "border-[var(--sb-red-bright)]"
            : "border-[var(--sb-border-strong)]",
        )}
      >
        {active ? (
          <span className="h-3 w-3 rounded-full bg-[var(--sb-red-bright)] min-[390px]:h-[13px] min-[390px]:w-[13px]" />
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
    <div className="grid min-h-[70px] grid-cols-[34px_minmax(0,1fr)] items-center gap-3 border-b border-white/10 px-3 last:border-b-0 min-[390px]:min-h-[72px] min-[390px]:grid-cols-[42px_1fr] min-[390px]:gap-4 min-[390px]:px-4">
      <AssetIcon size={26} src={icon} />
      <p className="min-w-0">
        <span className="block text-[12px] text-[var(--sb-gold-soft)]">
          {label}
        </span>
        <span className="mt-1 block break-words text-[14px] leading-5 text-white/72 min-[390px]:text-[16px] min-[390px]:leading-6">
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
    <div className="mt-5 grid min-h-[68px] grid-cols-[42px_minmax(0,1fr)_auto] items-center gap-3 rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025] px-3 min-[390px]:min-h-[70px] min-[390px]:grid-cols-[50px_1fr_auto] min-[390px]:gap-4 min-[390px]:px-4">
      <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--sb-red-bright)]/70 min-[390px]:h-11 min-[390px]:w-11">
        <AssetIcon size={23} src={icons.bag} />
      </span>
      <p className="min-w-0">
        <span className="block text-[12px] uppercase tracking-[0.06em] text-white/70 min-[390px]:text-[15px] min-[390px]:tracking-[0.08em]">
          Order summary
        </span>
        <span className="mt-1 block text-[14px] text-white/50">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </span>
      </p>
      <span className="shrink-0 font-mono text-[16px] text-[var(--sb-gold-soft)] min-[390px]:text-[22px]">
        {formatMoney(totals.totalCents)}
      </span>
    </div>
  );
}
