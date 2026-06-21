import { classNames } from "@/lib/classNames";

import { getStatusTone, statusToneClasses } from "./adminDashboardUtils";

interface AdminWorkspaceStatusPillProps {
  className?: string;
  value: string;
}

export function AdminWorkspaceStatusPill({
  className,
  value,
}: AdminWorkspaceStatusPillProps) {
  return (
    <span
      className={classNames(
        "inline-flex min-h-6 items-center rounded-full px-2.5 text-[11px] font-semibold",
        statusToneClasses[getStatusTone(value)],
        className,
      )}
    >
      {value}
    </span>
  );
}
