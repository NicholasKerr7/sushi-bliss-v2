"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { paymentBrandOptions } from "@/data/profile";
import {
  createPaymentMethodFromDraft,
  getDefaultPaymentMethodDraft,
  isPaymentMethodUsable,
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
import { MobileProfileSubflowSummary } from "./MobileProfileSubflowSummary";

interface MobileProfilePaymentsViewProps {
  cartCount: number;
  unreadNotificationCount: number;
  onBack: () => void;
  onDeletePaymentMethod: (id: string) => void;
  onMakeDefaultPaymentMethod: (id: string) => void;
  onOpenCart: () => void;
  onSavePaymentMethod: (paymentMethod: PaymentMethod) => void;
  paymentMethods: PaymentMethod[];
}

/** Mobile payment manager for checkout-ready payment methods. */
export function MobileProfilePaymentsView({
  cartCount,
  unreadNotificationCount,
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
  const defaultPaymentMethod =
    paymentMethods.find((paymentMethod) => paymentMethod.isDefault) || null;
  const usablePaymentCount = paymentMethods.filter(
    isPaymentMethodUsable,
  ).length;

  const resetForm = (clearMessage = true) => {
    setDraft(getDefaultPaymentMethodDraft());
    setEditingId(null);
    setFormOpen(false);
    if (clearMessage) {
      setMessage("");
    }
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
    setMessage(editingId ? "Payment method updated." : "Payment method saved.");
    resetForm(false);
  };

  return (
    <>
      <div className="mobile-frame relative z-10 pb-16">
        <MobileProfileHeader
          cartCount={cartCount}
          unreadNotificationCount={unreadNotificationCount}
          onOpenCart={onOpenCart}
        />

        <div className="mt-6 grid grid-cols-[44px_minmax(0,1fr)_44px] items-center min-[390px]:mt-7 min-[390px]:grid-cols-[52px_1fr_52px]">
          <MobileProfileBackButton label="Back to profile" onClick={onBack} />
          <h1 className="editorial-title text-center text-[21px] uppercase tracking-[0.07em] text-white min-[390px]:text-[25px] min-[390px]:tracking-[0.1em]">
            Payments
          </h1>
          <button
            aria-label="Add payment method"
            className="grid h-[44px] w-[44px] place-items-center rounded-[12px] border border-[var(--sb-border)] bg-black/46 text-[var(--sb-gold-soft)] shadow-[0_0_24px_rgba(0,0,0,0.28)] min-[390px]:h-[52px] min-[390px]:w-[52px] min-[390px]:rounded-[13px]"
            onClick={() => {
              setDraft(getDefaultPaymentMethodDraft());
              setEditingId(null);
              setFormOpen(true);
              setMessage("");
            }}
            type="button"
          >
            <AssetIcon size={18} src="/assets/icons/plus-icon.png" />
          </button>
        </div>

        <section className="mt-7 min-[390px]:mt-8">
          <h2 className="editorial-title text-[30px] uppercase leading-[1.03] text-white min-[390px]:text-[38px]">
            Payment
            <span className="block text-[var(--sb-red-bright)]">Methods</span>
          </h2>
          <p className="mt-3 text-[14px] leading-[22px] text-white/62 min-[390px]:mt-4 min-[390px]:text-[16px] min-[390px]:leading-6">
            Saved cards can be selected during checkout review.
          </p>
        </section>

        <MobileProfileSubflowSummary
          eyebrow="Checkout wallet"
          icon="/assets/icons/credit-card-icon.png"
          metrics={[
            { label: "Saved", value: paymentMethods.length },
            { label: "Usable", value: usablePaymentCount },
            {
              label: "Default",
              value: defaultPaymentMethod
                ? getPaymentMark(defaultPaymentMethod)
                : "None",
            },
          ]}
          subtitle={
            defaultPaymentMethod
              ? `${formatPaymentLabel(defaultPaymentMethod)} is selected first at checkout.`
              : "Add a saved payment method for checkout review."
          }
          title={
            defaultPaymentMethod
              ? "Default card ready"
              : "No default payment method"
          }
          action={
            <button
              className="min-h-[46px] w-full rounded-[13px] border border-[var(--sb-border)] bg-black/28 px-3 text-[10px] uppercase tracking-[0.06em] text-[var(--sb-gold-soft)] min-[390px]:min-h-[48px] min-[390px]:text-[12px] min-[390px]:tracking-[0.08em]"
              onClick={() => {
                setDraft(getDefaultPaymentMethodDraft());
                setEditingId(null);
                setFormOpen(true);
                setMessage("");
              }}
              type="button"
            >
              Add payment method
            </button>
          }
        />

        {message && !formOpen ? (
          <p className="mt-4 rounded-[14px] border border-[var(--sb-gold)]/24 bg-[var(--sb-gold)]/10 p-3 text-[14px] text-[var(--sb-gold-soft)]">
            {message}
          </p>
        ) : null}

        <div className="mt-6 grid gap-3">
          {paymentMethods.map((paymentMethod) => (
            <MobileProfilePanel
              className="relative overflow-hidden p-3 min-[390px]:p-4"
              key={paymentMethod.id}
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-4 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(215,168,79,0.42),transparent)]"
              />
              <div className="grid grid-cols-[58px_minmax(0,1fr)] items-start gap-3 min-[390px]:grid-cols-[72px_minmax(0,1fr)] min-[390px]:gap-4">
                <span className="relative grid h-[42px] w-[58px] place-items-center overflow-hidden rounded-[10px] border border-white/12 bg-[linear-gradient(135deg,rgba(255,255,255,0.13),rgba(0,0,0,0.32))] text-[10px] font-black italic text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] min-[390px]:h-[48px] min-[390px]:w-[72px] min-[390px]:text-[12px]">
                  <span
                    aria-hidden="true"
                    className="absolute -right-6 -top-7 h-12 w-12 rounded-full bg-[var(--sb-gold)]/14"
                  />
                  <span className="relative z-10">
                    {getPaymentMark(paymentMethod)}
                  </span>
                </span>
                <div className="min-w-0">
                  <div className="flex min-w-0 items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.1em] text-white/38">
                        Checkout wallet
                      </p>
                      <h3 className="mt-1 break-words text-[14px] leading-5 text-white min-[390px]:text-[16px]">
                        {formatPaymentLabel(paymentMethod)}
                      </h3>
                    </div>
                    <span className="shrink-0 rounded-full border border-white/10 bg-black/30 px-2 py-1 text-[9px] uppercase tracking-[0.06em] text-white/48">
                      {paymentMethod.isDefault ? "Default" : "Saved"}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-white/50 min-[390px]:text-[12px]">
                    <span>Expires {paymentMethod.expiresAt}</span>
                    {paymentMethod.billingPostalCode ? (
                      <span>ZIP {paymentMethod.billingPostalCode}</span>
                    ) : null}
                  </div>
                  {!isPaymentMethodUsable(paymentMethod) ? (
                    <p className="mt-2 text-[12px] font-semibold text-[var(--sb-red-bright)]">
                      Expired - update before checkout.
                    </p>
                  ) : null}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-1.5 min-[390px]:gap-2">
                <button
                  className="min-h-10 rounded-[10px] border border-white/12 text-[10px] uppercase tracking-[0.04em] text-white/62 disabled:opacity-40 min-[390px]:min-h-[42px] min-[390px]:rounded-[11px] min-[390px]:text-[12px] min-[390px]:tracking-[0.06em]"
                  disabled={paymentMethod.isDefault}
                  onClick={() => {
                    onMakeDefaultPaymentMethod(paymentMethod.id);
                    setMessage(
                      `${formatPaymentLabel(paymentMethod)} is now default.`,
                    );
                  }}
                  type="button"
                >
                  Default
                </button>
                <button
                  className="min-h-10 rounded-[10px] border border-[var(--sb-border)] text-[10px] uppercase tracking-[0.04em] text-[var(--sb-gold-soft)] min-[390px]:min-h-[42px] min-[390px]:rounded-[11px] min-[390px]:text-[12px] min-[390px]:tracking-[0.06em]"
                  onClick={() => startEdit(paymentMethod)}
                  type="button"
                >
                  Edit
                </button>
                <button
                  className="min-h-10 rounded-[10px] border border-[var(--sb-red-bright)]/45 text-[10px] uppercase tracking-[0.04em] text-[var(--sb-red-bright)] min-[390px]:min-h-[42px] min-[390px]:rounded-[11px] min-[390px]:text-[12px] min-[390px]:tracking-[0.06em]"
                  onClick={() => {
                    onDeletePaymentMethod(paymentMethod.id);
                    setMessage(`${formatPaymentLabel(paymentMethod)} removed.`);
                  }}
                  type="button"
                >
                  Remove
                </button>
              </div>
            </MobileProfilePanel>
          ))}
        </div>

        {formOpen || paymentMethods.length === 0 ? (
          <MobileProfilePanel className="mt-5 p-3 min-[390px]:p-4">
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
                <span className="relative block">
                  <select
                    className="min-h-[48px] w-full appearance-none rounded-[12px] border border-white/10 bg-black/34 px-3 pr-11 text-[15px] font-semibold text-white outline-none transition focus:border-[var(--sb-gold)]/58 focus:ring-2 focus:ring-[var(--sb-gold)]/18"
                    onChange={(event) =>
                      updateDraft("brand", event.target.value)
                    }
                    value={draft.brand}
                  >
                    {paymentBrandOptions.map((option) => (
                      <option
                        className="bg-[#050607] text-white"
                        key={option.value}
                        value={option.value}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronIcon
                    className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--sb-gold)]"
                    direction="down"
                    size={18}
                  />
                </span>
              </label>
              <div className="grid grid-cols-2 gap-2.5 min-[390px]:gap-3">
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
              <div className="grid grid-cols-2 gap-2.5 min-[390px]:gap-3">
                <button
                  className="red-glow-button min-h-[52px] rounded-[13px] text-[12px] uppercase tracking-[0.06em] min-[390px]:min-h-[58px] min-[390px]:text-[13px] min-[390px]:tracking-[0.08em]"
                  type="submit"
                >
                  Save
                </button>
                <button
                  className="min-h-[52px] rounded-[13px] border border-[var(--sb-border)] text-[12px] uppercase tracking-[0.06em] text-[var(--sb-gold-soft)] min-[390px]:min-h-[58px] min-[390px]:text-[13px] min-[390px]:tracking-[0.08em]"
                  onClick={() => resetForm()}
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
