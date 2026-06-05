import type { Metadata } from "next";

import { FavoritesPage } from "@/features/menu/FavoritesPage";

export const metadata: Metadata = {
  title: "Favorites",
};

export default function FavoritesRoutePage() {
  return <FavoritesPage />;
}
