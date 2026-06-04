import type { ReactNode } from "react";

import { classNames } from "@/lib/classNames";

interface SectionHeaderProps {
  actions?: ReactNode;
  className?: string;
  eyebrow?: ReactNode;
  subtitle?: ReactNode;
  title: ReactNode;
}

export function SectionHeader({
  actions,
  className,
  eyebrow,
  subtitle,
  title,
}: SectionHeaderProps) {
  return (
    <div
      className={classNames(
        "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow ? <div className="mb-3">{eyebrow}</div> : null}
        <h2 className="text-2xl font-semibold leading-tight text-sb-rice md:text-3xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-3 text-sm leading-6 text-sb-muted md:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>
      ) : null}
    </div>
  );
}
