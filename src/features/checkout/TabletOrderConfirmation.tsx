"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { Button } from "@/components/ui/Button";
import { pickupLocation } from "@/data/checkout";
import { brand, chefAvatar, icons } from "@/features/home/visualHomeData";
import { TabletMenuBottomNav } from "@/features/menu/TabletMenuChrome";
import { useScrollLock } from "@/hooks/useScrollLock";
import { getTabletPresentationImage } from "@/lib/assets";
import { calculateCartLineSubtotal } from "@/lib/cart";
import { formatDateTime } from "@/lib/dates";
import { formatMoney } from "@/lib/money";
import type { Order } from "@/types/order";

interface TabletOrderConfirmationProps {
  onClose: () => void;
  order: Order | null;
  pointsAwarded: number;
}

/** Tablet order confirmation view matching the reference while using real order data. */
export function TabletOrderConfirmation({
  onClose,
  order,
  pointsAwarded,
}: TabletOrderConfirmationProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [headerQuery, setHeaderQuery] = useState("");

  useScrollLock(Boolean(order));

  useEffect(() => {
    if (!order) {
      return;
    }

    const previouslyFocused = document.activeElement;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [onClose, order]);

  if (!order) {
    return null;
  }

  const primaryItem = order.items[0]?.menuItem;
  const heroImage = primaryItem
    ? getTabletPresentationImage(primaryItem)
    : "/assets/menu/sushi/deluxe-toro-caviar-nigiri.webp";
  const fulfillmentLabel = order.mode === "delivery" ? "Delivery" : "Pickup";
  const fulfillmentTimeLabel =
    order.mode === "delivery" ? "30 - 40 min" : "20 - 30 min";
  const destinationLines = getDestinationLines(order);
  const createdAtLabel = formatDateTime(order.createdAt);
  const awardedPoints =
    pointsAwarded > 0
      ? pointsAwarded
      : Math.max(1, Math.floor(order.totals.totalCents / 100));

  const handleSubmitQuery = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!headerQuery.trim()) {
      return;
    }

    onClose();
    window.location.assign("/menu");
  };

  return (
    <div
      aria-labelledby="tablet-order-confirmation-title"
      aria-modal="true"
      className="fixed inset-0 z-50 hidden h-dvh min-h-dvh flex-col overflow-hidden bg-[#050607] px-[26px] pb-4 pt-3 text-white md:flex xl:hidden"
      ref={dialogRef}
      role="dialog"
      tabIndex={-1}
    >
      <TabletOrderConfirmationHeader
        cartCount={0}
        query={headerQuery}
        onClose={onClose}
        onQueryChange={setHeaderQuery}
        onSubmitQuery={handleSubmitQuery}
      />

      <main className="mx-auto min-h-0 w-full max-w-[1034px] flex-1 overflow-y-auto overflow-x-hidden min-[1080px]:overflow-hidden">
        <section className="mt-3 grid gap-3 pb-3 min-[1080px]:h-[calc(100%-12px)] min-[1080px]:grid-rows-[460px_154px_minmax(0,1fr)_58px_70px] min-[1080px]:gap-4 min-[1080px]:pb-0">
          <section className="relative h-[450px] overflow-hidden rounded-[24px] border border-white/12 bg-[#090b0b] min-[1080px]:h-auto">
            <Image
              alt={primaryItem?.image.alt || "Sushi Bliss confirmed order"}
              className="object-cover object-[72%_48%]"
              fill
              loading="eager"
              priority
              sizes="1034px"
              src={heroImage}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#050607_0%,rgba(5,6,7,0.96)_30%,rgba(5,6,7,0.54)_60%,rgba(5,6,7,0.1)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(217,160,74,0.18),transparent_34%)]" />

            <div className="relative flex h-full max-w-[570px] flex-col px-10 pt-8">
              <span className="grid h-[54px] w-[54px] place-items-center rounded-full border border-[#5fee4c]/72 bg-[#5fee4c]/10 text-[34px] leading-none text-[#77ef58] shadow-[0_0_34px_rgba(95,238,76,0.24)]">
                ✓
              </span>
              <p className="mt-5 font-serif text-[17px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                Order confirmed
              </p>
              <h1
                className="editorial-title mt-3 text-[50px] uppercase leading-[0.92] tracking-[0.08em] text-white min-[1080px]:text-[54px]"
                id="tablet-order-confirmation-title"
              >
                Thank you!
              </h1>
              <p className="mt-2 whitespace-nowrap font-serif text-[28px] uppercase tracking-[0.08em] text-[var(--sb-red-bright)] min-[1080px]:text-[31px]">
                Your order is confirmed
              </p>
              <p className="mt-4 max-w-[430px] text-[18px] leading-7 text-[var(--sb-gold-soft)]">
                We appreciate your order and cannot wait to serve you an
                unforgettable experience.
              </p>

              <div className="mt-6 w-[408px] rounded-[12px] border border-[var(--sb-gold)]/22 bg-black/34 p-5 text-center backdrop-blur">
                <p className="font-serif text-[14px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                  Confirmation number
                </p>
                <p className="mt-2 font-mono text-[34px] leading-none text-white">
                  #{order.confirmationCode}
                </p>
                <p className="mt-2 text-[13px] text-white/62">
                  {createdAtLabel}
                </p>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-2 gap-4 min-[1080px]:min-h-0">
            <ConfirmationInfoCard
              icon={icons.clock}
              label={`Estimated ${fulfillmentLabel}`}
              title={fulfillmentTimeLabel}
              titleClassName="text-[var(--sb-red-bright)]"
              value={
                order.mode === "delivery"
                  ? "You will receive a notification when your order is on the way."
                  : "We will notify you when your order is ready at the counter."
              }
            />
            <ConfirmationInfoCard
              actionHref="/loyalty"
              actionLabel="View rewards"
              icon={icons.star}
              label="Loyalty points earned"
              title={`+${awardedPoints} points`}
              titleClassName="text-[var(--sb-red-bright)]"
              value={`You will earn ${awardedPoints} points with this order.`}
              onAction={onClose}
            />
          </div>

          <div className="grid min-h-0 gap-4 min-[1080px]:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
            <OrderSummaryPanel order={order} />
            <div className="grid min-h-0 grid-rows-[1fr_0.78fr_1fr] gap-3">
              <StackedDetailCard
                icon={icons.profile}
                title={order.mode === "delivery" ? "Delivery to" : "Pickup at"}
              >
                {destinationLines.map((line) => (
                  <span className="block" key={line}>
                    {line}
                  </span>
                ))}
              </StackedDetailCard>
              <StackedDetailCard icon={icons.cart} title="Payment method">
                {order.paymentMethod.brand.toUpperCase()} ••••{" "}
                {order.paymentMethod.last4}
              </StackedDetailCard>
              <StackedDetailCard
                actionHref="/loyalty"
                actionLabel="View membership benefits"
                icon={icons.flower}
                title="Enjoy exclusive perks"
                onAction={onClose}
              >
                With your Bliss Membership.
              </StackedDetailCard>
            </div>
          </div>

          <div className="grid h-[56px] grid-cols-2 gap-4 min-[1080px]:h-auto">
            <Button
              className="red-glow-button h-full rounded-[12px] text-[15px] uppercase tracking-[0.08em]"
              href="/orders"
              onClick={onClose}
            >
              Track order
              <ChevronIcon direction="right" size={18} />
            </Button>
            <Button
              className="h-full rounded-[12px] border-[var(--sb-gold)]/46 text-[15px] uppercase tracking-[0.08em]"
              href="/menu"
              onClick={onClose}
              variant="secondary"
            >
              <AssetIcon size={21} src={icons.bag} />
              Back to menu
            </Button>
          </div>

          <ConfirmationBenefitStrip />
        </section>
      </main>

      <TabletMenuBottomNav activeIndex={0} />
    </div>
  );
}

