import type { ReactNode } from "react";

import { classNames } from "@/lib/classNames";
import type { StatusTone } from "@/types/common";

interface StatusBadgeProps {
  children: ReactNode;
  className?: string;
  tone?: StatusTone;
}

const toneClasses: Record<StatusTone, string> = {
  danger: "border-sb-red/50 bg-sb-red/10 text-sb-red",
  neutral: "border-sb-line bg-sb-rice/5 text-sb-muted",
  premium: "border-sb-gold/40 bg-sb-gold/10 text-sb-gold-soft",
  success: "border-sb-wasabi/40 bg-sb-wasabi/10 text-sb-wasabi",
  warning: "border-sb-gold/50 bg-sb-gold/10 text-sb-gold",
};

export function StatusBadge({
  children,
  className,
  tone = "neutral",
}: StatusBadgeProps) {
  return (
    <span
      className={classNames(
        "inline-flex items-center rounded-control border px-2.5 py-1 text-xs font-semibold",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
