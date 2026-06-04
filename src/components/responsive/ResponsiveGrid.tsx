import type { HTMLAttributes, ReactNode } from "react";

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
      className={[
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
