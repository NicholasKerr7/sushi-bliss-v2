"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { brand, icons } from "@/features/home/visualHomeData";
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

    document.body.classList.add("overflow-hidden");
    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.body.classList.remove("overflow-hidden");
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
      <div className="relative h-dvh overflow-y-auto px-5 pb-8 pt-6">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 bg-[url('/assets/textures/red-moon-sakura-background.webp')] bg-cover bg-left-top opacity-70"
        />
        <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,.25),#030303_48%,#030303_100%)]" />

        <div className="mobile-frame relative z-10">
          <header className="flex items-center justify-between gap-4">
            <Link
              className="flex min-w-0 items-center gap-3 rounded-[14px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--sb-gold)]"
              href="/home"
              onClick={onClose}
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
            </Link>
            <button
              aria-label="Close order confirmation"
              className="grid h-[48px] w-[48px] place-items-center rounded-full border border-[var(--sb-border)] bg-black/34"
              onClick={onClose}
              type="button"
            >
              <AssetIcon loading="eager" size={25} src={icons.bell} />
            </button>
          </header>

          <main className="pt-16 text-center">
            <div className="mx-auto grid h-[150px] w-[150px] place-items-center rounded-full border border-[var(--sb-gold)] bg-black/38 shadow-[0_0_34px_rgb(215_168_79_/_0.24)]">
              <svg
                aria-hidden="true"
                className="h-20 w-20 text-[var(--sb-gold-soft)]"
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

            <h1 className="editorial-title mt-10 text-[34px] leading-none min-[390px]:text-[39px]">
              Order{" "}
              <span className="text-[var(--sb-red-bright)]">Confirmed</span>
            </h1>
            <p className="mt-6 text-[18px] text-[var(--sb-gold-soft)] min-[390px]:text-[22px]">
              Thank you, {order.customer.name.split(" ")[0]}.
            </p>
            <p className="mx-auto mt-4 max-w-[340px] text-[17px] leading-7 text-white/70">
              Your order has been received and is being prepared with the finest
              ingredients.
            </p>

            <section className="mt-9 overflow-hidden rounded-[17px] border border-[var(--sb-border)] bg-black/42 text-left">
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
              <p className="mt-6 text-[15px] text-[var(--sb-gold-soft)]">
                +{pointsAwarded} Bliss Points added to your rewards.
              </p>
            ) : null}

            <p className="mx-auto mt-8 max-w-[340px] text-[17px] leading-7 text-white/68">
              We&apos;re preparing your sushi with care. You&apos;ll receive
              updates as your order progresses.
            </p>

            <MobileConfirmationNextSteps mode={order.mode} />

            <Link
              className="red-glow-button mt-8 flex min-h-[66px] w-full items-center justify-center rounded-[14px] text-[17px]"
              href="/orders"
              onClick={onClose}
            >
              Track order
            </Link>
            <Link
              className="mt-5 flex min-h-[60px] w-full items-center justify-center rounded-[14px] border border-[var(--sb-border)] bg-black/30 text-[17px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
              href="/home"
              onClick={onClose}
            >
              Back to home
            </Link>
          </main>
        </div>
      </div>
    </div>
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
    <section className="mt-7 rounded-[17px] border border-white/10 bg-black/36 px-4 py-5 text-left">
      <h2 className="text-[13px] uppercase tracking-[0.12em] text-[var(--sb-gold-soft)]">
        What happens next
      </h2>
      <ol className="relative mt-5 grid grid-cols-3 gap-2">
        <span
          aria-hidden="true"
          className="absolute left-[16.66%] right-[16.66%] top-[23px] h-[6px] overflow-hidden rounded-full border border-white/[0.045] bg-black/54 shadow-[inset_0_0_10px_rgba(0,0,0,0.72)]"
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
              className={`relative z-10 mx-auto grid h-[52px] w-[52px] place-items-center rounded-full border bg-black/62 ${
                step.active
                  ? "border-[var(--sb-red-bright)] shadow-[0_0_24px_rgba(238,43,36,0.36),inset_0_0_16px_rgba(238,43,36,0.18)]"
                  : "border-white/18 shadow-[inset_0_0_14px_rgba(0,0,0,0.62)]"
              }`}
            >
              <AssetIcon size={23} src={step.icon} />
              {step.active ? (
                <span className="absolute -bottom-1 h-1.5 w-8 rounded-full bg-[var(--sb-red-bright)] shadow-[0_0_16px_rgba(238,43,36,0.78)]" />
              ) : null}
            </span>
            <span
              className={`mt-3 block text-[11px] uppercase tracking-[0.08em] ${
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
    <div className="grid min-h-[92px] grid-cols-[64px_1fr_auto] items-center gap-4 border-b border-white/10 px-4 py-4 last:border-b-0">
      <span className="grid h-[52px] w-[52px] place-items-center rounded-full border border-[var(--sb-border)] bg-black/32">
        <AssetIcon size={30} src={icon} />
      </span>
      <p>
        <span className="editorial-title block text-[17px] text-[var(--sb-gold-soft)]">
          {label}
        </span>
        <span className="mt-2 block text-[18px] leading-6 text-white">
          {value}
        </span>
      </p>
      {accentIcon ? <AssetIcon size={34} src={accentIcon} /> : null}
    </div>
  );
}
