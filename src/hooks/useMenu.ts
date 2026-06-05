"use client";

import { useMemo, useState } from "react";

import { menuCategories, menuItems } from "@/data/menu";
import type { MenuCategory } from "@/types/menu";

const allCategory: MenuCategory = {
  id: "all",
  itemCount: menuItems.length,
  label: "All",
};

const chefSpecialCategory: MenuCategory = {
  id: "chef-specials",
  itemCount: menuItems.filter((item) => item.tags.includes("chef-special"))
    .length,
  label: "Chef Specials",
};

/** Filters normalized menu data by category and full search text. */
export function useMenu() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const categories = useMemo(
    () => [allCategory, chefSpecialCategory, ...menuCategories],
    [],
  );

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return menuItems.filter((item) => {
      const matchesCategory =
        category === "all" ||
        (category === "chef-specials" && item.tags.includes("chef-special")) ||
        item.category === category;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        item.searchText.includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const selectedCategory = useMemo(
    () =>
      categories.find((categoryItem) => categoryItem.id === category) ||
      allCategory,
    [categories, category],
  );

  const clearFilters = () => {
    setCategory("all");
    setQuery("");
  };

  return {
    categories,
    category,
    clearFilters,
    filteredItems,
    hasActiveFilters: category !== "all" || query.trim().length > 0,
    itemCount: filteredItems.length,
    query,
    selectedCategory,
    setCategory,
    setQuery,
    totalItemCount: menuItems.length,
  };
}
