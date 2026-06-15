"use client";

import { ChevronIcon } from "@/components/icons/ChevronIcon";
import Image from "next/image";
import { useState } from "react";

import { icons } from "@/features/home/visualHomeData";
import { classNames } from "@/lib/classNames";
import { formatFullDateTime } from "@/lib/dates";
import {
  createReservationDateTime,
  getReservationTimeOptions,
} from "@/lib/reservations";
import type {
  ReservationDraft,
  ReservationValidationState,
} from "@/types/reservation";

import {
  getReservationDraftDisplay,
  MobileReservationBackButton,
  MobileReservationIconCircle,
  MobileReservationPanel,
  MobileReservationsHeader,
  MobileReservationStepRail,
} from "./MobileReservationsPrimitives";

interface MobileReservationDateTimeViewProps {
  cartCount: number;
  draft: ReservationDraft;
  editing: boolean;
  onBack: () => void;
  onContinue: () => void;
  onDraftChange: <TField extends keyof ReservationDraft>(
    field: TField,
    value: ReservationDraft[TField],
  ) => void;
  onOpenCart: () => void;
  unreadNotificationCount: number;
  validation: ReservationValidationState;
}

/** Mobile reservation step for selecting future date, time, and party size. */
export function MobileReservationDateTimeView({
  cartCount,
  draft,
  editing,
  onBack,
  onContinue,
  onDraftChange,
  onOpenCart,
  unreadNotificationCount,
  validation,
}: MobileReservationDateTimeViewProps) {
  const [localError, setLocalError] = useState("");
  const today = new Date().toISOString().slice(0, 10);
  const display = getReservationDraftDisplay(draft);
  const timeOptions = getReservationTimeOptions(draft.date);
  const selectedDateTime = createReservationDateTime(draft.date, draft.time);

  const changePartySize = (direction: "down" | "up") => {
    const nextSize =
      direction === "up"
        ? Math.min(draft.partySize + 1, 8)
        : Math.max(draft.partySize - 1, 1);

    onDraftChange("partySize", nextSize);
  };

  const handleContinue = () => {
    if (!draft.date) {
      setLocalError("Choose a reservation date.");
      return;
    }

    if (!draft.time) {
      setLocalError("Choose an available reservation time.");
      return;
    }

    if (!selectedDateTime || selectedDateTime.getTime() <= Date.now()) {
      setLocalError("Choose a future date and time.");
      return;
    }

    setLocalError("");
    onContinue();
  };

  return (
    <div className="relative z-10 mx-auto max-w-[430px]">
      <MobileReservationsHeader
        cartCount={cartCount}
        onOpenCart={onOpenCart}
        unreadNotificationCount={unreadNotificationCount}
      />

      <div className="mt-7 grid grid-cols-[50px_1fr] items-center gap-4">
        <MobileReservationBackButton
          label="Back to reservations"
          onClick={onBack}
        />
        <p className="editorial-title text-[21px] uppercase tracking-[0.08em] text-[var(--sb-gold-soft)]">
          {editing ? "Modify Reservation" : "Reservation"}
        </p>
      </div>

      <section className="mt-8">
        <p className="editorial-title text-[22px] uppercase text-[var(--sb-gold-soft)]">
          Date & Time
        </p>
        <h1 className="editorial-title mt-3 text-[42px] leading-none tracking-[0.08em] text-white">
          Select Your Table Time
        </h1>
        <p className="mt-4 text-[17px] leading-6 text-[var(--sb-gold-soft)]">
          Select your preferred date and time.
        </p>
      </section>

      <MobileReservationStepRail activeStep={1} />

      <MobileReservationPanel className="mt-7 grid grid-cols-[64px_1fr_122px] items-center gap-4 p-4">
        <MobileReservationIconCircle icon={icons.profile} />
        <p>
          <span className="editorial-title block text-[16px] uppercase text-[var(--sb-gold-soft)]">
            Party Size
          </span>
          <span className="mt-2 block text-[23px] text-white">
            {draft.partySize} {draft.partySize === 1 ? "Guest" : "Guests"}
          </span>
        </p>
        <div className="grid h-[54px] grid-cols-3 overflow-hidden rounded-[14px] border border-[var(--sb-border)] bg-black/42">
          <button
            aria-label="Decrease party size"
            className="text-[28px] text-[var(--sb-gold-soft)] disabled:opacity-35"
            disabled={draft.partySize <= 1}
            onClick={() => changePartySize("down")}
            type="button"
          >
            -
          </button>
          <span className="grid place-items-center text-[23px] text-white">
            {draft.partySize}
          </span>
          <button
            aria-label="Increase party size"
            className="text-[28px] text-[var(--sb-gold-soft)] disabled:opacity-35"
            disabled={draft.partySize >= 8}
            onClick={() => changePartySize("up")}
            type="button"
          >
            +
          </button>
        </div>
      </MobileReservationPanel>

      <MobileReservationPanel className="mt-4 grid grid-cols-[64px_1fr] items-center gap-4 p-4">
        <MobileReservationIconCircle icon={icons.calendar} />
        <label className="min-w-0">
          <span className="editorial-title block text-[16px] uppercase text-[var(--sb-gold-soft)]">
            Date
          </span>
          <span className="mt-2 block text-[20px] leading-7 text-white">
            {display.dateLabel}
          </span>
          <input
            className="mt-3 h-11 w-full rounded-[12px] border border-[var(--sb-border)] bg-black/42 px-3 text-[15px] text-white outline-none focus-visible:border-[var(--sb-gold)]"
            min={today}
            onChange={(event) => {
              setLocalError("");
              onDraftChange("date", event.target.value);
            }}
            type="date"
            value={draft.date}
          />
        </label>
      </MobileReservationPanel>

      <section className="mt-6">
        <h2 className="editorial-title text-[18px] uppercase text-[var(--sb-gold-soft)]">
          Available Times
        </h2>
        <div className="mt-4 grid grid-cols-3 gap-3">
          {timeOptions.map((option) => {
            const selected = draft.time === option.value;

            return (
              <button
                aria-pressed={selected}
                className={classNames(
                  "min-h-[58px] rounded-[13px] border text-[15px] transition disabled:cursor-not-allowed disabled:opacity-35",
                  selected
                    ? "border-[var(--sb-red-bright)] bg-[var(--sb-red)]/68 text-white shadow-[0_0_24px_var(--sb-red-glow)]"
                    : "border-[var(--sb-border)] bg-black/42 text-white/82",
                )}
                disabled={option.disabled}
                key={option.value}
                onClick={() => {
                  setLocalError("");
                  onDraftChange("time", option.value);
                }}
                type="button"
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </section>

      <MobileReservationPanel className="mt-5 grid grid-cols-[64px_1fr] gap-4 p-4">
        <MobileReservationIconCircle icon={icons.flower} />
        <p>
          <span className="block text-[16px] text-[var(--sb-gold-soft)]">
            Special requests?
          </span>
          <span className="mt-2 block text-[15px] leading-6 text-white/58">
            You will have a chance to add requests in the next step.
          </span>
        </p>
      </MobileReservationPanel>

      <div className="pointer-events-none relative mt-8 h-[150px] overflow-hidden">
        <Image
          alt=""
          className="object-cover object-[54%_58%]"
          fill
          loading="eager"
          priority
          sizes="430px"
          src="/assets/menu/sushi/otoro-nigiri.webp"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0),#050505_95%)]" />
      </div>

      {localError || validation.date || validation.time ? (
        <p className="mt-3 rounded-[12px] border border-[var(--sb-red-bright)]/35 bg-[var(--sb-red)]/12 p-3 text-[13px] leading-5 text-[var(--sb-red-bright)]">
          {localError || validation.date || validation.time}
        </p>
      ) : null}

      <button
        className="red-glow-button mt-5 flex h-[72px] w-full items-center justify-center gap-4 rounded-[16px] text-[17px]"
        onClick={handleContinue}
        type="button"
      >
        Continue to Experience
        <ChevronIcon direction="right" size={18} />
      </button>

      <p className="mt-4 text-center text-[12px] text-white/42">
        {selectedDateTime
          ? `Selected ${formatFullDateTime(selectedDateTime)}`
          : "Future date and time required"}
      </p>
    </div>
  );
}
