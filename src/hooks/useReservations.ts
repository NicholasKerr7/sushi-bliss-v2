"use client";

import { useCallback, useState } from "react";

import type { Reservation } from "@/types/reservation";

export function useReservations(initialReservations: Reservation[] = []) {
  const [reservations, setReservations] =
    useState<Reservation[]>(initialReservations);

  const saveReservation = useCallback((reservation: Reservation) => {
    setReservations((current) => {
      const exists = current.some((item) => item.id === reservation.id);

      if (!exists) {
        return [reservation, ...current];
      }

      return current.map((item) =>
        item.id === reservation.id ? reservation : item,
      );
    });
  }, []);

  const cancelReservation = useCallback((id: string) => {
    setReservations((current) =>
      current.map((reservation) =>
        reservation.id === id
          ? { ...reservation, status: "cancelled" }
          : reservation,
      ),
    );
  }, []);

  return {
    cancelReservation,
    reservations,
    saveReservation,
  };
}
