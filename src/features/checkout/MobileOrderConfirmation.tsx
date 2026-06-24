"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { brand, icons } from "@/features/home/visualHomeData";
import { useScrollLock } from "@/hooks/useScrollLock";
import { formatDateTime } from "@/lib/dates";
import { formatMoney } from "@/lib/money";
import type { Order } from "@/types/order";

interface MobileOrderConfirmationProps {
  onClose: () => void;
  order: Order | null;
  pointsAwarded?: number;
}

/** Mobile confirmation view that uses the order returned by checkout creation. */
export function MobileOrderConfirmation({
  onClose,
  order,
  pointsAwarded = 0,
}: MobileOrderConfirmationProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

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

  const deliveryLabel =
    order.mode === "delivery" ? "Estimated delivery" : "Ready for pickup";
  const locationLabel =
    order.mode === "delivery"
      ? order.deliveryAddress
        ? `${order.deliveryAddress.line1}, ${order.deliveryAddress.city}, ${order.deliveryAddress.postalCode}`
        : "Delivery address on file"
      : "Sushi Bliss pickup counter";

  return (
    <div
      aria-label="Order confirmed"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black text-white md:hidden"
      ref={dialogRef}
      role="dialog"
      tabIndex={-1}
    >
      <div className="smooth-scroll-area relative h-dvh overflow-x-hidden overflow-y-auto px-3 pb-[calc(8.5rem+var(--sb-safe-bottom))] pt-4 min-[390px]:px-5 min-[390px]:pt-6">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 bg-[url('/assets/textures/red-moon-sakura-background.webp')] bg-cover bg-left-top opacity-70"
        />
        <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.25),#030303_48%,#030303_100%)]" />

        <div className="mobile-frame relative z-10">
          <header className="flex items-center justify-between gap-2.5 min-[480px]:gap-4">
            <Link
              className="flex min-w-0 items-center gap-2 rounded-[14px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)] min-[480px]:gap-3"
              href="/home"
              onClick={onClose}
            >
              <AssetIcon
                alt=""
                className="h-10 w-10 rounded-full min-[480px]:h-[52px] min-[480px]:w-[52px]"
                loading="eager"
                size={52}
                src={brand.assets.floralEmblem.publicUrl}
              />
              <span className="editorial-title text-[12px] leading-[0.96] tracking-[0.22em] min-[480px]:text-[16px] min-[480px]:tracking-[0.38em]">
                Sushi
                <br />
                Bliss
              </span>
            </Link>
            <button
              aria-label="Close order confirmation"
              className="grid h-[42px] w-[42px] place-items-center rounded-full border border-[var(--sb-border)] bg-black/34 min-[480px]:h-[48px] min-[480px]:w-[48px]"
              onClick={onClose}
              type="button"
            >
              <ChevronIcon direction="x" size={20} />
            </button>
          </header>

          <main className="pt-5 text-center min-[390px]:pt-6 min-[480px]:pt-10">
            <div className="mx-auto grid h-[86px] w-[86px] place-items-center rounded-full border border-[var(--sb-gold)] bg-black/38 shadow-[0_0_34px_rgb(215_168_79_/_0.24),inset_0_0_24px_rgba(215,168,79,0.08)] min-[390px]:h-[96px] min-[390px]:w-[96px] min-[480px]:h-[132px] min-[480px]:w-[132px]">
              <svg
                aria-hidden="true"
                className="h-10 w-10 text-[var(--sb-gold-soft)] min-[390px]:h-12 min-[390px]:w-12 min-[480px]:h-[70px] min-[480px]:w-[70px]"
                fill="none"
                viewBox="0 0 80 80"
              >
                <path
                  d="m18 42 14 14 31-33"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="8"
                />
              </svg>
            </div>

            <h1 className="editorial-title mt-5 text-[26px] leading-none min-[390px]:text-[32px] min-[480px]:mt-7 min-[480px]:text-[36px]">
              Order{" "}
              <span className="text-[var(--sb-red-bright)]">Confirmed</span>
            </h1>
            <p className="mt-3 text-[14px] text-[var(--sb-gold-soft)] min-[390px]:text-[16px] min-[480px]:mt-4 min-[480px]:text-[20px]">
              Thank you, {order.customer.name.split(" ")[0]}.
            </p>
            <p className="mx-auto mt-3 max-w-[340px] text-[13px] leading-[22px] text-white/70 min-[390px]:text-[14px] min-[390px]:leading-6 min-[480px]:mt-4 min-[480px]:text-[16px] min-[480px]:leading-7">
              Your order has been received and is being prepared with the finest
              ingredients.
            </p>

            <section className="mt-5 overflow-hidden rounded-[17px] border border-[var(--sb-border)] bg-black/42 text-left min-[480px]:mt-7">
              <ConfirmationRow
                icon={icons.menu}
                label="Order number"
                value={order.confirmationCode}
              />
              <ConfirmationRow
                accentIcon={
                  order.mode === "delivery" ? icons.location : icons.bag
                }
                icon={icons.clock}
                label={deliveryLabel}
                value={formatDateTime(order.fulfillmentAt)}
              />
              <ConfirmationRow
                icon={icons.location}
                label={
                  order.mode === "delivery" ? "Delivery address" : "Pickup"
                }
                value={locationLabel}
              />
              <ConfirmationRow
                icon={icons.bag}
                label="Total"
                value={formatMoney(order.totals.totalCents)}
              />
            </section>

            {pointsAwarded > 0 ? (
              <p className="mt-5 text-[12px] leading-5 text-[var(--sb-gold-soft)] min-[390px]:mt-6 min-[390px]:text-[14px]">
                +{pointsAwarded} Bliss Points added to your rewards.
              </p>
            ) : null}

            <p className="mx-auto mt-5 max-w-[340px] text-[13px] leading-[22px] text-white/68 min-[390px]:mt-6 min-[390px]:text-[15px] min-[390px]:leading-6">
              We&apos;re preparing your sushi with care. You&apos;ll receive
              updates as your order progresses.
            </p>

            <MobileConfirmationNextSteps mode={order.mode} />
          </main>
        </div>

        <MobileConfirmationActionDock onClose={onClose} />
      </div>
    </div>
  );
}

