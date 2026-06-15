"use client";

import { useEffect, useMemo, useState } from "react";

import { useCart } from "@/hooks/useCart";
import { useCheckout } from "@/hooks/useCheckout";
import { useLoyalty } from "@/hooks/useLoyalty";
import { useOrders } from "@/hooks/useOrders";
import {
  calculateCartLineUnitPrice,
  createCustomizationSelection,
  getAvailableAddOns,
  getAvailableSidePairings,
  getDefaultCustomizations,
} from "@/lib/cart";
import type { MenuCategory, MenuItem } from "@/types/menu";
import type { CartCustomization, Order } from "@/types/order";

import {
  DesktopCheckoutView,
  DesktopConfirmationView,
  DesktopReviewView,
} from "./DesktopCheckoutViews";
import {
  DesktopItemCustomizeView,
  DesktopItemDetailView,
} from "./DesktopItemViews";
import { DesktopMenuHeader } from "./DesktopMenuChrome";
import { DesktopMenuSurface } from "./DesktopMenuSurface";
import type { DesktopMenuView } from "./DesktopMenuTypes";
import {
  allTabletMenuItems,
  desktopOtoroRelatedItems,
  menuHeroItem,
} from "./tabletMenuData";

interface DesktopMenuExperienceProps {
  category: string;
  cartItemCount: number;
  categories: MenuCategory[];
  filteredItems: MenuItem[];
  hasActiveFilters: boolean;
  isFavorite: (itemId: string) => boolean;
  query: string;
  selectedCategoryLabel: string;
  totalItemCount: number;
  onClearFilters: () => void;
  onQueryChange: (query: string) => void;
  onSelectCategory: (categoryId: string) => void;
  onToggleFavorite: (itemId: string) => void;
}

