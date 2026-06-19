"use client";

import { useState } from "react";

import { CartDrawer } from "@/features/cart/CartDrawer";
import type {
  Reservation,
  ReservationDraft,
  ReservationValidationState,
} from "@/types/reservation";

import { MobileReservationDateTimeView } from "./MobileReservationDateTimeView";
import { MobileReservationExperienceView } from "./MobileReservationExperienceView";
import { MobileReservationReviewView } from "./MobileReservationReviewView";
import {
  MobileReservationCancelView,
  MobileReservationConfirmationView,
  MobileReservationDetailView,
} from "./MobileReservationStatusViews";
import { MobileReservationsMainView } from "./MobileReservationsMainView";

type ReservationView = "upcoming" | "past";
type MobileReservationSurface =
  | "cancel"
  | "confirmation"
  | "date-time"
  | "detail"
  | "experience"
  | "main"
  | "review";

interface MobileReservationsDashboardProps {
  cartCount: number;
  cartOpen: boolean;
  confirmedReservation: Reservation | null;
  currentTime: number;
  draft: ReservationDraft;
  editingReservation: Reservation | null;
  initialBookingOpen?: boolean;
  onCancelReservation: (reservationId: string) => void;
  onCartOpenChange: (open: boolean) => void;
  onConfirmedReservationChange: (reservation: Reservation | null) => void;
  onDraftChange: <TField extends keyof ReservationDraft>(
    field: TField,
    value: ReservationDraft[TField],
  ) => void;
  onModifyReservation: (reservation: Reservation) => void;
  onOpenCart: () => void;
  onResetForm: () => void;
  onReview: () => boolean;
  onSubmit: () => boolean;
  onViewChange: (view: ReservationView) => void;
  pastReservations: Reservation[];
  upcomingReservations: Reservation[];
  unreadNotificationCount: number;
  validation: ReservationValidationState;
  view: ReservationView;
}

/** Coordinates mobile reservations without duplicating reservation state logic. */
export function MobileReservationsDashboard({
  cartCount,
  cartOpen,
  confirmedReservation,
  currentTime,
  draft,
  editingReservation,
  initialBookingOpen = false,
  onCancelReservation,
  onCartOpenChange,
  onConfirmedReservationChange,
  onDraftChange,
  onModifyReservation,
  onOpenCart,
  onResetForm,
  onReview,
  onSubmit,
  onViewChange,
  pastReservations,
  upcomingReservations,
  unreadNotificationCount,
  validation,
  view,
}: MobileReservationsDashboardProps) {
  const [surface, setSurface] = useState<MobileReservationSurface>(
    initialBookingOpen ? "date-time" : "main",
  );
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  const openBooking = () => {
    setSelectedReservation(null);
    onConfirmedReservationChange(null);
    onResetForm();
    setSurface("date-time");
  };

  const openExperience = () => {
    setSurface("experience");
  };

  const openReview = () => {
    if (onReview()) {
      setSurface("review");
    }
  };

  const confirmReservation = () => {
    if (onSubmit()) {
      setSelectedReservation(null);
      setSurface("confirmation");
    }
  };

  const closeConfirmation = () => {
    onConfirmedReservationChange(null);
    onResetForm();
    onViewChange("upcoming");
    setSurface("main");
  };

  const viewReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setSurface("detail");
  };

  const modifyReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    onModifyReservation(reservation);
    setSurface("date-time");
  };

  const requestCancel = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setSurface("cancel");
  };

  const confirmCancel = () => {
    if (!selectedReservation) {
      return;
    }

    const cancelledReservation: Reservation = {
      ...selectedReservation,
      status: "cancelled",
    };

    onCancelReservation(selectedReservation.id);
    setSelectedReservation(cancelledReservation);
    onViewChange("past");
    setSurface("detail");
  };

  const closeToMain = () => {
    setSelectedReservation(null);
    onConfirmedReservationChange(null);
    setSurface("main");
  };

  const canManageSelectedReservation = selectedReservation
    ? selectedReservation.status !== "cancelled" &&
      new Date(selectedReservation.startsAt).getTime() >= currentTime
    : false;

  return (
    <section
      className="relative min-h-dvh overflow-hidden bg-black px-5 pb-[124px] pt-5 text-white md:hidden"
      id="reservations"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/assets/textures/red-moon-sakura-background.webp')] bg-cover bg-left-top opacity-54"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_92%_16%,rgba(215,168,79,0.12),transparent_24%),radial-gradient(circle_at_0%_66%,rgba(188,20,18,0.20),transparent_28%),linear-gradient(180deg,rgba(0,0,0,0.44)_0%,#050505_40%,#030303_100%)]"
      />

      {surface === "date-time" ? (
        <MobileReservationDateTimeView
          cartCount={cartCount}
          draft={draft}
          editing={Boolean(editingReservation)}
          onBack={closeToMain}
          onContinue={openExperience}
          onDraftChange={onDraftChange}
          onOpenCart={onOpenCart}
          unreadNotificationCount={unreadNotificationCount}
          validation={validation}
        />
      ) : surface === "experience" ? (
        <MobileReservationExperienceView
          cartCount={cartCount}
          draft={draft}
          editingReservation={editingReservation}
          onBack={() => setSurface("date-time")}
          onContinue={openReview}
          onDraftChange={onDraftChange}
          onOpenCart={onOpenCart}
          unreadNotificationCount={unreadNotificationCount}
          validation={validation}
        />
      ) : surface === "review" ? (
        <MobileReservationReviewView
          cartCount={cartCount}
          draft={draft}
          onBack={() => setSurface("experience")}
          onConfirm={confirmReservation}
          onEditDetails={() => setSurface("date-time")}
          onOpenCart={onOpenCart}
          unreadNotificationCount={unreadNotificationCount}
        />
      ) : surface === "confirmation" && confirmedReservation ? (
        <MobileReservationConfirmationView
          cartCount={cartCount}
          onBackHome={closeConfirmation}
          onOpenCart={onOpenCart}
          onViewReservations={closeConfirmation}
          reservation={confirmedReservation}
          unreadNotificationCount={unreadNotificationCount}
        />
      ) : surface === "detail" && selectedReservation ? (
        <MobileReservationDetailView
          canManage={canManageSelectedReservation}
          cartCount={cartCount}
          onBack={closeToMain}
          onModifyReservation={modifyReservation}
          onOpenCart={onOpenCart}
          onRequestCancel={requestCancel}
          reservation={selectedReservation}
          unreadNotificationCount={unreadNotificationCount}
        />
      ) : surface === "cancel" && selectedReservation ? (
        <MobileReservationCancelView
          cartCount={cartCount}
          onConfirmCancel={confirmCancel}
          onKeepReservation={() => setSurface("detail")}
          onOpenCart={onOpenCart}
          reservation={selectedReservation}
          unreadNotificationCount={unreadNotificationCount}
        />
      ) : (
        <MobileReservationsMainView
          cartCount={cartCount}
          currentTime={currentTime}
          onModifyReservation={modifyReservation}
          onOpenBooking={openBooking}
          onOpenCart={onOpenCart}
          onRequestCancel={requestCancel}
          onViewChange={onViewChange}
          onViewReservation={viewReservation}
          pastReservations={pastReservations}
          upcomingReservations={upcomingReservations}
          unreadNotificationCount={unreadNotificationCount}
          view={view}
        />
      )}

      <CartDrawer onOpenChange={onCartOpenChange} open={cartOpen} />
    </section>
  );
}
