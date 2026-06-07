"use client";

import { useEffect, useRef, useState } from "react";

import type { MenuItem } from "@/types/menu";
import type { CartAddOnDefinition, CartCustomization } from "@/types/order";

import { MobileItemCustomizeView } from "./MobileItemCustomizeView";
import { MobileItemDetailView } from "./MobileItemDetailView";

type MobileItemView = "detail" | "customize";

interface MobileItemDetailDialogProps {
  availableAddOns: CartAddOnDefinition[];
  customizations: CartCustomization[];
  isFavorite: boolean;
  item: MenuItem;
  notes: string;
  onAddOnToggle: (addOnId: string) => void;
  onAddToCart: () => void;
  onClose: () => void;
  onCustomizationChange: (groupId: string, optionId: string) => void;
  onNotesChange: (notes: string) => void;
  onQuantityChange: (quantity: number) => void;
  onToggleFavorite: () => void;
  open: boolean;
  quantity: number;
  selectedAddOnIds: string[];
  totalCents: number;
  unitPriceCents: number;
}

/** Full-screen mobile item flow with detail and customization states. */
export function MobileItemDetailDialog({
  availableAddOns,
  customizations,
  isFavorite,
  item,
  notes,
  onAddOnToggle,
  onAddToCart,
  onClose,
  onCustomizationChange,
  onNotesChange,
  onQuantityChange,
  onToggleFavorite,
  open,
  quantity,
  selectedAddOnIds,
  totalCents,
  unitPriceCents,
}: MobileItemDetailDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  const [view, setView] = useState<MobileItemView>("detail");

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previouslyFocused = document.activeElement;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCloseRef.current();
      }
    };

    document.body.classList.add("overflow-hidden");
    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();

    return () => {
      document.body.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", handleKeyDown);

      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div
      aria-labelledby={`mobile-item-detail-${item.id}`}
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black text-white md:hidden"
      ref={dialogRef}
      role="dialog"
      tabIndex={-1}
    >
      {view === "detail" ? (
        <MobileItemDetailView
          isFavorite={isFavorite}
          item={item}
          quantity={quantity}
          totalCents={totalCents}
          onAddToCart={onAddToCart}
          onClose={onClose}
          onCustomize={() => setView("customize")}
          onQuantityChange={onQuantityChange}
          onToggleFavorite={onToggleFavorite}
        />
      ) : (
        <MobileItemCustomizeView
          availableAddOns={availableAddOns}
          customizations={customizations}
          item={item}
          notes={notes}
          quantity={quantity}
          selectedAddOnIds={selectedAddOnIds}
          totalCents={totalCents}
          unitPriceCents={unitPriceCents}
          onAddOnToggle={onAddOnToggle}
          onAddToCart={onAddToCart}
          onBack={() => setView("detail")}
          onCustomizationChange={onCustomizationChange}
          onNotesChange={onNotesChange}
          onQuantityChange={onQuantityChange}
        />
      )}
    </div>
  );
}
