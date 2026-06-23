"use client";

import { useMemo, useState } from "react";

import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { useResponsiveMode } from "@/hooks/useResponsiveMode";
import {
  calculateCartLineUnitPrice,
  createCustomizationSelection,
  getAvailableAddOns,
  getAvailableSidePairings,
  getDefaultCustomizationsForItem,
} from "@/lib/cart";
import type { MenuItem } from "@/types/menu";

import { MobileItemDetailDialog } from "./MobileItemDetailDialog";
import { TabletItemDetailDialog } from "./TabletItemDetailDialog";

interface ItemDetailDrawerProps {
  item: MenuItem;
  onAdded: () => void;
  onOpenChange: (open: boolean) => void;
  onOpenCart?: () => void;
  onSearchQueryChange?: (query: string) => void;
  open: boolean;
}

export function ItemDetailDrawer({
  item,
  onAdded,
  onOpenChange,
  onOpenCart,
  onSearchQueryChange,
  open,
}: ItemDetailDrawerProps) {
  const mode = useResponsiveMode();
  const { addItem, itemCount: cartItemCount } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const isDrinkItem = item.itemType === "drink";
  const availableAddOns = useMemo(() => getAvailableAddOns(item), [item]);
  const availableSidePairings = useMemo(() => getAvailableSidePairings(), []);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [customizations, setCustomizations] = useState(() =>
    getDefaultCustomizationsForItem(item),
  );
  const selectableAddOns = useMemo(
    () => [...availableAddOns, ...availableSidePairings],
    [availableAddOns, availableSidePairings],
  );
  const selectedAddOns = useMemo(
    () =>
      selectableAddOns.filter((addOn) => selectedAddOnIds.includes(addOn.id)),
    [selectableAddOns, selectedAddOnIds],
  );
  const unitPriceCents = calculateCartLineUnitPrice(item, selectedAddOns);
  const totalCents = unitPriceCents * quantity;

  const handleCustomizationChange = (groupId: string, optionId: string) => {
    const selection = createCustomizationSelection(groupId, optionId);

    if (!selection) {
      return;
    }

    setCustomizations((current) =>
      current.map((customization) =>
        customization.groupId === groupId ? selection : customization,
      ),
    );
  };

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOnIds((current) =>
      current.includes(addOnId)
        ? current.filter((id) => id !== addOnId)
        : [...current, addOnId],
    );
  };

  const handleAddToCart = () => {
    const wasAdded = addItem({
      addOns: selectedAddOns,
      customizations: isDrinkItem ? [] : customizations,
      menuItem: item,
      notes,
      quantity,
    });

    if (wasAdded) {
      onAdded();
    }
  };

  const handleAddRelatedItem = (relatedItem: MenuItem) => {
    addItem({
      addOns: [],
      customizations: getDefaultCustomizationsForItem(relatedItem),
      menuItem: relatedItem,
      quantity: 1,
    });
  };

  if (mode === "mobile") {
    return (
      <MobileItemDetailDialog
        availableAddOns={availableAddOns}
        customizations={customizations}
        isFavorite={isFavorite(item.id)}
        item={item}
        notes={notes}
        open={open}
        quantity={quantity}
        selectedAddOnIds={selectedAddOnIds}
        totalCents={totalCents}
        unitPriceCents={unitPriceCents}
        onAddOnToggle={handleAddOnToggle}
        onAddToCart={handleAddToCart}
        onClose={() => onOpenChange(false)}
        onCustomizationChange={handleCustomizationChange}
        onNotesChange={setNotes}
        onQuantityChange={setQuantity}
        onToggleFavorite={() => toggleFavorite(item.id)}
      />
    );
  }

  if (mode === "desktop") {
    return null;
  }

  return (
    <TabletItemDetailDialog
      availableAddOns={availableAddOns}
      availableSidePairings={availableSidePairings}
      cartItemCount={cartItemCount}
      customizations={customizations}
      isFavorite={isFavorite(item.id)}
      item={item}
      notes={notes}
      open={open}
      quantity={quantity}
      selectedAddOnIds={selectedAddOnIds}
      totalCents={totalCents}
      unitPriceCents={unitPriceCents}
      onAddOnToggle={handleAddOnToggle}
      onAddRelatedItem={handleAddRelatedItem}
      onAddToCart={handleAddToCart}
      onClose={() => onOpenChange(false)}
      onCustomizationChange={handleCustomizationChange}
      onNotesChange={setNotes}
      onOpenCart={() => onOpenCart?.()}
      onQuantityChange={setQuantity}
      onSearchQueryChange={onSearchQueryChange}
      onToggleFavorite={() => toggleFavorite(item.id)}
    />
  );
}
