"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { brand, icons } from "@/features/home/visualHomeData";
import { calculateCartLineSubtotal } from "@/lib/cart";
import { classNames } from "@/lib/classNames";
import { formatMoney } from "@/lib/money";
import type { CartLineItem, OrderTotals } from "@/types/order";
import type { Address, PaymentMethod } from "@/types/user";

import type { MobileCheckoutState } from "./mobileCheckoutTypes";

const checkoutSteps = ["Delivery", "Address", "Payment", "Review"] as const;

export function MobileCheckoutHeader({
  itemCount,
  onBackToCart,
  onClose,
}: {
  itemCount: number;
  onBackToCart?: () => void;
  onClose: () => void;
}) {
  return (
    <header className="flex items-center justify-between gap-4">
      <button
        aria-label="Back to cart"
        className="flex min-w-0 items-center gap-3 rounded-[14px] text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
        onClick={onBackToCart || onClose}
        type="button"
      >
        <AssetIcon
          alt=""
          className="rounded-full"
          loading="eager"
          size={52}
          src={brand.assets.floralEmblem.publicUrl}
        />
        <span className="editorial-title text-[16px] leading-[0.96] tracking-[0.38em]">
          Sushi
          <br />
          Bliss
        </span>
      </button>

      <div className="flex items-center gap-3">
        <div className="relative grid h-[48px] w-[48px] place-items-center rounded-full border border-[var(--sb-border)] bg-black/34">
          <AssetIcon loading="eager" size={27} src={icons.cart} />
          {itemCount > 0 ? (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[10px] font-bold">
              {itemCount}
            </span>
          ) : null}
        </div>
        <button
          aria-label="Close checkout"
          className="grid h-[48px] w-[48px] place-items-center rounded-full border border-[var(--sb-border)] bg-black/34"
          onClick={onClose}
          type="button"
        >
          <AssetIcon loading="eager" size={25} src={icons.bell} />
        </button>
      </div>
    </header>
  );
}

