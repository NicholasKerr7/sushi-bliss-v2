"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

import {
  getReservationsSnapshot,
  parseStoredReservations,
  readStoredReservations,
  subscribeToReservations,
  writeStoredReservations,
} from "@/lib/reservationStorage";
import { getReservationSortTime } from "@/lib/reservations";
import type { Reservation } from "@/types/reservation";

/** Stores and updates mock reservation records with cancellation support. */
export function useReservations(
  initialReservations: Reservation[] = [],
  currentTime = 0,
) {
  const snapshot = useSyncExternalStore(
    subscribeToReservations,
    getReservationsSnapshot,
    () => JSON.stringify(initialReservations),
  );
  const persistedReservations = useMemo(
    () => parseStoredReservations(snapshot),
    [snapshot],
  );
  const reservations =
    persistedReservations.length > 0
      ? persistedReservations
      : initialReservations;

  const saveReservation = useCallback(
    (reservation: Reservation) => {
      const current = readStoredReservations();
      const source = current.length > 0 ? current : initialReservations;
      const exists = source.some((item) => item.id === reservation.id);
      const nextReservations = exists
        ? source.map((item) =>
            item.id === reservation.id ? reservation : item,
          )
        : [reservation, ...source];

      writeStoredReservations(nextReservations);
    },
    [initialReservations],
  );

  const cancelReservation = useCallback(
    (id: string) => {
      const current = readStoredReservations();
      const source = current.length > 0 ? current : initialReservations;

      writeStoredReservations(
        source.map((reservation) =>
          reservation.id === id
            ? { ...reservation, status: "cancelled" }
            : reservation,
        ),
      );
    },
    [initialReservations],
  );

  const upcomingReservations = reservations
    .filter(
      (reservation) =>
        reservation.status !== "cancelled" &&
        getReservationSortTime(reservation) >= currentTime,
    )
    .sort((a, b) => getReservationSortTime(a) - getReservationSortTime(b));

  const pastReservations = reservations
    .filter(
      (reservation) =>
        reservation.status === "cancelled" ||
        getReservationSortTime(reservation) < currentTime,
    )
    .sort((a, b) => getReservationSortTime(b) - getReservationSortTime(a));

  return {
    cancelReservation,
    pastReservations,
    reservations,
    saveReservation,
    upcomingReservations,
  };
}
