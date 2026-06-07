"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import { QuantityControl } from "@/components/ui/QuantityControl";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { useResponsiveMode } from "@/hooks/useResponsiveMode";
import {
  calculateCartLineUnitPrice,
  createCustomizationSelection,
  getAvailableAddOns,
  getAvailableSidePairings,
  getDefaultCustomizations,
} from "@/lib/cart";
import { formatMoney } from "@/lib/money";
import type { MenuItem } from "@/types/menu";

import { ItemAddOnSelector } from "./ItemAddOnSelector";
import { ItemCustomizationControls } from "./ItemCustomizationControls";
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
  const availableAddOns = useMemo(() => getAvailableAddOns(item), [item]);
  const availableSidePairings = useMemo(() => getAvailableSidePairings(), []);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [customizations, setCustomizations] = useState(
    getDefaultCustomizations,
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
    addItem({
      addOns: selectedAddOns,
      customizations,
      menuItem: item,
      notes,
      quantity,
    });
    onAdded();
  };

  const handleAddRelatedItem = (relatedItem: MenuItem) => {
    addItem({
      addOns: [],
      customizations: getDefaultCustomizations(),
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

  if (mode === "tablet") {
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

  return (
    <Drawer
      className="md:max-w-2xl"
      description={`${item.categoryLabel} · ${formatMoney(item.priceCents)}`}
      labelledById={`item-detail-${item.id}`}
      onOpenChange={onOpenChange}
      open={open}
      side="right"
      title={item.name}
      footer={
        <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase text-sb-dim">
              Current item total
            </p>
            <p className="font-mono text-xl font-semibold text-sb-gold-soft">
              {formatMoney(totalCents)}
            </p>
          </div>
          <Button onClick={handleAddToCart}>Add {quantity} to cart</Button>
        </div>
      }
    >
      <div className="space-y-6">
        <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-sb-panel-soft">
          <Image
            alt={item.image.alt || item.name}
            className="object-cover"
            fill
            sizes="(min-width: 768px) 42rem, 100vw"
            src={item.image.publicUrl}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <StatusBadge
              tone={item.tags.includes("premium") ? "premium" : "neutral"}
            >
              {item.categoryLabel}
            </StatusBadge>
            <p className="mt-3 text-sm leading-6 text-sb-muted">
              {item.description}
            </p>
            <p className="mt-3 text-sm leading-6 text-sb-rice">
              {item.chefNote}
            </p>
          </div>
          <QuantityControl
            max={12}
            min={1}
            onChange={setQuantity}
            value={quantity}
          />
        </div>

        <section>
          <h3 className="text-sm font-semibold text-sb-rice">Ingredients</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {item.ingredients.map((ingredient) => (
              <span
                className="rounded-control border border-sb-line bg-sb-rice/5 px-3 py-1 text-xs font-medium text-sb-muted"
                key={ingredient}
              >
                {ingredient}
              </span>
            ))}
          </div>
        </section>

        {item.sakePairing ? (
          <section className="rounded-card border border-sb-gold/30 bg-sb-gold/10 p-4">
            <h3 className="text-sm font-semibold text-sb-gold-soft">
              Sake pairing
            </h3>
            <p className="mt-2 text-sm leading-6 text-sb-muted">
              {item.sakePairing.sakeName} is recommended with {item.name}.
            </p>
          </section>
        ) : null}

        <ItemCustomizationControls
          customizations={customizations}
          itemId={item.id}
          onCustomizationChange={handleCustomizationChange}
        />

        <ItemAddOnSelector
          addOns={availableAddOns}
          onAddOnToggle={handleAddOnToggle}
          selectedAddOnIds={selectedAddOnIds}
        />

        <section>
          <label
            className="block text-sm font-semibold text-sb-rice"
            htmlFor={`item-notes-${item.id}`}
          >
            Notes
          </label>
          <textarea
            className="mt-2 min-h-24 w-full resize-y rounded-card border border-sb-line bg-sb-ink/70 px-4 py-3 text-sm text-sb-rice outline-none transition placeholder:text-sb-dim focus:border-sb-gold/70 focus:ring-2 focus:ring-sb-gold/25"
            id={`item-notes-${item.id}`}
            maxLength={180}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Allergy notes or plating preference"
            value={notes}
          />
        </section>
      </div>
    </Drawer>
  );
}