export function MobileCheckoutProgress({
  activeIndex,
}: {
  activeIndex: number;
}) {
  return (
    <nav aria-label="Checkout progress" className="mt-9">
      <ol className="relative isolate grid grid-cols-4 items-start gap-2">
        {checkoutSteps.map((label, index) => {
          const current = index === activeIndex;
          const complete = index < activeIndex;
          const connected = complete || current;

          return (
            <li
              aria-current={current ? "step" : undefined}
              className="relative text-center"
              key={label}
            >
              {index > 0 ? (
                <span
                  aria-hidden="true"
                  className={classNames(
                    "absolute left-[-50%] top-[23px] h-[6px] w-full overflow-hidden rounded-full border border-white/[0.045] bg-black/52 shadow-[inset_0_0_10px_rgba(0,0,0,0.72)]",
                    connected
                      ? "before:absolute before:inset-y-[1px] before:left-0 before:right-0 before:rounded-full before:bg-[linear-gradient(90deg,var(--sb-red-bright),var(--sb-gold-soft))] before:shadow-[0_0_18px_rgba(238,43,36,0.68)] before:content-[''] after:absolute after:inset-y-[2px] after:left-2 after:right-2 after:rounded-full after:bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.42)_0_8px,transparent_8px_16px)] after:opacity-45 after:content-['']"
                      : "before:absolute before:inset-y-[2px] before:left-2 before:right-2 before:rounded-full before:bg-white/10 before:content-['']",
                  )}
                />
              ) : null}
              <span
                className={classNames(
                  "relative z-10 mx-auto grid h-12 w-12 place-items-center rounded-full border text-[18px] transition",
                  current
                    ? "border-[var(--sb-red-bright)] bg-[radial-gradient(circle_at_50%_35%,rgba(255,111,91,0.32),rgba(238,43,36,0.18)_45%,rgba(0,0,0,0.72)_78%)] text-white shadow-[0_0_28px_var(--sb-red-glow),inset_0_0_18px_rgba(238,43,36,0.28)]"
                    : complete
                      ? "border-[var(--sb-gold)]/70 bg-[radial-gradient(circle_at_50%_35%,rgba(215,168,79,0.22),rgba(0,0,0,0.72)_72%)] text-[var(--sb-gold-soft)] shadow-[0_0_18px_rgba(215,168,79,0.22)]"
                      : "border-white/16 bg-black/44 text-white/44 shadow-[inset_0_0_14px_rgba(0,0,0,0.62)]",
                )}
              >
                {index + 1}
                {current ? (
                  <span className="absolute -bottom-1 h-1.5 w-8 rounded-full bg-[var(--sb-red-bright)] shadow-[0_0_16px_rgba(238,43,36,0.78)]" />
                ) : null}
              </span>
              <span
                className={classNames(
                  "mt-3 block text-[12px] uppercase leading-4 tracking-[0.08em]",
                  current
                    ? "text-[var(--sb-red-bright)]"
                    : complete
                      ? "text-[var(--sb-gold-soft)]"
                      : "text-white/54",
                )}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function StepHeading({
  eyebrow,
  subtitle,
  title,
}: {
  eyebrow?: string;
  subtitle?: string;
  title: string;
}) {
  return (
    <header>
      {eyebrow ? (
        <p className="editorial-title text-[25px] text-[var(--sb-gold-soft)]">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="editorial-title mt-5 text-[42px] leading-none">{title}</h1>
      {subtitle ? (
        <p className="mt-3 text-[17px] leading-6 text-[var(--sb-gold-soft)]">
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}

export function MobileBackButton({ onBack }: { onBack: () => void }) {
  return (
    <button
      className="mb-5 rounded-full border border-[var(--sb-border)] bg-white/[0.025] px-4 py-2 text-[12px] uppercase tracking-[0.1em] text-white/66"
      onClick={onBack}
      type="button"
    >
      Back
    </button>
  );
}

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

export function ReviewInfoCard({
  children,
  icon,
  label,
  onEdit,
  title,
}: {
  children?: ReactNode;
  icon?: string;
  label: string;
  onEdit: () => void;
  title: string;
}) {
  return (
    <article className="grid min-h-[78px] grid-cols-[42px_1fr_auto] items-center gap-4 rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025] px-4 py-3">
      <AssetIcon size={31} src={icon} />
      <div>
        <p className="text-[12px] uppercase tracking-[0.13em] text-[var(--sb-gold-soft)]">
          {label}
        </p>
        <p className="mt-1 text-[17px] leading-6 text-white">{title}</p>
        {children ? (
          <div className="mt-1 text-[13px] leading-5 text-white/52">
            {children}
          </div>
        ) : null}
      </div>
      <button
        className="text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
        onClick={onEdit}
        type="button"
      >
        Edit
      </button>
    </article>
  );
}

export function ReviewLine({
  item,
  onRemoveItem,
}: {
  item: CartLineItem;
  onRemoveItem: (id: string) => void;
}) {
  return (
    <article className="grid grid-cols-[78px_42px_1fr_auto] items-center gap-3 py-3 first:pt-0 last:pb-0">
      <div className="relative h-[66px] overflow-hidden rounded-[10px] border border-white/10 bg-black/30">
        <Image
          alt={item.menuItem.image.alt || item.menuItem.name}
          className="object-cover"
          fill
          sizes="78px"
          src={item.menuItem.image.publicUrl}
        />
      </div>
      <span className="grid h-8 w-8 place-items-center rounded-full border border-[var(--sb-border-strong)] text-[var(--sb-gold-soft)]">
        {item.quantity}
      </span>
      <div className="min-w-0">
        <h2 className="text-[17px] leading-6">{item.menuItem.name}</h2>
        <p className="line-clamp-2 text-[13px] leading-5 text-white/50">
          {item.menuItem.description}
        </p>
        <button
          className="mt-1 text-[12px] text-[var(--sb-red-bright)]"
          onClick={() => onRemoveItem(item.id)}
          type="button"
        >
          Remove
        </button>
      </div>
      <p className="font-mono text-[16px] text-[var(--sb-gold-soft)]">
        {formatMoney(calculateCartLineSubtotal(item))}
      </p>
    </article>
  );
}

export function MobileTotalsCard({
  className,
  itemCount,
  totals,
}: {
  className?: string;
  itemCount?: number;
  totals: OrderTotals;
}) {
  return (
    <section
      className={classNames(
        "rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025] p-4",
        className,
      )}
    >
      <div className="space-y-3 text-[15px]">
        <SummaryLine
          label={itemCount ? `Subtotal (${itemCount} items)` : "Subtotal"}
          value={formatMoney(totals.subtotalCents)}
        />
        {totals.discountCents > 0 ? (
          <SummaryLine
            label="Promo code"
            value={`-${formatMoney(totals.discountCents)}`}
            valueClassName="text-[var(--sb-wasabi)]"
          />
        ) : null}
        <SummaryLine
          label="Service fee"
          value={formatMoney(totals.serviceFeeCents)}
        />
        <SummaryLine label="Tax" value={formatMoney(totals.taxCents)} />
        {totals.tipCents > 0 ? (
          <SummaryLine label="Tip" value={formatMoney(totals.tipCents)} />
        ) : null}
      </div>
      <div className="mt-4 border-t border-white/10 pt-4">
        <SummaryLine
          large
          label="Total"
          value={formatMoney(totals.totalCents)}
        />
      </div>
    </section>
  );
}

export function MemberBenefitsCard({
  className,
  totals,
}: {
  className?: string;
  totals: OrderTotals;
}) {
  const pointsEarned = Math.max(0, Math.floor(totals.subtotalCents / 100));

  return (
    <section
      className={classNames(
        "grid min-h-[92px] grid-cols-[58px_1fr_auto] items-center gap-4 rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025] px-4",
        className,
      )}
    >
      <span className="grid h-[54px] w-[54px] place-items-center rounded-full border border-[var(--sb-red-bright)]/70">
        <AssetIcon size={34} src={icons.flower} />
      </span>
      <p>
        <span className="block text-[16px] uppercase tracking-[0.09em] text-[var(--sb-gold-soft)]">
          Bliss member benefits
        </span>
        <span className="mt-1 block text-[14px] leading-5 text-white/56">
          You&apos;ll earn {pointsEarned} pts with this order.
        </span>
      </p>
      <span className="rounded-[8px] border border-[var(--sb-gold)]/60 px-3 py-1 text-[12px] uppercase text-[var(--sb-gold-soft)]">
        Gold
      </span>
    </section>
  );
}

export function ReviewPromoTip({
  checkout,
}: {
  checkout: MobileCheckoutState;
}) {
  return (
    <section className="mt-4 grid grid-cols-2 overflow-hidden rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025]">
      <div className="border-r border-white/10 p-4">
        <p className="text-[13px] text-white/68">Promo Code</p>
        <p
          className={classNames(
            "mt-1 text-[13px]",
            checkout.appliedPromo ? "text-[var(--sb-wasabi)]" : "text-white/42",
          )}
        >
          {checkout.appliedPromo?.code || "None applied"}
        </p>
      </div>
      <div className="p-4 text-right">
        <p className="text-[13px] text-white/68">Tip</p>
        <p className="mt-1 text-[13px] text-[var(--sb-gold-soft)]">
          {checkout.tipPercent}% · {formatMoney(checkout.reviewTotals.tipCents)}
        </p>
      </div>
    </section>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="editorial-title text-[20px] text-[var(--sb-gold-soft)]">
      {children}
    </h2>
  );
}

export function SecureInlineCopy({ children }: { children: ReactNode }) {
  return (
    <p className="mt-5 flex items-center justify-center gap-3 text-center text-[14px] text-white/48">
      <LockGlyph />
      {children}
    </p>
  );
}

export function SecureCheckoutNote() {
  return (
    <p className="mt-5 flex items-center justify-center gap-3 text-center text-[14px] text-white/48">
      <LockGlyph />
      Secure checkout · Your information is always protected.
    </p>
  );
}

function SummaryLine({
  label,
  large,
  value,
  valueClassName,
}: {
  label: string;
  large?: boolean;
  value: string;
  valueClassName?: string;
}) {
  return (
    <p className="flex items-center justify-between gap-4">
      <span className={large ? "editorial-title text-[26px]" : "text-white/66"}>
        {label}
      </span>
      <span
        className={classNames(
          large
            ? "font-mono text-[28px] text-[var(--sb-gold-soft)]"
            : "font-mono text-white/86",
          valueClassName,
        )}
      >
        {value}
      </span>
    </p>
  );
}

function LockGlyph() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4 shrink-0 text-[var(--sb-gold-soft)]"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M7 10V8a5 5 0 0 1 10 0v2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
      <path
        d="M6.5 10h11A1.5 1.5 0 0 1 19 11.5v8A1.5 1.5 0 0 1 17.5 21h-11A1.5 1.5 0 0 1 5 19.5v-8A1.5 1.5 0 0 1 6.5 10Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}
