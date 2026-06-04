"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { paymentBrandOptions } from "@/data/profile";
import {
  createPaymentMethodFromDraft,
  getDefaultPaymentMethodDraft,
  paymentMethodToDraft,
  validatePaymentMethodDraft,
} from "@/lib/profile";
import type { PaymentMethod, PaymentMethodDraft } from "@/types/user";

interface PaymentMethodsPanelProps {
  onDeletePaymentMethod: (id: string) => void;
  onMakeDefaultPaymentMethod: (id: string) => void;
  onSavePaymentMethod: (paymentMethod: PaymentMethod) => void;
  paymentMethods: PaymentMethod[];
}

export function PaymentMethodsPanel({
  onDeletePaymentMethod,
  onMakeDefaultPaymentMethod,
  onSavePaymentMethod,
  paymentMethods,
}: PaymentMethodsPanelProps) {
  const [draft, setDraft] = useState<PaymentMethodDraft>(
    getDefaultPaymentMethodDraft,
  );
  const [editingPaymentMethodId, setEditingPaymentMethodId] = useState<
    string | null
  >(null);
  const [formOpen, setFormOpen] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const editingPaymentMethod =
    paymentMethods.find(
      (paymentMethod) => paymentMethod.id === editingPaymentMethodId,
    ) || null;

  const resetForm = () => {
    setDraft(getDefaultPaymentMethodDraft());
    setEditingPaymentMethodId(null);
    setFormOpen(false);
    setValidationMessage("");
  };

  const updateDraft = (field: keyof PaymentMethodDraft, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setValidationMessage("");
  };

  const startNewPaymentMethod = () => {
    setDraft(getDefaultPaymentMethodDraft());
    setEditingPaymentMethodId(null);
    setFormOpen(true);
    setValidationMessage("");
  };

  const startEditPaymentMethod = (paymentMethod: PaymentMethod) => {
    setDraft(paymentMethodToDraft(paymentMethod));
    setEditingPaymentMethodId(paymentMethod.id);
    setFormOpen(true);
    setValidationMessage("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const paymentError = validatePaymentMethodDraft(draft);

    if (paymentError) {
      setValidationMessage(paymentError);
      return;
    }

    onSavePaymentMethod(
      createPaymentMethodFromDraft(
        draft,
        editingPaymentMethodId || undefined,
        editingPaymentMethod?.isDefault || paymentMethods.length === 0,
      ),
    );
    resetForm();
  };

  return (
    <Card className="p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold text-sb-rice">
            Payment methods
          </h3>
          <p className="mt-2 text-sm leading-6 text-sb-muted">
            Saved payment methods are shared with checkout.
          </p>
        </div>
        <Button onClick={startNewPaymentMethod} size="sm" variant="secondary">
          Add payment
        </Button>
      </div>

      <div className="mt-5 grid gap-3">
        {paymentMethods.length > 0 ? (
          paymentMethods.map((paymentMethod) => (
            <div
              className="rounded-card border border-sb-line bg-sb-ink/45 p-4"
              key={paymentMethod.id}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-sb-rice">
                      {paymentMethod.label ? `${paymentMethod.label} · ` : ""}
                      {paymentMethod.brand} ending {paymentMethod.last4}
                    </p>
                    {paymentMethod.isDefault ? (
                      <StatusBadge tone="success">Default</StatusBadge>
                    ) : null}
                  </div>
                  <p className="mt-2 text-xs leading-5 text-sb-muted">
                    Expires {paymentMethod.expiresAt}
                    {paymentMethod.billingPostalCode
                      ? ` · ZIP ${paymentMethod.billingPostalCode}`
                      : ""}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    disabled={paymentMethod.isDefault}
                    onClick={() => onMakeDefaultPaymentMethod(paymentMethod.id)}
                    size="sm"
                    variant="ghost"
                  >
                    Default
                  </Button>
                  <Button
                    onClick={() => startEditPaymentMethod(paymentMethod)}
                    size="sm"
                    variant="ghost"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => onDeletePaymentMethod(paymentMethod.id)}
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
            No saved payment methods. Add one before placing an order.
          </p>
        )}
      </div>

      {formOpen ? (
        <form
          className="mt-5 rounded-card border border-sb-line bg-sb-panel-soft/55 p-4"
          onSubmit={handleSubmit}
        >
          <h4 className="text-sm font-semibold text-sb-rice">
            {editingPaymentMethodId ? "Edit payment" : "Add payment"}
          </h4>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Input
              id="profile-payment-label"
              label="Label"
              onChange={(event) => updateDraft("label", event.target.value)}
              placeholder="Personal"
              value={draft.label}
            />
            <Select
              id="profile-payment-brand"
              label="Brand"
              onChange={(event) => updateDraft("brand", event.target.value)}
              options={paymentBrandOptions}
              value={draft.brand}
            />
            <Input
              id="profile-payment-last4"
              inputMode="numeric"
              label="Last four"
              maxLength={4}
              onChange={(event) => updateDraft("last4", event.target.value)}
              placeholder="4242"
              value={draft.last4}
            />
            <Input
              id="profile-payment-expiration"
              label="Expiration"
              onChange={(event) => updateDraft("expiresAt", event.target.value)}
              type="month"
              value={draft.expiresAt}
            />
            <Input
              id="profile-payment-postal"
              inputMode="numeric"
              label="Billing ZIP"
              onChange={(event) =>
                updateDraft("billingPostalCode", event.target.value)
              }
              placeholder="10013"
              value={draft.billingPostalCode}
            />
          </div>
          {validationMessage ? (
            <p className="mt-3 text-xs leading-5 text-sb-red">
              {validationMessage}
            </p>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" type="submit">
              Save payment
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
