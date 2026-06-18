"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  DesktopBenefitStrip,
  DesktopMenuHeader,
} from "@/features/menu/DesktopMenuChrome";
import { useCart } from "@/hooks/useCart";
import { formatDateTime } from "@/lib/dates";
import { getDefaultGiftCheckoutDraft } from "@/lib/gifts";
import { formatMoney } from "@/lib/money";
import type {
  GiftCheckoutDraft,
  GiftCheckoutResult,
  GiftConfirmation,
  GiftExperience,
} from "@/types/gift";
import type { PaymentMethod, UserProfile } from "@/types/user";

interface DesktopGiftExperienceProps {
  giftExperiences: GiftExperience[];
  paymentMethods: PaymentMethod[];
  profile: UserProfile;
  onSubmitGift: (draft: GiftCheckoutDraft) => GiftCheckoutResult;
}

type DesktopGiftView = "selection" | "checkout" | "confirmation";

const conciergeFaq = [
  [
    "Can the recipient pick the date?",
    "Yes, every gift includes concierge scheduling.",
  ],
  [
    "Can I schedule delivery?",
    "Choose send now or a future email delivery date.",
  ],
  [
    "Can gifts be refunded?",
    "Unredeemed gifts can be exchanged for store credit.",
  ],
] as const;

function getDefaultDeliveryDate() {
  const date = new Date();
  date.setDate(date.getDate() + 10);

  return date.toISOString().slice(0, 10);
}

export function DesktopGiftExperience({
  giftExperiences,
  paymentMethods,
  profile,
  onSubmitGift,
}: DesktopGiftExperienceProps) {
  const { itemCount } = useCart();
  const defaultGift = giftExperiences[0];
  const defaultPaymentMethod =
    paymentMethods.find((method) => method.isDefault) || paymentMethods[0];
  const [view, setView] = useState<DesktopGiftView>("selection");
  const [selectedGiftId, setSelectedGiftId] = useState(defaultGift?.id || "");
  const [confirmation, setConfirmation] = useState<GiftConfirmation | null>(
    null,
  );
  const [validationMessage, setValidationMessage] = useState("");
  const [draft, setDraft] = useState<GiftCheckoutDraft>(() => ({
    ...getDefaultGiftCheckoutDraft(
      defaultGift?.id || "",
      profile.name,
      profile.email,
      defaultPaymentMethod?.id || "",
    ),
    deliveryDate: getDefaultDeliveryDate(),
    message:
      "A night of exceptional sushi, crafted with care. Enjoy every course.",
    recipientEmail: "emily.johnson@email.com",
    recipientName: "Emily Johnson",
  }));
  const selectedGift =
    giftExperiences.find((gift) => gift.id === selectedGiftId) || defaultGift;

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0 });
  }, [view]);

  const updateDraft = (field: keyof GiftCheckoutDraft, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setValidationMessage("");
  };

  const selectGift = (giftId: string) => {
    setSelectedGiftId(giftId);
    setDraft((current) => ({ ...current, giftId }));
    setValidationMessage("");
  };

  const submitGift = () => {
    const result = onSubmitGift(draft);

    if (result.error) {
      setValidationMessage(result.error);
      return;
    }

    if (result.confirmation) {
      setConfirmation(result.confirmation);
      setView("confirmation");
    }
  };

  if (!selectedGift) {
    return null;
  }

  return (
    <section
      className="hidden min-h-dvh bg-[#030405] text-white xl:block"
      id="gifts"
    >
      <DesktopMenuHeader activeId="gifts" cartCount={itemCount} />
      <main className="mx-auto max-w-[1568px] px-5 pb-3 pt-0">
        <div className="overflow-hidden rounded-b-[20px] border-x border-b border-[var(--sb-border)] bg-[#050607] shadow-[0_30px_90px_rgba(0,0,0,0.56)]">
          {view === "confirmation" && confirmation ? (
            <DesktopGiftConfirmation
              confirmation={confirmation}
              gift={selectedGift}
              onSendAnother={() => {
                setConfirmation(null);
                setView("selection");
              }}
            />
          ) : view === "checkout" ? (
            <DesktopGiftCheckout
              draft={draft}
              gift={selectedGift}
              paymentMethods={paymentMethods}
              validationMessage={validationMessage}
              onBack={() => setView("selection")}
              onPurchase={submitGift}
              onUpdateDraft={updateDraft}
            />
          ) : (
            <DesktopGiftSelection
              draft={draft}
              giftExperiences={giftExperiences}
              selectedGift={selectedGift}
              onContinue={() => setView("checkout")}
              onSelectGift={selectGift}
              onUpdateDraft={updateDraft}
            />
          )}

          <div className="px-9 pb-4">
            <DesktopBenefitStrip />
          </div>
        </div>
      </main>
    </section>
  );
}