export function DesktopMenuExperience({
  category,
  cartItemCount,
  categories,
  filteredItems,
  hasActiveFilters,
  isFavorite,
  query,
  selectedCategoryLabel,
  totalItemCount,
  onClearFilters,
  onQueryChange,
  onSelectCategory,
  onToggleFavorite,
}: DesktopMenuExperienceProps) {
  const {
    addItem,
    clearCart,
    items,
    removeItem,
    subtotalCents,
    updateQuantity,
  } = useCart();
  const checkout = useCheckout(subtotalCents, 15);
  const { addOrder } = useOrders();
  const { awardOrderPoints } = useLoyalty();
  const [view, setView] = useState<DesktopMenuView>("menu");
  const [selectedItem, setSelectedItem] = useState<MenuItem>(
    menuHeroItem || filteredItems[0],
  );
  const [quantity, setQuantity] = useState(1);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [customizations, setCustomizations] = useState<CartCustomization[]>(
    getDefaultCustomizations,
  );
  const [notes, setNotes] = useState("");
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [confirmedPoints, setConfirmedPoints] = useState(0);
  const activeCategoryItems =
    category === "all" || category === "recommended"
      ? allTabletMenuItems
      : filteredItems;
  const availableAddOns = useMemo(
    () => getAvailableAddOns(selectedItem),
    [selectedItem],
  );
  const availableSidePairings = useMemo(() => getAvailableSidePairings(), []);
  const selectableAddOns = useMemo(
    () => [...availableAddOns, ...availableSidePairings],
    [availableAddOns, availableSidePairings],
  );
  const selectedAddOns = useMemo(
    () =>
      selectableAddOns.filter((addOn) => selectedAddOnIds.includes(addOn.id)),
    [selectableAddOns, selectedAddOnIds],
  );
  const unitPriceCents = calculateCartLineUnitPrice(
    selectedItem,
    selectedAddOns,
  );
  const totalCents = unitPriceCents * quantity;
  const detailRelatedItems =
    selectedItem.id === "otoro-nigiri"
      ? desktopOtoroRelatedItems
      : activeCategoryItems
          .filter((item) => item.id !== selectedItem.id)
          .slice(0, 4);

  const categoryExists = (categoryId: string) =>
    categoryId === "recommended" ||
    categoryId === "chef-specials" ||
    categories.some((categoryItem) => categoryItem.id === categoryId);

  useEffect(() => {
    window.scrollTo({ left: 0, top: 0 });
  }, [view]);

  const openItem = (item: MenuItem, nextView: DesktopMenuView = "detail") => {
    setSelectedItem(item);
    setQuantity(1);
    setSelectedAddOnIds([]);
    setCustomizations(getDefaultCustomizations());
    setNotes("");
    setView(nextView);
  };

  const handleAddDefaultItem = (item: MenuItem, nextView?: DesktopMenuView) => {
    addItem({
      addOns: [],
      customizations: getDefaultCustomizations(),
      menuItem: item,
      quantity: 1,
    });
    if (nextView) {
      setView(nextView);
    }
  };

  const handleAddCustomizedItem = (nextView: DesktopMenuView = "menu") => {
    addItem({
      addOns: selectedAddOns,
      customizations,
      menuItem: selectedItem,
      notes,
      quantity,
    });
    setView(nextView);
  };

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

  const handleOpenCheckout = () => {
    if (items.length > 0) {
      setView("checkout");
    }
  };

  const handleOpenReview = () => {
    if (checkout.validateCheckout()) {
      setView("review");
    }
  };

  const handlePlaceOrder = () => {
    const order = checkout.createCheckoutOrder(items);

    if (!order) {
      return;
    }

    addOrder(order);
    setConfirmedPoints(awardOrderPoints(order));
    setConfirmedOrder(order);
    clearCart();
    setView("confirmation");
  };

  return (
    <div className="hidden min-h-dvh bg-[#040506] text-white xl:block">
      <DesktopMenuHeader
        activeId={
          view === "checkout" || view === "review" || view === "confirmation"
            ? "order"
            : "menu"
        }
        cartCount={cartItemCount}
      />
      {view === "checkout" ? (
        <DesktopCheckoutView
          checkout={checkout}
          items={items}
          onBackToCart={() => setView("menu")}
          onOpenReview={handleOpenReview}
          onRemoveItem={removeItem}
          onUpdateQuantity={updateQuantity}
        />
      ) : view === "review" ? (
        <DesktopReviewView
          checkout={checkout}
          items={items}
          onBackToCheckout={() => setView("checkout")}
          onPlaceOrder={handlePlaceOrder}
          onRemoveItem={removeItem}
          onUpdateQuantity={updateQuantity}
        />
      ) : view === "confirmation" ? (
        <DesktopConfirmationView
          order={confirmedOrder}
          pointsAwarded={confirmedPoints}
          onBackToMenu={() => {
            setConfirmedOrder(null);
            setConfirmedPoints(0);
            setView("menu");
          }}
        />
      ) : view === "detail" ? (
        <DesktopItemDetailView
          isFavorite={isFavorite(selectedItem.id)}
          item={selectedItem}
          quantity={quantity}
          relatedItems={detailRelatedItems}
          totalCents={selectedItem.priceCents * quantity}
          onAddRelatedItem={handleAddDefaultItem}
          onAddToCart={() => handleAddCustomizedItem("menu")}
          onBackToMenu={() => setView("menu")}
          onCustomize={() => setView("customize")}
          onQuantityChange={setQuantity}
          onToggleFavorite={() => onToggleFavorite(selectedItem.id)}
        />
      ) : view === "customize" ? (
        <DesktopItemCustomizeView
          availableAddOns={availableAddOns}
          availableSidePairings={availableSidePairings}
          customizations={customizations}
          item={selectedItem}
          notes={notes}
          quantity={quantity}
          selectedAddOnIds={selectedAddOnIds}
          totalCents={totalCents}
          unitPriceCents={unitPriceCents}
          onAddOnToggle={handleAddOnToggle}
          onAddToCart={() => handleAddCustomizedItem("menu")}
          onBackToMenu={() => setView("menu")}
          onCustomizationChange={handleCustomizationChange}
          onNotesChange={setNotes}
          onQuantityChange={setQuantity}
        />
      ) : (
        <DesktopMenuSurface
          activeCategoryItems={activeCategoryItems}
          category={category}
          categoryExists={categoryExists}
          filteredItems={filteredItems}
          hasActiveFilters={hasActiveFilters}
          query={query}
          selectedCategoryLabel={selectedCategoryLabel}
          totalItemCount={totalItemCount}
          onAddToCart={handleAddDefaultItem}
          onClearCart={clearCart}
          onClearFilters={onClearFilters}
          onOpenCheckout={handleOpenCheckout}
          onQueryChange={onQueryChange}
          onRemoveItem={removeItem}
          onSelectCategory={onSelectCategory}
          onUpdateQuantity={updateQuantity}
          onViewDetails={openItem}
        />
      )}
    </div>
  );
}
