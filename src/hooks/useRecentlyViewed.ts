"use client";

import { useMemo, useState } from "react";

import { useFavorites } from "@/hooks/useFavorites";
import {
  getRecentlyViewedSections,
  type RecentlyViewedEntry,
} from "@/features/menu/recentlyViewedContent";

/** Manages mock recent-history sections until server-backed history is added. */
export function useRecentlyViewed() {
  const initialSections = useMemo(() => getRecentlyViewedSections(), []);
  const [sections, setSections] = useState(initialSections);
  const [savedExperienceIds, setSavedExperienceIds] = useState(
    () =>
      new Set(
        initialSections.flatMap((section) =>
          section.entries
            .filter((entry) => entry.type === "experience" && entry.isSaved)
            .map((entry) => entry.id),
        ),
      ),
  );
  const { isFavorite, toggleFavorite } = useFavorites();
  const hasHistory = sections.some((section) => section.entries.length > 0);

  const clearHistory = () => setSections([]);
  const isEntrySaved = (entry: RecentlyViewedEntry) =>
    entry.type === "dish"
      ? isFavorite(entry.id)
      : savedExperienceIds.has(entry.id);
  const toggleEntrySaved = (entry: RecentlyViewedEntry) => {
    if (entry.type === "dish") {
      toggleFavorite(entry.id);
      return;
    }

    setSavedExperienceIds((currentIds) => {
      const nextIds = new Set(currentIds);

      if (nextIds.has(entry.id)) {
        nextIds.delete(entry.id);
      } else {
        nextIds.add(entry.id);
      }

      return nextIds;
    });
  };

  return {
    clearHistory,
    hasHistory,
    isEntrySaved,
    sections,
    toggleEntrySaved,
  };
}