function DesktopGiftHero({ copy, title }: { copy: string; title: string }) {
  return (
    <section className="relative min-h-[204px] border-b border-white/10 px-16 py-6">
      <Image
        alt=""
        className="object-cover object-[56%_45%] opacity-58"
        fill
        loading="eager"
        priority
        sizes="1568px"
        src="/assets/gallery/intimate-upscale-dining-room-setting.webp"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,4,5,0.98)_0%,rgba(3,4,5,0.78)_42%,rgba(3,4,5,0.34)_100%)]" />
      <div className="relative z-10 flex min-h-[152px] max-w-[720px] flex-col justify-center">
        <p className="text-[16px] uppercase tracking-[0.14em] text-[var(--sb-gold-soft)]">
          Sushi Bliss gifting
        </p>
        <h1 className="editorial-title mt-3 text-[58px] uppercase leading-[0.9] text-white">
          {title}
        </h1>
        <p className="mt-4 max-w-[560px] text-[17px] leading-7 text-white/72">
          {copy}
        </p>
      </div>
    </section>
  );
}

function DesktopGiftSelection({
  draft,
  giftExperiences,
  selectedGift,
  onContinue,
  onSelectGift,
  onUpdateDraft,
}: {
  draft: GiftCheckoutDraft;
  giftExperiences: GiftExperience[];
  selectedGift: GiftExperience;
  onContinue: () => void;
  onSelectGift: (giftId: string) => void;
  onUpdateDraft: (field: keyof GiftCheckoutDraft, value: string) => void;
}) {
  return (
    <>
      <DesktopGiftHero
        copy="Send an omakase reservation, private dining night, or hands-on class with concierge support."
        title="Gift an Experience"
      />
      <div className="grid grid-cols-[minmax(0,1fr)_372px] gap-4 px-9 py-4">
        <div className="grid gap-4">
          <section className="rounded-[18px] border border-[var(--sb-border)] bg-[#07090a]/88 p-5">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-[13px] uppercase tracking-[0.12em] text-white/42">
                  Step 1
                </p>
                <h2 className="mt-1 text-[20px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                  Choose your gift experience
                </h2>
              </div>
              <p className="max-w-[360px] text-right text-[13px] leading-6 text-white/54">
                Each gift includes recipient booking support, printable passes,
                and personalized delivery.
              </p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {giftExperiences.map((gift, index) => (
                <GiftPackageCard
                  gift={gift}
                  isSelected={gift.id === selectedGift.id}
                  key={gift.id}
                  priority={index < 3}
                  onSelectGift={onSelectGift}
                />
              ))}
            </div>
          </section>

          <section className="grid grid-cols-[minmax(0,1fr)_306px] gap-4 rounded-[18px] border border-[var(--sb-border)] bg-[#07090a]/88 p-5">
            <div>
              <p className="text-[13px] uppercase tracking-[0.12em] text-white/42">
                Step 2
              </p>
              <h2 className="mt-1 text-[20px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                Recipient details
              </h2>
              <div className="mt-4 grid gap-4 min-[1500px]:grid-cols-2">
                <Input
                  id="desktop-gift-recipient-name"
                  label="Recipient name"
                  value={draft.recipientName}
                  onChange={(event) =>
                    onUpdateDraft("recipientName", event.target.value)
                  }
                />
                <Input
                  id="desktop-gift-recipient-email"
                  label="Recipient email"
                  type="email"
                  value={draft.recipientEmail}
                  onChange={(event) =>
                    onUpdateDraft("recipientEmail", event.target.value)
                  }
                />
              </div>
              <label
                className="mt-4 block text-sm font-semibold text-sb-rice"
                htmlFor="desktop-gift-message"
              >
                Gift message
              </label>
              <textarea
                className="mt-2 min-h-[92px] w-full resize-none rounded-card border border-sb-line bg-sb-ink/70 px-4 py-3 text-sm text-sb-rice outline-none transition placeholder:text-sb-dim focus:border-sb-gold/70 focus:ring-2 focus:ring-sb-gold/25"
                id="desktop-gift-message"
                value={draft.message}
                onChange={(event) =>
                  onUpdateDraft("message", event.target.value)
                }
              />
            </div>
            <div className="rounded-[16px] border border-white/10 bg-black/28 p-4">
              <h3 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
                Delivery options
              </h3>
              <div className="mt-3 grid gap-2.5">
                {[
                  ["send-now", "Send instantly", "Email after purchase"],
                  ["scheduled", "Schedule delivery", "Pick a future date"],
                ].map(([timing, label, copy]) => (
                  <button
                    aria-pressed={draft.deliveryTiming === timing}
                    className={
                      draft.deliveryTiming === timing
                        ? "rounded-[12px] border border-[var(--sb-gold)]/42 bg-[var(--sb-gold)]/10 p-3 text-left"
                        : "rounded-[12px] border border-white/10 bg-white/[0.035] p-3 text-left"
                    }
                    key={timing}
                    onClick={() =>
                      onUpdateDraft(
                        "deliveryTiming",
                        timing as GiftCheckoutDraft["deliveryTiming"],
                      )
                    }
                    type="button"
                  >
                    <span className="block text-[14px] font-semibold text-white">
                      {label}
                    </span>
                    <span className="mt-1 block text-[12px] text-white/50">
                      {copy}
                    </span>
                  </button>
                ))}
              </div>
              <Input
                id="desktop-gift-delivery-date"
                inputClassName="mt-1"
                label="Delivery date"
                min={getDefaultDeliveryDate()}
                type="date"
                value={draft.deliveryDate}
                wrapperClassName="mt-3"
                onChange={(event) =>
                  onUpdateDraft("deliveryDate", event.target.value)
                }
              />
            </div>
          </section>
        </div>

        <GiftReviewRail
          buttonLabel="Continue to review"
          gift={selectedGift}
          onAction={onContinue}
        />
      </div>
    </>
  );
}