function MobileConfirmationActionDock({ onClose }: { onClose: () => void }) {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--sb-border)] bg-[linear-gradient(180deg,rgba(9,8,7,0.88),rgba(0,0,0,0.98))] px-3 pb-[calc(0.72rem+var(--sb-safe-bottom))] pt-3 shadow-[0_-22px_54px_rgba(0,0,0,0.66)] backdrop-blur-xl">
      <div className="mobile-frame grid grid-cols-[minmax(0,1fr)_106px] items-center gap-2.5 min-[390px]:grid-cols-[minmax(0,1fr)_124px] min-[390px]:gap-3">
        <Link
          className="red-glow-button grid h-[52px] min-w-0 place-items-center rounded-[13px] px-3 text-[12px] uppercase tracking-[0.06em] min-[390px]:h-[56px] min-[390px]:text-[13px] min-[390px]:tracking-[0.07em]"
          href="/orders"
          onClick={onClose}
        >
          Track order
        </Link>
        <Link
          className="grid h-[52px] min-w-0 place-items-center rounded-[13px] border border-[var(--sb-border)] bg-black/42 px-2 text-[11px] uppercase tracking-[0.05em] text-[var(--sb-gold-soft)] min-[390px]:h-[56px] min-[390px]:text-[12px] min-[390px]:tracking-[0.06em]"
          href="/home"
          onClick={onClose}
        >
          Home
        </Link>
      </div>
    </footer>
  );
}

