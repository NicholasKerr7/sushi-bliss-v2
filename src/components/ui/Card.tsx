import type { HTMLAttributes, ReactNode } from "react";

import { classNames } from "@/lib/classNames";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ children, className = "", ...props }: CardProps) {
  return (
    <div
      className={classNames(
        "rounded-card border border-sb-line bg-sb-panel/88 shadow-soft",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
