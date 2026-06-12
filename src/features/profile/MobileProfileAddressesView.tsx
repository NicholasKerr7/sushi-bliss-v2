"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { icons } from "@/features/home/visualHomeData";
import {
  addressToDraft,
  createAddressFromDraft,
  getDefaultAddressDraft,
  validateAddressDraft,
} from "@/lib/profile";
import type { Address, AddressDraft } from "@/types/user";

import {
  formatAddressLine,
  MobileProfileBackButton,
  MobileProfileHeader,
  MobileProfilePanel,
} from "./MobileProfilePrimitives";

interface MobileProfileAddressesViewProps {
  addresses: Address[];
  cartCount: number;
  unreadNotificationCount: number;
  onBack: () => void;
  onDeleteAddress: (id: string) => void;
  onMakeDefaultAddress: (id: string) => void;
  onOpenCart: () => void;
  onSaveAddress: (address: Address) => void;
}

/** Mobile saved-address manager used by checkout delivery selection. */
export function MobileProfileAddressesView({
  addresses,
  cartCount,
  unreadNotificationCount,
  onBack,
  onDeleteAddress,
  onMakeDefaultAddress,
  onOpenCart,
  onSaveAddress,
}: MobileProfileAddressesViewProps) {
  const [draft, setDraft] = useState<AddressDraft>(getDefaultAddressDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [message, setMessage] = useState("");

  const editingAddress =
    addresses.find((address) => address.id === editingId) || null;

  const resetForm = () => {
    setDraft(getDefaultAddressDraft());
    setEditingId(null);
    setFormOpen(false);
    setMessage("");
  };

  const updateDraft = (field: keyof AddressDraft, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setMessage("");
  };

  const startEdit = (address: Address) => {
    setDraft(addressToDraft(address));
    setEditingId(address.id);
    setFormOpen(true);
    setMessage("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationMessage = validateAddressDraft(draft);

    if (validationMessage) {
      setMessage(validationMessage);
      return;
    }

    onSaveAddress(
      createAddressFromDraft(
        draft,
        editingId || undefined,
        editingAddress?.isDefault || addresses.length === 0,
      ),
    );
    resetForm();
  };

  return (
    <>
      <div className="relative z-10 mx-auto max-w-[430px] pb-16">
        <MobileProfileHeader
          cartCount={cartCount}
          unreadNotificationCount={unreadNotificationCount}
          onOpenCart={onOpenCart}
        />

        <div className="mt-7 grid grid-cols-[52px_1fr_52px] items-center">
          <MobileProfileBackButton label="Back to profile" onClick={onBack} />
          <h1 className="editorial-title text-center text-[25px] uppercase tracking-[0.1em] text-white">
            Addresses
          </h1>
          <button
            aria-label="Add address"
            className="grid h-[52px] w-[52px] place-items-center rounded-[13px] border border-[var(--sb-border)] bg-black/46 text-[30px] leading-none text-[var(--sb-gold-soft)]"
            onClick={() => {
              setDraft(getDefaultAddressDraft());
              setEditingId(null);
              setFormOpen(true);
              setMessage("");
            }}
            type="button"
          >
            +
          </button>
        </div>

        <section className="mt-8">
          <h2 className="editorial-title text-[38px] uppercase leading-[1.03] text-white">
            Saved
            <span className="block text-[var(--sb-red-bright)]">Addresses</span>
          </h2>
          <p className="mt-4 text-[16px] leading-6 text-white/62">
            Delivery addresses are shared with checkout and reservations.
          </p>
        </section>

        <div className="mt-6 grid gap-3">
          {addresses.map((address) => (
            <MobileProfilePanel className="p-4" key={address.id}>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-[18px] text-white">{address.label}</h3>
                    {address.isDefault ? (
                      <span className="rounded-full border border-[var(--sb-gold)]/38 bg-[var(--sb-gold)]/12 px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                        Default
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 text-[14px] leading-6 text-white/58">
                    {formatAddressLine(address)}
                  </p>
                </div>
                <AssetIcon className="mt-1" size={28} src={icons.location} />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <button
                  className="min-h-[42px] rounded-[11px] border border-white/12 text-[12px] uppercase tracking-[0.06em] text-white/62 disabled:opacity-40"
                  disabled={address.isDefault}
                  onClick={() => onMakeDefaultAddress(address.id)}
                  type="button"
                >
                  Default
                </button>
                <button
                  className="min-h-[42px] rounded-[11px] border border-[var(--sb-border)] text-[12px] uppercase tracking-[0.06em] text-[var(--sb-gold-soft)]"
                  onClick={() => startEdit(address)}
                  type="button"
                >
                  Edit
                </button>
                <button
                  className="min-h-[42px] rounded-[11px] border border-[var(--sb-red-bright)]/45 text-[12px] uppercase tracking-[0.06em] text-[var(--sb-red-bright)]"
                  onClick={() => onDeleteAddress(address.id)}
                  type="button"
                >
                  Remove
                </button>
              </div>
            </MobileProfilePanel>
          ))}
        </div>

        {formOpen || addresses.length === 0 ? (
          <MobileProfilePanel className="mt-5 p-4">
            <form className="grid gap-3" onSubmit={handleSubmit}>
              <h3 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                {editingId ? "Edit address" : "Add address"}
              </h3>
              <MobileAddressField
                label="Label"
                onChange={(value) => updateDraft("label", value)}
                value={draft.label}
              />
              <MobileAddressField
                label="Street"
                onChange={(value) => updateDraft("line1", value)}
                value={draft.line1}
              />
              <MobileAddressField
                label="Apt or suite"
                onChange={(value) => updateDraft("line2", value)}
                value={draft.line2}
              />
              <div className="grid grid-cols-2 gap-3">
                <MobileAddressField
                  label="City"
                  onChange={(value) => updateDraft("city", value)}
                  value={draft.city}
                />
                <MobileAddressField
                  label="Region"
                  onChange={(value) => updateDraft("region", value)}
                  value={draft.region}
                />
              </div>
              <MobileAddressField
                label="Postal code"
                onChange={(value) => updateDraft("postalCode", value)}
                value={draft.postalCode}
              />
              {message ? (
                <p className="text-[12px] text-[var(--sb-red-bright)]">
                  {message}
                </p>
              ) : null}
              <div className="grid grid-cols-2 gap-3">
                <button
                  className="red-glow-button min-h-[58px] rounded-[13px] text-[13px] uppercase tracking-[0.08em]"
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="min-h-[58px] rounded-[13px] border border-[var(--sb-border)] text-[13px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
                  onClick={resetForm}
                  type="button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </MobileProfilePanel>
        ) : null}
      </div>

      <BottomNavigation
        activeId="profile"
        ariaLabel="Mobile profile navigation"
      />
    </>
  );
}

function MobileAddressField({
  label,
  onChange,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-[11px] uppercase tracking-[0.1em] text-white/46">
        {label}
      </span>
      <input
        className="min-h-[48px] rounded-[12px] border border-white/10 bg-black/34 px-3 text-[15px] text-white outline-none"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      />
    </label>
  );
}
