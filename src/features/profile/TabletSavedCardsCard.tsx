"use client";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { icons } from "@/features/home/visualHomeData";
import type { PaymentMethod, UserProfile } from "@/types/user";

import { formatTabletExpiryDate } from "./TabletProfilePreferencesData";
import { TabletPaymentMark } from "./TabletProfilePreferencesPrimitives";

export function TabletSavedCardsCard({
  profile,
  statusMessage,
  onAddCard,
  onDeletePaymentMethod,
  onMakeDefaultPaymentMethod,
}: {
  profile: UserProfile;
  statusMessage: string;
  onAddCard: () => void;
  onDeletePaymentMethod: (id: string) => void;
  onMakeDefaultPaymentMethod: (id: string) => void;
}) {
  return (
    <article className="rounded-[14px] border border-white/10 bg-white/[0.035] p-4 min-[1080px]:p-5">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-3 text-[14px] uppercase tracking-[0.08em] text-white min-[1080px]:text-[16px]">
          <AssetIcon size={24} src={icons.cart} />
          Saved cards
        </h2>
        <button
          className="text-[12px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]"
          onClick={onAddCard}
          type="button"
        >
          + Add card
        </button>
      </div>
      <div className="mt-4 grid gap-2">
        {profile.paymentMethods.slice(0, 3).map((paymentMethod) => (
          <TabletSavedCardRow
            key={paymentMethod.id}
            paymentMethod={paymentMethod}
            onDeletePaymentMethod={onDeletePaymentMethod}
            onMakeDefaultPaymentMethod={onMakeDefaultPaymentMethod}
          />
        ))}
      </div>
      {statusMessage ? (
        <p className="mt-3 text-center text-[12px] font-semibold text-[var(--sb-gold-soft)]">
          {statusMessage}
        </p>
      ) : null}
    </article>
  );
}

function TabletSavedCardRow({
  paymentMethod,
  onDeletePaymentMethod,
  onMakeDefaultPaymentMethod,
}: {
  paymentMethod: PaymentMethod;
  onDeletePaymentMethod: (id: string) => void;
  onMakeDefaultPaymentMethod: (id: string) => void;
}) {
  return (
    <div className="grid h-[46px] grid-cols-[88px_minmax(0,1fr)_94px_54px_26px] items-center gap-2 rounded-[10px] border border-white/10 px-3 min-[1080px]:h-[56px]">
      <TabletPaymentMark paymentMethod={paymentMethod} />
      <span className="truncate text-[13px] text-white/86 min-[1080px]:text-[15px]">
        **** {paymentMethod.last4}
      </span>
      <span className="hidden truncate text-[11px] text-white/42 min-[1080px]:block">
        Expires {formatTabletExpiryDate(paymentMethod.expiresAt)}
      </span>
      {paymentMethod.isDefault ? (
        <span className="rounded-[5px] border border-[var(--sb-red-bright)] px-2 py-1 text-[9px] uppercase text-[var(--sb-red-bright)]">
          Default
        </span>
      ) : (
        <button
          className="text-[10px] uppercase text-[var(--sb-gold-soft)]"
          onClick={() => onMakeDefaultPaymentMethod(paymentMethod.id)}
          type="button"
        >
          Set
        </button>
      )}
      <button
        aria-label={`Remove ${paymentMethod.brand} ending ${paymentMethod.last4}`}
        className="grid h-8 w-8 place-items-center rounded-full text-[var(--sb-gold-soft)] transition hover:bg-white/8 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold disabled:hover:bg-transparent disabled:hover:text-[var(--sb-gold-soft)]"
        disabled={paymentMethod.isDefault}
        onClick={() => onDeletePaymentMethod(paymentMethod.id)}
        title={
          paymentMethod.isDefault
            ? "Default card cannot be removed"
            : "Remove card"
        }
        type="button"
      >
        <ChevronIcon direction="x" size={16} />
      </button>
    </div>
  );
}
