"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

import { AssetIcon } from "@/components/icons/AssetIcon";
import { ChevronIcon } from "@/components/icons/ChevronIcon";
import { Button } from "@/components/ui/Button";
import { icons } from "@/features/home/visualHomeData";
import { TabletMenuBottomNav } from "@/features/menu/TabletMenuChrome";
import { useScrollLock } from "@/hooks/useScrollLock";
import { getTabletPresentationImage } from "@/lib/assets";
import { formatDateTime } from "@/lib/dates";
import type { Order } from "@/types/order";

import { TabletOrderConfirmationBenefits } from "./TabletOrderConfirmationBenefits";
import { TabletOrderConfirmationDetails } from "./TabletOrderConfirmationDetails";
import { TabletOrderConfirmationHeader } from "./TabletOrderConfirmationHeader";
import { TabletOrderConfirmationHero } from "./TabletOrderConfirmationHero";
import { TabletOrderConfirmationInfoCard } from "./TabletOrderConfirmationInfoCard";
import { getTabletOrderDestinationLines } from "./TabletOrderConfirmationUtils";
import { TabletOrderSummaryPanel } from "./TabletOrderSummaryPanel";

interface TabletOrderConfirmationProps {
  onClose: () => void;
  order: Order | null;
  pointsAwarded: number;
}

/** Tablet order confirmation view matching the reference while using real order data. */
export function TabletOrderConfirmation({
  onClose,
  order,
  pointsAwarded,
}: TabletOrderConfirmationProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [headerQuery, setHeaderQuery] = useState("");

  useScrollLock(Boolean(order));

  useEffect(() => {
    if (!order) {
      return;
    }

    const previouslyFocused = document.activeElement;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [onClose, order]);

  if (!order) {
    return null;
  }

  const primaryItem = order.items[0]?.menuItem;
  const heroImage = primaryItem
    ? getTabletPresentationImage(primaryItem)
    : "/assets/menu/sushi/deluxe-toro-caviar-nigiri.webp";
  const fulfillmentLabel = order.mode === "delivery" ? "Delivery" : "Pickup";
  const fulfillmentTimeLabel =
    order.mode === "delivery" ? "30 - 40 min" : "20 - 30 min";
  const destinationLines = getTabletOrderDestinationLines(order);
  const createdAtLabel = formatDateTime(order.createdAt);
  const awardedPoints =
    pointsAwarded > 0
      ? pointsAwarded
      : Math.max(1, Math.floor(order.totals.totalCents / 100));

  const handleSubmitQuery = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!headerQuery.trim()) {
      return;
    }

    onClose();
    window.location.assign("/menu");
  };

  return (
    <div
      aria-labelledby="tablet-order-confirmation-title"
      aria-modal="true"
      className="fixed inset-0 z-50 hidden h-dvh min-h-dvh flex-col overflow-hidden bg-[#050607] px-[26px] pb-4 pt-3 text-white md:flex xl:hidden"
      ref={dialogRef}
      role="dialog"
      tabIndex={-1}
    >
      <TabletOrderConfirmationHeader
        cartCount={0}
        query={headerQuery}
        onClose={onClose}
        onQueryChange={setHeaderQuery}
        onSubmitQuery={handleSubmitQuery}
      />

      <main className="mx-auto min-h-0 w-full max-w-[1034px] flex-1 overflow-y-auto overflow-x-hidden min-[1080px]:overflow-hidden">
        <section className="mt-3 grid gap-3 pb-3 min-[1080px]:h-[calc(100%-12px)] min-[1080px]:grid-rows-[460px_154px_minmax(0,1fr)_58px_70px] min-[1080px]:gap-4 min-[1080px]:pb-0">
          <TabletOrderConfirmationHero
            confirmationCode={order.confirmationCode}
            createdAtLabel={createdAtLabel}
            heroImage={heroImage}
            primaryItem={primaryItem}
          />

          <div className="grid grid-cols-2 gap-4 min-[1080px]:min-h-0">
            <TabletOrderConfirmationInfoCard
              icon={icons.clock}
              label={`Estimated ${fulfillmentLabel}`}
              title={fulfillmentTimeLabel}
              titleClassName="text-[var(--sb-red-bright)]"
              value={
                order.mode === "delivery"
                  ? "You will receive a notification when your order is on the way."
                  : "We will notify you when your order is ready at the counter."
              }
            />
            <TabletOrderConfirmationInfoCard
              actionHref="/loyalty"
              actionLabel="View rewards"
              icon={icons.star}
              label="Loyalty points earned"
              title={`+${awardedPoints} points`}
              titleClassName="text-[var(--sb-red-bright)]"
              value={`You will earn ${awardedPoints} points with this order.`}
              onAction={onClose}
            />
          </div>

          <div className="grid min-h-0 gap-4 min-[1080px]:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
            <TabletOrderSummaryPanel order={order} />
            <TabletOrderConfirmationDetails
              destinationLines={destinationLines}
              order={order}
              onClose={onClose}
            />
          </div>

          <div className="grid h-[56px] grid-cols-2 gap-4 min-[1080px]:h-auto">
            <Button
              className="red-glow-button h-full rounded-[12px] text-[15px] uppercase tracking-[0.08em]"
              href="/orders"
              onClick={onClose}
            >
              Track order
              <ChevronIcon direction="right" size={18} />
            </Button>
            <Button
              className="h-full rounded-[12px] border-[var(--sb-gold)]/46 text-[15px] uppercase tracking-[0.08em]"
              href="/menu"
              onClick={onClose}
              variant="secondary"
            >
              <AssetIcon size={21} src={icons.bag} />
              Back to menu
            </Button>
          </div>

          <TabletOrderConfirmationBenefits />
        </section>
      </main>

      <TabletMenuBottomNav activeIndex={0} />
    </div>
  );
}
