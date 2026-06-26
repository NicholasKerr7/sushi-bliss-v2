"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { menuItemById } from "@/data/menu";
import { useScrollLock } from "@/hooks/useScrollLock";
import type { MenuItem } from "@/types/menu";
import type { CartAddOnDefinition, CartCustomization } from "@/types/order";

import { TabletCustomizeView } from "./TabletItemCustomizeView";
import { TabletDetailView } from "./TabletItemDetailView";
import { TabletMenuBottomNav, TabletMenuHeader } from "./TabletMenuChrome";

type TabletItemView = "detail" | "customize";

interface TabletItemDetailDialogProps {
  availableAddOns: CartAddOnDefinition[];
  availableSidePairings: CartAddOnDefinition[];
  cartItemCount: number;
  customizations: CartCustomization[];
  isFavorite: boolean;
  item: MenuItem;
  notes: string;
  onAddOnToggle: (addOnId: string) => void;
  onAddRelatedItem: (item: MenuItem) => void;
  onAddToCart: () => void;
  onClose: () => void;
  onCustomizationChange: (groupId: string, optionId: string) => void;
  onNotesChange: (notes: string) => void;
  onOpenCart: () => void;
  onQuantityChange: (quantity: number) => void;
  onSearchQueryChange?: (query: string) => void;
  onToggleFavorite: () => void;
  open: boolean;
  quantity: number;
  selectedAddOnIds: string[];
  totalCents: number;
  unitPriceCents: number;
}

const relatedItemIds = [
  "chutoro-nigiri",
  "salmon-sashimi",
  "truffle-wagyu-nigiri",
] as const;

/** Tablet-only product overlay for item detail and add-on flows. */
export function TabletItemDetailDialog({
  availableAddOns,
  availableSidePairings,
  cartItemCount,
  customizations,
  isFavorite,
  item,
  notes,
  onAddOnToggle,
  onAddRelatedItem,
  onAddToCart,
  onClose,
  onCustomizationChange,
  onNotesChange,
  onOpenCart,
  onQuantityChange,
  onSearchQueryChange,
  onToggleFavorite,
  open,
  quantity,
  selectedAddOnIds,
  totalCents,
  unitPriceCents,
}: TabletItemDetailDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<TabletItemView>("detail");
  const [headerQuery, setHeaderQuery] = useState("");
  const relatedItems = useMemo(
    () =>
      relatedItemIds
        .map((id) => menuItemById.get(id))
        .filter((relatedItem): relatedItem is MenuItem =>
          Boolean(relatedItem && relatedItem.id !== item.id),
        )
        .slice(0, 3),
    [item.id],
  );

  useScrollLock(open);

  useEffect(() => {
    if (!open) {
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
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  const handleOpenCart = () => {
    onClose();
    onOpenCart();
  };

  const handleSubmitQuery = (query: string) => {
    const nextQuery = query.trim();

    if (!nextQuery) {
      return;
    }

    onSearchQueryChange?.(nextQuery);
    onClose();
  };

  return (
    <div
      aria-labelledby={`tablet-item-detail-${item.id}`}
      aria-modal="true"
      className="fixed inset-0 z-50 hidden h-dvh min-h-dvh flex-col overflow-hidden bg-[#050607] px-[26px] pb-4 pt-3 text-white md:flex xl:hidden"
      ref={dialogRef}
      role="dialog"
      tabIndex={-1}
    >
      <TabletMenuHeader
        cartCount={cartItemCount}
        query={headerQuery}
        onClearQuery={() => setHeaderQuery("")}
        onOpenCart={handleOpenCart}
        onQueryChange={setHeaderQuery}
        onSubmitQuery={handleSubmitQuery}
      />

      <main className="mx-auto min-h-0 w-full max-w-[1034px] flex-1 overflow-x-hidden overflow-y-auto">
        {view === "detail" ? (
          <TabletDetailView
            isFavorite={isFavorite}
            item={item}
            quantity={quantity}
            relatedItems={relatedItems}
            totalCents={totalCents}
            onAddRelatedItem={onAddRelatedItem}
            onAddToCart={onAddToCart}
            onClose={onClose}
            onCustomize={() => setView("customize")}
            onQuantityChange={onQuantityChange}
            onToggleFavorite={onToggleFavorite}
          />
        ) : (
          <TabletCustomizeView
            availableAddOns={availableAddOns}
            availableSidePairings={availableSidePairings}
            customizations={customizations}
            item={item}
            notes={notes}
            quantity={quantity}
            selectedAddOnIds={selectedAddOnIds}
            totalCents={totalCents}
            unitPriceCents={unitPriceCents}
            onAddOnToggle={onAddOnToggle}
            onAddToCart={onAddToCart}
            onCustomizationChange={onCustomizationChange}
            onNotesChange={onNotesChange}
            onQuantityChange={onQuantityChange}
            onViewDetail={() => setView("detail")}
          />
        )}
      </main>

      <TabletMenuBottomNav activeIndex={1} />
    </div>
  );
}
