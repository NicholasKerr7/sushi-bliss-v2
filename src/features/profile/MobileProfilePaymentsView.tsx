"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { paymentBrandOptions } from "@/data/profile";
import { icons } from "@/features/home/visualHomeData";
import {
  createPaymentMethodFromDraft,
  getDefaultPaymentMethodDraft,
  paymentMethodToDraft,
  validatePaymentMethodDraft,
} from "@/lib/profile";
import type { PaymentMethod, PaymentMethodDraft } from "@/types/user";

import {
  formatPaymentLabel,
  getPaymentMark,
  MobileProfileBackButton,
  MobileProfileHeader,
  MobileProfilePanel,
} from "./MobileProfilePrimitives";

interface MobileProfilePaymentsViewProps {
  cartCount: number;
  onBack: () => void;
  onDeletePaymentMethod: (id: string) => void;
  onMakeDefaultPaymentMethod: (id: string) => void;
  onOpenCart: () => void;
  onSavePaymentMethod: (paymentMethod: PaymentMethod) => void;
  paymentMethods: PaymentMethod[];
}

/** Mobile payment manager for checkout-ready mock payment methods. */
export function MobileProfilePaymentsView({
  cartCount,
  onBack,
  onDeletePaymentMethod,
  onMakeDefaultPaymentMethod,
  onOpenCart,
  onSavePaymentMethod,
  paymentMethods,
}: MobileProfilePaymentsViewProps) {
  const [draft, setDraft] = useState<PaymentMethodDraft>(
    getDefaultPaymentMethodDraft,
  );
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [message, setMessage] = useState("");

  const editingPaymentMethod =
    paymentMethods.find((paymentMethod) => paymentMethod.id === editingId) ||
    null;

  const resetForm = () => {
    setDraft(getDefaultPaymentMethodDraft());
    setEditingId(null);
    setFormOpen(false);
    setMessage("");
  };

  const updateDraft = (field: keyof PaymentMethodDraft, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setMessage("");
  };

  const startEdit = (paymentMethod: PaymentMethod) => {
    setDraft(paymentMethodToDraft(paymentMethod));
    setEditingId(paymentMethod.id);
    setFormOpen(true);
    setMessage("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationMessage = validatePaymentMethodDraft(draft);

    if (validationMessage) {
      setMessage(validationMessage);
      return;
    }

    onSavePaymentMethod(
      createPaymentMethodFromDraft(
        draft,
        editingId || undefined,
        editingPaymentMethod?.isDefault || paymentMethods.length === 0,
      ),
    );
    resetForm();
  };

  return (
    <>
      <div className="relative z-10 mx-auto max-w-[430px] pb-16">
        <MobileProfileHeader cartCount={cartCount} onOpenCart={onOpenCart} />

        <div className="mt-7 grid grid-cols-[52px_1fr_52px] items-center">
          <MobileProfileBackButton label="Back to profile" onClick={onBack} />
          <h1 className="editorial-title text-center text-[25px] uppercase tracking-[0.1em] text-white">
            Payments
          </h1>
          <button
            aria-label="Add payment method"
            className="grid h-[52px] w-[52px] place-items-center rounded-[13px] border border-[var(--sb-border)] bg-black/46 text-[30px] leading-none text-[var(--sb-gold-soft)]"
            onClick={() => {
              setDraft(getDefaultPaymentMethodDraft());
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
            Payment
            <span className="block text-[var(--sb-red-bright)]">Methods</span>
          </h2>
          <p className="mt-4 text-[16px] leading-6 text-white/62">
            Saved cards are token-style mocks and can be selected at checkout.
          </p>
        </section>

        <div className="mt-6 grid gap-3">
          {paymentMethods.map((paymentMethod) => (
            <MobileProfilePanel className="p-4" key={paymentMethod.id}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid h-11 w-[68px] place-items-center rounded-[9px] border border-white/12 bg-white/8 text-[12px] font-black italic text-white">
                    {getPaymentMark(paymentMethod)}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-[16px] text-white">
                        {formatPaymentLabel(paymentMethod)}
                      </h3>
                      {paymentMethod.isDefault ? (
                        <span className="rounded-full border border-[var(--sb-gold)]/38 bg-[var(--sb-gold)]/12 px-3 py-1 text-[11px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                          Default
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-[13px] text-white/50">
                      Expires {paymentMethod.expiresAt}
                    </p>
                  </div>
                </div>
                <AssetIcon className="mt-1" size={28} src={icons.cart} />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <button
                  className="min-h-[42px] rounded-[11px] border border-white/12 text-[12px] uppercase tracking-[0.06em] text-white/62 disabled:opacity-40"
                  disabled={paymentMethod.isDefault}
                  onClick={() => onMakeDefaultPaymentMethod(paymentMethod.id)}
                  type="button"
                >
                  Default
                </button>
                <button
                  className="min-h-[42px] rounded-[11px] border border-[var(--sb-border)] text-[12px] uppercase tracking-[0.06em] text-[var(--sb-gold-soft)]"
                  onClick={() => startEdit(paymentMethod)}
                  type="button"
                >
                  Edit
                </button>
                <button
                  className="min-h-[42px] rounded-[11px] border border-[var(--sb-red-bright)]/45 text-[12px] uppercase tracking-[0.06em] text-[var(--sb-red-bright)]"
                  onClick={() => onDeletePaymentMethod(paymentMethod.id)}
                  type="button"
                >
                  Remove
                </button>
              </div>
            </MobileProfilePanel>
          ))}
        </div>

        {formOpen || paymentMethods.length === 0 ? (
          <MobileProfilePanel className="mt-5 p-4">
            <form className="grid gap-3" onSubmit={handleSubmit}>
              <h3 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                {editingId ? "Edit payment" : "Add payment"}
              </h3>
              <MobilePaymentField
                label="Label"
                onChange={(value) => updateDraft("label", value)}
                value={draft.label}
              />
              <label className="grid gap-2">
                <span className="text-[11px] uppercase tracking-[0.1em] text-white/46">
                  Brand
                </span>
                <select
                  className="min-h-[48px] rounded-[12px] border border-white/10 bg-black/34 px-3 text-[15px] text-white outline-none"
                  onChange={(event) => updateDraft("brand", event.target.value)}
                  value={draft.brand}
                >
                  {paymentBrandOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <MobilePaymentField
                  inputMode="numeric"
                  label="Last four"
                  maxLength={4}
                  onChange={(value) => updateDraft("last4", value)}
                  value={draft.last4}
                />
                <MobilePaymentField
                  label="Expiration"
                  onChange={(value) => updateDraft("expiresAt", value)}
                  type="month"
                  value={draft.expiresAt}
                />
              </div>
              <MobilePaymentField
                inputMode="numeric"
                label="Billing ZIP"
                onChange={(value) => updateDraft("billingPostalCode", value)}
                value={draft.billingPostalCode}
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

function MobilePaymentField({
  inputMode,
  label,
  maxLength,
  onChange,
  type = "text",
  value,
}: {
  inputMode?: "numeric";
  label: string;
  maxLength?: number;
  onChange: (value: string) => void;
  type?: string;
  value: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-[11px] uppercase tracking-[0.1em] text-white/46">
        {label}
      </span>
      <input
        className="min-h-[48px] rounded-[12px] border border-white/10 bg-black/34 px-3 text-[15px] text-white outline-none"
        inputMode={inputMode}
        maxLength={maxLength}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        value={value}
      />
    </label>
  );
}
