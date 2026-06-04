import type { ID } from "@/types/common";

export type ReservationStatus = "confirmed" | "modified" | "cancelled";

export interface Reservation {
  id: ID;
  confirmationCode: string;
  locationId: ID;
  experienceId: ID;
  partySize: number;
  startsAt: string;
  occasion?: string;
  seatingPreference?: string;
  guestName: string;
  guestPhone: string;
  notes?: string;
  status: ReservationStatus;
}

export interface ReservationExperience {
  id: ID;
  title: string;
  description: string;
  durationMinutes: number;
  priceLabel: string;
  imageUrl: string;
  premium?: boolean;
}

export interface ReservationDraft {
  date: string;
  experienceId: ID;
  guestName: string;
  guestPhone: string;
  locationId: ID;
  notes: string;
  occasion: string;
  partySize: number;
  seatingPreference: string;
  time: string;
}

export interface ReservationValidationState {
  date?: string;
  experience?: string;
  guest?: string;
  location?: string;
  time?: string;
}
