import type { HTMLAttributes, ReactNode } from "react";

import { classNames } from "@/lib/classNames";

interface ResponsiveGridProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function ResponsiveGrid({
  children,
  className = "",
  ...props
}: ResponsiveGridProps) {
  return (
    <div
      className={classNames(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
