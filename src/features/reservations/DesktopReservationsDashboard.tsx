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

import { DesktopCancelReservationModal } from "./DesktopCancelReservationModal";
import { DesktopExperienceChooser } from "./DesktopReservationExperience";
import { DesktopReservationHistory } from "./DesktopReservationHistory";
import { DesktopReservationMain } from "./DesktopReservationMain";
import { DesktopReservationModify } from "./DesktopReservationModify";
import { DesktopReservationReview } from "./DesktopReservationReview";

type DesktopReservationSurface =
  | "experience"
  | "history"
  | "main"
  | "modify"
  | "review";
type ReservationView = "upcoming" | "past";

interface DesktopReservationsDashboardProps {
  cartCount: number;
  draft: ReservationDraft;
  editingReservation: Reservation | null;
  initialBookingOpen?: boolean;
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
  initialBookingOpen = false,
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
  const [surface, setSurface] = useState<DesktopReservationSurface>(
    initialBookingOpen ? "experience" : "main",
  );
  const [cancelTarget, setCancelTarget] = useState<Reservation | null>(null);
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

  const confirmCancelReservation = (reservation: Reservation) => {
    onCancelReservation(reservation.id);
    setCancelTarget(null);
    onViewChange("past");
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
          onBack={() =>
            setSurface(editingReservation ? "modify" : "experience")
          }
          onConfirm={confirmReservation}
        />
      ) : surface === "history" ? (
        <DesktopReservationHistory
          onBack={() => setSurface("main")}
          onCancelReservation={setCancelTarget}
          onModifyReservation={(reservation) => {
            onModifyReservation(reservation);
            setSurface("modify");
          }}
          pastReservations={pastReservations}
          upcomingReservations={upcomingReservations}
        />
      ) : surface === "modify" ? (
        <DesktopReservationModify
          draft={draft}
          editingReservation={editingReservation}
          selectedDateTime={selectedDateTime}
          selectedExperience={selectedExperience}
          timeOptions={timeOptions}
          validation={validation}
          onBack={openHistory}
          onDraftChange={onDraftChange}
          onOpenReview={openReview}
          onRequestCancel={setCancelTarget}
          onResetForm={() => {
            onResetForm();
            setSurface("main");
          }}
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
      <DesktopCancelReservationModal
        reservation={cancelTarget}
        onConfirm={confirmCancelReservation}
        onKeepReservation={() => setCancelTarget(null)}
      />
    </section>
  );
}
