"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  addressToDraft,
  createAddressFromDraft,
  getDefaultAddressDraft,
  validateAddressDraft,
} from "@/lib/profile";
import type { Address, AddressDraft } from "@/types/user";

interface AddressBookProps {
  addresses: Address[];
  onDeleteAddress: (id: string) => void;
  onMakeDefaultAddress: (id: string) => void;
  onSaveAddress: (address: Address) => void;
}

export function AddressBook({
  addresses,
  onDeleteAddress,
  onMakeDefaultAddress,
  onSaveAddress,
}: AddressBookProps) {
  const [draft, setDraft] = useState<AddressDraft>(getDefaultAddressDraft);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const editingAddress =
    addresses.find((address) => address.id === editingAddressId) || null;

  const resetForm = () => {
    setDraft(getDefaultAddressDraft());
    setEditingAddressId(null);
    setFormOpen(false);
    setValidationMessage("");
  };

  const updateDraft = (field: keyof AddressDraft, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setValidationMessage("");
  };

  const startNewAddress = () => {
    setDraft(getDefaultAddressDraft());
    setEditingAddressId(null);
    setFormOpen(true);
    setValidationMessage("");
  };

  const startEditAddress = (address: Address) => {
    setDraft(addressToDraft(address));
    setEditingAddressId(address.id);
    setFormOpen(true);
    setValidationMessage("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const addressError = validateAddressDraft(draft);

    if (addressError) {
      setValidationMessage(addressError);
      return;
    }

    onSaveAddress(
      createAddressFromDraft(
        draft,
        editingAddressId || undefined,
        editingAddress?.isDefault || addresses.length === 0,
      ),
    );
    resetForm();
  };

  return (
    <Card className="p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold text-sb-rice">
            Saved addresses
          </h3>
          <p className="mt-2 text-sm leading-6 text-sb-muted">
            Delivery addresses are shared with checkout.
          </p>
        </div>
        <Button onClick={startNewAddress} size="sm" variant="secondary">
          Add address
        </Button>
      </div>

      <div className="mt-5 grid gap-3">
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <div
              className="rounded-card border border-sb-line bg-sb-ink/45 p-4"
              key={address.id}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-sb-rice">
                      {address.label}
                    </p>
                    {address.isDefault ? (
                      <StatusBadge tone="success">Default</StatusBadge>
                    ) : null}
                  </div>
                  <p className="mt-2 text-xs leading-5 text-sb-muted">
                    {address.line1}
                    {address.line2 ? `, ${address.line2}` : ""}, {address.city},{" "}
                    {address.region} {address.postalCode}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    disabled={address.isDefault}
                    onClick={() => onMakeDefaultAddress(address.id)}
                    size="sm"
                    variant="ghost"
                  >
                    Default
                  </Button>
                  <Button
                    onClick={() => startEditAddress(address)}
                    size="sm"
                    variant="ghost"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => onDeleteAddress(address.id)}
                    size="sm"
                    variant="danger"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="rounded-card border border-sb-line bg-sb-ink/45 p-4 text-sm leading-6 text-sb-muted">
            No saved delivery addresses. Add one before choosing delivery in
            checkout.
          </p>
        )}
      </div>

      {formOpen ? (
        <form
          className="mt-5 rounded-card border border-sb-line bg-sb-panel-soft/55 p-4"
          onSubmit={handleSubmit}
        >
          <h4 className="text-sm font-semibold text-sb-rice">
            {editingAddressId ? "Edit address" : "Add address"}
          </h4>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Input
              id="profile-address-label"
              label="Label"
              onChange={(event) => updateDraft("label", event.target.value)}
              placeholder="Home"
              value={draft.label}
            />
            <Input
              id="profile-address-line1"
              label="Street"
              onChange={(event) => updateDraft("line1", event.target.value)}
              placeholder="120 Sakura Street"
              value={draft.line1}
            />
            <Input
              id="profile-address-line2"
              label="Apt or suite"
              onChange={(event) => updateDraft("line2", event.target.value)}
              placeholder="Optional"
              value={draft.line2}
            />
            <Input
              id="profile-address-city"
              label="City"
              onChange={(event) => updateDraft("city", event.target.value)}
              placeholder="New York"
              value={draft.city}
            />
            <Input
              id="profile-address-region"
              label="State"
              onChange={(event) => updateDraft("region", event.target.value)}
              placeholder="NY"
              value={draft.region}
            />
            <Input
              id="profile-address-postal"
              label="Postal code"
              onChange={(event) =>
                updateDraft("postalCode", event.target.value)
              }
              placeholder="10013"
              value={draft.postalCode}
            />
          </div>
          {validationMessage ? (
            <p className="mt-3 text-xs leading-5 text-sb-red">
              {validationMessage}
            </p>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" type="submit">
              Save address
            </Button>
            <Button onClick={resetForm} size="sm" variant="ghost">
              Cancel
            </Button>
          </div>
        </form>
      ) : null}
    </Card>
  );
}
