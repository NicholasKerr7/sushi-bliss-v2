"use client";

import { useState } from "react";

import { locations } from "@/data/locations";
import { reservationExperiences } from "@/data/reservations";
import { DesktopMenuHeader } from "@/features/menu/DesktopMenuChrome";
import {
  createReservationDateTime,
  getReservationTimeOptions,
} from "@/lib/reservations";
import type {
  Reservation,
  ReservationDraft,
  ReservationValidationState,
} from "@/types/reservation";

import { DesktopExperienceChooser } from "./DesktopReservationExperience";
import { DesktopReservationHistory } from "./DesktopReservationHistory";
import { DesktopReservationMain } from "./DesktopReservationMain";
import { DesktopReservationReview } from "./DesktopReservationReview";

type DesktopReservationSurface = "experience" | "history" | "main" | "review";
type ReservationView = "upcoming" | "past";

interface DesktopReservationsDashboardProps {
  cartCount: number;
  draft: ReservationDraft;
  editingReservation: Reservation | null;
  onCancelReservation: (reservationId: string) => void;
  onDraftChange: <TField extends keyof ReservationDraft>(
    field: TField,
    value: ReservationDraft[TField],
  ) => void;
  onModifyReservation: (reservation: Reservation) => void;
  onResetForm: () => void;
  onReview: () => boolean;
  onSubmit: () => boolean;
  onViewChange: (view: ReservationView) => void;
  pastReservations: Reservation[];
  upcomingReservations: Reservation[];
  validation: ReservationValidationState;
}

export function DesktopReservationsDashboard({
  cartCount,
  draft,
  editingReservation,
  onCancelReservation,
  onDraftChange,
  onModifyReservation,
  onResetForm,
  onReview,
  onSubmit,
  onViewChange,
  pastReservations,
  upcomingReservations,
  validation,
}: DesktopReservationsDashboardProps) {
  const [surface, setSurface] = useState<DesktopReservationSurface>("main");
  const selectedExperience =
    reservationExperiences.find((item) => item.id === draft.experienceId) ||
    reservationExperiences[0];
  const selectedLocation =
    locations.find((item) => item.id === draft.locationId) || locations[0];
  const selectedDateTime = createReservationDateTime(draft.date, draft.time);
  const timeOptions = getReservationTimeOptions(draft.date);

  const openReview = () => {
    if (onReview()) {
      setSurface("review");
    }
  };

  const confirmReservation = () => {
    if (onSubmit()) {
      onViewChange("upcoming");
      setSurface("history");
    }
  };

  const openHistory = () => {
    onViewChange("upcoming");
    setSurface("history");
  };

  return (
    <section
      className="hidden min-h-dvh bg-[#040506] text-white xl:block"
      id="reservations"
    >
      <DesktopMenuHeader activeId="reservations" cartCount={cartCount} />
      {surface === "experience" ? (
        <DesktopExperienceChooser
          draft={draft}
          selectedExperienceId={draft.experienceId}
          onBack={() => setSurface("main")}
          onDraftChange={onDraftChange}
          onOpenReview={openReview}
        />
      ) : surface === "review" ? (
        <DesktopReservationReview
          draft={draft}
          experience={selectedExperience}
          location={selectedLocation}
          selectedDateTime={selectedDateTime}
          onBack={() => setSurface("experience")}
          onConfirm={confirmReservation}
        />
      ) : surface === "history" ? (
        <DesktopReservationHistory
          onBack={() => setSurface("main")}
          onCancelReservation={onCancelReservation}
          onModifyReservation={(reservation) => {
            onModifyReservation(reservation);
            setSurface("main");
          }}
          pastReservations={pastReservations}
          upcomingReservations={upcomingReservations}
        />
      ) : (
        <DesktopReservationMain
          draft={draft}
          editingReservation={editingReservation}
          selectedDateTime={selectedDateTime}
          selectedExperience={selectedExperience}
          timeOptions={timeOptions}
          validation={validation}
          onDraftChange={onDraftChange}
          onOpenExperience={() => setSurface("experience")}
          onOpenHistory={openHistory}
          onOpenReview={openReview}
          onResetForm={onResetForm}
        />
      )}
    </section>
  );
}
