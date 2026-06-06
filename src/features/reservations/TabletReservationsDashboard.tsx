"use client";

import { type ReactNode, useState } from "react";

import { CartDrawer } from "@/features/cart/CartDrawer";
import {
  TabletMenuBottomNav,
  TabletMenuStatusBar,
} from "@/features/menu/TabletMenuChrome";
import type {
  Reservation,
  ReservationDraft,
  ReservationValidationState,
} from "@/types/reservation";

import { TabletReservationBookingView } from "./TabletReservationBookingView";
import { TabletReservationConfirmationView } from "./TabletReservationConfirmationView";
import { TabletReservationDetailView } from "./TabletReservationDetailView";
import { TabletReservationHistoryView } from "./TabletReservationHistoryView";
import { TabletReservationReviewView } from "./TabletReservationReviewView";
import { TabletReservationsHeader } from "./TabletReservationsHeader";
import { TabletReservationsMainView } from "./TabletReservationsMainView";

type ReservationView = "upcoming" | "past";
type TabletReservationSurface =
  | "booking"
  | "confirmation"
  | "detail"
  | "history"
  | "main"
  | "review"
  | "upcoming";

interface TabletReservationsDashboardProps {
  cartCount: number;
  cartOpen: boolean;
  confirmedReservation: Reservation | null;
  draft: ReservationDraft;
  editingReservation: Reservation | null;
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
  validation: ReservationValidationState;
  view: ReservationView;
}

/** Coordinates the tablet reservation screens without duplicating reservation state. */
export function TabletReservationsDashboard({
  cartCount,
  cartOpen,
  confirmedReservation,
  draft,
  editingReservation,
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
  validation,
  view,
}: TabletReservationsDashboardProps) {
  const [surface, setSurface] = useState<TabletReservationSurface>("main");
  const [selectedReservation, setSelectedReservation] =
    useState<Reservation | null>(null);

  const openBooking = () => {
    setSelectedReservation(null);
    onConfirmedReservationChange(null);
    onResetForm();
    setSurface("booking");
  };

  const openHistory = (nextSurface: "history" | "upcoming") => {
    onConfirmedReservationChange(null);
    onViewChange(nextSurface === "upcoming" ? "upcoming" : "past");
    setSurface(nextSurface);
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

  const viewReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setSurface("detail");
  };

  const modifyReservation = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    onModifyReservation(reservation);
    setSurface("booking");
  };

  const cancelReservation = (reservationId: string) => {
    onCancelReservation(reservationId);
    setSelectedReservation((current) =>
      current?.id === reservationId
        ? { ...current, status: "cancelled" }
        : current,
    );
  };

  const closeConfirmation = () => {
    onConfirmedReservationChange(null);
    onResetForm();
    setSurface("main");
  };

  let content: ReactNode;

  if (surface === "booking") {
    content = (
      <TabletReservationBookingView
        draft={draft}
        editingReservation={editingReservation}
        onBack={() => setSurface(selectedReservation ? "detail" : "main")}
        onCancelEdit={() => {
          onResetForm();
          setSurface(selectedReservation ? "detail" : "main");
        }}
        onDraftChange={onDraftChange}
        onReview={openReview}
        validation={validation}
      />
    );
  } else if (surface === "review") {
    content = (
      <TabletReservationReviewView
        draft={draft}
        onBack={() => setSurface("booking")}
        onConfirm={confirmReservation}
      />
    );
  } else if (surface === "confirmation" && confirmedReservation) {
    content = (
      <TabletReservationConfirmationView
        onBackHome={closeConfirmation}
        onViewReservations={() => openHistory("upcoming")}
        reservation={confirmedReservation}
      />
    );
  } else if (surface === "detail" && selectedReservation) {
    content = (
      <TabletReservationDetailView
        onBack={() => openHistory(view === "upcoming" ? "upcoming" : "history")}
        onCancelReservation={cancelReservation}
        onModifyReservation={modifyReservation}
        reservation={selectedReservation}
      />
    );
  } else if (surface === "history" || surface === "upcoming") {
    content = (
      <TabletReservationHistoryView
        onBack={() => setSurface("main")}
        onCancelReservation={cancelReservation}
        onModifyReservation={modifyReservation}
        onViewReservation={viewReservation}
        pastReservations={pastReservations}
        upcomingReservations={upcomingReservations}
        view={surface === "upcoming" ? "upcoming" : "history"}
      />
    );
  } else {
    content = (
      <TabletReservationsMainView
        onCancelReservation={cancelReservation}
        onModifyReservation={modifyReservation}
        onOpenBooking={openBooking}
        onOpenHistory={() => openHistory("history")}
        onViewReservation={viewReservation}
        pastReservations={pastReservations}
        upcomingReservations={upcomingReservations}
      />
    );
  }

  return (
    <section
      className="min-h-dvh bg-[#050607] px-[26px] pb-4 pt-3 text-white"
      id="reservations"
    >
      <TabletMenuStatusBar />
      <TabletReservationsHeader cartCount={cartCount} onOpenCart={onOpenCart} />
      {content}
      <TabletMenuBottomNav activeIndex={2} />
      <CartDrawer onOpenChange={onCartOpenChange} open={cartOpen} />
    </section>
  );
}
