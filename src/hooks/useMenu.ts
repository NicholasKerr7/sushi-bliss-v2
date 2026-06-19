"use client";

import { useMemo, useState } from "react";

import { menuCategories, menuItems } from "@/data/menu";
import type { MenuCategory } from "@/types/menu";

interface UseMenuOptions {
  initialCategory?: string;
  initialQuery?: string;
}

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

const drinksCategory: MenuCategory = {
  id: "drinks",
  itemCount: menuItems.filter((item) => item.category === "drinks").length,
  label: "Drinks",
};

function getInitialCategory(category?: string) {
  if (!category) {
    return allCategory.id;
  }

  const categoryExists =
    category === allCategory.id ||
    category === chefSpecialCategory.id ||
    category === drinksCategory.id ||
    menuCategories.some((item) => item.id === category);

  return categoryExists ? category : allCategory.id;
}

function getInitialQuery(query?: string) {
  return query?.trim().slice(0, 80) || "";
}

/** Filters normalized menu data by category and full search text. */
export function useMenu({
  initialCategory,
  initialQuery,
}: UseMenuOptions = {}) {
  const [query, setQuery] = useState(() => getInitialQuery(initialQuery));
  const [category, setCategory] = useState<string>(() =>
    getInitialCategory(initialCategory),
  );

  const categories = useMemo(() => {
    const sourceCategories = [
      allCategory,
      chefSpecialCategory,
      ...menuCategories,
    ];

    return sourceCategories.some((categoryItem) => categoryItem.id === "drinks")
      ? sourceCategories
      : [...sourceCategories, drinksCategory];
  }, []);

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