interface TabletOrderConfirmationHeaderProps {
  cartCount: number;
  query: string;
  onClose: () => void;
  onQueryChange: (query: string) => void;
  onSubmitQuery: (event: React.FormEvent<HTMLFormElement>) => void;
}

function TabletOrderConfirmationHeader({
  cartCount,
  query,
  onClose,
  onQueryChange,
  onSubmitQuery,
}: TabletOrderConfirmationHeaderProps) {
  return (
    <header className="mt-1 grid h-[82px] grid-cols-[190px_minmax(0,1fr)_190px] items-center gap-3 lg:grid-cols-[260px_minmax(0,1fr)_268px] lg:gap-5">
      <Link
        className="flex items-center gap-3 lg:gap-8"
        href="/home"
        onClick={onClose}
      >
        <AssetIcon
          alt={brand.name}
          className="rounded-full"
          loading="eager"
          size={66}
          src={brand.assets.floralEmblem.publicUrl}
        />
        <span className="font-serif text-[22px] font-normal uppercase leading-[0.98] tracking-[0.36em] lg:text-[27px] lg:tracking-[0.43em]">
          Sushi
          <br />
          Bliss
        </span>
      </Link>

      <form
        className="mx-auto flex h-[54px] w-full max-w-[486px] items-center gap-3 rounded-[20px] border border-white/16 bg-white/[0.035] px-4 lg:h-[58px] lg:gap-4 lg:rounded-[24px] lg:px-6"
        onSubmit={onSubmitQuery}
      >
        <AssetIcon size={24} src={icons.search} />
        <label className="sr-only" htmlFor="tablet-confirmation-search">
          Search menu
        </label>
        <input
          className="h-full w-full bg-transparent text-[15px] text-white outline-none placeholder:text-white/58 lg:text-[16px]"
          id="tablet-confirmation-search"
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search dishes, rolls, or more..."
          value={query}
        />
      </form>

      <div className="flex items-center justify-end gap-3 lg:gap-6">
        <Link
          className="relative grid h-11 w-11 place-items-center"
          href="/notifications"
          onClick={onClose}
        >
          <AssetIcon size={32} src={icons.bell} />
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[11px] font-bold text-white">
            2
          </span>
        </Link>
        <Link
          aria-label="Back to menu"
          className="relative grid h-11 w-11 place-items-center"
          href="/menu"
          onClick={onClose}
        >
          <AssetIcon size={32} src={icons.cart} />
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--sb-red)] px-1 text-[11px] font-bold text-white">
            {cartCount}
          </span>
        </Link>
        <Link
          className="flex items-center gap-5"
          href="/profile"
          onClick={onClose}
        >
          <Image
            alt=""
            className="h-12 w-12 rounded-full border border-[var(--sb-border)] object-cover lg:h-[58px] lg:w-[58px]"
            height={58}
            loading="eager"
            src={chefAvatar}
            width={58}
          />
          <ChevronIcon className="text-[var(--sb-gold)]" direction="down" />
        </Link>
      </div>
    </header>
  );
}

