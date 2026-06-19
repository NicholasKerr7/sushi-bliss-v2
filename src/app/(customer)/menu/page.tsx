import type { Metadata } from "next";
import { Suspense } from "react";

import { MenuExplorer } from "@/features/menu/MenuExplorer";

export const metadata: Metadata = {
  title: "Menu",
};

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="min-h-dvh bg-[#050607]" />}>
      <MenuExplorer />
    </Suspense>
  );
}
