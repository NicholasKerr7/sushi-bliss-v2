"use client";

import { pickupLocation } from "@/data/checkout";
import { icons } from "@/features/home/visualHomeData";
import { formatMoney } from "@/lib/money";

import {
  AddressChoice,
  MobileBackButton,
  MobileCheckoutActionDock,
  MobileSelectionCard,
  MobileTextInput,
  SectionTitle,
  SecureInlineCopy,
  StepHeading,
} from "./MobileCheckoutPrimitives";
import type { MobileCheckoutState } from "./mobileCheckoutTypes";

export function AddressStep({
  checkout,
  instructions,
  onBack,
  onContinue,
  onInstructionsChange,
}: {
  checkout: MobileCheckoutState;
  instructions: string;
  onBack: () => void;
  onContinue: () => void;
  onInstructionsChange: (value: string) => void;
}) {
  const selectedAddress = checkout.selectedAddress;

  return (
    <main className="mt-6">
      <MobileBackButton onBack={onBack} />
      <StepHeading eyebrow="Checkout" title="Delivery address" />

      {checkout.mode === "pickup" ? (
        <MobileSelectionCard
          active
          icon={icons.bag}
          label="Pickup location"
          title={pickupLocation.label}
        >
          <p>
            {pickupLocation.line1}, {pickupLocation.city},{" "}
            {pickupLocation.region} {pickupLocation.postalCode}
          </p>
        </MobileSelectionCard>
      ) : (
        <>
          {selectedAddress ? (
            <AddressChoice
              active
              address={selectedAddress}
              label="Default address"
              onSelect={() => checkout.setSelectedAddressId(selectedAddress.id)}
            />
          ) : null}

          <button
            className="mt-3 flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-[15px] border border-[var(--sb-border-strong)] bg-white/[0.025] text-[11px] uppercase tracking-[0.07em] text-[var(--sb-gold-soft)] min-[390px]:min-h-[54px] min-[390px]:text-[12px] min-[390px]:tracking-[0.08em]"
            onClick={checkout.startNewAddress}
            type="button"
          >
            <span className="text-[21px] leading-none min-[390px]:text-[24px]">
              +
            </span>
            Add new address
          </button>

          {checkout.addressFormOpen ? (
            <MobileAddressForm checkout={checkout} />
          ) : null}
        </>
      )}

      <section className="mt-5">
        <SectionTitle>Delivery instructions</SectionTitle>
        <label className="mt-3 block rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025] p-3 min-[390px]:p-4">
          <span className="sr-only">Delivery instructions</span>
          <textarea
            className="min-h-[86px] w-full resize-none bg-transparent text-[13px] leading-6 text-white outline-none placeholder:text-white/40 min-[390px]:min-h-[96px] min-[390px]:text-[14px]"
            maxLength={120}
            onChange={(event) => onInstructionsChange(event.target.value)}
            placeholder="e.g., Leave at the door, call upon arrival, etc."
            value={instructions}
          />
          <span className="block text-right text-[12px] text-white/46">
            {instructions.length}/120
          </span>
        </label>
      </section>

      {checkout.mode === "delivery" ? (
        <section className="mt-5">
          <div className="flex items-center justify-between gap-4">
            <SectionTitle>Saved addresses</SectionTitle>
            <span className="text-[10px] uppercase tracking-[0.07em] text-[var(--sb-gold-soft)] min-[390px]:text-[12px] min-[390px]:tracking-[0.08em]">
              View all
            </span>
          </div>
          <div className="mt-3 grid gap-3">
            {checkout.addresses
              .filter((address) => address.id !== checkout.selectedAddressId)
              .slice(0, 2)
              .map((address) => (
                <AddressChoice
                  address={address}
                  key={address.id}
                  onSelect={() => checkout.setSelectedAddressId(address.id)}
                />
              ))}
          </div>
          {checkout.validation.address ? (
            <p className="mt-3 text-[13px] text-[var(--sb-red-bright)]">
              {checkout.validation.address}
            </p>
          ) : null}
        </section>
      ) : null}

      <SecureInlineCopy>All addresses are securely saved</SecureInlineCopy>
      <MobileCheckoutActionDock
        label="Continue to payment"
        meta={
          checkout.mode === "delivery" ? "Delivery selected" : "Pickup selected"
        }
        onClick={onContinue}
        value={formatMoney(checkout.reviewTotals.totalCents)}
      />
    </main>
  );
}

function MobileAddressForm({ checkout }: { checkout: MobileCheckoutState }) {
  return (
    <section className="mt-3 rounded-[15px] border border-[var(--sb-border)] bg-white/[0.025] p-3 min-[390px]:p-4">
      <h2 className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--sb-gold-soft)] min-[390px]:text-[13px]">
        Add address
      </h2>
      <div className="mt-3 grid gap-3">
        <MobileTextInput
          label="Label"
          onChange={(value) => checkout.updateAddressDraft("label", value)}
          placeholder="Home"
          value={checkout.addressDraft.label}
        />
        <MobileTextInput
          label="Street"
          onChange={(value) => checkout.updateAddressDraft("line1", value)}
          placeholder="120 Sakura Street"
          value={checkout.addressDraft.line1}
        />
        <MobileTextInput
          label="City"
          onChange={(value) => checkout.updateAddressDraft("city", value)}
          placeholder="Tokyo"
          value={checkout.addressDraft.city}
        />
        <div className="grid gap-3 min-[430px]:grid-cols-2">
          <MobileTextInput
            label="State"
            onChange={(value) => checkout.updateAddressDraft("region", value)}
            placeholder="NY"
            value={checkout.addressDraft.region}
          />
          <MobileTextInput
            label="Postal"
            onChange={(value) =>
              checkout.updateAddressDraft("postalCode", value)
            }
            placeholder="10013"
            value={checkout.addressDraft.postalCode}
          />
        </div>
      </div>
      {checkout.validation.address ? (
        <p className="mt-3 text-[13px] text-[var(--sb-red-bright)]">
          {checkout.validation.address}
        </p>
      ) : null}
      <div className="mt-4 grid grid-cols-2 gap-2.5 min-[390px]:gap-3">
        <button
          className="h-10 rounded-[12px] border border-[var(--sb-gold)]/45 text-[11px] uppercase tracking-[0.06em] text-[var(--sb-gold-soft)] min-[390px]:h-11 min-[390px]:text-[12px]"
          onClick={() => checkout.saveAddressDraft()}
          type="button"
        >
          Save
        </button>
        <button
          className="h-10 rounded-[12px] border border-white/12 text-[11px] uppercase tracking-[0.06em] text-white/64 min-[390px]:h-11 min-[390px]:text-[12px]"
          onClick={checkout.cancelAddressForm}
          type="button"
        >
          Cancel
        </button>
      </div>
    </section>
  );
}
