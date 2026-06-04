"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

import { menuItemById } from "@/data/menu";
import { readStorageValue, writeStorageValue } from "@/lib/storage";
import type { MenuItem } from "@/types/menu";

const FAVORITES_STORAGE_KEY = "sushi-bliss:favorites";
const FAVORITES_CHANGED_EVENT = "sushi-bliss:favorites-changed";

/** Validates unknown persisted favorite data before hydrating React state. */
function parseFavoriteIds(value: string | null): string[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is string => typeof item === "string" && item.length > 0,
    );
  } catch {
    return [];
  }
}

function getFavoritesSnapshot(): string {
  return readStorageValue(FAVORITES_STORAGE_KEY) || "[]";
}

function getEmptyFavoritesSnapshot(): string {
  return "[]";
}

function notifyFavoritesChanged() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(FAVORITES_CHANGED_EVENT));
}

/** Subscribes to same-tab and cross-tab favorite changes for React state reads. */
function subscribeToFavorites(onStoreChange: () => void): () => void {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === FAVORITES_STORAGE_KEY) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(FAVORITES_CHANGED_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(FAVORITES_CHANGED_EVENT, onStoreChange);
  };
}

/** Persists favorite menu item ids and resolves them into normalized menu records. */
export function useFavorites() {
  const favoriteSnapshot = useSyncExternalStore(
    subscribeToFavorites,
    getFavoritesSnapshot,
    getEmptyFavoritesSnapshot,
  );
  const favoriteIds = useMemo(
    () => parseFavoriteIds(favoriteSnapshot),
    [favoriteSnapshot],
  );

  const favoriteItems = useMemo(
    () =>
      favoriteIds
        .map((id) => menuItemById.get(id))
        .filter((item): item is MenuItem => Boolean(item)),
    [favoriteIds],
  );

  const isFavorite = useCallback(
    (id: string) => favoriteIds.includes(id),
    [favoriteIds],
  );

  const writeFavoriteIds = useCallback((nextFavoriteIds: string[]) => {
    writeStorageValue(FAVORITES_STORAGE_KEY, JSON.stringify(nextFavoriteIds));
    notifyFavoritesChanged();
  }, []);

  const toggleFavorite = useCallback(
    (id: string) => {
      const currentFavoriteIds = parseFavoriteIds(getFavoritesSnapshot());
      const nextFavoriteIds = currentFavoriteIds.includes(id)
        ? currentFavoriteIds.filter((favoriteId) => favoriteId !== id)
        : [id, ...currentFavoriteIds];

      writeFavoriteIds(nextFavoriteIds);
    },
    [writeFavoriteIds],
  );

  const clearFavorites = useCallback(() => {
    writeFavoriteIds([]);
  }, [writeFavoriteIds]);

  return {
    clearFavorites,
    favoriteIds,
    favoriteItems,
    hasFavorites: favoriteItems.length > 0,
    isFavorite,
    toggleFavorite,
  };
}
