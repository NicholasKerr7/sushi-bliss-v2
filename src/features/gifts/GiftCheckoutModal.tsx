"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  GIFT_DELIVERY_TIME_OPTIONS,
  getDefaultGiftCheckoutDraft,
} from "@/lib/gifts";
import { formatMoney } from "@/lib/money";
import type {
  GiftCheckoutDraft,
  GiftCheckoutResult,
  GiftExperience,
} from "@/types/gift";
import type { PaymentMethod, UserProfile } from "@/types/user";

interface GiftCheckoutModalProps {
  gift: GiftExperience | null;
  onOpenChange: (open: boolean) => void;
  onSubmitGift: (draft: GiftCheckoutDraft) => GiftCheckoutResult;
  paymentMethods: PaymentMethod[];
  profile: UserProfile;
}

export function GiftCheckoutModal({
  gift,
  onOpenChange,
  onSubmitGift,
  paymentMethods,
  profile,
}: GiftCheckoutModalProps) {
  const defaultPaymentMethod =
    paymentMethods.find((paymentMethod) => paymentMethod.isDefault) ||
    paymentMethods[0];
  const [draft, setDraft] = useState<GiftCheckoutDraft>(() =>
    getDefaultGiftCheckoutDraft(
      gift?.id || "",
      profile.name,
      profile.email,
      defaultPaymentMethod?.id || "",
    ),
  );
  const [validationMessage, setValidationMessage] = useState("");
  const minDeliveryDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);

    return date.toISOString().slice(0, 10);
  }, []);

  const updateDraft = (field: keyof GiftCheckoutDraft, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setValidationMessage("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = onSubmitGift(draft);

    if (result.error) {
      setValidationMessage(result.error);
      return;
    }

    onOpenChange(false);
  };

  return (
    <Modal
      description="Add recipient details, delivery timing, and payment."
      footer={
        gift ? (
          <Button className="w-full" form="gift-checkout-form" type="submit">
            Send {formatMoney(gift.priceCents)} gift
          </Button>
        ) : null
      }
      onOpenChange={onOpenChange}
      open={Boolean(gift)}
      title={gift?.title || "Gift checkout"}
    >
      {gift ? (
        <form
          className="space-y-5"
          id="gift-checkout-form"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-[6rem_1fr] gap-4 rounded-card border border-sb-line bg-sb-ink/45 p-3">
            <div className="relative aspect-square overflow-hidden rounded-card bg-sb-panel-soft">
              <Image
                alt={gift.image.alt || gift.title}
                className="object-cover"
                fill
                sizes="6rem"
                src={gift.image.publicUrl}
              />
            </div>
            <div>
              <StatusBadge tone="premium">{gift.category}</StatusBadge>
              <p className="mt-3 text-sm leading-6 text-sb-muted">
                {gift.description}
              </p>
              <p className="mt-2 font-mono text-sm text-sb-gold-soft">
                {formatMoney(gift.priceCents)}
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              id="gift-recipient-name"
              label="Recipient name"
              onChange={(event) =>
                updateDraft("recipientName", event.target.value)
              }
              placeholder="Aiko Tanaka"
              value={draft.recipientName}
            />
            <Input
              id="gift-recipient-email"
              label="Recipient email"
              onChange={(event) =>
                updateDraft("recipientEmail", event.target.value)
              }
              placeholder="recipient@example.com"
              type="email"
              value={draft.recipientEmail}
            />
            <Input
              id="gift-sender-name"
              label="Sender name"
              onChange={(event) =>
                updateDraft("senderName", event.target.value)
              }
              value={draft.senderName}
            />
            <Input
              id="gift-sender-email"
              label="Sender email"
              onChange={(event) =>
                updateDraft("senderEmail", event.target.value)
              }
              type="email"
              value={draft.senderEmail}
            />
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-semibold text-sb-rice"
              htmlFor="gift-message"
            >
              Gift message
            </label>
            <textarea
              className="min-h-28 w-full rounded-card border border-sb-line bg-sb-ink/70 px-4 py-3 text-sm text-sb-rice outline-none transition placeholder:text-sb-dim focus:border-sb-gold/70 focus:ring-2 focus:ring-sb-gold/25"
              id="gift-message"
              onChange={(event) => updateDraft("message", event.target.value)}
              placeholder="Write a short occasion note."
              value={draft.message}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-sb-rice">
                Delivery timing
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  aria-pressed={draft.deliveryTiming === "send-now"}
                  onClick={() => updateDraft("deliveryTiming", "send-now")}
                  variant={
                    draft.deliveryTiming === "send-now" ? "secondary" : "ghost"
                  }
                >
                  Send now
                </Button>
                <Button
                  aria-pressed={draft.deliveryTiming === "scheduled"}
                  onClick={() => updateDraft("deliveryTiming", "scheduled")}
                  variant={
                    draft.deliveryTiming === "scheduled" ? "secondary" : "ghost"
                  }
                >
                  Schedule
                </Button>
              </div>
            </div>
            <Input
              disabled={draft.deliveryTiming !== "scheduled"}
              id="gift-delivery-date"
              label="Delivery date"
              min={minDeliveryDate}
              onChange={(event) =>
                updateDraft("deliveryDate", event.target.value)
              }
              type="date"
              value={draft.deliveryDate}
            />
            <Select
              disabled={draft.deliveryTiming !== "scheduled"}
              id="gift-delivery-time"
              label="Send time"
              onChange={(event) =>
                updateDraft("deliveryTime", event.target.value)
              }
              options={GIFT_DELIVERY_TIME_OPTIONS.map((option) => ({
                label: option.label,
                value: option.value,
              }))}
              value={draft.deliveryTime}
            />
          </div>

          <Select
            id="gift-payment-method"
            label="Payment method"
            onChange={(event) =>
              updateDraft("paymentMethodId", event.target.value)
            }
            options={paymentMethods.map((paymentMethod) => ({
              label: `${paymentMethod.brand} ending ${paymentMethod.last4}`,
              value: paymentMethod.id,
            }))}
            value={draft.paymentMethodId}
          />

          {validationMessage ? (
            <p className="rounded-card border border-sb-red/30 bg-sb-red/10 p-3 text-sm font-semibold text-sb-red">
              {validationMessage}
            </p>
          ) : null}
        </form>
      ) : null}
    </Modal>
  );
}