function GiftPackageCard({
  gift,
  isSelected,
  priority,
  onSelectGift,
}: {
  gift: GiftExperience;
  isSelected: boolean;
  priority: boolean;
  onSelectGift: (giftId: string) => void;
}) {
  return (
    <button
      aria-pressed={isSelected}
      className={
        isSelected
          ? "overflow-hidden rounded-[16px] border border-[var(--sb-gold)]/54 bg-[var(--sb-gold)]/10 text-left shadow-[0_0_24px_rgba(218,179,109,0.12)]"
          : "overflow-hidden rounded-[16px] border border-white/10 bg-black/28 text-left transition hover:border-[var(--sb-gold)]/32"
      }
      onClick={() => onSelectGift(gift.id)}
      type="button"
    >
      <div className="relative h-[136px]">
        <Image
          alt=""
          className="object-cover"
          fill
          loading={priority ? "eager" : "lazy"}
          priority={priority}
          sizes="320px"
          src={gift.image.publicUrl}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.76))]" />
        <span className="absolute bottom-3 left-4 rounded-full border border-white/18 bg-black/50 px-3 py-1 text-[11px] uppercase tracking-[0.1em] text-white/74">
          {gift.category}
        </span>
      </div>
      <div className="p-3.5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-[17px] font-semibold leading-6 text-white">
            {gift.title}
          </h3>
          <p className="font-mono text-[14px] text-[var(--sb-gold-soft)]">
            {formatMoney(gift.priceCents)}
          </p>
        </div>
        <p className="mt-2 min-h-[42px] text-[13px] leading-5 text-white/58">
          {gift.description}
        </p>
      </div>
    </button>
  );
}

