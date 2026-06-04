"use client";

import { useMemo, useState } from "react";

import { menuCategories, menuItems } from "@/data/menu";

/** Filters normalized menu data by category and full search text. */
export function useMenu() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return menuItems.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const matchesQuery =
        normalizedQuery.length === 0 ||
        item.searchText.includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return {
    categories: menuCategories,
    category,
    filteredItems,
    itemCount: filteredItems.length,
    query,
    setCategory,
    setQuery,
  };
}