function ConfirmationInfoCard({
  actionHref,
  actionLabel,
  icon,
  label,
  title,
  titleClassName = "text-white",
  value,
  onAction,
}: {
  actionHref?: string;
  actionLabel?: string;
  icon?: string;
  label: string;
  title: string;
  titleClassName?: string;
  value: string;
  onAction?: () => void;
}) {
  return (
    <article className="grid grid-cols-[76px_1fr] items-center gap-5 rounded-[14px] border border-white/12 bg-white/[0.035] px-7">
      <AssetIcon size={52} src={icon} />
      <div>
        <p className="font-serif text-[14px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
          {label}
        </p>
        <p
          className={`mt-2 font-serif text-[28px] uppercase ${titleClassName}`}
        >
          {title}
        </p>
        <p className="mt-2 max-w-[330px] text-[14px] leading-5 text-white/62">
          {value}
        </p>
        {actionHref && actionLabel ? (
          <Link
            className="mt-3 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
            href={actionHref}
            onClick={onAction}
          >
            {actionLabel}
            <ChevronIcon direction="right" size={18} />
          </Link>
        ) : null}
      </div>
    </article>
  );
}

function OrderSummaryPanel({ order }: { order: Order }) {
  const visibleItems = order.items.slice(0, 3);
  const hiddenItemCount = Math.max(order.items.length - visibleItems.length, 0);

  return (
    <section className="min-h-0 rounded-[14px] border border-white/12 bg-white/[0.035] p-5">
      <h2 className="flex items-center gap-3 font-serif text-[17px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)]">
        <AssetIcon size={25} src={icons.bag} />
        Order summary
      </h2>

      <div className="mt-4 grid gap-3">
        {visibleItems.map((item) => (
          <article
            className="grid grid-cols-[84px_1fr_92px_54px_78px] items-center gap-3"
            key={item.id}
          >
            <div className="relative h-[60px] overflow-hidden rounded-[8px] border border-white/8 bg-white/[0.035]">
              <Image
                alt={item.menuItem.image.alt || item.menuItem.name}
                className="object-cover"
                fill
                sizes="84px"
                src={item.menuItem.image.publicUrl}
              />
            </div>
            <div className="min-w-0">
              <h3 className="line-clamp-1 text-[15px] font-semibold text-white">
                {item.menuItem.name}
              </h3>
              <p className="mt-1 line-clamp-2 text-[12px] leading-4 text-white/54">
                {item.menuItem.description}
              </p>
            </div>
            <span className="font-mono text-[14px] text-[var(--sb-gold-soft)]">
              {formatMoney(calculateCartLineSubtotal(item) / item.quantity)}
            </span>
            <span className="text-center font-mono text-[13px] text-white/64">
              x {item.quantity}
            </span>
            <span className="text-right font-mono text-[14px] text-white">
              {formatMoney(calculateCartLineSubtotal(item))}
            </span>
          </article>
        ))}
        {hiddenItemCount > 0 ? (
          <p className="text-[12px] uppercase tracking-[0.1em] text-white/44">
            +{hiddenItemCount} more item{hiddenItemCount === 1 ? "" : "s"}
          </p>
        ) : null}
      </div>

      <div className="mt-4 space-y-1.5 border-t border-white/10 pt-3 text-[14px]">
        <ReceiptLine
          label="Subtotal"
          value={formatMoney(order.totals.subtotalCents)}
        />
        <ReceiptLine
          label="Delivery fee"
          value={formatMoney(order.totals.serviceFeeCents)}
        />
        <ReceiptLine label="Tax" value={formatMoney(order.totals.taxCents)} />
        <div className="mt-2 border-t border-white/10 pt-2">
          <ReceiptLine
            large
            label="Total"
            value={formatMoney(order.totals.totalCents)}
          />
        </div>
      </div>
    </section>
  );
}

