import type { Metadata } from "next";

import { MenuExplorer } from "@/features/menu/MenuExplorer";

export const metadata: Metadata = {
  title: "Menu",
};

export default function MenuPage() {
  return <MenuExplorer />;
}
