"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";

import { useCart } from "@/hooks/useCart";
import { getDefaultCustomizations } from "@/lib/cart";
import type { MenuItem } from "@/types/menu";

import { DesktopDashboard, DesktopDashboardHeader } from "./DesktopVisualHome";
import { MobileDashboard } from "./MobileVisualHome";
import { TabletDashboard } from "./TabletVisualHome";
import { getDashboardItem } from "./visualHomeData";

/** Renders the screenshot-matched home dashboard while keeping v2 cart behavior. */
export function VisualHomeDashboard() {
  const { addItem, itemCount } = useCart();
  const [activeCategory, setActiveCategory] = useState("nigiri");
  const [query, setQuery] = useState("");

  const items = useMemo(
    () => [
      getDashboardItem("otoro-nigiri", 0),
      getDashboardItem("spicy-tuna-roll", 1),
      getDashboardItem("dragon-roll", 2),
      getDashboardItem("salmon-sashimi", 3),
    ],
    [],
  );
  const memberItem = getDashboardItem("ikura-gunkan", 0);
  const specialItem = getDashboardItem("truffle-wagyu-nigiri", 1);

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      addOns: [],
      customizations: getDefaultCustomizations(),
      menuItem: item,
      quantity: 1,
    });
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="sushi-visual stone-gradient relative overflow-hidden"
      id="home-dashboard"
    >
      <DesktopDashboardHeader cartCount={itemCount} />
      <MobileDashboard
        activeCategory={activeCategory}
        cartCount={itemCount}
        items={items}
        memberItem={memberItem}
        query={query}
        onAddToCart={handleAddToCart}
        onCategoryChange={setActiveCategory}
        onQueryChange={setQuery}
        onSearchSubmit={handleSearchSubmit}
      />
      <TabletDashboard
        cartCount={itemCount}
        items={items}
        memberItem={memberItem}
        query={query}
        onAddToCart={handleAddToCart}
        onQueryChange={setQuery}
        onSearchSubmit={handleSearchSubmit}
      />
      <DesktopDashboard
        items={items}
        memberItem={memberItem}
        specialItem={specialItem}
        onAddToCart={handleAddToCart}
      />
    </section>
  );
}
