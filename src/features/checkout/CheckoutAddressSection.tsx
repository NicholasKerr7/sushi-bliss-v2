"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { pickupLocation } from "@/data/checkout";
import { classNames } from "@/lib/classNames";
import type { CheckoutAddressDraft } from "@/types/checkout";
import type { FulfillmentMode } from "@/types/common";
import type { Address } from "@/types/user";

interface CheckoutAddressSectionProps {
  addressDraft: CheckoutAddressDraft;
  addressFormOpen: boolean;
  addresses: Address[];
  editingAddressId: string | null;
  mode: FulfillmentMode;
  onCancelAddressForm: () => void;
  onSaveAddressDraft: () => void;
  onSelectAddress: (addressId: string) => void;
  onStartEditSelectedAddress: () => void;
  onStartNewAddress: () => void;
  onUpdateAddressDraft: (
    field: keyof CheckoutAddressDraft,
    value: string,
  ) => void;
  selectedAddressId: string | null;
  validationMessage?: string;
}

export function CheckoutAddressSection({
  addressDraft,
  addressFormOpen,
  addresses,
  editingAddressId,
  mode,
  onCancelAddressForm,
  onSaveAddressDraft,
  onSelectAddress,
  onStartEditSelectedAddress,
  onStartNewAddress,
  onUpdateAddressDraft,
  selectedAddressId,
  validationMessage,
}: CheckoutAddressSectionProps) {
  if (mode === "pickup") {
    return (
      <section>
        <h3 className="text-sm font-semibold text-sb-rice">Pickup location</h3>
        <Card className="mt-3 p-4">
          <p className="text-sm font-semibold text-sb-rice">
            {pickupLocation.label}
          </p>
          <p className="mt-1 text-sm leading-6 text-sb-muted">
            {pickupLocation.line1}, {pickupLocation.city},{" "}
            {pickupLocation.region} {pickupLocation.postalCode}
          </p>
        </Card>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-sb-rice">Delivery address</h3>
        <div className="flex gap-2">
          <Button onClick={onStartNewAddress} size="sm" variant="secondary">
            Add
          </Button>
          <Button
            disabled={!selectedAddressId}
            onClick={onStartEditSelectedAddress}
            size="sm"
            variant="ghost"
          >
            Edit
          </Button>
        </div>
      </div>

      <div className="mt-3 grid gap-3">
        {addresses.map((address) => {
          const selected = address.id === selectedAddressId;

          return (
            <button
              aria-pressed={selected}
              className={classNames(
                "rounded-card border p-4 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
                selected
                  ? "border-sb-gold bg-sb-gold/10"
                  : "border-sb-line bg-sb-panel/60 hover:bg-sb-rice/5",
              )}
              key={address.id}
              onClick={() => onSelectAddress(address.id)}
              type="button"
            >
              <span className="text-sm font-semibold text-sb-rice">
                {address.label}
              </span>
              <span className="mt-1 block text-xs leading-5 text-sb-muted">
                {address.line1}
                {address.line2 ? `, ${address.line2}` : ""}, {address.city},{" "}
                {address.region} {address.postalCode}
              </span>
            </button>
          );
        })}
      </div>

      {addressFormOpen ? (
        <Card className="mt-3 p-4">
          <h4 className="text-sm font-semibold text-sb-rice">
            {editingAddressId ? "Edit address" : "Add address"}
          </h4>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Input
              id="checkout-address-label"
              label="Label"
              onChange={(event) =>
                onUpdateAddressDraft("label", event.target.value)
              }
              placeholder="Home"
              value={addressDraft.label}
            />
            <Input
              id="checkout-address-line1"
              label="Street"
              onChange={(event) =>
                onUpdateAddressDraft("line1", event.target.value)
              }
              placeholder="120 Sakura Street"
              value={addressDraft.line1}
            />
            <Input
              id="checkout-address-line2"
              label="Apt or suite"
              onChange={(event) =>
                onUpdateAddressDraft("line2", event.target.value)
              }
              placeholder="Optional"
              value={addressDraft.line2}
            />
            <Input
              id="checkout-address-city"
              label="City"
              onChange={(event) =>
                onUpdateAddressDraft("city", event.target.value)
              }
              placeholder="New York"
              value={addressDraft.city}
            />
            <Input
              id="checkout-address-region"
              label="State"
              onChange={(event) =>
                onUpdateAddressDraft("region", event.target.value)
              }
              placeholder="NY"
              value={addressDraft.region}
            />
            <Input
              id="checkout-address-postal"
              label="Postal code"
              onChange={(event) =>
                onUpdateAddressDraft("postalCode", event.target.value)
              }
              placeholder="10013"
              value={addressDraft.postalCode}
            />
          </div>
          {validationMessage ? (
            <p className="mt-3 text-xs leading-5 text-sb-red">
              {validationMessage}
            </p>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-2">
            <Button onClick={onSaveAddressDraft} size="sm">
              Save address
            </Button>
            <Button onClick={onCancelAddressForm} size="sm" variant="ghost">
              Cancel
            </Button>
          </div>
        </Card>
      ) : validationMessage ? (
        <p className="mt-3 text-xs leading-5 text-sb-red">
          {validationMessage}
        </p>
      ) : null}
    </section>
  );
}