function ReceiptLine({
  label,
  large,
  value,
}: {
  label: string;
  large?: boolean;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-5">
      <span
        className={
          large
            ? "font-serif text-[20px] text-[var(--sb-gold-soft)]"
            : "text-white/66"
        }
      >
        {label}
      </span>
      <span
        className={
          large
            ? "font-mono text-[26px] text-[var(--sb-gold-soft)]"
            : "font-mono text-white/82"
        }
      >
        {value}
      </span>
    </div>
  );
}

function StackedDetailCard({
  actionHref,
  actionLabel,
  children,
  icon,
  title,
  onAction,
}: {
  actionHref?: string;
  actionLabel?: string;
  children: React.ReactNode;
  icon?: string;
  title: string;
  onAction?: () => void;
}) {
  return (
    <section className="min-h-0 rounded-[14px] border border-white/12 bg-white/[0.035] p-4">
      <div className="flex items-start gap-4">
        <AssetIcon size={30} src={icon} />
        <div>
          <h2 className="font-serif text-[15px] uppercase tracking-[0.09em] text-[var(--sb-gold-soft)]">
            {title}
          </h2>
          <p className="mt-2 text-[13px] leading-5 text-white/62">{children}</p>
          {actionHref && actionLabel ? (
            <Link
              className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
              href={actionHref}
              onClick={onAction}
            >
              {actionLabel}
              <ChevronIcon direction="right" size={18} />
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

const confirmationBenefits = [
  { active: true, icon: icons.star, label: "Confirmed", value: "Received" },
  {
    active: false,
    icon: icons.crown,
    label: "Kitchen",
    value: "Preparing",
  },
  {
    active: false,
    icon: icons.chef,
    label: "Track",
    value: "Live updates",
  },
  {
    active: false,
    icon: icons.bag,
    label: "Rewards",
    value: "Points added",
  },
] as const;

function ConfirmationBenefitStrip() {
  return (
    <ol className="relative grid grid-cols-4 overflow-hidden rounded-[14px] border border-white/10 bg-white/[0.035]">
      <span
        aria-hidden="true"
        className="absolute left-[12.5%] right-[12.5%] top-1/2 h-[6px] -translate-y-1/2 overflow-hidden rounded-full border border-white/[0.045] bg-black/54 shadow-[inset_0_0_10px_rgba(0,0,0,0.72)]"
      >
        <span className="absolute inset-y-[2px] left-2 right-2 rounded-full bg-white/10" />
        <span className="absolute inset-y-[1px] left-0 w-[14%] rounded-full bg-[var(--sb-red-bright)] shadow-[0_0_16px_rgba(238,43,36,0.64)]" />
      </span>
      {confirmationBenefits.map((benefit) => (
        <li
          aria-current={benefit.active ? "step" : undefined}
          className="relative flex items-center justify-center gap-3 border-r border-white/10 px-4 last:border-r-0"
          key={benefit.label}
        >
          <span
            className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border bg-black/62 ${
              benefit.active
                ? "border-[var(--sb-red-bright)] shadow-[0_0_20px_rgba(238,43,36,0.35)]"
                : "border-white/18"
            }`}
          >
            <AssetIcon size={22} src={benefit.icon} />
          </span>
          <p>
            <span
              className={`block text-[11px] uppercase tracking-[0.08em] ${
                benefit.active ? "text-[var(--sb-red-bright)]" : "text-white/62"
              }`}
            >
              {benefit.label}
            </span>
            <span className="mt-0.5 block text-[12px] text-white/48">
              {benefit.value}
            </span>
          </p>
        </li>
      ))}
    </ol>
  );
}

function getDestinationLines(order: Order): string[] {
  if (order.mode === "delivery" && order.deliveryAddress) {
    return [
      order.deliveryAddress.line1,
      order.deliveryAddress.line2,
      `${order.deliveryAddress.city}, ${order.deliveryAddress.region} ${order.deliveryAddress.postalCode}`,
      order.customer.phone,
    ].filter((line): line is string => Boolean(line));
  }

  return [
    pickupLocation.label,
    pickupLocation.line1,
    `${pickupLocation.city}, ${pickupLocation.region} ${pickupLocation.postalCode}`,
    order.customer.phone,
  ];
}
