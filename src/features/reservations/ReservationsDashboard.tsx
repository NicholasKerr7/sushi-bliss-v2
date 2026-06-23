"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getMockReservations } from "@/data/reservations";
import { useCart } from "@/hooks/useCart";
import { useNotifications } from "@/hooks/useNotifications";
import { useProfile } from "@/hooks/useProfile";
import { useReservations } from "@/hooks/useReservations";
import { useResponsiveMode } from "@/hooks/useResponsiveMode";
import { classNames } from "@/lib/classNames";
import {
  createReservationDraftFromIntent,
  hasReservationIntent,
} from "@/lib/reservationIntent";
import {
  createReservationFromDraft,
  hasReservationValidationErrors,
  reservationToDraft,
  validateReservationDraft,
} from "@/lib/reservations";
import type {
  Reservation,
  ReservationDraft,
  ReservationValidationState,
} from "@/types/reservation";

import { CartDrawer } from "@/features/cart/CartDrawer";
import { DesktopReservationsDashboard } from "./DesktopReservationsDashboard";
import { MobileReservationsDashboard } from "./MobileReservationsDashboard";
import { ReservationBookingForm } from "./ReservationBookingForm";
import { ReservationCard } from "./ReservationCard";
import { ReservationConfirmation } from "./ReservationConfirmation";
import { TabletReservationsDashboard } from "./TabletReservationsDashboard";

type ReservationView = "upcoming" | "past";

