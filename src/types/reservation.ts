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
  status: ReservationStatus;
}
