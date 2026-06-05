"use client";

import { pickupLocation } from "@/data/checkout";

import type { TabletCheckoutState } from "./tabletCheckoutTypes";

interface TabletCheckoutPanelProps {
  checkout: TabletCheckoutState;
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
}

export function TabletCheckoutAddressPanel({
  checkout,
  expanded,
  onExpandedChange,
}: TabletCheckoutPanelProps) {
  if (checkout.mode === "pickup") {
    return (
      <div className="mt-3 rounded-[12px] border border-white/10 bg-black/22 p-4 text-[15px] leading-6 text-white/68">
        <p className="font-semibold text-white">{pickupLocation.label}</p>
        <p>
          {pickupLocation.line1}, {pickupLocation.city}, {pickupLocation.region}{" "}
          {pickupLocation.postalCode}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-3">
      {checkout.selectedAddress ? (
        <div className="rounded-[12px] border border-[var(--sb-gold)]/24 bg-black/22 p-4 text-[15px] leading-6 text-white/68">
          <p className="font-semibold text-white">
            {checkout.selectedAddress.label}
          </p>
          <p>
            {checkout.selectedAddress.line1}
            {checkout.selectedAddress.line2
              ? `, ${checkout.selectedAddress.line2}`
              : ""}
          </p>
          <p>
            {checkout.selectedAddress.city}, {checkout.selectedAddress.region}{" "}
            {checkout.selectedAddress.postalCode}
          </p>
        </div>
      ) : null}
      {expanded ? (
        <div className="mt-3 grid gap-2">
          {checkout.addresses.map((address) => (
            <button
              aria-pressed={address.id === checkout.selectedAddressId}
              className={`rounded-[12px] border p-3 text-left text-[14px] ${
                address.id === checkout.selectedAddressId
                  ? "border-[var(--sb-gold)] bg-[var(--sb-gold)]/10"
                  : "border-white/10 bg-black/20"
              }`}
              key={address.id}
              onClick={() => {
                checkout.setSelectedAddressId(address.id);
                onExpandedChange(false);
              }}
              type="button"
            >
              <span className="font-semibold text-white">{address.label}</span>
              <span className="ml-2 text-white/56">{address.line1}</span>
            </button>
          ))}
        </div>
      ) : null}
      {checkout.validation.address ? (
        <p className="mt-2 text-[12px] text-[var(--sb-red-bright)]">
          {checkout.validation.address}
        </p>
      ) : null}
    </div>
  );
}

export function TabletCheckoutPaymentPanel({
  checkout,
  expanded,
  onExpandedChange,
}: TabletCheckoutPanelProps) {
  return (
    <div className="mt-3">
      {checkout.selectedPaymentMethod ? (
        <div className="rounded-[12px] border border-[var(--sb-gold)]/24 bg-black/22 p-4 text-[15px] text-white/68">
          <p className="font-semibold text-white">
            {checkout.selectedPaymentMethod.brand} ending{" "}
            {checkout.selectedPaymentMethod.last4}
          </p>
          <p className="mt-1">
            Expires {checkout.selectedPaymentMethod.expiresAt}
          </p>
        </div>
      ) : null}
      {expanded ? (
        <div className="mt-3 grid gap-2">
          {checkout.paymentMethods.map((payment) => (
            <button
              aria-pressed={payment.id === checkout.selectedPaymentMethodId}
              className={`rounded-[12px] border p-3 text-left text-[14px] ${
                payment.id === checkout.selectedPaymentMethodId
                  ? "border-[var(--sb-gold)] bg-[var(--sb-gold)]/10"
                  : "border-white/10 bg-black/20"
              }`}
              key={payment.id}
              onClick={() => {
                checkout.setSelectedPaymentMethodId(payment.id);
                onExpandedChange(false);
              }}
              type="button"
            >
              <span className="font-semibold text-white">{payment.brand}</span>
              <span className="ml-2 text-white/56">ending {payment.last4}</span>
            </button>
          ))}
        </div>
      ) : null}
      {checkout.validation.payment ? (
        <p className="mt-2 text-[12px] text-[var(--sb-red-bright)]">
          {checkout.validation.payment}
        </p>
      ) : null}
    </div>
  );
}