export function ReservationsDashboard() {
  const { profile } = useProfile();
  const searchParams = useSearchParams();
  const reservationIntentActive = hasReservationIntent(searchParams);
  const mode = useResponsiveMode();
  const { itemCount } = useCart();
  const { unreadCount } = useNotifications();
  const mockReservations = useMemo(() => getMockReservations(), []);
  const currentTime = useMemo(() => new Date().getTime(), []);
  const {
    cancelReservation,
    pastReservations,
    saveReservation,
    upcomingReservations,
  } = useReservations(mockReservations, currentTime);
  const [view, setView] = useState<ReservationView>("upcoming");
  const [draft, setDraft] = useState<ReservationDraft>(() =>
    createReservationDraftFromIntent(profile, searchParams),
  );
  const [validation, setValidation] = useState<ReservationValidationState>({});
  const [editingReservation, setEditingReservation] =
    useState<Reservation | null>(null);
  const [confirmedReservation, setConfirmedReservation] =
    useState<Reservation | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const visibleReservations =
    view === "upcoming" ? upcomingReservations : pastReservations;

  const updateDraft = <TField extends keyof ReservationDraft>(
    field: TField,
    value: ReservationDraft[TField],
  ) => {
    setDraft((current) => {
      const nextDraft = { ...current, [field]: value };

      if (field === "date") {
        nextDraft.time = "";
      }

      return nextDraft;
    });
    setValidation((current) => ({ ...current, [field]: undefined }));
  };

  const resetForm = () => {
    setDraft(createReservationDraftFromIntent(profile, searchParams));
    setEditingReservation(null);
    setValidation({});
  };

  const handleSubmit = () => {
    const nextValidation = validateReservationDraft(draft);

    if (hasReservationValidationErrors(nextValidation)) {
      setValidation(nextValidation);
      return false;
    }

    const reservation = createReservationFromDraft(
      draft,
      editingReservation || undefined,
    );

    saveReservation(reservation);
    setConfirmedReservation(reservation);
    resetForm();
    setView("upcoming");
    return true;
  };

  const handleReview = () => {
    const nextValidation = validateReservationDraft(draft);

    if (hasReservationValidationErrors(nextValidation)) {
      setValidation(nextValidation);
      return false;
    }

    setValidation({});
    return true;
  };

  const handleModify = (reservation: Reservation) => {
    setEditingReservation(reservation);
    setDraft(reservationToDraft(reservation));
    setValidation({});
    setView("upcoming");
  };

  if (mode === "mobile") {
    return (
      <MobileReservationsDashboard
        cartCount={itemCount}
        cartOpen={cartOpen}
        confirmedReservation={confirmedReservation}
        currentTime={currentTime}
        draft={draft}
        editingReservation={editingReservation}
        initialBookingOpen={reservationIntentActive}
        onCancelReservation={cancelReservation}
        onCartOpenChange={setCartOpen}
        onConfirmedReservationChange={setConfirmedReservation}
        onDraftChange={updateDraft}
        onModifyReservation={handleModify}
        onOpenCart={() => setCartOpen(true)}
        onResetForm={resetForm}
        onReview={handleReview}
        onSubmit={handleSubmit}
        onViewChange={setView}
        pastReservations={pastReservations}
        upcomingReservations={upcomingReservations}
        unreadNotificationCount={unreadCount}
        validation={validation}
        view={view}
      />
    );
  }

  if (mode === "tablet") {
    return (
      <TabletReservationsDashboard
        cartCount={itemCount}
        cartOpen={cartOpen}
        confirmedReservation={confirmedReservation}
        draft={draft}
        editingReservation={editingReservation}
        initialBookingOpen={reservationIntentActive}
        onCancelReservation={cancelReservation}
        onCartOpenChange={setCartOpen}
        onConfirmedReservationChange={setConfirmedReservation}
        onDraftChange={updateDraft}
        onModifyReservation={handleModify}
        onOpenCart={() => setCartOpen(true)}
        onResetForm={resetForm}
        onReview={handleReview}
        onSubmit={handleSubmit}
        onViewChange={setView}
        pastReservations={pastReservations}
        upcomingReservations={upcomingReservations}
        validation={validation}
        view={view}
      />
    );
  }

  if (mode === "desktop") {
    return (
      <>
        <DesktopReservationsDashboard
          cartCount={itemCount}
          confirmedReservation={confirmedReservation}
          draft={draft}
          editingReservation={editingReservation}
          initialBookingOpen={reservationIntentActive}
          onCancelReservation={cancelReservation}
          onConfirmedReservationChange={setConfirmedReservation}
          onDraftChange={updateDraft}
          onModifyReservation={handleModify}
          onResetForm={resetForm}
          onReview={handleReview}
          onSubmit={handleSubmit}
          onViewChange={setView}
          pastReservations={pastReservations}
          upcomingReservations={upcomingReservations}
          validation={validation}
        />
        <CartDrawer onOpenChange={setCartOpen} open={cartOpen} />
      </>
    );
  }

  return (
    <section
      className="border-b border-sb-line bg-sb-charcoal py-12 md:py-16"
      id="reservations"
    >
      <PageContainer>
        <SectionHeader
          actions={
            <div
              aria-label="Reservation views"
              className="inline-grid grid-cols-2 overflow-hidden rounded-control border border-sb-line bg-sb-panel/70"
              role="group"
            >
              {(["upcoming", "past"] as const).map((item) => (
                <button
                  aria-pressed={view === item}
                  className={classNames(
                    "px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sb-gold",
                    view === item
                      ? "bg-sb-gold/15 text-sb-gold-soft"
                      : "text-sb-muted hover:bg-sb-rice/5 hover:text-sb-rice",
                  )}
                  key={item}
                  onClick={() => setView(item)}
                  type="button"
                >
                  {item === "upcoming" ? "Upcoming" : "History"}
                </button>
              ))}
            </div>
          }
          eyebrow={<Badge tone="premium">Reservations</Badge>}
          subtitle="Book omakase, counter, and dining room experiences with future-date validation and editable reservation history."
          title="Reserve Sushi Bliss"
        />

        <div className="mt-6 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
          <ReservationBookingForm
            draft={draft}
            editing={Boolean(editingReservation)}
            onCancelEdit={resetForm}
            onDraftChange={updateDraft}
            onSubmit={handleSubmit}
            validation={validation}
          />

          <div>
            <h3 className="text-xl font-semibold text-sb-rice">
              {view === "upcoming" ? "Upcoming reservations" : "History"}
            </h3>
            <div className="mt-4 space-y-3">
              {visibleReservations.length > 0 ? (
                visibleReservations.map((reservation) => (
                  <ReservationCard
                    key={reservation.id}
                    onCancel={cancelReservation}
                    onModify={handleModify}
                    reservation={reservation}
                  />
                ))
              ) : (
                <EmptyState
                  action={
                    <Button href="/reservations" variant="secondary">
                      Book a table
                    </Button>
                  }
                  message="Confirmed reservations and changes appear here."
                  title="No reservations"
                />
              )}
            </div>
          </div>
        </div>
      </PageContainer>

      <ReservationConfirmation
        onClose={() => setConfirmedReservation(null)}
        reservation={confirmedReservation}
      />
    </section>
  );
}
