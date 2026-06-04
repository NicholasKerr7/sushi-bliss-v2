import type { ReactNode } from "react";

import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { DesktopHeader } from "@/components/layout/DesktopHeader";
import { MobileHeader } from "@/components/layout/MobileHeader";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-dvh bg-sb-ink text-sb-rice">
      <MobileHeader />
      <DesktopHeader />
      <main className="pb-24 md:pb-0">{children}</main>
      <BottomNavigation />
    </div>
  );
}
