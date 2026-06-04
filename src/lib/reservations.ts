import { reservationExperiences } from "@/data/reservations";
import { isFutureDate } from "@/lib/dates";
import { requireNonEmpty } from "@/lib/validation";
import type {
  Reservation,
  ReservationDraft,
  ReservationValidationState,
} from "@/types/reservation";

const RESERVATION_TIMES = [
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
];

export function getReservationTimeOptions(date: string) {
  return RESERVATION_TIMES.map((time) => {
    const startsAt = createReservationDateTime(date, time);

    return {
      disabled: startsAt ? !isFutureDate(startsAt) : true,
      label: formatReservationTimeLabel(time),
      value: time,
    };
  });
}

export function createReservationDateTime(
  date: string,
  time: string,
): Date | null {
  if (!date || !time) {
    return null;
  }

  const startsAt = new Date(`${date}T${time}:00`);

  return Number.isNaN(startsAt.getTime()) ? null : startsAt;
}

function formatReservationTimeLabel(time: string): string {
  const [hoursValue, minutes] = time.split(":");
  const hours = Number(hoursValue);
  const suffix = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;

  return `${hour12}:${minutes} ${suffix}`;
}

/** Validates reservation drafts before creating or modifying a booking. */
export function validateReservationDraft(
  draft: ReservationDraft,
): ReservationValidationState {
  const validation: ReservationValidationState = {};
  const guestName = requireNonEmpty(draft.guestName, "Guest name");
  const guestPhone = requireNonEmpty(draft.guestPhone, "Guest phone");

  if (!draft.experienceId) {
    validation.experience = "Choose an experience.";
  }

  if (!draft.locationId) {
    validation.location = "Choose a location.";
  }

  if (!draft.date) {
    validation.date = "Choose a date.";
  }

  if (!draft.time) {
    validation.time = "Choose a time.";
  }

  const startsAt = createReservationDateTime(draft.date, draft.time);

  if (startsAt && !isFutureDate(startsAt)) {
    validation.date = "Choose a future date and time.";
  }

  if (!guestName.valid || !guestPhone.valid) {
    validation.guest = guestName.message || guestPhone.message;
  }

  return validation;
}

export function createReservationConfirmationCode(date = new Date()): string {
  const datePart = date.toISOString().slice(2, 10).replaceAll("-", "");
  const randomPart = Math.random().toString(36).slice(2, 6).toUpperCase();

  return `RSV-${datePart}-${randomPart}`;
}

/** Builds a reservation record from a validated draft. */
export function createReservationFromDraft(
  draft: ReservationDraft,
  existingReservation?: Reservation,
): Reservation {
  const startsAt = createReservationDateTime(draft.date, draft.time);

  if (!startsAt) {
    throw new Error("Reservation date and time are required.");
  }

  return {
    confirmationCode:
      existingReservation?.confirmationCode ||
      createReservationConfirmationCode(),
    experienceId: draft.experienceId,
    guestName: draft.guestName.trim(),
    guestPhone: draft.guestPhone.trim(),
    id: existingReservation?.id || `reservation-${Date.now()}`,
    locationId: draft.locationId,
    notes: draft.notes.trim() || undefined,
    occasion: draft.occasion,
    partySize: draft.partySize,
    seatingPreference: draft.seatingPreference,
    startsAt: startsAt.toISOString(),
    status: existingReservation ? "modified" : "confirmed",
  };
}

export function reservationToDraft(reservation: Reservation): ReservationDraft {
  const startsAt = new Date(reservation.startsAt);
  const date = startsAt.toISOString().slice(0, 10);
  const time = startsAt.toTimeString().slice(0, 5);

  return {
    date,
    experienceId:
      reservation.experienceId || reservationExperiences[0]?.id || "",
    guestName: reservation.guestName,
    guestPhone: reservation.guestPhone,
    locationId: reservation.locationId,
    notes: reservation.notes || "",
    occasion: reservation.occasion || "No occasion",
    partySize: reservation.partySize,
    seatingPreference: reservation.seatingPreference || "Dining table",
    time,
  };
}

export function getReservationSortTime(reservation: Reservation): number {
  return new Date(reservation.startsAt).getTime();
}

export function hasReservationValidationErrors(
  validation: ReservationValidationState,
): boolean {
  return Object.values(validation).some(Boolean);
}