function MobileConfirmationNextSteps({ mode }: { mode: Order["mode"] }) {
  const finalLabel = mode === "delivery" ? "Track" : "Pickup";
  const steps = [
    { active: true, icon: icons.star, label: "Confirmed" },
    { active: false, icon: icons.chef, label: "Kitchen" },
    {
      active: false,
      icon: mode === "delivery" ? icons.location : icons.bag,
      label: finalLabel,
    },
  ] as const;

  return (
    <section className="mt-5 rounded-[17px] border border-white/10 bg-black/36 px-3 py-4 text-left min-[390px]:px-4 min-[480px]:mt-7 min-[480px]:py-5">
      <h2 className="text-[11px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] min-[390px]:text-[12px] min-[480px]:text-[13px] min-[480px]:tracking-[0.12em]">
        What happens next
      </h2>
      <ol className="relative mt-4 grid grid-cols-3 gap-1.5 min-[480px]:mt-5 min-[480px]:gap-2">
        <span
          aria-hidden="true"
          className="absolute left-[16.66%] right-[16.66%] top-[18px] h-[6px] overflow-hidden rounded-full border border-white/[0.045] bg-black/54 shadow-[inset_0_0_10px_rgba(0,0,0,0.72)] min-[480px]:top-[23px]"
        >
          <span className="absolute inset-y-[2px] left-2 right-2 rounded-full bg-white/10" />
          <span className="absolute inset-y-[1px] left-0 w-[18%] rounded-full bg-[var(--sb-red-bright)] shadow-[0_0_16px_rgba(238,43,36,0.64)]" />
        </span>
        {steps.map((step, index) => (
          <li
            aria-current={index === 0 ? "step" : undefined}
            className="relative text-center"
            key={step.label}
          >
            <span
              className={`relative z-10 mx-auto grid h-[42px] w-[42px] place-items-center rounded-full border bg-black/62 min-[480px]:h-[52px] min-[480px]:w-[52px] ${
                step.active
                  ? "border-[var(--sb-red-bright)] shadow-[0_0_24px_rgba(238,43,36,0.36),inset_0_0_16px_rgba(238,43,36,0.18)]"
                  : "border-white/18 shadow-[inset_0_0_14px_rgba(0,0,0,0.62)]"
              }`}
            >
              <AssetIcon size={20} src={step.icon} />
              {step.active ? (
                <span className="absolute -bottom-1 h-1.5 w-7 rounded-full bg-[var(--sb-red-bright)] shadow-[0_0_16px_rgba(238,43,36,0.78)] min-[480px]:w-8" />
              ) : null}
            </span>
            <span
              className={`mt-2.5 block text-[9px] uppercase leading-3 tracking-[0.04em] min-[480px]:mt-3 min-[480px]:text-[11px] min-[480px]:leading-4 min-[480px]:tracking-[0.08em] ${
                step.active ? "text-[var(--sb-red-bright)]" : "text-white/48"
              }`}
            >
              {step.label}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ConfirmationRow({
  accentIcon,
  icon,
  label,
  value,
}: {
  accentIcon?: string;
  icon?: string;
  label: string;
  value: string;
}) {
  return (
    <div className="grid min-h-[68px] grid-cols-[36px_minmax(0,1fr)] items-center gap-2.5 border-b border-white/10 px-3 py-3 last:border-b-0 min-[390px]:min-h-[72px] min-[390px]:grid-cols-[42px_minmax(0,1fr)_auto] min-[390px]:gap-3 min-[390px]:px-4 min-[480px]:min-h-[84px] min-[480px]:grid-cols-[58px_minmax(0,1fr)_auto] min-[480px]:gap-4 min-[480px]:py-3.5">
      <span className="grid h-9 w-9 place-items-center rounded-full border border-[var(--sb-border)] bg-black/32 min-[390px]:h-10 min-[390px]:w-10 min-[480px]:h-[52px] min-[480px]:w-[52px]">
        <AssetIcon size={22} src={icon} />
      </span>
      <p className="min-w-0">
        <span className="editorial-title block text-[13px] text-[var(--sb-gold-soft)] min-[480px]:text-[15px]">
          {label}
        </span>
        <span className="mt-1.5 block break-words text-[13px] leading-5 text-white min-[390px]:text-[14px] min-[480px]:mt-2 min-[480px]:text-[16px] min-[480px]:leading-6">
          {value}
        </span>
      </p>
      {accentIcon ? (
        <AssetIcon
          className="hidden justify-self-end min-[480px]:inline-block"
          size={28}
          src={accentIcon}
        />
      ) : (
        <span aria-hidden="true" className="hidden min-[480px]:block" />
      )}
    </div>
  );
}
