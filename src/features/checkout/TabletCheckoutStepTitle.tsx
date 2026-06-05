import type { ReactNode } from "react";

interface TabletCheckoutStepTitleProps {
  action?: ReactNode;
  number: number;
  title: string;
}

export function TabletCheckoutStepTitle({
  action,
  number,
  title,
}: TabletCheckoutStepTitleProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="flex items-center gap-3 text-[18px] font-semibold uppercase tracking-[0.08em]">
        <span className="grid h-7 w-7 place-items-center rounded-full border border-[var(--sb-gold)]/50 text-[var(--sb-gold-soft)]">
          {number}
        </span>
        {title}
      </h2>
      {action}
    </div>
  );
}