function GiftReviewRail({
  buttonLabel,
  gift,
  onAction,
}: {
  buttonLabel: string;
  gift: GiftExperience;
  onAction: () => void;
}) {
  return (
    <aside className="grid content-start gap-4">
      <section className="overflow-hidden rounded-[18px] border border-[var(--sb-border)] bg-[#07090a]/88">
        <div className="relative h-[178px]">
          <Image
            alt=""
            className="object-cover"
            fill
            loading="eager"
            priority
            sizes="372px"
            src={gift.image.publicUrl}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.72))]" />
        </div>
        <div className="p-4">
          <p className="text-[12px] uppercase tracking-[0.12em] text-white/42">
            Selected package
          </p>
          <h2 className="mt-2 text-[22px] font-semibold text-white">
            {gift.title}
          </h2>
          <p className="mt-2 text-[13px] leading-6 text-white/56">
            {gift.deliveryNote}
          </p>
          <div className="mt-3 divide-y divide-white/10 rounded-[12px] border border-white/10">
            {gift.inclusions.map((item) => (
              <p className="px-4 py-2.5 text-[13px] text-white/66" key={item}>
                {item}
              </p>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-[13px] uppercase tracking-[0.1em] text-white/46">
              Total
            </span>
            <span className="font-mono text-[30px] text-white">
              {formatMoney(gift.priceCents)}
            </span>
          </div>
          <Button className="mt-4 w-full" onClick={onAction}>
            {buttonLabel}
          </Button>
        </div>
      </section>

      <section className="rounded-[18px] border border-[var(--sb-border)] bg-white/[0.035] p-4">
        <h2 className="text-[16px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
          Gift FAQ
        </h2>
        <div className="mt-3 grid gap-3">
          {conciergeFaq.map(([question, answer]) => (
            <div key={question}>
              <p className="text-[13px] font-semibold text-white/82">
                {question}
              </p>
              <p className="mt-1 text-[12px] leading-5 text-white/52">
                {answer}
              </p>
            </div>
          ))}
        </div>
        <Link
          className="mt-5 inline-flex min-h-10 items-center rounded-full px-3 text-[12px] uppercase tracking-[0.1em] text-[var(--sb-gold-soft)] transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold"
          href="/support"
        >
          View help center
        </Link>
      </section>
    </aside>
  );
}

function DesktopGiftCheckout({
  draft,
  gift,
  paymentMethods,
  validationMessage,
  onBack,
  onPurchase,
  onUpdateDraft,
}: {
  draft: GiftCheckoutDraft;
  gift: GiftExperience;
  paymentMethods: PaymentMethod[];
  validationMessage: string;
  onBack: () => void;
  onPurchase: () => void;
  onUpdateDraft: (field: keyof GiftCheckoutDraft, value: string) => void;
}) {
  return (
    <>
      <DesktopGiftHero
        copy="Review recipient, delivery, and payment details before sending your Sushi Bliss gift."
        title="Gift Checkout"
      />
      <div className="grid grid-cols-[minmax(0,1fr)_396px] gap-5 px-9 py-5">
        <div className="grid grid-cols-3 gap-4">
          <CheckoutPanel title="Selected gift">
            <div className="relative h-[158px] overflow-hidden rounded-[12px]">
              <Image
                alt=""
                className="object-cover"
                fill
                sizes="320px"
                src={gift.image.publicUrl}
              />
            </div>
            <h2 className="mt-4 text-[20px] font-semibold text-white">
              {gift.title}
            </h2>
            <p className="mt-2 text-[13px] leading-6 text-white/56">
              {gift.description}
            </p>
            <p className="mt-4 font-mono text-[28px] text-white">
              {formatMoney(gift.priceCents)}
            </p>
          </CheckoutPanel>

          <CheckoutPanel title="Recipient">
            <ReviewRow label="Name" value={draft.recipientName} />
            <ReviewRow label="Email" value={draft.recipientEmail} />
            <ReviewRow
              label="Delivery"
              value={
                draft.deliveryTiming === "scheduled"
                  ? `Scheduled ${draft.deliveryDate}`
                  : "Send instantly"
              }
            />
            <div className="mt-4 rounded-[12px] border border-white/10 bg-black/24 p-4">
              <p className="text-[12px] uppercase tracking-[0.1em] text-white/42">
                Message
              </p>
              <p className="mt-2 text-[13px] leading-6 text-white/64">
                {draft.message || "No message included."}
              </p>
            </div>
          </CheckoutPanel>

          <CheckoutPanel title="Payment">
            <div className="grid gap-3">
              {paymentMethods.map((method) => (
                <button
                  aria-pressed={draft.paymentMethodId === method.id}
                  className={
                    draft.paymentMethodId === method.id
                      ? "rounded-[12px] border border-[var(--sb-gold)]/42 bg-[var(--sb-gold)]/10 p-4 text-left"
                      : "rounded-[12px] border border-white/10 bg-black/24 p-4 text-left"
                  }
                  key={method.id}
                  onClick={() => onUpdateDraft("paymentMethodId", method.id)}
                  type="button"
                >
                  <span className="block text-[14px] font-semibold text-white">
                    {method.brand} ending {method.last4}
                  </span>
                  <span className="mt-1 block text-[12px] text-white/48">
                    Expires {method.expiresAt}
                  </span>
                </button>
              ))}
            </div>
          </CheckoutPanel>
        </div>

        <aside className="rounded-[18px] border border-[var(--sb-border)] bg-[#07090a]/88 p-6">
          <h2 className="text-[20px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            Order summary
          </h2>
          <div className="mt-5 divide-y divide-white/10 rounded-[12px] border border-white/10">
            <SummaryLine
              label={gift.title}
              value={formatMoney(gift.priceCents)}
            />
            <SummaryLine label="Digital delivery" value="Included" />
            <SummaryLine label="Concierge support" value="Included" />
          </div>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-[13px] uppercase tracking-[0.1em] text-white/46">
              Total due
            </span>
            <span className="font-mono text-[38px] text-white">
              {formatMoney(gift.priceCents)}
            </span>
          </div>
          {validationMessage ? (
            <p className="mt-4 rounded-[10px] border border-[var(--sb-red)]/36 bg-[var(--sb-red)]/10 px-4 py-3 text-[13px] text-[var(--sb-red-bright)]">
              {validationMessage}
            </p>
          ) : null}
          <Button className="mt-6 w-full" onClick={onPurchase}>
            Purchase gift
          </Button>
          <Button className="mt-3 w-full" onClick={onBack} variant="secondary">
            Back to gift details
          </Button>
          <p className="mt-5 text-[12px] leading-5 text-white/46">
            Your recipient receives concierge scheduling support and a digital
            pass after purchase.
          </p>
        </aside>
      </div>
    </>
  );
}

function CheckoutPanel({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <section className="rounded-[18px] border border-[var(--sb-border)] bg-[#07090a]/88 p-5">
      <h2 className="text-[17px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-white/10 py-4 first:pt-0 last:border-b-0">
      <p className="text-[12px] uppercase tracking-[0.1em] text-white/42">
        {label}
      </p>
      <p className="mt-1 text-[14px] text-white/76">{value}</p>
    </div>
  );
}

function SummaryLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 text-[13px]">
      <span className="text-white/58">{label}</span>
      <span className="text-white/82">{value}</span>
    </div>
  );
}

