import type { ReactNode } from "react";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-dvh bg-sb-ink text-sb-rice">
      <main>{children}</main>
    </div>
  );
}