function DesktopGiftConfirmation({
  confirmation,
  gift,
  onSendAnother,
}: {
  confirmation: GiftConfirmation;
  gift: GiftExperience;
  onSendAnother: () => void;
}) {
  const copyConfirmation = async () => {
    if (!navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(confirmation.confirmationCode);
    } catch {
      return;
    }
  };

  return (
    <>
      <section className="relative min-h-[246px] border-b border-white/10 px-16 py-8">
        <Image
          alt=""
          className="object-cover object-[56%_45%] opacity-58"
          fill
          loading="eager"
          priority
          sizes="1568px"
          src={gift.image.publicUrl}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,4,5,0.98)_0%,rgba(3,4,5,0.78)_44%,rgba(3,4,5,0.42)_100%)]" />
        <div className="relative z-10 flex min-h-[182px] max-w-[790px] flex-col justify-center">
          <span className="grid h-16 w-16 place-items-center rounded-full border border-[var(--sb-gold)]/42 bg-[var(--sb-gold)]/10">
            <AssetIcon size={34} src="/assets/icons/check-icon.png" />
          </span>
          <h1 className="editorial-title mt-5 text-[58px] uppercase leading-[0.92] text-white">
            Your gift has been confirmed!
          </h1>
          <p className="mt-4 max-w-[620px] text-[17px] leading-7 text-white/72">
            We sent {gift.title} to {confirmation.recipient.name}. The
            confirmation has been saved to your local gift history.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-[minmax(0,1fr)_396px] gap-5 px-9 py-5">
        <div className="grid grid-cols-2 gap-5">
          <section className="rounded-[18px] border border-[var(--sb-border)] bg-[#07090a]/88 p-6">
            <p className="text-[12px] uppercase tracking-[0.12em] text-white/42">
              Gift order
            </p>
            <h2 className="mt-2 font-mono text-[34px] text-white">
              {confirmation.confirmationCode}
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-4">
              <ReviewRow
                label="Recipient"
                value={confirmation.recipient.name}
              />
              <ReviewRow label="Status" value={confirmation.status} />
              <ReviewRow
                label="Delivery"
                value={formatDateTime(confirmation.deliveryDate)}
              />
              <ReviewRow
                label="Payment"
                value={confirmation.paymentMethodLabel}
              />
            </div>
          </section>

          <section className="rounded-[18px] border border-[var(--sb-border)] bg-[#07090a]/88 p-6">
            <p className="text-[12px] uppercase tracking-[0.12em] text-white/42">
              Experience details
            </p>
            <div className="mt-4 grid grid-cols-[116px_1fr] gap-4">
              <div className="relative h-[116px] overflow-hidden rounded-[12px]">
                <Image
                  alt=""
                  className="object-cover"
                  fill
                  sizes="116px"
                  src={confirmation.giftImage.publicUrl}
                />
              </div>
              <div>
                <h2 className="text-[22px] font-semibold text-white">
                  {confirmation.giftTitle}
                </h2>
                <p className="mt-2 text-[13px] leading-6 text-white/56">
                  {confirmation.message || gift.deliveryNote}
                </p>
              </div>
            </div>
            <div className="mt-5 flex gap-3">
              <Button onClick={copyConfirmation} size="sm">
                Copy order number
              </Button>
              <Button href="/profile" size="sm" variant="secondary">
                View profile
              </Button>
            </div>
          </section>
        </div>

        <aside className="rounded-[18px] border border-[var(--sb-border)] bg-[#07090a]/88 p-6">
          <h2 className="text-[20px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
            Order summary
          </h2>
          <div className="mt-5 divide-y divide-white/10 rounded-[12px] border border-white/10">
            <SummaryLine
              label={confirmation.giftTitle}
              value={formatMoney(confirmation.priceCents)}
            />
            <SummaryLine label="Digital delivery" value="Included" />
            <SummaryLine
              label="Purchased"
              value={formatDateTime(confirmation.createdAt)}
            />
          </div>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-[13px] uppercase tracking-[0.1em] text-white/46">
              Total paid
            </span>
            <span className="font-mono text-[38px] text-white">
              {formatMoney(confirmation.priceCents)}
            </span>
          </div>
          <Button className="mt-6 w-full" onClick={onSendAnother}>
            Send another gift
          </Button>
          <Button className="mt-3 w-full" href="/home" variant="secondary">
            Back to home
          </Button>
        </aside>
      </div>
    </>
  );
}
